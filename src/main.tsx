import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import './styles/global.css'
import { ScrollToTop } from './lib/scroll-to-top'
import { AnalyticsTracker } from './lib/analytics'
import { CalendarProvider } from './context/calendar'
import { Home } from './pages/home'
import { Spitzenkandidaten } from './pages/spitzenkandidaten'
import { Wahlprogramm } from './pages/wahlprogramm'
import { Wahlsystem } from './pages/wahlsystem'
import { UnfuckBerlin } from './pages/unfuck-berlin'
import { Sticker } from './pages/sticker'
import { Confirm } from './pages/confirm'
import { Termine } from './pages/termine'
import { Kandidaten } from './pages/kandidaten'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AnalyticsTracker />
      <CalendarProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spitzenkandidaten" element={<Spitzenkandidaten />} />
          <Route path="/wahlprogramm" element={<Wahlprogramm />} />
          <Route path="/wahlsystem" element={<Wahlsystem />} />
          <Route path="/unfuck-berlin" element={<UnfuckBerlin />} />
          <Route path="/termine" element={<Termine />} />
          <Route path="/kandidaten" element={<Kandidaten />} />
          <Route path="/sticker" element={<Sticker />} />
          <Route path="/confirm" element={<Confirm />} />
          {/* Alias: the server sends confirmation links as /confirm.html?token=… */}
          <Route path="/confirm.html" element={<Confirm />} />
          {/* Unknown routes fall back to the homepage. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CalendarProvider>
    </BrowserRouter>
  </StrictMode>,
)
