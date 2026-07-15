import { Link } from "react-router-dom";
import { NL } from "../../lib";
import Countdown from "../Countdown";
import { ArrowRight } from "lucide-react";

export function WahlsystemTeaser({ obj }) {
  return (
      <section className="px-5 pt-8 pb-14 md:pb-20 text-center max-w-md md:max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          {obj.title || "Berlin besser machen!"}
        </h2>
        <Countdown />
        <p className="text-sm md:text-base leading-snug">
          <NL text={obj.text} />
        </p>
        <Link to="/wahl-info" className="inline-flex items-center gap-2 font-bold text-sm md:text-base mt-4 hover:text-volt-lime transition">
          {obj.link || "Wie wähle ich?"} <ArrowRight size={16} />
        </Link>
      </section>
  );
}
