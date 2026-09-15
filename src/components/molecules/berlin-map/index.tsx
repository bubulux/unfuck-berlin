import type { CSSProperties } from 'react'
import { BERLIN_DISTRICTS, BERLIN_VIEWBOX } from '../../../data/berlin-districts'
import './styles.css'

export interface BerlinMapProps {
  /** Hervorgehobener Bezirk. Alle anderen werden gedimmt. */
  activeSlug?: string | null
  /** Hover/Fokus auf einem Bezirk – `null` beim Verlassen. */
  onActivate?: (slug: string | null) => void
  /** Klick auf eine Flaeche, z. B. "Liste dorthin scrollen". */
  onSelect: (slug: string) => void
  /** Lesbarer Name je Slug, fuer aria-label und <title>. */
  labelFor?: (slug: string) => string
  className?: string
  style?: CSSProperties
}

/**
 * Die Berlin-Karte als eigenstaendiges Element: zwoelf Bezirksflaechen, die je
 * nach `activeSlug` hervorgehoben oder gedimmt werden.
 */
export function BerlinMap({
  activeSlug = null,
  onActivate,
  onSelect,
  labelFor,
  className,
  style,
}: BerlinMapProps) {
  const classes = ['berlin-map', activeSlug && 'berlin-map--focused', className]
    .filter(Boolean)
    .join(' ')

  return (
    <svg
      className={classes}
      style={style}
      viewBox={`0 0 ${BERLIN_VIEWBOX.width} ${BERLIN_VIEWBOX.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {BERLIN_DISTRICTS.map((district) => {
        const label = labelFor?.(district.slug) ?? district.slug
        const isActive = activeSlug === district.slug

        return (
          <g
            key={district.slug}
            className={[
              'berlin-map__district',
              isActive && 'berlin-map__district--active',
            ]
              .filter(Boolean)
              .join(' ')}
            role="button"
            tabIndex={0}
            aria-label={label}
            onMouseEnter={() => onActivate?.(district.slug)}
            onMouseLeave={() => onActivate?.(null)}
            onFocus={() => onActivate?.(district.slug)}
            onBlur={() => onActivate?.(null)}
            onClick={() => onSelect(district.slug)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onSelect(district.slug)
              }
            }}
          >
            <title>{label}</title>
            <path d={district.d} fill="currentColor" />
          </g>
        )
      })}
    </svg>
  )
}

export default BerlinMap
