import { and, eq, inArray, desc } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { newId, certificateId } from "@/lib/ids";
import { audit, track } from "@/lib/services/audit";

export async function getEnrollment(userId: string, courseId: string) {
  return db.query.enrollments.findFirst({ where: and(eq(schema.enrollments.userId, userId), eq(schema.enrollments.courseId, courseId)) }) ?? null;
}

export async function listUserEnrollments(userId: string) {
  return db.query.enrollments.findMany({ where: eq(schema.enrollments.userId, userId), orderBy: [desc(schema.enrollments.enrolledAt)], with: { course: { with: { instructor: true, modules: { with: { lessons: true } } } } } });
}

export async function getCourseProgress(userId: string, courseId: string) {
  return db.query.lessonProgress.findMany({ where: and(eq(schema.lessonProgress.userId, userId), eq(schema.lessonProgress.courseId, courseId)) });
}

/** Recomputes enrollment progress; issues certificate and badges on completion. Returns the enrollment. */
export async function recomputeProgress(userId: string, courseId: string, locale: "en" | "fr") {
  const course = await db.query.courses.findFirst({ where: eq(schema.courses.id, courseId), with: { modules: { with: { lessons: true } } } });
  if (!course) return null;
  const lessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
  const done = lessonIds.length ? await db.query.lessonProgress.findMany({ where: and(eq(schema.lessonProgress.userId, userId), inArray(schema.lessonProgress.lessonId, lessonIds), eq(schema.lessonProgress.completed, true)) }) : [];
  const pct = lessonIds.length ? Math.round((done.length / lessonIds.length) * 100) : 0;
  const enrollment = await getEnrollment(userId, courseId);
  if (!enrollment) return null;
  const complete = pct === 100 && lessonIds.length > 0;
  await db.update(schema.enrollments).set({ progressPct: pct, status: complete ? "completed" : "active", completedAt: complete ? enrollment.completedAt ?? Math.floor(Date.now() / 1000) : null }).where(eq(schema.enrollments.id, enrollment.id));

  if (complete && course.certificateEligible) {
    const existing = await db.query.certificates.findFirst({ where: and(eq(schema.certificates.userId, userId), eq(schema.certificates.courseId, courseId)) });
    if (!existing) {
      const user = await db.query.users.findFirst({ where: eq(schema.users.id, userId) });
      const id = certificateId();
      await db.insert(schema.certificates).values({ id, userId, courseId, learnerName: user?.fullName ?? "", courseTitle: locale === "fr" ? course.titleFr : course.titleEn, locale });
      await audit({ actorId: userId, action: "certificate.issued", entityType: "certificate", entityId: id, metadata: { courseId } });
      await track({ userId, eventName: "course_completed", locale, properties: { courseId } });
      await awardBadge(userId, "first_course");
    }
  }
  return { ...enrollment, progressPct: pct, status: complete ? "completed" : "active" };
}

export async function awardBadge(userId: string, badgeKey: string) {
  const existing = await db.query.achievements.findFirst({ where: and(eq(schema.achievements.userId, userId), eq(schema.achievements.badgeKey, badgeKey)) });
  if (existing) return false;
  await db.insert(schema.achievements).values({ id: newId("bdg"), userId, badgeKey });
  return true;
}

export async function touchStreak(userId: string) {
  const profile = await db.query.learnerProfiles.findFirst({ where: eq(schema.learnerProfiles.userId, userId) });
  if (!profile) return;
  const today = new Date().toISOString().slice(0, 10);
  if (profile.lastActiveDate === today) return;
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  const streak = profile.lastActiveDate === yesterday ? profile.streakDays + 1 : 1;
  await db.update(schema.learnerProfiles).set({ streakDays: streak, lastActiveDate: today }).where(eq(schema.learnerProfiles.userId, userId));
  if (streak >= 7) await awardBadge(userId, "streak_7");
}

export async function userLessonStats(userId: string) {
  const [done, attempts, certs, badges] = await Promise.all([
    db.query.lessonProgress.findMany({ where: and(eq(schema.lessonProgress.userId, userId), eq(schema.lessonProgress.completed, true)) }),
    db.query.quizAttempts.findMany({ where: eq(schema.quizAttempts.userId, userId) }),
    db.query.certificates.findMany({ where: eq(schema.certificates.userId, userId), orderBy: [desc(schema.certificates.issuedAt)] }),
    db.query.achievements.findMany({ where: eq(schema.achievements.userId, userId), orderBy: [desc(schema.achievements.earnedAt)] }),
  ]);
  const avg = attempts.length ? Math.round(attempts.reduce((s, a) => s + a.scorePct, 0) / attempts.length) : null;
  return { lessonsDone: done.length, quizAvg: avg, certificates: certs, badges, attempts };
}
