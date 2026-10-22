import Link from "next/link";
import { Clock, BookOpen, Globe } from "lucide-react";
import { CoverArt } from "@/components/ui/cover-art";
import { Badge } from "@/components/ui/badge";
import { getDictionary, pick, type Locale } from "@/lib/i18n";

type CourseLike = {
  slug: string; titleEn: string; titleFr: string; summaryEn: string; summaryFr: string; level: string; durationMinutes: number; languages: string[]; isFree: boolean; coverTheme: string; category: string;
  lessonCount?: number; instructor?: { name: string } | null; progressPct?: number;
};

export function CourseCard({ course, locale, compact = false }: { course: CourseLike; locale: Locale; compact?: boolean }) {
  const t = getDictionary(locale);
  const level = t.common[course.level as "beginner" | "intermediate" | "advanced"] ?? course.level;
  const cat = t.learn.categories[course.category as keyof typeof t.learn.categories] ?? course.category;
  return (
    <Link href={`/${locale}/learn/${course.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-mist/70 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <div className="relative aspect-[16/9] overflow-hidden">
        <CoverArt seed={course.slug} theme={course.coverTheme} className="transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge tone="white">{course.isFree ? t.common.free : t.common.paid}</Badge>
          <Badge tone="white">{level}</Badge>
        </div>
        {typeof course.progressPct === "number" && course.progressPct > 0 && (
          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-white/30"><div className="h-full bg-sky" style={{ width: `${course.progressPct}%` }} /></div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow mb-2 text-[10px]">{cat}</p>
        <h3 className="font-display text-[17px] font-bold leading-snug text-ink group-hover:text-finance">{pick(course, "title", locale)}</h3>
        {!compact && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-steel">{pick(course, "summary", locale)}</p>}
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-4 text-xs text-steel">
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.durationMinutes} {t.common.minutes}</span>
          {typeof course.lessonCount === "number" && <span className="inline-flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{course.lessonCount} {t.common.lessons}</span>}
          <span className="inline-flex items-center gap-1"><Globe className="h-3.5 w-3.5" />{course.languages.map((l) => l.toUpperCase()).join(" / ")}</span>
        </div>
        {course.instructor && <p className="mt-2 text-xs text-steel">{t.common.instructor}: <span className="font-medium text-slate">{course.instructor.name}</span></p>}
      </div>
    </Link>
  );
}
