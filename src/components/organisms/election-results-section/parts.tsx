import { Fragment, type ReactNode } from 'react'
import { Text } from '../../atoms/text'
import { Link } from '../../atoms/link'
import { Icon } from '../../atoms/icon'
import { HighlightText } from '../../atoms/highlight-text'
import {
  AGH_RESULT,
  BVV_RESULTS,
  BVV_THRESHOLD,
  MITMACHEN_HREF,
  WAHLERGEBNIS_ARTICLE,
  WAHLERGEBNIS_SOURCE,
  formatPercent,
  type ElectedMember,
} from '../../../data/wahlergebnis'
import { scale } from './scale'

/**
 * Die Diagramme sind rein visuell (aria-hidden). Screenreader bekommen
 * dieselben Zahlen als echte Tabellen – eine fuer das AGH, eine fuer die BVVen.
 */
export function ResultsDataTables() {
  return (
    <div className="election-sr-only">
      <table>
        <caption>Volt bei der Berliner Abgeordnetenhauswahl, Zweitstimmen</caption>
        <thead>
          <tr>
            <th scope="col">Wahl</th>
            <th scope="col">2023 (Wiederholungswahl)</th>
            <th scope="col">2026</th>
            <th scope="col">Sperrklausel</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Abgeordnetenhaus</th>
            <td>{formatPercent(AGH_RESULT.previous)}</td>
            <td>{formatPercent(AGH_RESULT.current)}</td>
            <td>{AGH_RESULT.threshold} %</td>
          </tr>
        </tbody>
      </table>
      <table>
        <caption>
          Volt bei den Wahlen zu den Bezirksverordnetenversammlungen,
          Sperrklausel {BVV_THRESHOLD} %
        </caption>
        <thead>
          <tr>
            <th scope="col">Bezirk</th>
            <th scope="col">2023 (Wiederholungswahl)</th>
            <th scope="col">2026</th>
            <th scope="col">Sitze</th>
          </tr>
        </thead>
        <tbody>
          {BVV_RESULTS.map((r) => (
            <tr key={r.slug}>
              <th scope="row">{r.name}</th>
              <td>{r.previous === null ? 'nicht angetreten' : formatPercent(r.previous)}</td>
              <td>{formatPercent(r.current)}</td>
              <td>
                {r.seats}
                {r.elected.length > 0 && ` (${r.elected.map((m) => m.name).join(', ')})`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function SourceNote({ className }: { className?: string }) {
  return (
    <Text
      as="p"
      variant="fussnote"
      color="white"
      className={['election-source', className].filter(Boolean).join(' ')}
    >
      Quelle: {WAHLERGEBNIS_SOURCE}{' '}
      <Link to={WAHLERGEBNIS_ARTICLE} underline>
        Alle Details im Artikel
      </Link>
    </Text>
  )
}

/**
 * Horizontaler Balken 2023 vs. 2026 mit Markierung der Sperrklausel. Die Achse
 * reicht etwas ueber die Huerde hinaus, damit deren Label Platz hat.
 */
export function ThresholdBars({
  previous,
  current,
  threshold,
  max = threshold * 1.15,
  className,
}: {
  previous: number | null
  current: number
  threshold: number
  max?: number
  className?: string
}) {
  const rows = [
    ...(previous !== null ? [{ year: 2023, value: previous, kind: 'previous' }] : []),
    { year: 2026, value: current, kind: 'current' },
  ]
  return (
    <div
      className={['election-bars', className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {rows.map((row, i) => (
        <Fragment key={row.year}>
          <span className="election-bars__year" style={{ gridRow: i + 1 }}>
            {row.year}
          </span>
          <span className="election-bars__track" style={{ gridRow: i + 1 }}>
            <span
              className={`election-bars__bar election-bars__bar--${row.kind}`}
              style={{ width: scale(row.value, max) }}
            />
            <span className={`election-bars__value election-bars__value--${row.kind}`}>
              {formatPercent(row.value)}
            </span>
          </span>
        </Fragment>
      ))}
      {/* Liegt in der Balkenspalte ueber allen Zeilen. Die Zeilen sind explizit
          gesetzt – sonst schiebt das Overlay den ersten Balken eine Zeile tiefer. */}
      <span className="election-bars__overlay" style={{ gridRow: `1 / span ${rows.length}` }}>
        <span className="election-bars__threshold" style={{ left: scale(threshold, max) }}>
          <span className="election-bars__threshold-label">
            {`${threshold}\u00a0%-Hürde`}
          </span>
        </span>
      </span>
    </div>
  )
}

export function ElectedPortraits({ members }: { members: ElectedMember[] }) {
  return (
    <ul className="election-portraits">
      {members.map((m) => (
        <li key={m.name} className="election-portraits__item">
          {m.image ? (
            <img className="election-portraits__img" src={m.image} alt="" loading="lazy" />
          ) : (
            <span className="election-portraits__img election-portraits__img--empty" />
          )}
          <span className="election-portraits__name">{m.name}</span>
        </li>
      ))}
    </ul>
  )
}

export function SeatsBadge({ seats }: { seats: number }) {
  return (
    <span className="election-seats">
      {seats} {seats === 1 ? 'Sitz' : 'Sitze'}
    </span>
  )
}

/** Dank + Mitmach-Aufruf. */
export function ThanksBlock({ children }: { children?: ReactNode }) {
  return (
    <div className="election-thanks">
      <div className="election-thanks__quote">
        <HighlightText
          as="h3"
          lines={['Ein riesiges', 'Dankeschön!']}
          variant="titel"
          color="neon"
          textColor="purple"
          uppercase
          className="election-thanks__headline"
        />
        <Text as="p" variant="body" color="white">
          An alle, die Volt gewählt und uns ihr Vertrauen geschenkt haben!
        </Text>
        <Text as="p" variant="body" color="white">
          Du willst selbst Teil dieser Bewegung werden? Dann werde Mitglied bei
          Volt! Gemeinsam bringen wir Europa und progressive Politik noch stärker
          in die Berliner Bezirke.
        </Text>
      </div>
      {children}
      <a
        className="election-thanks__cta"
        href={MITMACHEN_HREF}
        target="_blank"
        rel="noreferrer noopener"
        data-umami-event="election-results-mitmachen-click"
      >
        <span className="election-thanks__cta-label">Werde Mitglied bei Volt</span>
        <Icon name="arrow-right" aria-hidden="true" />
      </a>
    </div>
  )
}
