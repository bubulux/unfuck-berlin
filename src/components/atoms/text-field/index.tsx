import type { InputHTMLAttributes } from 'react'
import './styles.css'

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  /**
   * Beschriftung des Feldes. Wird nur fuer Screenreader gerendert – sichtbar
   * bleibt (wie im Legacy-Formular) der Placeholder.
   */
  label: string
  className?: string
}

/**
 * Einzeiliges Eingabefeld im Sticker-Formular-Look: weisser Block, lila
 * fetter Text, neon Fokusrahmen. Aus der statischen Legacy-Seite uebernommen.
 */
export function TextField({
  label,
  id,
  className,
  type = 'text',
  ...rest
}: TextFieldProps) {
  const classes = ['text-field', className].filter(Boolean).join(' ')
  return (
    <span className="text-field__wrap">
      <label className="text-field__label" htmlFor={id}>
        {label}
      </label>
      <input id={id} type={type} className={classes} {...rest} />
    </span>
  )
}

export default TextField
