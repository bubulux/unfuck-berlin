import type { HTMLAttributes, ReactNode } from 'react'
import { Link as RouterLink } from 'react-router'
import { Text } from '../../atoms/text'
import { Button } from '../../atoms/button'
import './styles.css'

export interface UnfuckIntroProps extends HTMLAttributes<HTMLElement> {
  /** Optional logo above the headline. */
  logoSrc?: string
  logoAlt?: string
  headline: string
  /** Body copy (paragraphs). */
  children: ReactNode
  ctaLabel: string
  ctaTo?: string
  ctaHref?: string
}

export function UnfuckIntro({
  logoSrc,
  logoAlt = '',
  headline,
  children,
  ctaLabel,
  ctaTo,
  ctaHref,
  className,
  ...rest
}: UnfuckIntroProps) {
  const classes = ['unfuck-intro', className].filter(Boolean).join(' ')
  return (
    <section className={classes} {...rest}>
      <div className="unfuck-intro__inner">
        <div className="unfuck-intro__lead">
          {logoSrc ? (
            <img className="unfuck-intro__logo" src={logoSrc} alt={logoAlt} />
          ) : null}

          <Text as="h1" variant="subtitel" color="white" className="unfuck-intro__headline">
            {headline}
          </Text>
        </div>

        <div className="unfuck-intro__copy">
          <div className="unfuck-intro__body">{children}</div>

          {ctaHref ? (
            <Button as="a" href={ctaHref} color="neon" className="unfuck-intro__cta">
              {ctaLabel}
            </Button>
          ) : ctaTo ? (
            <Button as={RouterLink} to={ctaTo} color="neon" className="unfuck-intro__cta">
              {ctaLabel}
            </Button>
          ) : (
            <Button color="neon" className="unfuck-intro__cta">
              {ctaLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

export default UnfuckIntro
