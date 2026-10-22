import { desc } from "drizzle-orm";
import { getDictionary, formatDate, type Locale } from "@/lib/i18n";
import { db, schema } from "@/lib/db";
import { listFunds } from "@/lib/services/content";
import { getSession, canApproveFundContent } from "@/lib/auth/session";
import { resolveFlagAction, raiseFlagAction } from "@/lib/actions/admin";
import { PageTitle, Table, Td, Kpi, selectCls, btnCls } from "@/components/admin/ui";
import { Badge } from "@/components/ui/badge";
import { Notice } from "@/components/ui/notice";

export default async function AdminFunds({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const fr = locale === "fr";
  const [funds, flags, user] = await Promise.all([listFunds(), db.query.fundDataFlags.findMany({ orderBy: [desc(schema.fundDataFlags.createdAt)] }), getSession()]);
  const compliance = canApproveFundContent(user?.role);
  const path = `/${locale}/admin/funds`;
  const open = flags.filter((f) => f.status === "open");
  return (
    <>
      <PageTitle title={t.admin.fundData} sub={fr ? "Données produit approuvées, versions, documents sources et signalements d'incohérence." : "Approved product data, versions, source documents and inconsistency flags."} />
      <div className="grid gap-4 sm:grid-cols-4"><Kpi label={fr ? "Fonds" : "Funds"} value={funds.length} /><Kpi label={fr ? "Signalements ouverts" : "Open flags"} value={open.length} tone="royal" sub={`${open.filter((f) => f.severity === "high").length} high`} /><Kpi label={fr ? "Documents en attente" : "Documents awaiting upload"} value={funds.reduce((n, f) => n + f.documents.filter((d) => d.status === "awaiting_upload").length, 0)} /><Kpi label={fr ? "Versions approuvées" : "Approved versions"} value={funds.reduce((n, f) => n + f.versions.filter((v) => v.publicationStatus === "approved").length, 0)} /></div>
      <Notice tone="warning" className="mt-6">{fr ? "Les documents réglementaires (brochure, règlement de gestion Gold, documents d'information Classic et Gold) n'ont pas été joints au projet. Les valeurs du registre proviennent du brief et doivent être rapprochées des documents réels avant toute approbation." : "The regulatory documents (brochure, Gold management regulations, Classic and Gold information documents) were not attached to the project. Register values come from the brief and must be reconciled against the actual documents before approval."}</Notice>
      <h2 className="mt-8 mb-3 font-display text-lg font-bold text-ink">{t.admin.flags}</h2>
      <Table head={[fr ? "Fonds" : "Fund", fr ? "Champ" : "Field", fr ? "Description" : "Description", fr ? "Gravité" : "Severity", fr ? "Soulevé par" : "Raised by", t.common.status, t.common.actions]}>
        {flags.map((f) => <tr key={f.id} className={f.status === "resolved" ? "opacity-60" : ""}><Td className="text-xs font-semibold">{funds.find((x) => x.id === f.fundId)?.shortName ?? (fr ? "Tous" : "All")}</Td><Td className="num text-xs">{f.fieldKey}</Td><Td className="text-xs">{f.description}{f.resolution && <span className="block text-success">→ {f.resolution}</span>}</Td><Td><Badge tone={f.severity === "high" ? "red" : f.severity === "medium" ? "amber" : "gray"}>{f.severity}</Badge></Td><Td className="text-xs">{f.raisedBy}</Td><Td><Badge tone={f.status === "open" ? "amber" : "green"}>{f.status}</Badge></Td>
          <Td>{f.status === "open" && compliance && <form action={resolveFlagAction} className="flex items-center gap-1.5"><input type="hidden" name="id" value={f.id} /><input type="hidden" name="path" value={path} /><input name="resolution" placeholder={fr ? "Résolution" : "Resolution"} className="w-32 rounded-lg border border-mist px-2 py-1.5 text-xs" /><button className={btnCls}>{fr ? "Résoudre" : "Resolve"}</button></form>}</Td></tr>)}
      </Table>
      <form action={raiseFlagAction} className="surface mt-4 flex flex-wrap items-end gap-3 p-4">
        <input type="hidden" name="path" value={path} />
        <label className="text-xs font-semibold">{fr ? "Fonds" : "Fund"}<select name="fundId" className={selectCls + " mt-1 block"}><option value="">{fr ? "Tous" : "All"}</option>{funds.map((f) => <option key={f.id} value={f.id}>{f.shortName}</option>)}</select></label>
        <label className="text-xs font-semibold">{fr ? "Champ" : "Field"}<input name="fieldKey" required className="mt-1 block rounded-lg border border-mist px-2 py-1.5 text-xs" /></label>
        <label className="flex-1 text-xs font-semibold">{fr ? "Description" : "Description"}<input name="description" required className="mt-1 block w-full rounded-lg border border-mist px-2 py-1.5 text-xs" /></label>
        <label className="text-xs font-semibold">{fr ? "Gravité" : "Severity"}<select name="severity" className={selectCls + " mt-1 block"}><option>low</option><option>medium</option><option>high</option></select></label>
        <button className={btnCls}>{fr ? "Signaler" : "Raise flag"}</button>
      </form>
      {funds.map((f) => (
        <section key={f.id} className="mt-10">
          <h2 className="mb-3 font-display text-lg font-bold text-ink">{f.officialName} <span className="text-sm font-normal text-steel">{f.cosumafFundRef}</span></h2>
          <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
            <Table head={[fr ? "Champ" : "Field", fr ? "Valeur (EN)" : "Value (EN)", "Source", t.common.status]}>{f.current?.fields.map((x) => <tr key={x.key}><Td className="text-xs font-semibold">{x.labelEn}</Td><Td className="text-xs">{x.valueEn}{x.note && <span className="block text-[#8a5d05]">{x.note}</span>}</Td><Td className="text-[11px] text-steel">{x.source}</Td><Td><Badge tone={x.status === "approved" ? "green" : x.status === "pending_verification" ? "amber" : "gray"}>{x.status.replace(/_/g, " ")}</Badge></Td></tr>)}</Table>
            <div className="space-y-4">
              <div className="surface p-4"><p className="eyebrow mb-2">{fr ? "Versions" : "Versions"}</p><ul className="space-y-2 text-xs">{f.versions.map((v) => <li key={v.id} className="rounded-lg bg-cloud/60 p-2"><span className="num font-semibold">v{v.version}</span> · <Badge tone={v.publicationStatus === "approved" ? "green" : "amber"}>{v.publicationStatus.replace(/_/g, " ")}</Badge><span className="block text-steel">{v.sourceDocument}</span><span className="block text-steel">{fr ? "Revu le" : "Reviewed"} {v.lastReviewedAt ?? "—"} · {v.reviewer ?? "—"} · {formatDate(v.createdAt, locale)}</span></li>)}</ul></div>
              <div className="surface p-4"><p className="eyebrow mb-2">{fr ? "Documents sources" : "Source documents"}</p><ul className="space-y-1.5 text-xs">{f.documents.map((d) => <li key={d.id} className="flex items-center justify-between gap-2"><span>{d.titleEn}</span><Badge tone={d.status === "approved" ? "green" : "gray"}>{d.status.replace(/_/g, " ")}</Badge></li>)}</ul><p className="mt-2 text-[11px] text-steel">{fr ? "Le dépôt sécurisé de fichiers est prêt côté modèle de données ; l'upload est activé en phase deux avec un stockage approuvé." : "Secure file storage is modelled; uploads are enabled in Phase Two with approved storage."}</p></div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
