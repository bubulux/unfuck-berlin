import { REGIONS_CMS } from '../../data/regions.generated'
import { DISTRICT_BY_SLUG } from '../../data/berlin-districts'

export interface OverviewCandidate {
  name: string
  image: string
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
}

/**
 * Verheiratet die Sanity-Regionen mit der Kartengeometrie. Nur Bezirke, fuer
 * die es beides gibt, kommen durch – so bleibt die Karte konsistent, falls im
 * CMS ein Bezirk fehlt oder neu dazukommt.
 */
const OVERVIEW_DISTRICTS: OverviewDistrict[] = REGIONS_CMS.flatMap(
  (region) => {
    const shape = DISTRICT_BY_SLUG[region.slug]
    if (!shape) return []

    const candidates: OverviewCandidate[] = (region.candidates ?? []).map(
      (candidate) => {
        return {
          name: candidate.name,
          image: typeof candidate.image === 'string' ? candidate.image : '',
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
      },
    ]
  },
)

const TITLE_BY_SLUG: Record<string, string> = Object.fromEntries(
  OVERVIEW_DISTRICTS.map((d) => [d.slug, d.title]),
)

/** Fallback auf den Slug, falls die Karte einen Bezirk ohne CMS-Eintrag zeigt. */
export function districtLabel(slug: string): string {
  return TITLE_BY_SLUG[slug] ?? slug
}

/** Nord→Sued, West→Ost – liest sich auf der Karte wie ein Scan. */
export const OVERVIEW_GEOGRAPHIC = [...OVERVIEW_DISTRICTS].sort(
  (a, b) => a.cy - b.cy || a.cx - b.cx,
)
