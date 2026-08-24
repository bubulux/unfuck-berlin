import type { NavItem } from "../components/organisms/site-header";
import type { WasMehrLink } from "../components/organisms/was-mehr-nav";
import type { FooterLink } from "../components/organisms/site-footer";
import type { SocialLink } from "../components/molecules/social-row";

/** Primary header navigation. */
export const NAV_LINKS: NavItem[] = [
  { label: "Sticker abgreifen", href: "/sticker" },
  { label: "Wahlprogramm", to: "/wahlprogramm" },
  { label: "Bezirke", to: "/bezirke" },
  { label: "News", to: "/news" },
  { label: "Spenden", href: "https://voltdeutschland.org/berlin/spenden" },
  { label: "Mitmachen", href: "https://voltdeutschland.org/berlin/mitmachen" },
];

/** Recurring "WAS MEHR?" cross-navigation block. */
export const WAS_MEHR_LINKS: WasMehrLink[] = [
  { label: "Sticker abgreifen", to: "/sticker" },
  { label: "Wahlprogramm", to: "/wahlprogramm" },
  { label: "Bezirke", to: "/bezirke" },
  { label: "News", to: "/news" },
  { label: "Kalender", to: "/termine" },
  { label: "Alle Voltkandidierenden", to: "/kandidierende" },
  { label: "unf*ck berlin", to: "/news/unfuck-berlin-reveal" },
  { label: "Spenden", href: "https://voltdeutschland.org/berlin/spenden" },
  { label: "Mitmachen", href: "https://voltdeutschland.org/berlin/mitmachen" },
  { label: "VoltBerlin.org", href: "https://voltdeutschland.org/berlin/de" },
];

/** Social platforms shown in the footer / social rows. */
export const SOCIAL_LINKS: SocialLink[] = [
  { ctaLabel: "instagram", ctaHref: "https://www.instagram.com/volt_berlin/" },
  {
    ctaLabel: "linkedin",
    ctaHref: "https://www.linkedin.com/company/volt-berlin/",
  },
  { ctaLabel: "youtube", ctaHref: "https://www.youtube.com/@volt_berlin/" },
  { ctaLabel: "mastodon", ctaHref: "https://berlin.social/@VoltBerlin" },
  {
    ctaLabel: "whatsapp",
    ctaHref: "https://www.whatsapp.com/channel/0029VbBwmKu90x33w7IhA00Z",
  },
  { ctaLabel: "facebook", ctaHref: "https://www.facebook.com/BerlinVolt" },
];

/** Footer legal links. */
export const LEGAL_LINKS: FooterLink[] = [
  { label: "Impressum", href: "https://voltdeutschland.org/berlin/impressum" },
  { label: "Datenschutz", href: "https://voltdeutschland.org/datenschutz" },
  {
    label: "Transparenz",
    href: "https://voltdeutschland.org/berlin/transparenz",
  },
  {
    label: "Made with love…",
    href: "/made_with_love",
  },
];
