import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import './styles/global.css'
import { ScrollToTop } from './lib/scroll-to-top'
import { AnalyticsTracker } from './lib/analytics'
import { CalendarProvider } from './context/calendar'
import { Home } from './pages/home'
import { Sticker } from './pages/sticker'
import { Confirm } from './pages/confirm'
import { Kandidaten } from './pages/kandidaten'
import { KandidatDetail } from './pages/kandidat-detail'
import { NewsPage } from './pages/news'
import { PressePage } from './pages/presse'
import { RegionsPage } from './pages/regions'
import { PagePage } from './pages/page'
import { TerminePage } from './pages/termine'
import { SupportersV1 } from './pages/supporters/v1'
import { SupportersV2 } from './pages/supporters/v2'
import { SupportersV3 } from './pages/supporters/v3'

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

          <Route path="/news/unfuck-berlin-" element={<Navigate to="/news/unfuck-berlin-reveal" replace />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/*" element={<NewsPage />} />

          <Route path="/presse" element={<PressePage />} />

          <Route path="/kandidaten" element={<Navigate to="/kandidierende" replace />} />
          <Route path="/kandidierende" element={<Kandidaten />} />
          <Route path="/kandidierende/:slug" element={<KandidatDetail />} />

          <Route path="/termine/:slug" element={<TerminePage />} />

          {/* Wall of Support: drei Design-Varianten zur Abstimmung; die Nav
              verlinkt v1, v2/v3 werden manuell zum Review geteilt. */}
          <Route path="/supporters" element={<Navigate to="/supporters/v1" replace />} />
          <Route path="/supporters/v1" element={<SupportersV1 />} />
          <Route path="/supporters/v2" element={<SupportersV2 />} />
          <Route path="/supporters/v3" element={<SupportersV3 />} />

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
