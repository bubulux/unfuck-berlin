import type { HTMLAttributes } from "react";
import { Text } from "../../atoms/text";
import { Link } from "../../atoms/link";
import { HighlightText } from "../../atoms/highlight-text";
import { MediaOverlay } from "../../molecules/media-overlay";
import "./styles.css";

export interface CandidatesSectionProps extends HTMLAttributes<HTMLElement> {
  imageSrc: string;
  imageAlt: string;
  /** Optional lead photo shown first, with a caption link over its bottom. */
  leadImageSrc?: string;
  leadImageAlt?: string;
  leadCaptionLabel?: string;
  leadCaptionTo?: string;
  leadCaptionHref?: string;
  text?: string;
  ctaLabel?: string;
  ctaTo?: string;
  ctaHref?: string;
}

export function CandidatesSection({
  imageSrc,
  imageAlt,
  leadImageSrc,
  leadImageAlt,
  leadCaptionLabel,
  leadCaptionTo,
  leadCaptionHref,
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
        <div className="candidates__head">
          <HighlightText
            as="h2"
            lines={["Unsere", "Kandidierenden"]}
            variant="titel"
            color="white"
            textColor="purple"
            align="center"
            uppercase
          />
        </div>

        {leadImageSrc ? (
          <MediaOverlay
            className="candidates__lead"
            src={leadImageSrc}
            alt={leadImageAlt ?? ""}
            captionLabel={leadCaptionLabel}
            captionTo={leadCaptionTo}
            captionHref={leadCaptionHref}
          />
        ) : null}

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
