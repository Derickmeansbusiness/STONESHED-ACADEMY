import Link from "next/link";
import { Play, Clock } from "lucide-react";
import { CoverArt } from "@/components/ui/cover-art";
import { Badge } from "@/components/ui/badge";
import { getDictionary, pick, type Locale } from "@/lib/i18n";

type VideoLike = { slug: string; titleEn: string; titleFr: string; summaryEn: string; summaryFr: string; durationSeconds: number; mediaUrl: string | null; productionStage: string; series?: { titleEn: string; titleFr: string; theme: string } | null };

export function fmtDuration(s: number) {
  const m = Math.floor(s / 60), r = s % 60;
  return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}:${String(r).padStart(2, "0")}`;
}

export function VideoCard({ video, locale, dark = false }: { video: VideoLike; locale: Locale; dark?: boolean }) {
  const t = getDictionary(locale);
  return (
    <Link href={`/${locale}/tv/${video.slug}`} className={`group flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${dark ? "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]" : "border-mist/70 bg-white hover:shadow-[var(--shadow-lift)]"}`}>
      <div className="relative aspect-video overflow-hidden">
        <CoverArt seed={video.slug} theme={video.series?.theme ?? "midnight"} className="transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-royal shadow-lg transition group-hover:scale-110"><Play className="ml-0.5 h-5 w-5 fill-current" /></span>
        </div>
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-md bg-ink/70 px-2 py-0.5 text-[11px] font-semibold text-white"><Clock className="h-3 w-3" />{fmtDuration(video.durationSeconds)}</span>
        {!video.mediaUrl && <span className="absolute top-3 left-3"><Badge tone="white">{t.tv.storyboardMode}</Badge></span>}
      </div>
      <div className="p-4">
        {video.series && <p className={`mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${dark ? "text-sky" : "text-finance"}`}>{pick(video.series, "title", locale)}</p>}
        <h3 className={`font-display text-[15.5px] font-bold leading-snug ${dark ? "text-white" : "text-ink"}`}>{pick(video, "title", locale)}</h3>
        <p className={`mt-1.5 line-clamp-2 text-[13px] leading-relaxed ${dark ? "text-white/60" : "text-steel"}`}>{pick(video, "summary", locale)}</p>
      </div>
    </Link>
  );
}
