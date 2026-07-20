import type { HTMLAttributes } from "react";
import { Text } from "../../atoms/text";
import { Link } from "../../atoms/link";
import { EuropeStars } from "../../atoms/europe-stars";
import { HighlightText, type HighlightLine } from "../../atoms/highlight-text";
import { SocialRow, type SocialLink } from "../../molecules/social-row";
import { SOCIAL_LINKS, LEGAL_LINKS } from "../../../config/navigation";
import "./styles.css";

export interface FooterLink {
  label: string;
  to?: string;
  href?: string;
}

export interface ContactBlock {
  label: string;
  email: string;
}

export interface SiteFooterProps extends HTMLAttributes<HTMLElement> {
  socials?: SocialLink[];
  legalLinks?: FooterLink[];
  /** Highlighted call-to-action links. */
  actions?: HighlightLine[];
  contacts?: ContactBlock[];
}

const DEFAULT_ACTIONS: HighlightLine[] = [
  { text: "Spenden", href: "https://voltdeutschland.org/berlin/spenden" },
  { text: "Mittmachen", href: "https://voltdeutschland.org/berlin/mitmachen" },
  { text: "Sticker abgreifen", to: "/sticker" },
];

const DEFAULT_CONTACTS: ContactBlock[] = [
  {
    label: "Allgemeine Fragen und Feedback",
    email: "berlin@voltdeutschland.org",
  },
  { label: "Presse- und Medienanfragen", email: "presse@voltberlin.org" },
];

export function SiteFooter({
  socials = SOCIAL_LINKS,
  legalLinks = LEGAL_LINKS,
  actions = DEFAULT_ACTIONS,
  contacts = DEFAULT_CONTACTS,
  className,
  ...rest
}: SiteFooterProps) {
  const classes = ["site-footer", className].filter(Boolean).join(" ");
  return (
    <footer className={classes} {...rest}>
      <div className="site-footer__inner">
        <div className="site-footer__center">
          <Text
            as="p"
            variant="subtitel"
            color="white"
            weight="bold"
            align="center"
            className="site-footer__movement-title"
          >
            Werde Teil der Bewegung
          </Text>

          <SocialRow links={socials} className="site-footer__socials" />
        </div>

        <HighlightText
          className="site-footer__actions"
          lines={actions}
          variant="body"
          color="neon"
          textColor="purple"
          slant={0.25}
        />

        <div className="site-footer__contact">
          <Text as="p" variant="body" color="white" weight="bold">
            Kontakt
          </Text>
          {contacts.map((c) => (
            <div key={c.email} className="site-footer__contact-item">
              <Text as="p" variant="body" color="white">
                {c.label}
              </Text>
              <a
                href={`mailto:${c.email}`}
                className="site-footer__contact-email"
              >
                {c.email}
              </a>
            </div>
          ))}
        </div>

        <div className="site-footer__closing">
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
          </div>

          <p className="site-footer__slogan">
            <span>Zukunft</span>
            <EuropeStars className="site-footer__stars" size="1.1em" />
            <span>Made in Europe</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
