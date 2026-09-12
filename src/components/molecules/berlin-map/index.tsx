import type { CSSProperties, Ref } from 'react'
import { Link } from 'react-router'
import {
  BERLIN_DISTRICTS,
  BERLIN_VIEWBOX,
  DISTRICT_BY_SLUG,
} from '../../../data/berlin-districts'
import './styles.css'

export interface BerlinMapProps {
  /** Hervorgehobener Bezirk. Alle anderen werden gedimmt. */
  activeSlug?: string | null
  /** Hover/Fokus auf einem Bezirk – `null` beim Verlassen. */
  onActivate?: (slug: string | null) => void
  /**
   * Wenn gesetzt, wird der Bezirk zum Button (z. B. "Liste dorthin scrollen")
   * statt zum Link auf die Bezirksseite.
   */
  onSelect?: (slug: string) => void
  /** Lesbarer Name je Slug, fuer aria-label und <title>. */
  labelFor?: (slug: string) => string
  className?: string
  style?: CSSProperties
  svgRef?: Ref<SVGSVGElement>
}

/**
 * Die Berlin-Karte als eigenstaendiges Element: zwoelf Bezirksflaechen, die je
 * nach `activeSlug` hervorgehoben oder gedimmt werden. Ohne `onSelect` ist jede
 * Flaeche ein Link auf die jeweilige Bezirksseite.
 */
export function BerlinMap({
  activeSlug = null,
  onActivate,
  onSelect,
  labelFor,
  className,
  style,
  svgRef,
}: BerlinMapProps) {
  const classes = ['berlin-map', activeSlug && 'berlin-map--focused', className]
    .filter(Boolean)
    .join(' ')

  return (
    <svg
      ref={svgRef}
      className={classes}
      style={style}
      viewBox={`0 0 ${BERLIN_VIEWBOX.width} ${BERLIN_VIEWBOX.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {BERLIN_DISTRICTS.map((district) => {
        const label = labelFor?.(district.slug) ?? district.slug
        const isActive = activeSlug === district.slug
        const shapeClass = [
          'berlin-map__district',
          isActive && 'berlin-map__district--active',
        ]
          .filter(Boolean)
          .join(' ')

        const shared = {
          className: shapeClass,
          onMouseEnter: () => onActivate?.(district.slug),
          onMouseLeave: () => onActivate?.(null),
          onFocus: () => onActivate?.(district.slug),
          onBlur: () => onActivate?.(null),
        }

        const body = (
          <>
            <title>{label}</title>
            <path d={district.d} fill="currentColor" />
          </>
        )

        if (onSelect) {
          return (
            <g
              key={district.slug}
              {...shared}
              role="button"
              tabIndex={0}
              aria-label={label}
              onClick={() => onSelect(district.slug)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  onSelect(district.slug)
                }
              }}
            >
              {body}
            </g>
          )
        }

        return (
          <Link
            key={district.slug}
            {...shared}
            to={`/bezirke/${district.slug}`}
            aria-label={label}
          >
            {body}
          </Link>
        )
      })}
    </svg>
  )
}

export interface DistrictOutlineProps {
  slug: string
  /** Luft um die Bounding-Box, in viewBox-Einheiten. */
  padding?: number
  className?: string
  style?: CSSProperties
  title?: string
}

/**
 * Ein einzelner Bezirks-Umriss, auf seine eigene Bounding-Box gezoomt – damit
 * Mitte und Treptow-Koepenick nebeneinander gleich gross wirken.
 */
export function DistrictOutline({
  slug,
  padding = 6,
  className,
  style,
  title,
}: DistrictOutlineProps) {
  const district = DISTRICT_BY_SLUG[slug]
  if (!district) return null

  const viewBox = [
    district.x - padding,
    district.y - padding,
    district.w + padding * 2,
    district.h + padding * 2,
  ].join(' ')

  return (
    <svg
      className={['district-outline', className].filter(Boolean).join(' ')}
      style={style}
      viewBox={viewBox}
      fill="none"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <path d={district.d} fill="currentColor" />
    </svg>
  )
}

export default BerlinMap
