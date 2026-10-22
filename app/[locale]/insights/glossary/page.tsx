import type { Metadata } from "next";
import { getDictionary, type Locale } from "@/lib/i18n";
import { listGlossary } from "@/lib/services/content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GlossaryBrowser } from "@/components/insights/glossary-browser";

export const metadata: Metadata = { title: "Glossary" };

export default async function GlossaryPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const terms = await listGlossary();
  return (
    <div className="pt-28 pb-12">
      <Container>
        <SectionHeading eyebrow={t.insights.title} title={t.insights.glossary} sub={t.insights.glossarySub} size="lg" />
        <div className="mt-10"><GlossaryBrowser terms={terms.map((x) => ({ slug: x.slug, term: locale === "fr" ? x.termFr : x.termEn, other: locale === "fr" ? x.termEn : x.termFr, definition: locale === "fr" ? x.definitionFr : x.definitionEn, category: x.category, related: x.relatedSlugs }))} /></div>
      </Container>
    </div>
  );
}
