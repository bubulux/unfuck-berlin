import { Navigate, useLocation } from "react-router";
import { PageLayout } from "../../components/templates/page-layout";
import { PAGES_CMS } from "../../data/pages.generated";
import { HighlightText } from "../../components/atoms/highlight-text";
import Button from "../../components/atoms/button";
// import { Icon } from "../../components/atoms/icon";
// import ReactMarkdown from "react-markdown";
import { useMediaQuery } from "@uidotdev/usehooks";
import { EventsSection } from "../../components/organisms/events-section";
import { CarouselSection } from "../../components/organisms/carousel-section";
import { useCalendar } from "../../context/calendar-context";
import { MEETS } from "../../data/meets";
import './styles.css'
import SpitzenduoComposite from "../../components/organisms/spitzenduo-composite";
import { marked } from "marked";
import ProgramSection from "../../components/organisms/program-section";
import { WAHLPROGRAMM } from "../../data/wahlprogramm";
import { getHeadlineColors } from '../../lib/getHeadlineColors'

function CustomCalendarPage() {
  const { items, raw, status } = useCalendar();

  // Show the whole run up to and including 30 September (of the soonest event's
  // year), then stop — no pagination, everything is on the page at once.
  const cutoffYear = raw[0]?.start.getFullYear() ?? new Date().getFullYear();
  const cutoff = new Date(cutoffYear, 8, 30, 23, 59, 59, 999);
  const events = items.filter((_, i) => raw[i] && raw[i].start <= cutoff);

  return (
    <>
      <EventsSection events={events} status={status} />
      <CarouselSection images={MEETS} />
    </>
  );
}

