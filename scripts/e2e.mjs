// Parcours de bout en bout sur viewport iPhone, contre dist/ servi statiquement.
// Prérequis : npm run build. Usage : npm run test:e2e
import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { devices } from 'playwright-core'
import { launch } from './browser.mjs'

const PORT = 4321
const URL_BASE = `http://localhost:${PORT}/Juliette-apprend-l-arabe/`
const SHOTS = join(import.meta.dirname, '..', 'screenshots')
await mkdir(SHOTS, { recursive: true })

const server = spawn(process.execPath, [join(import.meta.dirname, 'serve.mjs')], { env: { ...process.env, PORT: String(PORT) }, stdio: 'pipe' })
await new Promise((r) => server.stdout.once('data', r))

const browser = await launch()
const { defaultBrowserType: _ignored, ...iphone } = devices['iPhone 13']
const context = await browser.newContext({ ...iphone, locale: 'fr-FR' })
const page = await context.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
page.on('console', (m) => m.type() === 'error' && !/fonts\.g|ERR_|net::/.test(m.text()) && errors.push(m.text()))

let failures = 0
async function step(name, fn) {
  try {
    await fn()
    console.log(`✓ ${name}`)
  } catch (e) {
    failures++
    console.log(`✗ ${name}\n  ${e.message.split('\n')[0]}`)
  }
}
const assert = (cond, msg) => { if (!cond) throw new Error(msg) }
const noHorizontalScroll = async () => {
  const [sw, iw] = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth])
  assert(sw <= iw, `défilement horizontal : ${sw} > ${iw}`)
}
const shot = (name) => page.screenshot({ path: join(SHOTS, `${name}.png`), fullPage: false })
const go = async (hash) => {
  await page.goto(URL_BASE + '#' + hash)
  await page.waitForLoadState('networkidle').catch(() => {})
}

await step('Tableau de bord', async () => {
  await go('/')
  await page.getByRole('heading', { name: /Bienvenue, Juliette/ }).waitFor()
  assert(await page.getByRole('navigation', { name: 'Navigation principale' }).isVisible(), 'barre de navigation absente')
  await noHorizontalScroll()
  await shot('01-accueil')
})

await step('Alphabet : 28 lettres et formes médianes', async () => {
  await go('/alphabet')
  const tiles = page.locator('a[href^="#/alphabet/"]:not([href$="exercice"])')
  assert((await tiles.count()) === 28, `nombre de lettres : ${await tiles.count()}`)
  await page.getByRole('tab', { name: 'Médiane' }).click()
  assert((await tiles.first().locator('[lang="ar"]').textContent()) === 'ـا', 'forme médiane de alif inattendue')
  assert((await tiles.nth(1).locator('[lang="ar"]').textContent()) === 'ـبـ', 'forme médiane de bā’ inattendue')
  const dir = await tiles.nth(1).locator('[lang="ar"]').getAttribute('dir')
  assert(dir === 'rtl', 'texte arabe sans dir="rtl"')
  await noHorizontalScroll()
  await shot('02-alphabet-median')
})

await step('Fiche de lettre : quatre formes, XP gagnée', async () => {
  await go('/alphabet/ba')
  await page.getByRole('heading', { name: /bā’/ }).waitFor()
  for (const f of ['Isolée', 'Initiale', 'Médiane', 'Finale']) await page.getByText(f, { exact: true }).waitFor()
  const forms = await page.locator('section .grid [lang="ar"]').allTextContents()
  assert(JSON.stringify(forms) === JSON.stringify(['ب', 'بـ', 'ـبـ', 'ـب']), `formes : ${forms}`)
  assert(await page.locator('canvas').isVisible(), 'zone de tracé absente')
  await noHorizontalScroll()
  await shot('03-lettre-ba')
})

await step('Exercice de reconnaissance (10 questions)', async () => {
  await go('/alphabet/exercice')
  for (let i = 0; i < 10; i++) {
    await page.locator('.grid.grid-cols-2 button').first().click()
    if (i === 0) await shot('04-reconnaissance')
    await page.getByRole('button', { name: /Suivant|Résultat/ }).click()
  }
  await page.getByRole('heading', { name: /\/ 10/ }).waitFor()
})

