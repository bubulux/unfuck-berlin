import { Download, Users, Home as HomeIcon, Leaf, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

const PROGRAMM = [
  {
    icon: HomeIcon,
    title: "Bezahlbares Wohnen",
    points: [
      "Genossenschaftliches Bauen stärken & Vorkaufsrecht konsequent nutzen",
      "Milieuschutzgebiete ausweiten & Mietendeckel auf EU-Ebene voranbringen",
      "Leerstand bekämpfen, Umwandlungsverbot & Zweckentfremdungsgesetz verschärfen",
      "Vorbild: Wiener Modell sozialer Wohnungsbau",
    ],
  },
  {
    icon: Leaf,
    title: "Klimaschutz & Energie",
    points: [
      "Berlin klimaneutral bis 2035 — verbindlicher Klimaplan",
      "Solarpflicht für alle Neubauten & öffentliche Gebäude",
      "Grüne Infrastruktur: 100.000 neue Bäume & Dachbegrünung",
      "Kreislaufwirtschaft & Zero-Waste-Strategie",
    ],
  },
  {
    icon: Cpu,
    title: "Digitalisierung & Verwaltung",
    points: [
      "Alle Behördengänge digital bis 2028",
      "Open Data als Standard — transparente Verwaltung",
      "Startup-freundliches Berlin: One-Stop-Shop für Gründungen",
      "Verbot: Endlos digitale Verwaltung",
    ],
  },
];

export default function Wahlprogramm() {
  return (
    <main className="bg-volt-purple text-white">
      <section className="max-w-7xl mx-auto px-5 md:px-8 pt-10 md:pt-20 pb-10 md:pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-[34px] md:text-7xl font-bold leading-[1.05]">
            <span className="hl hl-orange">Unser Programm</span>
            <span className="hl hl-orange">für Berlin</span>
          </h1>
          <p className="mt-6 text-base md:text-lg opacity-90">
            Konkrete Lösungen für die Herausforderungen unserer Stadt. Pragmatisch, progressiv und europäisch.
          </p>
          <Link to="https://voltdeutschland.org/berlin/menschen/kandidierende-agh-liste-2026" className="mt-5 inline-flex items-center gap-2 bg-volt-lime text-volt-purple font-bold px-4 py-2.5 btn-magnet">
            <Users size={14} /> Zu unseren Kandidierenden
          </Link>
        </div>
        <div className="flex flex-col gap-3 md:max-w-md md:ml-auto w-full">
          <a href="#" className="bg-white text-volt-purple font-bold px-4 py-3 inline-flex items-center justify-center gap-2 btn-magnet">
            <Download size={16} /> Download PDF
          </a>
          <a href="#" className="bg-volt-dark border border-white/30 text-white font-bold px-4 py-3 inline-flex items-center justify-center gap-2 btn-magnet">
            <Download size={16} /> Programm in leichter Sprache
          </a>
        </div>
      </section>

      <section className="bg-white text-volt-purple py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-3 gap-4 md:gap-6">
          {PROGRAMM.map((p, i) => (
            <div key={i} className="bg-white border border-volt-purple/15 rounded p-5 md:p-6 shadow-card">
              <p.icon size={28} className="mb-3" />
              <h3 className="font-bold text-lg md:text-xl mb-3">{p.title}</h3>
              <ul className="list-disc list-inside text-sm space-y-1.5 text-volt-purple/85">
                {p.points.map((pt, j) => <li key={j}>{pt}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-volt-dark text-white py-12 md:py-20 text-center">
        <div className="max-w-2xl mx-auto px-5 md:px-8">
          <h2 className="text-2xl md:text-4xl font-bold mb-3">Noch Fragen?</h2>
          <p className="text-base mb-6 opacity-90">Wir helfen dir gerne weiter. Kontaktiere uns oder komme zu einer unserer Veranstaltungen.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/kalender" className="bg-volt-lime text-volt-purple font-bold px-5 py-3 btn-magnet">Termin-Kalender</Link>
            <a href="#" className="border border-white/40 font-bold px-5 py-3 btn-magnet">Kontakt aufnehmen</a>
          </div>
        </div>
      </section>
    </main>
  );
}
