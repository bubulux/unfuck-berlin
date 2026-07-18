import { useState } from "react";
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

const PAGE_SIZE = 6;

export function Termine() {
  const { pathname } = useLocation();
  const { items, status } = useCalendar();
  const [visible, setVisible] = useState(PAGE_SIZE);
  return (
    <PageLayout activePath={pathname} hideCalendar>
      <EventsSection
        headingLines={["Termine", "& Treffen"]}
        intro={[
          "Lern unsere AGH und BVV Kandidierenden kennen oder mach direkt bei Volt mit!",
          "Wir freuen uns auf Dich auf Podien, Meet & Greets, und anderen Veranstaltungen.",
        ]}
        events={items.slice(0, visible)}
        status={status}
        hasMore={visible < items.length}
        onLoadMore={() => setVisible((v) => v + PAGE_SIZE)}
      >
        <Text as="p" variant="body" color="white">
          Du vermisst hier ein Event, oder würdest uns gerne auf einem Panel
          begrüßen? <strong>Dann lad' uns ein!</strong>
        </Text>
        <Text as="p" variant="body" color="white">
          Schreib dazu eine Mail an{" "}
          <a href="mailto:presse@voltberlin.org" style={{ color: "inherit" }}>
            presse@voltberlin.org
          </a>
        </Text>
      </EventsSection>
      <CarouselSection images={MEET_IMAGES} />
    </PageLayout>
  );
}

export default Termine;
