import { Link } from "react-router-dom";
import { NL } from "../../lib";

export function UnfckTeaser({ obj }) {
  const unfckZeilen = obj.unfckZeilen || ["unf*ck", "berlin"];

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 mb-16">
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
              src={obj.unfckBild}
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
                <NL text={obj.unfckText || "Hinter unf*ck Berlin steckt eine einfache Idee: Probleme verschwinden nicht, wenn man höflicher über sie spricht. Aber sie verschwinden auch nicht, wenn man nur über sie klagt.\nDeshalb ist das hier keine Protestkampagne."} />
              </p>
              <div className="mt-6">
                <Link
                  to="/unfck-berlin"
                  className="inline-block bg-volt-lime text-volt-purple font-bold tracking-wide text-sm md:text-base px-7 py-3 rounded-md shadow-[4px_5px_0_#8FB000] btn-magnet uppercase"
                >
                  {obj.unfckButton || "Worum geht es?"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
