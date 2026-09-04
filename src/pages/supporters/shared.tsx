import type { ReactNode } from 'react'
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

export interface SupportersHeroProps {
  /** Farbwelt passend zum PageLayout-variant der jeweiligen Seite. */
  variant?: 'purple' | 'light'
}

/**
 * Prominenter Kopf der Wall of Support: Titel, Community-Subtext und der
 * Call-to-Action "Bau Dir Dein eigenes Plakat" (VOLT-159).
 */
export function SupportersHero({ variant = 'purple' }: SupportersHeroProps) {
  const onPurple = variant === 'purple'
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
        as="a"
        href={PLAKAT_CTA_HREF}
        target="_blank"
        rel="noreferrer noopener"
        color={onPurple ? 'neon' : 'purple'}
        className="supporters-hero__cta"
      >
        Bau Dir Dein eigenes Plakat&nbsp;→
      </Button>
    </section>
  )
}
