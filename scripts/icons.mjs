// Génère les icônes PNG de la PWA à partir de public/icon.svg.
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { launch } from './browser.mjs'

const pub = join(import.meta.dirname, '..', 'public')
const svg = await readFile(join(pub, 'icon.svg'), 'utf8')
const browser = await launch()
for (const size of [192, 512]) {
  const page = await browser.newPage({ viewport: { width: size, height: size } })
  await page.setContent(
    `<link href="https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@700&display=block" rel="stylesheet">
     <style>html,body{margin:0}svg{width:${size}px;height:${size}px;display:block}</style>${svg}`,
  )
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(500)
  await page.screenshot({ path: join(pub, `icon-${size}.png`), omitBackground: true })
}
await browser.close()
console.log('Icônes générées.')
