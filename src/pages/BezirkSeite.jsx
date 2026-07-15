import { useParams, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BeforeAfter from "../components/BeforeAfter";
import FotoPlatzhalter from "../components/FotoPlatzhalter";
import { BEZIRKE, BEZIRK_THEMEN, KANDIDATEN, SEITEN } from "../data";
import { NL } from "../lib";

export default function BezirkSeite() {
  const { id } = useParams();
  const bezirk = BEZIRKE.find((b) => b.id === id);

  if (!bezirk) {
    return (
      <main className="bg-volt-purple text-white min-h-[60vh] flex flex-col items-center justify-center gap-4 px-5">
        <div className="text-2xl font-bold">Bezirk nicht gefunden</div>
        <Link to="/im-bezirk" className="bg-volt-lime text-volt-purple font-bold px-5 py-2.5 btn-magnet">
          Zur Bezirks-Karte
        </Link>
      </main>
    );
  }

  const b = SEITEN.bezirk || {};
  const themen = BEZIRK_THEMEN[bezirk.id] || BEZIRK_THEMEN.tempelhof;
  const inBezirk = KANDIDATEN.filter((k) => k.bezirk === bezirk.name);
  const kandidaten = inBezirk.length > 0 ? inBezirk : KANDIDATEN.slice(0, 4);
  const [zeile1, zeile2] = bezirk.name.includes("-")
    ? [`${bezirk.name.split("-")[0]}-`, bezirk.name.split("-").slice(1).join("-")]
    : [bezirk.name, null];

  return (
    <main className="bg-white text-volt-purple">

      {/* HERO: Foto rechts, Titel überlappt */}
      <section className="bg-volt-purple relative pb-10">
        <div className="max-w-3xl mx-auto relative">
          <FotoPlatzhalter label={`Foto ${bezirk.name}`} className="ml-[35%] w-[65%] aspect-[4/3]" />
          <h1 className="absolute left-5 md:left-8 top-8 flex flex-col items-start gap-1 md:gap-2 text-3xl md:text-6xl font-bold leading-none">
            <span className="hl hl-lime">{zeile1}</span>
            {zeile2 && <span className="hl hl-lime">{zeile2}</span>}
          </h1>
        </div>
      </section>

      {/* WAS IST HIER ZU TUN */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-8">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">{b.wasZuTunTitel || "Was ist hier zu tun?"}</h2>

        <div className="space-y-8">
          {themen.map((t, i) => (
            <div key={i}>
              <span className="inline-block bg-volt-purple text-white text-xs md:text-sm font-bold px-4 py-1.5">
                {t.tag}
              </span>
              <ul className="mt-3 list-disc list-inside font-bold text-sm md:text-base">
                <li>{t.title}</li>
              </ul>
              <p className="mt-2 text-sm md:text-base leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EUERE SORGEN, UNSERE LÖSUNGEN */}
      <section className="pt-8 pb-14">
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-8">{b.sorgenTitel || "Euere Sorgen, unsere Lösungen"}</h2>
          <p className="text-sm md:text-base text-volt-purple/80 mb-8 max-w-md mx-auto">
            <NL text={b.sorgenText} />
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <BeforeAfter />
        </div>
      </section>

      {/* KANDIDIERENDE & WAHLKREISE */}
      <section className="max-w-3xl mx-auto px-5 md:px-8 pb-16">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">{b.kandidierendeTitel || "Kandidierende & Wahlkreise"}</h2>

        <div className="space-y-6">
          {kandidaten.map((k) => (
            <Link key={k.slug} to={`/kandidierende/${k.slug}`} className="flex items-center gap-4 group">
              <img src={k.foto} alt={k.name} className="w-16 h-16 object-cover object-top" />
              <div>
                <div className="font-bold text-sm md:text-base group-hover:underline">{k.name}</div>
                <div className="text-xs md:text-sm text-volt-purple/70 font-medium">{k.wahlkreis}</div>
                <div className="text-xs md:text-sm">{k.themen}</div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          to="/kandidierende"
          className="mt-10 flex justify-end items-center gap-2 font-bold text-sm md:text-base hover:opacity-80 transition"
        >
          Alle Kandidierenden sehen <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
}
