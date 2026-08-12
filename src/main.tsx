import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import './styles/global.css'
import { ScrollToTop } from './lib/scroll-to-top'
import { AnalyticsTracker } from './lib/analytics'
import { CalendarProvider } from './context/calendar'
import { Home } from './pages/home'
import { Wahlprogramm } from './pages/wahlprogramm'
import { Sticker } from './pages/sticker'
import { Confirm } from './pages/confirm'
import { Termine } from './pages/termine'
import { Kandidaten } from './pages/kandidaten'
import { KandidatDetail } from './pages/kandidat-detail'
import { NewsPage } from './pages/news'
import { RegionsPage } from './pages/regions'
import { PagePage } from './pages/page'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AnalyticsTracker />
      <CalendarProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/bezirke" element={<RegionsPage />} />
          <Route path="/bezirke/*" element={<RegionsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/*" element={<NewsPage />} />
          {/* <Route path="/wahlprogramm" element={<Wahlprogramm />} /> */}
          <Route path="/termine" element={<Termine />} />
          <Route path="/kandidierende" element={<Kandidaten />} />
          <Route path="/kandidierende/:slug" element={<KandidatDetail />} />
          {/* Alter Pfad: /kandidaten leitet dauerhaft auf die gegenderte Route um. */}
          <Route path="/kandidaten" element={<Navigate to="/kandidierende" replace />} />
          <Route path="/sticker" element={<Sticker />} />
          <Route path="/confirm" element={<Confirm />} />
          {/* Alias: the server sends confirmation links as /confirm.html?token=… */}
          <Route path="/confirm.html" element={<Confirm />} />

          {/* Unknown routes fall back to the homepage. */}
          <Route path="/*" element={<PagePage />} />
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </CalendarProvider>
    </BrowserRouter>
  </StrictMode>,
)
