import { Link, useLocation } from "react-router";
import { PageLayout } from "../../components/templates/page-layout";
import { HighlightText } from "../../components/atoms/highlight-text";
import Button from "../../components/atoms/button";
import { Icon } from "../../components/atoms/icon";
import { useMediaQuery } from "@uidotdev/usehooks";
import { marked } from 'marked'
import './styles.css'
import SpitzenduoComposite from "../../components/organisms/spitzenduo-composite";
import { parseCalendar, toDisplayItem } from "../../lib/calendar";
import volt_berlin_public_calendar_ics from '../../data/volt-berlin-public-calendar.generated.ics?raw'

const ClockGlyph = () => (
  <svg
    className="event-card__icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V12l3 1.5" />
  </svg>
)

const PinGlyph = () => (
  <svg
    className="event-card__icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export function TerminePage() {
  const { pathname } = useLocation();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 500px)");
  const isMediumDevice = useMediaQuery("only screen and (min-width : 500px) and (max-width : 900px)");

  const autoBreakSize_cramped = isSmallDevice ? 0.15 : isMediumDevice ? 0.20 : 0.25
  const autoBreakSize_roomy = isSmallDevice ? 0.2 : isMediumDevice ? 0.25 : 0.33

  const events_raw = parseCalendar(volt_berlin_public_calendar_ics)

  // Show the whole run up to and including 30 September (of the soonest event's
  // year), then stop — no pagination, everything is on the page at once.
  const cutoffYear = events_raw[0]?.start.getFullYear() ?? new Date().getFullYear();
  const cutoff = new Date(cutoffYear, 8, 30, 23, 59, 59, 999);
  const events = events_raw
    .filter((_, i) => events_raw[i] && events_raw[i].start <= cutoff)
    .filter(a => pathname.endsWith(`/${a.id}`))

  const event = toDisplayItem(events[0])
  console.log('event', event)

  const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://unfuck.berlin/termine/${event.id}`
  },
  "url": `https://unfuck.berlin/termine/${event.id}`,
  "sameAs": `https://unfuck.berlin/termine/${event.id}`,
  "identifier": event.id || '',
  "name": event.title || '',
  "alternateName": event.title || '',
  // "image": [
  //   "https://example.com/images/event-1200.jpg"
  // ],
  "doorTime": event.iso_start,
  "startDate": event.iso_start,
  "endDate": event.iso_end,
  "location": event.location,
  // "dateModified": "2026-07-29T09:15:00+02:00",
  // "author": {
  //   "@type": "Person",
  //   "name": "Volt Berlin"
  // },
  "organizer": {
    "@type": "Organization",
    "name": "Volt Berlin",
    // "logo": {
    //   "@type": "ImageObject",
    //   "url": "https://example.com/logo.png"
    // }
  },
  "description": event.description || '',
  "abstract": event.description || '',
  "articleBody": event.description || '',
  "text": event.description || '',
}

  const content_modules = [
    {
      _type: 'hero_linear',
      heroZeilen: [event.title],
    },
    {
      _type: 'md_content',
      md_content: event.description,
    }
  ]

  const theme_variant = 'light' // article.theme === 'purple' ? 'purple' : 'light' as const
  return (
    <PageLayout activePath={pathname} variant={theme_variant}>
      <script type="application/ld+json">
        {JSON.stringify(articleJsonLd)}
      </script>

      <div className="news__wrapper">
        <section className="news__text_width" style={{ marginBlockEnd: '32px' }}>
          <Link to="/termine">
            <Button
              size="cta"
              variant="solid"
              color={theme_variant as any === 'purple' ? 'purple' : 'white'}
              iconLeft={<Icon size="1.5em" name="arrow-left" />}
            >
              Zur Termin Übersicht
            </Button>
          </Link>
        </section>

      {
        content_modules.map((c, index) => {
          const key = `${index}-${c._type}`

          const c_as_any = (c as any)

          if (c._type === 'hero_linear') {
            const location = event.location

            const badge = event.badge

            return <section
              key={key}
              className="news__text_width"
              style={{ position: 'relative' }}
            >
              {badge ? (
                <HighlightText
                  lines={[badge.label]}
                  variant="body"
                  color={badge.color}
                  textColor={badge.textColor}
                  direction="column"
                  align="left"
                  style={{ marginBottom: '16px' }}
                />
              ) : null}

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

              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ClockGlyph />
                  <span>{[`${event.day}. ${event.month}`, event.time].join(', ')}</span>
                </strong>
                {location ? (
                  /^https?:\/\//i.test(location) ? (
                    <a
                      href={location}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <PinGlyph />
                        <span>Auf Karte ansehen</span>
                      </strong>
                    </a>
                  ) : (
                    <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <PinGlyph />
                      <span>{location}</span>
                    </strong>
                  )
                ) : null}
              </div>

              <hr />
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
