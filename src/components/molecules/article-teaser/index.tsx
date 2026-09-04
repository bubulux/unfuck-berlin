import type { CSSProperties } from 'react'
import { HighlightText } from '../../atoms/highlight-text'
import Button from '../../atoms/button'
import { formatPublishedAt } from '../../../lib/publishedAt'
import './styles.css'

/**
 * Teaser-Karten fuer die Artikel-Listen. `PressTeaser` steht fuer einen
 * externen Presse-Artikel (CMS: "Presse-Artikel-Verlinkung"), `NewsTeaser` fuer
 * einen eigenen News-Artikel. Beide teilen sich das Karten-Layout und werden
 * sowohl auf /news als auch auf /presse verwendet.
 */

export interface PressTeaserItem {
  title?: string
  url?: string
  screenshot?: string
  publishedAt?: string
}

export interface NewsTeaserItem {
  slug?: string
  title?: string[]
  body?: string
  image?: string
  publishedAt?: string
  is_rtl?: boolean
  lang?: string
}

interface TeaserBaseProps {
  /** Breiten-Klasse der jeweiligen Seite, z. B. `news__text_width`. */
  className?: string
  /** Zeilenumbruch-Heuristik der Ueberschrift, abhaengig vom Viewport. */
  autoBreakSize?: number
}

export interface PressTeaserProps extends TeaserBaseProps {
  press: PressTeaserItem
}

export function PressTeaser({ press, className, autoBreakSize }: PressTeaserProps) {
  const publishedAt_label = formatPublishedAt(press.publishedAt)
  const url = press.url

  return (
    <section
      className={[className, 'pressAndNewsItemSection'].filter(Boolean).join(' ')}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '32px',
        '--img-shadow-color': '#ccc',
      } as CSSProperties}
    >
      <a
        href={url}
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <div className="headlineAndImage">
          {press.screenshot && (<div className="teaserImageInHeadingWrapper"><img src={press.screenshot} /></div>)}

          <HighlightText
            className={`headline ${press.screenshot ? 'hasImage' : ''}`}
            as="h2"
            autoBreakSize={autoBreakSize}
            lines={[press.title || '']}
            variant="body"
            color="purple"
            textColor="white"
            align="left"
            style={{
              marginBlockEnd: '8px',
            }}
          />
        </div>
        <p style={{ width: '52rem', maxWidth: '100%' }}>
          {publishedAt_label && <><strong>{publishedAt_label}</strong> — </>}<em>{url}</em>
        </p>
      </a>
      <div>
        <Button as="a" size="cta" variant="outline" href={url} color="purple">
          Artikel lesen…
        </Button>
      </div>
    </section>
  )
}

export interface NewsTeaserProps extends TeaserBaseProps {
  article: NewsTeaserItem
}

export function NewsTeaser({ article, className, autoBreakSize }: NewsTeaserProps) {
  const publishedAt_label = formatPublishedAt(article.publishedAt)
  const url = `/news/${article.slug}`

  return (
    <section
      className={[className, 'pressAndNewsItemSection'].filter(Boolean).join(' ')}
      dir={article.is_rtl ? 'rtl' : 'ltr'}
      lang={article.lang || undefined}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginBottom: '32px',
        '--img-shadow-color': 'var(--color-purple)',
      } as CSSProperties}
    >
      <a
        href={url}
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <div className="headlineAndImage">
          {article.image && (<div className="teaserImageInHeadingWrapper"><img src={article.image} /></div>)}

        <HighlightText
          className={`headline ${article.image ? 'hasImage' : ''}`}
          as="h2"
          autoBreakSize={autoBreakSize}
          lines={article.title || []}
          variant="subtitel"
          color="neon"
          textColor="purple"
          align="left"
          style={{
            marginBlockEnd: '8px',
          }}
        />
        </div>

        <p style={{ width: '52rem', maxWidth: '100%' }}>
          {publishedAt_label && <strong>{publishedAt_label}</strong>}
          {article.body && (publishedAt_label ? ` — ${article.body}` : article.body)}
        </p>
      </a>
      <div lang="de">
        <Button as="a" size="cta" variant="outline" href={url} color="purple" dir="ltr">
          weiter lesen…
        </Button>
      </div>
    </section>
  )
}
