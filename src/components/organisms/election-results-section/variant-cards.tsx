import { Text } from '../../atoms/text'
import { Link } from '../../atoms/link'
import {
  AGH_RESULT,
  BVV_ELECTED,
  BVV_RESULTS,
  BVV_THRESHOLD,
  BVV_TOTAL_SEATS,
  formatPercent,
  type BvvResult,
} from '../../../data/wahlergebnis'
import { ElectedPortraits, SeatsBadge, SourceNote, ThresholdBars } from './parts'

function Delta({ result }: { result: BvvResult }) {
  if (result.previous === null) {
    return <span className="election-card__delta">2023 nicht angetreten</span>
  }
  const diff = result.current - result.previous
  return (
    <span className="election-card__delta">
      {diff >= 0 ? '+' : '−'}
      {formatPercent(Math.abs(diff)).replace(' %', ' Pp.')} ggü. 2023
    </span>
  )
}

function DistrictCard({ result }: { result: BvvResult }) {
  const elected = result.seats > 0
  return (
    <li
      className={['election-card', elected && 'election-card--elected']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="election-card__head">
        <Text as="h4" variant="body" weight="bold" className="election-card__name">
          <Link
            to={`/bezirke/${result.slug}`}
            color={elected ? 'purple' : 'white'}
            className="election-card__link"
          >
            {result.name}
          </Link>
        </Text>
        {elected && <SeatsBadge seats={result.seats} />}
      </div>
      <p className="election-card__value">{formatPercent(result.current)}</p>
      <Delta result={result} />
      <ThresholdBars
        className="election-card__bars"
        previous={result.previous}
        current={result.current}
        threshold={BVV_THRESHOLD}
        max={4.5}
      />
      {elected && <ElectedPortraits members={result.elected} />}
    </li>
  )
}

/**
 * V2 – Bezirkskarten: drei Kennzahlen oben, dann je Bezirk eine Karte. Die
 * vier Bezirke mit Einzug sind grosse Neon-Karten mit den Gewaehlten, die
 * uebrigen acht kompakte Karten mit Abstand zur Huerde.
 */
export function VariantCards() {
  const others = BVV_RESULTS.filter((r) => r.seats === 0)
  return (
    <div className="election-v2">
      <ul className="election-v2__stats">
        <li className="election-stat">
          <span className="election-stat__value">{BVV_TOTAL_SEATS}</span>
          <span className="election-stat__label">Sitze in den Bezirken</span>
        </li>
        <li className="election-stat">
          <span className="election-stat__value">{BVV_ELECTED.length} von 12</span>
          <span className="election-stat__label">Bezirksverordneten&shy;versammlungen</span>
        </li>
        <li className="election-stat">
          <span className="election-stat__value">{formatPercent(AGH_RESULT.current)}</span>
          <span className="election-stat__label">
            im Abgeordnetenhaus (2023: {formatPercent(AGH_RESULT.previous)})
          </span>
        </li>
      </ul>

      <Text as="h3" variant="subtitel" color="white">
        Hier sind wir eingezogen
      </Text>
      <ul className="election-v2__grid election-v2__grid--elected">
        {BVV_ELECTED.map((r) => (
          <DistrictCard key={r.slug} result={r} />
        ))}
      </ul>

      <Text as="h3" variant="subtitel" color="white">
        In den übrigen Bezirken
      </Text>
      <ul className="election-v2__grid">
        {others.map((r) => (
          <DistrictCard key={r.slug} result={r} />
        ))}
      </ul>

      <SourceNote />
    </div>
  )
}

export default VariantCards
