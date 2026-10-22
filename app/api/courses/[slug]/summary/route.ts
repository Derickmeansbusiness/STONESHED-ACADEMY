import { getCourse } from "@/lib/services/content";
import { isLocale, pick, pickArr } from "@/lib/i18n";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const url = new URL(req.url);
  const locale = isLocale(url.searchParams.get("locale") ?? "") ? (url.searchParams.get("locale") as "en" | "fr") : "en";
  const course = await getCourse(slug);
  if (!course) return new Response("Not found", { status: 404 });
  const lines: string[] = [`STONESHED ACADEMY — ${pick(course, "title", locale)}`, "", pick(course, "summary", locale), "", locale === "fr" ? "OBJECTIFS" : "LEARNING OUTCOMES", ...pickArr<typeof course, string>(course, "outcomes", locale).map((o) => `- ${o}`), ""];
  for (const m of course.modules) {
    lines.push(`== ${pick(m, "title", locale)} ==`);
    for (const l of m.lessons) {
      lines.push(`-- ${pick(l, "title", locale)}`);
      for (const k of pickArr<typeof l, string>(l, "keyTakeaways", locale)) lines.push(`   • ${k}`);
    }
    lines.push("");
  }
  lines.push(locale === "fr" ? "Contenu pédagogique uniquement. Ne constitue pas un conseil en investissement." : "Educational content only. Not investment advice.");
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Content-Disposition": `attachment; filename="${slug}-summary-${locale}.txt"` } });
}
