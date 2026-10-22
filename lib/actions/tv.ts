"use server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db, schema } from "@/lib/db";
import { newId } from "@/lib/ids";
import { getSession } from "@/lib/auth/session";
import { track } from "@/lib/services/audit";

export async function saveVideoProgressAction(videoId: string, positionSeconds: number, completed: boolean) {
  const user = await getSession();
  if (!user) return;
  const existing = await db.query.videoProgress.findFirst({ where: and(eq(schema.videoProgress.userId, user.id), eq(schema.videoProgress.videoId, videoId)) });
  if (existing) await db.update(schema.videoProgress).set({ positionSeconds, completed: existing.completed || completed, updatedAt: Math.floor(Date.now() / 1000) }).where(eq(schema.videoProgress.id, existing.id));
  else await db.insert(schema.videoProgress).values({ id: newId("vp"), userId: user.id, videoId, positionSeconds, completed });
  if (completed && !existing?.completed) await track({ userId: user.id, eventName: "video_completed", properties: { videoId } });
}

export async function toggleSaveVideoAction(form: FormData) {
  const user = await getSession();
  if (!user) return;
  const videoId = String(form.get("videoId")), path = String(form.get("path"));
  const existing = await db.query.videoProgress.findFirst({ where: and(eq(schema.videoProgress.userId, user.id), eq(schema.videoProgress.videoId, videoId)) });
  if (existing) await db.update(schema.videoProgress).set({ saved: !existing.saved }).where(eq(schema.videoProgress.id, existing.id));
  else await db.insert(schema.videoProgress).values({ id: newId("vp"), userId: user.id, videoId, saved: true });
  revalidatePath(path);
}
