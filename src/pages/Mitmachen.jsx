import { useState } from "react";
import { TERMINE, SEITEN } from "../data";
import TerminCard from "../components/TerminCard";
import { NL, CmsImg } from "../lib";
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Link } from "react-router-dom";

const FILTER = [
  { id: "Alle", cls: "bg-white text-volt-purple" },
  { id: "Veranstaltung", cls: "bg-volt-blue text-volt-purple" },
  { id: "Podium", cls: "bg-volt-orange text-volt-purple" },
  { id: "Bezirkstreffen", cls: "bg-volt-pink text-white" },
];

export default function Mitmachen() {
  const s = SEITEN.mitmachen || {};
  const heroZeilen = s.heroZeilen || [];
  const carousel = s.carouselBilder && s.carouselBilder.length ? s.carouselBilder : [null, null, null];

  const [filter, setFilter] = useState("Alle");
  const [slide, setSlide] = useState(0);

  const sichtbar = filter === "Alle" ? TERMINE : TERMINE.filter((t) => t.type === filter);

  const isPurple = true

  return (
    <div className="min-h-full bg-volt-purple">
        <Navbar isPurple={isPurple} />
    <main className="bg-volt-purple text-white">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 pt-14 md:pt-24">
        <h1 className="flex flex-col items-start gap-1 md:gap-2 text-4xl md:text-6xl font-bold leading-none uppercase">
          {heroZeilen.map((z, i) => (
            <span key={i} className="hl hl-blue">{z}</span>
          ))}
        </h1>

        <p className="mt-8 text-sm md:text-base leading-relaxed opacity-95 max-w-xl">
          <NL text={s.heroText} />
        </p>

        {/* FILTER */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center gap-3">
          <div>
            <button
              onClick={() => setFilter("Alle")}
              className={`font-bold text-sm md:text-base px-8 py-2.5 ${FILTER[0].cls} ${
                filter === "Alle" ? "ring-2 ring-volt-lime" : ""
              } btn-magnet`}
            >
              Alle
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {FILTER.slice(1).map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(filter === f.id ? "Alle" : f.id)}
                className={`font-bold text-sm md:text-base px-5 py-2.5 -skew-y-1 ${f.cls} ${
                  filter === f.id ? "ring-2 ring-volt-lime" : ""
                } btn-magnet`}
              >
                {f.id}
              </button>
            ))}
          </div>
        </div>

        {/* TERMINE LISTE */}
        <div className="mt-10 md:mt-16 space-y-6 md:grid md:grid-cols-3 md:gap-6 md:space-y-0">
          {sichtbar.map((t, i) => (
            <TerminCard key={i} termin={t} />
          ))}
        </div>

        {/* EVENT EINLADEN */}
        <p className="mt-10 md:mt-14 text-sm md:text-base leading-relaxed max-w-2xl pb-14">
          Du vermisst hier ein Event, oder würdest uns gerne auf einem Panel begrüßen?<br />
          <strong>Dann lad' uns ein!</strong> Schreib dazu eine Mail an <Link className="underline" to="mailto:presse@voltberlin.org">presse@voltberlin.org</Link>.
        </p>
      </section>

      {/* BIS NÄCHSTES MAL — GALERIE */}
      {/*
      <section className="max-w-6xl mx-auto px-5 md:px-8 pb-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10">
          {s.carouselTitel || "bis nächstes mal…"}
        </h2>

        <div className="md:hidden">
          <CmsImg
            src={carousel[slide % carousel.length]}
            alt="Volt Berlin"
            className="w-full aspect-[3/4] object-cover bg-gray-300"
          />
        </div>
        <div className="hidden md:grid grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <CmsImg
              key={i}
              src={carousel[(slide + i) % carousel.length]}
              alt="Volt Berlin"
              className="w-full aspect-[4/3] object-cover bg-gray-300"
            />
          ))}
        </div>

        <div className="flex justify-center items-center gap-3 mt-5 text-white/70">
          <button
            aria-label="Zurück"
            onClick={() => setSlide((slide - 1 + carousel.length) % carousel.length)}
            className="text-2xl leading-none hover:text-white transition"
          >
            ‹
          </button>
          {carousel.map((_, i) => (
            <button
              key={i}
              aria-label={`Foto ${i + 1}`}
              onClick={() => setSlide(i)}
              className={`w-2 h-2 rounded-full transition ${i === slide ? "bg-white" : "bg-white/30"}`}
            />
          ))}
          <button
            aria-label="Weiter"
            onClick={() => setSlide((slide + 1) % carousel.length)}
            className="text-2xl leading-none hover:text-white transition"
          >
            ›
          </button>
        </div>

        <div className="hidden md:block mt-8">
          <a
            href="#"
            className="inline-block bg-volt-lime text-volt-purple font-bold tracking-wide text-sm md:text-base px-7 py-3 rounded-md shadow-[4px_5px_0_#8FB000] btn-magnet uppercase"
          >
            {s.carouselButton || "Mehr erfahren"}
          </a>
        </div>
      </section>
      */}

    </main>
    <Footer />
        </div>
  );
}
