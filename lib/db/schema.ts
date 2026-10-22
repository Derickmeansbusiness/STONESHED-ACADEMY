/**
 * Stoneshed Academy — data model.
 *
 * SQLite (libsql) in development and for the executive demonstration.
 * The schema is written with the Drizzle sqlite-core dialect; moving to
 * PostgreSQL is a dialect swap (pg-core) with the same table shapes.
 */
import { sqliteTable, text, integer, real, index, uniqueIndex } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

const now = sql`(unixepoch())`;

// ---------------------------------------------------------------------------
// Identity, roles, consent
// ---------------------------------------------------------------------------

export const ROLES = [
  "super_admin",
  "academy_manager",
  "content_creator",
  "instructor",
  "compliance_reviewer",
  "research_editor",
  "institutional_coordinator",
  "learner",
] as const;
export type Role = (typeof ROLES)[number];

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    fullName: text("full_name").notNull(),
    role: text("role").$type<Role>().notNull().default("learner"),
    locale: text("locale").$type<"en" | "fr">().notNull().default("en"),
    isDemoPresenter: integer("is_demo_presenter", { mode: "boolean" }).notNull().default(false),
    emailVerifiedAt: integer("email_verified_at"),
    createdAt: integer("created_at").notNull().default(now),
    lastLoginAt: integer("last_login_at"),
  },
  (t) => [uniqueIndex("users_email_idx").on(t.email)],
);

export const learnerProfiles = sqliteTable("learner_profiles", {
  userId: text("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  audience: text("audience"), // student | first_time | professional | investor | corporate | diaspora
  knowledgeLevel: text("knowledge_level"), // beginner | intermediate | advanced
  interests: text("interests", { mode: "json" }).$type<string[]>().notNull().default([]),
  pathwaySlug: text("pathway_slug"),
  institutionId: text("institution_id"),
  city: text("city"),
  country: text("country"),
  isMinor: integer("is_minor", { mode: "boolean" }).notNull().default(false),
  guardianConsentAt: integer("guardian_consent_at"),
  streakDays: integer("streak_days").notNull().default(0),
  lastActiveDate: text("last_active_date"),
  onboardedAt: integer("onboarded_at"),
});

export const userConsents = sqliteTable("user_consents", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  consentType: text("consent_type").notNull(), // terms | privacy | marketing | adviser_contact | guardian
  granted: integer("granted", { mode: "boolean" }).notNull(),
  version: text("version").notNull().default("1.0"),
  recordedAt: integer("recorded_at").notNull().default(now),
  ipHash: text("ip_hash"),
});

// ---------------------------------------------------------------------------
// Institutions and cohorts
// ---------------------------------------------------------------------------

export const institutions = sqliteTable("institutions", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // university | business_school | professional_body | employer | public_body
  city: text("city"),
  country: text("country"),
  website: text("website"),
  status: text("status").notNull().default("prospect"), // prospect | active | paused
  createdAt: integer("created_at").notNull().default(now),
});

