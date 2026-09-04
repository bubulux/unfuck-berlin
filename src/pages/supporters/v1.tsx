import { useLocation } from 'react-router'
import { PageLayout } from '../../components/templates/page-layout'
import { SupportersHero, SupporterLink } from './shared'
import { useShuffledSupporters } from './lib'
import './v1.css'

/**
 * Wall of Support V1 – "Das Raster": ruhiges, quadratisches Grid mit
 * gestaffeltem Einblenden. Beim Hovern zoomt das Plakat leicht und der Name
 * faehrt als Farbbalken von unten ein; auf Touch-Geraeten ist der Name
 * dauerhaft sichtbar.
 */
export function SupportersV1() {
  const { pathname } = useLocation()
  const supporters = useShuffledSupporters()

  return (
    <PageLayout activePath={pathname}>
      <div className="supporters-wrapper">
        <SupportersHero variant="purple" />

        <ul className="wall-grid" aria-label="Unterstützer:innen von Volt Berlin">
          {supporters.map((s, i) => (
            <li
              key={s.name}
              className="wall-grid__cell"
              style={{ '--i': i } as React.CSSProperties}
            >
              <SupporterLink supporter={s} className="wall-grid__card">
                <img
                  className="wall-grid__img"
                  src={s.image}
                  alt={`Wahlplakat von ${s.name}`}
                  loading={i < 8 ? 'eager' : 'lazy'}
                  width={600}
                  height={600}
                />
                <span className="wall-grid__name">{s.name}</span>
              </SupporterLink>
            </li>
          ))}
        </ul>
      </div>
    </PageLayout>
  )
}

export default SupportersV1
