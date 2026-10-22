import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { and, desc, eq, inArray } from "drizzle-orm";
import { ArrowRight, Award, Bookmark, CalendarDays, Flame, NotebookPen, PlayCircle, Sparkles, TrendingUp } from "lucide-react";
import { getDictionary, pick, formatDate, type Locale } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db";
import { listUserEnrollments, userLessonStats } from "@/lib/services/learning";
import { listCourses } from "@/lib/services/content";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/components/cards/course-card";
import { VideoCard } from "@/components/cards/video-card";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { Notice } from "@/components/ui/notice";

export const metadata: Metadata = { title: "My Learning" };

export default async function DashboardPage({ params, searchParams }: { params: Promise<{ locale: Locale }>; searchParams: Promise<{ welcome?: string }> }) {
  const { locale } = await params;
  const { welcome } = await searchParams;
  const t = getDictionary(locale);
  const user = await getSession();
  if (!user) redirect(`/${locale}/signin?next=${encodeURIComponent(`/${locale}/dashboard`)}`);
  const [profile, enrollments, stats, registrations, videoProgress, notes, bookmarks, allCourses] = await Promise.all([
    db.query.learnerProfiles.findFirst({ where: eq(schema.learnerProfiles.userId, user.id) }),
    listUserEnrollments(user.id),
    userLessonStats(user.id),
    db.query.eventRegistrations.findMany({ where: and(eq(schema.eventRegistrations.userId, user.id)), with: { event: true } }),
    db.query.videoProgress.findMany({ where: eq(schema.videoProgress.userId, user.id), orderBy: [desc(schema.videoProgress.updatedAt)] }),
    db.query.lessonNotes.findMany({ where: eq(schema.lessonNotes.userId, user.id), orderBy: [desc(schema.lessonNotes.updatedAt)], limit: 5, with: { lesson: { with: { course: true } } } }),
    db.query.lessonProgress.findMany({ where: and(eq(schema.lessonProgress.userId, user.id), eq(schema.lessonProgress.bookmarked, true)), with: { lesson: { with: { course: true } } } }),
    listCourses(),
  ]);
  if (!profile?.onboardedAt && user.role === "learner") redirect(`/${locale}/onboarding`);
  const videoIds = videoProgress.filter((v) => v.positionSeconds > 0 && !v.completed).map((v) => v.videoId);
  const continueVideos = videoIds.length ? await db.query.videos.findMany({ where: inArray(schema.videos.id, videoIds), with: { series: true } }) : [];
  const savedVideos = videoProgress.filter((v) => v.saved).map((v) => v.videoId);
  const saved = savedVideos.length ? await db.query.videos.findMany({ where: inArray(schema.videos.id, savedVideos), with: { series: true } }) : [];
  const active = enrollments.filter((e) => e.status === "active");
  const overall = enrollments.length ? Math.round(enrollments.reduce((s, e) => s + e.progressPct, 0) / enrollments.length) : 0;
  const upcoming = registrations.filter((r) => r.status !== "cancelled" && new Date(r.event.endsAt) > new Date()).sort((a, b) => a.event.startsAt.localeCompare(b.event.startsAt));
  const enrolledIds = new Set(enrollments.map((e) => e.courseId));
  const interests = profile?.interests ?? [];
  const interestCats: Record<string, string[]> = { money: ["foundations"], investing: ["investment"], funds: ["funds"], wealth: ["wealth"], markets: ["cemac"], treasury: ["business"], professional: ["research", "business"] };
  const wanted = new Set(interests.flatMap((i) => interestCats[i] ?? []));
  const pool = allCourses.filter((c) => !enrolledIds.has(c.id) && c.lessonCount > 0);
  const preferred = pool.filter((c) => wanted.size === 0 || wanted.has(c.category));
  const recommended = [...preferred, ...pool.filter((c) => !preferred.includes(c))].slice(0, 3);
  const levelLabel = profile?.knowledgeLevel ? t.common[profile.knowledgeLevel as "beginner"] : t.common.beginner;
  const nextLevel = stats.lessonsDone >= 20 ? t.common.advanced : stats.lessonsDone >= 8 ? t.common.intermediate : t.common.beginner;

  return (
    <div className="pt-28 pb-12">
      <Container>
        {welcome && <Notice tone="compliance" className="mb-6" title={t.onboarding.resultTitle}>{t.onboarding.resultSub}</Notice>}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><p className="eyebrow mb-2">{t.nav.myLearning}</p><h1 className="display-md text-ink">{t.dashboard.welcome}, {user.fullName.split(" ")[0]}.</h1><p className="mt-2 text-steel">{t.dashboard.sub}</p></div>
          <div className="flex items-center gap-3 rounded-2xl border border-mist/70 bg-white px-5 py-3"><Flame className="h-5 w-5 text-amber" /><div><p className="num font-display text-xl font-extrabold text-ink">{profile?.streakDays ?? 0} <span className="text-sm font-semibold text-steel">{t.dashboard.days}</span></p><p className="text-[10px] uppercase tracking-wider text-steel">{t.dashboard.streak}</p></div></div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_2fr]">
          <div className="rounded-3xl bg-royal p-6 text-white sm:p-8">
            <p className="eyebrow-light">{t.dashboard.progress}</p>
            <div className="mt-4 flex items-center gap-6"><ProgressRing value={overall} /><div className="space-y-3 text-sm"><div><p className="text-white/60">{t.dashboard.lessonsDone}</p><p className="num font-display text-2xl font-extrabold">{stats.lessonsDone}</p></div><div><p className="text-white/60">{t.dashboard.coursesDone}</p><p className="num font-display text-2xl font-extrabold">{enrollments.filter((e) => e.status === "completed").length}</p></div><div><p className="text-white/60">{t.dashboard.quizAvg}</p><p className="num font-display text-2xl font-extrabold">{stats.quizAvg !== null ? `${stats.quizAvg}%` : "—"}</p></div></div></div>
            <div className="mt-6 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-sm"><span className="text-white/70">{t.dashboard.level}</span><span className="font-semibold">{levelLabel} → {nextLevel}</span></div>
          </div>
          <div>
            <div className="mb-4 flex items-center justify-between"><h2 className="display-sm text-ink">{t.dashboard.active}</h2><Link href={`/${locale}/learn`} className="text-sm font-semibold text-finance hover:underline">{t.common.viewAll}</Link></div>
            {active.length === 0 ? <div className="rounded-2xl border border-dashed border-mist bg-white p-8 text-center text-steel">{t.dashboard.noCourses}<div className="mt-4"><Button href={`/${locale}/learn`} size="sm">{t.nav.learn}</Button></div></div> : (
              <div className="grid gap-4 sm:grid-cols-2">{active.slice(0, 4).map((e) => {
                const lessons = e.course.modules.flatMap((m) => m.lessons);
                const last = lessons.find((l) => l.id === e.lastLessonId) ?? lessons[0];
                return (
                  <Link key={e.id} href={last ? `/${locale}/learn/${e.course.slug}/${last.slug}` : `/${locale}/learn/${e.course.slug}`} className="group rounded-2xl border border-mist/70 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
                    <p className="eyebrow mb-1 text-[10px]">{t.learn.categories[e.course.category as "foundations"]}</p>
                    <h3 className="font-display font-bold leading-snug text-ink group-hover:text-finance">{pick(e.course, "title", locale)}</h3>
                    <div className="mt-4 flex items-center gap-3"><div className="h-1.5 flex-1 rounded-full bg-mist"><div className="h-full rounded-full bg-finance" style={{ width: `${e.progressPct}%` }} /></div><span className="num text-xs font-semibold text-steel">{e.progressPct}%</span></div>
                    <p className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-finance">{t.common.resume}<ArrowRight className="h-3.5 w-3.5" /></p>
                  </Link>
                );
              })}</div>
            )}
          </div>
        </div>

        {continueVideos.length > 0 && <section className="mt-12"><h2 className="display-sm mb-4 flex items-center gap-2 text-ink"><PlayCircle className="h-5 w-5 text-finance" />{t.dashboard.continueWatching}</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{continueVideos.map((v) => <VideoCard key={v.id} video={v} locale={locale} />)}</div></section>}

        {recommended.length > 0 && <section className="mt-12"><h2 className="display-sm mb-4 flex items-center gap-2 text-ink"><Sparkles className="h-5 w-5 text-finance" />{t.dashboard.recommended}</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{recommended.map((c) => <CourseCard key={c.id} course={c} locale={locale} compact />)}</div></section>}

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <section className="surface p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-ink"><Award className="h-5 w-5 text-finance" />{t.dashboard.achievements}</h2>
            <ul className="grid grid-cols-2 gap-2">{Object.entries(t.dashboard.badges).map(([k, b]) => { const got = stats.badges.some((x) => x.badgeKey === k); return <li key={k} className={`rounded-xl border p-3 ${got ? "border-sky/50 bg-sky/10" : "border-mist/60 opacity-50"}`}><p className="text-sm font-bold text-ink">{b.title}</p><p className="text-[11px] text-steel">{b.body}</p></li>; })}</ul>
          </section>
          <section className="surface p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-ink"><Award className="h-5 w-5 text-finance" />{t.dashboard.certificates}</h2>
            {stats.certificates.length === 0 ? <p className="text-sm text-steel">{t.dashboard.noCerts}</p> : <ul className="space-y-2">{stats.certificates.map((c) => <li key={c.id}><Link href={`/${locale}/certificates/${c.id}`} className="flex items-center justify-between rounded-xl border border-mist p-3 text-sm hover:border-finance"><span><span className="block font-semibold text-ink">{c.courseTitle}</span><span className="num text-xs text-steel">{c.id} · {formatDate(c.issuedAt, locale)}</span></span><ArrowRight className="h-4 w-4 text-finance" /></Link></li>)}</ul>}
          </section>
          <section className="surface p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-ink"><CalendarDays className="h-5 w-5 text-finance" />{t.dashboard.upcoming}</h2>
            {upcoming.length === 0 ? <p className="text-sm text-steel">{t.dashboard.noEvents}</p> : <ul className="space-y-2">{upcoming.map((r) => <li key={r.id}><Link href={`/${locale}/events/${r.event.slug}`} className="flex items-center justify-between gap-3 rounded-xl border border-mist p-3 text-sm hover:border-finance"><span><span className="block font-semibold text-ink">{pick(r.event, "title", locale)}</span><span className="text-xs text-steel">{formatDate(r.event.startsAt, locale)}</span></span><Badge tone={r.status === "confirmed" ? "green" : "amber"}>{r.status === "confirmed" ? t.events.registered : t.events.waitlisted}</Badge></Link></li>)}</ul>}
          </section>
          <section className="surface p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-ink"><Bookmark className="h-5 w-5 text-finance" />{t.dashboard.saved}</h2>
            <ul className="space-y-2 text-sm">
              {bookmarks.map((b) => <li key={b.id}><Link href={`/${locale}/learn/${b.lesson.course.slug}/${b.lesson.slug}`} className="block rounded-xl border border-mist p-3 hover:border-finance"><span className="block font-semibold text-ink">{pick(b.lesson, "title", locale)}</span><span className="text-xs text-steel">{pick(b.lesson.course, "title", locale)}</span></Link></li>)}
              {saved.map((v) => <li key={v.id}><Link href={`/${locale}/tv/${v.slug}`} className="block rounded-xl border border-mist p-3 hover:border-finance"><span className="block font-semibold text-ink">{pick(v, "title", locale)}</span><span className="text-xs text-steel">{t.nav.tv}</span></Link></li>)}
              {bookmarks.length + saved.length === 0 && <li className="text-steel">—</li>}
            </ul>
          </section>
          <section className="surface p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-ink"><NotebookPen className="h-5 w-5 text-finance" />{t.dashboard.notes}</h2>
            <ul className="space-y-2 text-sm">{notes.map((n) => <li key={n.id}><Link href={`/${locale}/learn/${n.lesson.course.slug}/${n.lesson.slug}`} className="block rounded-xl border border-mist p-3 hover:border-finance"><span className="block text-xs font-semibold text-finance">{pick(n.lesson, "title", locale)}</span><span className="line-clamp-2 text-slate">{n.body}</span></Link></li>)}{notes.length === 0 && <li className="text-steel">—</li>}</ul>
          </section>
          <section className="surface p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-ink"><TrendingUp className="h-5 w-5 text-finance" />{t.dashboard.history}</h2>
            <ul className="space-y-2 text-sm">{enrollments.map((e) => <li key={e.id} className="flex items-center justify-between rounded-xl border border-mist p-3"><span><span className="block font-semibold text-ink">{pick(e.course, "title", locale)}</span><span className="text-xs text-steel">{formatDate(e.enrolledAt, locale)}</span></span><Badge tone={e.status === "completed" ? "green" : "sky"}>{e.status === "completed" ? t.common.completed : `${e.progressPct}%`}</Badge></li>)}</ul>
          </section>
        </div>
      </Container>
    </div>
  );
}
