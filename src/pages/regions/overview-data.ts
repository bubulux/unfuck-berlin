import { REGIONS_CMS } from '../../data/regions.generated'
import { BERLIN_DISTRICTS, DISTRICT_BY_SLUG } from '../../data/berlin-districts'

export interface OverviewCandidate {
  name: string
  image: string
  wahlkreis: string
}

export interface OverviewDistrict {
  slug: string
  title: string
  href: string
  candidates: OverviewCandidate[]
  /** Namen des Spitzenduos, fertig fuer eine einzeilige Ausgabe. */
  duo: string
  /** Flaechenschwerpunkt im viewBox-System der Karte. */
  cx: number
  cy: number
  tile: { col: number; row: number }
}

/**
 * Verheiratet die Sanity-Regionen mit der Kartengeometrie. Nur Bezirke, fuer
 * die es beides gibt, kommen durch – so bleibt die Karte konsistent, falls im
 * CMS ein Bezirk fehlt oder neu dazukommt.
 */
export const OVERVIEW_DISTRICTS: OverviewDistrict[] = REGIONS_CMS.flatMap(
  (region) => {
    const shape = DISTRICT_BY_SLUG[region.slug]
    if (!shape) return []

    const candidates: OverviewCandidate[] = (region.candidates ?? []).map(
      (candidate) => {
        const loose = candidate as unknown as Record<string, unknown>
        return {
          name: candidate.name,
          image: typeof candidate.image === 'string' ? candidate.image : '',
          wahlkreis:
            typeof loose.wahlkreis === 'string' ? (loose.wahlkreis as string) : '',
        }
      },
    )

    return [
      {
        slug: region.slug,
        title: region.title || region.name,
        href: `/bezirke/${region.slug}`,
        candidates,
        duo: candidates.map((c) => c.name).join(' & '),
        cx: shape.cx,
        cy: shape.cy,
        tile: shape.tile,
      },
    ]
  },
)

/** Alphabetisch – die Reihenfolge fuer Listenansichten. */
export const OVERVIEW_ALPHABETICAL = [...OVERVIEW_DISTRICTS].sort((a, b) =>
  a.title.localeCompare(b.title, 'de'),
)

const TITLE_BY_SLUG: Record<string, string> = Object.fromEntries(
  OVERVIEW_DISTRICTS.map((d) => [d.slug, d.title]),
)

/** Fallback auf den Slug, falls die Karte einen Bezirk ohne CMS-Eintrag zeigt. */
export function districtLabel(slug: string): string {
  return TITLE_BY_SLUG[slug] ?? slug
}

/**
 * Teilt die Bezirke in eine linke und eine rechte Spalte: die westliche Haelfte
 * nach links, die oestliche nach rechts, innerhalb der Spalte von Nord nach
 * Sued. So faechern die Verbindungslinien auf, ohne sich zu kreuzen.
 */
export function splitIntoColumns(districts: OverviewDistrict[]) {
  const byLongitude = [...districts].sort((a, b) => a.cx - b.cx)
  const half = Math.ceil(byLongitude.length / 2)
  const northToSouth = (a: OverviewDistrict, b: OverviewDistrict) => a.cy - b.cy
  return {
    left: byLongitude.slice(0, half).sort(northToSouth),
    right: byLongitude.slice(half).sort(northToSouth),
  }
}

/** Nord→Sued, West→Ost – liest sich auf der Karte wie ein Scan. */
export const OVERVIEW_GEOGRAPHIC = [...OVERVIEW_DISTRICTS].sort(
  (a, b) => a.cy - b.cy || a.cx - b.cx,
)

export const ALL_DISTRICT_SLUGS = BERLIN_DISTRICTS.map((d) => d.slug)
