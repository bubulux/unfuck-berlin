import { useLocation } from "react-router";
import { PageLayout } from "../../components/templates/page-layout";
import { NEWS_CMS } from "../../data/news.generated";
import { HighlightText } from "../../components/atoms/highlight-text";

export function NewsPage() {
  const { pathname } = useLocation();
  console.log('NEWS_CMS', NEWS_CMS)

  const article_many = NEWS_CMS.filter(a => a.slug === pathname)
  if (!article_many) {
    return (
    <PageLayout activePath={pathname} variant="light">
      <div className="voting__inner">
        {
          article_many.map(a => {
            return <a href={`/news/${a.slug}`}>
              <section>
                <h2>{a.body}</h2>
              </section>
            </a>
          })
        }
      </div>
      {/* <pre>{JSON.stringify(article_many, null, 2)}</pre> */}
    </PageLayout>
  );
  }

  const article = article_many[0]

  return (
    <PageLayout activePath={pathname} variant="light">
      <div className="voting__inner">
      {
        article.content.map(c => {
          if (c._type === 'hero_linear') {

            const publishedAt_date = new Date(article.publishedAt);
            const options = {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }

            return <section>
              <HighlightText
                as="h1"
                lines={c.heroZeilen}
                variant="titel"
                color="green"
                textColor="purple"
                align="left"
                uppercase={false}
                className="program-intro__heading"
                style={{ marginBottom: '16px' }}
              />

              <strong>{publishedAt_date.toLocaleString('de-DE', options)}</strong>
            </section>
          } else if (c._type === 'html_text') {
            return <section style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: c.html_text }} />
          }

          return null
        })
      }
      
      </div>
      {/* <pre>{JSON.stringify(article, null, 2)}</pre> */}
    </PageLayout>
  );
}
