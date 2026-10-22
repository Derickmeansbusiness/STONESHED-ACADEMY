import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CoverArt } from "@/components/ui/cover-art";
import { getDictionary, pick, formatDate, type Locale } from "@/lib/i18n";

type ArticleLike = { slug: string; titleEn: string; titleFr: string; deckEn: string; deckFr: string; author: string; categories: string[]; readingMinutes: number; publishedAt: string };

export function ArticleCard({ article, locale, featured = false }: { article: ArticleLike; locale: Locale; featured?: boolean }) {
  const t = getDictionary(locale);
  return (
    <Link href={`/${locale}/insights/${article.slug}`} className={`group flex flex-col gap-4 ${featured ? "lg:flex-row lg:items-center lg:gap-10" : ""}`}>
      <div className={`overflow-hidden rounded-2xl ${featured ? "aspect-[16/10] lg:w-1/2" : "aspect-[16/9]"}`}><CoverArt seed={article.slug} theme="slate" pattern="curve" className="transition-transform duration-700 group-hover:scale-105" /></div>
      <div className={featured ? "lg:w-1/2" : ""}>
        <div className="mb-2 flex flex-wrap gap-1.5">{article.categories.slice(0, 2).map((c) => <Badge key={c} tone="gray">{c}</Badge>)}</div>
        <h3 className={`font-display font-bold leading-snug text-ink group-hover:text-finance ${featured ? "text-2xl sm:text-3xl" : "text-lg"}`}>{pick(article, "title", locale)}</h3>
        <p className={`mt-2 text-steel ${featured ? "text-base leading-relaxed" : "line-clamp-2 text-sm"}`}>{pick(article, "deck", locale)}</p>
        <p className="mt-3 text-xs text-steel">{article.author} · {formatDate(article.publishedAt, locale)} · {article.readingMinutes} {t.insights.readingTime}</p>
      </div>
    </Link>
  );
}
