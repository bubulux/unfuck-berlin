import { useLocation } from "react-router";
import { PageLayout } from "../../components/templates/page-layout";
import { ProgramIntro } from "../../components/organisms/program-intro";
import { ProgramSection } from "../../components/organisms/program-section";
import { RichText } from "../../components/molecules/rich-text";
import { WAHLPROGRAMM, mapHeadlineTheme } from "../../data/wahlprogramm";
import Button from "../../components/atoms/button";

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
      >
        <RichText text={intro.body} color="purple" />
      </ProgramIntro>

      <section className="program-intro program-intro--wide">
        <div className="program-intro__inner">
          <Button
            as="a"
            href={intro.ctaHref}
            className="program-intro__cta"
          >
            {intro.ctaLabel}
          </Button>

          <Button
            as="a"
            href="https://voltdeutschland.org/storage/assets-berlin/pdf/policy-wahlprogramm-2026/kurzwahlprogramm-2026-final.pdf"
            className="program-intro__cta"
          >
            Gesamtes Wahlprogramm zur AGH-Wahl 2026
          </Button>
        </div>
      </section>

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
