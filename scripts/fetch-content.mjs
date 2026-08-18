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
const OUT_WAHLSYSTEM = resolve(DATA_DIR, 'wahlsystem.generated.ts')
const OUT_VIDEOS = resolve(DATA_DIR, 'videos.generated.ts')
const OUT_MEETS = resolve(DATA_DIR, 'meets.generated.ts')
const OUT_UNFCK = resolve(DATA_DIR, 'unfck.generated.ts')
const OUT_SPITZENDUO = resolve(DATA_DIR, 'spitzenduo.generated.ts')
const OUT_CLUSTER = resolve(DATA_DIR, 'kandidaten-cluster.generated.ts')
const OUT_REGIONS = resolve(DATA_DIR, 'regions.generated.ts')
const OUT_NEWS = resolve(DATA_DIR, 'news.generated.ts')
const OUT_PRESS = resolve(DATA_DIR, 'press.generated.ts')
const OUT_PAGES = resolve(DATA_DIR, 'pages.generated.ts')

const client = createClient({
  projectId: 'xzcgo5ky',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Sanity-Bilder einheitlich zuschneiden (oben ausgerichtet) und automatisch ins
// beste Format ausliefern. Quellbilder variieren stark in Groesse, daher lohnt
// der einheitliche Crop. Karte: 4:5, Detailseite: 3:4 (groesser).
const CARD_IMG_PARAMS = 'w=600&h=600&fit=fill&crop=entropy&auto=format&sharp=20'
const DETAIL_IMG_PARAMS = 'w=1200&h=1200&fit=fill&crop=entropy&auto=format&sharp=30'
// Karussellbilder unveraendert lassen (nur ins beste Format ausliefern).
const MEET_IMG_PARAMS = 'w=1200&h=1200&fit=fill&crop=entropy&auto=format&sharp=10'
// Cluster-Kacheln: Hochformat (3:4) der Quellbilder beibehalten – kein Zuschnitt.
const CLUSTER_IMG_PARAMS = 'w=600&h=600&fit=fill&crop=entropy&auto=format&sharp=20'

// Feste Auswahl + Reihenfolge der 9 Kandidierenden im Home-Cluster (3x3).
const CLUSTER_SLUGS = [
  'rainer-seider',
  'aiga-marie-senftleben',
  'rafael-kaaz',
  'ingo-partey',
  'juliane-kalbacher',
  'pia-voltz',
  'theresa-schueltken',
  'cara-seeberg',
  'sascha-hellwig',
]
const withParams = (url, params) => {
  const base = (url || '').trim()
  if (!base) return ''
  return base + (base.includes('?') ? '&' : '?') + params
}

const clean = (s) => (s || '').trim()
const lines = (arr) => (Array.isArray(arr) ? arr.map((z) => clean(z)).filter(Boolean) : [])
// seiteCountDown trennt Absaetze mit einzelnem \n; in ein Array zerlegen.
const splitLines = (s) => clean(s).split('\n').map((l) => l.trim()).filter(Boolean)
// Titel mit \n zu einer Zeile zusammenfassen.
const oneLine = (s) => clean(s).replace(/\s*\n\s*/g, ' ')

const REGIONS_QUERY = `*[_type=="region"]|order(name desc){
  ...,
  "slug": slug.current,
  "candidates": candidates_ref[]{
    _type == "reference" => @-> {
      ...,
      "foto": foto.asset->url,
      "foto_originalFilename": foto.asset->originalFilename,
      "foto_2": foto2.asset->url,
      "foto_originalFilename_2": foto2.asset->originalFilename,
    }
  }
}`

const NEWS_QUERY = `*[_type=="article"]|order(published_at desc){
  ...,
  "slug": slug.current,
  content_modules[]{
    ...,
    "photo": photo.asset->url,
    "foto_originalFilename": photo.asset->originalFilename,
  }
}`

const PRESS_QUERY = `*[_type=="press"]|order(published_at desc){
  ...,
  "screenshot": screenshot.asset->url,
  "screenshot_originalFilename": screenshot.asset->originalFilename,
}`

const PAGES_QUERY = `*[_type=="seite"]|order(slug desc){
  ...,
  "slug": slug.current,
  content_modules[]{
    ...,
    "photo": photo.asset->url,
    "foto_originalFilename": photo.asset->originalFilename,
  }
}`

const WAHLPROGRAMM_QUERY = `*[_type=="seite" && slug.current=="wahlprogramm"][0]{
  content_modules[]{
    _type,
    heroZeilen, heroText, headline_theme,
    headlineZeilen,
    html_content,
    ctaLabel, ctaHref,
    "kapitel": kapitel[]{titel, tags, text}
  }
}`

const KANDIDATEN_QUERY = `*[_type=="kandidatAgh"]|order(listenplatz asc){
  ...,
  "slug": slug.current,
  "foto": foto.asset->url,
  "foto_originalFilename": foto.asset->originalFilename,

  "foto_2": foto2.asset->url,
  "foto_originalFilename_2": foto2.asset->originalFilename,
}`

const WAHLSYSTEM_QUERY = `*[_id=="seiteCountDown"][0]{
  heroZeilen, erststimmeTitel, erststimmeText, zweitstimmeTitel, zweitstimmeText,
  duoLinkText, waehlenMit16Titel, gehoertDirTitel, waehlenMit16Text, programmButton
}`

// Videos liegen als Assets in der Sanity-Bibliothek (kein Schema-Feld noetig) und
// werden ueber den originalFilename referenziert. So kann Volt die Datei im Studio
// austauschen, ohne dass sich Code aendern muss.
const VIDEOS_QUERY = `{
  "annaPaulSrc": *[_type=="sanity.fileAsset" && originalFilename=="20260804_VOLT_ANNA_UND_PAUL_UNFCK_BERLIN_STATEMENT_KURZVERSION_V02_720p.mov"][0].url,
  "annaPaulPoster": *[_type=="sanity.imageAsset" && originalFilename=="20260804_VOLT_ANNA_UND_PAUL_UNFCK_BERLIN_STATEMENT_KURZVERSION_V02_720p_coverphoto.jpg"][0].url,
  "revealSrc": *[_type=="sanity.fileAsset" && originalFilename=="20260715_VOLT_UNFCK_REVEAL_LONG_VERSION_FINAL_XtraSmall.mp4"][0].url,
  "revealPoster": *[_type=="sanity.imageAsset" && originalFilename=="unfck_reveal_poster.jpg"][0].url
}`

// Meet-&-Greet-Karussell der Termine-Seite: kommt aus dem bestehenden CMS-Feld
// seiteMitmachen.carouselBilder (im Studio pflegbar – Bilder hinzufuegen/ordnen).
const MEETS_QUERY = `*[_type=="seiteMitmachen"][0].carouselBilder[]{
  "url": asset->url,
  "foto_originalFilename": asset->originalFilename,
}`

// Bilder-Collage der /unfuck-berlin-Seite: kommt aus seiteUnfck.collage1
// (im Studio pflegbar). Reihenfolge = Array-Reihenfolge im Dokument.
const UNFCK_QUERY = `*[_id=="seiteUnfck"][0].collage1[]{
  "url": asset->url,
  "foto_originalFilename": asset->originalFilename,
}`

// Spitzenduo (Anna & Paul) fuer die Kandidierenden-Karten: Foto + Name aus dem
// spitzenduo-Dokument. Reihenfolge = Anna (1) vor Paul (2).
const SPITZENDUO_QUERY = `*[_type=="spitzenduo"]|order(reihenfolge asc){
  vorname,
  nachname,
  "foto": foto.asset->url,
  "foto_originalFilename": foto.asset->originalFilename,
}`

function buildRegions(rows) {
  const regions = (rows || [])
    .filter((a) => a.slug)
    .map((region) => {
      const content_modules = region.content_modules || []
      // const hero_module = content_modules.find((m) => m._type === 'hero_linear') || {}

      return {
        name: clean(region.name),
        slug: clean(region.slug),
        // theme: clean(region.theme),
        // is_published: Boolean(region.is_published),
        // publishedAt: clean(region.published_at),
        title: clean(region.name),
        candidates: region.candidates.map(c => {
          return {
            ...c,
            foto_originalFilename: c.foto_originalFilename || '',
            image: withParams(c.foto, CARD_IMG_PARAMS),
            imageDetail: withParams(c.foto, DETAIL_IMG_PARAMS),

            foto_originalFilename_2: c.foto_originalFilename_2 || '',
            image_2: withParams(c.foto_2, CARD_IMG_PARAMS),
            imageDetail_2: withParams(c.foto_2, DETAIL_IMG_PARAMS),
          }
        }),
        body: '', // clean(hero_module.heroText),
        content_modules,
      }
    })

  return regions
}

function buildNews(rows) {
  const articles = (rows || [])
    .filter((a) => a.slug)
    .map((article) => {
      const content_modules = article.content_modules || []
      const hero_module = content_modules.find((m) => m._type === 'hero_linear') || {}
      const photo_module = content_modules.find((m) => m._type === 'photo')

      return {
        slug: clean(article.slug),
        theme: clean(article.theme),
        is_published: Boolean(article.is_published),
        publishedAt: clean(article.published_at),
        title: lines(hero_module.heroZeilen),
        body: clean(hero_module.heroText),
        content_modules,

        ...(photo_module ? {
          image_originalFilename: photo_module.photo.foto_originalFilename || '',
          image: withParams(photo_module.photo, CARD_IMG_PARAMS),
          imageDetail: withParams(photo_module.photo, DETAIL_IMG_PARAMS),
        }: {
          image_originalFilename: null,
          image: null,
          imageDetail: null,
        })
      }
    })

  return articles
}

function buildPress(rows) {
  const press = (rows || [])
    .map((press) => {
      return {
        ...press,
        is_published: Boolean(press.is_published),
        publishedAt: clean(press.published_at),
        screenshot_originalFilename: press.screenshot_originalFilename || '',
        screenshot: withParams(press.screenshot, CARD_IMG_PARAMS),
        screenshotDetail: withParams(press.screenshot, DETAIL_IMG_PARAMS),
      }
    })

  return press
}

function buildPages(rows) {
  const articles = (rows || [])
    .filter((a) => a.slug)
    .map((article) => {
      const content_modules = article.content_modules || []
      const hero_module = content_modules.find((m) => m._type === 'hero_linear') || {}

      return {
        slug: clean(article.slug),
        theme: clean(article.theme),
        is_published: Boolean(article.is_published),
        // publishedAt: clean(article.published_at),
        title: lines(hero_module.heroZeilen),
        body: clean(hero_module.heroText),
        content_modules,
      }
    })

  return articles
}

function buildWahlprogramm(res) {
  const mods = res?.content_modules || []
  if (!mods.length) {
    throw new Error('Seite "wahlprogramm" ohne content_modules (leere Antwort).')
  }

  const idxTeaser = mods.findIndex((m) => m._type === 'wahlprogramm_teaser')
  const hero = mods.find((m) => m._type === 'hero_linear') || {}
  const headline = mods.find((m) => m._type === 'headline') || {}
  const htmlText = mods.find((m) => m._type === 'html_content') || {}
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
      body: clean(htmlText.html_content),
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

      foto_originalFilename: k.foto_originalFilename || '',
      image: withParams(k.foto, CARD_IMG_PARAMS),
      imageDetail: withParams(k.foto, DETAIL_IMG_PARAMS),

      foto_originalFilename_2: k.foto_originalFilename_2 || '',
      image_2: withParams(k.foto_2, CARD_IMG_PARAMS),
      imageDetail_2: withParams(k.foto_2, DETAIL_IMG_PARAMS),

      herzensthema: clean(k.herzensthema),
      ueberMich: clean(k.ueberMich),
      socials: k.socials,
    }))
  if (!list.length) {
    throw new Error('Keine kandidatAgh-Dokumente gefunden.')
  }
  return list
}

