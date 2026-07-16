import type { SVGProps } from 'react'
import './styles.css'

export type IconName =
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up'
  | 'arrow-down'
  | 'chevron-right'
  | 'chevron-left'

/** Path data drawn on a 24×24 viewBox, stroked with currentColor. */
const ICON_PATHS: Record<IconName, string> = {
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  'arrow-left': 'M19 12H5M11 6l-6 6 6 6',
  'arrow-up': 'M12 19V5M6 11l6-6 6 6',
  'arrow-down': 'M12 5v14M6 13l6 6 6-6',
  'chevron-right': 'M9 6l6 6-6 6',
  'chevron-left': 'M15 6l-6 6 6 6',
}

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  /** CSS size for width & height. Defaults to 1em (inherits font size). */
  size?: string
  /** Accessible label. Omit for decorative icons (defaults to aria-hidden). */
  title?: string
}

export function Icon({
  name,
  size = '1em',
  title,
  className,
  ...rest
}: IconProps) {
  const classes = ['icon', className].filter(Boolean).join(' ')
  return (
    <svg
      className={classes}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path d={ICON_PATHS[name]} />
    </svg>
  )
}

export default Icon
