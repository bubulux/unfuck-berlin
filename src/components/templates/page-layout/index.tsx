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
}

export function PageLayout({
  children,
  activePath,
  navLinks,
  wasMehrLinks,
  socials,
  legalLinks,
  hideWasMehr = false,
}: PageLayoutProps) {
  return (
    <div className="page-layout">
      <SiteHeader links={navLinks} activePath={activePath} />
      <main className="page-layout__main">{children}</main>
      {hideWasMehr ? null : <WasMehrNav links={wasMehrLinks} />}
      <SiteFooter socials={socials} legalLinks={legalLinks} />
    </div>
  )
}

export default PageLayout
