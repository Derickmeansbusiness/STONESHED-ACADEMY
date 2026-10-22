import { desc } from "drizzle-orm";
import { getDictionary, pick, formatDate, type Locale } from "@/lib/i18n";
import { db, schema } from "@/lib/db";
import { revokeCertificateAction } from "@/lib/actions/admin";
import { PageTitle, Table, Td, Kpi } from "@/components/admin/ui";
import { Badge } from "@/components/ui/badge";

export default async function AdminLearning({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const fr = locale === "fr";
  const [enrollments, certs, attempts] = await Promise.all([
    db.query.enrollments.findMany({ orderBy: [desc(schema.enrollments.enrolledAt)], limit: 40, with: { user: true, course: true } }),
    db.query.certificates.findMany({ orderBy: [desc(schema.certificates.issuedAt)], limit: 30 }),
    db.query.quizAttempts.findMany({ orderBy: [desc(schema.quizAttempts.attemptedAt)], limit: 200 }),
  ]);
  const total = await db.query.enrollments.findMany();
  const avgProgress = total.length ? Math.round(total.reduce((s, e) => s + e.progressPct, 0) / total.length) : 0;
  const passRate = attempts.length ? Math.round((attempts.filter((a) => a.passed).length / attempts.length) * 100) : 0;
  const path = `/${locale}/admin/learning`;
  return (
    <>
      <PageTitle title={t.admin.learning} sub={fr ? "Inscriptions, progression, certificats et évaluations." : "Enrollments, learner progress, certificates and assessments."} />
      <div className="grid gap-4 sm:grid-cols-4"><Kpi label={fr ? "Inscriptions" : "Enrollments"} value={total.length} /><Kpi label={fr ? "Progression moyenne" : "Average progress"} value={`${avgProgress}%`} /><Kpi label={fr ? "Taux de réussite aux quiz" : "Quiz pass rate"} value={`${passRate}%`} sub={`${attempts.length} ${fr ? "tentatives récentes" : "recent attempts"}`} /><Kpi label={fr ? "Certificats" : "Certificates"} value={certs.length} /></div>
      <h2 className="mt-10 mb-3 font-display text-lg font-bold text-ink">{fr ? "Inscriptions récentes" : "Recent enrollments"}</h2>
      <Table head={[fr ? "Apprenant" : "Learner", fr ? "Cours" : "Course", fr ? "Progression" : "Progress", t.common.status, t.common.date]}>
        {enrollments.map((e) => <tr key={e.id}><Td className="font-medium text-ink">{e.user.fullName}</Td><Td>{pick(e.course, "title", locale)}</Td><Td><div className="flex items-center gap-2"><div className="h-1.5 w-24 rounded-full bg-mist"><div className="h-full rounded-full bg-finance" style={{ width: `${e.progressPct}%` }} /></div><span className="num text-xs">{e.progressPct}%</span></div></Td><Td><Badge tone={e.status === "completed" ? "green" : "sky"}>{e.status}</Badge></Td><Td className="text-xs text-steel">{formatDate(e.enrolledAt, locale)}</Td></tr>)}
      </Table>
      <h2 className="mt-10 mb-3 font-display text-lg font-bold text-ink">{fr ? "Certificats émis" : "Issued certificates"}</h2>
      <Table head={["ID", fr ? "Apprenant" : "Learner", fr ? "Cours" : "Course", t.common.date, t.common.status, t.common.actions]}>
        {certs.map((c) => <tr key={c.id}><Td className="num font-semibold text-ink">{c.id}</Td><Td>{c.learnerName}</Td><Td>{c.courseTitle}</Td><Td className="text-xs text-steel">{formatDate(c.issuedAt, locale)}</Td><Td>{c.revokedAt ? <Badge tone="red">revoked</Badge> : <Badge tone="green">valid</Badge>}</Td><Td>{!c.revokedAt && <form action={revokeCertificateAction}><input type="hidden" name="certId" value={c.id} /><input type="hidden" name="path" value={path} /><button className="rounded-lg border border-danger px-3 py-1.5 text-xs font-semibold text-danger hover:bg-danger/10">{fr ? "Révoquer" : "Revoke"}</button></form>}</Td></tr>)}
      </Table>
    </>
  );
}
