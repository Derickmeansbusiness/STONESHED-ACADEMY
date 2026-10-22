"use server";
import { headers } from "next/headers";
import { z } from "zod";
import { db, schema } from "@/lib/db";
import { newId } from "@/lib/ids";
import { getSession } from "@/lib/auth/session";
import { audit, track, queueNotification } from "@/lib/services/audit";
import { rateLimit } from "@/lib/rate-limit";

export type FormState = { ok?: boolean; error?: string } | undefined;

const adviserSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().email(),
  phone: z.string().trim().max(30).optional(),
  topic: z.string().trim().min(3).max(160),
  fundSlug: z.string().optional(),
  message: z.string().trim().max(2000).optional(),
  source: z.string().default("fund_page"),
  preferredChannel: z.enum(["phone", "email", "in_person", "video"]).default("email"),
  consent: z.literal("on"),
  locale: z.enum(["en", "fr"]),
});

export async function adviserInquiryAction(_prev: FormState, form: FormData): Promise<FormState> {
  const locale = form.get("locale") === "fr" ? "fr" : "en";
  const parsed = adviserSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: locale === "fr" ? "Veuillez vérifier les champs et accepter d'être contacté(e)." : "Please check the fields and consent to being contacted." };
  const h = await headers();
  const ip = h.get("x-forwarded-for") ?? "local";
  if (!rateLimit(`adviser:${ip}`, 5, 60 * 60_000).ok) return { error: locale === "fr" ? "Trop de demandes. Réessayez plus tard." : "Too many requests. Try again later." };
  const user = await getSession();
  const d = parsed.data;
  const id = newId("inq");
  await db.insert(schema.adviserInquiries).values({ id, userId: user?.id ?? null, fullName: d.fullName, email: d.email, phone: d.phone || null, topic: d.topic, fundSlug: d.fundSlug || null, message: d.message || null, source: d.source, consentContact: true, locale });
  await db.insert(schema.consultationRequests).values({ id: newId("con"), inquiryId: id, preferredChannel: d.preferredChannel, crmSyncStatus: "not_configured" });
  await db.insert(schema.userConsents).values({ id: newId("cns"), userId: user?.id ?? "anonymous", consentType: "adviser_contact", granted: true, version: "1.0" }).catch(() => {});
  await audit({ actorId: user?.id, actorRole: user?.role, action: "adviser_inquiry.created", entityType: "adviser_inquiry", entityId: id, metadata: { source: d.source, fundSlug: d.fundSlug } });
  await track({ userId: user?.id, eventName: "adviser_request", locale, properties: { source: d.source, fundSlug: d.fundSlug } });
  await queueNotification({ userId: user?.id, channel: "email", recipient: "investor-relations@stoneshed-am.com", subject: `Adviser request: ${d.topic}`, body: `New voluntary consultation request from ${d.fullName} (${d.email}). Source: ${d.source}.` });
  return { ok: true };
}

const partnershipSchema = z.object({
  institutionName: z.string().trim().min(2).max(120),
  institutionType: z.enum(["university", "business_school", "professional_body", "employer", "public_body"]),
  contactPerson: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().email(),
  phone: z.string().trim().max(30).optional(),
  city: z.string().trim().min(2).max(60),
  country: z.string().trim().min(2).max(60),
  expectedParticipants: z.coerce.number().int().min(1).max(100000).optional(),
  requestedProgram: z.string().trim().min(2).max(120),
  deliveryFormat: z.enum(["on_campus", "online", "blended"]),
  preferredTiming: z.string().trim().max(120).optional(),
  details: z.string().trim().max(3000).optional(),
  locale: z.enum(["en", "fr"]),
});

export async function partnershipInquiryAction(_prev: FormState, form: FormData): Promise<FormState> {
  const locale = form.get("locale") === "fr" ? "fr" : "en";
  const parsed = partnershipSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: locale === "fr" ? "Veuillez vérifier les champs obligatoires." : "Please check the required fields." };
  const h = await headers();
  if (!rateLimit(`partner:${h.get("x-forwarded-for") ?? "local"}`, 5, 60 * 60_000).ok) return { error: locale === "fr" ? "Trop de demandes. Réessayez plus tard." : "Too many requests. Try again later." };
  const user = await getSession();
  const d = parsed.data;
  const id = newId("pin");
  await db.insert(schema.partnershipInquiries).values({ id, institutionName: d.institutionName, institutionType: d.institutionType, contactPerson: d.contactPerson, email: d.email, phone: d.phone || null, city: d.city, country: d.country, expectedParticipants: d.expectedParticipants ?? null, requestedProgram: d.requestedProgram, deliveryFormat: d.deliveryFormat, preferredTiming: d.preferredTiming || null, details: d.details || null, locale, status: "new" });
  await audit({ actorId: user?.id, actorRole: user?.role, action: "partnership_inquiry.created", entityType: "partnership_inquiry", entityId: id });
  await track({ userId: user?.id, eventName: "institutional_inquiry", locale, properties: { type: d.institutionType, program: d.requestedProgram } });
  await queueNotification({ channel: "email", recipient: "academy-partnerships@stoneshed-am.com", subject: `Partnership inquiry: ${d.institutionName}`, body: `${d.contactPerson} (${d.email}) requested ${d.requestedProgram}, ${d.deliveryFormat}, for ~${d.expectedParticipants ?? "?"} participants.` });
  return { ok: true };
}
