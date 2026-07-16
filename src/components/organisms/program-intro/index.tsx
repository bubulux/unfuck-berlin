import type { HTMLAttributes, ReactNode } from "react";
import { Link as RouterLink } from "react-router";
import { Button } from "../../atoms/button";
import { HighlightText } from "../../atoms/highlight-text";
import type { ColorToken } from "../../atoms/text";
import "./styles.css";

export interface ProgramIntroProps extends HTMLAttributes<HTMLElement> {
  /** Heading text — a single line or one entry per highlight box. */
  heading?: string | string[];
  /** Highlight box color for the heading. */
  headingColor?: ColorToken;
  headingAlign?: "left" | "center";
  headingUppercase?: boolean;
  /** Body copy (paragraphs, may include inline <strong>). */
  children: ReactNode;
  ctaLabel?: string;
  ctaColor?: ColorToken;
  ctaTo?: string;
  ctaHref?: string;
}

export function ProgramIntro({
  heading = "Wahlprogramm",
  headingColor = "green",
  headingAlign = "center",
  headingUppercase = true,
  children,
  ctaLabel = "Gesamtes Wahlprogramm zur AGH-Wahl 2026",
  ctaColor = "neon",
  ctaTo,
  ctaHref,
  className,
  ...rest
}: ProgramIntroProps) {
  const headingLines = Array.isArray(heading) ? heading : [heading];
  const classes = ["program-intro", className].filter(Boolean).join(" ");
  return (
    <section className={classes} {...rest}>
      <div className="program-intro__inner">
        <HighlightText
          as="h1"
          lines={headingLines}
          variant="titel"
          color={headingColor}
          textColor="purple"
          align={headingAlign}
          uppercase={headingUppercase}
          className="program-intro__heading"
        />

        <div className="program-intro__body">{children}</div>

        {ctaHref ? (
          <Button
            as="a"
            href={ctaHref}
            target="_blank"
            rel="noreferrer noopener"
            color={ctaColor}
            className="program-intro__cta"
          >
            {ctaLabel}
          </Button>
        ) : ctaTo ? (
          <Button
            as={RouterLink}
            to={ctaTo}
            color={ctaColor}
            className="program-intro__cta"
          >
            {ctaLabel}
          </Button>
        ) : (
          <Button color={ctaColor} className="program-intro__cta">
            {ctaLabel}
          </Button>
        )}
      </div>
    </section>
  );
}

export default ProgramIntro;