await step('Palier A1.1 : dix onglets, validation et diacritiques', async () => {
  await go('/paliers/a1-1')
  const tabs = page.getByRole('tab')
  assert((await tabs.count()) === 10, `onglets : ${await tabs.count()}`)
  await shot('05-palier-alphabet')
  await page.getByRole('tab', { name: /Histoire/ }).click()
  const first = page.locator('[role="tabpanel"] p[lang="ar"]').first()
  assert(/[ً-ْ]/.test(await first.textContent()), 'diacritiques absents par défaut')
  await page.getByRole('button', { name: 'Avec diacritiques' }).click()
  assert(!/[ً-ْ]/.test(await first.textContent()), 'diacritiques toujours présents en mode « sans »')
  await page.getByRole('button', { name: 'Sans diacritiques' }).click()
  await page.getByRole('button', { name: /J’ai terminé/ }).click()
  await page.getByText('✓ Section terminée').waitFor()
  await page.getByRole('tab', { name: /Podcast/ }).click()
  await page.getByText('Révéler la transcription').click()
  await page.getByText('Bonjour, Juliette !').waitFor()
  await page.getByRole('tab', { name: /Conversation/ }).click()
  await page.getByLabel('Votre réponse en arabe').fill('أهلا')
  await page.getByRole('button', { name: 'Envoyer' }).click()
  await page.getByText('Bonjour (le matin).').waitFor()
  await page.getByRole('tab', { name: /Dialectes/ }).click()
  await page.getByText('Hors tronc commun.').waitFor()
  await page.getByRole('tab', { name: /Grammaire/ }).click()
  await noHorizontalScroll()
  await shot('06-palier-grammaire')
})

await step('Vocabulaire spécial de Juliette', async () => {
  await go('/vocabulaire')
  for (const t of ['Animaux marins', 'Sports à voile', 'Alcool et cocktails', 'Écriture et lecture']) await page.getByText(t, { exact: true }).waitFor()
  await shot('07-vocabulaire')
  await go('/vocabulaire/animaux-marins')
  await page.getByText('un dauphin').waitFor()
  await page.getByRole('button', { name: 'Cartes' }).click()
  await noHorizontalScroll()
  await shot('08-animaux-marins-cartes')
})

await step('Profils : bascule sans rechargement', async () => {
  await go('/progres')
  const xpBefore = await page.evaluate(() => JSON.parse(localStorage.getItem('jaa-progression-juliette')).state.xp)
  assert(xpBefore > 0, 'aucune XP enregistrée pour Juliette')
  await shot('09-progres')
  await go('/profils')
  await page.evaluate(() => { window.__marqueur = 'sans-rechargement' })
  await page.getByLabel('Prénom').fill('Invité')
  await page.getByRole('button', { name: 'Créer et utiliser' }).click()
  await page.getByText('Actif').waitFor()
  await page.getByText(/Niveau 1 · 0 XP/).first().waitFor()
  await page.getByRole('link', { name: 'Accueil' }).click()
  await page.getByRole('heading', { name: /Bienvenue, Invité/ }).waitFor()
  await go('/profils')
  await page.getByRole('button', { name: 'Choisir' }).click()
  await page.getByRole('link', { name: 'Accueil' }).click()
  await page.getByRole('heading', { name: /Bienvenue, Juliette/ }).waitFor()
  const xpText = await page.locator('section').first().textContent()
  assert(xpText.includes(String(xpBefore)), `XP de Juliette non restaurée (attendu ${xpBefore})`)
  assert((await page.evaluate(() => window.__marqueur)) === 'sans-rechargement', 'la page a été rechargée')
})

await step('Avatar : aquarium, choix, couleur et verrous', async () => {
  await go('/')
  await page.getByRole('link', { name: /Profil : Juliette/ }).click()
  await page.getByRole('heading', { name: 'Mon avatar' }).waitFor()
  assert(await page.getByRole('button', { name: /requin : se débloque au niveau 8/ }).isDisabled(), 'le requin devrait être verrouillé')
  await page.getByRole('button', { name: 'Choisir le poisson' }).click()
  await page.getByRole('button', { name: 'Corail' }).click()
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('jaa-profils')).state.profiles.find((p) => p.id === 'juliette'))
  assert(saved.avatar === 'poisson' && saved.color === 'corail', `avatar enregistré : ${JSON.stringify(saved)}`)
  await noHorizontalScroll()
  await shot('10-avatar')
})

