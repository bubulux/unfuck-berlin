/**
 * Einmaliges Hilfsskript: laedt die Collage-Bilder der /unfuck-berlin-Seite aus
 * public/pics/unfck in die Sanity-Asset-Bibliothek und befuellt damit das
 * (bislang leere) Feld seiteUnfck.collage1. Danach ist die Collage im Studio
 * pflegbar (Bilder tauschen/ordnen), und der Build liest sie via fetch-content.mjs.
 *
 * Idempotent: Assets werden ueber den Inhalts-Hash dedupliziert, und collage1
 * wird komplett neu gesetzt (nicht angehaengt) – ein erneuter Lauf ergibt genau
 * dieselben 5 Eintraege. Auth: Token des eingeloggten Sanity-CLI.
 * Aufruf: `node scripts/populate-unfck-collage.mjs`.
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

function readToken() {
  if (process.env.SANITY_AUTH_TOKEN) return process.env.SANITY_AUTH_TOKEN
  const cfgPath = resolve(homedir(), '.config', 'sanity', 'config.json')
  const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'))
  const token = cfg.authToken || cfg.token
  if (!token) throw new Error('Kein Sanity-Token in ~/.config/sanity/config.json gefunden.')
  return token
}

const client = createClient({
  projectId: 'xzcgo5ky',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: readToken(),
})

const FILES = ['1.png', '2.png', '3.png', '4.png', '5.png']

async function main() {
  const items = []
  for (let i = 0; i < FILES.length; i++) {
    const rel = `public/pics/unfck/${FILES[i]}`
    const asset = await client.assets.upload('image', readFileSync(resolve(ROOT, rel)), {
      filename: FILES[i],
      contentType: 'image/png',
    })
    items.push({
      _type: 'image',
      _key: `unfck-${i + 1}`,
      asset: { _type: 'reference', _ref: asset._id },
    })
    console.log(`upload ${rel}\n      -> ${asset._id}`)
  }

  const res = await client.patch('seiteUnfck').set({ collage1: items }).commit()
  console.log(`seiteUnfck.collage1 gesetzt (${items.length} Bilder), rev ${res._rev}`)
}

main().catch((err) => {
  console.error('Fehlgeschlagen:', err.message)
  process.exit(1)
})
