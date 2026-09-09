import type { ImgHTMLAttributes } from 'react'
import './styles.css'

export interface UnfckLogoProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  alt?: string
}

/**
 * Der "unf*ck berlin"-Schriftzug. Eine Quelle fuer alle Seiten, damit Hero und
 * Unterseiten nicht auseinanderlaufen. Die Groesse kommt bewusst von aussen
 * (Klasse des Aufrufers), damit jede Seite ihre eigene Skalierung behaelt.
 */
export function UnfckLogo({
  alt = 'unf*ck berlin',
  className,
  ...rest
}: UnfckLogoProps) {
  const classes = ['unfck-logo', className].filter(Boolean).join(' ')
  return (
    <img className={classes} src="/logos/unfckBerlin.svg" alt={alt} {...rest} />
  )
}

export default UnfckLogo
