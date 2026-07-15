/**
 * Holt die redaktionellen Inhalte aus Sanity und schreibt sie nach src/content.js
 * (gleiche Form wie früher in data.js). Läuft automatisch vor jedem Build (prebuild).
 *
 * Nur Lesezugriff auf das öffentliche Dataset – kein Token nötig.
 * Fällt der Abruf aus (z. B. Sanity nicht erreichbar), bleibt die zuletzt
 * eingecheckte src/content.js erhalten, damit der Build nie bricht.
 */
import {createClient} from '@sanity/client'
import {writeFileSync, existsSync} from 'node:fs'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(__dirname, '..', 'src', 'content.js')

const client = createClient({
  projectId: 'xzcgo5ky',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const MONTH_DE = ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ']

const DYN_SEITEN_QUERY = `{
  "seite": *[_type=="seite"]{slug,page_theme,content_modules},
}`

// Seiten-Singletons (redaktionelle Texte + Bilder pro Seite). Bild-Felder als CDN-URL.
const SEITEN_QUERY = `{
  // "startseite": *[_id=="seiteStartseite"][0]{content_modules},
  // "startseite": *[_id=="seiteStartseite"][0]{heroZeilen,heroText,heroButton,"heroBild":heroBild.asset->url,erstwaehlerText,erstwaehlerLink,kalenderTitel,countdownTitel,kandidatenZeilen,kandidatenText,kandidatenLink,unfckZeilen,unfckText,unfckButton,"unfckBild":unfckBild.asset->url},

  "countdown": *[_id=="seiteCountDown"][0]{heroZeilen,erststimmeTitel,erststimmeText,"duoBild":duoBild.asset->url,duoLinkText,zweitstimmeTitel,zweitstimmeText,waehlenMit16Titel,gehoertDirTitel,waehlenMit16Text,programmButton,introText1,introText2,subFrageTitel,subFrageText,voltomatTitel,voltomatText,voltomatButton},
  "paulAnna": *[_id=="seitePaulAnna"][0]{annaTitel,"annaBild":annaBild.asset->url,"annaBildJacke":annaBildJacke.asset->url,annaIntro,annaFragen[]{frage,antwort},annaSocialLabel,medienTitelZeilen,"medienBilder":medienBilder[].asset->url,medienButton,paulTitel,"paulBild":paulBild.asset->url,paulIntro,paulFragen[]{frage,antwort},paulSocialLabel},
  "voltomat": *[_id=="seiteVoltomat"][0]{titel,text1,text2,button},
  "mitmachen": *[_id=="seiteMitmachen"][0]{heroZeilen,heroText,einladungText,carouselTitel,"carouselBilder":carouselBilder[].asset->url,carouselButton},
  "imBezirk": *[_id=="seiteImBezirk"][0]{heroZeilen,heroText,werteWorte,werteText,kalenderTitel,voteTitel,voteText,voteButton,"voteBild":voteBild.asset->url},
  "bezirk": *[_id=="seiteBezirk"][0]{wasZuTunTitel,sorgenTitel,sorgenText,kandidierendeTitel},
  "alleKandis": *[_id=="seiteAlleKandis"][0]{titelZeilen,subtitle},
  "unfck": *[_id=="seiteUnfck"][0]{heroZeilen,introTitel,heroText,stickerButton,"grossesBild":grossesBild.asset->url,kraftTitel,textBlock1,programmButton,"collage1":collage1[].asset->url,schlussTitel,textBlock2,stimmeButton,"stickerBilder":stickerBilder[].asset->url},
  "wahlprogramm": *[_id=="seiteWahlprogramm"][0]{titel,introBold,introText,programmButton,programmUrl,kapitel[]{titel,tags,text},europaZeilen,europaText,kalenderTitel}
}`

async function main() {
  const [agh, bvv, duo, termine, bezirkThemen, neuigkeiten, texte, SEITEN, DYN_SEITEN] = await Promise.all([
    client.fetch(`*[_type=="kandidatAgh"]|order(listenplatz asc){"slug":slug.current,name,"foto":foto.asset->url,listenplatz,alter,bezirk,wahlkreis,themen,herzensthema,ueberMich,"foto2":foto2.asset->url,berlinIst}`),
    client.fetch(`*[_type=="kandidatBvv"]|order(wahlkreis asc){name,wahlkreis,schwerpunkte}`),
    client.fetch(`*[_type=="spitzenduo"]|order(reihenfolge asc){"slug":slug.current,vorname,nachname,"foto":foto.asset->url}`),
    client.fetch(`*[_type=="termin"]|order(datum asc){datum,uhrzeit,typ,typeColor,titel,ort}`),
    client.fetch(`*[_type=="bezirkThema"]|order(bezirk asc, reihenfolge asc){bezirk,tag,titel,beschreibung}`),
    client.fetch(`*[_type=="neuigkeit"]|order(reihenfolge asc){titel}`),
    client.fetch(`*[_id=="siteTexte"][0]{platzhalter,platzhalterLang,ziele}`),
    client.fetch(SEITEN_QUERY),
    client.fetch(DYN_SEITEN_QUERY),
  ])

  const DYN_SEITEN_MAPPED = DYN_SEITEN.seite

  const KANDIDATEN = agh.map((k) => ({
    slug: k.slug,
    name: k.name,
    foto: k.foto || '',
    listenplatz: k.listenplatz,
    alter: k.alter,
    bezirk: k.bezirk,
    wahlkreis: k.wahlkreis,
    themen: k.themen,
    herzensthema: k.herzensthema || '',
    ueberMich: k.ueberMich || '',
    foto2: k.foto2 || '',
    berlinIst: k.berlinIst || '',
  }))

  const KANDIDAT_INNEN = bvv.map((k) => ({
    name: k.name,
    wahlkreis: k.wahlkreis,
    schwerpunkte: k.schwerpunkte,
  }))

  const SPITZENDUO_BASE = duo.map((s) => ({
    slug: s.slug,
    name: [s.vorname, s.nachname || ''],
    foto: s.foto || '',
  }))

  // Vergangene Termine fliegen raus (Stichtag: Build-Datum); Reihenfolge bleibt
  // aufsteigend. Die Seiten zeigen daraus die jeweils nächsten Termine.
  const heute = new Date().toISOString().slice(0, 10)
  const TERMINE = termine
    .filter((t) => (t.datum || '') >= heute)
    .map((t) => {
      const [y, m, d] = (t.datum || '').split('-')
      return {
        datum: t.datum || '',
        day: d || '',
        month: m ? MONTH_DE[Number(m) - 1] : '',
        type: t.typ || '',
        typeColor: t.typeColor || 'pink',
        title: t.titel || '',
        where: [t.ort, t.uhrzeit].filter(Boolean).join(', '),
      }
    })

  const BEZIRK_THEMEN = {}
  for (const b of bezirkThemen) {
    if (!BEZIRK_THEMEN[b.bezirk]) BEZIRK_THEMEN[b.bezirk] = []
    BEZIRK_THEMEN[b.bezirk].push({tag: b.tag, title: b.titel, desc: b.beschreibung || ''})
  }

  const NEUIGKEITEN = neuigkeiten.map((n) => ({title: n.titel}))
  const ZIELE = texte?.ziele || []
  const PLATZHALTER = texte?.platzhalter || ''
  const PLATZHALTER_LANG = texte?.platzhalterLang || ''

  const out = `// AUTO-GENERIERT von scripts/fetch-content.mjs aus Sanity.
// NICHT manuell editieren – Änderungen macht Volt im Sanity Studio.
// Letzter Abruf: ${new Date().toISOString()}

export const KANDIDATEN = ${JSON.stringify(KANDIDATEN, null, 2)};

export const KANDIDAT_INNEN = ${JSON.stringify(KANDIDAT_INNEN, null, 2)};

export const SPITZENDUO_BASE = ${JSON.stringify(SPITZENDUO_BASE, null, 2)};

export const TERMINE = ${JSON.stringify(TERMINE, null, 2)};

export const BEZIRK_THEMEN = ${JSON.stringify(BEZIRK_THEMEN, null, 2)};

export const NEUIGKEITEN = ${JSON.stringify(NEUIGKEITEN, null, 2)};

export const ZIELE = ${JSON.stringify(ZIELE, null, 2)};

export const PLATZHALTER = ${JSON.stringify(PLATZHALTER)};

export const PLATZHALTER_LANG = ${JSON.stringify(PLATZHALTER_LANG)};

export const SEITEN = ${JSON.stringify(SEITEN, null, 2)};

export const DYN_SEITEN = ${JSON.stringify(DYN_SEITEN_MAPPED, null, 2)};
`

  writeFileSync(OUT, out, 'utf8')
  console.log(`content.js aktualisiert: ${KANDIDATEN.length} AGH, ${KANDIDAT_INNEN.length} BVV, ${TERMINE.length} Termine, ${NEUIGKEITEN.length} Neuigkeiten.`)
}

main().catch((err) => {
  console.warn('Sanity-Abruf fehlgeschlagen:', err.message)
  if (existsSync(OUT)) {
    console.warn('Behalte bestehende src/content.js (letzter Stand).')
    process.exit(0)
  }
  console.error('Keine content.js vorhanden – Build kann nicht ohne Inhalte starten.')
  process.exit(1)
})
