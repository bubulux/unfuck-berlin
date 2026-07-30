import type { CSSProperties, ElementType, HTMLAttributes } from "react";
import { Link as RouterLink } from "react-router";
import type { ColorToken, TextVariant } from "../text";
import "./styles.css";
import { autoBreakHeadline } from "../../../lib/autoBreakHeadline";

export type { ColorToken, TextVariant };

export interface HighlightSegment {
  text: string;
  /** Box background override for this segment. */
  color?: ColorToken;
  /** Text color override for this segment. */
  textColor?: ColorToken;
  /** Make the box an internal link (react-router). */
  to?: string;
  /** Make the box an external link (plain anchor, opens in a new tab). */
  href?: string;
}

export type HighlightLine = string | HighlightSegment;

export interface HighlightTextProps extends HTMLAttributes<HTMLElement> {
  autoBreakSize?: number;
  /** One box per entry. Strings inherit the component-level colors. */
  lines: HighlightLine[];
  /** Size preset. Defaults to `titel`. */
  variant?: TextVariant;
  /** Default box background. */
  color?: ColorToken;
  /** Default text color. */
  textColor?: ColorToken;
  /** Stack boxes vertically (`column`) or flow them inline (`row`). */
  direction?: "column" | "row";
  align?: "left" | "center" | "right";
  uppercase?: boolean;
  /** Wrapper element (use a heading tag for semantic headings). */
  as?: ElementType;
}

function toSegment(line: HighlightLine): HighlightSegment {
  return typeof line === "string" ? { text: line } : line;
}

export function HighlightText({
  autoBreakSize = 0.25,
  lines,
  variant = "titel",
  color = "white",
  textColor = "purple",
  direction = "column",
  align = "left",
  uppercase = false,
  as: Component = "div",
  className,
  style,
  ...rest
}: HighlightTextProps) {
  const classes = [
    "highlight",
    `highlight--${variant}`,
    `highlight--${direction}`,
    `highlight--align-${align}`,
    uppercase && "highlight--uppercase",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // auto split lines, if only one line is provided
  const autoBrokenLines = lines.length === 1 ? autoBreakHeadline({ text: lines.join(' '), size: autoBreakSize }) : lines

  return (
    <Component className={classes} style={style} {...rest}>
      {autoBrokenLines.map((line, i) => {
        const seg = toSegment(line);
        const segStyle: CSSProperties = {
          "--hl-bg": `var(--color-${seg.color ?? color})`,
          "--hl-fg": `var(--color-${seg.textColor ?? textColor})`,
        } as CSSProperties;
        const inner = <span className="highlight__text">{seg.text}</span>;

        if (seg.href) {
          const external = /^https?:\/\//.test(seg.href);
          return (
            <a
              key={i}
              className="highlight__box highlight__box--link"
              style={segStyle}
              href={seg.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer noopener" : undefined}
            >
              {inner}
            </a>
          );
        }
        if (seg.to) {
          return (
            <RouterLink
              key={i}
              className="highlight__box highlight__box--link"
              style={segStyle}
              to={seg.to}
            >
              {inner}
            </RouterLink>
          );
        }
        return (
          <span key={i} className="highlight__box" style={segStyle}>
            {inner}
          </span>
        );
      }).map((line, index) => {
        if (!line) {
          return null
        }
        return <div key={`${index}-${line}`} className="highlight__line">{line}</div>
      })
      
      }
    </Component>
  );
}

export default HighlightText;
