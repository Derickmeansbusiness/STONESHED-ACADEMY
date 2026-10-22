import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { cache } from "react";
import { eq } from "drizzle-orm";
import { db, schema } from "@/lib/db";
import type { Role } from "@/lib/db/schema";
import { isAdmin } from "./permissions";

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

export { PERMISSIONS, isStaff, isAdmin, canApproveFundContent, can } from "./permissions";
export function canPresentVision(user: SessionUser | null) {
  return !!user && (user.isDemoPresenter || isAdmin(user.role));
}
