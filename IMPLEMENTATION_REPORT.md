# Stoneshed Academy — Implementation Report (Phase One)

Date: 22 October 2026 · Branch: `claude/dazzling-volta-w60ipw`

## 1. What is complete and working

Everything below is implemented against a real database with persisted records, authentication and role-based permissions. It was verified with a Playwright end-to-end run (24/24 journeys), a clean production build (47 routes), `tsc --noEmit` and ESLint with zero errors.

**Platform**
- Next.js 16 / TypeScript / Tailwind 4 / Drizzle ORM (SQLite via libsql, swappable to PostgreSQL) / Framer Motion / Recharts.
- Bilingual EN/FR across navigation, pages, forms, dashboard, courses, quizzes, video narration, certificates, legal notices and disclosures. Locale-prefixed routes with cookie/Accept-Language redirect; the switch keeps you on the same page.
- 36 data entities covering every item in the brief (users, learner profiles, institutions, cohorts, courses, modules, lessons, enrollments, lesson progress, quizzes, questions, attempts, certificates, videos, series, playlists, articles, research documents, glossary, events, registrations, attendance, instructors, fund products, fund documents, fund data versions, data flags, content approvals, AI knowledge sources, AI logs, adviser inquiries, consultation requests, analytics events, user consents, audit logs, notification outbox).
- Security: bcrypt password hashing, signed HTTP-only session cookies (jose), zod server-side validation on every action and API route, in-memory rate limiting, eight-role permission matrix, audit log for sensitive actions, data minimisation (the Lab stores nothing), guardian-consent checkbox for minors.

**Homepage** — 15 distinct editorial sections: canvas-animated hero network with pointer parallax, Academy film modal (labelled storyboard), welcome pillars, pathway chooser (feeds onboarding), interactive "How investing works" explainer, featured courses, Academy TV band, live Investment Lab preview, Classic/Gold cards, upcoming masterclasses, Ask Stoneshed AI teaser, Insights, institutional invitation, governance credibility, final CTA, regulatory footer. Reduced-motion alternatives throughout.

**Registration, sign-in, onboarding** — working flows, demo accounts, four-step learning-assessment wizard that stores interests, audience, level and language and drives dashboard recommendations.

**LMS** — 42 catalog courses across the seven required categories with filters and search; six foundational courses carry real lessons: *Investing 101* (7 modules, 15 lessons, knowledge checks on every module, 10-question final assessment) plus Understanding Money, Saving Versus Investing, What Is a Mutual Fund?, Understanding Net Asset Value and Introduction to the CEMAC Financial System (4 lessons and two knowledge checks each). Split-screen lesson player with storyboard video, lab links, markdown content, key takeaways, graded quizzes with explanations, private notes, bookmarks, resume, progress sync, module navigation, transcript and resources panels, text-size control. Course completion issues a branded certificate with unique ID, QR code, print-to-PDF and a public verification page.

