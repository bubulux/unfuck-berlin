import { useCallback, useState, type FormEvent } from 'react'
import { Button } from '../../atoms/button'
import { Checkbox } from '../../atoms/checkbox'
import { TextField } from '../../atoms/text-field'
import { Toast } from '../../molecules/toast'
import { submitStickerRequest } from '../../../lib/sticker'
import './styles.css'

const EMPTY = {
  email: '',
  name: '',
  strasse: '',
  plz: '',
  stadt: '',
}

type Fields = typeof EMPTY

export interface StickerFormProps {
  /** Wird gerufen, sobald die Bestellung angelegt und die Mail raus ist. */
  onSubmitted: () => void
}

/**
 * Bestellformular fuer die Sticker. Schickt die Daten an die Edge Function
 * `sticker-submit`; die verschickt dann die Bestaetigungsmail (Double Opt-In).
 *
 * Fehler landen an zwei Stellen: was der Nutzer selbst beheben kann, steht als
 * Meldung im Formular – Netz- und Serverprobleme laufen als Toast, damit das
 * ausgefuellte Formular nicht wegspringt.
 */
export function StickerForm({ onSubmitted }: StickerFormProps) {
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const set = (key: keyof Fields) => (e: { target: { value: string } }) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }))

  const dismissToast = useCallback(() => setToast(null), [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (pending) return
    setError(null)

    const values = {
      email: fields.email.trim(),
      name: fields.name.trim(),
      strasse: fields.strasse.trim(),
      plz: fields.plz.trim(),
      stadt: fields.stadt.trim(),
    }

    if (Object.values(values).some((v) => !v)) {
      setError('Bitte fülle alle Felder aus.')
      return
    }
    if (!consent) {
      setError('Bitte stimme der Datenschutzerklärung zu.')
      return
    }

    setPending(true)
    const result = await submitStickerRequest({ ...values, consent })
    setPending(false)

    if (result === 'ok') {
      onSubmitted()
      return
    }
    if (result === 'already_requested') {
      setError(
        'Diese E-Mail-Adresse hat bereits Sticker angefordert. Schau in dein Postfach.',
      )
      return
    }
    setToast(
      result === 'network_error'
        ? 'Netzwerkfehler. Bitte prüf deine Verbindung und versuch es nochmal.'
        : 'Etwas ist schiefgelaufen. Versuch es nochmal.',
    )
  }

  return (
    <>
      <form className="sticker-form" onSubmit={handleSubmit} noValidate>
        <TextField
          id="sticker-email"
          label="E-Mail"
          type="email"
          placeholder="E-Mail"
          autoComplete="email"
          value={fields.email}
          onChange={set('email')}
          required
        />
        <TextField
          id="sticker-name"
          label="Vor- und Nachname"
          placeholder="Vor & Nachname"
          autoComplete="name"
          value={fields.name}
          onChange={set('name')}
          required
        />
        <TextField
          id="sticker-strasse"
          label="Straße und Hausnummer"
          placeholder="Straße & Hausnummer"
          autoComplete="address-line1"
          value={fields.strasse}
          onChange={set('strasse')}
          required
        />

        <div className="sticker-form__row">
          <TextField
            id="sticker-plz"
            label="Postleitzahl"
            placeholder="PLZ"
            autoComplete="postal-code"
            inputMode="numeric"
            maxLength={5}
            value={fields.plz}
            onChange={set('plz')}
            required
          />
          <TextField
            id="sticker-stadt"
            label="Stadt"
            placeholder="Stadt"
            autoComplete="address-level2"
            value={fields.stadt}
            onChange={set('stadt')}
            required
          />
        </div>

        <Checkbox
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="sticker-form__consent"
          required
        >
          Ich akzeptiere die{' '}
          <a
            href="https://voltdeutschland.org/datenschutz"
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => e.stopPropagation()}
          >
            Datenschutzerklärung
          </a>{' '}
          von Volt Deutschland.
        </Checkbox>

        {error ? (
          <p className="sticker-form__error" role="alert">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          color="neon"
          disabled={pending}
          aria-busy={pending || undefined}
          className="sticker-form__submit"
          {...{ 'data-umami-event': 'sticker-form-submit' }}
        >
          {pending ? 'Wird gesendet …' : 'Sticker abgreifen'}
        </Button>
      </form>

      <Toast message={toast} onDismiss={dismissToast} />
    </>
  )
}

export default StickerForm
