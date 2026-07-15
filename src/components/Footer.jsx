import WasMehr from "./WasMehr";

const SocialIcons = [
  { label: "Facebook", src: "/images/facebook.svg", href: "https://www.facebook.com/BerlinVolt/?locale=de_DE" },
  { label: "Instagram", src: "/images/insta.svg", href: "https://www.instagram.com/volt_berlin/" },
  { label: "X", src: "/images/x.svg", href: "https://x.com/volt_berlin" },
  { label: "LinkedIn", src: "/images/linkedin.svg", href: "https://www.linkedin.com/company/volt-deutschland/" },
];

export function Footer() {
  return (
    <footer className="bg-volt-purple text-white">
      {/* WAS MEHR? — Cross-Navigation, auf jeder Seite direkt über dem Footer */}
      <WasMehr />

      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-8">

        {/* ZUKUNFT MADE IN EUROPE + Socials */}
        <div className="flex flex-col items-center text-center pt-4">
          <div className="text-2xl md:text-4xl font-bold tracking-tight mb-5 flex flex-wrap justify-center items-center gap-2 md:gap-3">
            <span>ZUKUNFT</span>
            <div className="relative w-8 h-8 md:w-10 md:h-10 shrink-0">
              <img
                src="/images/stars.svg"
                alt="Europa-Sterne"
                className="w-full h-full animate-[spin_20s_linear_infinite]"
              />
            </div>
            <span>MADE IN EUROPE</span>
          </div>

          <div className="text-sm md:text-base font-bold mb-5">
            Werde teil der bewegung
          </div>

          <div className="flex items-center gap-3">
            {SocialIcons.map(({ label, src, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center btn-magnet hover:scale-110 transition-transform"
              >
                <img src={src} alt={label} className="w-full h-full" />
              </a>
            ))}
          </div>
        </div>

        {/* Lime-Buttons + Kontakt */}
        <div className="flex justify-between items-start gap-6 mt-14 mb-10">
          <div className="flex flex-col gap-2.5 items-start">
            <a href="https://voltdeutschland.org/berlin/spenden" target="_blank" rel="noopener noreferrer" className="hl hl-lime !m-0 text-xs md:text-sm font-bold btn-magnet">
              Spenden
            </a>
            <a href="https://voltdeutschland.org/berlin/mitmachen" className="hl hl-lime !m-0 text-xs md:text-sm font-bold btn-magnet">
              Mitmachen
            </a>
            <a href="https://voltdeutschland.org" target="_blank" rel="noopener noreferrer" className="hl hl-lime !m-0 text-xs md:text-sm font-bold btn-magnet">
              Volt Deutschland
            </a>
          </div>

          <div className="text-left space-y-3 max-w-[240px] md:max-w-none">
            <div className="font-bold text-sm md:text-base">Kontakt</div>
            <div>
              <div className="text-[11px] md:text-sm opacity-90">Allgemeine Fragen und Feedback</div>
              <div className="text-[11px] md:text-sm font-bold break-words">berlin@voltdeutschland.org</div>
            </div>
            <div>
              <div className="text-[11px] md:text-sm opacity-90">Presse- und Medienanfragen</div>
              <div className="text-[11px] md:text-sm font-bold break-words">presse@voltberlin.org</div>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] md:text-xs opacity-80">
          <div className="flex gap-4">
            <a href="https://voltdeutschland.org/berlin/impressum" target="_blank" rel="noopener noreferrer" className="hover:text-volt-lime transition-colors">Impressum</a>
            <a href="https://voltdeutschland.org/datenschutz" target="_blank" rel="noopener noreferrer" className="hover:text-volt-lime transition-colors">Datenschutz</a>
            <a href="https://voltdeutschland.org/berlin/transparenz" target="_blank" rel="noopener noreferrer" className="hover:text-volt-lime transition-colors">Transparenz</a>
          </div>
          <div className="text-center md:text-right">
            Made with <span className="text-[#9D66FF]">💜</span> by Volt EUR Tech Team for Volt Berlin
          </div>
        </div>
      </div>
    </footer>
  );
}