function buildWahlsystem(d) {
  if (!d) {
    throw new Error('Dokument "seiteCountDown" nicht gefunden.')
  }
  return {
    heading: lines(d.heroZeilen),
    first: {
      title: oneLine(d.erststimmeTitel),
      paragraphs: splitLines(d.erststimmeText),
    },
    second: {
      title: oneLine(d.zweitstimmeTitel),
      paragraphs: splitLines(d.zweitstimmeText),
    },
    mediaCaption: clean(d.duoLinkText),
    mit16: {
      heading: clean(d.waehlenMit16Titel),
      lead: clean(d.gehoertDirTitel),
      paragraphs: splitLines(d.waehlenMit16Text),
      ctaLabel: clean(d.programmButton),
    },
  }
}

function buildVideos(d) {
  const out = {
    annaPaulIntro: { src: clean(d?.annaPaulSrc), poster: clean(d?.annaPaulPoster) },
    reveal: { src: clean(d?.revealSrc), poster: clean(d?.revealPoster) },
  }
  if (!out.annaPaulIntro.src || !out.reveal.src) {
    throw new Error('Video-Assets in Sanity nicht gefunden (per originalFilename).')
  }
  return out
}

function buildMeets(rows) {
  const list = (rows || [])
    .map((b, i) => ({
      foto_originalFilename: b.foto_originalFilename || '',
      src: withParams(b?.url, MEET_IMG_PARAMS),
      alt: `Meet & Greet ${i + 1}`
    }))
    .filter((b) => b.src)
  if (!list.length) {
    throw new Error('Kein Karussell (seiteMitmachen.carouselBilder) mit Bildern gefunden.')
  }
  return list
}

