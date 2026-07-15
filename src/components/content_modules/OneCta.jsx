import { useNavigate, Link } from "react-router-dom";

export function OneCta({ obj }) {
  const navigate = useNavigate();

  if (!obj.ctaHref || !obj.ctaLabel) {
    return null
  }

  return (
      <section className="relative overflow-hidden mb-16">
        <div className="md:mx-auto md:max-w-6xl md:px-8 md:py-2">
          <div className="relative z-10 px-5 md:px-0 flex flex-col">
            <div className="text-left">
              {
                obj.ctaHref.startsWith('/')
                ? <button
                  onClick={() => navigate(obj.ctaHref)}
                  className="inline-block bg-volt-lime text-volt-purple font-bold tracking-wide text-sm md:text-base px-7 py-3 rounded-md shadow-[4px_5px_0_#8FB000] btn-magnet uppercase"
                >
                  {obj.ctaLabel}
                </button>
                : <Link to={obj.ctaHref}>
                  <button
                    className="inline-block bg-volt-lime text-volt-purple font-bold tracking-wide text-sm md:text-base px-7 py-3 rounded-md shadow-[4px_5px_0_#8FB000] btn-magnet uppercase"
                  >
                    {obj.ctaLabel}
                  </button>
                </Link>
              }
              </div>
          </div>
          </div>
      </section>
  );
}
