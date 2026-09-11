import { useEffect, useState } from 'react'
import './styles.css'

export interface ToastProps {
  /** Nachricht, oder `null` wenn nichts angezeigt werden soll. */
  message: string | null
  /** Anzeigedauer in ms. */
  duration?: number
  onDismiss?: () => void
}

/**
 * Kurze Fehlermeldung am unteren Bildschirmrand – fuer Probleme, die nicht an
 * einem einzelnen Feld haengen (Netz weg, Server kaputt).
 */
export function Toast({ message, duration = 4000, onDismiss }: ToastProps) {
  // Der Text bleibt beim Ausblenden stehen, sonst springt das Panel auf leer,
  // bevor die Transition durch ist. Bewusst waehrend des Renderns
  // nachgezogen – ein Effekt dafuer wuerde einen Frame mit altem Text zeigen.
  const [text, setText] = useState(message ?? '')
  if (message && message !== text) setText(message)

  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => onDismiss?.(), duration)
    return () => clearTimeout(timer)
  }, [message, duration, onDismiss])

  return (
    <div
      className={`toast ${message ? 'toast--visible' : ''}`}
      role="alert"
      aria-live="assertive"
    >
      {text}
    </div>
  )
}

export default Toast
