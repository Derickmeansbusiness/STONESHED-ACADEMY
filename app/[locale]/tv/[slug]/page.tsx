import { notFound } from "next/navigation";
import Link from "next/link";
import { and, eq } from "drizzle-orm";
import { BookOpen, FlaskConical, Bookmark, BookmarkCheck, ChevronLeft } from "lucide-react";
import { getDictionary, pick, type Locale } from "@/lib/i18n";
import { getVideo } from "@/lib/services/content";
import { getSession, isStaff } from "@/lib/auth/session";
import { db, schema } from "@/lib/db";
import { toggleSaveVideoAction } from "@/lib/actions/tv";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { VideoCard, fmtDuration } from "@/components/cards/video-card";
import { TvPlayer } from "@/components/tv/tv-player";
import { ShareButton } from "@/components/ui/share-button";

const STAGES = ["idea", "research", "script", "compliance_review", "storyboard", "production", "quality_review", "subtitles", "published"] as const;

export default async function VideoPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const t = getDictionary(locale);
  const [video, user] = await Promise.all([getVideo(slug), getSession()]);
  if (!video) notFound();
  if (video.isProductSpecific && !(user && isStaff(user.role))) notFound();
  const progress = user ? await db.query.videoProgress.findFirst({ where: and(eq(schema.videoProgress.userId, user.id), eq(schema.videoProgress.videoId, video.id)) }) : null;
  const related = video.series.videos.filter((v) => v.id !== video.id && !v.isProductSpecific).slice(0, 4).map((v) => ({ ...v, series: video.series }));
  const course = video.relatedCourseSlug ? await db.query.courses.findFirst({ where: eq(schema.courses.slug, video.relatedCourseSlug) }) : null;
  const stageIdx = STAGES.indexOf(video.productionStage as (typeof STAGES)[number]);
  const path = `/${locale}/tv/${video.slug}`;

  return (
    <div className="bg-midnight pt-24 pb-24 text-white">
      <Container>
        <Link href={`/${locale}/tv`} className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white"><ChevronLeft className="h-4 w-4" />{t.nav.tv}</Link>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <TvPlayer videoId={video.id} script={video.script} mediaUrl={video.mediaUrl} captionsVttUrl={video.captionsVttUrl} seed={video.slug} title={pick(video, "title", locale)} initialSeconds={progress?.positionSeconds ?? 0} />
            {video.isProductSpecific && <Notice tone="warning" className="mt-4 text-[#f3d9a0]">{t.tv.productSpecific}</Notice>}
            {!video.mediaUrl && <p className="mt-3 text-xs text-white/50">{t.tv.storyboardNotice}</p>}
            <div className="mt-8">
              <p className="eyebrow-light mb-1">{pick(video.series, "title", locale)}</p>
              <h1 className="display-md text-white">{pick(video, "title", locale)}</h1>
              <p className="mt-4 text-white/75">{pick(video, "summary", locale)}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge tone="white">{fmtDuration(video.durationSeconds)}</Badge>
                {video.topics.map((x) => <Badge key={x} tone="white">{x}</Badge>)}
                <Badge tone="white">{video.languages.map((l) => l.toUpperCase()).join(" / ")}</Badge>
                {user && (
                  <form action={toggleSaveVideoAction}><input type="hidden" name="videoId" value={video.id} /><input type="hidden" name="path" value={path} />
                    <button className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold hover:bg-white/10">{progress?.saved ? <BookmarkCheck className="h-3.5 w-3.5 text-sky" /> : <Bookmark className="h-3.5 w-3.5" />}{progress?.saved ? t.tv.savedToList : t.tv.saveToList}</button>
                  </form>
                )}
                {!video.isProductSpecific && <ShareButton label={t.common.share} copied={t.common.copied} dark />}
              </div>
            </div>
            <section className="mt-10">
              <h2 className="font-display text-lg font-bold">{t.learn.transcript}</h2>
              <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-relaxed text-white/80">
                <p><span className="font-semibold text-sky">{locale === "fr" ? "Accroche" : "Hook"} · </span>{video.script.hook[locale]}</p>
                {video.script.scenes.map((s, i) => <p key={i}><span className="font-semibold text-sky">{s.title[locale]} · </span>{s.narration[locale]}</p>)}
                <p><span className="font-semibold text-sky">{locale === "fr" ? "Conclusion" : "Closing"} · </span>{video.script.closing[locale]}</p>
                {video.script.disclaimer && <p className="border-t border-white/10 pt-3 text-xs text-white/55">{video.script.disclaimer[locale]}</p>}
              </div>
            </section>
          </div>
          <aside className="space-y-6">
            <div className="surface-dark p-5">
              <p className="eyebrow-light mb-3">{t.tv.productionStage}</p>
              <ol className="space-y-1.5">
                {STAGES.map((s, i) => <li key={s} className={`flex items-center gap-2 text-xs ${i < stageIdx ? "text-white/50 line-through" : i === stageIdx ? "font-semibold text-sky" : "text-white/40"}`}><span className={`h-1.5 w-1.5 rounded-full ${i <= stageIdx ? "bg-sky" : "bg-white/20"}`} />{t.tv.stages[s]}</li>)}
              </ol>
            </div>
            <div className="surface-dark p-5">
              <p className="eyebrow-light mb-3">{t.tv.relatedLearning}</p>
              <div className="space-y-2">
                {course && <Link href={`/${locale}/learn/${course.slug}`} className="flex items-center gap-3 rounded-xl border border-white/10 p-3 text-sm hover:bg-white/10"><BookOpen className="h-4 w-4 text-sky" />{pick(course, "title", locale)}</Link>}
                {video.relatedLabSlug && <Link href={`/${locale}/lab/${video.relatedLabSlug}`} className="flex items-center gap-3 rounded-xl border border-white/10 p-3 text-sm hover:bg-white/10"><FlaskConical className="h-4 w-4 text-sky" />{t.learn.openLab}</Link>}
                {!course && !video.relatedLabSlug && <Link href={`/${locale}/learn`} className="flex items-center gap-3 rounded-xl border border-white/10 p-3 text-sm hover:bg-white/10"><BookOpen className="h-4 w-4 text-sky" />{t.nav.learn}</Link>}
              </div>
            </div>
            {!user && <Button href={`/${locale}/register`} variant="light" className="w-full">{t.nav.startFree}</Button>}
          </aside>
        </div>
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="display-sm mb-5 text-white">{locale === "fr" ? "Dans la même série" : "More from this series"}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((v) => <VideoCard key={v.id} video={v} locale={locale} dark />)}</div>
          </section>
        )}
      </Container>
    </div>
  );
}
