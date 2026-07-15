import { ArrowRight, Play } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Countdown from "../components/Countdown";
import TermineSection from "../components/TermineSection";
import { SEITEN, KANDIDATEN } from "../data";
import { NL, CmsImg } from "../lib";

// Play-Button-Overlay für Video-Standbilder (Video folgt später).
function PlayOverlay() {
  return (
    <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <span className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 flex items-center justify-center shadow-card">
        <Play size={26} className="text-volt-purple fill-volt-purple ml-1" />
      </span>
    </span>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const s = SEITEN.startseite || {};
  const heroZeilen = s.heroZeilen || [];
  const kandidatenZeilen = s.kandidatenZeilen || [];
  const unfckZeilen = s.unfckZeilen || ["unf*ck", "berlin"];
  const fotos = KANDIDATEN.slice(0, 6);

  return (
    <main className="bg-volt-purple text-white">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="md:mx-auto md:max-w-6xl md:px-8 md:grid md:grid-cols-[5fr_7fr] md:items-start md:gap-12 md:pt-16 md:pb-10">

          {/* Foto mit Play-Button (Video-Platzhalter) */}
          <Link
            to="/spitzenduo"
            className="block relative md:order-2"
            aria-label="Zum Spitzenduo"
          >
            <img
              src={s.heroBild}
              alt="Unsere Spitzenkandidaten"
              className="w-full h-auto md:rounded-lg object-cover md:aspect-[4/3] md:object-top"
            />
            <PlayOverlay />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-volt-purple to-transparent md:hidden" />
          </Link>

          {/* Text */}
          <div className="relative z-10 -mt-40 md:mt-6 px-5 md:px-0 md:order-1 flex flex-col md:h-full">
            <h1 className="flex flex-col items-start gap-1 md:gap-2 text-[42px] md:text-5xl lg:text-6xl font-bold leading-none">
              {heroZeilen.map((z, i) => (
                <span key={i} className="hl hl-lime">{z}</span>
              ))}
            </h1>

            <p className="text-left text-sm md:text-base leading-snug mt-6 md:mt-auto md:pt-16 max-w-md">
              <NL text={s.heroText} />
            </p>

            <div className="text-left mt-7">
              <button
                onClick={() => navigate("/wahlprogramm")}
                className="inline-block bg-volt-lime text-volt-purple font-bold tracking-wide text-sm md:text-base px-7 py-3 rounded-md shadow-[4px_5px_0_#8FB000] btn-magnet uppercase"
              >
                {s.heroButton || "Kurz Programm"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="pt-12 md:pt-14 pb-4 px-5 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          {s.countdownTitel || "Berlin besser machen!"}
        </h2>
        <Countdown />
      </section>

      {/* ERSTWÄHLER */}
      <section className="px-5 pt-8 pb-14 md:pb-20 text-center max-w-md md:max-w-3xl mx-auto">
        <p className="text-sm md:text-base leading-snug">
          <NL text={s.erstwaehlerText} />
        </p>
        <Link to="/wahl-info" className="inline-flex items-center gap-2 font-bold text-sm md:text-base mt-4 hover:text-volt-lime transition">
          {s.erstwaehlerLink || "Wie wähle ich?"} <ArrowRight size={16} />
        </Link>
      </section>

      {/* TRIFF UNS! — im Design nur auf Desktop */}
      <div className="hidden md:block">
        <TermineSection title={s.kalenderTitel || "Triff uns!"} />
      </div>

      {/* UNSERE KANDIDATEN */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-24">
        <div className="md:grid md:grid-cols-[5fr_7fr] md:gap-12 md:items-center">

          {/* Headline + Text + Link */}
          <div className="flex flex-col md:h-full">
            <h2 className="flex flex-col items-center md:items-start gap-1 md:gap-2 text-4xl md:text-5xl font-bold uppercase text-center md:text-left">
              {kandidatenZeilen.map((z, i) => (
                <span key={i} className="hl hl-white">{z}</span>
              ))}
            </h2>

            <div className="hidden md:block md:mt-auto md:pb-4">
              <p className="text-sm md:text-base leading-snug max-w-sm">
                <NL text={s.kandidatenText || "Hinter jeder Kandidatur steht ein Mensch mit Ideen, Erfahrungen und dem Wunsch, Berlin voranzubringen. Hier kannst du unsere Kandidatinnen und Kandidaten kennenlernen."} />
              </p>
              <Link
                to="/kandidierende"
                className="inline-flex items-center gap-2 font-bold text-sm md:text-base mt-4 hover:text-volt-lime transition"
              >
                {s.kandidatenLink} <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Foto-Collage — Mobile: 2×3-Grid */}
          <div className="grid grid-cols-2 gap-3 mt-10 md:hidden">
            {fotos.map((k) => (
              <Link key={k.slug} to={`/kandidierende/${k.slug}`} className="relative aspect-[3/4] overflow-hidden">
                <CmsImg
                  src={k.foto}
                  alt={k.name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </Link>
            ))}
          </div>

          {/* Foto-Collage — Desktop: 3 Spalten, mittlere versetzt */}
          <div className="hidden md:grid grid-cols-3 gap-4">
            {[0, 1, 2].map((col) => (
              <div key={col} className={`flex flex-col gap-4 ${col === 1 ? "mt-12" : ""}`}>
                {fotos.slice(col * 2, col * 2 + 2).map((k) => (
                  <Link key={k.slug} to={`/kandidierende/${k.slug}`} className="relative aspect-[3/4] overflow-hidden group">
                    <CmsImg
                      src={k.foto}
                      alt={k.name}
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Mobile: Text + Link unter dem Grid */}
          <div className="md:hidden mt-8 text-center">
            <p className="text-sm leading-snug">
              <NL text={s.kandidatenText || "Hinter jeder Kandidatur steht ein Mensch mit Ideen, Erfahrungen und dem Wunsch, Berlin voranzubringen. Hier kannst du unsere Kandidatinnen und Kandidaten kennenlernen."} />
            </p>
            <Link
              to="/kandidierende"
              className="inline-flex items-center gap-2 font-bold text-sm mt-4 hover:text-volt-lime transition"
            >
              {s.kandidatenLink} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* UNF*CK BERLIN TEASER */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 pb-16 md:pb-24">
        <div className="md:grid md:grid-cols-[7fr_5fr] md:gap-12 md:items-center">

          {/* Headline (mobile oben) */}
          <h2 className="md:hidden flex flex-col items-start gap-1 text-5xl font-bold lowercase mb-8">
            {unfckZeilen.map((z, i) => (
              <span key={i} className="hl hl-lime">{z}</span>
            ))}
          </h2>

          {/* Video-Standbild */}
          <Link to="/unfck-berlin" className="block relative" aria-label="Zu unf*ck berlin">
            <CmsImg
              src={s.unfckBild}
              alt="unf*ck berlin Kampagne"
              className="w-full aspect-[4/3] object-cover bg-gray-300"
            />
            <PlayOverlay />
          </Link>

          {/* Headline + Text + Button (Desktop rechts) */}
          <div className="mt-8 md:mt-0 flex flex-col md:h-full">
            <h2 className="hidden md:flex flex-col items-start gap-2 text-5xl lg:text-6xl font-bold lowercase">
              {unfckZeilen.map((z, i) => (
                <span key={i} className="hl hl-lime">{z}</span>
              ))}
            </h2>

            <div className="md:mt-auto md:pt-16">
              <p className="text-sm md:text-base leading-snug max-w-md">
                <NL text={s.unfckText || "Hinter unf*ck Berlin steckt eine einfache Idee: Probleme verschwinden nicht, wenn man höflicher über sie spricht. Aber sie verschwinden auch nicht, wenn man nur über sie klagt.\nDeshalb ist das hier keine Protestkampagne."} />
              </p>
              <div className="mt-6">
                <Link
                  to="/unfck-berlin"
                  className="inline-block bg-volt-lime text-volt-purple font-bold tracking-wide text-sm md:text-base px-7 py-3 rounded-md shadow-[4px_5px_0_#8FB000] btn-magnet uppercase"
                >
                  {s.unfckButton || "Worum geht es?"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
