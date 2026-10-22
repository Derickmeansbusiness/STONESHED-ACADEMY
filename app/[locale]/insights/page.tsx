import type { Metadata } from "next";
import Link from "next/link";
import { BookA, ArrowRight } from "lucide-react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { listArticles } from "@/lib/services/content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { ArticleCard } from "@/components/cards/article-card";
import { Notice } from "@/components/ui/notice";

export const metadata: Metadata = { title: "Research & Insights" };
const CATS = ["Financial Literacy", "CEMAC Financial Markets", "Asset Management", "Fixed Income", "Investment Research", "Wealth Education", "Economic Perspectives", "Market Terminology", "Investment Risk", "Corporate Treasury"];

export default async function InsightsPage({ params, searchParams }: { params: Promise<{ locale: Locale }>; searchParams: Promise<{ category?: string }> }) {
  const { locale } = await params;
  const { category } = await searchParams;
  const t = getDictionary(locale);
  const all = await listArticles();
  const articles = category ? all.filter((a) => a.categories.includes(category)) : all;
  return (
    <div className="pt-28 pb-12">
      <Container>
        <Reveal><SectionHeading eyebrow={t.nav.insights} title={t.insights.title} sub={t.insights.sub} size="lg" /></Reveal>
        <div className="mt-8 flex flex-wrap gap-2">
          <Link href={`/${locale}/insights`} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${!category ? "border-royal bg-royal text-white" : "border-mist bg-white text-steel"}`}>{t.common.all}</Link>
          {CATS.map((c) => <Link key={c} href={`/${locale}/insights?category=${encodeURIComponent(c)}`} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${category === c ? "border-royal bg-royal text-white" : "border-mist bg-white text-steel hover:border-finance"}`}>{c}</Link>)}
        </div>
        <Link href={`/${locale}/insights/glossary`} className="mt-8 flex items-center justify-between rounded-3xl bg-midnight p-6 text-white transition hover:bg-royal"><div className="flex items-center gap-4"><BookA className="h-8 w-8 text-sky" /><div><p className="font-display text-xl font-bold">{t.insights.glossary}</p><p className="text-sm text-white/65">{t.insights.glossarySub}</p></div></div><ArrowRight className="h-5 w-5 text-sky" /></Link>
        {articles[0] && <div className="mt-14"><Reveal><ArticleCard article={articles[0]} locale={locale} featured /></Reveal></div>}
        <Stagger className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">{articles.slice(1).map((a) => <StaggerItem key={a.id}><ArticleCard article={a} locale={locale} /></StaggerItem>)}</Stagger>
        {articles.length === 0 && <p className="mt-14 text-steel">{locale === "fr" ? "Aucune publication dans cette catégorie pour le moment." : "No publications in this category yet."}</p>}
        <Notice tone="info" className="mt-16">{t.insights.marketNote}</Notice>
      </Container>
    </div>
  );
}
