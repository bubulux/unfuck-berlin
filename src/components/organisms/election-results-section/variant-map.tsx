import { useState } from 'react'
import { Text } from '../../atoms/text'
import { Link } from '../../atoms/link'
import { BERLIN_DISTRICTS, BERLIN_VIEWBOX } from '../../../data/berlin-districts'
import {
  AGH_RESULT,
  BVV_ELECTED,
  BVV_RESULTS,
  formatPercent,
} from '../../../data/wahlergebnis'
import { ElectedPortraits, SeatsBadge, SourceNote, ThresholdBars } from './parts'

const RESULT_BY_SLUG = Object.fromEntries(BVV_RESULTS.map((r) => [r.slug, r]))
const MAX_RESULT = Math.max(...BVV_RESULTS.map((r) => r.current))

/** Bezirke ohne Einzug: Deckkraft je nach Ergebnis (heller = mehr Stimmen). */
function shade(value: number): number {
  return 0.2 + (value / MAX_RESULT) * 0.6
}

/**
 * V3 – Karte: Berlin als Flaechenkarte, die vier Bezirke mit Einzug in Neon
 * mit Sitzzahl, daneben die Gewaehlten als Sticker-Karten. Hover/Fokus auf
 * einer Karte hebt den Bezirk auf der Karte hervor.
 */
export function VariantMap() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="election-v3">
      <div className="election-v3__layout">
        <figure className="election-v3__map">
          <svg
            className={['election-map', active && 'election-map--focused']
              .filter(Boolean)
              .join(' ')}
            viewBox={`0 0 ${BERLIN_VIEWBOX.width} ${BERLIN_VIEWBOX.height}`}
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
                    active === d.slug && 'election-map__district--active',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={elected ? undefined : { fillOpacity: shade(r.current) }}
                />
              )
            })}
            {BERLIN_DISTRICTS.map((d) => {
              const r = RESULT_BY_SLUG[d.slug]
              if (!r) return null
              return (
                <text
                  key={d.slug}
                  x={d.cx}
                  y={d.cy}
                  className={[
                    'election-map__label',
                    r.seats > 0 && 'election-map__label--elected',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {formatPercent(r.current).replace(' %', '%')}
                </text>
              )
            })}
          </svg>
          <figcaption className="election-v3__legend">
            <span><i className="election-swatch election-swatch--current" /> eingezogen (ab 3 %)</span>
            <span><i className="election-swatch election-swatch--scale" /> heller = mehr Stimmen</span>
          </figcaption>
        </figure>

        <div className="election-v3__side">
          <Text as="h3" variant="subtitel" color="white">
            {BVV_ELECTED.length} Bezirke, 6 Bezirksverordnete
          </Text>
          <ul className="election-v3__stickers">
            {BVV_ELECTED.map((r) => (
              <li
                key={r.slug}
                className="election-sticker"
                onMouseEnter={() => setActive(r.slug)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(r.slug)}
                onBlur={() => setActive(null)}
              >
                <div className="election-sticker__head">
                  <Link to={`/bezirke/${r.slug}`} color="purple" className="election-sticker__name">
                    {r.name}
                  </Link>
                  <span className="election-sticker__value">{formatPercent(r.current)}</span>
                </div>
                <SeatsBadge seats={r.seats} />
                <ElectedPortraits members={r.elected} size="sm" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="election-v3__agh">
        <div>
          <Text as="h3" variant="subtitel" color="white">
            Abgeordnetenhaus: {formatPercent(AGH_RESULT.current)}
          </Text>
          <Text as="p" variant="body" color="white">
            Mehr als verdoppelt – der Weg ins Abgeordnetenhaus ist kürzer
            geworden.
          </Text>
        </div>
        <ThresholdBars
          previous={AGH_RESULT.previous}
          current={AGH_RESULT.current}
          threshold={AGH_RESULT.threshold}
        />
      </div>

      <SourceNote />
    </div>
  )
}

export default VariantMap
