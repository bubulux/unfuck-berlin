import { useState } from 'react'
import { useLocation } from 'react-router'
import { PageLayout } from '../../components/templates/page-layout'
import { CalendarSection } from '../../components/organisms/calendar-section'
import { StickerForm } from '../../components/organisms/sticker-form'
import { SuccessPanel } from '../../components/molecules/success-panel'
import { UnfckLogo } from '../../components/atoms/unfck-logo'
import { Text } from '../../components/atoms/text'
import { useCalendar } from '../../context/calendar-context'
import './styles.css'

/**
 * "Sticker abgreifen" – Schritt 1 des Double Opt-In. Aus der statischen
 * Legacy-Seite (`sticker.html`) in den App-Shell geholt: Header, Inhalt,
 * "Triff uns!", "Was mehr?" und Footer wie auf jeder anderen Seite.
 *
 * Nach dem Absenden ersetzt die Danke-Meldung Tagline und Formular – die
 * eigentliche Bestellung ist erst mit dem Klick in der Mail durch, siehe
 * `/confirm`.
 */
export function Sticker() {
  const { pathname } = useLocation()
  const calendar = useCalendar()
  const [submitted, setSubmitted] = useState(false)

  return (
    <PageLayout activePath={pathname}>
      <section className="sticker-page">
        <div className="sticker-page__inner">
          <UnfckLogo className="sticker-page__logo" />

          {submitted ? (
            <SuccessPanel headline="Danke!">
              <Text as="p" variant="body" color="white">
                Bitte bestätige deine Bestellung per E-Mail!
              </Text>
            </SuccessPanel>
          ) : (
            <>
              <Text
                as="p"
                variant="body"
                color="white"
                weight="bold"
                align="center"
                className="sticker-page__tagline"
              >
                10 unfuck Sticker gratis für dich.
              </Text>

              <StickerForm onSubmitted={() => setSubmitted(true)} />
            </>
          )}
        </div>
      </section>

      <CalendarSection
        events={calendar.items.slice(0, 3)}
        status={calendar.status}
        viewAllTo="/termine"
      />
    </PageLayout>
  )
}

export default Sticker
