import { desc } from "drizzle-orm";
import { getDictionary, formatDate, type Locale } from "@/lib/i18n";
import { db, schema } from "@/lib/db";
import { updateInquiryStatusAction } from "@/lib/actions/admin";
import { PageTitle, Table, Td, Kpi, selectCls, btnCls } from "@/components/admin/ui";
import { Badge } from "@/components/ui/badge";

export default async function AdminInstitutions({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const fr = locale === "fr";
  const [institutions, inquiries] = await Promise.all([db.query.institutions.findMany({ with: { cohorts: { with: { members: true } }, members: { with: { user: true } } } }), db.query.partnershipInquiries.findMany({ orderBy: [desc(schema.partnershipInquiries.createdAt)] })]);
  const path = `/${locale}/admin/institutions`;
  return (
    <>
      <PageTitle title={t.admin.institutions} sub={fr ? "Universités et entreprises, demandes de partenariat, cohortes et programmes institutionnels." : "Universities and companies, partnership leads, cohorts and institutional programs."} />
      <div className="grid gap-4 sm:grid-cols-3"><Kpi label={fr ? "Institutions" : "Institutions"} value={institutions.length} /><Kpi label={fr ? "Cohortes" : "Cohorts"} value={institutions.reduce((n, i) => n + i.cohorts.length, 0)} /><Kpi label={t.admin.inquiries} value={inquiries.length} sub={`${inquiries.filter((i) => i.status === "new").length} ${fr ? "nouvelles" : "new"}`} /></div>
      <h2 className="mt-10 mb-3 font-display text-lg font-bold text-ink">{t.admin.inquiries}</h2>
      <Table head={[fr ? "Institution" : "Institution", fr ? "Contact" : "Contact", fr ? "Programme" : "Program", fr ? "Participants" : "Participants", fr ? "Format" : "Format", t.common.date, t.common.status, t.common.actions]}>
        {inquiries.map((i) => <tr key={i.id}><Td className="font-medium text-ink">{i.institutionName}<span className="block text-xs text-steel">{t.institutions.types[i.institutionType as "university"]} · {i.city}, {i.country}</span></Td><Td className="text-xs">{i.contactPerson}<span className="block text-steel">{i.email}</span></Td><Td className="text-xs">{i.requestedProgram}</Td><Td className="num">{i.expectedParticipants ?? "—"}</Td><Td className="text-xs">{t.institutions.formats[i.deliveryFormat as "online"]}</Td><Td className="text-xs text-steel">{formatDate(i.createdAt, locale)}</Td><Td><Badge tone={i.status === "new" ? "amber" : i.status === "active" ? "green" : "sky"}>{i.status}</Badge></Td>
          <Td><form action={updateInquiryStatusAction} className="flex items-center gap-1.5"><input type="hidden" name="kind" value="partnership" /><input type="hidden" name="id" value={i.id} /><input type="hidden" name="path" value={path} /><select name="status" defaultValue={i.status} className={selectCls}>{["new", "contacted", "proposal", "active", "closed"].map((s) => <option key={s}>{s}</option>)}</select><button className={btnCls}>{t.common.save}</button></form></Td></tr>)}
      </Table>
      <h2 className="mt-10 mb-3 font-display text-lg font-bold text-ink">{fr ? "Institutions et cohortes" : "Institutions and cohorts"}</h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {institutions.map((i) => (
          <div key={i.id} className="surface p-5">
            <div className="flex items-start justify-between gap-3"><div><p className="font-display font-bold text-ink">{i.name}</p><p className="text-xs text-steel">{t.institutions.types[i.type as "university"]} · {i.city}, {i.country}</p></div><Badge tone={i.status === "active" ? "green" : "gray"}>{i.status}</Badge></div>
            <p className="mt-3 text-xs text-steel">{fr ? "Coordinateurs" : "Coordinators"}: {i.members.map((m) => m.user.fullName).join(", ") || "—"}</p>
            <ul className="mt-3 space-y-1.5">{i.cohorts.map((c) => <li key={c.id} className="flex items-center justify-between rounded-lg bg-cloud/60 px-3 py-2 text-xs"><span><span className="font-semibold text-ink">{c.name}</span> · {c.programSlug}</span><span className="num">{c.members.length}/{c.capacity ?? "∞"} · {c.status}</span></li>)}</ul>
          </div>
        ))}
      </div>
    </>
  );
}
