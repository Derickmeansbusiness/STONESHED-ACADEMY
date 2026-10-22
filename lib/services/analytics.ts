import { count, desc, eq, gte, sql } from "drizzle-orm";
import { db, schema } from "@/lib/db";

export async function executiveMetrics() {
  const now = Math.floor(Date.now() / 1000);
  const d30 = now - 30 * 86400;
  const [users, active30, enrollments, completions, certs, events, regs, attendance, inquiries, partners, aiLogs, videoDone, labUsed, fundViews, consultations] = await Promise.all([
    db.select({ n: count() }).from(schema.users).where(eq(schema.users.role, "learner")),
    db.select({ n: sql<number>`count(distinct ${schema.analyticsEvents.userId})` }).from(schema.analyticsEvents).where(gte(schema.analyticsEvents.createdAt, d30)),
    db.select({ n: count() }).from(schema.enrollments),
    db.select({ n: count() }).from(schema.enrollments).where(eq(schema.enrollments.status, "completed")),
    db.select({ n: count() }).from(schema.certificates),
    db.select({ n: count() }).from(schema.events),
    db.select({ n: count() }).from(schema.eventRegistrations).where(eq(schema.eventRegistrations.status, "confirmed")),
    db.select({ n: count() }).from(schema.attendance),
    db.select({ n: count() }).from(schema.adviserInquiries),
    db.select({ n: count() }).from(schema.partnershipInquiries),
    db.select({ n: count() }).from(schema.aiLogRecords),
    db.select({ n: count() }).from(schema.analyticsEvents).where(eq(schema.analyticsEvents.eventName, "video_completed")),
    db.select({ n: count() }).from(schema.analyticsEvents).where(eq(schema.analyticsEvents.eventName, "lab_used")),
    db.select({ n: count() }).from(schema.analyticsEvents).where(eq(schema.analyticsEvents.eventName, "fund_page_view")),
    db.select({ n: count() }).from(schema.consultationRequests),
  ]);
  // quiz improvement: average of first vs last attempt per user/quiz
  const attempts = await db.query.quizAttempts.findMany({ orderBy: [schema.quizAttempts.attemptedAt] });
  const byKey = new Map<string, number[]>();
  for (const a of attempts) { const k = `${a.userId}:${a.quizId}`; byKey.set(k, [...(byKey.get(k) ?? []), a.scorePct]); }
  const multi = [...byKey.values()].filter((v) => v.length > 1);
  const improvement = multi.length ? Math.round(multi.reduce((s, v) => s + (v[v.length - 1] - v[0]), 0) / multi.length) : 0;
  // weekly series (12 weeks)
  const weeks: { week: string; registrations: number; lessons: number; videos: number }[] = [];
  for (let w = 11; w >= 0; w--) {
    const start = now - (w + 1) * 7 * 86400, end = now - w * 7 * 86400;
    const rows = await db.select({ name: schema.analyticsEvents.eventName, n: count() }).from(schema.analyticsEvents).where(sql`${schema.analyticsEvents.createdAt} >= ${start} and ${schema.analyticsEvents.createdAt} < ${end}`).groupBy(schema.analyticsEvents.eventName);
    const g = (k: string) => rows.find((r) => r.name === k)?.n ?? 0;
    weeks.push({ week: new Date(end * 1000).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }), registrations: g("registration"), lessons: g("lesson_completed"), videos: g("video_completed") });
  }
  const popular = await db.select({ courseId: schema.enrollments.courseId, n: count() }).from(schema.enrollments).groupBy(schema.enrollments.courseId).orderBy(desc(count())).limit(6);
  const courses = await db.query.courses.findMany();
  const localePref = await db.select({ locale: schema.users.locale, n: count() }).from(schema.users).groupBy(schema.users.locale);
  const audiences = await db.select({ audience: schema.learnerProfiles.audience, n: count() }).from(schema.learnerProfiles).groupBy(schema.learnerProfiles.audience);
  return {
    totals: { learners: users[0].n, active30: active30[0].n, enrollments: enrollments[0].n, completions: completions[0].n, certificates: certs[0].n, events: events[0].n, registrations: regs[0].n, attendance: attendance[0].n, adviserInquiries: inquiries[0].n, partnerInquiries: partners[0].n, aiQuestions: aiLogs[0].n, videoCompletions: videoDone[0].n, labSessions: labUsed[0].n, fundPageViews: fundViews[0].n, consultations: consultations[0].n, quizImprovement: improvement },
    weeks,
    popular: popular.map((p) => ({ title: courses.find((c) => c.id === p.courseId)?.titleEn ?? p.courseId, n: p.n })),
    localePref: localePref.map((l) => ({ name: l.locale.toUpperCase(), value: l.n })),
    audiences: audiences.filter((a) => a.audience).map((a) => ({ name: a.audience as string, value: a.n })),
  };
}
