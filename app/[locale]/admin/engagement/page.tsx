import { desc } from "drizzle-orm";
import { getDictionary, formatDate, type Locale } from "@/lib/i18n";
import { db, schema } from "@/lib/db";
import { updateInquiryStatusAction } from "@/lib/actions/admin";
import { PageTitle, Table, Td, Kpi, selectCls, btnCls } from "@/components/admin/ui";
import { Badge } from "@/components/ui/badge";
import { Notice } from "@/components/ui/notice";

export default async function AdminEngagement({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const fr = locale === "fr";
  const inquiries = await db.query.adviserInquiries.findMany({ orderBy: [desc(schema.adviserInquiries.createdAt)], with: { consultations: true } });
  const bySource = Object.entries(inquiries.reduce<Record<string, number>>((acc, i) => ({ ...acc, [i.source]: (acc[i.source] ?? 0) + 1 }), {}));
  const byTopic = Object.entries(inquiries.reduce<Record<string, number>>((acc, i) => ({ ...acc, [i.fundSlug ?? "general"]: (acc[i.fundSlug ?? "general"] ?? 0) + 1 }), {}));
  const path = `/${locale}/admin/engagement`;
  const crm = !!process.env.CRM_WEBHOOK_URL;
  return (
    <>
      <PageTitle title={t.admin.engagement} sub={fr ? "Demandes pédagogiques, consultations conseiller demandées, thèmes, sources et statut de transfert." : "Educational inquiries, requested adviser consultations, topic interests, source of inquiry and referral status."} />
      <div className="grid gap-4 sm:grid-cols-4"><Kpi label={t.admin.consultations} value={inquiries.length} tone="royal" /><Kpi label={fr ? "Nouvelles" : "New"} value={inquiries.filter((i) => i.status === "new").length} /><Kpi label={fr ? "Qualifiées" : "Qualified"} value={inquiries.filter((i) => i.status === "qualified").length} /><Kpi label={fr ? "Transférées" : "Referred"} value={inquiries.filter((i) => i.status === "referred").length} /></div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="surface p-5"><p className="eyebrow mb-2">{fr ? "Source de la demande" : "Source of inquiry"}</p><ul className="space-y-1 text-sm">{bySource.map(([k, v]) => <li key={k} className="flex justify-between"><span>{k}</span><span className="num font-semibold">{v}</span></li>)}</ul></div>
        <div className="surface p-5"><p className="eyebrow mb-2">{fr ? "Thème" : "Topic interest"}</p><ul className="space-y-1 text-sm">{byTopic.map(([k, v]) => <li key={k} className="flex justify-between"><span>{k}</span><span className="num font-semibold">{v}</span></li>)}</ul></div>
      </div>
      <Notice tone={crm ? "info" : "demo"} className="mt-6">{crm ? (fr ? "Intégration CRM configurée : les demandes transférées sont synchronisées." : "CRM integration configured: referred requests are synchronised.") : fr ? "Intégration CRM non connectée. Le flux de transfert est prêt (statut « not_configured ») : fournir CRM_WEBHOOK_URL et les identifiants pour activer la synchronisation vers l'équipe développement / relations investisseurs." : "CRM integration not connected. The referral workflow is in place (status “not_configured”): provide CRM_WEBHOOK_URL and credentials to enable synchronisation to business development / investor relations."}</Notice>
      <h2 className="mt-10 mb-3 font-display text-lg font-bold text-ink">{t.admin.consultations}</h2>
      <Table head={[t.common.name, fr ? "Sujet" : "Topic", fr ? "Fonds" : "Fund", "Source", fr ? "Canal" : "Channel", fr ? "Consentement" : "Consent", t.common.date, t.common.status, "CRM", t.common.actions]}>
        {inquiries.map((i) => <tr key={i.id}><Td className="font-medium text-ink">{i.fullName}<span className="block text-xs text-steel">{i.email}</span></Td><Td className="text-xs">{i.topic}</Td><Td className="text-xs">{i.fundSlug ?? "—"}</Td><Td className="text-xs">{i.source}</Td><Td className="text-xs">{i.consultations[0]?.preferredChannel ?? "—"}</Td><Td>{i.consentContact ? "✓" : "✗"}</Td><Td className="text-xs text-steel">{formatDate(i.createdAt, locale)}</Td><Td><Badge tone={i.status === "new" ? "amber" : i.status === "referred" ? "green" : "sky"}>{i.status}</Badge></Td><Td className="text-xs">{i.consultations[0]?.crmSyncStatus ?? "—"}</Td>
          <Td><form action={updateInquiryStatusAction} className="flex items-center gap-1.5"><input type="hidden" name="kind" value="adviser" /><input type="hidden" name="id" value={i.id} /><input type="hidden" name="path" value={path} /><select name="status" defaultValue={i.status} className={selectCls}>{["new", "qualified", "referred", "closed"].map((s) => <option key={s}>{s}</option>)}</select><button className={btnCls}>{t.common.save}</button></form></Td></tr>)}
      </Table>
    </>
  );
}
