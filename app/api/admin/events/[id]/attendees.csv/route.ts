import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import { getSession, can } from "@/lib/auth/session";
import { audit } from "@/lib/services/audit";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getSession();
  if (!user || !can(user.role, "events.manage")) return new Response("Forbidden", { status: 403 });
  const { id } = await params;
  const regs = await db.query.eventRegistrations.findMany({ where: eq(schema.eventRegistrations.eventId, id), with: { user: true, attendance: true } });
  const esc = (v: string | null | undefined) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const rows = [["name", "email", "affiliation", "ticket", "status", "registered_at", "checked_in"].join(","), ...regs.map((r) => [esc(r.user.fullName), esc(r.user.email), esc(r.affiliation), r.ticketCode, r.status, new Date(r.registeredAt * 1000).toISOString(), r.attendance.length ? "yes" : "no"].join(","))];
  await audit({ actorId: user.id, actorRole: user.role, action: "event.attendees_exported", entityType: "event", entityId: id });
  return new Response(rows.join("\n"), { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="attendees-${id}.csv"` } });
}
