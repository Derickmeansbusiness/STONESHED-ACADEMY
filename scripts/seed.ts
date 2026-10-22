/**
 * Seeds the Stoneshed Academy database with approved educational content and clearly
 * fictional demonstration data. Idempotent: wipes content tables and re-inserts.
 *
 *   npm run db:seed
 */
import { sql } from "drizzle-orm";
import { db, schema as s } from "../lib/db";
import { newId, ticketCode, certificateId } from "../lib/ids";
import { hashPassword } from "../lib/auth/password";
import { COURSES, SERIES, ARTICLES, GLOSSARY, EVENTS, INSTITUTIONS, INSTRUCTORS, FUNDS, FUND_FLAGS, FUND_FAQ } from "../lib/content";
import { DEMO_ACCOUNTS, DEMO_PASSWORD } from "../lib/content/demo-accounts";

const now = Math.floor(Date.now() / 1000);
const day = 86400;

async function main() {
  console.log("Seeding Stoneshed Academy…");
  const tables = ["attendance", "event_registrations", "events", "quiz_attempts", "questions", "quizzes", "lesson_notes", "lesson_progress", "enrollments", "certificates", "achievements", "lessons", "course_modules", "courses", "instructors", "video_progress", "playlists", "videos", "video_series", "articles", "research_documents", "glossary_terms", "fund_data_flags", "fund_documents", "fund_data_versions", "fund_products", "content_approvals", "ai_knowledge_sources", "ai_log_records", "consultation_requests", "adviser_inquiries", "partnership_inquiries", "cohort_members", "cohorts", "institution_users", "institutions", "analytics_events", "notification_outbox", "audit_logs", "user_consents", "learner_profiles", "users"];
  for (const t of tables) await db.run(sql.raw(`DELETE FROM ${t}`));

  // ---- Users -------------------------------------------------------------
  const pw = await hashPassword(DEMO_PASSWORD);
  const userIds: Record<string, string> = {};
  for (const a of DEMO_ACCOUNTS) {
    const id = newId("usr");
    userIds[a.role + (a.presenter ? "_p" : "")] = id;
    userIds[a.email] = id;
    await db.insert(s.users).values({ id, email: a.email, passwordHash: pw, fullName: a.name, role: a.role, locale: "en", isDemoPresenter: a.presenter, createdAt: now - 60 * day, lastLoginAt: now - day });
    await db.insert(s.learnerProfiles).values({ userId: id, audience: a.role === "learner" ? "first_time" : null, knowledgeLevel: a.role === "learner" ? "beginner" : null, interests: a.role === "learner" ? ["investing", "funds"] : [], pathwaySlug: a.role === "learner" ? "investing" : null, onboardedAt: now - 50 * day, streakDays: a.role === "learner" ? 4 : 0, lastActiveDate: new Date().toISOString().slice(0, 10), city: "Douala", country: "Cameroon" });
    await db.insert(s.userConsents).values([{ id: newId("cns"), userId: id, consentType: "terms", granted: true }, { id: newId("cns"), userId: id, consentType: "privacy", granted: true }]);
  }
  // Fictional learner population for analytics (clearly labelled)
  const FIRST = ["Aïcha", "Boris", "Chantal", "Dieudonné", "Estelle", "Franck", "Ghislaine", "Hervé", "Irène", "Joël", "Kemi", "Landry", "Mireille", "Nathan", "Olive", "Patrick", "Rosine", "Samuel", "Thérèse", "Ulrich"];
  const LAST = ["Ngo", "Tchoupo", "Mbida", "Fomekong", "Eyenga", "Nkoulou", "Abega", "Kamga", "Onana", "Biya"];
  const CITIES = ["Douala", "Yaoundé", "Bafoussam", "Libreville", "Paris", "Brazzaville", "N'Djamena", "Garoua"];
  const fictional: string[] = [];
  for (let i = 0; i < 140; i++) {
    const id = newId("usr");
    fictional.push(id);
    const created = now - Math.floor(Math.random() * 90) * day;
    await db.insert(s.users).values({ id, email: `fictional.learner.${i + 1}@stoneshed-academy.test`, passwordHash: pw, fullName: `${FIRST[i % FIRST.length]} ${LAST[(i * 7) % LAST.length]} (fictional)`, role: "learner", locale: i % 3 === 0 ? "fr" : "en", createdAt: created, lastLoginAt: created + Math.floor(Math.random() * 30) * day });
    await db.insert(s.learnerProfiles).values({ userId: id, audience: ["student", "first_time", "professional", "investor", "corporate", "diaspora"][i % 6], knowledgeLevel: ["beginner", "beginner", "intermediate", "advanced"][i % 4], interests: [["money"], ["investing", "funds"], ["wealth"], ["markets", "professional"], ["treasury"]][i % 5], pathwaySlug: "investing", city: CITIES[i % CITIES.length], country: i % CITIES.length === 4 ? "France" : "Cameroon", onboardedAt: created });
  }

  // ---- Instructors ---------------------------------------------------------
  const instructorIds: Record<string, string> = {};
  for (const i of INSTRUCTORS) {
    const id = newId("ins");
    instructorIds[i.key] = id;
    await db.insert(s.instructors).values({ id, name: i.name, titleEn: i.title.en, titleFr: i.title.fr, bioEn: i.bio.en, bioFr: i.bio.fr, isFictional: i.isFictional, avatarSeed: i.key });
  }

  // ---- Video series & videos ------------------------------------------------
  const videoIdBySlug: Record<string, string> = {};
  let so = 0;
  for (const [si, series] of SERIES.entries()) {
    const seriesId = newId("ser");
    await db.insert(s.videoSeries).values({ id: seriesId, slug: series.slug, titleEn: series.title.en, titleFr: series.title.fr, taglineEn: series.tagline.en, taglineFr: series.tagline.fr, format: series.format, theme: series.theme, sortOrder: si });
    for (const v of series.videos) {
      const id = newId("vid");
      videoIdBySlug[v.slug] = id;
      await db.insert(s.videos).values({ id, slug: v.slug, seriesId, titleEn: v.title.en, titleFr: v.title.fr, summaryEn: v.summary.en, summaryFr: v.summary.fr, durationSeconds: v.durationSeconds, topics: v.topics, script: v.script, productionStage: v.productionStage, accessTier: v.accessTier, relatedCourseSlug: v.relatedCourseSlug ?? null, relatedLabSlug: v.relatedLabSlug ?? null, isProductSpecific: !!v.isProductSpecific, sortOrder: so++, publishedAt: v.productionStage === "published" ? now - 20 * day : null });
    }
  }

  // ---- Courses ---------------------------------------------------------------
  const courseIdBySlug: Record<string, string> = {};
  const lessonIdsByCourse: Record<string, string[]> = {};
  const knowledge: { sourceType: string; title: string; reference: string; locale: string; content: string; keywords: string[] }[] = [];
  for (const [ci, c] of COURSES.entries()) {
    const courseId = newId("crs");
    courseIdBySlug[c.slug] = courseId;
    lessonIdsByCourse[c.slug] = [];
    const lessonsFlat = (c.modules ?? []).flatMap((m) => m.lessons);
    const duration = lessonsFlat.length ? lessonsFlat.reduce((n, l) => n + l.durationMinutes, 0) : c.durationMinutes;
    await db.insert(s.courses).values({ id: courseId, slug: c.slug, category: c.category, titleEn: c.title.en, titleFr: c.title.fr, summaryEn: c.summary.en, summaryFr: c.summary.fr, descriptionEn: c.description.en, descriptionFr: c.description.fr, level: c.level, durationMinutes: duration, instructorId: instructorIds[c.instructor], isFree: c.isFree, outcomesEn: c.outcomes.en, outcomesFr: c.outcomes.fr, prerequisitesEn: c.prerequisites?.en ?? null, prerequisitesFr: c.prerequisites?.fr ?? null, coverTheme: c.coverTheme, status: "published", certificateEligible: c.certificateEligible ?? true, featured: !!c.featured, sortOrder: ci });
    for (const [mi, m] of (c.modules ?? []).entries()) {
      const moduleId = newId("mod");
      await db.insert(s.courseModules).values({ id: moduleId, courseId, titleEn: m.title.en, titleFr: m.title.fr, sortOrder: mi });
      for (const [li, l] of m.lessons.entries()) {
        const lessonId = newId("les");
        lessonIdsByCourse[c.slug].push(lessonId);
        await db.insert(s.lessons).values({ id: lessonId, moduleId, courseId, slug: l.slug, titleEn: l.title.en, titleFr: l.title.fr, kind: l.kind, durationMinutes: l.durationMinutes, bodyEn: l.body.en, bodyFr: l.body.fr, keyTakeawaysEn: l.keyTakeaways.en, keyTakeawaysFr: l.keyTakeaways.fr, videoId: l.videoSlug ? videoIdBySlug[l.videoSlug] ?? null : null, labSlug: l.labSlug ?? null, sortOrder: li });
        knowledge.push({ sourceType: "lesson", title: l.title.en, reference: `lesson:${c.slug}/${l.slug}`, locale: "en", content: l.body.en, keywords: [...l.title.en.toLowerCase().split(/\W+/), ...l.keyTakeaways.en.join(" ").toLowerCase().split(/\W+/)].filter((w) => w.length > 3) });
        knowledge.push({ sourceType: "lesson", title: l.title.fr, reference: `lesson:${c.slug}/${l.slug}`, locale: "fr", content: l.body.fr, keywords: [...l.title.fr.toLowerCase().split(/\W+/), ...l.keyTakeaways.fr.join(" ").toLowerCase().split(/\W+/)].filter((w) => w.length > 3) });
        if (l.quiz) {
          const quizId = newId("qz");
          await db.insert(s.quizzes).values({ id: quizId, lessonId, courseId, titleEn: l.quiz.title.en, titleFr: l.quiz.title.fr, kind: l.quiz.kind, passMark: l.quiz.passMark ?? 70 });
          for (const [qi, q] of l.quiz.questions.entries()) {
            await db.insert(s.questions).values({ id: newId("q"), quizId, promptEn: q.prompt.en, promptFr: q.prompt.fr, optionsEn: q.options.en, optionsFr: q.options.fr, correctIndex: q.correctIndex, explanationEn: q.explanation.en, explanationFr: q.explanation.fr, sortOrder: qi });
          }
        }
      }
    }
  }

  // ---- Articles & glossary ---------------------------------------------------
  for (const a of ARTICLES) {
    await db.insert(s.articles).values({ id: newId("art"), slug: a.slug, titleEn: a.title.en, titleFr: a.title.fr, deckEn: a.deck.en, deckFr: a.deck.fr, bodyEn: a.body.en, bodyFr: a.body.fr, author: a.author, categories: a.categories, readingMinutes: a.readingMinutes, sources: a.sources, relatedCourseSlugs: a.relatedCourseSlugs, relatedVideoSlugs: a.relatedVideoSlugs, status: "published", publishedAt: a.publishedAt, updatedAt: a.updatedAt });
    knowledge.push({ sourceType: "article", title: a.title.en, reference: `article:${a.slug}`, locale: "en", content: a.body.en, keywords: a.title.en.toLowerCase().split(/\W+/).filter((w) => w.length > 3) });
    knowledge.push({ sourceType: "article", title: a.title.fr, reference: `article:${a.slug}`, locale: "fr", content: a.body.fr, keywords: a.title.fr.toLowerCase().split(/\W+/).filter((w) => w.length > 3) });
  }
  for (const g of GLOSSARY) {
    await db.insert(s.glossaryTerms).values({ id: newId("gl"), slug: g.slug, termEn: g.term.en, termFr: g.term.fr, definitionEn: g.definition.en, definitionFr: g.definition.fr, category: g.category, relatedSlugs: g.related });
    knowledge.push({ sourceType: "glossary", title: g.term.en, reference: `glossary:${g.slug}`, locale: "en", content: `${g.term.en}: ${g.definition.en}`, keywords: g.term.en.toLowerCase().split(/\W+/).filter(Boolean) });
    knowledge.push({ sourceType: "glossary", title: g.term.fr, reference: `glossary:${g.slug}`, locale: "fr", content: `${g.term.fr} : ${g.definition.fr}`, keywords: g.term.fr.toLowerCase().split(/\W+/).filter(Boolean) });
  }

  // ---- Funds -------------------------------------------------------------------
  const fundIdBySlug: Record<string, string> = {};
  for (const f of FUNDS) {
    const fundId = newId("fnd");
    fundIdBySlug[f.slug] = fundId;
    await db.insert(s.fundProducts).values({ id: fundId, slug: f.slug, officialName: f.officialName, shortName: f.shortName, fundType: f.fundType, cosumafFundRef: f.cosumafFundRef, cosumafVisaRef: f.cosumafVisaRef, theme: f.theme, sortOrder: f.sortOrder });
    const versionId = newId("fdv");
    await db.insert(s.fundDataVersions).values({ id: versionId, fundId, version: "0.1-brief", fields: f.fields, sourceDocument: "Project brief (brochure-level facts); regulatory documents not yet attached", approvalDate: null, lastReviewedAt: new Date().toISOString().slice(0, 10), reviewer: null, publicationStatus: "pending_review", notes: "Seeded from the master brief. Requires reconciliation against the brochure, management regulations and information documents, then compliance approval." });
    for (const d of f.docs) await db.insert(s.fundDocuments).values({ id: newId("fdoc"), fundId, titleEn: d.titleEn, titleFr: d.titleFr, docType: d.docType, version: null, fileUrl: null, status: "awaiting_upload" });
    await db.insert(s.contentApprovals).values({ id: newId("apr"), contentType: "fund_data", contentId: versionId, contentTitle: `${f.officialName} — data register v0.1`, stage: "product_accuracy_review", requestedBy: userIds["academy_manager_p"], requiresComplianceRole: true });
    for (const field of f.fields.filter((x) => x.status === "approved")) {
      knowledge.push({ sourceType: "fund_document", title: `${f.officialName} — ${field.labelEn}`, reference: `${f.officialName} · ${field.source}`, locale: "en", content: `${f.officialName} (${f.cosumafFundRef}). ${field.labelEn}: ${field.valueEn}`, keywords: [f.shortName.toLowerCase(), "stoneshed", f.fundType, ...field.labelEn.toLowerCase().split(/\W+/)].filter((w) => w.length > 2) });
      knowledge.push({ sourceType: "fund_document", title: `${f.officialName} — ${field.labelFr}`, reference: `${f.officialName} · ${field.source}`, locale: "fr", content: `${f.officialName} (${f.cosumafFundRef}). ${field.labelFr} : ${field.valueFr}`, keywords: [f.shortName.toLowerCase(), "stoneshed", f.fundType === "capitalization" ? "capitalisation" : "distribution", ...field.labelFr.toLowerCase().split(/\W+/)].filter((w) => w.length > 2) });
    }
  }
  for (const q of FUND_FAQ) {
    knowledge.push({ sourceType: "fund_document", title: q.q.en, reference: "Fund education center FAQ (approved brochure-level facts)", locale: "en", content: `${q.q.en} ${q.a.en}`, keywords: ["stoneshed", "classic", "gold", ...q.q.en.toLowerCase().split(/\W+/)].filter((w) => w.length > 2) });
    knowledge.push({ sourceType: "fund_document", title: q.q.fr, reference: "FAQ du centre pédagogique des fonds (faits approuvés de la brochure)", locale: "fr", content: `${q.q.fr} ${q.a.fr}`, keywords: ["stoneshed", "classic", "gold", ...q.q.fr.toLowerCase().split(/\W+/)].filter((w) => w.length > 2) });
  }
  for (const fl of FUND_FLAGS) await db.insert(s.fundDataFlags).values({ id: newId("flag"), fundId: fl.fundSlug ? fundIdBySlug[fl.fundSlug] : null, fieldKey: fl.fieldKey, description: fl.description, severity: fl.severity, status: "open", raisedBy: "system" });

  // ---- Content approvals for product videos ------------------------------------
  for (const v of SERIES.flatMap((x) => x.videos).filter((x) => x.isProductSpecific)) {
    await db.insert(s.contentApprovals).values({ id: newId("apr"), contentType: "video", contentId: videoIdBySlug[v.slug], contentTitle: v.title.en, stage: v.productionStage === "compliance_review" ? "compliance_approval" : "editorial_review", requestedBy: userIds["academy_manager_p"], requiresComplianceRole: true });
  }
  await db.insert(s.contentApprovals).values({ id: newId("apr"), contentType: "course", contentId: courseIdBySlug["investing-101"], contentTitle: "Investing 101: Your First Step to Financial Knowledge", stage: "published", requestedBy: userIds["academy_manager_p"], reviewerId: userIds["compliance_reviewer"], decision: "approved", comment: "Demonstration approval record (fictional).", updatedAt: now - 10 * day });

  // ---- AI knowledge sources -------------------------------------------------------
  for (const k of knowledge) await db.insert(s.aiKnowledgeSources).values({ id: newId("kn"), sourceType: k.sourceType, title: k.title, reference: k.reference, locale: k.locale, content: k.content, keywords: Array.from(new Set(k.keywords)), version: "1.0", approved: true, approvedBy: "seed" });

  // ---- Institutions, cohorts -------------------------------------------------------
  const institutionIds: string[] = [];
  const cohortIds: string[] = [];
  for (const inst of INSTITUTIONS) {
    const id = newId("inst");
    institutionIds.push(id);
    await db.insert(s.institutions).values({ id, name: inst.name, type: inst.type, city: inst.city, country: inst.country, status: inst.status });
    for (const c of inst.cohorts) {
      const cid = newId("coh");
      cohortIds.push(cid);
      await db.insert(s.cohorts).values({ id: cid, institutionId: id, name: c.name, programSlug: c.programSlug, startDate: c.startDate, endDate: c.endDate, capacity: c.capacity, status: c.status });
    }
  }
  await db.insert(s.institutionUsers).values({ id: newId("iu"), institutionId: institutionIds[0], userId: userIds["institutional_coordinator"], institutionRole: "coordinator" });
  // first cohort: demo learner + 24 fictional learners
  for (const uid of [userIds["learner"], ...fictional.slice(0, 24)]) await db.insert(s.cohortMembers).values({ id: newId("cm"), cohortId: cohortIds[0], userId: uid });
  for (const uid of fictional.slice(24, 40)) await db.insert(s.cohortMembers).values({ id: newId("cm"), cohortId: cohortIds[1] ?? cohortIds[0], userId: uid });

  // ---- Events ------------------------------------------------------------------------
  const eventIds: Record<string, string> = {};
  for (const e of EVENTS) {
    const id = newId("evt");
    eventIds[e.slug] = id;
    await db.insert(s.events).values({ id, slug: e.slug, category: e.category, titleEn: e.title.en, titleFr: e.title.fr, overviewEn: e.overview.en, overviewFr: e.overview.fr, audienceEn: e.audience.en, audienceFr: e.audience.fr, startsAt: e.startsAt, endsAt: e.endsAt, format: e.format, venueEn: e.venue?.en ?? null, venueFr: e.venue?.fr ?? null, city: e.city ?? null, onlineUrl: e.format !== "in_person" ? "https://meet.example.invalid/stoneshed-academy (placeholder link)" : null, speaker: e.speaker, capacity: e.capacity, scheduleEn: e.schedule.en, scheduleFr: e.schedule.fr, theme: e.theme, status: e.status, postEventCourseSlug: e.postEventCourseSlug ?? null, isFictional: true });
    // fictional registrations
    const n = Math.min(fictional.length, e.status === "completed" ? Math.min(e.capacity, 38) : Math.min(e.capacity - (e.capacity === 30 ? 2 : 10), Math.floor(e.capacity * 0.55)));
    for (let i = 0; i < n; i++) {
      const regId = newId("reg");
      await db.insert(s.eventRegistrations).values({ id: regId, eventId: id, userId: fictional[(i + n) % fictional.length], ticketCode: ticketCode(), status: "confirmed", affiliation: i % 4 === 0 ? INSTITUTIONS[i % INSTITUTIONS.length].name : null, registeredAt: now - Math.floor(Math.random() * 20) * day }).onConflictDoNothing();
      if (e.status === "completed" && i % 5 !== 0) await db.insert(s.attendance).values({ id: newId("att"), registrationId: regId, eventId: id, checkedInBy: userIds["instructor"], method: i % 2 ? "qr" : "manual", checkedInAt: now - 30 * day });
    }
  }
  // demo learner registered to the first upcoming event
  const upcoming = EVENTS.filter((e) => e.status === "open").sort((a, b) => a.startsAt.localeCompare(b.startsAt))[0];
  await db.insert(s.eventRegistrations).values({ id: newId("reg"), eventId: eventIds[upcoming.slug], userId: userIds["learner"], ticketCode: ticketCode(), status: "confirmed", affiliation: INSTITUTIONS[0].name });

  // ---- Demo learner progress ---------------------------------------------------------
  const learner = userIds["learner"];
  const inv = lessonIdsByCourse["investing-101"];
  await db.insert(s.enrollments).values({ id: newId("enr"), userId: learner, courseId: courseIdBySlug["investing-101"], progressPct: Math.round((5 / inv.length) * 100), lastLessonId: inv[5], enrolledAt: now - 12 * day });
  for (const lid of inv.slice(0, 5)) await db.insert(s.lessonProgress).values({ id: newId("lp"), userId: learner, lessonId: lid, courseId: courseIdBySlug["investing-101"], completed: true, updatedAt: now - 3 * day });
  await db.insert(s.lessonProgress).values({ id: newId("lp"), userId: learner, lessonId: inv[5], courseId: courseIdBySlug["investing-101"], completed: false, bookmarked: true });
  await db.insert(s.lessonNotes).values({ id: newId("note"), userId: learner, lessonId: inv[1], body: "Inflation quietly reduces what my savings can buy. Compare: 100,000 FCFA in a drawer vs in something that at least keeps pace with prices." });
  const um = lessonIdsByCourse["understanding-money"];
  if (um?.length) {
    await db.insert(s.enrollments).values({ id: newId("enr"), userId: learner, courseId: courseIdBySlug["understanding-money"], progressPct: 100, status: "completed", enrolledAt: now - 30 * day, completedAt: now - 20 * day });
    for (const lid of um) await db.insert(s.lessonProgress).values({ id: newId("lp"), userId: learner, lessonId: lid, courseId: courseIdBySlug["understanding-money"], completed: true, updatedAt: now - 20 * day });
    await db.insert(s.certificates).values({ id: certificateId(), userId: learner, courseId: courseIdBySlug["understanding-money"], learnerName: "Amina Learner (demo)", courseTitle: "Understanding Money", locale: "en", issuedAt: now - 20 * day });
  }
  await db.insert(s.enrollments).values({ id: newId("enr"), userId: learner, courseId: courseIdBySlug["what-is-a-mutual-fund"], progressPct: 0, enrolledAt: now - 2 * day });
  const quizzesInv = await db.query.quizzes.findMany();
  if (quizzesInv[0]) await db.insert(s.quizAttempts).values({ id: newId("qa"), userId: learner, quizId: quizzesInv[0].id, scorePct: 100, passed: true, answers: [], attemptedAt: now - 5 * day });
  if (quizzesInv[1]) await db.insert(s.quizAttempts).values({ id: newId("qa"), userId: learner, quizId: quizzesInv[1].id, scorePct: 67, passed: false, answers: [], attemptedAt: now - 4 * day });
  for (const b of ["first_lesson", "five_lessons", "first_course", "lab_explorer", "event_attendee"]) await db.insert(s.achievements).values({ id: newId("bdg"), userId: learner, badgeKey: b, earnedAt: now - 10 * day });
  await db.insert(s.videoProgress).values([
    { id: newId("vp"), userId: learner, videoId: videoIdBySlug["how-does-a-fund-manager-work"], positionSeconds: 95, completed: false, saved: true },
    { id: newId("vp"), userId: learner, videoId: videoIdBySlug["what-is-a-mutual-fund"], positionSeconds: 180, completed: true, saved: false },
  ]);

  // ---- Fictional learner activity (enrollments, progress, analytics) ----------------------
  const courseSlugs = Object.keys(courseIdBySlug);
  const withLessons = courseSlugs.filter((c) => lessonIdsByCourse[c].length > 0);
  const analytics: typeof s.analyticsEvents.$inferInsert[] = [];
  for (const [i, uid] of fictional.entries()) {
    const created = now - Math.floor(Math.random() * 90) * day;
    analytics.push({ id: newId("evt"), userId: uid, eventName: "registration", locale: i % 3 === 0 ? "fr" : "en", createdAt: created });
    const nEnroll = 1 + (i % 3);
    for (let k = 0; k < nEnroll; k++) {
      const slug = k === 0 ? "investing-101" : withLessons[(i + k) % withLessons.length];
      const cid = courseIdBySlug[slug];
      const lessonIds = lessonIdsByCourse[slug];
      const done = Math.min(lessonIds.length, Math.floor(Math.random() * (lessonIds.length + 1)));
      const complete = done === lessonIds.length && lessonIds.length > 0;
      await db.insert(s.enrollments).values({ id: newId("enr"), userId: uid, courseId: cid, progressPct: lessonIds.length ? Math.round((done / lessonIds.length) * 100) : 0, status: complete ? "completed" : "active", enrolledAt: created + day, completedAt: complete ? created + 20 * day : null }).onConflictDoNothing();
      analytics.push({ id: newId("evt"), userId: uid, eventName: "course_enrolled", createdAt: created + day, properties: { courseSlug: slug } });
      for (const lid of lessonIds.slice(0, done)) {
        await db.insert(s.lessonProgress).values({ id: newId("lp"), userId: uid, lessonId: lid, courseId: cid, completed: true, updatedAt: created + 2 * day }).onConflictDoNothing();
        analytics.push({ id: newId("evt"), userId: uid, eventName: "lesson_completed", createdAt: created + 2 * day + Math.floor(Math.random() * 20) * day });
      }
      if (complete) {
        await db.insert(s.certificates).values({ id: certificateId(), userId: uid, courseId: cid, learnerName: `Fictional learner ${i + 1}`, courseTitle: slug, locale: "en", issuedAt: created + 20 * day });
        analytics.push({ id: newId("evt"), userId: uid, eventName: "course_completed", createdAt: created + 20 * day });
      }
      if (quizzesInv.length && Math.random() < 0.7) {
        const first = 40 + Math.floor(Math.random() * 40), second = Math.min(100, first + 10 + Math.floor(Math.random() * 30));
        await db.insert(s.quizAttempts).values([{ id: newId("qa"), userId: uid, quizId: quizzesInv[k % quizzesInv.length].id, scorePct: first, passed: first >= 70, answers: [], attemptedAt: created + 3 * day }, { id: newId("qa"), userId: uid, quizId: quizzesInv[k % quizzesInv.length].id, scorePct: second, passed: second >= 70, answers: [], attemptedAt: created + 6 * day }]);
        analytics.push({ id: newId("evt"), userId: uid, eventName: "quiz_attempted", createdAt: created + 3 * day, properties: { scorePct: first } }, { id: newId("evt"), userId: uid, eventName: "quiz_attempted", createdAt: created + 6 * day, properties: { scorePct: second } });
      }
    }
    const vids = Object.values(videoIdBySlug);
    for (let k = 0; k < i % 4; k++) analytics.push({ id: newId("evt"), userId: uid, eventName: "video_completed", createdAt: created + Math.floor(Math.random() * 40) * day, properties: { videoId: vids[(i + k) % vids.length] } });
    if (i % 5 === 0) analytics.push({ id: newId("evt"), userId: uid, eventName: "fund_page_view", createdAt: created + Math.floor(Math.random() * 40) * day, properties: { fund: i % 2 ? "stoneshed-gold" : "stoneshed-classic" } });
    if (i % 2 === 0) analytics.push({ id: newId("evt"), userId: uid, eventName: "lab_used", createdAt: created + Math.floor(Math.random() * 40) * day, properties: { lab: ["growth", "inflation", "cap-vs-dist", "bonds"][i % 4] } });
  }
  // anonymous fund-page views
  for (let i = 0; i < 260; i++) analytics.push({ id: newId("evt"), anonId: `anon-${i}`, eventName: "fund_page_view", createdAt: now - Math.floor(Math.random() * 90) * day, properties: { fund: i % 2 ? "stoneshed-gold" : "stoneshed-classic" } });
  for (let i = 0; i < analytics.length; i += 100) await db.insert(s.analyticsEvents).values(analytics.slice(i, i + 100));

  // ---- Engagement: adviser inquiries, consultations, partnership inquiries --------------
  const inq = [
    { name: "Ghislaine Abega (fictional)", email: "ghislaine.fictional@example.test", topic: "Understanding redemption terms", fund: "stoneshed-gold", source: "fund_page", status: "new" },
    { name: "Landry Kamga (fictional)", email: "landry.fictional@example.test", topic: "Classic vs Gold for a 3-year horizon", fund: "stoneshed-classic", source: "course", status: "qualified" },
    { name: "Rosine Onana (fictional)", email: "rosine.fictional@example.test", topic: "Corporate treasury placement", fund: null, source: "event", status: "referred" },
    { name: "Samuel Biya (fictional)", email: "samuel.fictional@example.test", topic: "Diaspora subscription process", fund: "stoneshed-classic", source: "ai_tutor", status: "new" },
  ];
  for (const [i, x] of inq.entries()) {
    const id = newId("inq");
    await db.insert(s.adviserInquiries).values({ id, userId: fictional[i], fullName: x.name, email: x.email, topic: x.topic, fundSlug: x.fund, message: "Fictional demonstration request.", source: x.source, consentContact: true, locale: "en", status: x.status, referredTo: x.status === "referred" ? "Investor relations (placeholder)" : null, createdAt: now - (i + 2) * day });
    await db.insert(s.consultationRequests).values({ id: newId("con"), inquiryId: id, preferredChannel: ["phone", "email", "in_person", "video"][i], status: x.status === "referred" ? "scheduled" : "requested", crmSyncStatus: "not_configured", createdAt: now - (i + 2) * day });
  }
  await db.insert(s.partnershipInquiries).values([
    { id: newId("pin"), institutionName: "Fictional Polytechnic of Yaoundé", institutionType: "university", contactPerson: "Dr. Example Contact (fictional)", email: "dean.fictional@example.test", city: "Yaoundé", country: "Cameroon", expectedParticipants: 120, requestedProgram: "investing-101", deliveryFormat: "on_campus", preferredTiming: "February 2027", details: "Fictional demonstration inquiry.", status: "proposal", createdAt: now - 9 * day },
    { id: newId("pin"), institutionName: "Example Employers' Federation (fictional)", institutionType: "professional_body", contactPerson: "Mme Example (fictional)", email: "training.fictional@example.test", city: "Douala", country: "Cameroon", expectedParticipants: 40, requestedProgram: "cash-flow-management-for-smes", deliveryFormat: "blended", preferredTiming: "Q1 2027", details: "Fictional demonstration inquiry.", status: "new", createdAt: now - 2 * day },
  ]);

  // ---- Audit trail -----------------------------------------------------------------------
  await db.insert(s.auditLogs).values([
    { id: newId("aud"), actorId: null, actorRole: "system", action: "seed.completed", metadata: { note: "Demonstration seed. All learner, event, inquiry and analytics data is fictional." } },
    { id: newId("aud"), actorId: userIds["academy_manager_p"], actorRole: "academy_manager", action: "fund_data.submitted_for_review", entityType: "fund_data_version", metadata: { version: "0.1-brief" }, createdAt: now - 3 * day },
  ]);

  console.log(`Seeded: ${COURSES.length} courses, ${Object.keys(videoIdBySlug).length} videos, ${ARTICLES.length} articles, ${GLOSSARY.length} glossary terms, ${EVENTS.length} events, ${knowledge.length} AI knowledge sources, ${fictional.length + DEMO_ACCOUNTS.length} users, ${analytics.length} analytics events.`);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
