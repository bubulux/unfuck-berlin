import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './styles/global.css'
import { ScrollToTop } from './lib/scroll-to-top'
import { Home } from './pages/home'
import { Spitzenkandidaten } from './pages/spitzenkandidaten'
import { Wahlprogramm } from './pages/wahlprogramm'
import { Wahlsystem } from './pages/wahlsystem'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spitzenkandidaten" element={<Spitzenkandidaten />} />
        <Route path="/wahlprogramm" element={<Wahlprogramm />} />
        <Route path="/wahlsystem" element={<Wahlsystem />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
