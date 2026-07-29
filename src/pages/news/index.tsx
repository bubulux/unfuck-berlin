import { useLocation } from "react-router";
import { PageLayout } from "../../components/templates/page-layout";
import { NEWS_CMS } from "../../data/news.generated";
import { HighlightText } from "../../components/atoms/highlight-text";
import Button from "../../components/atoms/button";
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
            className="program-intro__heading"
            style={{ marginBottom: '16px' }}
          />

          {
            NEWS_CMS_sorted.map((article, index) => {
              const publishedAt_date = new Date(article.publishedAt);
              const url = `/news/${article.slug}`

              return (
                <section
                  key={`${index}-${article.slug}`}
                  className="news__text_width"
                  style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}
                >
                  <a href={url}>
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
                  <Button as="a" href={url} color="neon">
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
  return (
    <PageLayout activePath={pathname} variant="light">
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
                style={{ marginBottom: '16px' }}
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
            return (
              <HighlightText
                key={key}
                as="h2"
                lines={(c as any).headlineZeilen}
                variant="subtitel"
                color="purple"
                textColor="white"
                align="left"
                uppercase={false}
                className="news__text_width program-intro__heading"
                // style={{ marginBottom: '16px' }}
              />
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
              <Button key={key} as="a" href={c.ctaHref} color="neon" className="news__text_width unfuck-intro__cta" style={{ margin: '0' }}>
                {c.ctaLabel}
              </Button>
            )
          } else if (c._type === 'photo') {
            return <section key={key} style={{ paddingBlock: '64px' }}>
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

      </div>
    </PageLayout>
  );
}
