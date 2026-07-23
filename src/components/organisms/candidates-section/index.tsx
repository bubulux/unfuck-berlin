import type { HTMLAttributes, ReactNode } from "react";
import { Text } from "../../atoms/text";
import { Link } from "../../atoms/link";
import { HighlightText } from "../../atoms/highlight-text";
import { CandidateCluster } from "../../molecules/candidate-cluster";
import "./styles.css";

export interface CandidatesSectionProps extends HTMLAttributes<HTMLElement> {
  /** Right-column content (the Anna/Paul cards). */
  lead?: ReactNode;
  /** Intro paragraph in the left column. */
  text?: string;
  ctaLabel?: string;
  ctaTo?: string;
  ctaHref?: string;
}

export function CandidatesSection({
  lead,
  text = "Unsere Kandidierenden kommen nicht aus der Politik. Sie sind Macher:innen aus der Praxis.",
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
        <div className="candidates__grid">
          <HighlightText
            as="h2"
            lines={["Unsere", "Kandidierenden"]}
            variant="titel"
            color="white"
            textColor="purple"
            align="left"
            uppercase
            className="candidates__heading"
          />

          <div className="candidates__cards">{lead}</div>

          <CandidateCluster className="candidates__cluster" />

          <Text as="p" variant="body" color="white" className="candidates__text">
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
