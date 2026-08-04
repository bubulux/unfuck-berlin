import type { HTMLAttributes } from 'react'
import {
  SocialIcon,
  type SocialPlatform,
  socialPlatforms,
} from '../../atoms/social-icon'
import './styles.css'

export interface SocialLink {
  ctaLabel: string
  ctaHref: string
}

export interface SocialRowProps extends HTMLAttributes<HTMLDivElement> {
  links: SocialLink[]
}

export function SocialRow({ links, className, ...rest }: SocialRowProps) {
  const classes = ['social-row', className].filter(Boolean).join(' ')
  return (
    <div className={classes} {...rest}>
      {links.map((link, index) => {

        let platform: SocialPlatform = 'unknown'
        const ctaLabel = (link.ctaLabel || 'unknown').toLowerCase()
        if (socialPlatforms.includes(ctaLabel as unknown as SocialPlatform)) {
          platform = link.ctaLabel as SocialPlatform
        }

        return (<SocialIcon
          key={`${index}-${link.ctaLabel}-${link.ctaHref}`}
          platform={platform}
          href={link.ctaHref}
        />)
      })}
    </div>
  )
}

export default SocialRow
