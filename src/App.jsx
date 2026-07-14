import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import ImBezirk from "./pages/ImBezirk";
import Kandidierende from "./pages/Kandidierende";
import KandidatDetail from "./pages/KandidatDetail";
import Mitmachen from "./pages/Mitmachen";
import UeberVolt from "./pages/UeberVolt";
import Wahlprogramm from "./pages/Wahlprogramm";
import WahlInfo from "./pages/WahlInfo";
import VoltOMat from "./pages/VoltOMat";
import Spitzenduo from "./pages/Spitzenduo";
import UnfuckBerlin from "./pages/UnfuckBerlin";
import BezirkSeite from "./pages/BezirkSeite";

/*
const CORRECT_HASH = "eb94aeca561a1578b7e724867671ef542d86fdb9fcf36c76d15367c36b13349a";
const STORAGE_KEY = "volt_unlocked";

/*
async function hashInput(input) {
  const encoded = new TextEncoder().encode(input);
  const buffer = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function PasswordGate({ onUnlock }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const hash = await hashInput(input);
    if (hash === CORRECT_HASH) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      onUnlock();
    } else {
      setError(true);
      setInput("");
    }
  }

  return (
    <div style={{
      minHeight: "100dvh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#502379",
      fontFamily: "sans-serif",
    }}>
      <div style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "1.5rem",
        padding: "2.5rem 2rem",
        width: "100%",
        maxWidth: "360px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: "0.25rem" }}>
          Volt Berlin
        </div>
        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", marginBottom: "2rem" }}>
          Passwort erforderlich
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false); }}
            placeholder="Passwort eingeben"
            autoFocus
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "0.75rem",
              border: error ? "1.5px solid #f87171" : "1.5px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.1)",
              color: "#fff",
              fontSize: "1rem",
              outline: "none",
              boxSizing: "border-box",
              marginBottom: "0.75rem",
            }}
          />
          {error && (
            <div style={{ color: "#f87171", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
              Falsches Passwort. Bitte erneut versuchen.
            </div>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.75rem",
              border: "none",
              background: "#fff",
              color: "#502379",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Zugang erhalten
          </button>
        </form>
      </div>
    </div>
  );
}
*/

export default function App() {
  // const [unlocked, setUnlocked] = useState(
  //   () => sessionStorage.getItem(STORAGE_KEY) === "1"
  // );

  // if (!unlocked) {
  //   return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  // }

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <div className="min-h-full bg-volt-purple">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wahlprogramm" element={<Wahlprogramm />} />
          <Route path="/im-bezirk" element={<ImBezirk />} />
          <Route path="/bezirk/:id" element={<BezirkSeite />} />
          <Route path="/kandidierende" element={<Kandidierende />} />
          <Route path="/kandidierende/:slug" element={<KandidatDetail />} />
          <Route path="/spitzenduo" element={<Spitzenduo />} />
          <Route path="/mitmachen" element={<Mitmachen />} />
          <Route path="/volt-o-mat" element={<VoltOMat />} />
          <Route path="/wahl-info" element={<WahlInfo />} />
          <Route path="/unfck-berlin" element={<UnfuckBerlin />} />
          <Route path="/ueber-volt" element={<UeberVolt />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
