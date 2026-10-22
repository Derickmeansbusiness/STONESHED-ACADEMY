import { getDictionary, type Locale } from "@/lib/i18n";
import { executiveMetrics } from "@/lib/services/analytics";
import { PageTitle, Kpi } from "@/components/admin/ui";
import { OverviewCharts } from "@/components/admin/overview-charts";

export default async function AdminOverview({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const m = await executiveMetrics();
  const fr = locale === "fr";
  const conv = m.totals.learners ? ((m.totals.adviserInquiries / m.totals.learners) * 100).toFixed(1) : "0";
  return (
    <>
      <PageTitle title={t.admin.overview} sub={fr ? "Tableau de bord exécutif — éducation, engagement et intérêt volontaire pour le conseil." : "Executive dashboard — education, engagement and voluntary adviser interest."} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label={fr ? "Apprenants inscrits" : "Registered learners"} value={m.totals.learners} tone="royal" />
        <Kpi label={fr ? "Actifs (30 jours)" : "Active learners (30 days)"} value={m.totals.active30} />
        <Kpi label={fr ? "Cours terminés" : "Course completions"} value={m.totals.completions} sub={`${m.totals.enrollments} ${fr ? "inscriptions" : "enrollments"}`} />
        <Kpi label={fr ? "Progrès aux quiz" : "Assessment improvement"} value={`${m.totals.quizImprovement > 0 ? "+" : ""}${m.totals.quizImprovement} pts`} sub={fr ? "1re vs dernière tentative" : "first vs latest attempt"} />
        <Kpi label={fr ? "Vidéos terminées" : "Academy TV completions"} value={m.totals.videoCompletions} />
        <Kpi label={fr ? "Sessions laboratoire" : "Lab sessions"} value={m.totals.labSessions} />
        <Kpi label={fr ? "Participation institutionnelle" : "Institutional participation"} value={m.totals.partnerInquiries} sub={fr ? "demandes de partenariat" : "partnership inquiries"} />
        <Kpi label={fr ? "Présence aux événements" : "Event attendance"} value={m.totals.attendance} sub={`${m.totals.registrations} ${fr ? "inscriptions" : "registrations"}`} />
        <Kpi label={fr ? "Pages fonds consultées" : "Fund education page views"} value={m.totals.fundPageViews} />
        <Kpi label={fr ? "Demandes de conseil qualifiées" : "Qualified consultation requests"} value={m.totals.adviserInquiries} sub={`${m.totals.consultations} ${fr ? "consultations" : "consultations"}`} />
        <Kpi label={fr ? "Conversion éducation → conseil" : "Education → adviser conversion"} value={`${conv} %`} sub={fr ? "demandes volontaires / apprenants" : "voluntary requests / learners"} />
        <Kpi label={fr ? "Questions à l'IA" : "AI tutor questions"} value={m.totals.aiQuestions} />
      </div>
      <div className="mt-8"><OverviewCharts weeks={m.weeks} popular={m.popular} localePref={m.localePref} audiences={m.audiences} /></div>
    </>
  );
}