export function PagePage() {
  const { pathname } = useLocation();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 500px)");
  const isMediumDevice = useMediaQuery("only screen and (min-width : 500px) and (max-width : 900px)");

  const autoBreakSize_cramped = isSmallDevice ? 0.15 : isMediumDevice ? 0.20 : 0.25
  const autoBreakSize_roomy = isSmallDevice ? 0.2 : isMediumDevice ? 0.25 : 0.33

  const page_many = PAGES_CMS
    .filter(a => a.is_published === true)
    .filter(a => pathname.endsWith(`/${a.slug}`))

  if (!page_many.length) {
    return <Navigate to="/" replace />

    const PAGES_CMS_sorted = PAGES_CMS
      .filter(a => a.is_published === true)
      .sort((a, b) => Number(new Date(b.slug || '')) - Number(new Date(a.slug || '')))

    return (
      <PageLayout activePath={pathname} variant="light">
        <div className="pages__wrapper">
          <HighlightText
            as="h1"
            lines={['Pages']}
            variant="titel"
            color="purple"
            textColor="white"
            align="left"
            uppercase={false}
            className="pages__text_width program-intro__heading"
            style={{ marginBottom: 'var(--gap-big)' }}
          />

          {
            PAGES_CMS_sorted.map((page, index) => {
              // const publishedAt_date = new Date(page.publishedAt);
              const url = `/${page.slug}`

              return (
                <section
                  key={`${index}-${page.slug}`}
                  className="pages__text_width"
                  style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}
                >
                  <a
                    href={url}
                    style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                  >
                    <HighlightText
                      as="h2"
                      autoBreakSize={autoBreakSize_roomy}
                      lines={page.title}
                      variant="subtitel"
                      color="neon"
                      textColor="purple"
                      align="left"
                      style={{ marginBottom: '8px' }}
                    />
                    {/* <p style={{ width: '52rem', maxWidth: '100%' }}>
                      <strong>{publishedAt_date.toLocaleString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}</strong>
                      {page.body && ` — ${page.body}`}
                    </p> */}
                    {page.body && <p style={{ width: '52rem', maxWidth: '100%' }}>{}page.body</p>}
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

  const page = page_many[0]

  const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://unfuck.berlin/${page.slug}`
  },
  "headline": (page.title || []).join(' '),
  // "image": [
  //   "https://example.com/images/page-1200.jpg"
  // ],
  // "datePublished": `${page.publishedAt}T00:00:00+02:00`,
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
  "description": page.body || ''
}

  const isEventsPage = Boolean(pathname.endsWith('/termine'))

  const theme_variant = page.theme === 'purple' ? 'purple' : 'light' as const
  return (
    <PageLayout activePath={pathname} variant={theme_variant} style={
      isEventsPage ? { '--content-max-wide': '' } : {}
    }>
      <script type="application/ld+json">
        {JSON.stringify(pageJsonLd)}
      </script>

      <div className={`pages__wrapper ${isEventsPage ? 'wide' : 'semi_wide'}`}>
        {/* <section className="pages__text_width" style={{ marginBlockEnd: '32px' }}>
          <Link to="/pages">
            <Button
              size="cta"
              variant="solid"
              color={theme_variant === 'purple' ? 'purple' : 'white'}
              iconLeft={<Icon size="1.5em" name="arrow-left" />}
            >
              Zur Artikel Übersicht
            </Button>
          </Link>
        </section> */}

      {
        page.content_modules.map((c, index) => {
          const key = `${index}-${c._type}`

          const c_as_any = (c as any)

          if (c._type === 'hero_linear') {
            const {bgColor, textColor} = getHeadlineColors(c_as_any.headline_theme)

            const html_content = page.body ? marked(page.body) : ''

            if (c.photo) {
              return <section
                key={key}
                className={`pages__text_width hero_linear ${c.photo ? 'hasImage' : ''}`}
              >
                <div className="pages__text_width" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-big)' }}>
                  <HighlightText
                    as="h1"
                    autoBreakSize={autoBreakSize_cramped}
                    lines={c.heroZeilen || []}
                    variant="titel"
                    color={bgColor}
                    textColor={textColor}
                    align="left"
                    uppercase={isEventsPage}
                    className="program-intro__heading"
                  />

                  {page.body && <div className="markdown_wrapper" dangerouslySetInnerHTML={{ __html: html_content }} />}
                </div>

                {c.photo ? <img src={c.photo} className="headerimage" alt="" aria-hidden /> : null}
              </section>
            } else {
              return <section
              key={key}
              className="pages__text_width"
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap-big)' }}
            >
              <HighlightText
                as="h1"
                autoBreakSize={autoBreakSize_cramped}
                lines={c.heroZeilen || []}
                variant="titel"
                color={bgColor}
                textColor={textColor}
                align="left"
                uppercase={isEventsPage}
                className="program-intro__heading"
              />

              {page.body && <div className="markdown_wrapper" dangerouslySetInnerHTML={{ __html: html_content }} />}
            </section>
            }
          } else if (c._type === 'headline') {
            const {bgColor, textColor} = getHeadlineColors(c_as_any.headline_theme)
            return (<section
                key={key}
                className="pages__text_width"
                style={{ marginBlock: 'var(--gap-big) 16px' }}
              >
                <HighlightText
                  as="h2"
                  autoBreakSize={autoBreakSize_roomy}
                  lines={(c as any).headlineZeilen}
                  variant="subtitel"
                  color={bgColor}
                  textColor={textColor}
                  align="left"
                  uppercase={false}
                />
              </section>
            )
          } else if (c._type === 'html_content') {
            const html_content: string = c_as_any.html_content || ''
            return <section key={key} className="pages__text_width" style={{
              whiteSpace: 'pre-wrap',
              // width: 'var(--content-max)',
            }} dangerouslySetInnerHTML={{ __html: html_content }} />
          } else if (c._type === 'md_content') {
          const md_content: string = c_as_any.md_content || ''
          const html_content = marked(md_content)
          return <section key={key} className="pages__text_width markdown_wrapper" style={{
            // width: 'var(--content-max)',
          }} dangerouslySetInnerHTML={{ __html: html_content }} />
          } else if (c._type === 'one_cta') {
            return (
              <section key={key} className="pages__text_width">
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
          } else if (c._type === 'wahlprogramm_teaser') {
            const { pillars } = WAHLPROGRAMM;
            return <section key={key} style={{ marginBlock: 'var(--gap-big) var(--gap-small)' }}>
              <ProgramSection pillars={pillars} />
            </section>
          }

          return null
        })
      }

      {isEventsPage ? <CustomCalendarPage /> : null}

      </div>
    </PageLayout>
  );
}
