"use server";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db, schema } from "@/lib/db";
import { newId, ticketCode } from "@/lib/ids";
import { getSession, can } from "@/lib/auth/session";
import { audit, track, queueNotification } from "@/lib/services/audit";
import { awardBadge } from "@/lib/services/learning";

export async function registerEventAction(form: FormData) {
  const locale = form.get("locale") === "fr" ? "fr" : "en";
  const slug = String(form.get("slug"));
  const user = await getSession();
  if (!user) redirect(`/${locale}/signin?next=${encodeURIComponent(`/${locale}/events/${slug}`)}`);
  const event = await db.query.events.findFirst({ where: eq(schema.events.slug, slug), with: { registrations: true } });
  if (!event || !["open", "waitlist"].includes(event.status)) redirect(`/${locale}/events/${slug}`);
  const existing = event.registrations.find((r) => r.userId === user.id && r.status !== "cancelled");
  if (!existing) {
    const confirmed = event.registrations.filter((r) => r.status === "confirmed").length;
    const status = confirmed >= event.capacity ? "waitlisted" : "confirmed";
    const id = newId("reg");
    await db.insert(schema.eventRegistrations).values({ id, eventId: event.id, userId: user.id, ticketCode: ticketCode(), status, affiliation: String(form.get("affiliation") ?? "").slice(0, 120) || null });
    await audit({ actorId: user.id, actorRole: user.role, action: "event.registered", entityType: "event", entityId: event.id, metadata: { status } });
    await track({ userId: user.id, eventName: "event_registered", locale, properties: { eventSlug: slug, status } });
    await awardBadge(user.id, "event_attendee");
    await queueNotification({ userId: user.id, channel: "email", recipient: user.email, subject: `${status === "confirmed" ? "Registration confirmed" : "Waitlist"}: ${locale === "fr" ? event.titleFr : event.titleEn}`, body: `Your ticket is available in My Learning → Events.` });
  }
  revalidatePath(`/${locale}/events/${slug}`);
  redirect(`/${locale}/events/${slug}?registered=1`);
}

export async function cancelRegistrationAction(form: FormData) {
  const locale = form.get("locale") === "fr" ? "fr" : "en";
  const slug = String(form.get("slug"));
  const user = await getSession();
  if (!user) redirect(`/${locale}/signin`);
  const event = await db.query.events.findFirst({ where: eq(schema.events.slug, slug) });
  if (!event) redirect(`/${locale}/events`);
  await db.update(schema.eventRegistrations).set({ status: "cancelled" }).where(and(eq(schema.eventRegistrations.eventId, event.id), eq(schema.eventRegistrations.userId, user.id)));
  // promote first waitlisted
  const next = await db.query.eventRegistrations.findFirst({ where: and(eq(schema.eventRegistrations.eventId, event.id), eq(schema.eventRegistrations.status, "waitlisted")) });
  if (next) await db.update(schema.eventRegistrations).set({ status: "confirmed" }).where(eq(schema.eventRegistrations.id, next.id));
  await audit({ actorId: user.id, actorRole: user.role, action: "event.cancelled", entityType: "event", entityId: event.id });
  revalidatePath(`/${locale}/events/${slug}`);
  redirect(`/${locale}/events/${slug}`);
}

export async function checkInAction(form: FormData) {
  const user = await getSession();
  if (!user || !can(user.role, "events.checkin")) return;
  const code = String(form.get("ticketCode") ?? "").trim().toUpperCase();
  const registrationId = String(form.get("registrationId") ?? "");
  const path = String(form.get("path") ?? "/en/admin/events");
  const reg = registrationId
    ? await db.query.eventRegistrations.findFirst({ where: eq(schema.eventRegistrations.id, registrationId) })
    : await db.query.eventRegistrations.findFirst({ where: eq(schema.eventRegistrations.ticketCode, code) });
  if (!reg) { revalidatePath(path); redirect(`${path}?result=notfound`); }
  const already = await db.query.attendance.findFirst({ where: eq(schema.attendance.registrationId, reg.id) });
  if (!already) {
    await db.insert(schema.attendance).values({ id: newId("att"), registrationId: reg.id, eventId: reg.eventId, checkedInBy: user.id, method: registrationId ? "manual" : "qr" });
    await audit({ actorId: user.id, actorRole: user.role, action: "event.checked_in", entityType: "event_registration", entityId: reg.id });
  }
  revalidatePath(path);
  redirect(`${path}?result=${already ? "already" : "ok"}&reg=${reg.id}`);
}
