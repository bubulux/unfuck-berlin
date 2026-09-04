import { useLocation } from 'react-router'
import { PageLayout } from '../../components/templates/page-layout'
import { SupportersHero, SupporterLink } from './shared'
import { useShuffledSupporters } from './lib'
import './v2.css'

// Deterministische "Zufalls"-Werte pro Position: Neigung und Klebeband-Farbe
// wiederholen sich zyklisch – wirkt zufaellig, bleibt aber CSS-frei berechenbar.
const TILTS = [-2.4, 1.8, -1.1, 2.6, -3.1, 1.3, -1.9, 2.2]
const TAPES = ['neon', 'pink', 'blue', 'yellow', 'green']

/**
 * Wall of Support V2 – "Die Plakatwand": Plakate in Originalformat wie an
 * eine Wand gekleistert – leicht schief, mit farbigem Klebeband und Name als
 * Beschriftung darunter. Beim Hovern richtet sich das Plakat auf und tritt
 * nach vorn.
 */
export function SupportersV2() {
  const { pathname } = useLocation()
  const supporters = useShuffledSupporters()

  return (
    <PageLayout activePath={pathname} variant="light">
      <div className="supporters-wrapper">
        <SupportersHero variant="light" />

        <ul className="wall-posters" aria-label="Unterstützer:innen von Volt Berlin">
          {supporters.map((s, i) => (
            <li key={s.name} className="wall-posters__cell">
              <SupporterLink
                supporter={s}
                className="wall-posters__card"
                style={{
                  '--tilt': `${TILTS[i % TILTS.length]}deg`,
                  '--tape': `var(--color-${TAPES[i % TAPES.length]})`,
                }}
              >
                <span className="wall-posters__tape" aria-hidden="true" />
                <img
                  className="wall-posters__img"
                  src={s.imageWall}
                  alt={`Wahlplakat von ${s.name}`}
                  loading={i < 6 ? 'eager' : 'lazy'}
                />
                <span className="wall-posters__name">{s.name}</span>
              </SupporterLink>
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  )
}

export default SupportersV2
