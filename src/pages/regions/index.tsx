import { Link, useLocation } from "react-router";
import { PageLayout } from "../../components/templates/page-layout";
import { REGIONS_CMS } from "../../data/regions.generated";
import { HighlightText } from "../../components/atoms/highlight-text";
import Button from "../../components/atoms/button";
import { Icon } from "../../components/atoms/icon";
// import ReactMarkdown from "react-markdown";
import { useMediaQuery } from "@uidotdev/usehooks";

import './styles.css'
import SpitzenduoComposite from "../../components/organisms/spitzenduo-composite";

export function RegionsPage() {
  const { pathname } = useLocation();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 500px)");
  const isMediumDevice = useMediaQuery("only screen and (min-width : 500px) and (max-width : 900px)");

  const autoBreakSize_cramped = isSmallDevice ? 0.15 : isMediumDevice ? 0.20 : 0.25
  const autoBreakSize_roomy = isSmallDevice ? 0.2 : isMediumDevice ? 0.25 : 0.33

  const region_many = REGIONS_CMS
    // .filter(a => a.is_published === true)
    .filter(a => pathname.endsWith(`/${a.slug}`))

  if (!region_many.length) {
    const REGIONS_CMS_sorted = REGIONS_CMS
      // .filter(a => a.is_published === true)
      // .sort((a, b) => b.name || '' - a.name || '')

    return (
      <PageLayout activePath={pathname} variant="light">
        <div className="news__wrapper">
          <HighlightText
            as="h1"
            lines={['Bezirke']}
            variant="titel"
            color="purple"
            textColor="white"
            align="left"
            uppercase={false}
            className="news__text_width program-intro__heading"
            style={{ marginBottom: 'var(--gap-big)' }}
          />

          {
            REGIONS_CMS_sorted.map((region, index) => {
              // const publishedAt_date = new Date(region.publishedAt);
              const url = `/bezirke/${region.slug}`

              return (
                <section
                  key={`${index}-${region.slug}`}
                  className="news__text_width"
                  style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}
                >
                  <a
                    href={url}
                    style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                  >
                    <HighlightText
                      as="h2"
                      autoBreakSize={autoBreakSize_roomy}
                      lines={[region.title]}
                      variant="subtitel"
                      color="neon"
                      textColor="purple"
                      align="left"
                      style={{ marginBottom: '8px' }}
                    />
                  </a>
                  <div>
                    <Button as="a" size="cta" href={url} color="purple">
                      zum Bezirk…
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

  const region = region_many[0]

  const regionJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://unfuck.berlin/bezirke/${region.slug}`
  },
  "headline": region.title,
  // "image": [
  //   "https://example.com/images/region-1200.jpg"
  // ],
  // "datePublished": `${region.publishedAt}T00:00:00+02:00`,
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
  "description": region.body || ''
}

  const content_modules = [
    {
      _type: 'hero_linear',
      heroZeilen: [region.title],
    }
  ]

  const theme_variant: 'light' | 'purple' = 'light' as 'light' | 'purple' // region.theme === 'purple' ? 'purple' : 'light' as const
  return (
    <PageLayout activePath={pathname} variant={theme_variant}>
      <script type="application/ld+json">
        {JSON.stringify(regionJsonLd)}
      </script>

      <div className="news__wrapper">
        <section className="news__text_width" style={{ marginBlockEnd: '32px' }}>
          <Link to="/bezirke">
            <Button
              size="cta"
              variant="solid"
              color={theme_variant === 'purple' ? 'purple' : 'white'}
              iconLeft={<Icon size="1.5em" name="arrow-left" />}
            >
              Zur Bezirks Übersicht
            </Button>
          </Link>
        </section>

              {
                content_modules.map((c, index) => {
                  const key = `${index}-${c._type}`
        
                  const c_as_any = (c as any)
        
                  if (c._type === 'hero_linear') {
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

      </div>
    </PageLayout>
  );
}
