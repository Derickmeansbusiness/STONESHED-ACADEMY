import { desc } from "drizzle-orm";
import { getDictionary, formatDate, type Locale } from "@/lib/i18n";
import { db, schema } from "@/lib/db";
import { getSession, canApproveFundContent } from "@/lib/auth/session";
import { reviewApprovalAction } from "@/lib/actions/admin";
import { PageTitle, Table, Td, Kpi, btnCls } from "@/components/admin/ui";
import { Badge } from "@/components/ui/badge";
import { Notice } from "@/components/ui/notice";

const STAGES = ["draft", "editorial_review", "product_accuracy_review", "compliance_approval", "scheduled", "published", "periodic_review"];

export default async function AdminGovernance({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const fr = locale === "fr";
  const [approvals, user] = await Promise.all([db.query.contentApprovals.findMany({ orderBy: [desc(schema.contentApprovals.updatedAt)] }), getSession()]);
  const compliance = canApproveFundContent(user?.role);
  const path = `/${locale}/admin/governance`;
  return (
    <>
      <PageTitle title={t.admin.governance} sub={fr ? "Flux de publication : Brouillon → Revue éditoriale → Revue exactitude produit → Approbation conformité → Publication programmée → Publié → Revue périodique." : "Publishing workflow: Draft → Editorial Review → Product Accuracy Review → Compliance Approval → Scheduled Publication → Published → Periodic Review."} />
      <div className="grid gap-4 sm:grid-cols-4"><Kpi label={fr ? "En attente" : "Pending"} value={approvals.filter((a) => !["published"].includes(a.stage)).length} tone="royal" /><Kpi label={fr ? "Nécessitent la conformité" : "Require compliance role"} value={approvals.filter((a) => a.requiresComplianceRole && a.stage !== "published").length} /><Kpi label={fr ? "Publiés" : "Published"} value={approvals.filter((a) => a.stage === "published").length} /><Kpi label={fr ? "Votre rôle" : "Your role"} value={user?.role.replace(/_/g, " ") ?? "—"} sub={compliance ? (fr ? "peut approuver les contenus fonds" : "can approve fund content") : fr ? "approbation fonds réservée à la conformité" : "fund approval reserved to compliance"} /></div>
      {!compliance && <Notice tone="compliance" className="mt-6">{fr ? "Les contenus relatifs aux fonds exigent un réviseur conformité désigné. Vos décisions sur ces éléments seront refusées et journalisées." : "Fund-related content requires a designated compliance reviewer. Your decisions on those items will be refused and logged."}</Notice>}
      <div className="mt-6 flex flex-wrap gap-1.5">{STAGES.map((s, i) => <span key={s} className="inline-flex items-center gap-1 rounded-full border border-mist bg-white px-2.5 py-1 text-[11px] font-semibold text-steel"><span className="num text-finance">{i + 1}</span>{s.replace(/_/g, " ")}</span>)}</div>
      <h2 className="mt-8 mb-3 font-display text-lg font-bold text-ink">{t.admin.approvals}</h2>
      <Table head={[fr ? "Contenu" : "Content", "Type", fr ? "Étape" : "Stage", fr ? "Décision" : "Decision", fr ? "Mis à jour" : "Updated", t.common.actions]}>
        {approvals.map((a) => (
          <tr key={a.id}><Td className="font-medium text-ink">{a.contentTitle}{a.comment && <span className="block text-xs text-steel">“{a.comment}”</span>}</Td><Td><Badge tone={a.requiresComplianceRole ? "amber" : "gray"}>{a.contentType}{a.requiresComplianceRole ? " · compliance" : ""}</Badge></Td><Td><Badge tone={a.stage === "published" ? "green" : "sky"}>{a.stage.replace(/_/g, " ")}</Badge></Td><Td className="text-xs">{a.decision ?? "—"}</Td><Td className="text-xs text-steel">{formatDate(a.updatedAt, locale)}</Td>
            <Td>{a.stage !== "published" && (
              <form action={reviewApprovalAction} className="flex flex-wrap items-center gap-1.5"><input type="hidden" name="id" value={a.id} /><input type="hidden" name="path" value={path} /><input name="comment" placeholder={fr ? "Commentaire" : "Comment"} className="w-32 rounded-lg border border-mist px-2 py-1.5 text-xs" /><button name="decision" value="approved" className={btnCls} disabled={a.requiresComplianceRole && !compliance}>{fr ? "Approuver" : "Approve"}</button><button name="decision" value="changes_requested" className="rounded-lg border border-mist px-3 py-1.5 text-xs font-semibold hover:border-finance">{fr ? "Modifications" : "Changes"}</button><button name="decision" value="rejected" className="rounded-lg border border-danger px-3 py-1.5 text-xs font-semibold text-danger">{fr ? "Rejeter" : "Reject"}</button></form>
            )}</Td></tr>
        ))}
      </Table>
    </>
  );
}
