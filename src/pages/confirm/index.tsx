import { useLocation } from 'react-router'

const FRAME_STYLE = {
  position: 'fixed',
  inset: 0,
  width: '100%',
  height: '100%',
  border: 0,
} as const

/** Ported 1:1 from public/sticker/confirm.html. The ?token=… query is forwarded
 * to the static page, which reads it and calls the Supabase confirm function. */
export function Confirm() {
  const { search } = useLocation()
  return (
    <iframe
      title="Bestellung bestätigen – unf*ck berlin – Volt Berlin"
      src={`/sticker/confirm.html${search}`}
      style={FRAME_STYLE}
    />
  )
}

export default Confirm
