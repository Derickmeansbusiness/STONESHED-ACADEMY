"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, List, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";
import { pick, type Locale } from "@/lib/i18n";
import { EventCard } from "@/components/cards/event-card";
import { cn } from "@/lib/utils";

type Ev = { id: string; slug: string; titleEn: string; titleFr: string; overviewEn: string; overviewFr: string; category: string; startsAt: string; endsAt: string; format: string; venueEn: string | null; venueFr: string | null; city: string | null; capacity: number; status: string; speaker: string; confirmed: number; registrations: { status: string }[] };

export function EventsBrowser({ locale, events }: { locale: Locale; events: Ev[] }) {
  const { t } = useLocale();
  const [view, setView] = useState<"list" | "calendar">("list");
  const [cat, setCat] = useState<string | undefined>();
  const first = events.find((e) => new Date(e.startsAt) >= new Date()) ?? events[0];
  const [month, setMonth] = useState(() => { const d = first ? new Date(first.startsAt) : new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const filtered = events.filter((e) => !cat || e.category === cat);
  const upcoming = filtered.filter((e) => new Date(e.endsAt) >= new Date());
  const past = filtered.filter((e) => new Date(e.endsAt) < new Date());
  const cats = Array.from(new Set(events.map((e) => e.category)));
  const days = useMemo(() => {
    const start = new Date(month); const dow = (start.getDay() + 6) % 7;
    const cells: (Date | null)[] = Array.from({ length: dow }, () => null);
    const n = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= n; i++) cells.push(new Date(month.getFullYear(), month.getMonth(), i));
    while (cells.length % 7) cells.push(null);
    return cells;
  }, [month]);
  const byDay = (d: Date) => filtered.filter((e) => { const s = new Date(e.startsAt); return s.getFullYear() === d.getFullYear() && s.getMonth() === d.getMonth() && s.getDate() === d.getDate(); });
  const chip = (on: boolean) => cn("rounded-full border px-3 py-1.5 text-xs font-semibold transition", on ? "border-royal bg-royal text-white" : "border-mist bg-white text-steel hover:border-finance");
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2"><button onClick={() => setCat(undefined)} className={chip(!cat)}>{t.common.all}</button>{cats.map((c) => <button key={c} onClick={() => setCat(cat === c ? undefined : c)} className={chip(cat === c)}>{t.events.categories[c as "university"] ?? c}</button>)}</div>
        <div className="flex gap-1 rounded-full border border-mist bg-white p-1">{(["list", "calendar"] as const).map((v) => <button key={v} onClick={() => setView(v)} className={cn("inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold", view === v ? "bg-royal text-white" : "text-steel")}>{v === "list" ? <List className="h-3.5 w-3.5" /> : <CalendarDays className="h-3.5 w-3.5" />}{v === "list" ? t.events.list : t.events.calendar}</button>)}</div>
      </div>
      {view === "list" ? (
        <div className="mt-8 space-y-10">
          <div className="grid gap-4 lg:grid-cols-2">{upcoming.map((e) => <EventCard key={e.id} event={e} locale={locale} />)}</div>
          {past.length > 0 && <div><h2 className="display-sm mb-4 text-ink">{locale === "fr" ? "Événements passés" : "Past events"}</h2><div className="grid gap-4 opacity-70 lg:grid-cols-2">{past.map((e) => <EventCard key={e.id} event={e} locale={locale} />)}</div></div>}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-mist/70 bg-white p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between"><button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="rounded-full border border-mist p-2 hover:border-finance" aria-label={t.common.previous}><ChevronLeft className="h-4 w-4" /></button><h2 className="font-display text-lg font-bold text-ink">{month.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", { month: "long", year: "numeric" })}</h2><button onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="rounded-full border border-mist p-2 hover:border-finance" aria-label={t.common.next}><ChevronRight className="h-4 w-4" /></button></div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-wider text-steel">{(locale === "fr" ? ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]).map((d) => <div key={d} className="py-1">{d}</div>)}</div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) => (
              <div key={i} className={cn("min-h-[72px] rounded-lg border p-1 text-xs sm:min-h-[96px]", d ? "border-mist/60" : "border-transparent")}>
                {d && <><span className="num text-steel">{d.getDate()}</span>{byDay(d).map((e) => <Link key={e.id} href={`/${locale}/events/${e.slug}`} className="mt-1 block truncate rounded bg-royal px-1.5 py-1 text-[10px] font-semibold text-white hover:bg-finance" title={pick(e, "title", locale)}>{pick(e, "title", locale)}</Link>)}</>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
