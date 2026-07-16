import type { CSSProperties, ElementType } from 'react'
import type { ColorToken, TextVariant } from '../text'
import './styles.css'

export type { ColorToken, TextVariant }

export interface HighlightSegment {
  text: string
  /** Box background override for this segment. */
  color?: ColorToken
  /** Text color override for this segment. */
  textColor?: ColorToken
  /** Explicit tilt in degrees for this segment (overrides the alternating default). */
  tilt?: number
}

export type HighlightLine = string | HighlightSegment

export interface HighlightTextProps {
  /** One box per entry. Strings inherit the component-level colors. */
  lines: HighlightLine[]
  /** Size preset. Defaults to `titel`. */
  variant?: TextVariant
  /** Default box background. */
  color?: ColorToken
  /** Default text color. */
  textColor?: ColorToken
  /** Stack boxes vertically (`column`) or flow them inline (`row`). */
  direction?: 'column' | 'row'
  align?: 'left' | 'center' | 'right'
  /** Base tilt magnitude in degrees; sign alternates per box. Defaults to 3. */
  tilt?: number
  uppercase?: boolean
  /** Wrapper element (use a heading tag for semantic headings). */
  as?: ElementType
  className?: string
  style?: CSSProperties
}

function toSegment(line: HighlightLine): HighlightSegment {
  return typeof line === 'string' ? { text: line } : line
}

export function HighlightText({
  lines,
  variant = 'titel',
  color = 'white',
  textColor = 'purple',
  direction = 'column',
  align = 'left',
  tilt = 3,
  uppercase = false,
  as: Component = 'div',
  className,
  style,
}: HighlightTextProps) {
  const classes = [
    'highlight',
    `highlight--${variant}`,
    `highlight--${direction}`,
    `highlight--align-${align}`,
    uppercase && 'highlight--uppercase',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Component className={classes} style={style}>
      {lines.map((line, i) => {
        const seg = toSegment(line)
        const deg = seg.tilt ?? (i % 2 === 0 ? -tilt : tilt)
        const segStyle: CSSProperties = {
          '--hl-bg': `var(--color-${seg.color ?? color})`,
          '--hl-fg': `var(--color-${seg.textColor ?? textColor})`,
          transform: `rotate(${deg}deg)`,
        } as CSSProperties
        return (
          <span key={i} className="highlight__box" style={segStyle}>
            {seg.text}
          </span>
        )
      })}
    </Component>
  )
}

export default HighlightText
