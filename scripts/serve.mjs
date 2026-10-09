// Serveur statique simple pour tester dist/ sous le chemin de base GitHub Pages.
// (vite preview renvoie de mauvais Content-Type avec un base path personnalisé.)
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const BASE = '/Juliette-apprend-l-arabe/'
const ROOT = join(import.meta.dirname, '..', 'dist')
const PORT = Number(process.env.PORT ?? 4173)
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json', '.webmanifest': 'application/manifest+json',
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost')
  if (!url.pathname.startsWith(BASE)) {
    res.writeHead(302, { Location: BASE }).end()
    return
  }
  let file = normalize(join(ROOT, decodeURIComponent(url.pathname.slice(BASE.length))))
  if (!file.startsWith(ROOT)) return res.writeHead(403).end()
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html')
    const body = await readFile(file)
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' }).end(body)
  } catch {
    res.writeHead(404).end('Introuvable')
  }
}).listen(PORT, () => console.log(`http://localhost:${PORT}${BASE}`))