function buildUnfck(rows) {
  const list = (rows || [])
    .map((b, i) => ({
      foto_originalFilename: b.foto_originalFilename || '',
      src: withParams(b?.url, MEET_IMG_PARAMS),
      alt: `unf*ck berlin ${i + 1}`
    }))
    .filter((b) => b.src)
  if (!list.length) {
    throw new Error('Keine Collage (seiteUnfck.collage1) mit Bildern gefunden.')
  }
  return list
}

function buildCluster(rows) {
  const bySlug = new Map((rows || []).filter((r) => r && r.slug).map((r) => [r.slug, r]))
  const list = CLUSTER_SLUGS.map((slug) => {
    const r = bySlug.get(slug)
    if (!r || !r.foto) return null
    return {
      foto_originalFilename: r.foto_originalFilename || '',
      image: withParams(r.foto, CLUSTER_IMG_PARAMS),
      alt: clean(r.name)
    }
  }).filter(Boolean)
  if (list.length < CLUSTER_SLUGS.length) {
    throw new Error(
      `Cluster: ${CLUSTER_SLUGS.length - list.length} Kandidat(en) nicht gefunden (Slug/Foto).`,
    )
  }
  return list
}

function buildSpitzenduo(rows, kandidaten) {
  // Foto + Name kommen aus dem spitzenduo-Dokument; der Link zeigt auf die
  // Detailseite der passenden Person im Kandidierenden-Pool (nach Reihenfolge
  // gepaart: spitzenduo[0]/kandidaten[0] = Anna, [1] = Paul).
  const list = (rows || [])
    .filter((p) => p && p.foto)
    .map((p, i) => {
      const vorname = clean(p.vorname)
      const nachname = clean(p.nachname)
      const slug = kandidaten[i]?.slug || ''
      // Rolle + Kartenfarbe positionsbasiert (Anna = 1., Paul = 2.), da das CMS
      // keine Felder dafuer hat. Farben vom Kunden zum Foto gepickt.
      const role = i === 0 ? 'Volt Spitzenkandidatin' : 'Volt Spitzenkandidat'
      const bg = i === 0 ? '#5b3381' : '#382255'
      return {
        vorname,
        nachname,
        role,
        foto_originalFilename: p.foto_originalFilename || '',
        image: withParams(p.foto, MEET_IMG_PARAMS),
        alt: `${vorname} ${nachname}`.trim(),
        bg,
        to: slug ? `/kandidierende/${slug}` : '',
      }
    })
  if (!list.length) {
    throw new Error('Keine spitzenduo-Dokumente mit Foto gefunden.')
  }
  return list
}

