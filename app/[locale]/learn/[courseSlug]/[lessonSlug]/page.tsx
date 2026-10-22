import { notFound, redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import type { Locale } from "@/lib/i18n";
import { getLesson } from "@/lib/services/content";
import { getSession } from "@/lib/auth/session";
import { getEnrollment, getCourseProgress } from "@/lib/services/learning";
import { recordLessonPositionAction } from "@/lib/actions/learning";
import { db, schema } from "@/lib/db";
import { LessonPlayer } from "@/components/learn/lesson-player";

export default async function LessonPage({ params }: { params: Promise<{ locale: Locale; courseSlug: string; lessonSlug: string }> }) {
  const { locale, courseSlug, lessonSlug } = await params;
  const user = await getSession();
  if (!user) redirect(`/${locale}/signin?next=${encodeURIComponent(`/${locale}/learn/${courseSlug}/${lessonSlug}`)}`);
  const data = await getLesson(courseSlug, lessonSlug);
  if (!data) notFound();
  const enrollment = await getEnrollment(user.id, data.course.id);
  if (!enrollment) redirect(`/${locale}/learn/${courseSlug}`);
  const [progress, note, video] = await Promise.all([
    getCourseProgress(user.id, data.course.id),
    db.query.lessonNotes.findFirst({ where: and(eq(schema.lessonNotes.userId, user.id), eq(schema.lessonNotes.lessonId, data.lesson.id)) }),
    data.lesson.videoId ? db.query.videos.findFirst({ where: eq(schema.videos.id, data.lesson.videoId) }) : Promise.resolve(null),
  ]);
  const fd = new FormData(); fd.set("lessonId", data.lesson.id); fd.set("courseId", data.course.id);
  await recordLessonPositionAction(fd);
  const mine = progress.find((p) => p.lessonId === data.lesson.id);

  return (
    <LessonPlayer
      course={data.course}
      lesson={data.lesson}
      quiz={data.quiz}
      video={video ? { slug: video.slug, titleEn: video.titleEn, titleFr: video.titleFr, script: video.script, mediaUrl: video.mediaUrl, captionsVttUrl: video.captionsVttUrl } : null}
      prev={data.prev} next={data.next}
      doneIds={progress.filter((p) => p.completed).map((p) => p.lessonId)}
      bookmarked={!!mine?.bookmarked}
      note={note?.body ?? ""}
      completed={!!mine?.completed}
      progressPct={enrollment.progressPct}
      index={data.index} total={data.flat.length}
    />
  );
}
