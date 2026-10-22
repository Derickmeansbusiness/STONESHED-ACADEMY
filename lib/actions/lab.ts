"use server";
import { getSession } from "@/lib/auth/session";
import { track } from "@/lib/services/audit";
import { awardBadge } from "@/lib/services/learning";

export async function recordLabUseAction(slug: string, locale: string) {
  const user = await getSession();
  await track({ userId: user?.id ?? null, eventName: "lab_used", locale, properties: { lab: slug } });
  if (user) await awardBadge(user.id, "lab_explorer");
}
