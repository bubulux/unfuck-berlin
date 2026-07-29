import { Link, useLocation } from "react-router";
import { PageLayout } from "../../components/templates/page-layout";
import { NEWS_CMS } from "../../data/news.generated";
import { HighlightText } from "../../components/atoms/highlight-text";
import Button from "../../components/atoms/button";
import { Icon } from "../../components/atoms/icon";
// import ReactMarkdown from "react-markdown";

import './styles.css'

export function NewsPage() {
  const { pathname } = useLocation();

  const article_many = NEWS_CMS
    .filter(a => a.is_published === true)
    .filter(a => pathname.endsWith(`/${a.slug}`))

  if (!article_many.length) {
    const NEWS_CMS_sorted = NEWS_CMS
      .filter(a => a.is_published === true)
      .sort((a, b) => Number(new Date(b.publishedAt || '')) - Number(new Date(a.publishedAt || '')))

    return (
      <PageLayout activePath={pathname} variant="light">
        <div className="news__wrapper">
          <HighlightText
            as="h1"
            lines={['News']}
            variant="titel"
            color="purple"
            textColor="white"
            align="left"
            uppercase={false}
            className="news__text_width program-intro__heading"
            style={{ marginBottom: '64px' }}
          />

          {
            NEWS_CMS_sorted.map((article, index) => {
              const publishedAt_date = new Date(article.publishedAt);
              const url = `/news/${article.slug}`

              return (
                <section
                  key={`${index}-${article.slug}`}
                  className="news__text_width"
                  style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}
                >
                  <a
                    href={url}
                    style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                  >
                    <HighlightText
                      as="h2"
                      lines={article.title}
                      variant="subtitel"
                      color="neon"
                      textColor="purple"
                      align="left"
                      style={{ marginBottom: '8px' }}
                    />
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
                    <Button as="a" size="cta" href={url} color="purple">
                      weiter lesen…
                    </Button>
                  </div>
                </section>
              )
            })
          }
        </div>
      </PageLayout>
    );
  }

  const article = article_many[0]

  const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://unfuck.berlin/news/${article.slug}`
  },
  "headline": (article.title || []).join(' '),
  // "image": [
  //   "https://example.com/images/article-1200.jpg"
  // ],
  "datePublished": `${article.publishedAt}T00:00:00+02:00`,
  // "dateModified": "2026-07-29T09:15:00+02:00",
  // "author": {
  //   "@type": "Person",
  //   "name": "Volt Berlin"
  // },
  "publisher": {
    "@type": "Organization",
    "name": "Volt Berlin",
    // "logo": {
    //   "@type": "ImageObject",
    //   "url": "https://example.com/logo.png"
    // }
  },
  "description": article.body || ''
}


  const theme_variant = article.theme || 'light' // 'light
  return (
    <PageLayout activePath={pathname} variant={theme_variant}>
      <script type="application/ld+json">
        {JSON.stringify(articleJsonLd)}
      </script>

      <div className="news__wrapper">
      {
        article.content.map((c, index) => {
          const key = `${index}-${c._type}`

          if (c._type === 'hero_linear') {
            const publishedAt_date = new Date(article.publishedAt);

            return <section
              key={key}
              className="news__text_width"
            >
              <HighlightText
                as="h1"
                lines={c.heroZeilen}
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
                style={{ paddingBlock: '64px 16px' }}
              >
                <HighlightText
                  as="h2"
                  lines={(c as any).headlineZeilen}
                  variant="subtitel"
                  color={theme_variant === 'purple' ? 'white' : 'purple'}
                  textColor={theme_variant === 'purple' ? 'purple' : 'white'}
                  align="left"
                  uppercase={false}
                  className="program-intro__heading"
                />
              </section>
            )
          } else if (c._type === 'html_content') {
            const html_content: string = c.html_content || ''
            return <section key={key} className="news__text_width" style={{
              whiteSpace: 'pre-wrap',
              // width: 'var(--content-max)',
            }} dangerouslySetInnerHTML={{ __html: html_content }} />
          // } else if (c._type === 'md_text') {
          //   return <section key={key} style={{ whiteSpace: 'pre-wrap' }}>
          //     <ReactMarkdown>{c.md_text}</ReactMarkdown>
          //   </section>
          } else if (c._type === 'one_cta') {
            return (
              <section key={key} className="news__text_width">
                <Button as="a" href={c.ctaHref} color="neon" className="news__text_width unfuck-intro__cta" style={{ margin: '0' }}>
                  {c.ctaLabel}
                </Button>
              </section>
            )
          } else if (c._type === 'photo') {
            return <section key={key} style={{ marginBlock: '64px' }}>
              <img
                src={c.photo}
                alt={c.alt || ''}
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                loading="lazy"
              />
            </section>
          }

          return null
        })
      }


      <section
        className="news__text_width"
        style={{ marginBlock: '64px 16px' }}
      >
        <HighlightText
          as="h2"
          lines={['Über Volt']}
          variant="subtitel"
          color={theme_variant === 'purple' ? 'white' : 'purple'}
          textColor={theme_variant === 'purple' ? 'purple' : 'white'}
          align="left"
          uppercase={false}
          className="program-intro__heading"
        />
      </section>
      <section
        className="news__text_width"
        style={{
          whiteSpace: 'pre-wrap',
        }}
      >
        Volt – die erste paneuropäische Partei – kämpft seit 2017 grenzüberschreitend für eine innovative, nachhaltige und sozial gerechte Politik. Vom Europäischen Parlament bis in die Kommunen bringen wir bereits heute konkrete Lösungen voran. 2026 treten wir in Berlin zur Abgeordnetenhaus- und Bezirksverordnetenversammlungswahl an, um bewährte Ansätze aus ganz Europa hier entschlossen umzusetzen.
      </section>
      <section className="news__text_width">
        <Link to="/news/">
          <Button
            size="cta"
            variant="outline"
            color={theme_variant === 'purple' ? 'white' : 'purple'}
            iconLeft={<Icon size="1.5em" name="arrow-left" />}
          >
            Zur Artikel Übersicht
          </Button>
        </Link>
      </section>

      </div>
    </PageLayout>
  );
}
