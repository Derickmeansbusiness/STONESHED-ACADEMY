import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { listCourses } from "@/lib/services/content";
import { getSession } from "@/lib/auth/session";
import { listUserEnrollments } from "@/lib/services/learning";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CourseCard } from "@/components/cards/course-card";
import { Reveal } from "@/components/ui/reveal";
import { CatalogFilters } from "@/components/learn/catalog-filters";

export const metadata: Metadata = { title: "Learn" };

const CATEGORY_ORDER = ["foundations", "investment", "funds", "cemac", "wealth", "business", "research"] as const;

export default async function LearnPage({ params, searchParams }: { params: Promise<{ locale: Locale }>; searchParams: Promise<{ level?: string; category?: string; q?: string }> }) {
  const { locale } = await params;
  const sp = await searchParams;
  const t = getDictionary(locale);
  const [courses, user] = await Promise.all([listCourses(), getSession()]);
  const enrollments = user ? await listUserEnrollments(user.id) : [];
  const progress = new Map(enrollments.map((e) => [e.courseId, e.progressPct]));
  const q = (sp.q ?? "").toLowerCase();
  const filtered = courses.filter((c) => (!sp.level || c.level === sp.level) && (!sp.category || c.category === sp.category) && (!q || `${c.titleEn} ${c.titleFr} ${c.summaryEn} ${c.summaryFr}`.toLowerCase().includes(q)));

  return (
    <div className="pt-28 pb-12">
      <Container>
        <Reveal><SectionHeading eyebrow={t.nav.learn} title={t.learn.title} sub={t.learn.sub} size="lg" /></Reveal>
        <div className="mt-10"><CatalogFilters locale={locale} current={{ level: sp.level, category: sp.category, q: sp.q }} /></div>
        {CATEGORY_ORDER.filter((cat) => filtered.some((c) => c.category === cat)).map((cat, idx) => {
          const group = filtered.filter((c) => c.category === cat);
          return (
            <section key={cat} className="mt-16" id={cat}>
              <div className="mb-6 flex items-baseline gap-4">
                <span className="num font-display text-sm font-bold text-steel">0{idx + 1}</span>
                <h2 className="display-sm text-ink">{t.learn.categories[cat]}</h2>
                <span className="text-sm text-steel">{group.length} {locale === "fr" ? "cours" : "courses"}</span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((c) => <CourseCard key={c.id} course={{ ...c, progressPct: progress.get(c.id) }} locale={locale} />)}
              </div>
            </section>
          );
        })}
        {filtered.length === 0 && <p className="mt-16 text-steel">{locale === "fr" ? "Aucun cours ne correspond à ces filtres." : "No courses match these filters."}</p>}
      </Container>
    </div>
  );
}
