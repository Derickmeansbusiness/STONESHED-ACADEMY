"use client";
import Link from "next/link";
import { useActionState, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Circle, ChevronLeft, ChevronRight, Bookmark, BookmarkCheck, FlaskConical, PlayCircle, ListChecks, NotebookPen, FileText, Type, PanelRightClose, PanelRightOpen } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";
import { pick, pickArr } from "@/lib/i18n";
import { renderMarkdownLite, cn } from "@/lib/utils";
import { completeLessonAction, saveNoteAction, submitQuizAction, toggleBookmarkAction, type QuizResult } from "@/lib/actions/learning";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
import { StoryboardPlayer } from "@/components/tv/storyboard-player";
import type { VideoScript } from "@/lib/db/schema";

type Lesson = { id: string; slug: string; titleEn: string; titleFr: string; kind: string; durationMinutes: number; bodyEn: string; bodyFr: string; keyTakeawaysEn: string[]; keyTakeawaysFr: string[]; labSlug: string | null; videoId: string | null; moduleTitleEn: string; moduleTitleFr: string };
type Quiz = { id: string; titleEn: string; titleFr: string; kind: string; passMark: number; questions: { id: string; promptEn: string; promptFr: string; optionsEn: string[]; optionsFr: string[]; correctIndex: number; explanationEn: string; explanationFr: string }[] } | null;
type Video = { slug: string; titleEn: string; titleFr: string; script: VideoScript; mediaUrl: string | null; captionsVttUrl: string | null } | null;

