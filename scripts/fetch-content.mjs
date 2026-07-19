/**
 * Holt redaktionelle Inhalte aus Sanity und schreibt sie in generierte
 * TypeScript-Dateien unter src/data/. Laeuft automatisch vor jedem Build
 * (prebuild) und manuell via `npm run content`.
 *
 * Nur Lesezugriff auf das oeffentliche Dataset – kein Token noetig, nur
 * veroeffentlichte Inhalte (keine Drafts).
 * Faellt der Abruf aus (z. B. Sanity nicht erreichbar), bleibt die zuletzt
 * eingecheckte generierte Datei erhalten, damit der Build nie bricht.
 *
 * Aktueller Umfang (schrittweise CMS-Migration): die komplette Seite
 * "wahlprogramm" – Intro (hero_linear) + CTA, Programmkapitel
 * (wahlprogramm_teaser) und der Europa-Block (headline + html_text) + CTA.
 * STRUKTUR/LAYOUT bleiben im Code, nur die redaktionellen Inhalte kommen aus
 * dem CMS.
 */
import { createClient } from '@sanity/client'
import { writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '..', 'src', 'data', 'wahlprogramm.generated.ts')

const client = createClient({
  projectId: 'xzcgo5ky',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const QUERY = `*[_type=="seite" && slug.current=="wahlprogramm"][0]{
  content_modules[]{
    _type,
    heroZeilen, heroText, headline_theme,
    headlineZeilen,
    html_text,
    ctaLabel, ctaHref,
    "kapitel": kapitel[]{titel, tags, text}
  }
}`

const clean = (s) => (s || '').trim()
const lines = (arr) => (Array.isArray(arr) ? arr.map((z) => clean(z)).filter(Boolean) : [])

async function main() {
  const res = await client.fetch(QUERY)
  const mods = res?.content_modules || []
  if (!mods.length) {
    throw new Error('Seite "wahlprogramm" ohne content_modules (leere Antwort).')
  }

  const idxTeaser = mods.findIndex((m) => m._type === 'wahlprogramm_teaser')
  const hero = mods.find((m) => m._type === 'hero_linear') || {}
  const headline = mods.find((m) => m._type === 'headline') || {}
  const htmlText = mods.find((m) => m._type === 'html_text') || {}
  const teaser = mods.find((m) => m._type === 'wahlprogramm_teaser') || {}

  // CTA vor dem Teaser gehoert zum Intro, CTA nach dem Teaser zum Europa-Block.
  const introCta =
    mods.filter((m, i) => m._type === 'one_cta' && (idxTeaser < 0 || i < idxTeaser))[0] || {}
  const afterCtas = mods.filter((m, i) => m._type === 'one_cta' && idxTeaser >= 0 && i > idxTeaser)
  const europaCta = afterCtas[afterCtas.length - 1] || {}

  const pillars = (teaser.kapitel || []).map((k) => ({
    title: clean(k.titel).replace(/\s+/g, ' '),
    tags: Array.isArray(k.tags) ? k.tags : [],
    body: clean(k.text),
  }))

  if (!pillars.length) {
    throw new Error('Keine Kapitel im wahlprogramm_teaser gefunden.')
  }

  const data = {
    intro: {
      heading: lines(hero.heroZeilen),
      theme: clean(hero.headline_theme),
      body: clean(hero.heroText),
      ctaLabel: clean(introCta.ctaLabel),
      ctaHref: clean(introCta.ctaHref),
    },
    pillars,
    europa: {
      heading: lines(headline.headlineZeilen),
      theme: clean(headline.headline_theme),
      body: clean(htmlText.html_text),
      ctaLabel: clean(europaCta.ctaLabel),
      ctaHref: clean(europaCta.ctaHref),
    },
  }

  const out = `// AUTO-GENERIERT von scripts/fetch-content.mjs aus Sanity.
// NICHT manuell editieren – Aenderungen macht Volt im Sanity Studio.
// Letzter Abruf: ${new Date().toISOString()}

export const WAHLPROGRAMM_CMS = ${JSON.stringify(data, null, 2)}
`

  writeFileSync(OUT, out, 'utf8')
  console.log(`wahlprogramm.generated.ts aktualisiert: ${pillars.length} Kapitel + Intro/Europa.`)
}

main().catch((err) => {
  console.warn('Sanity-Abruf fehlgeschlagen:', err.message)
  if (existsSync(OUT)) {
    console.warn('Behalte bestehende src/data/wahlprogramm.generated.ts (letzter Stand).')
    process.exit(0)
  }
  console.error('Keine wahlprogramm.generated.ts vorhanden – Build kann nicht ohne Inhalte starten.')
  process.exit(1)
})
