import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SEITEN } from "../data";
import { NL, CmsImg } from "../lib";
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

const ERSTSTIMME_FALLBACK =
  "Mit der Erststimme wählst du eine Kandidatin oder einen Kandidaten aus deinem Wahlkreis. Diese Person vertritt deine Region im Parlament und setzt sich dort für die Interessen der Menschen vor Ort ein.\nWer die meisten Stimmen im Wahlkreis erhält, gewinnt das Direktmandat. Mit deiner Erststimme entscheidest du also, wer deine Stimme in der Politik vertreten soll.";

const ZWEITSTIMME_FALLBACK =
  "Mit der Zweitstimme entscheidest du, welche Partei wie stark im Parlament vertreten ist. Sie ist ausschlaggebend für die Sitzverteilung und bestimmt damit maßgeblich die politischen Mehrheiten.\nDu wählst also nicht eine einzelne Person, sondern die Partei, deren Ziele und Ideen dich am meisten überzeugen. Die Zweitstimme hat deshalb einen großen Einfluss darauf, welche Politik in den kommenden Jahren umgesetzt wird.";

const MIT16_FALLBACK =
  "Du bist 16 oder älter? Dann kannst du dieses Jahr zum ersten Mal wählen. Das ist mehr als nur ein Kreuz auf dem Stimmzettel – es ist deine Chance, die Zukunft deiner Stadt mitzugestalten.\nOb Mieten, Bildung, öffentlicher Nahverkehr, Klima oder Freizeitangebote – die Entscheidungen der Politik betreffen deinen Alltag. Informiere dich über die Themen und Parteien, bilde dir deine eigene Meinung und geh wählen.\nDenn Berlin verändert sich nur, wenn Menschen mitentscheiden. Vielleicht beginnt das mit deiner ersten Stimme.";

export default function WahlInfo() {
  const s = SEITEN.countdown || {};
  const heroZeilen = s.heroZeilen || ["Erste & Zweite", "Stimme:", "Vote Volt"];
  const duoBild = s.duoBild || (SEITEN.startseite || {}).heroBild;

  const isPurple = false

  return (
    <div className="min-h-full bg-volt-purple">
    <Navbar isPurple={isPurple} />
    <main className="bg-white text-volt-purple">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 pt-14 md:pt-24">
        <h1 className="flex flex-col items-start gap-1 md:gap-2 text-4xl md:text-6xl font-bold leading-none uppercase">
          {heroZeilen.map((z, i) => (
            <span key={i} className="hl hl-orange">{z}</span>
          ))}
        </h1>
      </section>

      {/* ERSTSTIMME */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 pt-12 md:pt-16">
        <h2 className="text-2xl md:text-4xl font-bold leading-tight">
          <NL text={s.erststimmeTitel || "Die Erststimme –\nDeine Wahl für eine Person"} />
        </h2>
        <p className="mt-6 text-sm md:text-base leading-relaxed max-w-4xl">
          <NL text={s.erststimmeText || ERSTSTIMME_FALLBACK} />
        </p>

        {/* SPITZENDUO-BILD */}
        {/*
        <div className="relative mt-10 md:mt-14 md:mx-16">
          <CmsImg
            src={duoBild}
            alt="Spitzenduo Volt Berlin"
            className="w-full aspect-[4/5] md:aspect-[16/8] object-cover object-top"
          />
          <Link
            to="/spitzenduo"
            className="absolute left-4 bottom-4 md:left-8 md:bottom-6 inline-flex items-center gap-2 font-bold text-sm md:text-base text-white drop-shadow hover:text-volt-lime transition"
          >
            {s.duoLinkText || "Spitzenduo Volt kennenlernen"} <ArrowRight size={18} />
          </Link>
        </div>
        */}
      </section>

      {/* ZWEITSTIMME */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 pt-14 md:pt-20">
        <h2 className="text-2xl md:text-4xl font-bold leading-tight">
          <NL text={s.zweitstimmeTitel || "Die Zweitstimme –\nDeine Wahl für Volt"} />
        </h2>
        <p className="mt-6 text-sm md:text-base leading-relaxed max-w-4xl">
          <NL text={s.zweitstimmeText || ZWEITSTIMME_FALLBACK} />
        </p>
      </section>

      {/* WÄHLEN MIT 16 */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 pt-14 md:pt-24 pb-16 md:pb-24">
        <h2 className="text-3xl md:text-5xl font-bold uppercase">
          <span className="hl hl-orange">{s.waehlenMit16Titel || "Wählen mit 16?"}</span>
        </h2>
        <p className="mt-8 md:mt-10 text-sm md:text-base font-bold">
          {s.gehoertDirTitel || "Berlin gehört auch dir."}
        </p>
        <p className="mt-4 text-sm md:text-base leading-relaxed max-w-4xl">
          <NL text={s.waehlenMit16Text || MIT16_FALLBACK} />
        </p>

        <Link
          to="/wahlprogramm"
          className="inline-block mt-10 md:mt-12 bg-volt-lime text-volt-purple font-bold tracking-wide text-sm md:text-base px-6 py-3 rounded-md shadow-[4px_5px_0_#8FB000] btn-magnet uppercase"
        >
          {s.programmButton || "Gesamewahlprogramm lesen"}
        </Link>
      </section>
    </main>
    <Footer />
    </div>
  );
}