export function LessonPlayer(props: {
  course: { id: string; slug: string; titleEn: string; titleFr: string; modules: { id: string; titleEn: string; titleFr: string; lessons: { id: string; slug: string; titleEn: string; titleFr: string; kind: string; durationMinutes: number }[] }[] };
  lesson: Lesson; quiz: Quiz; video: Video; prev: { slug: string } | null; next: { slug: string } | null;
  doneIds: string[]; bookmarked: boolean; note: string; completed: boolean; progressPct: number; index: number; total: number;
}) {
  const { locale, t } = useLocale();
  const { course, lesson, quiz, video, prev, next } = props;
  const [tab, setTab] = useState<"modules" | "notes" | "quiz" | "resources">(quiz && !props.completed ? "modules" : "modules");
  const [panel, setPanel] = useState(true);
  const [textSize, setTextSize] = useState<"md" | "lg">("md");
  const path = `/${locale}/learn/${course.slug}/${lesson.slug}`;
  const html = renderMarkdownLite(pick(lesson, "body", locale));
  const takeaways = pickArr<Lesson, string>(lesson, "keyTakeaways", locale);
  const done = new Set(props.doneIds);

  return (
    <div className="flex min-h-screen flex-col bg-porcelain">
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-mist bg-white/90 px-4 backdrop-blur">
        <Link href={`/${locale}/learn/${course.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-steel hover:text-royal"><ChevronLeft className="h-4 w-4" />{pick(course, "title", locale)}</Link>
        <div className="ml-auto hidden items-center gap-3 sm:flex">
          <div className="w-40"><div className="mb-0.5 flex justify-between text-[10px] text-steel"><span>{t.learn.courseProgress}</span><span className="num">{props.progressPct}%</span></div><div className="h-1 rounded-full bg-mist"><div className="h-full rounded-full bg-finance" style={{ width: `${props.progressPct}%` }} /></div></div>
          <button onClick={() => setTextSize((s) => (s === "md" ? "lg" : "md"))} className="rounded-full border border-mist p-2 text-steel hover:border-finance" aria-label={t.learn.readingSpeed}><Type className="h-4 w-4" /></button>
          <button onClick={() => setPanel((p) => !p)} className="rounded-full border border-mist p-2 text-steel hover:border-finance lg:inline-flex" aria-label="panel">{panel ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}</button>
        </div>
        <Link href={`/${locale}`} className="ml-2 sm:ml-0"><Logo compact /></Link>
      </header>

      <div className={cn("mx-auto grid w-full max-w-[90rem] flex-1 gap-0 lg:grid-cols-[1fr_380px]", !panel && "lg:grid-cols-1")}>
        <main className="px-5 py-8 sm:px-10 lg:py-12">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow mb-2">{pick(lesson, "moduleTitle", locale)} · {t.common.lesson} {props.index + 1}/{props.total}</p>
            <h1 className="display-md text-ink">{pick(lesson, "title", locale)}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-steel">
              <Badge tone="gray">{lesson.durationMinutes} {t.common.minutes}</Badge>
              {props.completed && <Badge tone="green"><CheckCircle2 className="h-3 w-3" />{t.learn.completedLesson}</Badge>}
              <form action={toggleBookmarkAction} className="ml-auto"><input type="hidden" name="lessonId" value={lesson.id} /><input type="hidden" name="courseId" value={course.id} /><input type="hidden" name="path" value={path} />
                <button className="inline-flex items-center gap-1 rounded-full border border-mist bg-white px-3 py-1.5 text-xs font-semibold text-steel hover:border-finance">{props.bookmarked ? <BookmarkCheck className="h-3.5 w-3.5 text-finance" /> : <Bookmark className="h-3.5 w-3.5" />}{props.bookmarked ? t.learn.bookmarked : t.learn.bookmark}</button>
              </form>
            </div>

            {video && (
              <div className="mt-8">
                <StoryboardPlayer script={video.script} mediaUrl={video.mediaUrl} captionsVttUrl={video.captionsVttUrl} seed={video.slug} title={pick(video, "title", locale)} />
                <p className="mt-2 text-xs text-steel">{t.tv.storyboardNotice}</p>
              </div>
            )}

            {lesson.labSlug && (
              <Link href={`/${locale}/lab/${lesson.labSlug}`} className="mt-8 flex items-center gap-4 rounded-2xl border border-sky/40 bg-sky/10 p-4 transition hover:border-finance">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal text-white"><FlaskConical className="h-5 w-5" /></span>
                <span><span className="block font-display font-bold text-ink">{t.learn.openLab}</span><span className="text-sm text-steel">{t.nav.lab}</span></span>
                <ChevronRight className="ml-auto h-5 w-5 text-finance" />
              </Link>
            )}

            <article className={cn("prose-sa mt-8", textSize === "lg" && "text-[19px] leading-[1.8]")} dangerouslySetInnerHTML={{ __html: html }} />

            {takeaways.length > 0 && (
              <div className="mt-10 rounded-2xl bg-royal p-6 text-white sm:p-8">
                <p className="eyebrow-light mb-3">{t.learn.keyTakeaways}</p>
                <ul className="space-y-2.5">{takeaways.map((k) => <li key={k} className="flex gap-3 text-[15px] leading-relaxed"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky" />{k}</li>)}</ul>
              </div>
            )}

            {quiz && <QuizBlock quiz={quiz} locale={locale} />}

            <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-mist pt-8">
              {prev ? <Button href={`/${locale}/learn/${course.slug}/${prev.slug}`} variant="outline"><ChevronLeft className="h-4 w-4" />{t.learn.prevLesson}</Button> : <span />}
              <form action={completeLessonAction}>
                <input type="hidden" name="lessonId" value={lesson.id} /><input type="hidden" name="courseId" value={course.id} /><input type="hidden" name="locale" value={locale} /><input type="hidden" name="courseSlug" value={course.slug} /><input type="hidden" name="lessonSlug" value={lesson.slug} />{next && <input type="hidden" name="nextSlug" value={next.slug} />}
                <Button type="submit">{props.completed ? (next ? t.learn.nextLesson : t.learn.courseComplete) : t.learn.markComplete}<ChevronRight className="h-4 w-4" /></Button>
              </form>
            </div>
          </div>
        </main>

        <AnimatePresence initial={false}>
          {panel && (
            <motion.aside initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border-t border-mist bg-white lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:overflow-y-auto lg:border-t-0 lg:border-l thin-scroll">
              <div className="flex border-b border-mist">
                {([["modules", ListChecks], ["notes", NotebookPen], ["quiz", FileText], ["resources", PlayCircle]] as const).map(([k, Icon]) => (
                  <button key={k} onClick={() => setTab(k)} className={cn("flex flex-1 items-center justify-center gap-1.5 py-3 text-xs font-semibold transition", tab === k ? "border-b-2 border-finance text-royal" : "text-steel hover:text-royal")}><Icon className="h-4 w-4" />{k === "modules" ? t.learn.syllabus : k === "notes" ? t.learn.notes : k === "quiz" ? t.learn.transcript : t.learn.resources}</button>
                ))}
              </div>
              <div className="p-4">
                {tab === "modules" && (
                  <ol className="space-y-4">
                    {course.modules.map((m, mi) => (
                      <li key={m.id}>
                        <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-steel">0{mi + 1} · {pick(m, "title", locale)}</p>
                        <ul className="space-y-0.5">
                          {m.lessons.map((l) => {
                            const on = l.id === lesson.id;
                            return (
                              <li key={l.id}>
                                <Link href={`/${locale}/learn/${course.slug}/${l.slug}`} className={cn("flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition", on ? "bg-royal text-white" : "text-slate hover:bg-cloud")} aria-current={on ? "page" : undefined}>
                                  {done.has(l.id) ? <CheckCircle2 className={cn("h-4 w-4 shrink-0", on ? "text-sky" : "text-success")} /> : <Circle className={cn("h-4 w-4 shrink-0", on ? "text-white/60" : "text-mist")} />}
                                  <span className="flex-1 leading-snug">{pick(l, "title", locale)}</span>
                                  <span className={cn("num text-[11px]", on ? "text-white/70" : "text-steel")}>{l.durationMinutes}′</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    ))}
                  </ol>
                )}
                {tab === "notes" && (
                  <form action={saveNoteAction} className="space-y-3">
                    <input type="hidden" name="lessonId" value={lesson.id} /><input type="hidden" name="path" value={path} />
                    <textarea name="body" defaultValue={props.note} placeholder={t.learn.notesPlaceholder} className="min-h-[260px] w-full rounded-xl border border-mist p-3 text-sm outline-none focus:border-finance" />
                    <Button type="submit" size="sm">{t.common.save}</Button>
                  </form>
                )}
                {tab === "quiz" && (
                  <div className="space-y-3 text-sm text-slate">
                    {video ? video.script.scenes.map((s, i) => <p key={i}><span className="font-semibold text-ink">{s.title[locale]}. </span>{s.narration[locale]}</p>) : <div className="prose-sa text-[14px]" dangerouslySetInnerHTML={{ __html: html }} />}
                  </div>
                )}
                {tab === "resources" && (
                  <ul className="space-y-2 text-sm">
                    {lesson.labSlug && <li><Link href={`/${locale}/lab/${lesson.labSlug}`} className="flex items-center gap-2 rounded-xl border border-mist p-3 hover:border-finance"><FlaskConical className="h-4 w-4 text-finance" />{t.learn.openLab}</Link></li>}
                    {video && <li><Link href={`/${locale}/tv/${video.slug}`} className="flex items-center gap-2 rounded-xl border border-mist p-3 hover:border-finance"><PlayCircle className="h-4 w-4 text-finance" />{t.learn.watchVideo}</Link></li>}
                    <li><Link href={`/${locale}/insights/glossary`} className="flex items-center gap-2 rounded-xl border border-mist p-3 hover:border-finance"><FileText className="h-4 w-4 text-finance" />{t.insights.glossary}</Link></li>
                    <li><a href={`/api/courses/${course.slug}/summary?locale=${locale}`} className="flex items-center gap-2 rounded-xl border border-mist p-3 hover:border-finance"><FileText className="h-4 w-4 text-finance" />{locale === "fr" ? "Résumé du cours" : "Course summary"}</a></li>
                  </ul>
                )}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function QuizBlock({ quiz, locale }: { quiz: NonNullable<Quiz>; locale: "en" | "fr" }) {
  const { t } = useLocale();
  const [result, formAction, pending] = useActionState<QuizResult, FormData>(submitQuizAction, null);
  const [key, setKey] = useState(0);
  return (
    <section className="mt-12 rounded-3xl border border-mist/70 bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8" aria-labelledby="quiz-title">
      <p className="eyebrow mb-2">{quiz.kind === "assessment" ? t.learn.assessment : t.learn.knowledgeCheck}</p>
      <h2 id="quiz-title" className="display-sm text-ink">{pick(quiz, "title", locale)}</h2>
      <form key={key} action={formAction} className="mt-6 space-y-8">
        <input type="hidden" name="quizId" value={quiz.id} /><input type="hidden" name="locale" value={locale} />
        {quiz.questions.map((q, qi) => {
          const opts = locale === "fr" ? q.optionsFr : q.optionsEn;
          const answered = result ? result.answers[qi] : -1;
          return (
            <fieldset key={q.id} disabled={!!result}>
              <legend className="font-display text-[16px] font-bold text-ink"><span className="num mr-2 text-steel">{qi + 1}.</span>{pick(q, "prompt", locale)}</legend>
              <div className="mt-3 space-y-2">
                {opts.map((o, oi) => {
                  const isCorrect = result && oi === q.correctIndex;
                  const isChosenWrong = result && answered === oi && oi !== q.correctIndex;
                  return (
                    <label key={oi} className={cn("flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-[15px] transition", isCorrect ? "border-success bg-success/10" : isChosenWrong ? "border-danger bg-danger/10" : "border-mist hover:border-sky")}>
                      <input type="radio" name={`q_${q.id}`} value={oi} required className="mt-1 accent-finance" />
                      <span>{o}</span>
                    </label>
                  );
                })}
              </div>
              {result && <p className={cn("mt-3 rounded-xl px-4 py-3 text-sm", result.correct[qi] ? "bg-success/10 text-success" : "bg-amber/10 text-[#5c3d03]")}>{pick(q, "explanation", locale)}</p>}
            </fieldset>
          );
        })}
        {!result ? (
          <Button type="submit" disabled={pending}>{t.learn.submitQuiz}</Button>
        ) : (
          <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-cloud/70 p-5">
            <div><p className="text-xs font-semibold uppercase tracking-wider text-steel">{t.learn.score}</p><p className="num font-display text-3xl font-extrabold text-ink">{result.scorePct}%</p></div>
            <p className={cn("font-semibold", result.passed ? "text-success" : "text-[#8a5d05]")}>{result.passed ? t.learn.passed : t.learn.notPassed}</p>
            <Button type="button" variant="outline" size="sm" className="ml-auto" onClick={() => setKey((k) => k + 1)}>{t.learn.retake}</Button>
          </div>
        )}
      </form>
    </section>
  );
}
