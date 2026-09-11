import type { InputHTMLAttributes, ReactNode } from 'react'
import './styles.css'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'> {
  /** Beschriftung neben der Box – darf Links enthalten. */
  children: ReactNode
  className?: string
}

/**
 * Kaestchen mit Haken, wie im Sticker-Formular fuer die
 * Datenschutz-Zustimmung. Die native Box wird ersetzt (appearance: none), der
 * Haken kommt aus CSS.
 */
export function Checkbox({ children, className, ...rest }: CheckboxProps) {
  const classes = ['checkbox', className].filter(Boolean).join(' ')
  return (
    <label className={classes}>
      <input type="checkbox" className="checkbox__input" {...rest} />
      <span className="checkbox__text">{children}</span>
    </label>
  )
}

export default Checkbox
