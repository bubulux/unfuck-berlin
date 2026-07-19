/**
 * Holt redaktionelle Inhalte aus Sanity und schreibt sie in generierte
 * TypeScript-Dateien unter src/data/. Laeuft automatisch vor jedem Build
 * (prebuild) und manuell via `npm run content`.
 *
 * Nur Lesezugriff auf das oeffentliche Dataset – kein Token noetig, nur
 * veroeffentlichte Inhalte (keine Drafts).
 * Faellt der Abruf aus (z. B. Sanity nicht erreichbar), bleiben die zuletzt
 * eingecheckten generierten Dateien erhalten, damit der Build nie bricht.
 *
 * Umfang (schrittweise CMS-Migration):
 *  - Seite "wahlprogramm": Intro + Programmkapitel + Europa-Block.
 *  - Kandidierenden-Uebersicht (kandidatAgh): Name, Slug, Listenplatz, Bezirk, Foto.
 * STRUKTUR/LAYOUT bleiben im Code, nur die redaktionellen Inhalte kommen aus
 * dem CMS.
 */
import { createClient } from '@sanity/client'
import { writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = resolve(__dirname, '..', 'src', 'data')
const OUT_WAHLPROGRAMM = resolve(DATA_DIR, 'wahlprogramm.generated.ts')
const OUT_KANDIDATEN = resolve(DATA_DIR, 'kandidaten.generated.ts')

const client = createClient({
  projectId: 'xzcgo5ky',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Sanity-Bilder einheitlich zuschneiden (oben ausgerichtet) und automatisch ins
// beste Format ausliefern. Quellbilder variieren stark in Groesse, daher lohnt
// der einheitliche Crop. Karte: 4:5, Detailseite: 3:4 (groesser).
const CARD_IMG_PARAMS = 'w=480&h=600&fit=crop&crop=top&auto=format'
const DETAIL_IMG_PARAMS = 'w=720&h=960&fit=crop&crop=top&auto=format'
const withParams = (url, params) => {
  const base = (url || '').trim()
  if (!base) return ''
  return base + (base.includes('?') ? '&' : '?') + params
}

const clean = (s) => (s || '').trim()
const lines = (arr) => (Array.isArray(arr) ? arr.map((z) => clean(z)).filter(Boolean) : [])

const WAHLPROGRAMM_QUERY = `*[_type=="seite" && slug.current=="wahlprogramm"][0]{
  content_modules[]{
    _type,
    heroZeilen, heroText, headline_theme,
    headlineZeilen,
    html_text,
    ctaLabel, ctaHref,
    "kapitel": kapitel[]{titel, tags, text}
  }
}`

const KANDIDATEN_QUERY = `*[_type=="kandidatAgh"]|order(listenplatz asc){
  "slug": slug.current, name, listenplatz, bezirk, alter, wahlkreis,
  herzensthema, ueberMich, "foto": foto.asset->url
}`

function buildWahlprogramm(res) {
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

  return {
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
}

function buildKandidaten(rows) {
  const list = (rows || [])
    .filter((k) => k.slug && k.name)
    .map((k) => ({
      name: clean(k.name),
      slug: clean(k.slug),
      listenplatz: typeof k.listenplatz === 'number' ? k.listenplatz : 0,
      bezirk: clean(k.bezirk),
      alter: typeof k.alter === 'number' ? k.alter : null,
      wahlkreis: clean(k.wahlkreis),
      image: withParams(k.foto, CARD_IMG_PARAMS),
      imageDetail: withParams(k.foto, DETAIL_IMG_PARAMS),
      herzensthema: clean(k.herzensthema),
      ueberMich: clean(k.ueberMich),
    }))
  if (!list.length) {
    throw new Error('Keine kandidatAgh-Dokumente gefunden.')
  }
  return list
}

const header = `// AUTO-GENERIERT von scripts/fetch-content.mjs aus Sanity.
// NICHT manuell editieren – Aenderungen macht Volt im Sanity Studio.
// Letzter Abruf: ${new Date().toISOString()}`

async function main() {
  const [wpRes, kandiRows] = await Promise.all([
    client.fetch(WAHLPROGRAMM_QUERY),
    client.fetch(KANDIDATEN_QUERY),
  ])

  const wahlprogramm = buildWahlprogramm(wpRes)
  const kandidaten = buildKandidaten(kandiRows)

  writeFileSync(
    OUT_WAHLPROGRAMM,
    `${header}\n\nexport const WAHLPROGRAMM_CMS = ${JSON.stringify(wahlprogramm, null, 2)}\n`,
    'utf8',
  )
  writeFileSync(
    OUT_KANDIDATEN,
    `${header}\n\nexport const KANDIDATEN_CMS = ${JSON.stringify(kandidaten, null, 2)}\n`,
    'utf8',
  )

  console.log(
    `Inhalte aktualisiert: Wahlprogramm (${wahlprogramm.pillars.length} Kapitel), ${kandidaten.length} Kandidierende.`,
  )
}

main().catch((err) => {
  console.warn('Sanity-Abruf fehlgeschlagen:', err.message)
  if (existsSync(OUT_WAHLPROGRAMM) && existsSync(OUT_KANDIDATEN)) {
    console.warn('Behalte bestehende generierte Dateien (letzter Stand).')
    process.exit(0)
  }
  console.error('Generierte Dateien fehlen – Build kann nicht ohne Inhalte starten.')
  process.exit(1)
})
