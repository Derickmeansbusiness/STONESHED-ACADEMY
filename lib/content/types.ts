/**
 * Content authoring contracts. Seed data is written against these types in lib/content/*.ts
 * and loaded into the database by scripts/seed.ts.
 *
 * Markdown-lite supported in `body` fields (see lib/utils.ts renderMarkdownLite):
 *   "## Heading", "### Subheading", paragraphs, **bold**, *italic*, "- bullet", "1. numbered",
 *   "> quote", "| a | b |" tables (second row of dashes), and ":::" ... ":::" callout blocks.
 */
import type { VideoScript } from "@/lib/db/schema";

export type Bi = { en: string; fr: string };
export type BiList = { en: string[]; fr: string[] };

export type CategoryKey = "foundations" | "investment" | "funds" | "cemac" | "wealth" | "business" | "research";
export type LabSlug = "growth" | "cap-vs-dist" | "inflation" | "risk" | "allocation" | "fund-mechanics" | "bonds" | "goals";

/** Instructor keys available to courses. All are fictional placeholders until Stoneshed assigns approved professionals. */
export type InstructorKey = "aminata-ndong" | "thierry-mbarga" | "clarisse-fotso" | "paul-essomba" | "nadege-tchoumi";

export type InstructorDef = { key: InstructorKey; name: string; title: Bi; bio: Bi; isFictional: boolean };

export type QuestionDef = { prompt: Bi; options: BiList; correctIndex: number; explanation: Bi };
export type QuizDef = { title: Bi; kind: "knowledge_check" | "assessment"; passMark?: number; questions: QuestionDef[] };

export type LessonDef = {
  slug: string;
  title: Bi;
  kind: "reading" | "video" | "interactive" | "quiz";
  durationMinutes: number;
  body: Bi; // markdown-lite, 250–600 words per language for a reading lesson
  keyTakeaways: BiList;
  videoSlug?: string; // links an Academy TV episode
  labSlug?: LabSlug; // links an Investment Lab tool
  quiz?: QuizDef;
};

export type ModuleDef = { title: Bi; lessons: LessonDef[] };

export type CourseDef = {
  slug: string;
  category: CategoryKey;
  title: Bi;
  summary: Bi; // one sentence
  description: Bi; // 2–3 paragraphs, plain text with \n\n between paragraphs
  level: "beginner" | "intermediate" | "advanced";
  durationMinutes: number;
  instructor: InstructorKey;
  isFree: boolean;
  outcomes: BiList; // 4–6 bullets
  prerequisites?: Bi;
  coverTheme: "blue" | "midnight" | "sky" | "teal" | "violet" | "slate" | "amber" | "green";
  featured?: boolean;
  certificateEligible?: boolean;
  modules?: ModuleDef[]; // omitted = catalog entry only (lessons being written)
};

export type VideoDef = {
  slug: string;
  title: Bi;
  summary: Bi;
  durationSeconds: number;
  topics: string[]; // from: money, investing, funds, nav, bonds, risk, cemac, inflation, compounding, stoneshed, treasury, markets
  script: VideoScript;
  productionStage: "idea" | "research" | "script" | "compliance_review" | "storyboard" | "production" | "quality_review" | "subtitles" | "published";
  accessTier: "free" | "member" | "premium";
  relatedCourseSlug?: string;
  relatedLabSlug?: LabSlug;
  isProductSpecific?: boolean; // true for Stoneshed product content — held until approved
};

export type SeriesDef = {
  slug: string;
  title: Bi;
  tagline: Bi;
  format: "short" | "explainer" | "feature" | "masterclass" | "interview" | "documentary";
  theme: "blue" | "midnight" | "sky" | "teal" | "violet" | "slate" | "amber" | "green";
  videos: VideoDef[];
};

export type ArticleDef = {
  slug: string;
  title: Bi;
  deck: Bi;
  body: Bi; // markdown-lite, 700–1100 words per language
  author: string;
  categories: string[]; // from the Insights categories list
  readingMinutes: number;
  sources: { label: string; href?: string }[]; // real, verifiable public sources only
  relatedCourseSlugs: string[];
  relatedVideoSlugs: string[];
  publishedAt: string; // YYYY-MM-DD
  updatedAt: string;
};

export type GlossaryDef = { slug: string; term: Bi; definition: Bi; category: string; related: string[] };

export type EventDef = {
  slug: string;
  category: "university" | "business_school" | "investment101" | "treasury" | "bootcamp" | "public" | "webinar" | "research" | "executive";
  title: Bi;
  overview: Bi; // 2 short paragraphs
  audience: Bi;
  startsAt: string; // ISO with +01:00 offset (Africa/Douala)
  endsAt: string;
  format: "in_person" | "online" | "hybrid";
  venue?: Bi;
  city?: string;
  speaker: string; // fictional placeholder name with role, e.g. "Aminata Ndong, Head of Financial Education (placeholder)"
  capacity: number;
  schedule: { en: { time: string; item: string }[]; fr: { time: string; item: string }[] };
  theme: "blue" | "midnight" | "sky" | "teal" | "violet" | "slate" | "amber" | "green";
  status: "open" | "waitlist" | "closed" | "completed";
  postEventCourseSlug?: string;
};
