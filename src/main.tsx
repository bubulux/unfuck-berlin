import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './styles/global.css'
import { Home } from './pages/home'
import { Spitzenkandidaten } from './pages/spitzenkandidaten'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spitzenkandidaten" element={<Spitzenkandidaten />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
