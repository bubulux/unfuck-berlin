import { useState } from "react";
import { ArrowRight, X as XIcon } from "lucide-react";
import { THEMEN, SEITEN } from "../data";
import BerlinMap from "../components/BerlinMap";
import BezirkSheet from "../components/BezirkSheet";
import TermineSection from "../components/TermineSection";
import { NL } from "../lib";

// Mock data mapping themes to districts that should highlight
const THEME_DISTRICTS = {
  bildung: ["neukoelln", "treptow"],
  wohnung: ["mitte", "friedrichshain", "lichtenberg"],
  muell: ["spandau", "reinickendorf", "pankow"],
  gruen: ["steglitz", "charlottenburg", "marzahn"],
  digital: ["mitte", "tempelhof"],
  kultur: ["friedrichshain", "neukoelln", "mitte"],
  sport: ["tempelhof", "spandau", "treptow"],
  sozial: ["marzahn", "neukoelln", "lichtenberg"],
};

export default function ImBezirk() {
  const s = SEITEN.imBezirk || {};
  const heroZeilen = s.heroZeilen || [];
  const werteWorte = s.werteWorte || [];

  const [theme, setTheme] = useState("alle");
  const [bezirk, setBezirk] = useState(null);

  const highlightedIds = theme === "alle" ? [] : (THEME_DISTRICTS[theme] || []);

  return (
    <main className="bg-volt-purple text-white">

      {/* HERO: Text + Chips */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-14 md:pt-32 pb-6 md:pb-10">
        <div className="md:grid md:grid-cols-2 md:gap-10 md:items-start">
          <div>
            <h1 className="text-[34px] md:text-6xl font-bold leading-[1.1] mb-4 flex flex-col items-start gap-1 md:gap-2">
              {heroZeilen.map((z, i) => (
                <span key={i} className="hl hl-lime whitespace-nowrap">{z}</span>
              ))}
            </h1>
            <p className="text-base mb-6 opacity-90 text-left">
              <NL text={s.heroText} />
            </p>
            <div className="flex flex-wrap gap-x-1 gap-y-0 justify-start">
              {THEMEN.map((t) => (
                <button
                  key={t.id}
                  data-active={theme === t.id}
                  onClick={() => setTheme(t.id)}
                  className="chip"
                >
                  {theme === t.id
                    ? (
                      <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <XIcon size={16} strokeWidth={3} className="text-volt-darkest" />
                      </span>
                    )
                    : <span className="chip-dot" />}
                  {t.label}
                </button>
              ))}
            </div>
            <p className="hidden md:block text-xs opacity-50 mt-6">
              Klicke auf deinen Bezirk für Details
            </p>
          </div>

          <div className="hidden md:block">
            <BerlinMap onSelect={setBezirk} selectedId={bezirk?.id ?? null} highlightedIds={highlightedIds} />
          </div>
        </div>
      </section>

      {/* Map on mobile */}
      <div className="md:hidden mb-10">
        <p className="text-xs opacity-50 text-center mb-2 px-5">
          Tippe auf deinen Bezirk für Details
        </p>
        <BerlinMap onSelect={setBezirk} selectedId={bezirk?.id ?? null} highlightedIds={highlightedIds} />
      </div>

      {/* WERTE */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 pb-14 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-1 md:space-y-1">
          {werteWorte.map((w) => (
            <div key={w} className="text-4xl md:text-6xl font-bold">
              <span className="hl hl-blue">{w}</span>
            </div>
          ))}
        </div>
        <p className="text-base md:text-lg leading-relaxed opacity-95">
          <NL text={s.werteText} />
        </p>
      </section>

      {/* WAHLKAMPF KALENDER */}
      <TermineSection title={s.kalenderTitel || "Wahlkampf Kalender"} />

      {/* Vote Volt */}
      <section className="bg-volt-darkest relative overflow-hidden">
        <div className="max-w-7xl mx-auto md:grid md:grid-cols-2 md:items-center">

          <div className="absolute md:relative inset-0 md:inset-auto flex items-end md:items-center z-10 pointer-events-none md:pointer-events-auto">
            <div className="w-full px-5 md:px-8 pb-10 md:pb-0 pt-10 pointer-events-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4 flex flex-col items-start gap-1 md:gap-2">
                <span className="hl hl-lime">{s.voteTitel}</span>
              </h2>
              <p className="text-volt-lime md:text-white text-sm md:text-lg mt-3 md:mt-6 mb-6 max-w-sm md:max-w-md">
                <NL text={s.voteText} />
              </p>
              <a href="#" className="inline-flex items-center gap-1 font-bold text-sm text-volt-lime md:bg-volt-lime md:text-volt-purple md:px-6 md:py-3 btn-magnet transition">
                {s.voteButton} <ArrowRight size={16} className="ml-1" />
              </a>
            </div>
          </div>

          <div className="relative w-full h-[70vh] min-h-[500px] md:h-[600px] lg:h-[750px]">
            <img
              src={s.voteBild}
              className="w-full h-full object-cover object-[center_20%]"
              alt="Spitzenduo"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-volt-darkest via-volt-darkest/40 to-transparent md:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-volt-darkest via-transparent to-transparent hidden md:block" />
          </div>

        </div>
      </section>

      <BezirkSheet bezirk={bezirk} onClose={() => setBezirk(null)} />
    </main>
  );
}