const header = `// AUTO-GENERIERT von scripts/fetch-content.mjs aus Sanity.
// NICHT manuell editieren – Änderungen macht Volt im Sanity Studio.`
// // Letzter Abruf: ${new Date().toISOString()}

async function main() {
  const [regionsRows, pressRows, newsRows, pagesRows, wpRes, kandiRows, wsRes, videosRes, meetsRes, unfckRes, spitzenduoRows] = await Promise.all([
    client.fetch(REGIONS_QUERY),
    client.fetch(PRESS_QUERY),
    client.fetch(NEWS_QUERY),
    client.fetch(PAGES_QUERY),
    client.fetch(WAHLPROGRAMM_QUERY),
    client.fetch(KANDIDATEN_QUERY),
    client.fetch(WAHLSYSTEM_QUERY),
    client.fetch(VIDEOS_QUERY),
    client.fetch(MEETS_QUERY),
    client.fetch(UNFCK_QUERY),
    client.fetch(SPITZENDUO_QUERY),
  ])

  const regions = buildRegions(regionsRows)
  const press = buildPress(pressRows)
  const news = buildNews(newsRows)
  const pages = buildPages(pagesRows)
  const wahlprogramm = buildWahlprogramm(wpRes)
  const kandidaten = buildKandidaten(kandiRows)
  const wahlsystem = buildWahlsystem(wsRes)
  const videos = buildVideos(videosRes)
  const meets = buildMeets(meetsRes)
  const unfck = buildUnfck(unfckRes)
  const spitzenduo = buildSpitzenduo(spitzenduoRows, kandidaten)
  const cluster = buildCluster(kandiRows)

  writeFileSync(
    OUT_REGIONS,
    `${header}\n\nexport const REGIONS_CMS = ${JSON.stringify(regions, null, 2)}\n`,
    'utf8',
  )

  writeFileSync(
    OUT_PRESS,
    `${header}\n\nexport const PRESS_CMS = ${JSON.stringify(press, null, 2)}\n`,
    'utf8',
  )

  writeFileSync(
    OUT_NEWS,
    `${header}\n\nexport const NEWS_CMS = ${JSON.stringify(news, null, 2)}\n`,
    'utf8',
  )

  writeFileSync(
    OUT_PAGES,
    `${header}\n\nexport const PAGES_CMS = ${JSON.stringify(pages, null, 2)}\n`,
    'utf8',
  )

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
  writeFileSync(
    OUT_WAHLSYSTEM,
    `${header}\n\nexport const WAHLSYSTEM_CMS = ${JSON.stringify(wahlsystem, null, 2)}\n`,
    'utf8',
  )
  writeFileSync(
    OUT_VIDEOS,
    `${header}\n\nexport const VIDEOS_CMS = ${JSON.stringify(videos, null, 2)}\n`,
    'utf8',
  )
  writeFileSync(
    OUT_MEETS,
    `${header}\n\nexport const MEETS_CMS = ${JSON.stringify(meets, null, 2)}\n`,
    'utf8',
  )
  writeFileSync(
    OUT_UNFCK,
    `${header}\n\nexport const UNFCK_COLLAGE_CMS = ${JSON.stringify(unfck, null, 2)}\n`,
    'utf8',
  )
  writeFileSync(
    OUT_SPITZENDUO,
    `${header}\n\nexport const SPITZENDUO_CMS = ${JSON.stringify(spitzenduo, null, 2)}\n`,
    'utf8',
  )
  writeFileSync(
    OUT_CLUSTER,
    `${header}\n\nexport const KANDIDATEN_CLUSTER_CMS = ${JSON.stringify(cluster, null, 2)}\n`,
    'utf8',
  )

  console.info(
    `Inhalte aktualisiert: Bezirke (${regions.length}), Press (${press.length}), News (${news.length}), Pages (${pages.length}), Wahlprogramm (${wahlprogramm.pillars.length} Kapitel), ${kandidaten.length} Kandidierende, Wahlsystem, Videos, Meets (${meets.length}), Unfck-Collage (${unfck.length}), Spitzenduo (${spitzenduo.length}), Cluster (${cluster.length}).`,
  )
}

main().catch((err) => {
  console.warn('Sanity-Abruf fehlgeschlagen:', err.message)
  if (
    existsSync(OUT_REGIONS) &&
    existsSync(OUT_PRESS) &&
    existsSync(OUT_NEWS) &&
    existsSync(OUT_PAGES) &&
    existsSync(OUT_WAHLPROGRAMM) &&
    existsSync(OUT_KANDIDATEN) &&
    existsSync(OUT_WAHLSYSTEM) &&
    existsSync(OUT_VIDEOS) &&
    existsSync(OUT_MEETS) &&
    existsSync(OUT_UNFCK) &&
    existsSync(OUT_SPITZENDUO) &&
    existsSync(OUT_CLUSTER)
  ) {
    console.warn('Behalte bestehende generierte Dateien (letzter Stand).')
    process.exit(0)
  }
  console.error('Generierte Dateien fehlen – Build kann nicht ohne Inhalte starten.')
  process.exit(1)
})
