import type { HTMLAttributes } from 'react'
import { Text } from '../../atoms/text'
import { RichText } from '../../molecules/rich-text'
import { SocialRow, type SocialLink } from '../../molecules/social-row'
import './styles.css'
import { Link } from 'react-router'
import Button from '../../atoms/button'
import Icon from '../../atoms/icon'
import PhotoCreditsBox from '../../atoms/photo-credits-box'

export interface CandidateBlock {
  heading: string
  body: string
}

export interface CandidateDetailProps extends HTMLAttributes<HTMLElement> {
  name: string
  image: string
  imageAlt: string
  foto_originalFilename: string
  image_2: string
  imageAlt_2: string
  foto_originalFilename_2: string
  /** e.g. "Kandidierende zur Wahl des AGH 2026 / Listenplatz 2". */
  subtitle?: string
  /** Short fact lines, e.g. ["Listenplatz: 2 | Alter: 36 | Bezirk: Pankow"]. */
  meta?: string[]
  blocks: CandidateBlock[]
  /** Label above the social row, e.g. "Folge Paul". */
  followLabel?: string
  socials?: SocialLink[]
  /** `purple` (default): purple bg, white text, neon headings. `light`: white bg, black text, purple headings. */
  variant?: 'purple' | 'light'
}

export function CandidateDetail({
  name,
  image,
  imageAlt,
  foto_originalFilename,

  image_2,
  imageAlt_2,
  foto_originalFilename_2,

  subtitle,
  meta = [],
  blocks,
  followLabel,
  socials = [],
  variant = 'purple',
  className,
  ...rest
}: CandidateDetailProps) {
  const isLight = variant === 'light'
  const textColor = isLight ? 'var(--color-purple)' : 'white'
  const headingColor = isLight ? 'purple' : 'neon'
  const nameColor = isLight ? 'purple' : 'white'
  const followColor = isLight ? 'purple' : textColor
  const classes = ['candidate', `candidate--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={classes} {...rest}>
      <div className="candidate__inner">
        <section className="candidate__content" style={{ marginBlockEnd: '32px' }}>
          <Link to="/kandidierende">
            <Button
              size="cta"
              variant="solid"
              color={variant === 'purple' ? 'purple' : 'white'}
              iconLeft={<Icon size="1.5em" name="arrow-left" />}
            >
              Zur Kandidierenden Übersicht
            </Button>
          </Link>
        </section>

        <div className="candidate__media">
          <div>
            <Text as="h1" variant="titel" color={nameColor} uppercase className="candidate__name">
              {name}
            </Text>

            <PhotoCreditsBox foto_originalFilename={foto_originalFilename}>
              <img className="candidate__image" src={image} alt={imageAlt} />
            </PhotoCreditsBox>
          </div>

          {((subtitle || meta.length > 0) && image_2) ? <div>
            {subtitle && <Text as="p" variant="body" color={textColor} weight="bold">
              {subtitle}
            </Text>}

            {meta.length > 0 && (
              <div className="candidate__meta">
                {meta.map((line) => (
                  <Text key={line} as="p" variant="body" color={textColor}>
                    {line}
                  </Text>
                ))}
              </div>
            )}

            {image_2 && <PhotoCreditsBox foto_originalFilename={foto_originalFilename_2}>
              <img className="candidate__image" src={image_2} alt={imageAlt_2} />
            </PhotoCreditsBox>}
          </div> : null}
        </div>

        <div className="candidate__content">
          {((subtitle || meta.length > 0) && !image_2) ? <>
            {subtitle && <Text as="p" variant="body" color={textColor} weight="bold">
              {subtitle}
            </Text>}

            {meta.length > 0 && (
              <div className="candidate__meta">
                {meta.map((line) => (
                  <Text key={line} as="p" variant="body" color={textColor}>
                    {line}
                  </Text>
                ))}
              </div>
            )}
          </> : null}

          {socials.length > 0 ? (
            <div className="candidate__follow">
              {followLabel ? (
                <Text as="p" variant="body" color={followColor} weight="bold">
                  {followLabel}
                </Text>
              ) : null}
              <SocialRow links={socials} />
            </div>
          ) : null}

          <div className="candidate__blocks">
            {blocks.map((block) => (
              <div key={block.heading} className="candidate__block">
                <Text as="h2" variant="subtitel" color={headingColor}>
                  {block.heading}
                </Text>
                <RichText text={block.body} color={textColor} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CandidateDetail
