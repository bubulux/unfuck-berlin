import type { NavItem } from "../components/organisms/site-header";
import type { WasMehrLink } from "../components/organisms/was-mehr-nav";
import type { FooterLink } from "../components/organisms/site-footer";
import type { SocialLink } from "../components/molecules/social-row";

/** Primary header navigation. */
export const NAV_LINKS: NavItem[] = [
  { label: "Wahlprogramm", to: "/wahlprogramm" },
  { label: "Spenden", href: "https://voltdeutschland.org/berlin/spenden" },
  { label: "Mitmachen", href: "https://voltdeutschland.org/berlin/mitmachen" },
];

/** Recurring "WAS MEHR?" cross-navigation block. */
export const WAS_MEHR_LINKS: WasMehrLink[] = [
  { label: "Wahlprogramm", to: "/wahlprogramm" },
  { label: "Kalender", to: "/termine" },
  { label: "Alle Voltkandidierenden", to: "/kandidaten" },
  { label: "Sticker abgreifen", to: "/sticker" },
  { label: "unf*ck berlin", to: "/unfuck-berlin" },
  { label: "Spenden", href: "https://voltdeutschland.org/berlin/spenden" },
  { label: "Mitmachen", href: "https://voltdeutschland.org/berlin/mitmachen" },
];

/** Social platforms shown in the footer / social rows. */
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "facebook", href: "https://www.facebook.com/BerlinVolt" },
  { platform: "instagram", href: "https://www.instagram.com/volt_berlin/" },
  {
    platform: "linkedin",
    href: "https://www.linkedin.com/company/volt-berlin/",
  },
  { platform: "mastodon", href: "https://berlin.social/@VoltBerlin" },
  { platform: "youtube", href: "https://www.youtube.com/@volt_berlin/" },
];

/** Footer legal links. */
export const LEGAL_LINKS: FooterLink[] = [
  { label: "Impressum", href: "https://voltdeutschland.org/berlin/impressum" },
  { label: "Datenschutz", href: "https://voltdeutschland.org/datenschutz" },
  {
    label: "Transparenz",
    href: "https://voltdeutschland.org/berlin/transparenz",
  },
];
