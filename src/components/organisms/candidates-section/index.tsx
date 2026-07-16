import type { HTMLAttributes } from "react";
import { Text } from "../../atoms/text";
import { Link } from "../../atoms/link";
import { HighlightText } from "../../atoms/highlight-text";
import "./styles.css";

export interface CandidatesSectionProps extends HTMLAttributes<HTMLElement> {
  imageSrc: string;
  imageAlt: string;
  text?: string;
  ctaLabel?: string;
  ctaTo?: string;
  ctaHref?: string;
}

export function CandidatesSection({
  imageSrc,
  imageAlt,
  text = "Hinter jeder Kandidatur steht ein Mensch mit Ideen, Erfahrungen und dem Wunsch, Berlin voranzubringen. Hier kannst du unsere Kandidatinnen und Kandidaten kennenlernen.",
  ctaLabel = "Unsere Kandidierenden stellen sich vor",
  ctaTo,
  ctaHref,
  className,
  ...rest
}: CandidatesSectionProps) {
  const classes = ["candidates", className].filter(Boolean).join(" ");
  return (
    <section className={classes} {...rest}>
      <div className="candidates__inner">
        <div className="candidates__head">
          <HighlightText
            as="h2"
            lines={["Unsere", "Kandidaten"]}
            variant="titel"
            color="white"
            textColor="purple"
            align="center"
            uppercase
          />
        </div>

        <img className="candidates__image" src={imageSrc} alt={imageAlt} />

        <div className="candidates__foot">
          <Text as="p" variant="body" color="white" align="center">
            {text}
          </Text>
          <Link
            to={ctaTo}
            href={ctaHref}
            color="white"
            className="candidates__cta"
          >
            {ctaLabel}
            <span className="candidates__arrow" aria-hidden="true">
              {" "}
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CandidatesSection;
