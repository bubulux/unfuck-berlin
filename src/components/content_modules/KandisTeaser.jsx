import { Link } from "react-router-dom";
import { NL, CmsImg } from "../../lib";
import { KANDIDATEN } from "../../data";
import { ArrowRight } from "lucide-react";

export function KandisTeaser({ obj }) {
  const fotos = KANDIDATEN.slice(0, 6);

  return (
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-24 mb-16">
        <div className="md:grid md:grid-cols-[5fr_7fr] md:gap-12 md:items-center">

          {/* Headline + Text + Link */}
          <div className="flex flex-col md:h-full">
            <h2 className="flex flex-col items-center md:items-start gap-1 md:gap-2 text-4xl md:text-5xl font-bold uppercase text-center md:text-left">
              {obj.kandidatenZeilen.map((z, i) => (
                <span key={i} className="hl hl-white">{z}</span>
              ))}
            </h2>

            <div className="hidden md:block md:mt-auto md:pb-4">
              <p className="text-sm md:text-base leading-snug max-w-sm">
                <NL text={ obj.kandidatenText || "Hinter jeder Kandidatur steht ein Mensch mit Ideen, Erfahrungen und dem Wunsch, Berlin voranzubringen. Hier kannst du unsere Kandidatinnen und Kandidaten kennenlernen."} />
              </p>
              <Link
                to="https://voltdeutschland.org/berlin/menschen/kandidierende-agh-liste-2026"
                className="inline-flex items-center gap-2 font-bold text-sm md:text-base mt-4 hover:text-volt-lime transition"
              >
                { obj.kandidatenLink} <ArrowRight size={18} />
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
              <NL text={ obj.kandidatenText || "Hinter jeder Kandidatur steht ein Mensch mit Ideen, Erfahrungen und dem Wunsch, Berlin voranzubringen. Hier kannst du unsere Kandidatinnen und Kandidaten kennenlernen."} />
            </p>
            <Link
              to="https://voltdeutschland.org/berlin/menschen/kandidierende-agh-liste-2026"
              className="inline-flex items-center gap-2 font-bold text-sm mt-4 hover:text-volt-lime transition"
            >
              { obj.kandidatenLink} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
  );
}
