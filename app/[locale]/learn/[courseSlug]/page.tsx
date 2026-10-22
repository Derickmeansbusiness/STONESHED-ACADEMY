import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, BookOpen, Globe, Award, CheckCircle2, Circle, Download, ArrowRight, PlayCircle } from "lucide-react";
import { getDictionary, pick, pickArr, type Locale } from "@/lib/i18n";
import { getCourse, listCourses } from "@/lib/services/content";
import { getSession } from "@/lib/auth/session";
import { getEnrollment, getCourseProgress } from "@/lib/services/learning";
import { enrollAction } from "@/lib/actions/learning";
import { db, schema } from "@/lib/db";
import { and, eq } from "drizzle-orm";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CoverArt } from "@/components/ui/cover-art";
import { Notice } from "@/components/ui/notice";
import { CourseCard } from "@/components/cards/course-card";
import { FilmModal } from "@/components/home/film-modal";

export default async function CoursePage({ params, searchParams }: { params: Promise<{ locale: Locale; courseSlug: string }>; searchParams: Promise<{ completed?: string }> }) {
  const { locale, courseSlug } = await params;
  const { completed } = await searchParams;
  const t = getDictionary(locale);
  const course = await getCourse(courseSlug);
  if (!course) notFound();
  const user = await getSession();
  const enrollment = user ? await getEnrollment(user.id, course.id) : null;
  const progress = user ? await getCourseProgress(user.id, course.id) : [];
  const doneIds = new Set(progress.filter((p) => p.completed).map((p) => p.lessonId));
  const cert = user ? await db.query.certificates.findFirst({ where: and(eq(schema.certificates.userId, user.id), eq(schema.certificates.courseId, course.id)) }) : null;
  const related = (await listCourses({ category: course.category })).filter((c) => c.id !== course.id).slice(0, 3);
  const lessons = course.modules.flatMap((m) => m.lessons);
  const level = t.common[course.level as "beginner"];
  const intro = [
    { title: locale === "fr" ? "Introduction" : "Introduction", visual: locale === "fr" ? "Titre du cours sur fond bleu, animation du logo de l'Academy." : "Course title on a blue field; Academy mark animates in.", narration: pick(course, "summary", locale), seconds: 6 },
    { title: locale === "fr" ? "Ce que vous apprendrez" : "What you will learn", visual: locale === "fr" ? "Les objectifs apparaissent un à un." : "Outcomes appear one by one.", narration: pickArr<typeof course, string>(course, "outcomes", locale).slice(0, 3).join(" · "), seconds: 8 },
    { title: locale === "fr" ? "Votre formateur" : "Your instructor", visual: locale === "fr" ? "Portrait stylisé du formateur et son titre." : "Stylised instructor portrait and title.", narration: course.instructor ? `${course.instructor.name} — ${pick(course.instructor, "title", locale)}` : "", seconds: 5 },
  ];

  return (
    <div className="pb-12">
      <section className="relative overflow-hidden bg-midnight pt-32 pb-16 text-white">
        <div className="absolute inset-0 opacity-50"><CoverArt seed={course.slug} theme={course.coverTheme} /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/85 to-midnight/30" />
        <Container className="relative">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge tone="white">{t.learn.categories[course.category as "foundations"]}</Badge>
              <Badge tone="white">{level}</Badge>
              <Badge tone="white">{course.isFree ? t.common.free : t.common.paid}</Badge>
            </div>
            <h1 className="display-lg text-white">{pick(course, "title", locale)}</h1>
            <p className="mt-5 text-lg text-white/75">{pick(course, "summary", locale)}</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" />{course.durationMinutes} {t.common.minutes}</span>
              <span className="inline-flex items-center gap-1.5"><BookOpen className="h-4 w-4" />{course.modules.length} {t.learn.modules} · {lessons.length} {t.common.lessons}</span>
              <span className="inline-flex items-center gap-1.5"><Globe className="h-4 w-4" />{course.languages.map((l) => l.toUpperCase()).join(" / ")}</span>
              {course.certificateEligible && <span className="inline-flex items-center gap-1.5"><Award className="h-4 w-4" />{t.cert.title}</span>}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {lessons.length > 0 ? (
                <form action={enrollAction}>
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="courseSlug" value={course.slug} />
                  <Button size="lg" variant="light" type="submit">
                    {enrollment ? (enrollment.progressPct > 0 ? t.common.resume : t.common.startCourse) : user ? t.common.enroll : t.learn.signInToEnroll} <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <Button size="lg" variant="light" href={`/${locale}/learn`}>{t.common.back}</Button>
              )}
              <FilmModal frames={intro} label={locale === "fr" ? "Vidéo d'introduction" : "Introduction video"} trigger="outline" />
            </div>
            {enrollment && (
              <div className="mt-6 max-w-sm">
                <div className="mb-1 flex justify-between text-xs text-white/70"><span>{t.learn.courseProgress}</span><span className="num">{enrollment.progressPct}%</span></div>
                <div className="h-1.5 rounded-full bg-white/20"><div className="h-full rounded-full bg-sky transition-all" style={{ width: `${enrollment.progressPct}%` }} /></div>
              </div>
            )}
          </div>
        </Container>
      </section>

      <Container className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-12">
          {completed && cert && (
            <Notice tone="compliance" title={t.learn.courseComplete}>
              {t.learn.certificateReady} <Link href={`/${locale}/certificates/${cert.id}`} className="font-semibold text-finance underline">{t.learn.viewCertificate}</Link>
            </Notice>
          )}
          {lessons.length === 0 && <Notice tone="demo">{t.learn.comingSoon}</Notice>}
          <section>
            <h2 className="display-sm text-ink">{t.learn.outcomes}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {pickArr<typeof course, string>(course, "outcomes", locale).map((o) => <li key={o} className="flex gap-3 rounded-xl border border-mist/70 bg-white p-4 text-[15px] text-slate"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />{o}</li>)}
            </ul>
          </section>
          <section className="prose-sa">
            {pick(course, "description", locale).split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
          </section>
          {lessons.length > 0 && (
            <section>
              <h2 className="display-sm text-ink">{t.learn.syllabus}</h2>
              <div className="mt-5 space-y-4">
                {course.modules.map((m, mi) => (
                  <div key={m.id} className="overflow-hidden rounded-2xl border border-mist/70 bg-white">
                    <div className="flex items-center gap-3 border-b border-mist/60 bg-cloud/50 px-5 py-3"><span className="num text-xs font-bold text-steel">0{mi + 1}</span><h3 className="font-display font-bold text-ink">{pick(m, "title", locale)}</h3></div>
                    <ul>
                      {m.lessons.map((l) => {
                        const done = doneIds.has(l.id);
                        return (
                          <li key={l.id} className="border-b border-mist/40 last:border-0">
                            <Link href={enrollment ? `/${locale}/learn/${course.slug}/${l.slug}` : `#enroll`} className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-porcelain">
                              {done ? <CheckCircle2 className="h-4 w-4 text-success" /> : l.kind === "video" ? <PlayCircle className="h-4 w-4 text-steel" /> : <Circle className="h-4 w-4 text-mist" />}
                              <span className={done ? "text-steel line-through" : "text-slate"}>{pick(l, "title", locale)}</span>
                              <span className="num ml-auto text-xs text-steel">{l.durationMinutes} {t.common.minutes}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {course.instructor && (
            <div className="surface p-6">
              <p className="eyebrow mb-3">{t.learn.aboutInstructor}</p>
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-royal font-display text-sm font-bold text-white">{course.instructor.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}</span>
                <div><p className="font-display font-bold text-ink">{course.instructor.name}</p><p className="text-xs text-steel">{pick(course.instructor, "title", locale)}</p></div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-steel">{pick(course.instructor, "bio", locale)}</p>
            </div>
          )}
          <div className="surface p-6">
            <p className="eyebrow mb-3">{t.learn.prerequisites}</p>
            <p className="text-sm text-slate">{pick(course, "prerequisites", locale) || (locale === "fr" ? "Aucune connaissance préalable requise." : "No prior knowledge required.")}</p>
          </div>
          <div className="surface p-6">
            <p className="eyebrow mb-3">{t.learn.materials}</p>
            <ul className="space-y-2 text-sm">
              <li><a href={`/api/courses/${course.slug}/summary?locale=${locale}`} className="inline-flex items-center gap-2 text-finance hover:underline"><Download className="h-4 w-4" />{locale === "fr" ? "Résumé du cours (texte)" : "Course summary (text)"}</a></li>
              <li><Link href={`/${locale}/insights/glossary`} className="inline-flex items-center gap-2 text-finance hover:underline"><Download className="h-4 w-4" />{t.insights.glossary}</Link></li>
            </ul>
          </div>
        </aside>
      </Container>

      {related.length > 0 && (
        <Container className="mt-20">
          <h2 className="display-sm text-ink">{t.learn.related}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((c) => <CourseCard key={c.id} course={c} locale={locale} compact />)}</div>
        </Container>
      )}
    </div>
  );
}
