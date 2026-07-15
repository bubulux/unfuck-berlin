import { Link } from "react-router-dom";
import { CmsImg } from "../../lib";
import { KANDIDATEN } from "../../data";

export function KandisGrid({ obj }) {
  // const amount = obj.amount || 9

  return (
    <section className="relative overflow-hidden mb-16">
        <div className="md:mx-auto md:max-w-6xl md:px-8 md:py-2">
          <div className="px-5 md:px-0">

            <div className="grid grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-8 mt-12">
          {KANDIDATEN.map((k) => (
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

          </div>
        </div>
      </section>
  );
}
