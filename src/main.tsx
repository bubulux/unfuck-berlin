import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './styles/global.css'
import { ScrollToTop } from './lib/scroll-to-top'
import { Home } from './pages/home'
import { Spitzenkandidaten } from './pages/spitzenkandidaten'
import { Wahlprogramm } from './pages/wahlprogramm'
import { Wahlsystem } from './pages/wahlsystem'
import { UnfuckBerlin } from './pages/unfuck-berlin'
import { Sticker } from './pages/sticker'
import { Confirm } from './pages/confirm'
import { Termine } from './pages/termine'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spitzenkandidaten" element={<Spitzenkandidaten />} />
        <Route path="/wahlprogramm" element={<Wahlprogramm />} />
        <Route path="/wahlsystem" element={<Wahlsystem />} />
        <Route path="/unfuck-berlin" element={<UnfuckBerlin />} />
        <Route path="/termine" element={<Termine />} />
        <Route path="/sticker" element={<Sticker />} />
        <Route path="/confirm" element={<Confirm />} />
        {/* Alias: the server sends confirmation links as /confirm.html?token=… */}
        <Route path="/confirm.html" element={<Confirm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
