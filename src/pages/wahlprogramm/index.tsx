import { useLocation } from "react-router";
import { PageLayout } from "../../components/templates/page-layout";
import { ProgramIntro } from "../../components/organisms/program-intro";
import { ProgramSection } from "../../components/organisms/program-section";
import { RichText } from "../../components/molecules/rich-text";
import { WAHLPROGRAMM, mapHeadlineTheme } from "../../data/wahlprogramm";

export function Wahlprogramm() {
  const { pathname } = useLocation();
  const { intro, pillars, europa } = WAHLPROGRAMM;

  return (
    <PageLayout activePath={pathname} variant="light">
      <ProgramIntro
        wide
        heading={intro.heading}
        headingColor={mapHeadlineTheme(intro.theme, "green")}
        headingAlign="left"
        ctaLabel={intro.ctaLabel}
        ctaHref={intro.ctaHref}
      >
        <RichText text={intro.body} color="purple" />
      </ProgramIntro>

      <ProgramSection pillars={pillars} />

      <ProgramIntro
        wide
        heading={europa.heading}
        headingColor={mapHeadlineTheme(europa.theme, "yellow")}
        headingAlign="left"
        headingUppercase={false}
        ctaLabel={europa.ctaLabel}
        ctaHref={europa.ctaHref}
      >
        <RichText text={europa.body} color="purple" />
      </ProgramIntro>
    </PageLayout>
  );
}

export default Wahlprogramm;
