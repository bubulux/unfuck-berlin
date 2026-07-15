export function HtmlText({ obj }) {
  if (!obj.html_text) {
    return null
  }

  return (
      <section className="relative overflow-hidden mb-16">
        <div className="md:mx-auto md:max-w-6xl md:px-8 md:py-2">
          <div className="px-5 md:px-0">
            <p
              className="whitespace-pre-wrap text-left text-sm md:text-base leading-snug max-w-2xl"
              dangerouslySetInnerHTML={{ __html: obj.html_text || '' }}
            />
          </div>
        </div>
      </section>
  );
}
