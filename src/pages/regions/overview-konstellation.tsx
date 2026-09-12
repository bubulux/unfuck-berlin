import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { useMediaQuery } from '@uidotdev/usehooks'
import { BerlinMap, DistrictOutline } from '../../components/molecules/berlin-map'
import { BERLIN_VIEWBOX } from '../../data/berlin-districts'
import { Icon } from '../../components/atoms/icon'
import {
  OVERVIEW_ALPHABETICAL,
  OVERVIEW_DISTRICTS,
  districtLabel,
  splitIntoColumns,
  type OverviewDistrict,
} from './overview-data'
import './overview-konstellation.css'

interface Connector {
  slug: string
  points: string
  dotX: number
  dotY: number
}

const DESKTOP_QUERY = '(min-width: 1000px)'
/** Laenge des waagerechten Stummels, mit dem die Linie die Karte verlaesst. */
const ELBOW = 18

// Die Spaltenaufteilung haengt nur an der Geometrie und aendert sich nie –
// einmal auf Modulebene rechnen statt bei jedem Render.
const { left: LEFT_COLUMN, right: RIGHT_COLUMN } = splitIntoColumns(OVERVIEW_DISTRICTS)
const SIDE_BY_SLUG = new Map<string, 'left' | 'right'>([
  ...LEFT_COLUMN.map((d) => [d.slug, 'left'] as const),
  ...RIGHT_COLUMN.map((d) => [d.slug, 'right'] as const),
])

