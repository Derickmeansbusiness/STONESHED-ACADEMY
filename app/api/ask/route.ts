import { NextResponse } from "next/server";
import { z } from "zod";
import { askTutor } from "@/lib/ai/tutor";
import { getSession } from "@/lib/auth/session";
import { rateLimit } from "@/lib/rate-limit";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";

const bodySchema = z.object({ question: z.string().trim().min(2).max(1000), locale: z.enum(["en", "fr"]), sessionId: z.string().min(4).max(64), mode: z.enum(["default", "simpler", "example", "quiz", "translate", "lesson"]).optional() });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  if (!rateLimit(`ask:${ip}`, 30, 10 * 60_000).ok) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const user = await getSession();
  const profile = user ? await db.query.learnerProfiles.findFirst({ where: eq(schema.learnerProfiles.userId, user.id) }) : null;
  const result = await askTutor({ ...parsed.data, userId: user?.id, level: profile?.knowledgeLevel });
  return NextResponse.json(result);
}
