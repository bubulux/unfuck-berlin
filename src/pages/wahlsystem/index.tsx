import { useLocation } from "react-router";
import { PageLayout } from "../../components/templates/page-layout";
import { VotingSystemSection } from "../../components/organisms/voting-system-section";
import { SpitzenduoComposite } from "../../components/organisms/spitzenduo-composite";
import { ProgramIntro } from "../../components/organisms/program-intro";
import { Text } from "../../components/atoms/text";
import { WAHLSYSTEM } from "../../data/wahlsystem";

export function Wahlsystem() {
  const { pathname } = useLocation();
  const { heading, first, second, mit16 } = WAHLSYSTEM;

  return (
    <PageLayout activePath={pathname} variant="light">
      <VotingSystemSection
        headingLines={heading}
        first={first}
        mediaNode={<SpitzenduoComposite className="flex flex-row" />}
        second={second}
      />
      <ProgramIntro
        wide
        heading={mit16.heading}
        headingColor="yellow"
        headingAlign="left"
        ctaLabel={mit16.ctaLabel}
        ctaColor="neon"
        ctaTo="/wahlprogramm"
      >
        <Text color="purple" weight="bold">
          {mit16.lead}
        </Text>
        {mit16.paragraphs.map((paragraph, i) => (
          <Text key={i} color="purple">
            {paragraph}
          </Text>
        ))}
      </ProgramIntro>
    </PageLayout>
  );
}

export default Wahlsystem;
