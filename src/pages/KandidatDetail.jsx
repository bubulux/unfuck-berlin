import { useParams, Link } from "react-router-dom";
import SocialRow from "../components/SocialRow";
import { KANDIDATEN, PLATZHALTER } from "../data";
import { NL, CmsImg } from "../lib";
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export default function KandidatDetail() {
  const { slug } = useParams();
  const k = KANDIDATEN.find((x) => x.slug === slug);

  if (!k) {
    return (
      <main className="bg-white text-volt-purple min-h-[60vh] flex flex-col items-center justify-center gap-4 px-5">
        <div className="text-2xl font-bold">Kandidat:in nicht gefunden</div>
        <Link to="https://voltdeutschland.org/berlin/menschen/kandidierende-agh-liste-2026" className="bg-volt-lime text-volt-purple font-bold px-5 py-2.5 btn-magnet">
          Zur Landesliste
        </Link>
      </main>
    );
  }

  const [vorname, ...rest] = k.name.split(" ");
  const nachname = rest.join(" ");

  const isPurple = false

  return (
  <div className="min-h-full bg-volt-purple">
    <Navbar isPurple={isPurple} />
    <main className={isPurple ? 'bg-volt-purple text-white' : 'bg-white text-volt-purple'}>
      <section className="max-w-5xl mx-auto px-5 md:px-8 pt-12 md:pt-24 pb-14">
        <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] uppercase">
          {vorname}<br />{nachname}
        </h1>

        <div className="relative aspect-[3/4] max-w-sm mt-8 overflow-hidden">
          <CmsImg src={k.foto} alt={k.name} className="absolute inset-0 w-full h-full object-cover object-top" />
        </div>

        <p className="mt-4 text-xs md:text-sm font-medium">
          AGH Kandidat:in<br />
          Listenplatz: {k.listenplatz}<br />
          Alter: {k.alter}<br />
          Bezirk: {k.bezirk}
        </p>

        <h2 className="mt-12 text-2xl md:text-3xl font-bold">Herzensthema</h2>
        <p className="mt-4 text-sm md:text-base leading-relaxed max-w-2xl">
          <NL text={k.herzensthema || PLATZHALTER} />
        </p>

        <h2 className="mt-12 text-2xl md:text-3xl font-bold">Über mich</h2>
        <p className="mt-4 text-sm md:text-base leading-relaxed max-w-2xl">
          <NL text={k.ueberMich || PLATZHALTER} />
        </p>

        {
        k.foto2 && 
        <div className="relative aspect-[3/4] max-w-[220px] md:max-w-[260px] mt-10 overflow-hidden">
          <CmsImg src={k.foto2} alt={k.name} className="absolute inset-0 w-full h-full object-cover object-top" />
        </div>
        }

        {/*
        <h2 className="mt-8 text-2xl md:text-3xl font-bold">Berlin ist…</h2>
        <p className="mt-4 text-sm md:text-base leading-relaxed">
          <NL text={k.berlinIst || PLATZHALTER} />
        </p>
        */}

        {/*
        <div className="mt-14 md:mt-20">
          <SocialRow label={`Folge ${vorname} für weitere spannende Artiken`} />
        </div>
        */}
      </section>
      <div className="h-16" />
    </main>
    <Footer />
    </div>
  );
}
