import { useEffect, useRef, useState, type ReactNode } from 'react'
import { HighlightText } from '../../components/atoms/highlight-text'
import { Button } from '../../components/atoms/button'
import { PLAKAT_CTA_HREF, type Supporter } from './lib'
import './shared.css'

export interface SupporterLinkProps {
  supporter: Supporter
  className?: string
  style?: Record<string, string | number>
  children: ReactNode
}

/**
 * Klick fuehrt zum LinkedIn-Post der Person – sobald die URL im CMS gepflegt
 * ist. Ohne URL rendert die Karte als neutrales <div>, damit kein toter Link
 * entsteht.
 */
export function SupporterLink({ supporter, className, style, children }: SupporterLinkProps) {
  if (!supporter.linkedin) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }
  return (
    <a
      className={className}
      style={style}
      href={supporter.linkedin}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`LinkedIn-Post von ${supporter.name} öffnen`}
    >
      {children}
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

export interface SupportersHeroProps {
  /** Farbwelt passend zum PageLayout-variant der jeweiligen Seite. */
  variant?: 'purple' | 'light'
}

/**
 * Prominenter Kopf der Wall of Support: Titel, Community-Subtext und der
 * Call-to-Action "Bau Dir Dein eigenes Plakat" (VOLT-159), der den
 * Plakat-Generator als Overlay oeffnet.
 */
export function SupportersHero({ variant = 'purple' }: SupportersHeroProps) {
  const onPurple = variant === 'purple'
  const [plakatOpen, setPlakatOpen] = useState(false)
  return (
    <section className="supporters-hero">
      <HighlightText
        as="h1"
        lines={['Wall of Support']}
        variant="titel"
        color={onPurple ? 'white' : 'purple'}
        textColor={onPurple ? 'purple' : 'white'}
        align="left"
        uppercase
        className="supporters-hero__heading"
      />
      <p className="supporters-hero__sub">
        Immer mehr Berliner:innen zeigen Gesicht für Volt – auf ihrem eigenen
        Wahlplakat. Mach mit, teil Dein Plakat und werde Teil der Wall of
        Support.
      </p>
      <Button
        onClick={() => setPlakatOpen(true)}
        color={onPurple ? 'neon' : 'purple'}
        className="supporters-hero__cta"
      >
        Bau Dir Dein eigenes Plakat&nbsp;→
      </Button>
      <PlakatDialog open={plakatOpen} onClose={() => setPlakatOpen(false)} />
    </section>
  )
}
