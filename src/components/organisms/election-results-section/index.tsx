import { useState } from 'react'
import { Text } from '../../atoms/text'
import { Link } from '../../atoms/link'
import { HighlightText } from '../../atoms/highlight-text'
import {
  AGH_RESULT,
  BVV_ELECTED,
  BVV_THRESHOLD,
  BVV_TOTAL_SEATS,
  formatPercent,
} from '../../../data/wahlergebnis'
import {
  ElectedPortraits,
  ResultsDataTables,
  SeatsBadge,
  SourceNote,
  ThanksBlock,
  ThresholdBars,
} from './parts'
import { ElectionMap } from './election-map'
import './styles.css'

/**
 * Wahlergebnis 2026 auf der Startseite: Berlin-Karte mit dem BVV-Ergebnis je
 * Bezirk, daneben die Gewaehlten als Sticker-Karten. Hover/Fokus auf einer
 * Karte hebt den Bezirk auf der Karte hervor. Darunter das AGH-Ergebnis und
 * der Dank mit Mitmach-Aufruf.
 */
export function ElectionResultsSection() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section className="election" aria-labelledby="election-heading">
      <div className="election__inner">
        <header className="election__header">
          <HighlightText
            as="h2"
            id="election-heading"
            lines={['Wahlergebnis', '2026']}
            variant="titel"
            color="white"
            textColor="purple"
            uppercase
          />
          <Text as="p" variant="body" color="white" className="election__lead">
            Volt zieht erstmals in vier Berliner Bezirksverordnetenversammlungen
            ein – mit sechs Sitzen. Bei der Wahl zum Abgeordnetenhaus haben wir
            2,1 % der Zweitstimmen erreicht.
          </Text>
        </header>

        <ResultsDataTables />

        <div className="election__layout">
          <figure className="election__map">
            <ElectionMap activeSlug={active} />
            <figcaption className="election__legend">
              <span><i className="election-swatch election-swatch--current" /> eingezogen (ab {BVV_THRESHOLD} %)</span>
              <span><i className="election-swatch election-swatch--scale" /> heller = mehr Stimmen</span>
            </figcaption>
          </figure>

          <div className="election__side">
            <Text as="h3" variant="subtitel" color="white">
              {BVV_ELECTED.length} Bezirke, {BVV_TOTAL_SEATS} Bezirksverordnete
            </Text>
            <ul className="election__stickers">
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
                  <ElectedPortraits members={r.elected} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="election__agh">
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
        <ThanksBlock />
      </div>
    </section>
  )
}

export default ElectionResultsSection
