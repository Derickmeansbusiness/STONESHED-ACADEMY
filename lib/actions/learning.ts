"use server";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db, schema } from "@/lib/db";
import { newId } from "@/lib/ids";
import { getSession } from "@/lib/auth/session";
import { audit, track } from "@/lib/services/audit";
import { awardBadge, getEnrollment, recomputeProgress, touchStreak } from "@/lib/services/learning";
import { isLocale, type Locale } from "@/lib/i18n";

function loc(v: unknown): Locale { return isLocale(String(v)) ? (String(v) as Locale) : "en"; }

export async function enrollAction(form: FormData) {
  const locale = loc(form.get("locale"));
  const courseSlug = String(form.get("courseSlug") ?? "");
  const user = await getSession();
  if (!user) redirect(`/${locale}/signin?next=${encodeURIComponent(`/${locale}/learn/${courseSlug}`)}`);
  const course = await db.query.courses.findFirst({ where: eq(schema.courses.slug, courseSlug), with: { modules: { with: { lessons: true } } } });
  if (!course) redirect(`/${locale}/learn`);
  const existing = await getEnrollment(user.id, course.id);
  if (!existing) {
    await db.insert(schema.enrollments).values({ id: newId("enr"), userId: user.id, courseId: course.id });
    await audit({ actorId: user.id, actorRole: user.role, action: "course.enrolled", entityType: "course", entityId: course.id });
    await track({ userId: user.id, eventName: "course_enrolled", locale, properties: { courseSlug } });
  }
  const first = course.modules.sort((a, b) => a.sortOrder - b.sortOrder)[0]?.lessons.sort((a, b) => a.sortOrder - b.sortOrder)[0];
  const target = existing?.lastLessonId ? course.modules.flatMap((m) => m.lessons).find((l) => l.id === existing.lastLessonId) : first;
  revalidatePath(`/${locale}/learn/${courseSlug}`);
  redirect(target ? `/${locale}/learn/${courseSlug}/${target.slug}` : `/${locale}/learn/${courseSlug}`);
}

const completeSchema = z.object({ lessonId: z.string(), courseId: z.string(), locale: z.enum(["en", "fr"]), courseSlug: z.string(), lessonSlug: z.string(), nextSlug: z.string().optional() });

export async function completeLessonAction(form: FormData) {
  const user = await getSession();
  const d = completeSchema.parse(Object.fromEntries(form));
  if (!user) redirect(`/${d.locale}/signin`);
  const existing = await db.query.lessonProgress.findFirst({ where: and(eq(schema.lessonProgress.userId, user.id), eq(schema.lessonProgress.lessonId, d.lessonId)) });
  if (existing) await db.update(schema.lessonProgress).set({ completed: true, updatedAt: Math.floor(Date.now() / 1000) }).where(eq(schema.lessonProgress.id, existing.id));
  else await db.insert(schema.lessonProgress).values({ id: newId("lp"), userId: user.id, lessonId: d.lessonId, courseId: d.courseId, completed: true });
  await db.update(schema.enrollments).set({ lastLessonId: d.lessonId }).where(and(eq(schema.enrollments.userId, user.id), eq(schema.enrollments.courseId, d.courseId)));
  await track({ userId: user.id, eventName: "lesson_completed", locale: d.locale, properties: { lessonId: d.lessonId, courseId: d.courseId } });
  await awardBadge(user.id, "first_lesson");
  const doneCount = await db.query.lessonProgress.findMany({ where: and(eq(schema.lessonProgress.userId, user.id), eq(schema.lessonProgress.completed, true)) });
  if (doneCount.length >= 5) await awardBadge(user.id, "five_lessons");
  await touchStreak(user.id);
  const result = await recomputeProgress(user.id, d.courseId, d.locale);
  revalidatePath(`/${d.locale}/learn/${d.courseSlug}`);
  if (result?.status === "completed" && !d.nextSlug) redirect(`/${d.locale}/learn/${d.courseSlug}?completed=1`);
  redirect(`/${d.locale}/learn/${d.courseSlug}/${d.nextSlug ?? d.lessonSlug}`);
}

export async function toggleBookmarkAction(form: FormData) {
  const user = await getSession();
  const lessonId = String(form.get("lessonId")), courseId = String(form.get("courseId")), path = String(form.get("path"));
  if (!user) return;
  const existing = await db.query.lessonProgress.findFirst({ where: and(eq(schema.lessonProgress.userId, user.id), eq(schema.lessonProgress.lessonId, lessonId)) });
  if (existing) await db.update(schema.lessonProgress).set({ bookmarked: !existing.bookmarked }).where(eq(schema.lessonProgress.id, existing.id));
  else await db.insert(schema.lessonProgress).values({ id: newId("lp"), userId: user.id, lessonId, courseId, bookmarked: true });
  revalidatePath(path);
}

export async function saveNoteAction(form: FormData) {
  const user = await getSession();
  if (!user) return;
  const lessonId = String(form.get("lessonId")), body = String(form.get("body") ?? "").slice(0, 5000), path = String(form.get("path"));
  const existing = await db.query.lessonNotes.findFirst({ where: and(eq(schema.lessonNotes.userId, user.id), eq(schema.lessonNotes.lessonId, lessonId)) });
  if (existing) await db.update(schema.lessonNotes).set({ body, updatedAt: Math.floor(Date.now() / 1000) }).where(eq(schema.lessonNotes.id, existing.id));
  else await db.insert(schema.lessonNotes).values({ id: newId("note"), userId: user.id, lessonId, body });
  revalidatePath(path);
}

export async function recordLessonPositionAction(form: FormData) {
  const user = await getSession();
  if (!user) return;
  const lessonId = String(form.get("lessonId")), courseId = String(form.get("courseId"));
  const existing = await db.query.lessonProgress.findFirst({ where: and(eq(schema.lessonProgress.userId, user.id), eq(schema.lessonProgress.lessonId, lessonId)) });
  if (!existing) await db.insert(schema.lessonProgress).values({ id: newId("lp"), userId: user.id, lessonId, courseId });
  await db.update(schema.enrollments).set({ lastLessonId: lessonId }).where(and(eq(schema.enrollments.userId, user.id), eq(schema.enrollments.courseId, courseId)));
}

export type QuizResult = { scorePct: number; passed: boolean; correct: boolean[]; answers: number[] } | null;

export async function submitQuizAction(_prev: QuizResult, form: FormData): Promise<QuizResult> {
  const user = await getSession();
  const quizId = String(form.get("quizId"));
  const locale = loc(form.get("locale"));
  const quiz = await db.query.quizzes.findFirst({ where: eq(schema.quizzes.id, quizId), with: { questions: true } });
  if (!quiz) return null;
  const questions = [...quiz.questions].sort((a, b) => a.sortOrder - b.sortOrder);
  const answers = questions.map((q) => Number(form.get(`q_${q.id}`) ?? -1));
  const correct = questions.map((q, i) => answers[i] === q.correctIndex);
  const scorePct = Math.round((correct.filter(Boolean).length / questions.length) * 100);
  const passed = scorePct >= quiz.passMark;
  if (user) {
    await db.insert(schema.quizAttempts).values({ id: newId("qa"), userId: user.id, quizId, scorePct, passed, answers });
    await track({ userId: user.id, eventName: "quiz_attempted", locale, properties: { quizId, scorePct, passed, kind: quiz.kind } });
    if (scorePct >= 90 && quiz.kind === "assessment") await awardBadge(user.id, "quiz_master");
  }
  return { scorePct, passed, correct, answers };
}
