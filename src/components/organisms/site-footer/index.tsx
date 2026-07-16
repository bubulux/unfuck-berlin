import type { HTMLAttributes } from 'react'
import { Text } from '../../atoms/text'
import { Link } from '../../atoms/link'
import { SocialRow, type SocialLink } from '../../molecules/social-row'
import { SOCIAL_LINKS, LEGAL_LINKS } from '../../../config/navigation'
import './styles.css'

export interface FooterLink {
  label: string
  to?: string
  href?: string
}

export interface SiteFooterProps extends HTMLAttributes<HTMLElement> {
  socials?: SocialLink[]
  legalLinks?: FooterLink[]
}

export function SiteFooter({
  socials = SOCIAL_LINKS,
  legalLinks = LEGAL_LINKS,
  className,
  ...rest
}: SiteFooterProps) {
  const classes = ['site-footer', className].filter(Boolean).join(' ')
  return (
    <footer className={classes} {...rest}>
      <div className="site-footer__inner">
        <Text
          as="p"
          variant="titel"
          color="white"
          uppercase
          className="site-footer__slogan"
        >
          Zukunft <span aria-hidden="true">★</span> Made in Europe
        </Text>

        <div className="site-footer__movement">
          <Text as="p" variant="subtitel" color="neon">
            Werde Teil der Bewegung
          </Text>
          <SocialRow links={socials} className="site-footer__socials" />
        </div>

        <div className="site-footer__legal">
          {legalLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              href={link.href}
              color="white"
              className="site-footer__legal-link"
            >
              {link.label}
            </Link>
          ))}
          <Text as="span" variant="fussnote" color="white">
            © Volt Berlin
          </Text>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
