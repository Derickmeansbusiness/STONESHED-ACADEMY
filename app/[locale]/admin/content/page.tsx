import { getDictionary, pick, type Locale } from "@/lib/i18n";
import { getSession } from "@/lib/auth/session";
import { listCourses, listSeries, listArticles, listGlossary } from "@/lib/services/content";
import { updateCourseStatusAction, updateVideoStageAction } from "@/lib/actions/admin";
import { PageTitle, Table, Td, Kpi, selectCls, btnCls } from "@/components/admin/ui";
import { Badge } from "@/components/ui/badge";
import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";

const STAGES = ["idea", "research", "script", "compliance_review", "storyboard", "production", "quality_review", "subtitles", "published"];

export default async function AdminContent({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const fr = locale === "fr";
  const [courses, series, articles, glossary, quizzes, user] = await Promise.all([db.query.courses.findMany({ with: { modules: { with: { lessons: true } } }, orderBy: [schema.courses.sortOrder] }), listSeries(), listArticles(), listGlossary(), db.query.quizzes.findMany(), getSession()]);
  void listCourses;
  const path = `/${locale}/admin/content`;
  const lessons = courses.reduce((n, c) => n + c.modules.reduce((m, x) => m + x.lessons.length, 0), 0);
  const videos = series.flatMap((s) => s.videos.map((v) => ({ ...v, seriesTitle: pick(s, "title", locale) })));
  return (
    <>
      <PageTitle title={t.admin.content} sub={fr ? "Cours, leçons, vidéos, articles, glossaire, quiz." : "Courses, lessons, videos, articles, glossary, quizzes."} />
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <Kpi label={fr ? "Cours" : "Courses"} value={courses.length} /><Kpi label={fr ? "Leçons" : "Lessons"} value={lessons} /><Kpi label={fr ? "Vidéos" : "Videos"} value={videos.length} /><Kpi label="Articles" value={articles.length} /><Kpi label={fr ? "Glossaire" : "Glossary"} value={glossary.length} /><Kpi label="Quiz" value={quizzes.length} />
      </div>
      <h2 className="mt-10 mb-3 font-display text-lg font-bold text-ink">{fr ? "Cours" : "Courses"}</h2>
      <Table head={[fr ? "Titre" : "Title", fr ? "Catégorie" : "Category", fr ? "Leçons" : "Lessons", t.common.status, fr ? "À la une" : "Featured", t.common.actions]}>
        {courses.map((c) => (
          <tr key={c.id}><Td><span className="font-medium text-ink">{pick(c, "title", locale)}</span><span className="block text-xs text-steel">{c.slug}</span></Td><Td>{t.learn.categories[c.category as "foundations"]}</Td><Td className="num">{c.modules.reduce((n, m) => n + m.lessons.length, 0)}</Td><Td><Badge tone={c.status === "published" ? "green" : "amber"}>{c.status}</Badge></Td><Td>{c.featured ? "★" : "—"}</Td>
            <Td><form action={updateCourseStatusAction} className="flex items-center gap-2"><input type="hidden" name="courseId" value={c.id} /><input type="hidden" name="path" value={path} /><select name="status" defaultValue={c.status} className={selectCls}><option value="draft">draft</option><option value="review">review</option><option value="published">published</option><option value="archived">archived</option></select><label className="flex items-center gap-1 text-xs"><input type="checkbox" name="featured" defaultChecked={c.featured} />★</label><button className={btnCls}>{t.common.save}</button></form></Td></tr>
        ))}
      </Table>
      <h2 className="mt-10 mb-3 font-display text-lg font-bold text-ink">{t.nav.tv} — {fr ? "flux de production" : "production workflow"}</h2>
      <p className="mb-3 text-xs text-steel">{fr ? "Idée → Recherche → Script → Revue conformité → Storyboard → Production → Contrôle qualité → Sous-titres → Publication. Renseignez une URL média approuvée pour remplacer le storyboard par la vidéo réelle. Les épisodes produits ne peuvent être publiés que par la conformité." : "Idea → Research → Script → Compliance review → Storyboard → Production → Quality review → Subtitles → Publication. Enter an approved media URL to replace the storyboard with real footage. Product episodes can only be published by compliance."}</p>
      <Table head={[fr ? "Épisode" : "Episode", fr ? "Série" : "Series", fr ? "Durée" : "Duration", fr ? "Étape" : "Stage", "Media", t.common.actions]}>
        {videos.map((v) => (
          <tr key={v.id}><Td><span className="font-medium text-ink">{pick(v, "title", locale)}</span>{v.isProductSpecific && <Badge tone="amber" className="ml-2">product</Badge>}</Td><Td>{v.seriesTitle}</Td><Td className="num">{Math.round(v.durationSeconds / 60)} min</Td><Td><Badge tone={v.productionStage === "published" ? "green" : "sky"}>{t.tv.stages[v.productionStage as "idea"]}</Badge></Td><Td>{v.mediaUrl ? "✓" : fr ? "storyboard" : "storyboard"}</Td>
            <Td><form action={updateVideoStageAction} className="flex flex-wrap items-center gap-2"><input type="hidden" name="videoId" value={v.id} /><input type="hidden" name="path" value={path} /><select name="stage" defaultValue={v.productionStage} className={selectCls}>{STAGES.map((s) => <option key={s} value={s} disabled={s === "published" && v.isProductSpecific && !(user && ["super_admin", "compliance_reviewer"].includes(user.role))}>{t.tv.stages[s as "idea"]}</option>)}</select><input name="mediaUrl" placeholder="https://…mp4" className="w-36 rounded-lg border border-mist px-2 py-1.5 text-xs" /><button className={btnCls}>{t.common.save}</button></form></Td></tr>
        ))}
      </Table>
      <h2 className="mt-10 mb-3 font-display text-lg font-bold text-ink">Articles</h2>
      <Table head={[fr ? "Titre" : "Title", fr ? "Auteur" : "Author", fr ? "Publié" : "Published", t.common.status]}>{articles.map((a) => <tr key={a.id}><Td className="font-medium text-ink">{pick(a, "title", locale)}</Td><Td>{a.author}</Td><Td>{a.publishedAt}</Td><Td><Badge tone="green">{a.status}</Badge></Td></tr>)}</Table>
    </>
  );
}
