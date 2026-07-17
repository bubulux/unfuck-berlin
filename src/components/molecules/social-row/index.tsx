import type { HTMLAttributes } from 'react'
import {
  SocialIcon,
  type SocialPlatform,
} from '../../atoms/social-icon'
import './styles.css'

export interface SocialLink {
  platform: SocialPlatform
  href: string
}

export interface SocialRowProps extends HTMLAttributes<HTMLDivElement> {
  links: SocialLink[]
}

export function SocialRow({ links, className, ...rest }: SocialRowProps) {
  const classes = ['social-row', className].filter(Boolean).join(' ')
  return (
    <div className={classes} {...rest}>
      {links.map((link) => (
        <SocialIcon
          key={link.platform}
          platform={link.platform}
          href={link.href}
        />
      ))}
    </div>
  )
}

export default SocialRow
