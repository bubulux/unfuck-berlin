import { NL } from "../../lib";

function Kapitel({ k }) {
  return (
    <div className="grid grid-cols-[minmax(100px,2fr)_3fr] gap-4 md:gap-6 items-start">
      <h3 className="text-2xl md:text-3xl font-bold leading-tight">
        <NL text={(k.titel || "").replace(" ", "\n")} />
      </h3>
      <div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {(k.tags || []).map((tag) => (
            <span key={tag} className="bg-volt-purple text-white text-[10px] md:text-[11px] font-bold px-2.5 py-1 -skew-y-1">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-xs md:text-sm leading-relaxed">
          <NL text={k.text} />
        </p>
      </div>
    </div>
  );
}

export function WahlprogrammTeaser({ obj }) {
  console.log(' obj',  obj)
  
  if (!obj.kapitel || !obj.kapitel.length) {
    return null
  }

  const kapitel = obj.kapitel;
  const linkeSpalte =  kapitel.slice(0, 4);
  const rechteSpalte =  kapitel.slice(4);

  return (
      <section className="max-w-6xl mx-auto px-5 md:px-8 mb-16">
        <div className="grid md:grid-cols-2 gap-y-10 md:gap-x-16">
          <div className="space-y-10">
            {linkeSpalte.map((k) => <Kapitel key={k.titel} k={k} />)}
          </div>
          <div className="space-y-10">
            {rechteSpalte.map((k) => <Kapitel key={k.titel} k={k} />)}
          </div>
        </div>
      </section>
  );
}
