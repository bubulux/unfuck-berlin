import { Link, useLocation } from "react-router";
import { PageLayout } from "../../components/templates/page-layout";
import { NEWS_CMS } from "../../data/news.generated";
import { PRESS_CMS } from "../../data/press.generated";
import { HighlightText } from "../../components/atoms/highlight-text";
import Button from "../../components/atoms/button";
import { Icon } from "../../components/atoms/icon";
// import ReactMarkdown from "react-markdown";
import { useMediaQuery } from "@uidotdev/usehooks";
import { marked } from 'marked'


import './styles.css'
import SpitzenduoComposite from "../../components/organisms/spitzenduo-composite";
import { getFullBodyText } from "../../lib/getFullBodyText";

// function getFirstPhoto () {
//   {
//         "_key": "a3b9bfe61bc4",
//         "_type": "photo",
//         "alt": "Pia Voltz mit Antragstext",
//         "foto_originalFilename": "pressemitteilung-bvv-trekoe-2025-06-16.jpg",
//         "photo": "https://cdn.sanity.io/images/xzcgo5ky/production/4e6bfc353a41a5b725c87f75eeb0e0cd2729e4d7-1880x1084.jpg"
//       },
// }

export function NewsPage() {
  const { pathname } = useLocation();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 500px)");
  const isMediumDevice = useMediaQuery("only screen and (min-width : 500px) and (max-width : 900px)");

  const autoBreakSize_cramped = isSmallDevice ? 0.15 : isMediumDevice ? 0.20 : 0.25
  const autoBreakSize_roomy = isSmallDevice ? 0.2 : isMediumDevice ? 0.25 : 0.33

  const article_many = NEWS_CMS
    .filter(a => a.is_published === true)
    .filter(a => pathname.endsWith(`/${a.slug}`))

  if (!article_many.length) {

    const PRESS_AND_NEWS_SORTED = [
      ...(PRESS_CMS.map(data => ({ type: 'press', data }))),
      ...(NEWS_CMS.map(data => ({ type: 'article', data }))),
    ]
      .filter(a => a.data.is_published === true)
      .sort((a, b) => Number(new Date(b.data.publishedAt || '')) - Number(new Date(a.data.publishedAt || '')))

    return (
      <PageLayout activePath={pathname} variant="light">
        <div className="news__wrapper article_list">
          <HighlightText
            as="h1"
            lines={['News']}
            variant="titel"
            color="purple"
            textColor="white"
            align="left"
            uppercase={false}
            className="news__text_width program-intro__heading"
            style={{ marginBottom: 'var(--gap-big)' }}
          />

          {
            PRESS_AND_NEWS_SORTED.map((item, index) => {
              if (item.type === 'press') {
                const press: any = item.data
                const publishedAt_date = new Date(press.publishedAt);
                const url = press.url

                return (
                  <section
                    key={`${index}-${press.url}`}
                    className="news__text_width pressAndNewsItemSection"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      marginBottom: '32px',
                      '--img-shadow-color': '#ccc',
                    } as React.CSSProperties}
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
                          autoBreakSize={autoBreakSize_roomy}
                          lines={[press.title]}
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
                        <strong>{publishedAt_date.toLocaleString('de-DE', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}</strong> — <em>{url}</em>
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
              if (item.type === 'article') {
                const article: any = item.data

                const publishedAt_date = new Date(article.publishedAt);
                const url = `/news/${article.slug}`

                return (
                  <section
                    key={`${index}-${article.slug}`}
                    className="news__text_width pressAndNewsItemSection"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      marginBottom: '32px',
                      '--img-shadow-color': 'var(--color-purple)',
                    } as React.CSSProperties}
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
                        autoBreakSize={autoBreakSize_roomy}
                        lines={article.title}
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
                        <strong>{publishedAt_date.toLocaleString('de-DE', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}</strong>
                        {article.body && ` — ${article.body}`}
                      </p>
                    </a>
                    <div>
                      <Button as="a" size="cta" variant="outline" href={url} color="purple">
                        weiter lesen…
                      </Button>
                    </div>
                  </section>
                )
              }

              return null
            })
          }
        </div>
      </PageLayout>
    );
  }

  const article = article_many[0]

  const full_body = getFullBodyText(article.content_modules)

  const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://unfuck.berlin/news/${article.slug}`
  },
  "identifier": `https://unfuck.berlin/news/${article.slug}`,
  "sameAs": `https://unfuck.berlin/news/${article.slug}`,
  "url": `https://unfuck.berlin/news/${article.slug}`,
  "headline": (article.title || []).join(' '),
  "name": (article.title || []).join(' '),
  "alternateName": (article.title || []).join(' '),
  // "image": [
  //   "https://example.com/images/article-1200.jpg"
  // ],
  "publisherImprint": "https://voltdeutschland.org/berlin/impressum",
  "isAccessibleForFree": true,
  "genre": "News",
  "dateCreated": `${article.publishedAt}T00:00:00+02:00`,
  "datePublished": `${article.publishedAt}T00:00:00+02:00`,
  "contentReferenceTime": `${article.publishedAt}T00:00:00+02:00`,
  "countryOfOrigin": "Germany",
  // "dateModified": "2026-07-29T09:15:00+02:00",
  "publisher": {
    "@type": "Organization",
    "name": "Volt Berlin",
    // "logo": {
    //   "@type": "ImageObject",
    //   "url": "https://example.com/logo.png"
    // }
  },
  "author": {
    "@type": "Organization",
    "name": "Volt Berlin",
    // "logo": {
    //   "@type": "ImageObject",
    //   "url": "https://example.com/logo.png"
    // }
  },
  "description": article.body || '',
  "abstract": article.body || '',
  "articleBody": full_body,
  "text": full_body,
}


  const theme_variant = article.theme === 'purple' ? 'purple' : 'light' as const
  return (
    <PageLayout activePath={pathname} variant={theme_variant}>
      <script type="application/ld+json">
        {JSON.stringify(articleJsonLd)}
      </script>

      <div className="news__wrapper">
        <section className="news__text_width" style={{ marginBlockEnd: '32px' }}>
          <Link to="/news">
            <Button
              size="cta"
              variant="solid"
              color={theme_variant === 'purple' ? 'purple' : 'white'}
              iconLeft={<Icon size="1.5em" name="arrow-left" />}
            >
              Zur Artikel Übersicht
            </Button>
          </Link>
        </section>

      {
        article.content_modules.map((c, index) => {
          const key = `${index}-${c._type}`

          const c_as_any = (c as any)

          if (c._type === 'hero_linear') {
            const publishedAt_date = new Date(article.publishedAt);

            return <section
              key={key}
              className="news__text_width"
            >
              <HighlightText
                as="h1"
                autoBreakSize={autoBreakSize_cramped}
                lines={c.heroZeilen || []}
                variant="titel"
                color="neon"
                textColor="purple"
                align="left"
                uppercase={false}
                className="program-intro__heading"
                style={{ marginBottom: '32px' }}
              />

              <p style={{ width: 'var(--content-max)', maxWidth: '100%' }}>
                <strong>{publishedAt_date.toLocaleString('de-DE', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}</strong>
                {article.body && ` — ${article.body}`}
              </p>
            </section>
          } else if (c._type === 'headline') {
            return (<section
                key={key}
                className="news__text_width"
                style={{ marginBlock: 'var(--gap-big) 16px' }}
              >
                <HighlightText
                  as="h2"
                  autoBreakSize={autoBreakSize_roomy}
                  lines={(c as any).headlineZeilen}
                  variant="subtitel"
                  color="neon"
                  textColor="purple"
                  align="left"
                  uppercase={false}
                />
              </section>
            )
          } else if (c._type === 'html_content') {
            const html_content: string = c_as_any.html_content || ''
            return <section key={key} className="news__text_width" style={{
              whiteSpace: 'pre-wrap',
              // width: 'var(--content-max)',
            }} dangerouslySetInnerHTML={{ __html: html_content }} />
          } else if (c._type === 'md_content') {
            const md_content: string = c_as_any.md_content || ''
            const html_content = marked(md_content)

            return <section key={key} className="news__text_width markdown_wrapper" style={{
              // width: 'var(--content-max)',
            }} dangerouslySetInnerHTML={{ __html: html_content }} />
          } else if (c._type === 'one_cta') {
            return (
              <section key={key} className="news__text_width">
                <Button as="a" href={c_as_any.ctaHref} color="neon" style={{ margin: '0', width: 'auto' }}>
                  {c_as_any.ctaLabel}
                </Button>
              </section>
            )
          } else if (c._type === 'photo') {
            if (!c.photo) {
              return null
            }
            return <section key={key} style={{ marginBlock: 'var(--gap-big)' }}>
              <img
                src={c.photo}
                alt={c_as_any.alt || ''}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                loading="lazy"
              />
            </section>
          } else if (c._type === 'spitzenduo_teaser') {
            return <section key={key} style={{ marginBlock: 'var(--gap-big) var(--gap-small)' }}>
              <SpitzenduoComposite className="flex flex-row" />
            </section>
          }

          return null
        })
      }


      <section
        className="news__text_width"
        style={{ marginBlock: 'var(--gap-big) 16px' }}
      >
        <HighlightText
          as="h2"
          lines={['Über Volt in Berlin']}
          variant="subtitel"
          color={theme_variant === 'purple' ? 'white' : 'purple'}
          textColor={theme_variant === 'purple' ? 'purple' : 'white'}
          align="left"
          uppercase={false}
          className="program-intro__heading"
        />
      </section>
      <section className="news__text_width">
        Volt — die erste paneuropäische Partei — kämpft seit 2017 grenzüberschreitend für eine innovative, nachhaltige und sozial gerechte Politik. Vom Europäischen Parlament bis in die Kommunen bringen wir bereits heute konkrete Lösungen voran. 2026 treten wir in Berlin zur Abgeordnetenhaus- und Bezirksverordnetenversammlungswahl an, um bewährte Ansätze aus ganz Europa hier entschlossen umzusetzen.
      </section>

      <section
        className="news__text_width"
        style={{ marginBlock: 'var(--gap-big) 16px' }}
      >
        <HighlightText
          as="h2"
          autoBreakSize={autoBreakSize_roomy}
          lines={['Presse- und Medienanfragen']}
          variant="subtitel"
          color={theme_variant === 'purple' ? 'white' : 'purple'}
          textColor={theme_variant === 'purple' ? 'purple' : 'white'}
          align="left"
          uppercase={false}
          className="program-intro__heading"
        />
      </section>
      <section className="news__text_width">
        <p>
          Für Presse- und Medienanfragen können Sie sich an <Link style={{ textDecoration: 'underline' }} to="mailto:presse@voltberlin.org">presse@voltberlin.org</Link> wenden. Charlene Lorenz oder das Presseteam antworten Ihnen gerne.
        </p>
        <br />
        <p>
          Allgemeine Fragen und Feedback bitte an <Link style={{ textDecoration: 'underline' }} to="mailto:berlin@voltdeutschland.org">berlin@voltdeutschland.org</Link> richten.
        </p>
      </section>

      </div>
    </PageLayout>
  );
}
