import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { getDictionary, pick, type Locale } from "@/lib/i18n";
import { listSeries } from "@/lib/services/content";
import { getSession } from "@/lib/auth/session";
import { db, schema } from "@/lib/db";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { VideoCard } from "@/components/cards/video-card";
import { CoverArt } from "@/components/ui/cover-art";
import { Badge } from "@/components/ui/badge";
import { TvFilters } from "@/components/tv/tv-filters";
import { Notice } from "@/components/ui/notice";

export const metadata: Metadata = { title: "Academy TV" };

export default async function TvPage({ params, searchParams }: { params: Promise<{ locale: Locale }>; searchParams: Promise<{ topic?: string; duration?: string; lang?: string }> }) {
  const { locale } = await params;
  const sp = await searchParams;
  const t = getDictionary(locale);
  const [series, user] = await Promise.all([listSeries(), getSession()]);
  const progress = user ? await db.query.videoProgress.findMany({ where: eq(schema.videoProgress.userId, user.id) }) : [];
  const continueIds = progress.filter((p) => p.positionSeconds > 0 && !p.completed).map((p) => p.videoId);
  const all = series.flatMap((s) => s.videos.map((v) => ({ ...v, series: s })));
  const visible = all.filter((v) => !v.isProductSpecific || (user && ["super_admin", "academy_manager", "compliance_reviewer", "content_creator"].includes(user.role)));
  const match = (v: (typeof visible)[number]) => (!sp.topic || v.topics.includes(sp.topic)) && (!sp.lang || v.languages.includes(sp.lang)) && (!sp.duration || (sp.duration === "under2" ? v.durationSeconds < 120 : sp.duration === "under10" ? v.durationSeconds < 600 : v.durationSeconds >= 600));
  const filtered = visible.filter(match);
  const topics = Array.from(new Set(all.flatMap((v) => v.topics)));
  const hero = all.find((v) => v.slug === "what-is-a-mutual-fund") ?? all[0];
  const continueList = visible.filter((v) => continueIds.includes(v.id));

  return (
    <div className="bg-midnight text-white">
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 opacity-40">{hero && <CoverArt seed={hero.slug} theme="midnight" pattern="nodes" />}</div>
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/40 via-midnight/80 to-midnight" />
        <Container className="relative">
          <Reveal><SectionHeading eyebrow="Stoneshed Academy TV" title={t.tv.title} sub={t.tv.sub} light size="lg" /></Reveal>
          <div className="mt-8 flex flex-wrap gap-2">{series.map((s) => <a key={s.id} href={`#${s.slug}`} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/15">{pick(s, "title", locale)}</a>)}</div>
        </Container>
      </section>
      <Container className="pb-24">
        <TvFilters topics={topics} current={sp} />
        {continueList.length > 0 && (
          <section className="mt-12">
            <h2 className="display-sm mb-5 text-white">{t.tv.continueWatching}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{continueList.map((v) => <VideoCard key={v.id} video={v} locale={locale} dark />)}</div>
          </section>
        )}
        {series.map((s) => {
          const vids = filtered.filter((v) => v.seriesId === s.id);
          if (!vids.length) return null;
          return (
            <section key={s.id} id={s.slug} className="mt-16 scroll-mt-28">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div><p className="eyebrow-light mb-1">{t.tv.series}</p><h2 className="display-sm text-white">{pick(s, "title", locale)}</h2><p className="mt-1 text-sm text-white/60">{pick(s, "tagline", locale)}</p></div>
                <Badge tone="white">{vids.length} {t.tv.episodes}</Badge>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{vids.map((v) => <VideoCard key={v.id} video={v} locale={locale} dark />)}</div>
            </section>
          );
        })}
        {filtered.length === 0 && <p className="mt-16 text-white/60">{locale === "fr" ? "Aucun épisode ne correspond à ces filtres." : "No episodes match these filters."}</p>}
        <div className="mt-16"><Notice tone="info">{t.tv.storyboardNotice}</Notice></div>
      </Container>
    </div>
  );
}
