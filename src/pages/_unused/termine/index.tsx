import { useLocation } from "react-router";
import { PageLayout } from "../../../components/templates/page-layout";
import { EventsSection } from "../../../components/organisms/events-section";
import { CarouselSection } from "../../../components/organisms/carousel-section";
import { useCalendar } from "../../../context/calendar-context";
import { MEETS } from "../../../data/meets";

export function Termine() {
  const { pathname } = useLocation();
  const { items, raw, status } = useCalendar();

  // Show the whole run up to and including 30 September (of the soonest event's
  // year), then stop — no pagination, everything is on the page at once.
  const cutoffYear = raw[0]?.start.getFullYear() ?? new Date().getFullYear();
  const cutoff = new Date(cutoffYear, 8, 30, 23, 59, 59, 999);
  const events = items.filter((_, i) => raw[i] && raw[i].start <= cutoff);

  return (
    <PageLayout activePath={pathname}>
      <EventsSection events={events} status={status} />
      <CarouselSection images={MEETS} />
    </PageLayout>
  );
}

export default Termine;
