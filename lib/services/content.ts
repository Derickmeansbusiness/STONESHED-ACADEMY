import { and, asc, desc, eq, gte, inArray } from "drizzle-orm";
import { db, schema } from "@/lib/db";

export async function listCourses(opts: { featuredOnly?: boolean; category?: string } = {}) {
  const where = [eq(schema.courses.status, "published")];
  if (opts.featuredOnly) where.push(eq(schema.courses.featured, true));
  if (opts.category) where.push(eq(schema.courses.category, opts.category));
  const rows = await db.query.courses.findMany({ where: and(...where), orderBy: [asc(schema.courses.sortOrder)], with: { instructor: true, modules: { with: { lessons: true } } } });
  return rows.map((c) => ({ ...c, lessonCount: c.modules.reduce((n, m) => n + m.lessons.length, 0) }));
}

export async function getCourse(slug: string) {
  const course = await db.query.courses.findFirst({
    where: eq(schema.courses.slug, slug),
    with: { instructor: true, modules: { orderBy: [asc(schema.courseModules.sortOrder)], with: { lessons: { orderBy: [asc(schema.lessons.sortOrder)] } } } },
  });
  return course ?? null;
}

export async function getLesson(courseSlug: string, lessonSlug: string) {
  const course = await getCourse(courseSlug);
  if (!course) return null;
  const flat = course.modules.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleTitleEn: m.titleEn, moduleTitleFr: m.titleFr })));
  const idx = flat.findIndex((l) => l.slug === lessonSlug);
  if (idx < 0) return null;
  const lesson = flat[idx];
  const quiz = await db.query.quizzes.findFirst({ where: eq(schema.quizzes.lessonId, lesson.id), with: { questions: { orderBy: [asc(schema.questions.sortOrder)] } } });
  return { course, lesson, quiz: quiz ?? null, prev: flat[idx - 1] ?? null, next: flat[idx + 1] ?? null, flat, index: idx };
}

export async function listSeries() {
  return db.query.videoSeries.findMany({ orderBy: [asc(schema.videoSeries.sortOrder)], with: { videos: { orderBy: [asc(schema.videos.sortOrder)] } } });
}

export async function listVideos(opts: { limit?: number } = {}) {
  return db.query.videos.findMany({ orderBy: [asc(schema.videos.sortOrder)], with: { series: true }, limit: opts.limit });
}

export async function getVideo(slug: string) {
  return db.query.videos.findFirst({ where: eq(schema.videos.slug, slug), with: { series: { with: { videos: { orderBy: [asc(schema.videos.sortOrder)] } } } } }) ?? null;
}

export async function listEvents(opts: { upcomingOnly?: boolean; limit?: number } = {}) {
  const where = opts.upcomingOnly ? gte(schema.events.startsAt, new Date().toISOString()) : undefined;
  return db.query.events.findMany({ where, orderBy: [asc(schema.events.startsAt)], limit: opts.limit, with: { registrations: true } });
}

export async function getEvent(slug: string) {
  return db.query.events.findFirst({ where: eq(schema.events.slug, slug), with: { registrations: true } }) ?? null;
}

export async function listArticles(opts: { limit?: number } = {}) {
  return db.query.articles.findMany({ where: eq(schema.articles.status, "published"), orderBy: [desc(schema.articles.publishedAt)], limit: opts.limit });
}

export async function getArticle(slug: string) {
  return db.query.articles.findFirst({ where: eq(schema.articles.slug, slug) }) ?? null;
}

export async function listGlossary() {
  return db.query.glossaryTerms.findMany({ orderBy: [asc(schema.glossaryTerms.termEn)] });
}

export async function listFunds() {
  const funds = await db.query.fundProducts.findMany({ orderBy: [asc(schema.fundProducts.sortOrder)], with: { versions: { orderBy: [desc(schema.fundDataVersions.createdAt)] }, documents: true } });
  return funds.map((f) => ({ ...f, current: f.versions.find((v) => v.publicationStatus === "approved") ?? f.versions[0] ?? null }));
}

export async function getFund(slug: string) {
  const funds = await listFunds();
  return funds.find((f) => f.slug === slug) ?? null;
}

export async function listFlags(fundId?: string) {
  return db.query.fundDataFlags.findMany({ where: fundId ? eq(schema.fundDataFlags.fundId, fundId) : undefined, orderBy: [desc(schema.fundDataFlags.createdAt)] });
}

export async function coursesBySlugs(slugs: string[]) {
  if (!slugs.length) return [];
  return db.query.courses.findMany({ where: inArray(schema.courses.slug, slugs), with: { instructor: true, modules: { with: { lessons: true } } } });
}
