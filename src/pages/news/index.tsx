import { useLocation } from "react-router";
import { PageLayout } from "../../components/templates/page-layout";
import { NEWS_CMS } from "../../data/news.generated";
import { HighlightText } from "../../components/atoms/highlight-text";
import Button from "../../components/atoms/button";

export function NewsPage() {
  const { pathname } = useLocation();

  const article_many = NEWS_CMS.filter(a => pathname.endsWith(`/${a.slug}`))
  if (!article_many.length) {
    return (
      <PageLayout activePath={pathname} variant="light">
        <div className="voting__inner">
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
            NEWS_CMS.map((article, index) => {
              const publishedAt_date = new Date(article.publishedAt);
              const url = `/news/${article.slug}`
              return (
                <section key={`${index}-${article.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                    <strong>{publishedAt_date.toLocaleString('de-DE', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</strong>
                    <p>{article.body}</p>
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
      <div className="voting__inner">
      {
        article.content.map((c, index) => {
          const key = `${index}-${c._type}`

          if (c._type === 'hero_linear') {

            const publishedAt_date = new Date(article.publishedAt);

            return <section key={key}>
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

              <strong>{publishedAt_date.toLocaleString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</strong>
            </section>
          } else if (c._type === 'html_text') {
            return <section key={key} style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: c.html_text }} />
          }

          return null
        })
      }

      </div>
    </PageLayout>
  );
}
