import type { ReactNode } from 'react'
import { SiteHeader, type NavItem } from '../../organisms/site-header'
import { WasMehrNav, type WasMehrLink } from '../../organisms/was-mehr-nav'
import {
  SiteFooter,
  type FooterLink,
} from '../../organisms/site-footer'
import { CalendarSection } from '../../organisms/calendar-section'
import type { SocialLink } from '../../molecules/social-row'
import { getUpcomingCalendarItems } from '../../../data/events'
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
  /** Hide the "Triff uns!" calendar block that otherwise renders at the end.
   * Set this on pages that place the calendar themselves (e.g. the home page). */
  hideCalendar?: boolean
  /** `purple` (default): purple page + purple header. `light`: white page + light header. */
  variant?: 'purple' | 'light'
}

export function PageLayout({
  children,
  activePath,
  navLinks,
  wasMehrLinks,
  socials,
  legalLinks,
  hideWasMehr = false,
  hideCalendar = false,
  variant = 'purple',
}: PageLayoutProps) {
  return (
    <div className={`page-layout page-layout--${variant}`}>
      <SiteHeader
        links={navLinks}
        activePath={activePath}
        variant={variant === 'light' ? 'light' : 'purple'}
      />
      <main className="page-layout__main">{children}</main>
      {hideCalendar ? null : (
        <CalendarSection events={getUpcomingCalendarItems(3)} viewAllTo="/termine" />
      )}
      {hideWasMehr ? null : <WasMehrNav links={wasMehrLinks} />}
      <SiteFooter socials={socials} legalLinks={legalLinks} />
    </div>
  )
}

export default PageLayout
