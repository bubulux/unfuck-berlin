import type { HTMLAttributes } from "react";
import { Text } from "../../atoms/text";
import { Link } from "../../atoms/link";
import { Icon } from "../../atoms/icon";
import { CountdownTimer } from "../../molecules/countdown-timer";
import "./styles.css";

export interface CountdownSectionProps extends HTMLAttributes<HTMLElement> {
  /** Countdown target (Date, ISO string, or epoch ms). */
  target: Date | string | number;
  heading?: string;
  text?: string;
  ctaLabel?: string;
  ctaTo?: string;
  ctaHref?: string;
}

export function CountdownSection({
  target,
  heading = "Du hast die Wahl",
  text = "", // "Aber wie? Wir erklären dir, wie das Berliner Wahl System funktioniert und was Du benötigst um die beste Wahl für das AGH und die BVV zu treffen.",
  ctaLabel = "Wie wähle ich?",
  ctaTo,
  ctaHref,
  className,
  ...rest
}: CountdownSectionProps) {
  const classes = ["countdown", className].filter(Boolean).join(" ");
  return (
    <section className={classes} {...rest}>
      <div className="countdown__inner">
        <Text as="h2" variant="titel" color="white" align="center">
          {heading}
        </Text>

        <CountdownTimer target={target} />

        {text && <Text
          as="p"
          variant="body"
          color="white"
          align="center"
          className="countdown__text"
        >
          {text}
        </Text>}

        <Link
          to={ctaTo}
          href={ctaHref}
          color="white"
          iconRight={<Icon name="arrow-right" />}
          className="countdown__cta"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}

export default CountdownSection;
