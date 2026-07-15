const TYPE_STYLE_event = {
  Bezirkstreffen: "bg-volt-pink text-white",
  Veranstaltung: "bg-volt-blue text-volt-purple",
  Podium: "bg-volt-orange text-volt-purple",
};

const TYPE_STYLE_color = {
  pink: "bg-volt-pink text-white",
  blue: "bg-volt-blue text-volt-purple",
  orange: "bg-volt-orange text-volt-purple",
  green: "bg-volt-green text-white",
};

export default function TerminCard({ termin }) {
  const t = termin;
  return (
    <div className="flex flex-col items-start">
      <span className={`inline-block text-sm md:text-base font-bold px-4 py-1.5 md:py-2 -skew-y-1 ${TYPE_STYLE_event[t.type] || TYPE_STYLE_color[t.typeColor] || TYPE_STYLE_color.blue}`}>
        {t.type}
      </span>
      <div className="bg-white text-volt-darkest w-full flex items-stretch gap-4 p-4 md:p-6 shadow-card">
        <div className="text-center pr-4 border-r border-volt-darkest/60 flex flex-col justify-center">
          <div className="text-4xl md:text-5xl font-bold leading-none">{t.day}</div>
          <div className="text-2xl md:text-3xl font-bold tracking-wide mt-1">{t.month}</div>
        </div>
        <div className="text-left flex flex-col justify-center">
          <div className="font-bold text-base md:text-lg leading-tight">{t.title}</div>
          <div className="text-sm md:text-base mt-2 opacity-90">{t.where}</div>
        </div>
      </div>
    </div>
  );
}
