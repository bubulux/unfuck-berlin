import { useLocation } from "react-router";
import { PageLayout } from "../../components/templates/page-layout";
import { VotingSystemSection } from "../../components/organisms/voting-system-section";
import { ProgramIntro } from "../../components/organisms/program-intro";
import { Text } from "../../components/atoms/text";

export function Wahlsystem() {
  const { pathname } = useLocation();
  return (
    <PageLayout activePath={pathname} variant="light" hideCalendar>
      <VotingSystemSection
        headingLines={["Erste & Zweite", "Stimme:", "Vote Volt"]}
        first={{
          title: "Die Erststimme – Deine Wahl für eine Person",
          paragraphs: [
            "Mit der Erststimme wählst du eine Kandidatin oder einen Kandidaten aus deinem Wahlkreis. Diese Person vertritt deine Region im Parlament und setzt sich dort für die Interessen der Menschen vor Ort ein.",
            "Wer die meisten Stimmen im Wahlkreis erhält, gewinnt das Direktmandat. Mit deiner Erststimme entscheidest du also, wer deine Stimme in der Politik vertreten soll.",
          ],
        }}
        media={{
          src: "/pics/wahlsystem/paul-anna-portrait.png",
          alt: "Paul Löper und Anna Auerbach",
          captionLabel: "Spitzenduo Volt kennenlernen",
          captionTo: "/spitzenkandidaten",
        }}
        second={{
          title: "Die Zweitstimme – Deine Wahl für VOLT",
          paragraphs: [
            "Mit der Zweitstimme entscheidest du, welche Partei wie stark im Parlament vertreten ist. Sie ist ausschlaggebend für die Sitzverteilung und bestimmt damit maßgeblich die politischen Mehrheiten.",
            "Du wählst also nicht eine einzelne Person, sondern die Partei, deren Ziele und Ideen dich am meisten überzeugen. Die Zweitstimme hat deshalb einen großen Einfluss darauf, welche Politik in den kommenden Jahren umgesetzt wird.",
          ],
        }}
      />
      <ProgramIntro
        heading="Wählen mit 16?"
        headingColor="yellow"
        headingAlign="left"
        ctaLabel="Wahlprogramm"
        ctaColor="neon"
        ctaTo="/wahlprogramm"
      >
        <Text color="purple" weight="bold">
          Berlin gehört auch dir.
        </Text>
        <Text color="purple">
          Du bist 16 oder älter? Dann kannst du dieses Jahr zum ersten Mal
          wählen. Das ist mehr als nur ein Kreuz auf dem Stimmzettel – es ist
          deine Chance, die Zukunft deiner Stadt mitzugestalten. Ob Mieten,
          Bildung, öffentlicher Nahverkehr, Klima oder Freizeitangebote – die
          Entscheidungen der Politik betreffen deinen Alltag. Informiere dich
          über die Themen und Parteien, bilde dir deine eigene Meinung und geh
          wählen. Denn Berlin verändert sich nur, wenn Menschen mitentscheiden.
          Vielleicht beginnt das mit deiner ersten Stimme.
        </Text>
      </ProgramIntro>
    </PageLayout>
  );
}

export default Wahlsystem;