await step('Avatar : notification de déblocage au passage de niveau', async () => {
  await page.evaluate(() => {
    const key = 'jaa-progression-juliette'
    const data = JSON.parse(localStorage.getItem(key))
    data.state.xp = 99
    localStorage.setItem(key, JSON.stringify(data))
  })
  await page.reload()
  await go('/alphabet/ra')
  await page.getByText(/Niveau 2 ! Nouvel ami marin/).waitFor()
  await page.getByText('la pieuvre').waitFor()
  await shot('11-deblocage')
})

await step('Migration des anciens profils (avatar emoji)', async () => {
  const ctx = await browser.newContext({ ...iphone, locale: 'fr-FR' })
  const pg = await ctx.newPage()
  await pg.addInitScript(() => {
    if (!localStorage.getItem('migration-faite')) {
      localStorage.setItem('jaa-profils', JSON.stringify({ state: { profiles: [{ id: 'juliette', name: 'Juliette', avatar: '🐬', createdAt: '2026-10-09' }, { id: 'x', name: 'Ancien', avatar: '⛵', createdAt: '2026-10-09' }], activeId: 'juliette' }, version: 0 }))
      localStorage.setItem('migration-faite', '1')
    }
  })
  await pg.goto(URL_BASE + '#/profils')
  await pg.getByText('Ancien').waitFor()
  const profiles = await pg.evaluate(() => JSON.parse(localStorage.getItem('jaa-profils')).state.profiles)
  assert(profiles[0].avatar === 'dauphin' && profiles[1].avatar === 'dauphin' && profiles[1].color === 'lagon', JSON.stringify(profiles))
  await ctx.close()
})

await step('Révisions Leitner : vocabulaire et grammaire séparés', async () => {
  await go('/revisions')
  await shot('12-revisions')
  await page.getByRole('link', { name: /Réviser \d+ carte/ }).first().click()
  await page.getByRole('button', { name: 'Voir la réponse' }).click()
  await page.getByRole('button', { name: 'Je savais ✓' }).click()
  await page.getByRole('button', { name: 'Voir la réponse' }).click()
  await page.getByRole('button', { name: 'À revoir' }).click()
  const srs = await page.evaluate(() => JSON.parse(localStorage.getItem('jaa-progression-juliette')).state.srs)
  const boxes = Object.values(srs.vocabulaire).map((e) => e.box).sort()
  assert(JSON.stringify(boxes) === '[1,1]', `boîtes inattendues : ${JSON.stringify(boxes)}`)
  assert(Object.keys(srs.grammaire).length === 0, 'le paquet grammaire ne doit pas bouger')
  await noHorizontalScroll()
})

await step('Fiches : racines et dix formes verbales', async () => {
  await go('/fiches')
  await page.getByText('Racines et formes verbales').click()
  for (const f of ['I', 'V', 'X']) await page.getByRole('cell', { name: f, exact: true }).waitFor()
  await page.getByText('ar:', { exact: false }).count().then((n) => assert(n === 0, 'préfixe ar: visible'))
  await noHorizontalScroll()
  await shot('13-fiche-racines')
  await go('/fiches/cas')
  await page.getByRole('heading', { name: /Nominatif, accusatif, génitif/ }).waitFor()
  await go('/revisions')
  await page.getByText(/questions des paliers/).waitFor()
})

await step('Test de niveau CECR', async () => {
  await go('/test-niveau')
  const blocks = page.locator('fieldset')
  assert((await blocks.count()) === 20, `affirmations : ${await blocks.count()}`)
  for (let i = 0; i < 4; i++) await blocks.nth(i).getByRole('button', { name: 'Oui' }).click()
  await page.getByRole('button', { name: /Voir mon niveau/ }).click()
  await page.getByRole('heading', { name: 'Votre niveau estimé : A1' }).waitFor()
})

await step('Onglet « Plus » et progrès', async () => {
  await go('/plus')
  await page.getByText('Fiches de référence').waitFor()
  await go('/progres')
  await page.getByText('Boussole').waitFor()
  await noHorizontalScroll()
  await shot('14-progres')
})

if (errors.length) {
  failures++
  console.log('✗ Erreurs JavaScript :\n  ' + errors.join('\n  '))
} else console.log('✓ Aucune erreur JavaScript')

await browser.close()
server.kill()
console.log(failures ? `\n${failures} échec(s).` : '\nTous les parcours passent.')
process.exit(failures ? 1 : 0)
