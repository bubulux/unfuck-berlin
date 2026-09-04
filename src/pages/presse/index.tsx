import { useLocation } from "react-router";
import { PageLayout } from "../../components/templates/page-layout";
import { PRESS_CMS } from "../../data/press.generated";
import { HighlightText } from "../../components/atoms/highlight-text";
import { useMediaQuery } from "@uidotdev/usehooks";
import { PressTeaser } from "../../components/molecules/article-teaser";
import { publishedAtSortKey } from "../../lib/publishedAt";

// Layout-Klassen (.news__wrapper / .news__text_width) teilen sich /news und
// /presse – beides sind Artikel-Listen im selben Raster.
import '../news/styles.css'

/**
 * "Volt in der Presse": nur die Presse-Artikel-Verlinkungen aus dem CMS,
 * gerendert wie auf /news. Die Daten bleiben zusaetzlich in der News-Liste.
 */
export function PressePage() {
  const { pathname } = useLocation();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 500px)");
  const isMediumDevice = useMediaQuery("only screen and (min-width : 500px) and (max-width : 900px)");

  const autoBreakSize_roomy = isSmallDevice ? 0.2 : isMediumDevice ? 0.25 : 0.33

  const PRESS_SORTED = PRESS_CMS
    .filter(p => p.is_published === true)
    // Ohne (oder mit unlesbarem) Datum wuerde der Vergleich NaN liefern und die
    // Reihenfolge waere undefiniert – solche Eintraege wandern ans Ende.
    .sort((a, b) => publishedAtSortKey(b.publishedAt) - publishedAtSortKey(a.publishedAt))

  return (
    <PageLayout activePath={pathname} variant="light">
      <div className="news__wrapper article_list">
        <HighlightText
          as="h1"
          lines={['Volt in der Presse']}
          variant="titel"
          color="purple"
          textColor="white"
          align="left"
          uppercase={false}
          className="news__text_width program-intro__heading"
          style={{ marginBottom: 'var(--gap-big)' }}
        />

        {
          PRESS_SORTED.map((press, index) => (
            <PressTeaser
              key={`${index}-${press.url}`}
              press={press}
              className="news__text_width"
              autoBreakSize={autoBreakSize_roomy}
            />
          ))
        }
      </div>
    </PageLayout>
  );
}

export default PressePage
