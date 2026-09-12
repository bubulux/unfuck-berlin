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
import { marked } from "marked";
import { OverviewKonstellation } from "./overview-konstellation";
import { OverviewAtlas } from "./overview-atlas";
import { OverviewKacheln } from "./overview-kacheln";

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
    // Drei Entwuerfe fuer die Uebersicht. Standard ist /bezirke; /bezirke/2 und
    // /bezirke/3 zeigen die Alternativen, ohne dass irgendwo ein Umschalter
    // sichtbar waere.
    const overview = pathname.endsWith("/2")
      ? <OverviewAtlas />
      : pathname.endsWith("/3")
        ? <OverviewKacheln />
        : <OverviewKonstellation />

    return (
      <PageLayout activePath="/bezirke" variant="purple">
        <div className="news__wrapper">
          <section className="news__text_width">
            <HighlightText
              as="h1"
              lines={['Bezirke']}
              variant="titel"
              color="neon"
              textColor="purple"
              align="left"
              uppercase={false}
              className="program-intro__heading"
              style={{ marginBottom: 'var(--gap-big)' }}
            />
            <p>
              Genug geredet, jetzt wird aufgeräumt.<br />
              So unf*cken wir deinen Bezirk:
            </p>
          </section>

          <div className="regions-overview">
            {overview}
          </div>
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

  const content_modules = region.content_modules

  const theme_variant: 'light' | 'purple' = 'purple' as 'light' | 'purple' // region.theme === 'purple' ? 'purple' : 'light' as const
  return (
    <PageLayout activePath={pathname} variant={theme_variant}>
      <script type="application/ld+json">
        {JSON.stringify(regionJsonLd)}
      </script>

      <div className="news__wrapper">
        <section className="news__text_width">
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
                        lines={c_as_any.heroZeilen || []}
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
                    if (!c_as_any.photo) {
                      return null
                    }
                    return <section key={key} style={{ marginBlock: 'var(--gap-big)' }}>
                      <img
                        src={c_as_any.photo}
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

        <section className="news__text_width" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          /* Setzt das Spitzenduo deutlich vom vorangehenden Content-Modul (dem
             Bezirksprogramm-CTA) ab. */
          marginBlockStart: 'calc(var(--gap-big) * 1.5)',
          marginBlockEnd: 'var(--gap-small)'
        }}>
          <HighlightText
            as="h2"
            lines={['BVV-Spitzenduo']}
            variant="subtitel"
            color={theme_variant === 'light' ? 'purple' : 'white'}
            textColor={theme_variant === 'light' ? 'white' : 'purple'}
            align="left"
            uppercase={false}
            className="program-intro__heading"
          />

          <div className="region__candidates">
          {
          region.candidates.map((candidate, index) => {
            const candidate_as_any = candidate as any

            const name = candidate.name
            const wahlkreis = candidate_as_any?.wahlkreis || ''
            const schwerpunkte = candidate_as_any?.schwerpunkte || ''

            const md_content: string = candidate_as_any?.md_content || ''

            return <div key={`${name}-${index}`} className="region__candidate">
              {
                candidate.image ? (
              <div
                className="region__candidate-photo"
                style={{ backgroundImage: `url(${candidate.image})` }}
              />)
              : (<div className="region__candidate-photo region__candidate-photo--placeholder">*</div>)
              }
              <div className="region__candidate-text">
                <strong>{name}</strong>
                {wahlkreis && <span>{wahlkreis}</span>}
                {schwerpunkte && <span>{schwerpunkte}</span>}
              </div>
              {md_content && (
                <div
                  className="region__candidate-md"
                  dangerouslySetInnerHTML={{ __html: marked(md_content) as string }}
                />
              )}
            </div>
          })
        }
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
