import { desc, count } from "drizzle-orm";
import { getDictionary, type Locale } from "@/lib/i18n";
import { db, schema } from "@/lib/db";
import { PageTitle, Table, Td, Kpi } from "@/components/admin/ui";
import { Badge } from "@/components/ui/badge";
import { Notice } from "@/components/ui/notice";

export default async function AdminAi({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const fr = locale === "fr";
  const [logs, sources, flagged] = await Promise.all([db.query.aiLogRecords.findMany({ orderBy: [desc(schema.aiLogRecords.createdAt)], limit: 60 }), db.select({ n: count() }).from(schema.aiKnowledgeSources), db.query.aiLogRecords.findMany({ where: (r, { eq }) => eq(r.flagged, true) })]);
  const live = !!process.env.ANTHROPIC_API_KEY;
  return (
    <>
      <PageTitle title={t.admin.ai} sub={fr ? "Surveillance des usages, sources de connaissances approuvées et journal des réponses." : "Usage monitoring, approved knowledge sources and answer log."} />
      <div className="grid gap-4 sm:grid-cols-4"><Kpi label={fr ? "Questions (journal)" : "Questions logged"} value={logs.length} /><Kpi label={fr ? "Sources approuvées" : "Approved sources"} value={sources[0].n} /><Kpi label={fr ? "Signalées (situation perso.)" : "Flagged (personal advice)"} value={flagged.length} /><Kpi label="Mode" value={live ? "live" : "offline"} sub={live ? t.ask.liveMode : t.ask.offlineMode} /></div>
      <Notice tone={live ? "info" : "demo"} className="mt-6">{live ? (fr ? "Modèle en direct configuré (ANTHROPIC_API_KEY). Les réponses sur les produits restent ancrées dans les sources approuvées et citées." : "Live model configured (ANTHROPIC_API_KEY). Product answers remain grounded in approved, cited sources.") : t.ask.offlineBody}</Notice>
      <h2 className="mt-8 mb-3 font-display text-lg font-bold text-ink">{fr ? "Journal" : "Log"}</h2>
      <Table head={[t.common.date, t.common.language, "Mode", fr ? "Question" : "Question", fr ? "Sources" : "Sources", fr ? "Latence" : "Latency", fr ? "Signalé" : "Flagged"]}>
        {logs.map((l) => <tr key={l.id}><Td className="num text-xs text-steel">{new Date(l.createdAt * 1000).toISOString().slice(0, 16).replace("T", " ")}</Td><Td>{l.locale.toUpperCase()}</Td><Td><Badge tone={l.mode === "live_model" ? "green" : "amber"}>{l.mode}</Badge></Td><Td className="max-w-md text-xs">{l.question}</Td><Td className="num text-xs">{l.sourceIds.length}</Td><Td className="num text-xs">{l.latencyMs ?? "—"} ms</Td><Td>{l.flagged ? <Badge tone="red">✓</Badge> : "—"}</Td></tr>)}
      </Table>
    </>
  );
}
