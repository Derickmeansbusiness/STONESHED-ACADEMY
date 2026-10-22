import { redirect } from "next/navigation";
import { eq, inArray } from "drizzle-orm";
import { getDictionary, pick, type Locale } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Notice } from "@/components/ui/notice";

export default async function PortalPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const user = await getSession();
  if (!user) redirect(`/${locale}/signin?next=${encodeURIComponent(`/${locale}/institutions/portal`)}`);
  const memberships = user.role === "super_admin"
    ? (await db.query.institutions.findMany()).map((i) => ({ institutionId: i.id, institution: i }))
    : await db.query.institutionUsers.findMany({ where: eq(schema.institutionUsers.userId, user.id), with: { institution: true } });
  if (!memberships.length) return <Container size="sm" className="py-32"><Notice tone="warning">{locale === "fr" ? "Votre compte n'est rattaché à aucune institution autorisée." : "Your account is not attached to an authorised institution."}</Notice></Container>;
  const instIds = memberships.map((m) => m.institutionId);
  const cohorts = await db.query.cohorts.findMany({ where: inArray(schema.cohorts.institutionId, instIds), with: { members: { with: { user: { with: { enrollments: { with: { course: true } }, certificates: true } } } }, institution: true } });
  return (
    <div className="pt-28 pb-12">
      <Container>
        <SectionHeading eyebrow={t.institutions.portal} title={memberships.map((m) => m.institution.name).join(" · ")} sub={t.institutions.portalSub} />
        <div className="mt-10 space-y-10">
          {cohorts.map((c) => {
            const members = c.members;
            const avg = members.length ? Math.round(members.reduce((s, m) => s + (m.user.enrollments.find((e) => e.course.slug === c.programSlug)?.progressPct ?? 0), 0) / members.length) : 0;
            const completed = members.filter((m) => m.user.enrollments.some((e) => e.course.slug === c.programSlug && e.status === "completed")).length;
            return (
              <section key={c.id} className="surface overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-mist/60 bg-cloud/50 px-6 py-4">
                  <div><p className="eyebrow">{c.institution.name}</p><h2 className="font-display text-xl font-bold text-ink">{c.name}</h2><p className="text-xs text-steel">{c.programSlug} · {c.startDate} → {c.endDate}</p></div>
                  <div className="flex gap-6 text-center"><div><p className="num font-display text-2xl font-extrabold text-ink">{members.length}</p><p className="text-[10px] uppercase tracking-wider text-steel">{locale === "fr" ? "Apprenants" : "Learners"}</p></div><div><p className="num font-display text-2xl font-extrabold text-ink">{avg}%</p><p className="text-[10px] uppercase tracking-wider text-steel">{locale === "fr" ? "Progression moy." : "Avg progress"}</p></div><div><p className="num font-display text-2xl font-extrabold text-ink">{completed}</p><p className="text-[10px] uppercase tracking-wider text-steel">{t.common.completed}</p></div></div>
                </div>
                <table className="w-full text-sm">
                  <thead><tr className="text-left text-[11px] uppercase tracking-wider text-steel"><th className="px-6 py-2">{t.common.name}</th><th className="px-6 py-2">{t.learn.courseProgress}</th><th className="px-6 py-2">{t.dashboard.certificates}</th><th className="px-6 py-2">{t.common.status}</th></tr></thead>
                  <tbody>{members.map((m) => { const e = m.user.enrollments.find((x) => x.course.slug === c.programSlug); return (
                    <tr key={m.id} className="border-t border-mist/50"><td className="px-6 py-2.5 font-medium text-ink">{m.user.fullName}</td><td className="px-6 py-2.5"><div className="flex items-center gap-2"><div className="h-1.5 w-28 rounded-full bg-mist"><div className="h-full rounded-full bg-finance" style={{ width: `${e?.progressPct ?? 0}%` }} /></div><span className="num text-xs">{e?.progressPct ?? 0}%</span></div></td><td className="px-6 py-2.5 num">{m.user.certificates.length}</td><td className="px-6 py-2.5">{e ? <Badge tone={e.status === "completed" ? "green" : "sky"}>{e.status === "completed" ? t.common.completed : t.common.inProgress}</Badge> : <Badge tone="gray">{t.common.notStarted}</Badge>}</td></tr>
                  ); })}</tbody>
                </table>
                {c.programSlug && <p className="px-6 py-3 text-xs text-steel">{locale === "fr" ? "Programme" : "Program"}: {pick({ titleEn: c.programSlug, titleFr: c.programSlug }, "title", locale)}</p>}
              </section>
            );
          })}
        </div>
        <Notice tone="compliance" className="mt-10">{locale === "fr" ? "Les coordinateurs ne voient que les apprenants rattachés à leurs cohortes autorisées. Les données affichées pour la démonstration sont fictives." : "Coordinators see only learners attached to their authorised cohorts. Data shown for the demonstration is fictional."}</Notice>
      </Container>
    </div>
  );
}