**Academy TV** — six series (Money Explained, Investment in 60 Seconds, Inside the Market, The Investor's Classroom, Wealth Conversations, Inside Stoneshed), 19 scripted episodes including all ten required explainer scripts (hook, scenes with visual direction and narration in both languages, closing, disclaimer). Storyboard player with play/pause, scrubbing, scene markers, captions, speed, transcript; it switches to a real HTML5 player automatically when an approved media URL is attached. Filters by topic, duration and language; save-to-list; continue watching; related learning; the nine-stage production workflow is editable in admin. Product-specific episodes are hidden from the public and held at compliance review.

**Investment Lab** — eight working simulators with real calculations and live charts: growth simulator, compounding vs distribution, inflation and purchasing power, risk explorer, asset allocation studio, how a mutual fund works (guided steps plus NAV arithmetic), bond and interest-rate explorer (price/yield curve, duration, cash-flow table), personal financial goals (inflation-adjusted target, required contribution). All outputs are labelled hypothetical.

**Funds education center** — FCP Stoneshed Classic and FCP Stoneshed Gold pages built from a source-controlled data register (each value carries its source document and approval status), animated comparison, FAQ, risk list, subscription steps that route to Stoneshed's approved process, documentation list, and a consented adviser-request form that creates an inquiry and a consultation request.

**Ask Stoneshed AI** — retrieval over 234 approved knowledge sources (lessons, glossary, articles, fund facts, FAQ) with citations and links; detects personal-advice questions and refers them to an adviser; logs every exchange with sources and latency; "simpler / example / quiz / translate / lesson" modes. Runs in a clearly labelled grounded offline mode until an API key is supplied, then uses Claude with the same sources and guardrails.

**Events** — list and calendar views, category filters, registration with capacity and waitlist, QR ticket, cancellation with automatic waitlist promotion, admin check-in by ticket code, camera QR scanner (where the browser supports BarcodeDetector), manual check-in, attendee CSV export, capacity and status management, post-event learning pathway.

**Institutions** — landing page with partnership model and eight programs, working inquiry form feeding an admin pipeline, coordinator portal scoped to the coordinator's own cohorts showing progress and certificates.

**Insights** — six bilingual research articles with real institutional sources and related learning, 49-term bilingual searchable glossary with cross-references.

**Learner dashboard** — overall progress ring, active courses with resume links, continue watching, interest-based recommendations, seven achievement badges, learning streak, certificates, saved resources, notes, event tickets, history.

**Administration** — overview with executive KPIs and charts (registrations, active learners, completions, assessment improvement, TV engagement, lab sessions, institutional participation, attendance, fund page views, qualified consultation requests, education-to-adviser conversion), content management (course status/featured, video production stage and media URL), learning operations (enrollments, certificate revocation), events and check-in, institutions and cohorts, engagement pipeline (adviser inquiries, consultation requests, CRM sync status), governance (seven-stage publishing workflow; fund-related items can only be approved by a compliance reviewer and denied attempts are logged), fund data register with open flags, users and permission matrix, audit log and notification outbox, AI usage log.

**Presentation mode** — "The Stoneshed Academy Vision", six executive chapters with keyboard navigation and cinematic transitions, restricted to demo presenters and administrators; every feature card is tagged *Implemented in this build* or *Proposed*.

## 2. Demonstration data that is fictional

All of the following is seeded and labelled as fictional in the UI: 140 learners, enrollments, progress, quiz attempts, certificates, 2,775 analytics events, event registrations and attendance, four institutions and six cohorts, adviser and partnership inquiries, the six demo accounts, and the five instructor profiles (all marked "placeholder"). Real course, video, article, glossary and fund-register content is original educational writing, not fictional data, but has not yet been reviewed by Stoneshed.

The six photographic stills on the homepage, About and Funds pages are AI-generated concept images produced with Higgsfield (1.5 credits). They depict no real people or premises, are captioned "AI concept image · pending brand approval", and are referenced from the Higgsfield CDN because that host was not reachable from the build container. They should be downloaded into `public/images` or replaced by commissioned photography once approved. If the CDN link ever fails, the page hides the image automatically.

## 3. Integrations that require credentials

| Integration | Status | What to provide |
| --- | --- | --- |
| AI tutor (Anthropic) | Offline grounded mode active; live mode coded and tested for errors | `ANTHROPIC_API_KEY` (and optionally `ANTHROPIC_MODEL`) |
| Email / WhatsApp notifications | Messages are written to a notification outbox with status `queued_no_provider`; nothing claims to have been sent | `RESEND_API_KEY` or a WhatsApp provider, plus templates |
| CRM hand-off of consented leads | Referral workflow and sync status implemented; status shows `not_configured` | `CRM_WEBHOOK_URL` and credentials for the chosen CRM |
| Video generation / production footage | Upload path exists (admin → media URL); no generation provider connected | Approved footage files or a configured provider |
| Live market data | None connected; every figure identifies source and date | A market-data provider, Phase Two |
| Payments | Not implemented; all courses marked free, three marked paid without checkout | Only if paid programs are approved |
| Official logo and domain | Placeholder wordmark in brand colours | Official logo files; DNS for academy.stoneshed-am.com |

## 4. Product details requiring Stoneshed compliance approval

The brochure, FCP Stoneshed Gold management regulations and both information documents referenced in the brief were **not attached to the project**. The fund register therefore contains only brochure-level facts quoted from the brief (minimum subscription 10,000 FCFA, 3-year recommended horizon, Classic reinvests / Gold distributes annually, bond and debt-securities classification, Ecobank Cameroon depositary, Moore Stephens CA auditor, 6% target yield shown only with the qualifying statement). Eight open flags in the admin register record what must be resolved before publication: source documents to load, NAV frequency, fees, redemption terms and liquidity restrictions, target-yield wording, and whether Classic has its own management regulations. Nothing fund-related can move to "published" without the compliance-reviewer role.

Also pending approval: the two Inside Stoneshed episode scripts (held at compliance review), the "Understanding Stoneshed Classic and Gold" explainer, the draft privacy notice and terms, instructor assignments, and the generated imagery.

## 5. What remains for Phase Two

Live AI key and vector retrieval; produced video episodes and subtitle files; secure upload of fund documents; email/WhatsApp reminders; CRM synchronisation; full institutional cohort tooling (invitations, instructor portal with assignments and feedback); remaining catalog lessons (36 courses are catalog entries awaiting lessons); playlists UI; expanded analytics and retention cohorts; PostgreSQL migration and Redis-backed rate limiting for multi-instance hosting; backups and recovery runbook; accessibility audit with assistive technology; legal review of notices.

## 6. Unresolved issues and judgement calls

- Lesson video thumbnails and course covers use generated brand-consistent SVG art rather than photography, by design.
- Certificates are printed to PDF through the browser's print dialogue; a server-rendered PDF is a Phase Two enhancement.
- The institutional portal lists learners only for cohorts explicitly attached to the coordinator; invitation and bulk enrolment are not yet built.
- The QR camera scanner depends on the browser's BarcodeDetector API (Chrome/Edge/Android); manual entry always works.
- Rate limiting is per-process memory; fine for the demo, not for a multi-instance deployment.
