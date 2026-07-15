import { useNavigate } from "react-router-dom";

const headline_themes = {
  'green': 'hl-green',
  'orange': 'hl-orange',
  'yellow': 'hl-lime',
  'blue': 'hl-blue',
}

export function HeroLinear({ obj }) {
  const navigate = useNavigate();
  const heroZeilen = obj.heroZeilen || [];

  return (
      <section className="relative overflow-hidden mb-16">
        <div className="md:mx-auto md:max-w-6xl md:px-8 md:items-start md:gap-12 md:pt-16 md:pb-10">

          <div className="relative z-10 -mt-40 md:mt-6 px-5 md:px-0 flex flex-col md:h-full">
            <h1 className="flex flex-col items-start gap-1 md:gap-2 text-[42px] md:text-5xl lg:text-6xl font-bold leading-none">
              {heroZeilen.map((z, i) => (
                <span key={i} className={`hl ${headline_themes[obj.headline_theme] ? headline_themes[obj.headline_theme] : 'hl-lime'}`}>{z}</span>
              ))}
            </h1>

            { obj.heroText && <p
              className="whitespace-pre-wrap text-left text-sm md:text-base leading-snug mt-6 md:mt-auto md:pt-16 max-w-2xl"
              dangerouslySetInnerHTML={{ __html: obj.heroText || '' }}
            /> }

            {
              obj.heroCtaHref && obj.heroCtaLabel
              ? <div className="text-left mt-7">
                {
                obj.heroCtaHref.startsWith('/')
                ? <button
                  onClick={() => navigate(obj.heroCtaHref)}
                  className="inline-block bg-volt-lime text-volt-purple font-bold tracking-wide text-sm md:text-base px-7 py-3 rounded-md shadow-[4px_5px_0_#8FB000] btn-magnet uppercase"
                >
                  {obj.heroCtaLabel}
                </button>
                : <Link to={obj.heroCtaHref}>
                  <button
                    className="inline-block bg-volt-lime text-volt-purple font-bold tracking-wide text-sm md:text-base px-7 py-3 rounded-md shadow-[4px_5px_0_#8FB000] btn-magnet uppercase"
                  >
                    {obj.heroCtaLabel}
                  </button>
                </Link>
              }
              </div>
              : null
            }
          </div>
        </div>
      </section>
  );
}
