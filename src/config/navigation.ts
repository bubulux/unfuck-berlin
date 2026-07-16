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

/** Social platforms shown in the footer / social rows. */
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'instagram', href: '#' },
  { platform: 'tiktok', href: '#' },
  { platform: 'youtube', href: '#' },
  { platform: 'linkedin', href: '#' },
  { platform: 'x', href: '#' },
  { platform: 'facebook', href: '#' },
]

/** Footer legal links. */
export const LEGAL_LINKS: FooterLink[] = [
  { label: 'Impressum', to: '/impressum' },
  { label: 'Datenschutz', to: '/datenschutz' },
]
