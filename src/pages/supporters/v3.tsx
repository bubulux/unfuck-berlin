import { useLocation } from 'react-router'
import { PageLayout } from '../../components/templates/page-layout'
import { SupportersHero, SupporterLink } from './shared'
import { useShuffledSupporters, type Supporter } from './lib'
import './v3.css'

const ROWS = 3
// Jede Reihe wird mehrfach hintereinander gerendert, damit die Endlos-Schleife
// (translateX um eine Kopie-Laenge) auch auf breiten Screens nahtlos ist.
const COPIES = 3

function splitIntoRows(items: Supporter[]): Supporter[][] {
  const rows: Supporter[][] = Array.from({ length: ROWS }, () => [])
  items.forEach((s, i) => rows[i % ROWS].push(s))
  return rows.filter((r) => r.length > 0)
}

/**
 * Wall of Support V3 – "Der Strom": Gesichter ziehen in gegenlaeufigen
 * Endlos-Baendern ueber die volle Breite. Hover haelt die Reihe an, hebt das
 * Plakat hervor und zeigt den Namen als Sprechblase. Bei reduzierter Motion
 * stehen die Baender still und sind horizontal scrollbar.
 */
export function SupportersV3() {
  const { pathname } = useLocation()
  const supporters = useShuffledSupporters()
  const rows = splitIntoRows(supporters)

  return (
    <PageLayout activePath={pathname}>
      <div className="supporters-wrapper">
        <SupportersHero variant="purple" />
      </div>

      <div className="wall-stream" aria-label="Unterstützer:innen von Volt Berlin">
        {rows.map((row, r) => (
          <div
            key={r}
            className={`wall-stream__row ${r % 2 ? 'wall-stream__row--reverse' : ''}`}
            style={{ '--duration': `${34 + r * 7}s` } as React.CSSProperties}
          >
            <div className="wall-stream__track">
              {Array.from({ length: COPIES }, (_, copy) => (
                <div
                  key={copy}
                  className="wall-stream__group"
                  aria-hidden={copy > 0 || undefined}
                >
                  {row.map((s) => (
                    <SupporterLink
                      key={`${copy}-${s.name}`}
                      supporter={s}
                      className="wall-stream__card"
                    >
                      <img
                        className="wall-stream__img"
                        src={s.imageWall}
                        alt={copy === 0 ? `Wahlplakat von ${s.name}` : ''}
                        loading="lazy"
                      />
                      <span className="wall-stream__name">{s.name}</span>
                    </SupporterLink>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}

export default SupportersV3
