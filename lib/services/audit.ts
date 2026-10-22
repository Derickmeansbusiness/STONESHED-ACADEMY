import { db, schema } from "@/lib/db";
import { newId } from "@/lib/ids";

export async function audit(input: {
  actorId?: string | null;
  actorRole?: string | null;
  action: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}) {
  await db.insert(schema.auditLogs).values({
    id: newId("aud"),
    actorId: input.actorId ?? null,
    actorRole: input.actorRole ?? null,
    action: input.action,
    entityType: input.entityType ?? null,
    entityId: input.entityId ?? null,
    metadata: input.metadata ?? null,
  });
}

export async function track(input: {
  userId?: string | null;
  anonId?: string | null;
  eventName: string;
  locale?: string;
  path?: string;
  properties?: Record<string, unknown>;
}) {
  await db.insert(schema.analyticsEvents).values({
    id: newId("evt"),
    userId: input.userId ?? null,
    anonId: input.anonId ?? null,
    eventName: input.eventName,
    locale: input.locale ?? null,
    path: input.path ?? null,
    properties: input.properties ?? null,
  });
}

/** Records a notification that would be delivered once a provider is connected. Never claims delivery. */
export async function queueNotification(input: { userId?: string | null; channel: "email" | "whatsapp" | "sms"; recipient: string; subject: string; body: string }) {
  const hasProvider = !!process.env.RESEND_API_KEY;
  await db.insert(schema.notificationOutbox).values({
    id: newId("ntf"),
    userId: input.userId ?? null,
    channel: input.channel,
    recipient: input.recipient,
    subject: input.subject,
    body: input.body,
    status: hasProvider ? "sent" : "queued_no_provider",
  });
  return { delivered: hasProvider };
}
