import type { ReactNode } from 'react'
import { SiteHeader, type NavItem } from '../../organisms/site-header'
import { WasMehrNav, type WasMehrLink } from '../../organisms/was-mehr-nav'
import {
  SiteFooter,
  type FooterLink,
} from '../../organisms/site-footer'
import type { SocialLink } from '../../molecules/social-row'
import './styles.css'

export interface PageLayoutProps {
  children: ReactNode
  /** Current route, to highlight the active nav link. */
  activePath?: string
  navLinks?: NavItem[]
  wasMehrLinks?: WasMehrLink[]
  socials?: SocialLink[]
  legalLinks?: FooterLink[]
  /** Hide the recurring "WAS MEHR?" cross-nav block. */
  hideWasMehr?: boolean
  /** `purple` (default): purple page + purple header. `light`: white page + light header. */
  variant?: 'purple' | 'light'
  style?: Record<string, any>
}

export function PageLayout({
  children,
  activePath,
  navLinks,
  wasMehrLinks,
  socials,
  legalLinks,
  hideWasMehr = false,
  variant = 'purple',
  style,
}: PageLayoutProps) {
  return (
    <div
      className={`page-layout page-layout--${variant}`}
      style={{
        color: variant === 'light' ? 'var(--color-purple)' : 'var(--color-white)',
        ...style,
      }}
    >
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "url": "https://unfuck.berlin",
          "sameAs": ["https://unfuck.berlin", "https://voltdeutschland.org/berlin", "https://voltberlin.org", "https://voltberlin.fun", "https://voltberlin.ai"],
          "logo": "https://unfuck.berlin/volt-logo.png",
          "name": "Volt Berlin",
          "description": "Volt bringt nach Berlin, was woanders funktioniert. Egal, ob die Idee aus Berlin, Kopenhagen oder Warschau kommt. So einfach. So selten. Volt ist eine europaweite Bewegung und Partei. Wir setzen uns für eine gemeinsame, moderne und lösungsorientierte Politik ein.",
          "email": "berlin@voltdeutschland.org",
          // "telephone": "+47-99-999-9999",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Choriner Straße 34",
            "addressLocality": "Berlin",
            "addressCountry": "DE",
            "addressRegion": "Berlin",
            "postalCode": "10435"
          },
          // "vatID": "FR12345678901",
          // "iso6523Code": "0199:724500PMK2A2M1SQQ228"
        })}
      </script>
      <SiteHeader
        links={navLinks}
        activePath={activePath}
        variant={variant === 'light' ? 'light' : 'purple'}
      />
      <main className="page-layout__main">{children}</main>
      {hideWasMehr ? null : <WasMehrNav links={wasMehrLinks} />}
      <SiteFooter socials={socials} legalLinks={legalLinks} />
    </div>
  )
}

export default PageLayout
