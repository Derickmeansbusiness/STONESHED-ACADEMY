import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth/session";

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const locale = (form?.get("locale") as string) === "fr" ? "fr" : "en";
  await destroySession();
  return NextResponse.redirect(new URL(`/${locale}`, req.url), { status: 303 });
}
