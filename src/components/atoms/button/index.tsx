import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from 'react'
import type { ColorToken } from '../text'
import './styles.css'

export type ButtonColor = ColorToken
export type ButtonVariant = 'solid' | 'outline'
export type ButtonSize = 'default' | 'cta'

type ButtonOwnProps = {
  color?: ButtonColor
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  /** Optional element after the label, e.g. an arrow icon. */
  iconRight?: ReactNode
  children: ReactNode
}

export type ButtonProps<C extends ElementType = 'button'> = ButtonOwnProps & {
  /** Render as another element/component (e.g. `a` or router `Link`). */
  as?: C
} & Omit<ComponentPropsWithoutRef<C>, keyof ButtonOwnProps | 'as'>

export function Button<C extends ElementType = 'button'>({
  as,
  color = 'neon',
  variant = 'solid',
  size = 'default',
  fullWidth = false,
  iconRight,
  className,
  children,
  ...rest
}: ButtonProps<C>) {
  const Component = (as ?? 'button') as ElementType

  const classes = [
    'button',
    `button--${variant}`,
    `button--${color}`,
    `button--${size}`,
    fullWidth && 'button--full',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Default the type for real <button> elements to avoid accidental submits.
  const extraProps =
    Component === 'button' && !('type' in rest) ? { type: 'button' } : {}

  return (
    <Component className={classes} {...extraProps} {...rest}>
      <span className="button__label">{children}</span>
      {iconRight ? <span className="button__icon">{iconRight}</span> : null}
    </Component>
  )
}

export default Button
