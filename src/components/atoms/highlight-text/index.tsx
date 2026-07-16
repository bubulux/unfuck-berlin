import type { CSSProperties, ElementType } from "react";
import { Link as RouterLink } from "react-router";
import type { ColorToken, TextVariant } from "../text";
import "./styles.css";

export type { ColorToken, TextVariant };

export interface HighlightSegment {
  text: string;
  /** Box background override for this segment. */
  color?: ColorToken;
  /** Text color override for this segment. */
  textColor?: ColorToken;
  /** Slant depth override for this segment (in em, relative to font size). */
  slant?: number;
  /** Make the box an internal link (react-router). */
  to?: string;
  /** Make the box an external link (plain anchor, opens in a new tab). */
  href?: string;
}

export type HighlightLine = string | HighlightSegment;

export interface HighlightTextProps {
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
  /** Parallelogram slant depth in em (fixed, independent of box width, so wide
   * and narrow boxes look equally relaxed). The top/bottom edges rise toward the
   * right by this amount. Defaults to 0.3. Set 0 for plain rectangles. */
  slant?: number;
  uppercase?: boolean;
  /** Wrapper element (use a heading tag for semantic headings). */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

function toSegment(line: HighlightLine): HighlightSegment {
  return typeof line === "string" ? { text: line } : line;
}

export function HighlightText({
  lines,
  variant = "titel",
  color = "white",
  textColor = "purple",
  direction = "column",
  align = "left",
  slant = 0.1,
  uppercase = false,
  as: Component = "div",
  className,
  style,
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

  return (
    <Component className={classes} style={style}>
      {lines.map((line, i) => {
        const seg = toSegment(line);
        const depth = seg.slant ?? slant;
        const segStyle: CSSProperties = {
          "--hl-bg": `var(--color-${seg.color ?? color})`,
          "--hl-fg": `var(--color-${seg.textColor ?? textColor})`,
          "--hl-slant": `${depth}em`,
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
      })}
    </Component>
  );
}

export default HighlightText;
