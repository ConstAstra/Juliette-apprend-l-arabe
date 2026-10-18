import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PhraseRow } from '../components/PhraseRow'
import { TIERS } from '../data/tiers'
import { normalizeArabic } from '../lib/arabic'
import type { VocabTheme } from '../data/types'
import { ALL_THEMES, GENERAL_THEMES, JULIETTE_THEMES, MEDICAL_THEMES } from '../data/vocabulary'
import { useProgress } from '../store/progress'

function ThemeCard({ theme }: { theme: VocabTheme }) {
  const seen = useProgress((s) => s.seenThemes[theme.id])
  return (
    <Link to={`/vocabulaire/${theme.id}`} className="card flex items-center gap-3">
      <span className="text-3xl">{theme.emoji}</span>
      <div className="flex-1">
        <div className="font-bold">{theme.title}</div>
        <div className="muted text-sm">{theme.words.length} mots</div>
      </div>
      {seen && <span className="text-lueur-400" aria-label="consulté">✓</span>}
    </Link>
  )
}

/** Tous les mots de l'application, avec leur provenance, pour la recherche. */
const INDEX = [
  ...ALL_THEMES.flatMap((t) => t.words.map((w) => ({ word: w, source: t.title }))),
  ...TIERS.flatMap((t) => t.vocabulary.map((w) => ({ word: w, source: `Palier ${t.level}.${t.order}` }))),
]

// Insensible à la casse et aux accents (« ecole » trouve « école », « ʿayn » trouve « ayn »).
const latin = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f’ʿ'‘-]/g, '')

function search(query: string) {
  const q = query.trim()
  if (q.length < 2) return []
  const isArabic = /[\u0600-\u06FF]/.test(q)
  const needle = isArabic ? normalizeArabic(q) : latin(q)
  const seen = new Set<string>()
  return INDEX.filter(({ word }) => {
    const hit = isArabic ? normalizeArabic(word.ar).includes(needle) : latin(word.fr).includes(needle) || latin(word.tr).includes(needle)
    if (!hit || seen.has(word.ar)) return false
    seen.add(word.ar)
    return true
  }).slice(0, 40)
}

export function VocabularyPage() {
  const [query, setQuery] = useState('')
  const results = useMemo(() => search(query), [query])
  const total = ALL_THEMES.reduce((n, t) => n + t.words.length, 0)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">Vocabulaire</h1>
      <div className="space-y-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Chercher un mot, en français ou en arabe…"
          aria-label="Chercher un mot"
          className="min-h-12 w-full rounded-xl border border-trait bg-abysse-2 px-4 text-parchemin placeholder:text-brume focus:border-or-400 focus:outline-none"
        />
        <p className="muted text-xs">{total} mots dans {ALL_THEMES.length} fiches, plus le vocabulaire des paliers.</p>
      </div>
      {query.trim().length >= 2 && (
        <section className="card divide-y divide-trait/60" aria-label="Résultats de la recherche">
          {results.length ? (
            results.map(({ word, source }) => (
              <div key={`${source}-${word.id}`}>
                <PhraseRow phrase={word} />
                <p className="pb-2 text-xs text-lueur-300">{source}</p>
              </div>
            ))
          ) : (
            <p className="muted py-2 text-sm">Aucun mot ne correspond. Essayez un synonyme, ou l’arabe sans voyelles.</p>
          )}
        </section>
      )}
      <section className="rounded-3xl border border-lueur-400/30 bg-gradient-to-br from-lueur-600/35 to-abysse p-4">
        <h2 className="text-lg font-extrabold">✨ Le vocabulaire spécial de Juliette</h2>
        <p className="mb-3 text-sm opacity-90">La mer, la voile, l’art de recevoir et l’amour des livres.</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {JULIETTE_THEMES.map((t) => <ThemeCard key={t.id} theme={t} />)}
        </div>
      </section>
      <section className="rounded-3xl border border-or-400/30 bg-gradient-to-br from-or-600/25 to-abysse p-4">
        <h2 className="text-lg font-extrabold">🩺 Comprendre ses patients</h2>
        <p className="mb-3 text-sm opacity-90">Le vocabulaire de la docteure Juliette : le corps, les maux, les maladies, la consultation, et les plaintes telles qu’on les entend en dialecte.</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {MEDICAL_THEMES.map((t) => <ThemeCard key={t.id} theme={t} />)}
        </div>
      </section>
      <section>
        <h2 className="mb-2 text-lg font-bold">Thèmes généraux</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {GENERAL_THEMES.map((t) => <ThemeCard key={t.id} theme={t} />)}
        </div>
      </section>
    </div>
  )
}
