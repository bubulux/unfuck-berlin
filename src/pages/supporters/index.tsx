import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useLocation } from 'react-router'
import { PageLayout } from '../../components/templates/page-layout'
import { HighlightText } from '../../components/atoms/highlight-text'
import { Button } from '../../components/atoms/button'
import { PLAKAT_CTA_HREF, useShuffledSupporters, type Supporter } from './lib'
import './styles.css'

const ROWS = 3
// Jede Reihe wird mehrfach hintereinander gerendert, damit die Endlos-Schleife
// (translateX um eine Kopie-Laenge) auch auf breiten Screens nahtlos ist.
// Muss zum Divisor in @keyframes wall-scroll passen.
const COPIES = 3

// Deterministische "Zufalls"-Werte pro Position: Neigung und Klebeband-Farbe
// wiederholen sich zyklisch – wirkt zufaellig, bleibt aber berechenbar (und
// damit ueber alle Kopien einer Reihe identisch).
const TILTS = [-2.4, 1.8, -1.1, 2.6, -3.1, 1.3, -1.9, 2.2]
const TAPES = ['neon', 'pink', 'blue', 'yellow', 'green']

function splitIntoRows(items: Supporter[]): Supporter[][] {
  const rows: Supporter[][] = Array.from({ length: ROWS }, () => [])
  items.forEach((s, i) => rows[i % ROWS].push(s))
  return rows.filter((r) => r.length > 0)
}

interface SupporterCardProps {
  supporter: Supporter
  /** Position in der Reihe – bestimmt Neigung und Klebeband-Farbe. */
  index: number
  /** Kopien der Reihe sind rein dekorativ und bleiben fuer Screenreader stumm. */
  decorative?: boolean
}

/**
 * Plakat-Karte im Polaroid-Look: weisser Rand, farbiges Klebeband, Name und
 * optionaler Job als Beschriftung. Klick fuehrt zum LinkedIn-Post der Person –
 * sobald die URL im CMS gepflegt ist. Ohne URL rendert die Karte als
 * neutrales <div>, damit kein toter Link entsteht.
 */
function SupporterCard({ supporter, index, decorative }: SupporterCardProps) {
  const style = {
    '--tilt': `${TILTS[index % TILTS.length]}deg`,
    '--tape': `var(--color-${TAPES[index % TAPES.length]})`,
  } as CSSProperties

  const inner = (
    <>
      <span className="wall__tape" aria-hidden="true" />
      <img
        className="wall__img"
        src={supporter.imageWall}
        alt={decorative ? '' : `Wahlplakat von ${supporter.name}`}
        loading="lazy"
      />
      <span className="wall__caption">
        <span className="wall__name">{supporter.name}</span>
        {supporter.job ? <span className="wall__job">{supporter.job}</span> : null}
      </span>
    </>
  )

  if (!supporter.linkedin) {
    return (
      <div className="wall__card" style={style}>
        {inner}
      </div>
    )
  }
  return (
    <a
      className="wall__card"
      style={style}
      href={supporter.linkedin}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`LinkedIn-Post von ${supporter.name} öffnen`}
      tabIndex={decorative ? -1 : undefined}
    >
      {inner}
    </a>
  )
}

interface PlakatDialogProps {
  open: boolean
  onClose: () => void
}

/**
 * Plakat-Generator (voltberlin.fun) als Overlay-Dialog: fast fullscreen mit
 * Rand und geblurtem Hintergrund, damit klar bleibt, dass man die Seite nicht
 * verlassen hat. Natives <dialog> liefert Fokus-Falle, Esc und ::backdrop.
 * Der Inhalt scrollt im iframe selbst (Root-Scrolling der eingebetteten Seite).
 */
function PlakatDialog({ open, onClose }: PlakatDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // showModal() sperrt das Scrollen der Seite dahinter nicht – manuell nachziehen.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      className="plakat-dialog"
      onClose={onClose}
      // Klicks auf ::backdrop landen auf dem <dialog> selbst; die Flaeche
      // innen ist komplett von Bar + iframe bedeckt.
      onClick={(e) => {
        if (e.target === ref.current) onClose()
      }}
    >
      <div className="plakat-dialog__bar">
        <span className="plakat-dialog__title">Bau Dir Dein eigenes Plakat</span>
        <a
          className="plakat-dialog__external"
          href={PLAKAT_CTA_HREF}
          target="_blank"
          rel="noreferrer noopener"
        >
          Im neuen Tab öffnen&nbsp;↗
        </a>
        <button
          className="plakat-dialog__close"
          type="button"
          onClick={onClose}
          aria-label="Dialog schließen"
        >
          ×
        </button>
      </div>
      {/* iframe erst beim Oeffnen mounten, damit die externe Seite nicht
          schon beim Seitenaufruf laedt. */}
      {open ? (
        <iframe
          className="plakat-dialog__frame"
          src={PLAKAT_CTA_HREF}
          title="Plakat-Generator von Volt Berlin"
        />
      ) : null}
    </dialog>
  )
}

/**
 * Prominenter Kopf der Wall of Support: Titel, Community-Subtext und der
 * Call-to-Action "Bau Dir Dein eigenes Plakat" (VOLT-159), der den
 * Plakat-Generator als Overlay oeffnet.
 */
function SupportersHero() {
  const [plakatOpen, setPlakatOpen] = useState(false)
  return (
    <section className="supporters-hero">
      <HighlightText
        as="h1"
        lines={['Wall of Support']}
        variant="titel"
        color="white"
        textColor="purple"
        align="left"
        uppercase
        className="supporters-hero__heading"
      />
      <p className="supporters-hero__sub">
        Immer mehr Berliner:innen zeigen Gesicht für Volt – auf ihrem eigenen
        Wahlplakat. Mach mit, teil Dein Plakat und werde Teil der Wall of
        Support.
      </p>
      <Button onClick={() => setPlakatOpen(true)} color="neon" className="supporters-hero__cta">
        Bau Dir Dein eigenes Plakat&nbsp;→
      </Button>
      <PlakatDialog open={plakatOpen} onClose={() => setPlakatOpen(false)} />
    </section>
  )
}

/**
 * Wall of Support: Plakate ziehen in gegenlaeufigen Endlos-Baendern ueber die
 * volle Breite. Hover haelt die Reihe an, richtet das Plakat auf und hebt es
 * hervor. Bei reduzierter Motion stehen die Baender still und sind horizontal
 * scrollbar. Reihenfolge wird pro Seitenaufruf neu gemischt.
 */
export function SupportersPage() {
  const { pathname } = useLocation()
  const supporters = useShuffledSupporters()
  const rows = splitIntoRows(supporters)

  return (
    <PageLayout activePath={pathname}>
      <div className="supporters-wrapper">
        <SupportersHero />
      </div>

      <div className="wall" aria-label="Unterstützer:innen von Volt Berlin">
        {rows.map((row, r) => (
          <div
            key={r}
            className={`wall__row ${r % 2 ? 'wall__row--reverse' : ''}`}
            style={{ '--duration': `${34 + r * 7}s` } as CSSProperties}
          >
            <div className="wall__track">
              {Array.from({ length: COPIES }, (_, copy) => (
                <div key={copy} className="wall__group" aria-hidden={copy > 0 || undefined}>
                  {row.map((s, i) => (
                    <SupporterCard
                      key={`${copy}-${s.name}`}
                      supporter={s}
                      index={i}
                      decorative={copy > 0}
                    />
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

export default SupportersPage
