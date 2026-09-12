import type { CSSProperties } from 'react'
import { useState } from 'react'
import { Link } from 'react-router'
import { DistrictOutline } from '../../components/molecules/berlin-map'
import { Icon } from '../../components/atoms/icon'
import { OVERVIEW_DISTRICTS } from './overview-data'
import './overview-kacheln.css'

/**
 * Ideation 3 – "Kachel-Kartogramm". Die Karte wird zum Raster: jeder Bezirk
 * bekommt ein gleich grosses Feld, das ungefaehr dort liegt, wo er in Berlin
 * liegt. Der Umriss wandert in die Kachel und wird zum Erkennungszeichen –
 * damit ist Mitte genauso prominent wie Treptow-Koepenick.
 */
export function OverviewKacheln() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="kacheln">
      {OVERVIEW_DISTRICTS.map((district) => (
        <Link
          key={district.slug}
          to={district.href}
          className={[
            'kachel',
            active === district.slug && 'kachel--active',
          ]
            .filter(Boolean)
            .join(' ')}
          style={
            {
              '--tile-col': district.tile.col,
              '--tile-row': district.tile.row,
            } as CSSProperties
          }
          onMouseEnter={() => setActive(district.slug)}
          onMouseLeave={() => setActive(null)}
          onFocus={() => setActive(district.slug)}
          onBlur={() => setActive(null)}
        >
          <DistrictOutline slug={district.slug} className="kachel__shape" />

          <span className="kachel__top">
            <span className="kachel__faces" aria-hidden="true">
              {district.candidates.slice(0, 2).map((candidate) =>
                candidate.image ? (
                  <img
                    key={candidate.name}
                    className="kachel__face"
                    src={candidate.image}
                    alt=""
                    loading="lazy"
                  />
                ) : (
                  <span
                    key={candidate.name}
                    className="kachel__face kachel__face--blank"
                  >
                    {candidate.name.slice(0, 1)}
                  </span>
                ),
              )}
            </span>
          </span>

          <span className="kachel__body">
            <span className="kachel__name">{district.title}</span>
            <span className="kachel__duo">{district.duo || 'in Aufstellung'}</span>
            <span className="kachel__cta">
              zum Bezirk
              <Icon size="1em" name="arrow-right" />
            </span>
          </span>
        </Link>
      ))}
    </div>
  )
}

export default OverviewKacheln
