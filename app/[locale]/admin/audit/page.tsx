import { desc } from "drizzle-orm";
import { getDictionary, type Locale } from "@/lib/i18n";
import { db, schema } from "@/lib/db";
import { PageTitle, Table, Td } from "@/components/admin/ui";
import { Badge } from "@/components/ui/badge";

export default async function AdminAudit({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const fr = locale === "fr";
  const [logs, outbox] = await Promise.all([db.query.auditLogs.findMany({ orderBy: [desc(schema.auditLogs.createdAt)], limit: 150 }), db.query.notificationOutbox.findMany({ orderBy: [desc(schema.notificationOutbox.createdAt)], limit: 30 })]);
  return (
    <>
      <PageTitle title={t.admin.audit} sub={fr ? "Journal d'audit des actions sensibles et file de notifications sortantes." : "Audit trail of sensitive actions and the outbound notification queue."} />
      <Table head={[fr ? "Horodatage" : "Timestamp", "Action", fr ? "Acteur" : "Actor", fr ? "Entité" : "Entity", fr ? "Détails" : "Details"]}>
        {logs.map((l) => <tr key={l.id}><Td className="num text-xs text-steel">{new Date(l.createdAt * 1000).toISOString().replace("T", " ").slice(0, 19)}</Td><Td><Badge tone={l.action.includes("denied") || l.action.includes("failed") ? "red" : "gray"}>{l.action}</Badge></Td><Td className="text-xs">{l.actorRole ?? "—"}<span className="block text-steel">{l.actorId ?? ""}</span></Td><Td className="text-xs">{l.entityType ? `${l.entityType}:${l.entityId}` : "—"}</Td><Td className="max-w-md truncate text-xs text-steel">{l.metadata ? JSON.stringify(l.metadata) : ""}</Td></tr>)}
      </Table>
      <h2 className="mt-10 mb-3 font-display text-lg font-bold text-ink">{fr ? "Notifications sortantes" : "Notification outbox"}</h2>
      <p className="mb-3 text-xs text-steel">{fr ? "Aucun fournisseur e-mail/WhatsApp n'est connecté : les messages sont consignés ici avec le statut « queued_no_provider » et ne sont pas envoyés." : "No email/WhatsApp provider is connected: messages are recorded here with status “queued_no_provider” and are not sent."}</p>
      <Table head={[fr ? "Canal" : "Channel", fr ? "Destinataire" : "Recipient", fr ? "Objet" : "Subject", t.common.status]}>{outbox.map((o) => <tr key={o.id}><Td>{o.channel}</Td><Td className="text-xs">{o.recipient}</Td><Td className="text-xs">{o.subject}</Td><Td><Badge tone={o.status === "sent" ? "green" : "amber"}>{o.status}</Badge></Td></tr>)}</Table>
    </>
  );
}
