import type { HTMLAttributes, ReactNode } from 'react'
import { Icon } from '../../atoms/icon'
import { Text } from '../../atoms/text'
import { SocialRow, type SocialLink } from '../social-row'
import { SOCIAL_LINKS } from '../../../config/navigation'
import './styles.css'

export interface SuccessPanelProps extends HTMLAttributes<HTMLElement> {
  headline: string
  /** Ein oder mehrere Absaetze unter der Ueberschrift. */
  children: ReactNode
  /** Haken-Kreis ueber der Ueberschrift. Bei Fehlerzustaenden abschalten. */
  showIcon?: boolean
  /** "Folge uns fuer mehr auf" plus Icon-Reihe. */
  showSocials?: boolean
  socials?: SocialLink[]
}

/**
 * Abschluss-Panel nach einer erledigten Aktion: Haken, Ueberschrift, Text und
 * die Einladung, Volt Berlin zu folgen. Wird von der Sticker-Bestellung
 * (abgeschickt) und der Bestaetigungsseite (bestaetigt / schon bestaetigt)
 * genutzt – und ohne Haken auch fuer die Fehlerzustaende dort.
 */
export function SuccessPanel({
  headline,
  children,
  showIcon = true,
  showSocials = true,
  socials = SOCIAL_LINKS,
  className,
  ...rest
}: SuccessPanelProps) {
  const classes = ['success-panel', className].filter(Boolean).join(' ')
  return (
    <section className={classes} {...rest}>
      {showIcon ? (
        <span className="success-panel__icon" aria-hidden="true">
          <Icon name="check" size="2rem" strokeWidth={3} />
        </span>
      ) : null}

      <Text as="h2" variant="subtitel" color="white" weight="bold">
        {headline}
      </Text>

      <div className="success-panel__body">{children}</div>

      {showSocials ? (
        <>
          <Text
            as="p"
            variant="body"
            color="white"
            weight="bold"
            className="success-panel__follow"
          >
            Folge uns für mehr auf
          </Text>
          <SocialRow links={socials} className="success-panel__socials" />
        </>
      ) : null}
    </section>
  )
}

export default SuccessPanel
