import type { NavItem } from '../components/organisms/site-header'
import type { WasMehrLink } from '../components/organisms/was-mehr-nav'
import type { FooterLink } from '../components/organisms/site-footer'
import type { SocialLink } from '../components/molecules/social-row'

/** Primary header navigation. */
export const NAV_LINKS: NavItem[] = [
  { label: 'Wahlprogramm', to: '/wahlprogramm' },
  { label: 'Spenden', to: '/spenden' },
  { label: 'Mitmachen', to: '/mitmachen' },
]

/** Recurring "WAS MEHR?" cross-navigation block. */
export const WAS_MEHR_LINKS: WasMehrLink[] = [
  { label: 'Wahlprogramm', to: '/wahlprogramm' },
  { label: 'Kalender', to: '/termine' },
  { label: 'Alle Voltkandidaten', to: '/kandidaten' },
  { label: 'Sticker abgreifen', to: '/sticker' },
  { label: 'UnF*ck Berlin', to: '/unfuck-berlin' },
  { label: 'Im Bezirk', to: '/bezirk' },
  { label: 'Spenden', to: '/spenden' },
  { label: 'Mitmachen', to: '/mitmachen' },
]

/** Social platforms shown in the footer / social rows (only the ones we have). */
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'facebook', href: '#' },
  { platform: 'instagram', href: '#' },
  { platform: 'x', href: '#' },
  { platform: 'linkedin', href: '#' },
]

/** Footer legal links. */
export const LEGAL_LINKS: FooterLink[] = [
  { label: 'Impressum', to: '/impressum' },
  { label: 'Datenschutz', to: '/datenschutz' },
  { label: 'Transparenz', to: '/transparenz' },
]
