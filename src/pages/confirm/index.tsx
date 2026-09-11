import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { PageLayout } from '../../components/templates/page-layout'
import { CalendarSection } from '../../components/organisms/calendar-section'
import { SuccessPanel } from '../../components/molecules/success-panel'
import { UnfckLogo } from '../../components/atoms/unfck-logo'
import { Link } from '../../components/atoms/link'
import { Text } from '../../components/atoms/text'
import { useCalendar } from '../../context/calendar-context'
import { confirmStickerRequest, type ConfirmResult } from '../../lib/sticker'
import '../sticker/styles.css'

type View = 'loading' | ConfirmResult

function ConfirmView({ view }: { view: View }) {
  switch (view) {
    case 'loading':
      return (
        <Text as="p" variant="body" color="white" align="center">
          Einen Moment …
        </Text>
      )

    case 'ok':
      return (
        <SuccessPanel headline="Danke!">
          <Text as="p" variant="body" color="white">
            Deine Bestellung ist bestätigt.
          </Text>
          <Text as="p" variant="body" color="white">
            Deine 10 gratis Sticker sind in 1–2 Wochen bei dir!
          </Text>
        </SuccessPanel>
      )

    case 'already_confirmed':
      return (
        <SuccessPanel headline="Schon bestätigt">
          <Text as="p" variant="body" color="white">
            Deine Bestellung war bereits bestätigt. Alles gut — die Sticker sind
            unterwegs.
          </Text>
        </SuccessPanel>
      )

    case 'invalid':
      return (
        <SuccessPanel headline="Link ungültig" showIcon={false} showSocials={false}>
          <Text as="p" variant="body" color="white">
            Dieser Bestätigungslink ist ungültig. Bitte prüf, ob du den
            vollständigen Link aus der E-Mail kopiert hast.
          </Text>
          <Link to="/" color="white" underline>
            Zurück zur Startseite
          </Link>
        </SuccessPanel>
      )

    default:
      return (
        <SuccessPanel
          headline="Etwas ist schiefgelaufen"
          showIcon={false}
          showSocials={false}
        >
          <Text as="p" variant="body" color="white">
            Wir konnten deine Bestätigung gerade nicht verarbeiten. Versuch es in
            ein paar Minuten nochmal.
          </Text>
          <Link to="/" color="white" underline>
            Zurück zur Startseite
          </Link>
        </SuccessPanel>
      )
  }
}

/**
 * Schritt 2 des Double Opt-In: der Link aus der Bestaetigungsmail. Die Mail
 * zeigt auf `/confirm.html?token=…` (siehe Edge Function `sticker-submit`),
 * deshalb haengt in `main.tsx` neben `/confirm` auch dieser Alias auf der
 * Seite.
 */
export function Confirm() {
  const { pathname, search } = useLocation()
  const calendar = useCalendar()
  const token = (new URLSearchParams(search).get('token') ?? '').trim()
  const [view, setView] = useState<View>('loading')
  // Der Token darf nur einmal eingeloest werden: sonst antwortet der zweite
  // Aufruf mit "already_confirmed" und der Nutzer sieht die falsche Meldung.
  // Betrifft vor allem den doppelten Effekt-Lauf im StrictMode.
  const requested = useRef<string | null>(null)

  useEffect(() => {
    if (!token || requested.current === token) return
    requested.current = token

    // Bewusst ohne Abbruch-Flag: im StrictMode raeumt React den ersten Lauf
    // sofort ab, der zweite wuerde durch die Ref-Sperre nichts mehr starten –
    // das Ergebnis muss also auch nach dem Cleanup ankommen.
    confirmStickerRequest(token).then(setView)
  }, [token])

  return (
    <PageLayout activePath={pathname}>
      <section className="sticker-page">
        <div className="sticker-page__inner">
          <UnfckLogo className="sticker-page__logo" />
          {/* Ohne Token muss gar nichts erst geladen werden. */}
          <ConfirmView view={token ? view : 'invalid'} />
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

export default Confirm
