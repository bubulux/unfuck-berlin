import { useState } from "react";
import { Link } from "react-router-dom";
import TermineSection from "../components/TermineSection";
import { KANDIDATEN, SEITEN } from "../data";
import { NL, CmsImg } from "../lib";
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export default function Kandidierende() {
  const s = SEITEN.alleKandis || {};
  const titelZeilen = s.titelZeilen && s.titelZeilen.length
    ? s.titelZeilen
    : ["Gemeinsam für", "ein besseres Berlin"];
  const sichtbar = KANDIDATEN

  const isPurple = false

  return (
    <div className="min-h-full bg-volt-purple">
    <Navbar isPurple={isPurple} />
    <main className="bg-white text-volt-purple">

      <section className="max-w-6xl mx-auto px-5 md:px-8 pt-12 md:pt-24 pb-14 md:pb-20">
        <h1 className="text-3xl md:text-6xl font-bold leading-[1.1] uppercase">
          {titelZeilen.map((z, i) => (
            <span key={i}>{i > 0 && <br />}{z}</span>
          ))}
        </h1>
        <p className="mt-8 text-sm md:text-base leading-relaxed max-w-2xl">
          <NL text={s.subtitle} />
        </p>

        {/* GRID: 3 Spalten mobil, 6 auf Desktop */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-4 gap-y-8 mt-12">
          {sichtbar.map((k) => (
            <Link key={k.slug} to={`/kandidierende/${k.slug}`} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-volt-purple">
                <CmsImg
                  src={k.foto}
                  alt={k.name}
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-2 font-bold text-xs md:text-base leading-tight group-hover:underline">
                {k.name}
              </div>
              <div className="text-[11px] md:text-sm leading-tight mt-0.5">
                Listen Platz {k.listenplatz}
              </div>
              <div className="text-[11px] md:text-sm leading-tight">{k.bezirk}</div>
            </Link>
          ))}
        </div>
      </section>

    </main>
    <Footer />
    </div>
  );
}