export const institutionUsers = sqliteTable("institution_users", {
  id: text("id").primaryKey(),
  institutionId: text("institution_id").notNull().references(() => institutions.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  institutionRole: text("institution_role").notNull().default("coordinator"), // coordinator | faculty | learner
  createdAt: integer("created_at").notNull().default(now),
});

export const cohorts = sqliteTable("cohorts", {
  id: text("id").primaryKey(),
  institutionId: text("institution_id").notNull().references(() => institutions.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  programSlug: text("program_slug"),
  startDate: text("start_date"),
  endDate: text("end_date"),
  capacity: integer("capacity"),
  status: text("status").notNull().default("planned"),
  createdAt: integer("created_at").notNull().default(now),
});

export const cohortMembers = sqliteTable("cohort_members", {
  id: text("id").primaryKey(),
  cohortId: text("cohort_id").notNull().references(() => cohorts.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  joinedAt: integer("joined_at").notNull().default(now),
});

export const partnershipInquiries = sqliteTable("partnership_inquiries", {
  id: text("id").primaryKey(),
  institutionName: text("institution_name").notNull(),
  institutionType: text("institution_type").notNull(),
  contactPerson: text("contact_person").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  city: text("city").notNull(),
  country: text("country").notNull(),
  expectedParticipants: integer("expected_participants"),
  requestedProgram: text("requested_program").notNull(),
  deliveryFormat: text("delivery_format").notNull(),
  preferredTiming: text("preferred_timing"),
  details: text("details"),
  locale: text("locale").notNull().default("en"),
  status: text("status").notNull().default("new"), // new | contacted | proposal | active | closed
  assignedTo: text("assigned_to"),
  createdAt: integer("created_at").notNull().default(now),
});

// ---------------------------------------------------------------------------
// Learning: courses, modules, lessons, quizzes
// ---------------------------------------------------------------------------

export const instructors = sqliteTable("instructors", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  name: text("name").notNull(),
  titleEn: text("title_en").notNull(),
  titleFr: text("title_fr").notNull(),
  bioEn: text("bio_en").notNull(),
  bioFr: text("bio_fr").notNull(),
  isFictional: integer("is_fictional", { mode: "boolean" }).notNull().default(true),
  avatarSeed: text("avatar_seed"),
});

export const courses = sqliteTable(
  "courses",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull(),
    category: text("category").notNull(),
    titleEn: text("title_en").notNull(),
    titleFr: text("title_fr").notNull(),
    summaryEn: text("summary_en").notNull(),
    summaryFr: text("summary_fr").notNull(),
    descriptionEn: text("description_en").notNull(),
    descriptionFr: text("description_fr").notNull(),
    level: text("level").notNull(), // beginner | intermediate | advanced
    durationMinutes: integer("duration_minutes").notNull(),
    languages: text("languages", { mode: "json" }).$type<string[]>().notNull().default(["en", "fr"]),
    instructorId: text("instructor_id").references(() => instructors.id),
    isFree: integer("is_free", { mode: "boolean" }).notNull().default(true),
    priceFcfa: integer("price_fcfa"),
    outcomesEn: text("outcomes_en", { mode: "json" }).$type<string[]>().notNull().default([]),
    outcomesFr: text("outcomes_fr", { mode: "json" }).$type<string[]>().notNull().default([]),
    prerequisitesEn: text("prerequisites_en"),
    prerequisitesFr: text("prerequisites_fr"),
    coverTheme: text("cover_theme").notNull().default("blue"),
    status: text("status").notNull().default("published"), // draft | review | published | archived
    certificateEligible: integer("certificate_eligible", { mode: "boolean" }).notNull().default(true),
    featured: integer("featured", { mode: "boolean" }).notNull().default(false),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: integer("created_at").notNull().default(now),
    updatedAt: integer("updated_at").notNull().default(now),
  },
  (t) => [uniqueIndex("courses_slug_idx").on(t.slug)],
);

export const courseModules = sqliteTable("course_modules", {
  id: text("id").primaryKey(),
  courseId: text("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
  titleEn: text("title_en").notNull(),
  titleFr: text("title_fr").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const lessons = sqliteTable(
  "lessons",
  {
    id: text("id").primaryKey(),
    moduleId: text("module_id").notNull().references(() => courseModules.id, { onDelete: "cascade" }),
    courseId: text("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    titleEn: text("title_en").notNull(),
    titleFr: text("title_fr").notNull(),
    kind: text("kind").notNull().default("reading"), // reading | video | interactive | quiz
    durationMinutes: integer("duration_minutes").notNull().default(6),
    bodyEn: text("body_en").notNull(), // Markdown-lite
    bodyFr: text("body_fr").notNull(),
    keyTakeawaysEn: text("key_takeaways_en", { mode: "json" }).$type<string[]>().notNull().default([]),
    keyTakeawaysFr: text("key_takeaways_fr", { mode: "json" }).$type<string[]>().notNull().default([]),
    videoId: text("video_id"),
    labSlug: text("lab_slug"),
    resources: text("resources", { mode: "json" }).$type<{ label: string; href: string }[]>().notNull().default([]),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [uniqueIndex("lessons_course_slug_idx").on(t.courseId, t.slug)],
);

export const quizzes = sqliteTable("quizzes", {
  id: text("id").primaryKey(),
  lessonId: text("lesson_id").references(() => lessons.id, { onDelete: "cascade" }),
  courseId: text("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
  titleEn: text("title_en").notNull(),
  titleFr: text("title_fr").notNull(),
  kind: text("kind").notNull().default("knowledge_check"), // knowledge_check | assessment
  passMark: integer("pass_mark").notNull().default(70),
});

export const questions = sqliteTable("questions", {
  id: text("id").primaryKey(),
  quizId: text("quiz_id").notNull().references(() => quizzes.id, { onDelete: "cascade" }),
  promptEn: text("prompt_en").notNull(),
  promptFr: text("prompt_fr").notNull(),
  optionsEn: text("options_en", { mode: "json" }).$type<string[]>().notNull(),
  optionsFr: text("options_fr", { mode: "json" }).$type<string[]>().notNull(),
  correctIndex: integer("correct_index").notNull(),
  explanationEn: text("explanation_en").notNull(),
  explanationFr: text("explanation_fr").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const enrollments = sqliteTable(
  "enrollments",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    courseId: text("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
    status: text("status").notNull().default("active"), // active | completed | dropped
    progressPct: integer("progress_pct").notNull().default(0),
    lastLessonId: text("last_lesson_id"),
    enrolledAt: integer("enrolled_at").notNull().default(now),
    completedAt: integer("completed_at"),
  },
  (t) => [uniqueIndex("enrollments_user_course_idx").on(t.userId, t.courseId)],
);

export const lessonProgress = sqliteTable(
  "lesson_progress",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    lessonId: text("lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade" }),
    courseId: text("course_id").notNull(),
    completed: integer("completed", { mode: "boolean" }).notNull().default(false),
    bookmarked: integer("bookmarked", { mode: "boolean" }).notNull().default(false),
    positionSeconds: integer("position_seconds").notNull().default(0),
    updatedAt: integer("updated_at").notNull().default(now),
  },
  (t) => [uniqueIndex("lesson_progress_user_lesson_idx").on(t.userId, t.lessonId)],
);

export const lessonNotes = sqliteTable("lesson_notes", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  lessonId: text("lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  updatedAt: integer("updated_at").notNull().default(now),
});

export const quizAttempts = sqliteTable("quiz_attempts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  quizId: text("quiz_id").notNull().references(() => quizzes.id, { onDelete: "cascade" }),
  scorePct: integer("score_pct").notNull(),
  passed: integer("passed", { mode: "boolean" }).notNull(),
  answers: text("answers", { mode: "json" }).$type<number[]>().notNull(),
  attemptedAt: integer("attempted_at").notNull().default(now),
});

export const certificates = sqliteTable(
  "certificates",
  {
    id: text("id").primaryKey(), // public certificate ID e.g. SA-2026-7F3K9Q
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    courseId: text("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
    learnerName: text("learner_name").notNull(),
    courseTitle: text("course_title").notNull(),
    locale: text("locale").notNull().default("en"),
    issuedAt: integer("issued_at").notNull().default(now),
    revokedAt: integer("revoked_at"),
  },
  (t) => [index("certificates_user_idx").on(t.userId)],
);

export const achievements = sqliteTable("achievements", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  badgeKey: text("badge_key").notNull(),
  earnedAt: integer("earned_at").notNull().default(now),
});

// ---------------------------------------------------------------------------
// Academy TV
// ---------------------------------------------------------------------------

export const videoSeries = sqliteTable("video_series", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  titleEn: text("title_en").notNull(),
  titleFr: text("title_fr").notNull(),
  taglineEn: text("tagline_en").notNull(),
  taglineFr: text("tagline_fr").notNull(),
  format: text("format").notNull(), // short | explainer | feature | masterclass | interview | documentary
  theme: text("theme").notNull().default("blue"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const videos = sqliteTable(
  "videos",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull(),
    seriesId: text("series_id").notNull().references(() => videoSeries.id, { onDelete: "cascade" }),
    titleEn: text("title_en").notNull(),
    titleFr: text("title_fr").notNull(),
    summaryEn: text("summary_en").notNull(),
    summaryFr: text("summary_fr").notNull(),
    durationSeconds: integer("duration_seconds").notNull(),
    topics: text("topics", { mode: "json" }).$type<string[]>().notNull().default([]),
    languages: text("languages", { mode: "json" }).$type<string[]>().notNull().default(["en", "fr"]),
    // Real media when approved production footage exists. Null = storyboard preview mode.
    mediaUrl: text("media_url"),
    captionsVttUrl: text("captions_vtt_url"),
    // Structured script / storyboard used for the storyboard player and transcript.
    script: text("script", { mode: "json" }).$type<VideoScript>().notNull(),
    productionStage: text("production_stage").notNull().default("script"),
    // idea | research | script | compliance_review | storyboard | production | quality_review | subtitles | published
    accessTier: text("access_tier").notNull().default("free"), // free | member | premium
    relatedCourseSlug: text("related_course_slug"),
    relatedLabSlug: text("related_lab_slug"),
    isProductSpecific: integer("is_product_specific", { mode: "boolean" }).notNull().default(false),
    sortOrder: integer("sort_order").notNull().default(0),
    publishedAt: integer("published_at"),
  },
  (t) => [uniqueIndex("videos_slug_idx").on(t.slug)],
);

export type VideoScript = {
  hook: { en: string; fr: string };
  scenes: {
    title: { en: string; fr: string };
    visual: { en: string; fr: string };
    narration: { en: string; fr: string };
    seconds: number;
  }[];
  closing: { en: string; fr: string };
  disclaimer?: { en: string; fr: string };
};

export const videoProgress = sqliteTable(
  "video_progress",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    videoId: text("video_id").notNull().references(() => videos.id, { onDelete: "cascade" }),
    positionSeconds: integer("position_seconds").notNull().default(0),
    completed: integer("completed", { mode: "boolean" }).notNull().default(false),
    saved: integer("saved", { mode: "boolean" }).notNull().default(false),
    updatedAt: integer("updated_at").notNull().default(now),
  },
  (t) => [uniqueIndex("video_progress_user_video_idx").on(t.userId, t.videoId)],
);

export const playlists = sqliteTable("playlists", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  videoIds: text("video_ids", { mode: "json" }).$type<string[]>().notNull().default([]),
  createdAt: integer("created_at").notNull().default(now),
});

// ---------------------------------------------------------------------------
// Research, insights, glossary
// ---------------------------------------------------------------------------

export const articles = sqliteTable(
  "articles",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull(),
    titleEn: text("title_en").notNull(),
    titleFr: text("title_fr").notNull(),
    deckEn: text("deck_en").notNull(),
    deckFr: text("deck_fr").notNull(),
    bodyEn: text("body_en").notNull(),
    bodyFr: text("body_fr").notNull(),
    author: text("author").notNull(),
    categories: text("categories", { mode: "json" }).$type<string[]>().notNull().default([]),
    readingMinutes: integer("reading_minutes").notNull().default(6),
    sources: text("sources", { mode: "json" }).$type<{ label: string; href?: string }[]>().notNull().default([]),
    relatedCourseSlugs: text("related_course_slugs", { mode: "json" }).$type<string[]>().notNull().default([]),
    relatedVideoSlugs: text("related_video_slugs", { mode: "json" }).$type<string[]>().notNull().default([]),
    status: text("status").notNull().default("published"),
    publishedAt: text("published_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (t) => [uniqueIndex("articles_slug_idx").on(t.slug)],
);

export const researchDocuments = sqliteTable("research_documents", {
  id: text("id").primaryKey(),
  titleEn: text("title_en").notNull(),
  titleFr: text("title_fr").notNull(),
  kind: text("kind").notNull(), // brief | report | note
  author: text("author").notNull(),
  summaryEn: text("summary_en").notNull(),
  summaryFr: text("summary_fr").notNull(),
  fileUrl: text("file_url"),
  publishedAt: text("published_at").notNull(),
  status: text("status").notNull().default("draft"),
});

export const glossaryTerms = sqliteTable(
  "glossary_terms",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull(),
    termEn: text("term_en").notNull(),
    termFr: text("term_fr").notNull(),
    definitionEn: text("definition_en").notNull(),
    definitionFr: text("definition_fr").notNull(),
    category: text("category").notNull(),
    relatedSlugs: text("related_slugs", { mode: "json" }).$type<string[]>().notNull().default([]),
  },
  (t) => [uniqueIndex("glossary_slug_idx").on(t.slug)],
);

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

export const events = sqliteTable(
  "events",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull(),
    category: text("category").notNull(),
    titleEn: text("title_en").notNull(),
    titleFr: text("title_fr").notNull(),
    overviewEn: text("overview_en").notNull(),
    overviewFr: text("overview_fr").notNull(),
    audienceEn: text("audience_en").notNull(),
    audienceFr: text("audience_fr").notNull(),
    startsAt: text("starts_at").notNull(), // ISO datetime
    endsAt: text("ends_at").notNull(),
    timezone: text("timezone").notNull().default("Africa/Douala"),
    format: text("format").notNull(), // in_person | online | hybrid
    venueEn: text("venue_en"),
    venueFr: text("venue_fr"),
    city: text("city"),
    onlineUrl: text("online_url"),
    speaker: text("speaker").notNull(),
    capacity: integer("capacity").notNull(),
    institutionId: text("institution_id"),
    scheduleEn: text("schedule_en", { mode: "json" }).$type<{ time: string; item: string }[]>().notNull().default([]),
    scheduleFr: text("schedule_fr", { mode: "json" }).$type<{ time: string; item: string }[]>().notNull().default([]),
    theme: text("theme").notNull().default("blue"),
    status: text("status").notNull().default("open"), // draft | open | waitlist | closed | completed | cancelled
    postEventCourseSlug: text("post_event_course_slug"),
    isFictional: integer("is_fictional", { mode: "boolean" }).notNull().default(true),
  },
  (t) => [uniqueIndex("events_slug_idx").on(t.slug)],
);

export const eventRegistrations = sqliteTable(
  "event_registrations",
  {
    id: text("id").primaryKey(),
    eventId: text("event_id").notNull().references(() => events.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    ticketCode: text("ticket_code").notNull(),
    status: text("status").notNull().default("confirmed"), // confirmed | waitlisted | cancelled
    affiliation: text("affiliation"),
    registeredAt: integer("registered_at").notNull().default(now),
  },
  (t) => [uniqueIndex("event_reg_user_idx").on(t.eventId, t.userId), uniqueIndex("event_reg_ticket_idx").on(t.ticketCode)],
);

export const attendance = sqliteTable("attendance", {
  id: text("id").primaryKey(),
  registrationId: text("registration_id").notNull().references(() => eventRegistrations.id, { onDelete: "cascade" }),
  eventId: text("event_id").notNull(),
  checkedInAt: integer("checked_in_at").notNull().default(now),
  checkedInBy: text("checked_in_by"),
  method: text("method").notNull().default("manual"), // manual | qr
});

// ---------------------------------------------------------------------------
// Fund education center (source-controlled product data)
// ---------------------------------------------------------------------------

export const fundProducts = sqliteTable("fund_products", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  officialName: text("official_name").notNull(),
  shortName: text("short_name").notNull(),
  fundType: text("fund_type").notNull(), // capitalization | distribution
  cosumafFundRef: text("cosumaf_fund_ref").notNull(),
  cosumafVisaRef: text("cosumaf_visa_ref").notNull(),
  theme: text("theme").notNull().default("blue"),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const fundDataVersions = sqliteTable("fund_data_versions", {
  id: text("id").primaryKey(),
  fundId: text("fund_id").notNull().references(() => fundProducts.id, { onDelete: "cascade" }),
  version: text("version").notNull(),
  // Approved public values, every field annotated with its source document.
  fields: text("fields", { mode: "json" }).$type<FundField[]>().notNull(),
  sourceDocument: text("source_document").notNull(),
  approvalDate: text("approval_date"),
  lastReviewedAt: text("last_reviewed_at"),
  reviewer: text("reviewer"),
  publicationStatus: text("publication_status").notNull().default("draft"), // draft | pending_review | approved | superseded
  notes: text("notes"),
  createdAt: integer("created_at").notNull().default(now),
});

export type FundField = {
  key: string;
  labelEn: string;
  labelFr: string;
  valueEn: string;
  valueFr: string;
  source: string; // document reference
  status: "approved" | "pending_verification" | "not_supplied";
  note?: string;
};

export const fundDocuments = sqliteTable("fund_documents", {
  id: text("id").primaryKey(),
  fundId: text("fund_id").references(() => fundProducts.id, { onDelete: "cascade" }),
  titleEn: text("title_en").notNull(),
  titleFr: text("title_fr").notNull(),
  docType: text("doc_type").notNull(), // brochure | regulations | information_document | kiid | report
  version: text("version"),
  fileUrl: text("file_url"), // null until an approved file is uploaded by compliance
  status: text("status").notNull().default("awaiting_upload"), // awaiting_upload | uploaded | approved
  uploadedAt: integer("uploaded_at"),
});

export const fundDataFlags = sqliteTable("fund_data_flags", {
  id: text("id").primaryKey(),
  fundId: text("fund_id"),
  fieldKey: text("field_key").notNull(),
  description: text("description").notNull(),
  severity: text("severity").notNull().default("medium"), // low | medium | high
  status: text("status").notNull().default("open"), // open | resolved
  raisedBy: text("raised_by").notNull().default("system"),
  resolvedBy: text("resolved_by"),
  resolution: text("resolution"),
  createdAt: integer("created_at").notNull().default(now),
});

// ---------------------------------------------------------------------------
// Governance: content approvals, audit logs
// ---------------------------------------------------------------------------

export const contentApprovals = sqliteTable("content_approvals", {
  id: text("id").primaryKey(),
  contentType: text("content_type").notNull(), // course | lesson | video | article | fund_data | glossary
  contentId: text("content_id").notNull(),
  contentTitle: text("content_title").notNull(),
  stage: text("stage").notNull().default("draft"),
  // draft | editorial_review | product_accuracy_review | compliance_approval | scheduled | published | periodic_review
  requestedBy: text("requested_by"),
  reviewerId: text("reviewer_id"),
  decision: text("decision"), // approved | changes_requested | rejected
  comment: text("comment"),
  requiresComplianceRole: integer("requires_compliance_role", { mode: "boolean" }).notNull().default(false),
  updatedAt: integer("updated_at").notNull().default(now),
});

export const auditLogs = sqliteTable(
  "audit_logs",
  {
    id: text("id").primaryKey(),
    actorId: text("actor_id"),
    actorRole: text("actor_role"),
    action: text("action").notNull(),
    entityType: text("entity_type"),
    entityId: text("entity_id"),
    metadata: text("metadata", { mode: "json" }).$type<Record<string, unknown>>(),
    createdAt: integer("created_at").notNull().default(now),
  },
  (t) => [index("audit_created_idx").on(t.createdAt)],
);

// ---------------------------------------------------------------------------
// Ask Stoneshed AI
// ---------------------------------------------------------------------------

export const aiKnowledgeSources = sqliteTable("ai_knowledge_sources", {
  id: text("id").primaryKey(),
  sourceType: text("source_type").notNull(), // fund_document | lesson | glossary | article | institutional
  title: text("title").notNull(),
  reference: text("reference").notNull(), // e.g. "Brochure v1 §3" or lesson slug
  locale: text("locale").notNull().default("en"),
  content: text("content").notNull(),
  keywords: text("keywords", { mode: "json" }).$type<string[]>().notNull().default([]),
  version: text("version").notNull().default("1.0"),
  approved: integer("approved", { mode: "boolean" }).notNull().default(true),
  approvedBy: text("approved_by"),
  updatedAt: integer("updated_at").notNull().default(now),
});

export const aiLogRecords = sqliteTable("ai_log_records", {
  id: text("id").primaryKey(),
  userId: text("user_id"),
  sessionId: text("session_id").notNull(),
  locale: text("locale").notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  mode: text("mode").notNull(), // live_model | grounded_offline
  sourceIds: text("source_ids", { mode: "json" }).$type<string[]>().notNull().default([]),
  flagged: integer("flagged", { mode: "boolean" }).notNull().default(false),
  latencyMs: integer("latency_ms"),
  createdAt: integer("created_at").notNull().default(now),
});

// ---------------------------------------------------------------------------
// Engagement: adviser inquiries, consultation requests, analytics
// ---------------------------------------------------------------------------

export const adviserInquiries = sqliteTable("adviser_inquiries", {
  id: text("id").primaryKey(),
  userId: text("user_id"),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  topic: text("topic").notNull(),
  fundSlug: text("fund_slug"),
  message: text("message"),
  source: text("source").notNull(), // fund_page | course | event | ai_tutor | dashboard
  consentContact: integer("consent_contact", { mode: "boolean" }).notNull(),
  locale: text("locale").notNull().default("en"),
  status: text("status").notNull().default("new"), // new | qualified | referred | closed
  referredTo: text("referred_to"),
  createdAt: integer("created_at").notNull().default(now),
});

export const consultationRequests = sqliteTable("consultation_requests", {
  id: text("id").primaryKey(),
  inquiryId: text("inquiry_id").references(() => adviserInquiries.id, { onDelete: "cascade" }),
  preferredChannel: text("preferred_channel").notNull(), // phone | email | in_person | video
  preferredTime: text("preferred_time"),
  status: text("status").notNull().default("requested"), // requested | scheduled | completed | declined
  crmSyncStatus: text("crm_sync_status").notNull().default("pending"), // pending | synced | failed | not_configured
  createdAt: integer("created_at").notNull().default(now),
});

export const analyticsEvents = sqliteTable(
  "analytics_events",
  {
    id: text("id").primaryKey(),
    userId: text("user_id"),
    anonId: text("anon_id"),
    eventName: text("event_name").notNull(),
    locale: text("locale"),
    path: text("path"),
    properties: text("properties", { mode: "json" }).$type<Record<string, unknown>>(),
    createdAt: integer("created_at").notNull().default(now),
  },
  (t) => [index("analytics_name_idx").on(t.eventName), index("analytics_created_idx").on(t.createdAt)],
);

// Notifications that would be sent by email/WhatsApp once an integration is connected.
export const notificationOutbox = sqliteTable("notification_outbox", {
  id: text("id").primaryKey(),
  userId: text("user_id"),
  channel: text("channel").notNull(), // email | whatsapp | sms
  recipient: text("recipient").notNull(),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  status: text("status").notNull().default("queued_no_provider"), // queued_no_provider | sent | failed
  createdAt: integer("created_at").notNull().default(now),
});
