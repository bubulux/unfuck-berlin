const headline_themes = {
  'green': 'hl-green',
  'orange': 'hl-orange',
  'yellow': 'hl-lime',
  'blue': 'hl-blue',
}

export function Headline({ obj }) {
  const headlineZeilen = obj.headlineZeilen || [];

  return (
      <section className="relative overflow-hidden mb-16">
        <div className="md:mx-auto md:max-w-6xl md:px-8 md:py-2">
          <div className="relative z-10 px-5 md:px-0 flex flex-col">
            <h2 className="flex flex-col items-start gap-1 md:gap-2 text-[36px] font-bold leading-none">
              {headlineZeilen.map((z, i) => (
                <span key={i} className={`hl ${headline_themes[obj.headline_theme] ? headline_themes[obj.headline_theme] : 'hl-lime'}`}>{z}</span>
              ))}
            </h2>
          </div>
        </div>
      </section>
  );
}
