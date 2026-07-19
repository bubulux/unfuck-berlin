/**
 * Holt redaktionelle Inhalte aus Sanity und schreibt sie in generierte
 * TypeScript-Dateien unter src/data/. Laeuft automatisch vor jedem Build
 * (prebuild) und manuell via `npm run content`.
 *
 * Nur Lesezugriff auf das oeffentliche Dataset – kein Token noetig.
 * Faellt der Abruf aus (z. B. Sanity nicht erreichbar), bleibt die zuletzt
 * eingecheckte generierte Datei erhalten, damit der Build nie bricht.
 *
 * Aktueller Umfang (minimale CMS-Migration): nur die Wahlprogramm-Kapitel
 * (wahlprogramm_teaser.kapitel der Seite mit slug "wahlprogramm").
 */
import { createClient } from '@sanity/client'
import { writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_PROGRAM = resolve(__dirname, '..', 'src', 'data', 'program.generated.ts')

const client = createClient({
  projectId: 'xzcgo5ky',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Die Kapitel liegen inline im wahlprogramm_teaser-Modul der Seite "wahlprogramm".
const PROGRAM_QUERY = `*[_type=="seite" && slug.current=="wahlprogramm"][0]{
  "kapitel": content_modules[_type=="wahlprogramm_teaser"][0].kapitel[]{titel, tags, text}
}`

async function main() {
  const res = await client.fetch(PROGRAM_QUERY)
  const kapitel = res?.kapitel || []

  if (!kapitel.length) {
    throw new Error('Keine Kapitel im wahlprogramm_teaser gefunden (leere Antwort).')
  }

  const PILLARS = kapitel.map((k) => ({
    title: (k.titel || '').replace(/\s+/g, ' ').trim(),
    tags: Array.isArray(k.tags) ? k.tags : [],
    body: (k.text || '').trim(),
  }))

  const out = `// AUTO-GENERIERT von scripts/fetch-content.mjs aus Sanity.
// NICHT manuell editieren – Aenderungen macht Volt im Sanity Studio.
// Letzter Abruf: ${new Date().toISOString()}
import type { ProgramPillarItem } from '../components/organisms/program-section'

export const PROGRAM_PILLARS: ProgramPillarItem[] = ${JSON.stringify(PILLARS, null, 2)}
`

  writeFileSync(OUT_PROGRAM, out, 'utf8')
  console.log(`program.generated.ts aktualisiert: ${PILLARS.length} Kapitel.`)
}

main().catch((err) => {
  console.warn('Sanity-Abruf fehlgeschlagen:', err.message)
  if (existsSync(OUT_PROGRAM)) {
    console.warn('Behalte bestehende src/data/program.generated.ts (letzter Stand).')
    process.exit(0)
  }
  console.error('Keine program.generated.ts vorhanden – Build kann nicht ohne Inhalte starten.')
  process.exit(1)
})
