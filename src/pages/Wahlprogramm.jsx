import TermineSection from "../components/TermineSection";
import { SEITEN } from "../data";
import { NL } from "../lib";

// Fallback-Inhalte aus dem Design — werden von Sanity (seiteWahlprogramm) überschrieben.
const KAPITEL_FALLBACK = [
  {
    titel: "Berlin funktioniert",
    tags: ["Verwaltung", "Digitalisierung", "Beteiligung"],
    text: "…ist die Grundlage von allem: eine digitale Verwaltung, die an Ergebnissen gemessen wird. Mit dem Once-Only-Prinzip geben Berliner:innen ihre Daten nur einmal an, mit der Genehmigungsfiktion gelten vollständige Anträge nach Fristablauf automatisch als genehmigt.",
  },
  {
    titel: "Berlin lebt",
    tags: ["Wohnen", "Mobilität", "lebenswerte Kieze"],
    text: "…heißt bezahlbares Wohnen: Flächen für 300.000 neue Wohnungen, schnellere Genehmigungen und Housing First als wirksames Mittel gegen Obdachlosigkeit. Dazu ein verlässlicher ÖPNV bis in die Außenbezirke, sichere Rad- und Gehwege und saubere Kieze.",
  },
  {
    titel: "Berlin lernt",
    tags: ["Kita", "Schule", "Beruf"],
    text: "… setzt früh an: mit einer verbindlichen Vorschulphase ab fünf Jahren, Sprachtests mit vier, dem neuen Pflichtfach Lebenskompetenz und einer Ausbildungsplatzgarantie, damit die Herkunft nicht über Chancen entscheidet.",
  },
  {
    titel: "Berlin schafft",
    tags: ["Innovation", "Wirtschaftskraft", "Arbeitsplätze"],
    text: "…macht die Stadt zur Innovationshauptstadt: mit mehr Ausgründungen aus den Hochschulen, Berlin als Erstkundin für neue Technologien, schneller Fachkräfteeinwanderung und einer gemeinsamen Wirtschaftsregion mit Brandenburg.",
  },
  {
    titel: "Berlin schützt",
    tags: ["Sicherheit", "Gesundheit", "Zusammenhalt"],
    text: "…verbindet wirksame Prävention, entschlossene Strafverfolgung und verlässlichen Opferschutz mit wohnortnahen Gesundheitszentren im Kiez und einer Stadt, die krisenfest wird.",
  },
  {
    titel: "Berlin gewinnt",
    tags: ["Zukunft", "Resilienz", "Natur"],
    text: "…begreift Klimaschutz als Investition statt Verzichtsagenda: mit einer Solaroffensive, klimaneutraler Fernwärme durch Großwärmepumpen und der Schwammstadt gegen Hitze und Starkregen.",
  },
  {
    titel: "Berlin verbindet",
    tags: ["Menschen", "Europa", "die Welt"],
    text: "…macht Europa im Alltag erlebbar: mit Integration als Standortvorteil, Englisch als zweiter Servicesprache der Verwaltung und einer Kulturpolitik, die die Clubs und freie Szene verlässlich absichert.",
  },
];

const INTRO_FALLBACK =
  "Die Folgen spüren Berliner*innen täglich: Wohnungen, die unbezahlbar sind. Schulen, die marode sind. Eine Verwaltung, die auf einfache Anliegen monatelang nicht reagiert. Dazu kommt das Gefühl, dass es nicht besser wird, sondern schlechter.\nMit unserem Wahlprogramm legen wir einen konkreten Plan vor, wie diese Stadt wieder funktioniert: pragmatisch, evidenzbasiert und europäisch.\nIn sieben Kapiteln zeigen wir, wie Berlin seine größten Probleme löst, von der Verwaltung über bezahlbares Wohnen bis zur Bildung. Denn Berlin braucht Politik, die die Zukunft gestaltet.";

const EUROPA_FALLBACK =
  "Volt ist die erste echte europäische Partei: in ganz Europa aktiv, mit einem gemeinsamen politischen Fundament. Genau das nutzen wir für Berlin. Wir experimentieren nicht auf Kosten der Berliner:innen, sondern holen Lösungen in die Stadt, die sich in Europa bereits bewährt haben. 98 Best-Practice-Beispiele aus Städten wie Helsinki, Wien, Amsterdam und Kopenhagen belegen, dass unsere Vorschläge keine Utopien sind, sondern erprobte Realität. Dabei gilt: Evidenz entscheidet, nicht Ideologie. Wir messen die Wirkung unserer Maßnahmen und passen an, was nicht die gewünschten Ergebnisse bringt.";


export default function Wahlprogramm() {
  const s = SEITEN.wahlprogramm || {};
  const kapitel = s.kapitel && s.kapitel.length ? s.kapitel : KAPITEL_FALLBACK;
  const europaZeilen = s.europaZeilen || ["Europäisch denken,", "lokal liefern"];
  const buttonLabel = s.programmButton || "Gesamtes Wahlprogramm zur AGH-Wahl 2026";
  const buttonUrl = s.programmUrl || "#";
  const linkeSpalte = kapitel.slice(0, 4);
  const rechteSpalte = kapitel.slice(4);

  return (
    <main className="bg-white text-volt-purple">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 pt-14 md:pt-24">
        <h1 className="text-4xl md:text-6xl font-bold uppercase">
          <span className="hl hl-green !text-volt-purple">{s.titel || "Wahlprogramm"}</span>
        </h1>

        <div className="mt-10 max-w-2xl">
          <p className="text-sm md:text-base font-bold">
            {s.introBold || "Berlin ist pulsierend, aber sein Herzschlag erreicht die Politik nicht."}
          </p>
          <p className="mt-4 text-sm md:text-base leading-relaxed">
            <NL text={s.introText || INTRO_FALLBACK} />
          </p>
        </div>

        <a
          href={buttonUrl}
          target={buttonUrl.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="inline-block mt-10 bg-volt-lime text-volt-purple font-bold tracking-wide text-sm md:text-base px-6 py-3 rounded-md shadow-[4px_5px_0_#8FB000] btn-magnet"
        >
          {buttonLabel}
        </a>
      </section>

      {/* KAPITEL */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 pt-14 md:pt-20">
        <div className="grid md:grid-cols-2 gap-y-10 md:gap-x-16">
          <div className="space-y-10">
            {linkeSpalte.map((k) => <Kapitel key={k.titel} k={k} />)}
          </div>
          <div className="space-y-10">
            {rechteSpalte.map((k) => <Kapitel key={k.titel} k={k} />)}
          </div>
        </div>
      </section>

      {/* EUROPÄISCH DENKEN */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-16 md:pb-24">
        <h2 className="flex flex-col items-start gap-1 text-3xl md:text-5xl font-bold">
          {europaZeilen.map((z, i) => (
            <span key={i} className="hl hl-orange">{z}</span>
          ))}
        </h2>
        <p className="mt-10 text-sm md:text-base leading-relaxed max-w-4xl">
          <NL text={s.europaText || EUROPA_FALLBACK} />
        </p>

        <a
          href={buttonUrl}
          target={buttonUrl.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="inline-block mt-10 bg-volt-lime text-volt-purple font-bold tracking-wide text-sm md:text-base px-6 py-3 rounded-md shadow-[4px_5px_0_#8FB000] btn-magnet uppercase"
        >
          {buttonLabel}
        </a>
      </section>

      {/* KALENDER */}
      <TermineSection title={s.kalenderTitel || "Kalender"} />
    </main>
  );
}
