import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, BookOpen, PlayCircle } from "lucide-react";
import { getDictionary, pick, formatDate, type Locale } from "@/lib/i18n";
import { getArticle, coursesBySlugs } from "@/lib/services/content";
import { db, schema } from "@/lib/db";
import { inArray } from "drizzle-orm";
import { renderMarkdownLite } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { CoverArt } from "@/components/ui/cover-art";
import { ShareButton } from "@/components/ui/share-button";
import { Notice } from "@/components/ui/notice";

export default async function ArticlePage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const t = getDictionary(locale);
  const article = await getArticle(slug);
  if (!article) notFound();
  const [courses, videos] = await Promise.all([coursesBySlugs(article.relatedCourseSlugs), article.relatedVideoSlugs.length ? db.query.videos.findMany({ where: inArray(schema.videos.slug, article.relatedVideoSlugs) }) : []]);
  return (
    <article className="pt-28 pb-12">
      <Container size="md">
        <Link href={`/${locale}/insights`} className="text-sm text-steel hover:text-royal">← {t.insights.title}</Link>
        <div className="mt-4 flex flex-wrap gap-1.5">{article.categories.map((c) => <Badge key={c} tone="sky">{c}</Badge>)}</div>
        <h1 className="display-lg mt-4 text-ink">{pick(article, "title", locale)}</h1>
        <p className="mt-5 text-xl leading-relaxed text-steel">{pick(article, "deck", locale)}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-mist py-4 text-sm text-steel">
          <span className="font-semibold text-slate">{article.author}</span><span>{formatDate(article.publishedAt, locale)}</span><span>{t.insights.updated} {formatDate(article.updatedAt, locale)}</span><span>{article.readingMinutes} {t.insights.readingTime}</span><span>{locale.toUpperCase()}</span>
          <span className="ml-auto"><ShareButton label={t.common.share} copied={t.common.copied} /></span>
        </div>
        <div className="my-10 aspect-[2.2/1] overflow-hidden rounded-3xl"><CoverArt seed={article.slug} theme="slate" pattern="curve" /></div>
        <div className="prose-sa" dangerouslySetInnerHTML={{ __html: renderMarkdownLite(pick(article, "body", locale)) }} />
        <section className="mt-14 rounded-2xl border border-mist/70 bg-white p-6">
          <p className="eyebrow mb-3">{t.insights.sources}</p>
          <ol className="list-decimal space-y-1.5 pl-5 text-sm text-slate">{article.sources.map((s, i) => <li key={i}>{s.href ? <a href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-finance hover:underline">{s.label}<ExternalLink className="h-3 w-3" /></a> : s.label}</li>)}</ol>
        </section>
        {(courses.length > 0 || videos.length > 0) && (
          <section className="mt-10"><p className="eyebrow mb-3">{t.insights.related}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {courses.map((c) => <Link key={c.id} href={`/${locale}/learn/${c.slug}`} className="flex items-center gap-3 rounded-xl border border-mist/70 bg-white p-4 text-sm font-semibold text-ink hover:border-finance"><BookOpen className="h-4 w-4 text-finance" />{pick(c, "title", locale)}</Link>)}
              {videos.map((v) => <Link key={v.id} href={`/${locale}/tv/${v.slug}`} className="flex items-center gap-3 rounded-xl border border-mist/70 bg-white p-4 text-sm font-semibold text-ink hover:border-finance"><PlayCircle className="h-4 w-4 text-finance" />{pick(v, "title", locale)}</Link>)}
            </div>
          </section>
        )}
        <Notice tone="compliance" className="mt-10">{t.footer.disclosure}</Notice>
      </Container>
    </article>
  );
}
