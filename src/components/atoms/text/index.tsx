import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import './styles.css'

export type TextVariant =
  | 'titel'
  | 'subtitel'
  | 'body'
  | 'cta'
  | 'fussnote'
  | 'kalender'

export type ColorToken =
  | 'purple'
  | 'white'
  | 'yellow'
  | 'neon'
  | 'green'
  | 'blue'
  | 'pink'
  | 'black'

export type TextWeight = 'light' | 'regular' | 'medium' | 'bold'
export type TextAlign = 'left' | 'center' | 'right'

const COLOR_TOKENS: readonly ColorToken[] = [
  'purple',
  'white',
  'yellow',
  'neon',
  'green',
  'blue',
  'pink',
  'black',
]

/** Default semantic element per variant (overridable via `as`). */
const DEFAULT_TAG: Record<TextVariant, ElementType> = {
  titel: 'h1',
  subtitel: 'h2',
  body: 'p',
  cta: 'span',
  fussnote: 'small',
  kalender: 'span',
}

function isColorToken(value: string): value is ColorToken {
  return (COLOR_TOKENS as readonly string[]).includes(value)
}

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** Size/weight preset. Defaults to `body`. */
  variant?: TextVariant
  /** Semantic element override. Defaults per variant. */
  as?: ElementType
  /** Brand color token, or any raw CSS color string. */
  color?: ColorToken | (string & {})
  weight?: TextWeight
  align?: TextAlign
  uppercase?: boolean
  children: ReactNode
}

export function Text({
  variant = 'body',
  as,
  color,
  weight,
  align,
  uppercase = false,
  className,
  style,
  children,
  ...rest
}: TextProps) {
  const Component = as ?? DEFAULT_TAG[variant]

  const classes = [
    'text',
    `text--${variant}`,
    weight && `text--weight-${weight}`,
    align && `text--align-${align}`,
    uppercase && 'text--uppercase',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const resolvedColor =
    color && isColorToken(color) ? `var(--color-${color})` : color

  return (
    <Component
      className={classes}
      style={resolvedColor ? { color: resolvedColor, ...style } : style}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Text