export function OverviewKonstellation() {
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const [active, setActive] = useState<string | null>(null)

  const stageRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<SVGSVGElement>(null)
  const cardRefs = useRef(new Map<string, HTMLElement>())

  const [connectors, setConnectors] = useState<Connector[]>([])
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 })

  const registerCard = useCallback((slug: string) => {
    return (node: HTMLElement | null) => {
      if (node) cardRefs.current.set(slug, node)
      else cardRefs.current.delete(slug)
    }
  }, [])

  /**
   * Die Verbindungslinien koennen nicht in CSS entstehen – sie laufen von einer
   * Kartenkante zu einem Punkt im SVG. Also einmal messen und als Overlay
   * zeichnen, und bei jeder Groessenaenderung neu.
   */
  useLayoutEffect(() => {
    // Unterhalb des Breakpoints ist die Buehne ausgeblendet – dann gibt es
    // nichts zu messen. Die alten Werte bleiben im State liegen und werden
    // schlicht nicht gerendert, statt hier synchron zurueckgesetzt zu werden.
    if (!isDesktop) return

    let frame = 0

    const measure = () => {
      const stage = stageRef.current
      const map = mapRef.current
      if (!stage || !map) return

      const stageRect = stage.getBoundingClientRect()
      const mapRect = map.getBoundingClientRect()
      if (!stageRect.width || !mapRect.width) return

      // Die Karte behaelt ihr Seitenverhaeltnis, ein Faktor reicht.
      const scale = mapRect.width / BERLIN_VIEWBOX.width
      const mapOffsetX = mapRect.left - stageRect.left
      const mapOffsetY = mapRect.top - stageRect.top

      const next: Connector[] = []

      for (const district of OVERVIEW_DISTRICTS) {
        const card = cardRefs.current.get(district.slug)
        if (!card) continue

        const cardRect = card.getBoundingClientRect()
        const side = SIDE_BY_SLUG.get(district.slug)
        const fromX =
          side === 'left'
            ? cardRect.right - stageRect.left
            : cardRect.left - stageRect.left
        const fromY = cardRect.top - stageRect.top + cardRect.height / 2
        const stubX = side === 'left' ? fromX + ELBOW : fromX - ELBOW

        const toX = mapOffsetX + district.cx * scale
        const toY = mapOffsetY + district.cy * scale

        next.push({
          slug: district.slug,
          points: `${fromX},${fromY} ${stubX},${fromY} ${toX},${toY}`,
          dotX: toX,
          dotY: toY,
        })
      }

      setStageSize((prev) =>
        prev.width === stageRect.width && prev.height === stageRect.height
          ? prev
          : { width: stageRect.width, height: stageRect.height },
      )
      setConnectors((prev) => {
        const same =
          prev.length === next.length &&
          prev.every(
            (line, i) => line.slug === next[i].slug && line.points === next[i].points,
          )
        return same ? prev : next
      })
    }

    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    schedule()

    const observer = new ResizeObserver(schedule)
    if (stageRef.current) observer.observe(stageRef.current)
    if (mapRef.current) observer.observe(mapRef.current)
    for (const node of cardRefs.current.values()) observer.observe(node)

    window.addEventListener('resize', schedule)
    // Der selbst gehostete Font kann die Kartenhoehe noch verschieben.
    document.fonts?.ready.then(schedule).catch(() => {})

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', schedule)
    }
  }, [isDesktop])

  const renderCard = (district: OverviewDistrict, side: 'left' | 'right') => {
    const isActive = active === district.slug
    return (
      <Link
        key={district.slug}
        to={district.href}
        ref={registerCard(district.slug)}
        className={[
          'konstellation__card',
          `konstellation__card--${side}`,
          isActive && 'konstellation__card--active',
        ]
          .filter(Boolean)
          .join(' ')}
        onMouseEnter={() => setActive(district.slug)}
        onMouseLeave={() => setActive(null)}
        onFocus={() => setActive(district.slug)}
        onBlur={() => setActive(null)}
      >
        <DistrictOutline slug={district.slug} className="konstellation__card-shape" />
        <span className="konstellation__card-body">
          <span className="konstellation__card-name">{district.title}</span>
          {district.duo ? (
            <span className="konstellation__card-duo">{district.duo}</span>
          ) : null}
          <span className="konstellation__card-cta">
            zum Bezirk
            <Icon size="1em" name="arrow-right" />
          </span>
        </span>
      </Link>
    )
  }

  return (
    <div className="konstellation">
      <div className="konstellation__stage" ref={stageRef}>
        <div className="konstellation__column">
          {LEFT_COLUMN.map((district) => renderCard(district, 'left'))}
        </div>

        <div className="konstellation__map-slot">
          <BerlinMap
            svgRef={mapRef}
            className="konstellation__map"
            activeSlug={active}
            onActivate={setActive}
            labelFor={districtLabel}
          />
        </div>

        <div className="konstellation__column">
          {RIGHT_COLUMN.map((district) => renderCard(district, 'right'))}
        </div>

        {isDesktop && stageSize.width > 0 ? (
          <svg
            className="konstellation__wires"
            width={stageSize.width}
            height={stageSize.height}
            viewBox={`0 0 ${stageSize.width} ${stageSize.height}`}
            aria-hidden="true"
          >
            {connectors.map((line) => (
              <g
                key={line.slug}
                className={[
                  'konstellation__wire',
                  active === line.slug && 'konstellation__wire--active',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <polyline points={line.points} />
                <circle cx={line.dotX} cy={line.dotY} r={3.5} />
              </g>
            ))}
          </svg>
        ) : null}
      </div>

      {/* Mobil: kein Gesamtbild, sondern Umriss + Karte nebeneinander. */}
      <ul className="konstellation__list">
        {OVERVIEW_ALPHABETICAL.map((district) => (
          <li key={district.slug}>
            <Link to={district.href} className="konstellation__row">
              <span className="konstellation__row-shape">
                <DistrictOutline slug={district.slug} />
              </span>
              <span className="konstellation__row-body">
                <span className="konstellation__card-name">{district.title}</span>
                {district.duo ? (
                  <span className="konstellation__card-duo">{district.duo}</span>
                ) : null}
                <span className="konstellation__card-cta">
                  zum Bezirk
                  <Icon size="1em" name="arrow-right" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default OverviewKonstellation
