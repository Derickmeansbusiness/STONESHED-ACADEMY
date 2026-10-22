import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const url = new URL(req.url);
  const locale = url.searchParams.get("locale") === "fr" ? "fr" : "en";
  const id = (url.searchParams.get("id") ?? "").trim().toUpperCase().replace(/[^A-Z0-9-]/g, "");
  return NextResponse.redirect(new URL(`/${locale}/verify/${id || "unknown"}`, req.url));
}
