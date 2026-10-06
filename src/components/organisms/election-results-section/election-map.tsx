import { BERLIN_DISTRICTS, BERLIN_VIEWBOX } from '../../../data/berlin-districts'
import { BVV_RESULTS, formatPercent } from '../../../data/wahlergebnis'

const RESULT_BY_SLUG = Object.fromEntries(BVV_RESULTS.map((r) => [r.slug, r]))
const MAX_RESULT = Math.max(...BVV_RESULTS.map((r) => r.current))

/** Bezirke ohne Einzug: Deckkraft je nach Ergebnis (heller = mehr Stimmen). */
function shade(value: number): number {
  return 0.2 + (value / MAX_RESULT) * 0.6
}

/** Platz links und rechts der Karte fuer die Prozent-Labels (viewBox-Einheiten). */
const GUTTER = 56
/** Linien enden knapp neben der Karte, das Label steht dahinter. */
const LINE_GAP = 4
const LABEL_GAP = 8

/**
 * Label-Position je Bezirk: Seite und Hoehe. Die Bezirke sind zu klein bzw.
 * zu schmal fuer Zahlen in der Flaeche (z. B. Friedrichshain-Kreuzberg), also
 * stehen die Werte am Rand und eine Linie fuehrt zum Flaechenschwerpunkt.
 * Die Reihenfolge je Seite ist so gewaehlt, dass sich keine Linien kreuzen.
 */
const LABEL_SLOTS: Record<string, { side: 'left' | 'right'; y: number }> = {
  reinickendorf: { side: 'left', y: 40 },
  mitte: { side: 'left', y: 85 },
  spandau: { side: 'left', y: 120 },
  'charlottenburg-wilmersdorf': { side: 'left', y: 155 },
  'steglitz-zehlendorf': { side: 'left', y: 195 },
  'tempelhof-schoeneberg': { side: 'left', y: 235 },
  pankow: { side: 'right', y: 40 },
  lichtenberg: { side: 'right', y: 85 },
  'marzahn-hellersdorf': { side: 'right', y: 120 },
  'friedrichshain-kreuzberg': { side: 'right', y: 155 },
  'treptow-koepenick': { side: 'right', y: 195 },
  neukoelln: { side: 'right', y: 235 },
}

export interface ElectionMapProps {
  /** Hervorgehobener Bezirk, alle anderen werden gedimmt. */
  activeSlug?: string | null
}

/**
 * Berlin als Flaechenkarte mit BVV-Ergebnis je Bezirk. Rein visuell
 * (aria-hidden) – die Zahlen stehen fuer Screenreader in ResultsDataTables.
 */
export function ElectionMap({ activeSlug = null }: ElectionMapProps) {
  const { width, height } = BERLIN_VIEWBOX

  return (
    <svg
      className={['election-map', activeSlug && 'election-map--focused']
        .filter(Boolean)
        .join(' ')}
      viewBox={`${-GUTTER} 0 ${width + 2 * GUTTER} ${height}`}
      aria-hidden="true"
    >
      {BERLIN_DISTRICTS.map((d) => {
        const r = RESULT_BY_SLUG[d.slug]
        if (!r) return null
        const elected = r.seats > 0
        return (
          <path
            key={d.slug}
            d={d.d}
            className={[
              'election-map__district',
              elected && 'election-map__district--elected',
              activeSlug === d.slug && 'election-map__district--active',
            ]
              .filter(Boolean)
              .join(' ')}
            style={elected ? undefined : { fillOpacity: shade(r.current) }}
          />
        )
      })}

      {BERLIN_DISTRICTS.map((d) => {
        const r = RESULT_BY_SLUG[d.slug]
        const slot = LABEL_SLOTS[d.slug]
        if (!r || !slot) return null
        const left = slot.side === 'left'
        const lineX = left ? -LINE_GAP : width + LINE_GAP
        const labelX = left ? -LABEL_GAP : width + LABEL_GAP
        return (
          <g
            key={d.slug}
            className={[
              'election-map__callout',
              r.seats > 0 && 'election-map__callout--elected',
              activeSlug === d.slug && 'election-map__callout--active',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <line x1={d.cx} y1={d.cy} x2={lineX} y2={slot.y} className="election-map__leader" />
            <circle cx={d.cx} cy={d.cy} r={2.5} className="election-map__dot" />
            <text
              x={labelX}
              y={slot.y}
              textAnchor={left ? 'end' : 'start'}
              className="election-map__label"
            >
              {formatPercent(r.current)}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default ElectionMap
