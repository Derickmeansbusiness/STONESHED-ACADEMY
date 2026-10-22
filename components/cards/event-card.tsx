import Link from "next/link";
import { MapPin, Users, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getDictionary, pick, type Locale } from "@/lib/i18n";

type EventLike = { slug: string; titleEn: string; titleFr: string; overviewEn: string; overviewFr: string; category: string; startsAt: string; endsAt: string; format: string; venueEn: string | null; venueFr: string | null; city: string | null; capacity: number; status: string; speaker: string; registrations?: { status: string }[] };

export function EventCard({ event, locale }: { event: EventLike; locale: Locale }) {
  const t = getDictionary(locale);
  const d = new Date(event.startsAt);
  const confirmed = event.registrations?.filter((r) => r.status === "confirmed").length ?? 0;
  const left = Math.max(0, event.capacity - confirmed);
  const cat = t.events.categories[event.category as keyof typeof t.events.categories] ?? event.category;
  return (
    <Link href={`/${locale}/events/${event.slug}`} className="group flex gap-5 rounded-2xl border border-mist/70 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
      <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-royal py-3 text-white">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-sky">{d.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", { month: "short" })}</span>
        <span className="num font-display text-2xl font-extrabold leading-none">{d.getDate()}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex flex-wrap gap-2"><Badge tone="sky">{cat}</Badge>{left === 0 ? <Badge tone="amber">{t.events.full}</Badge> : null}</div>
        <h3 className="font-display text-[16px] font-bold leading-snug text-ink group-hover:text-finance">{pick(event, "title", locale)}</h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-steel">
          <span className="inline-flex items-center gap-1">{event.format === "online" ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}{event.format === "online" ? t.events.online : `${pick(event, "venue", locale)}${event.city ? `, ${event.city}` : ""}`}</span>
          <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" />{left} {t.events.seatsLeft}</span>
        </div>
      </div>
    </Link>
  );
}
