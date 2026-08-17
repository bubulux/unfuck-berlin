/**
 * Einmaliges Hilfsskript: laedt die Video-/Poster-Assets aus public/vids in die
 * Sanity-Asset-Bibliothek (Dataset "production"). Idempotent – Sanity dedupliziert
 * Assets ueber den Inhalts-Hash, ein erneuter Lauf erzeugt also keine Duplikate.
 *
 * Auth: nutzt das Token des eingeloggten Sanity-CLI (~/.config/sanity/config.json).
 * Kein Schema-Eingriff, keine bestehenden Dokumente werden veraendert – es werden
 * nur Assets hochgeladen. Aufruf: `node scripts/upload-assets.mjs`.
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

/** kind: 'file' (Video) oder 'image' (Poster); Pfad relativ zum Projekt-Root. */
const ASSETS = [
  { kind: 'file', path: 'public/vids/anna_paul_intro.mp4', contentType: 'video/mp4' },
  { kind: 'image', path: 'public/vids/anna_paul_intro_poster.jpg', contentType: 'image/jpeg' },
  {
    kind: 'file',
    path: 'public/vids/20260715_VOLT_UNFCK_REVEAL_LONG_VERSION_FINAL_XtraSmall.mp4',
    contentType: 'video/mp4',
  },
  { kind: 'image', path: 'public/vids/unfck_reveal_poster.jpg', contentType: 'image/jpeg' },
]

async function main() {
  for (const asset of ASSETS) {
    const abs = resolve(ROOT, asset.path)
    const filename = asset.path.split('/').pop()
    const buffer = readFileSync(abs)
    const res = await client.assets.upload(asset.kind, buffer, {
      filename,
      contentType: asset.contentType,
    })
  }
}

main().catch((err) => {
  console.error('Upload fehlgeschlagen:', err.message)
  process.exit(1)
})
