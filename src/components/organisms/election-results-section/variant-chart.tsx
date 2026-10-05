import { Text } from '../../atoms/text'
import { Link } from '../../atoms/link'
import {
  AGH_RESULT,
  BVV_ELECTED,
  BVV_RESULTS,
  BVV_THRESHOLD,
  formatPercent,
} from '../../../data/wahlergebnis'
import {
  ElectedPortraits,
  SeatsBadge,
  SourceNote,
  ThresholdBars,
} from './parts'
import { scale } from './scale'

const BVV_AXIS_MAX = 4.5

/**
 * V1 – Diagramm: AGH-Kennzahl links, alle zwoelf Bezirke als Balkendiagramm
 * rechts (Nachbau der Artikel-Grafik), darunter die vier Einzuege mit Gesichtern.
 */
export function VariantChart() {
  return (
    <div className="election-v1">
      <div className="election-v1__charts">
        <div className="election-v1__agh">
          <Text as="h3" variant="subtitel" color="white">
            Abgeordnetenhaus
          </Text>
          <p className="election-v1__big" aria-hidden="true">
            {formatPercent(AGH_RESULT.current)}
          </p>
          <Text as="p" variant="body" color="white">
            Zweitstimmen – mehr als doppelt so viel wie 2023. Für den Einzug
            hat es noch nicht gereicht.
          </Text>
          <ThresholdBars
            previous={AGH_RESULT.previous}
            current={AGH_RESULT.current}
            threshold={AGH_RESULT.threshold}
          />
        </div>

        <div className="election-v1__bvv">
          <Text as="h3" variant="subtitel" color="white">
            Bezirksverordnetenversammlungen
          </Text>
          <div className="election-v1__legend" aria-hidden="true">
            <span><i className="election-swatch election-swatch--previous" /> 2023</span>
            <span><i className="election-swatch election-swatch--current" /> 2026</span>
            <span><i className="election-swatch election-swatch--threshold" /> {BVV_THRESHOLD} %-Hürde</span>
          </div>
          <div className="election-v1__districts" aria-hidden="true">
            <span className="election-v1__plot">
              <span
                className="election-v1__threshold"
                style={{ left: scale(BVV_THRESHOLD, BVV_AXIS_MAX) }}
              />
            </span>
            {BVV_RESULTS.map((r) => (
              <div
                key={r.slug}
                className={[
                  'election-v1__district',
                  r.seats > 0 && 'election-v1__district--elected',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <span className="election-v1__name">{r.name}</span>
                <span className="election-v1__pair">
                  <span className="election-v1__line">
                    <span
                      className="election-v1__bar election-v1__bar--previous"
                      style={{ width: r.previous === null ? 0 : scale(r.previous, BVV_AXIS_MAX) }}
                    />
                    <span className="election-v1__num">
                      {r.previous === null ? '–' : formatPercent(r.previous)}
                    </span>
                  </span>
                  <span className="election-v1__line">
                    <span
                      className="election-v1__bar election-v1__bar--current"
                      style={{ width: scale(r.current, BVV_AXIS_MAX) }}
                    />
                    <span className="election-v1__num election-v1__num--current">
                      {formatPercent(r.current)}
                    </span>
                  </span>
                </span>
              </div>
            ))}
          </div>
          <Text as="p" variant="fussnote" color="white" className="election-v1__note">
            – = 2023 nicht angetreten
          </Text>
        </div>
      </div>

      <div className="election-v1__elected">
        <Text as="h3" variant="subtitel" color="white">
          Unsere 6 Bezirksverordneten
        </Text>
        <ul className="election-v1__elected-list">
          {BVV_ELECTED.map((r) => (
            <li key={r.slug} className="election-v1__elected-item">
              <div className="election-v1__elected-head">
                <Link to={`/bezirke/${r.slug}`} className="election-v1__elected-name">
                  {r.name}
                </Link>
                <SeatsBadge seats={r.seats} />
              </div>
              <ElectedPortraits members={r.elected} size="sm" />
            </li>
          ))}
        </ul>
      </div>

      <SourceNote />
    </div>
  )
}

export default VariantChart
