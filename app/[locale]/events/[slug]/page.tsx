import { notFound } from "next/navigation";
import Link from "next/link";
import QRCode from "qrcode";
import { MapPin, Users, Video, Clock, UserRound, CheckCircle2 } from "lucide-react";
import { getDictionary, pick, pickArr, formatDate, formatTime, type Locale } from "@/lib/i18n";
import { getEvent } from "@/lib/services/content";
import { getSession } from "@/lib/auth/session";
import { registerEventAction, cancelRegistrationAction } from "@/lib/actions/events";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { CoverArt } from "@/components/ui/cover-art";
import { Input, Field } from "@/components/ui/form";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";

export default async function EventPage({ params, searchParams }: { params: Promise<{ locale: Locale; slug: string }>; searchParams: Promise<{ registered?: string }> }) {
  const { locale, slug } = await params;
  const { registered } = await searchParams;
  const t = getDictionary(locale);
  const [event, user] = await Promise.all([getEvent(slug), getSession()]);
  if (!event) notFound();
  const confirmed = event.registrations.filter((r) => r.status === "confirmed").length;
  const left = Math.max(0, event.capacity - confirmed);
  const mine = user ? event.registrations.find((r) => r.userId === user.id && r.status !== "cancelled") : null;
  const qr = mine ? await QRCode.toString(`SA-TICKET:${mine.ticketCode}`, { type: "svg", margin: 0, color: { dark: "#0B2F73", light: "#ffffff00" } }) : null;
  const course = event.postEventCourseSlug ? await db.query.courses.findFirst({ where: eq(schema.courses.slug, event.postEventCourseSlug) }) : null;
  const cat = t.events.categories[event.category as "university"] ?? event.category;
  const open = ["open", "waitlist"].includes(event.status) && new Date(event.endsAt) > new Date();
  return (
    <div className="pb-12">
      <section className="relative overflow-hidden bg-midnight pt-32 pb-14 text-white">
        <div className="absolute inset-0 opacity-40"><CoverArt seed={event.slug} theme={event.theme} /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/85 to-transparent" />
        <Container className="relative">
          <Link href={`/${locale}/events`} className="text-sm text-white/60 hover:text-white">← {t.nav.events}</Link>
          <div className="mt-4 flex flex-wrap gap-2"><Badge tone="white">{cat}</Badge>{event.isFictional && <Badge tone="white">{locale === "fr" ? "Événement de démonstration" : "Demonstration event"}</Badge>}</div>
          <h1 className="display-lg mt-4 max-w-4xl text-white">{pick(event, "title", locale)}</h1>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" />{formatDate(event.startsAt, locale, { weekday: "long" })} · {formatTime(event.startsAt, locale)}–{formatTime(event.endsAt, locale)}</span>
            <span className="inline-flex items-center gap-1.5">{event.format === "online" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}{event.format === "online" ? t.events.online : `${pick(event, "venue", locale)}${event.city ? `, ${event.city}` : ""}`}</span>
            <span className="inline-flex items-center gap-1.5"><UserRound className="h-4 w-4" />{event.speaker}</span>
            <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" />{left} {t.events.seatsLeft} / {event.capacity}</span>
          </div>
        </Container>
      </section>
      <Container className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-10">
          {registered && mine && <Notice tone="compliance" title={mine.status === "confirmed" ? t.events.registered : t.events.waitlisted}>{t.events.reminders}</Notice>}
          <div className="prose-sa">{pick(event, "overview", locale).split("\n\n").map((p, i) => <p key={i}>{p}</p>)}</div>
          <section><h2 className="display-sm text-ink">{t.events.audience}</h2><p className="mt-3 text-slate">{pick(event, "audience", locale)}</p></section>
          <section>
            <h2 className="display-sm text-ink">{t.events.schedule}</h2>
            <ol className="mt-5 space-y-2">{pickArr<typeof event, { time: string; item: string }>(event, "schedule", locale).map((s, i) => <li key={i} className="flex gap-4 rounded-xl border border-mist/70 bg-white p-4 text-sm"><span className="num w-24 shrink-0 font-semibold text-finance">{s.time}</span><span className="text-slate">{s.item}</span></li>)}</ol>
          </section>
          {course && <section className="rounded-2xl bg-cloud/60 p-6"><p className="eyebrow mb-2">{locale === "fr" ? "Parcours post-événement" : "Post-event learning pathway"}</p><Link href={`/${locale}/learn/${course.slug}`} className="font-display text-lg font-bold text-royal hover:underline">{pick(course, "title", locale)}</Link></section>}
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="surface p-6">
            {mine ? (
              <>
                <div className="flex items-center gap-2 text-success"><CheckCircle2 className="h-5 w-5" /><p className="font-display font-bold">{mine.status === "confirmed" ? t.events.registered : t.events.waitlisted}</p></div>
                {mine.status === "confirmed" && qr && (
                  <div className="mt-5 rounded-2xl border border-dashed border-mist p-5 text-center">
                    <p className="eyebrow">{t.events.ticket}</p>
                    <div className="mx-auto my-4 h-40 w-40" dangerouslySetInnerHTML={{ __html: qr }} />
                    <p className="num font-display text-lg font-extrabold tracking-widest text-ink">{mine.ticketCode}</p>
                    <p className="mt-1 text-xs text-steel">{t.events.ticketSub}</p>
                  </div>
                )}
                <p className="mt-4 text-xs text-steel">{t.events.reminders}</p>
                <form action={cancelRegistrationAction} className="mt-4"><input type="hidden" name="locale" value={locale} /><input type="hidden" name="slug" value={event.slug} /><Button type="submit" variant="ghost" size="sm" className="w-full text-danger hover:bg-danger/10">{t.events.cancel}</Button></form>
              </>
            ) : open ? (
              <form action={registerEventAction} className="space-y-4">
                <input type="hidden" name="locale" value={locale} /><input type="hidden" name="slug" value={event.slug} />
                <p className="font-display text-lg font-bold text-ink">{left > 0 ? t.events.register : t.events.waitlist}</p>
                <p className="text-sm text-steel">{left > 0 ? `${left} ${t.events.seatsLeft}` : t.events.full}</p>
                <Field label={t.events.affiliation}><Input name="affiliation" /></Field>
                <Button type="submit" className="w-full">{user ? (left > 0 ? t.events.register : t.events.waitlist) : t.common.requiresSignIn}</Button>
                <p className="text-xs text-steel">{locale === "fr" ? "Inscription gratuite. Billet QR disponible immédiatement dans votre espace." : "Free registration. Your QR ticket is available immediately in your dashboard."}</p>
              </form>
            ) : (
              <p className="font-display font-bold text-steel">{event.status === "completed" ? (locale === "fr" ? "Événement terminé" : "Event completed") : t.events.full}</p>
            )}
          </div>
        </aside>
      </Container>
    </div>
  );
}
