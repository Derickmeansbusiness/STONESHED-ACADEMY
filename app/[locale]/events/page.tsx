import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { listEvents } from "@/lib/services/content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { EventsBrowser } from "@/components/events/events-browser";

export const metadata: Metadata = { title: "Events" };

export default async function EventsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const events = await listEvents();
  return (
    <div className="pt-28 pb-12">
      <Container>
        <Reveal><SectionHeading eyebrow={t.nav.events} title={t.events.title} sub={t.events.sub} size="lg" /></Reveal>
        <div className="mt-10"><EventsBrowser locale={locale} events={events.map((e) => ({ ...e, confirmed: e.registrations.filter((r) => r.status === "confirmed").length }))} /></div>
      </Container>
    </div>
  );
}
