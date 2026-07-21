import { useLocation } from "react-router";
import { PageLayout } from "../../components/templates/page-layout";
import { EventsSection } from "../../components/organisms/events-section";
import { CarouselSection } from "../../components/organisms/carousel-section";
import { Text } from "../../components/atoms/text";
import { useCalendar } from "../../context/calendar-context";

const MEET_IMAGES = [
  { src: "/pics/meets/1.png", alt: "Meet & Greet 1" },
  { src: "/pics/meets/2.png", alt: "Meet & Greet 2" },
  { src: "/pics/meets/3.png", alt: "Meet & Greet 3" },
];

export function Termine() {
  const { pathname } = useLocation();
  const { items, raw, status } = useCalendar();

  // Show the whole run up to and including 30 September (of the soonest event's
  // year), then stop — no pagination, everything is on the page at once.
  const cutoffYear = raw[0]?.start.getFullYear() ?? new Date().getFullYear();
  const cutoff = new Date(cutoffYear, 8, 30, 23, 59, 59, 999);
  const events = items.filter((_, i) => raw[i] && raw[i].start <= cutoff);

  return (
    <PageLayout activePath={pathname} hideCalendar>
      <EventsSection
        headingLines={["Termine", "& Treffen"]}
        intro={[
          "Lern unsere AGH und BVV Kandidierenden kennen oder mach direkt bei Volt mit!",
          "Wir freuen uns auf Dich auf Podien, Meet & Greets, und anderen Veranstaltungen.",
        ]}
        events={events}
        status={status}
      >
        <Text as="p" variant="body" color="white">
          Du vermisst hier ein Event, oder würdest uns gerne auf einem Panel
          begrüßen? <strong>Dann lad' uns ein!</strong>
        </Text>
        <Text as="p" variant="body" color="white">
          Schreib dazu eine Mail an{" "}
          <a href="mailto:presse@voltberlin.org">presse@voltberlin.org</a>
        </Text>
      </EventsSection>
      <CarouselSection images={MEET_IMAGES} />
    </PageLayout>
  );
}

export default Termine;
