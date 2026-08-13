const FRAME_STYLE = {
  position: 'fixed',
  inset: 0,
  width: '100%',
  height: '100%',
  border: 0,
} as const

/** Ported 1:1 from the standalone static page (public/sticker/sticker.html). */
export function Sticker() {
  return (
    <iframe
      title="Sticker abgreifen – unf*ck berlin – Volt Berlin"
      src="/sticker/sticker.html"
      style={FRAME_STYLE}
    />
  )
}

export default Sticker
