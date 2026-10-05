import { REGIONS_CMS } from './regions.generated'

// Ergebnisse der Berlin-Wahl vom 20.09.2026 fuer die Startseite. Die Zahlen
// stammen aus den beiden Diagrammen im Artikel /news/wahlergebnisse; die
// Diagramme werden hier im Code nachgebaut (barrierefrei statt als Bild),
// Quelle und Stand bleiben dieselben.

export const WAHLERGEBNIS_SOURCE =
  'Der Landeswahlleiter für Berlin/Amt für Statistik Berlin-Brandenburg. 2023 (Wiederholungswahl) amtliches Endergebnis; 2026 vorläufiges Ergebnis, Stand 21.09.2026.'

/** Artikel mit allen Details. */
export const WAHLERGEBNIS_ARTICLE = '/news/wahlergebnisse'

export const MITMACHEN_HREF = 'https://voltdeutschland.org/berlin/mitmachen'

/** Abgeordnetenhaus: Zweitstimmenanteil in Prozent. */
export const AGH_RESULT = {
  previous: 0.9,
  current: 2.1,
  threshold: 5,
} as const

/** Sperrklausel fuer die Bezirksverordnetenversammlungen. */
export const BVV_THRESHOLD = 3

export interface ElectedMember {
  name: string
  /** Portrait aus dem CMS (Bezirkskandidierende), leer falls nicht vorhanden. */
  image: string
}

export interface BvvResult {
  /** Slug – identisch mit Sanity-Region und Kartengeometrie. */
  slug: string
  name: string
  /** 2023 (Wiederholungswahl); `null` = Volt ist dort nicht angetreten. */
  previous: number | null
  current: number
  seats: number
  elected: ElectedMember[]
}

type RawBvvResult = Omit<BvvResult, 'elected'> & { elected: string[] }

const RAW_BVV: RawBvvResult[] = [
  { slug: 'pankow', name: 'Pankow', previous: 1.5, current: 3.5, seats: 2, elected: ['Domenic Bay', 'Theresa Schültken'] },
  { slug: 'friedrichshain-kreuzberg', name: 'Friedrichshain-Kreuzberg', previous: 1.8, current: 3.3, seats: 2, elected: ['Christoph König', 'Susanne Zels'] },
  { slug: 'mitte', name: 'Mitte', previous: 2.0, current: 3.1, seats: 1, elected: ['Axumawit Berhe'] },
  { slug: 'charlottenburg-wilmersdorf', name: 'Charlottenburg-Wilmersdorf', previous: 1.4, current: 3.0, seats: 1, elected: ['Cara Seeberg'] },
  { slug: 'steglitz-zehlendorf', name: 'Steglitz-Zehlendorf', previous: 1.2, current: 2.7, seats: 0, elected: [] },
  { slug: 'tempelhof-schoeneberg', name: 'Tempelhof-Schöneberg', previous: 1.3, current: 2.3, seats: 0, elected: [] },
  { slug: 'lichtenberg', name: 'Lichtenberg', previous: null, current: 2.3, seats: 0, elected: [] },
  { slug: 'reinickendorf', name: 'Reinickendorf', previous: null, current: 2.2, seats: 0, elected: [] },
  { slug: 'treptow-koepenick', name: 'Treptow-Köpenick', previous: null, current: 1.8, seats: 0, elected: [] },
  { slug: 'neukoelln', name: 'Neukölln', previous: 0.8, current: 1.6, seats: 0, elected: [] },
  { slug: 'marzahn-hellersdorf', name: 'Marzahn-Hellersdorf', previous: null, current: 1.5, seats: 0, elected: [] },
  { slug: 'spandau', name: 'Spandau', previous: null, current: 1.4, seats: 0, elected: [] },
]

const PORTRAIT_BY_NAME: Record<string, string> = Object.fromEntries(
  REGIONS_CMS.flatMap((region) =>
    (region.candidates ?? []).map((c) => [
      c.name,
      typeof c.image === 'string' ? c.image : '',
    ]),
  ),
)

/** Alle zwoelf Bezirke, absteigend nach Ergebnis 2026. */
export const BVV_RESULTS: BvvResult[] = RAW_BVV.map((r) => ({
  ...r,
  elected: r.elected.map((name) => ({
    name,
    image: PORTRAIT_BY_NAME[name] ?? '',
  })),
}))

/** Nur die Bezirke, in denen Volt eingezogen ist. */
export const BVV_ELECTED = BVV_RESULTS.filter((r) => r.seats > 0)

export const BVV_TOTAL_SEATS = BVV_ELECTED.reduce((sum, r) => sum + r.seats, 0)

const percentFormat = new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

/** 3.5 -> "3,5 %" */
export function formatPercent(value: number): string {
  return `${percentFormat.format(value)} %`
}
