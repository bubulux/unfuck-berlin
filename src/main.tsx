import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './styles/global.css'
import { Home } from './pages/home'
import { Spitzenkandidaten } from './pages/spitzenkandidaten'
import { Wahlprogramm } from './pages/wahlprogramm'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spitzenkandidaten" element={<Spitzenkandidaten />} />
        <Route path="/wahlprogramm" element={<Wahlprogramm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
