"use server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "@/lib/db";
import { newId } from "@/lib/ids";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSession, destroySession, getSession } from "@/lib/auth/session";
import { audit, track } from "@/lib/services/audit";
import { rateLimit } from "@/lib/rate-limit";
import { isLocale } from "@/lib/i18n";

export type AuthState = { error?: string } | undefined;

const registerSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().email().max(120),
  password: z.string().min(8).max(128),
  locale: z.enum(["en", "fr"]),
  terms: z.literal("on"),
  minor: z.string().optional(),
  next: z.string().optional(),
});

async function clientKey() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
}

export async function registerAction(_prev: AuthState, form: FormData): Promise<AuthState> {
  const parsed = registerSchema.safeParse(Object.fromEntries(form));
  const locale = isLocale(String(form.get("locale"))) ? String(form.get("locale")) : "en";
  if (!parsed.success) return { error: locale === "fr" ? "Veuillez vérifier les champs du formulaire." : "Please check the form fields." };
  const { ok } = rateLimit(`register:${await clientKey()}`, 10, 10 * 60_000);
  if (!ok) return { error: locale === "fr" ? "Trop de tentatives. Réessayez plus tard." : "Too many attempts. Try again later." };
  const d = parsed.data;
  const existing = await db.query.users.findFirst({ where: eq(schema.users.email, d.email) });
  if (existing) return { error: locale === "fr" ? "Un compte existe déjà avec cette adresse e-mail." : "An account with this email already exists." };

  const id = newId("usr");
  await db.insert(schema.users).values({ id, email: d.email, passwordHash: await hashPassword(d.password), fullName: d.fullName, role: "learner", locale: d.locale });
  await db.insert(schema.learnerProfiles).values({ userId: id, isMinor: d.minor === "on", guardianConsentAt: d.minor === "on" ? Math.floor(Date.now() / 1000) : null });
  await db.insert(schema.userConsents).values([
    { id: newId("cns"), userId: id, consentType: "terms", granted: true, version: "1.0" },
    { id: newId("cns"), userId: id, consentType: "privacy", granted: true, version: "1.0" },
    ...(d.minor === "on" ? [{ id: newId("cns"), userId: id, consentType: "guardian", granted: true, version: "1.0" }] : []),
  ]);
  await audit({ actorId: id, actorRole: "learner", action: "user.registered", entityType: "user", entityId: id });
  await track({ userId: id, eventName: "registration", locale: d.locale });
  await createSession({ id, email: d.email, fullName: d.fullName, role: "learner", locale: d.locale, isDemoPresenter: false });
  redirect(`/${locale}/onboarding${d.next ? `?next=${encodeURIComponent(d.next)}` : ""}`);
}

const signinSchema = z.object({ email: z.string().trim().toLowerCase().email(), password: z.string().min(1), locale: z.enum(["en", "fr"]), next: z.string().optional() });

export async function signinAction(_prev: AuthState, form: FormData): Promise<AuthState> {
  const parsed = signinSchema.safeParse(Object.fromEntries(form));
  const locale = isLocale(String(form.get("locale"))) ? String(form.get("locale")) : "en";
  const invalid = { error: locale === "fr" ? "E-mail ou mot de passe invalide." : "Invalid email or password." };
  if (!parsed.success) return invalid;
  const { ok } = rateLimit(`signin:${await clientKey()}`, 20, 10 * 60_000);
  if (!ok) return { error: locale === "fr" ? "Trop de tentatives. Réessayez plus tard." : "Too many attempts. Try again later." };
  const user = await db.query.users.findFirst({ where: eq(schema.users.email, parsed.data.email) });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    await audit({ action: "auth.failed", metadata: { email: parsed.data.email } });
    return invalid;
  }
  await db.update(schema.users).set({ lastLoginAt: Math.floor(Date.now() / 1000) }).where(eq(schema.users.id, user.id));
  await audit({ actorId: user.id, actorRole: user.role, action: "auth.signin" });
  await track({ userId: user.id, eventName: "signin", locale });
  await createSession({ id: user.id, email: user.email, fullName: user.fullName, role: user.role, locale: user.locale, isDemoPresenter: user.isDemoPresenter });
  const next = parsed.data.next && parsed.data.next.startsWith("/") ? parsed.data.next : `/${locale}/dashboard`;
  redirect(next);
}

export async function signoutAction(locale: string) {
  const s = await getSession();
  if (s) await audit({ actorId: s.id, actorRole: s.role, action: "auth.signout" });
  await destroySession();
  redirect(`/${isLocale(locale) ? locale : "en"}`);
}

const onboardingSchema = z.object({
  interests: z.array(z.string()).max(3),
  audience: z.string(),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  locale: z.enum(["en", "fr"]),
  next: z.string().optional(),
});

export async function onboardingAction(form: FormData) {
  const user = await getSession();
  const locale = isLocale(String(form.get("locale"))) ? String(form.get("locale")) : "en";
  if (!user) redirect(`/${locale}/signin`);
  const parsed = onboardingSchema.safeParse({ interests: form.getAll("interests").map(String), audience: form.get("audience"), level: form.get("level"), locale: form.get("locale"), next: form.get("next") ?? undefined });
  if (!parsed.success) redirect(`/${locale}/onboarding`);
  const d = parsed.data;
  const pathway = d.interests[0] ?? "investing";
  await db.update(schema.learnerProfiles).set({ interests: d.interests, audience: d.audience, knowledgeLevel: d.level, pathwaySlug: pathway, onboardedAt: Math.floor(Date.now() / 1000) }).where(eq(schema.learnerProfiles.userId, user.id));
  await db.update(schema.users).set({ locale: d.locale }).where(eq(schema.users.id, user.id));
  await track({ userId: user.id, eventName: "onboarding_completed", locale: d.locale, properties: { interests: d.interests, audience: d.audience, level: d.level } });
  redirect(`/${d.locale}/dashboard?welcome=1`);
}
