import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { cache } from "react";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import type { Role } from "@/lib/db/schema";

const COOKIE = "sa_session";
const secret = new TextEncoder().encode(process.env.AUTH_SECRET || "stoneshed-academy-dev-secret-change-me-0123456789");

export type SessionUser = {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  locale: "en" | "fr";
  isDemoPresenter: boolean;
};

export async function createSession(user: SessionUser) {
  const token = await new SignJWT({ sub: user.id, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("14d")
    .sign(secret);
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}

/** Current user, memoised per request. Returns null for anonymous visitors. */
export const getSession = cache(async (): Promise<SessionUser | null> => {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    const id = payload.sub;
    if (!id) return null;
    const user = await db.query.users.findFirst({ where: eq(schema.users.id, id) });
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      locale: user.locale,
      isDemoPresenter: user.isDemoPresenter,
    };
  } catch {
    return null;
  }
});

const STAFF: Role[] = ["super_admin", "academy_manager", "content_creator", "instructor", "compliance_reviewer", "research_editor"];

export function isStaff(role: Role | undefined | null) {
  return !!role && STAFF.includes(role);
}
export function isAdmin(role: Role | undefined | null) {
  return role === "super_admin" || role === "academy_manager";
}
export function canApproveFundContent(role: Role | undefined | null) {
  return role === "super_admin" || role === "compliance_reviewer";
}
export function canPresentVision(user: SessionUser | null) {
  return !!user && (user.isDemoPresenter || isAdmin(user.role));
}

/** Permission matrix used by the admin area and server actions. */
export const PERMISSIONS: Record<string, Role[]> = {
  "admin.view": ["super_admin", "academy_manager", "content_creator", "instructor", "compliance_reviewer", "research_editor"],
  "content.edit": ["super_admin", "academy_manager", "content_creator", "research_editor"],
  "content.approve": ["super_admin", "academy_manager", "compliance_reviewer"],
  "fund.approve": ["super_admin", "compliance_reviewer"],
  "events.manage": ["super_admin", "academy_manager", "instructor"],
  "events.checkin": ["super_admin", "academy_manager", "instructor"],
  "institutions.manage": ["super_admin", "academy_manager"],
  "engagement.view": ["super_admin", "academy_manager"],
  "users.manage": ["super_admin"],
  "audit.view": ["super_admin", "compliance_reviewer", "academy_manager"],
  "ai.view": ["super_admin", "compliance_reviewer", "academy_manager"],
  "analytics.view": ["super_admin", "academy_manager", "research_editor"],
};

export function can(role: Role | undefined | null, permission: keyof typeof PERMISSIONS): boolean {
  if (!role) return false;
  return PERMISSIONS[permission]?.includes(role) ?? false;
}
