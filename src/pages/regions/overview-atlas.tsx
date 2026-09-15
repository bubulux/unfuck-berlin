import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { useMediaQuery } from '@uidotdev/usehooks'
import { BerlinMap } from '../../components/molecules/berlin-map'
import { Icon } from '../../components/atoms/icon'
import {
  OVERVIEW_GEOGRAPHIC,
  districtLabel,
  type OverviewDistrict,
} from './overview-data'
import './overview-atlas.css'

/** Muss mit dem Desktop-Breakpoint in overview-atlas.css zusammenpassen. */
const DESKTOP_QUERY = '(min-width: 900px)'

/**
 * Ideation 2 – "Atlas". Die Karte bleibt stehen, die Liste laeuft daran vorbei.
 * Welcher Bezirk gerade in der Mitte des Sichtfelds steht, leuchtet auf der
 * Karte auf; ein Klick auf die Karte springt umgekehrt zur Listenzeile.
 */
export function OverviewAtlas() {
  const districts = OVERVIEW_GEOGRAPHIC
  const [activeSlug, setActiveSlug] = useState<string | null>(
    districts[0]?.slug ?? null,
  )
  /** Hover schlaegt die Scroll-Position, solange die Maus auf der Karte ist. */
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)
  const rowRefs = useRef(new Map<string, HTMLLIElement>())
  const listRef = useRef<HTMLOListElement>(null)

  // Auf Desktop scrollt die Liste in sich selbst, waehrend die Karte steht.
  // Darunter scrollt die ganze Seite. Beides braucht einen anderen Bezugsrahmen.
  const isDesktop = useMediaQuery(DESKTOP_QUERY)

  const registerRow = useCallback((slug: string) => {
    return (node: HTMLLIElement | null) => {
      if (node) rowRefs.current.set(slug, node)
      else rowRefs.current.delete(slug)
    }
  }, [])

  useEffect(() => {
    const nodes = [...rowRefs.current.entries()]
    if (!nodes.length) return

    const visible = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const slug = (entry.target as HTMLElement).dataset.slug
          if (!slug) continue
          if (entry.isIntersecting) visible.set(slug, entry.intersectionRatio)
          else visible.delete(slug)
        }
        if (!visible.size) return
        // Der Eintrag mit dem groessten Anteil im Mittelband gewinnt.
        const best = [...visible.entries()].sort((a, b) => b[1] - a[1])[0]
        setActiveSlug(best[0])
      },
      {
        // Auf Desktop ist die Liste selbst der Rahmen, sonst das Fenster.
        root: isDesktop ? listRef.current : null,
        // Nur das mittlere Zehntel zaehlt als "gerade dran".
        rootMargin: '-45% 0px -45% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )

    for (const [, node] of nodes) observer.observe(node)
    return () => observer.disconnect()
  }, [districts.length, isDesktop])

  const scrollToDistrict = (slug: string) => {
    const node = rowRefs.current.get(slug)
    if (!node) return
    setActiveSlug(slug)

    const list = listRef.current
    const scrolls = list && list.scrollHeight > list.clientHeight
    if (!scrolls) {
      node.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    // scrollIntoView wuerde zusaetzlich die ganze Seite verschieben. Hier soll
    // sich nur die Liste bewegen, also die Zielposition selbst ausrechnen –
    // ueber die Rechtecke, damit kein offsetParent dazwischenfunkt.
    const offset = node.getBoundingClientRect().top - list.getBoundingClientRect().top
    const centered = list.scrollTop + offset - (list.clientHeight - node.offsetHeight) / 2
    list.scrollTo({
      top: Math.max(0, Math.min(centered, list.scrollHeight - list.clientHeight)),
      behavior: 'smooth',
    })
  }

  const shownSlug = hoveredSlug ?? activeSlug

  return (
    <div className="atlas">
      <div className="atlas__map-pane">
        <div className="atlas__map-sticky">
          <BerlinMap
            className="atlas__map"
            activeSlug={shownSlug}
            onActivate={setHoveredSlug}
            onSelect={scrollToDistrict}
            labelFor={districtLabel}
          />
          <p className="atlas__map-caption" aria-live="polite">
            {shownSlug ? districtLabel(shownSlug) : 'Zwoelf Bezirke'}
          </p>
        </div>
      </div>

      <ol className="atlas__list" ref={listRef}>
        {districts.map((district, index) => (
          <AtlasRow
            key={district.slug}
            district={district}
            index={index}
            isActive={shownSlug === district.slug}
            rowRef={registerRow(district.slug)}
            onHover={setHoveredSlug}
          />
        ))}
      </ol>
    </div>
  )
}

interface AtlasRowProps {
  district: OverviewDistrict
  index: number
  isActive: boolean
  rowRef: (node: HTMLLIElement | null) => void
  onHover: (slug: string | null) => void
}

function AtlasRow({ district, index, isActive, rowRef, onHover }: AtlasRowProps) {
  return (
    <li
      ref={rowRef}
      data-slug={district.slug}
      className={['atlas__row', isActive && 'atlas__row--active']
        .filter(Boolean)
        .join(' ')}
      onMouseEnter={() => onHover(district.slug)}
      onMouseLeave={() => onHover(null)}
    >
      <Link
        to={district.href}
        className="atlas__row-link"
        onFocus={() => onHover(district.slug)}
        onBlur={() => onHover(null)}
      >
        <span className="atlas__row-index">
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="atlas__row-body">
          <span className="atlas__row-name">{district.title}</span>
          <span className="atlas__row-label">BVV-Spitzenduo</span>
          <span className="atlas__row-duo">{district.duo || 'in Aufstellung'}</span>
          <span className="atlas__row-cta">
            zum Bezirk
            <Icon size="1em" name="arrow-right" />
          </span>
        </span>

        <span className="atlas__row-faces" aria-hidden="true">
          {district.candidates.slice(0, 2).map((candidate) =>
            candidate.image ? (
              <img
                key={candidate.name}
                className="atlas__face"
                src={candidate.image}
                alt=""
                loading="lazy"
              />
            ) : (
              <span key={candidate.name} className="atlas__face atlas__face--blank">
                {candidate.name.slice(0, 1)}
              </span>
            ),
          )}
        </span>
      </Link>
    </li>
  )
}

export default OverviewAtlas
