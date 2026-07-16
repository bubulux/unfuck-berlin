import { useLocation } from "react-router";
import { PageLayout } from "../../components/templates/page-layout";
import { ProgramIntro } from "../../components/organisms/program-intro";
import { ProgramSection } from "../../components/organisms/program-section";
import { Text } from "../../components/atoms/text";
import { PROGRAM_PILLARS } from "../../data/program";

export function Wahlprogramm() {
  const { pathname } = useLocation();
  return (
    <PageLayout activePath={pathname} variant="light">
      <ProgramIntro>
        <Text color="purple" weight="bold">
          Berlin ist pulsierend, aber sein Herzschlag erreicht die Politik
          nicht.
        </Text>
        <Text color="purple">
          Die Folgen spüren Berliner*innen täglich: Wohnungen, die unbezahlbar
          sind. Schulen, die marode sind. Eine Verwaltung, die auf einfache
          Anliegen monatelang nicht reagiert. Dazu kommt das Gefühl, dass es
          nicht besser wird, sondern schlechter.
        </Text>
        <Text color="purple">
          Mit unserem Wahlprogramm legen wir einen echten, konkreten Plan vor,
          wie diese Stadt wieder funktioniert:{" "}
          <strong>pragmatisch, evidenzbasiert und europäisch.</strong>
        </Text>
        <Text color="purple">
          In diesen Kapiteln zeigen wir, wie Berlin seine größten Probleme löst,
          von der Verwaltung über bezahlbares Wohnen bis zur Bildung.{" "}
          <strong>Denn Berlin braucht Politik, die Zukunft gestaltet.</strong>
        </Text>
      </ProgramIntro>
      <ProgramSection pillars={PROGRAM_PILLARS} />
      <ProgramIntro
        heading={["Europäisch denken,", "lokal liefern"]}
        headingColor="yellow"
        headingAlign="left"
        headingUppercase={false}
      >
        <Text color="purple">
          Volt ist die erste echte europäische Partei: in ganz Europa aktiv, mit
          einem gemeinsamen politischen Fundament. Genau das nutzen wir für
          Berlin. Wir experimentieren nicht auf Kosten der Berliner:innen,
          sondern holen Lösungen in die Stadt, die sich in Europa bereits
          bewährt haben. 98 Best-Practice-Beispiele aus Städten wie Helsinki,
          Wien, Amsterdam und Kopenhagen belegen, dass unsere Vorschläge keine
          Utopien sind, sondern erprobte Realität. Dabei gilt: Evidenz
          entscheidet, nicht Ideologie. Wir messen die Wirkung unserer Maßnahmen
          und passen an, was nicht die gewünschten Ergebnisse bringt.
        </Text>
      </ProgramIntro>
    </PageLayout>
  );
}

export default Wahlprogramm;
