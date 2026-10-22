# Stoneshed Academy

**Learn Money. Understand Markets. Invest with Clarity.**

A bilingual (EN/FR) financial education, investment literacy and investor engagement platform built for Stoneshed Asset Management S.A. (COSUMAF-SGP-03/2023) and the CEMAC region. This repository contains the Phase One, CEO-ready functional MVP.

## What is inside

| Area | Route | Notes |
| --- | --- | --- |
| Premium homepage | `/en`, `/fr` | 15 editorial sections, canvas hero, interactive explainer, lab preview, Academy film storyboard |
| Learning (LMS) | `/learn`, `/learn/[course]`, `/learn/[course]/[lesson]` | 42 catalog courses, 6 with full lessons (Investing 101 has 7 modules), quizzes, notes, bookmarks, progress, certificates with QR verification |
| Academy TV | `/tv`, `/tv/[episode]` | 6 series, 19 scripted episodes; storyboard player until approved footage is attached; production workflow |
| Investment Lab | `/lab/[tool]` | 8 interactive simulators with real calculations and charts |
| Funds education center | `/funds`, `/funds/[fund]`, `/funds/compare` | Source-controlled data register for FCP Stoneshed Classic and Gold, FAQ, risks, adviser request |
| Ask Stoneshed AI | `/ask`, `POST /api/ask` | Source-grounded tutor; live Claude model when `ANTHROPIC_API_KEY` is set, transparent offline mode otherwise |
| Events | `/events`, `/events/[event]` | List and calendar views, registration, waitlist, QR tickets, admin check-in, CSV export |
| Institutions | `/institutions`, `/institutions/portal` | Partnership inquiry pipeline and cohort portal for authorised coordinators |
| Insights | `/insights`, `/insights/[article]`, `/insights/glossary` | 6 research articles with sources, 49-term bilingual glossary |
| Learner dashboard | `/dashboard` | Progress, continue watching, recommendations, badges, certificates, tickets, notes |
| Administration | `/admin/*` | Overview analytics, content, learning ops, events, institutions, engagement, governance, fund data register, users, audit, AI usage |
| Presentation mode | `/vision` | "The Stoneshed Academy Vision", six executive chapters, restricted to demo presenters |

## Stack

Next.js 16 (App Router, server actions), TypeScript, Tailwind CSS 4, Framer Motion, Recharts, Drizzle ORM on SQLite (libsql), signed-cookie sessions (jose + bcryptjs), zod validation.

## Run locally

```bash
npm install
cp .env.example .env.local        # optional; defaults work for the demo
npm run db:push                   # creates data/academy.db
npm run db:seed                   # loads content + fictional demo data
npm run dev                       # http://localhost:3000
```

Production: `npm run build && npm start`.

### Demonstration accounts

All demo data is fictional. Password for every account: `Academy2026!`

| Email | Role |
| --- | --- |
| ceo.demo@stoneshed-academy.test | Super administrator + presentation mode |
| manager.demo@stoneshed-academy.test | Academy manager + presentation mode |
| compliance.demo@stoneshed-academy.test | Compliance reviewer (approves fund content) |
| instructor.demo@stoneshed-academy.test | Instructor (event check-in) |
| coordinator.demo@stoneshed-academy.test | Institutional coordinator (portal) |
| learner.demo@stoneshed-academy.test | Learner with seeded progress |

### Environment variables

See `.env.example`. Nothing is required for the local demo. `ANTHROPIC_API_KEY` enables the live AI tutor; `RESEND_API_KEY` and `CRM_WEBHOOK_URL` are placeholders for Phase Two integrations and are reported as "not connected" in the UI until configured.

## Content authoring

Educational content lives in `lib/content/*.ts` against the contracts in `lib/content/types.ts` and is loaded by `scripts/seed.ts`. Fund product data is in `lib/content/funds.ts`; every field carries its source document and approval status.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

An end-to-end browser script covering registration, onboarding, enrolment, lesson completion, quizzes, events, labs, adviser and partnership forms, the AI tutor, admin check-in, governance, certificates and the presentation mode was run against this build with Playwright (24/24 journeys passing).

See `IMPLEMENTATION_REPORT.md` for what is complete, what is fictional, which integrations need credentials, and what remains for Phase Two.

## Deploying on Vercel

The repository ships a seeded SQLite database (`data/academy.db`). On Vercel the filesystem is read-only, so the app copies that file to `/tmp` on cold start: every page and feature works out of the box, but new registrations and progress are per-instance and reset on redeploy. For persistent data set `DATABASE_URL` (and `DATABASE_AUTH_TOKEN`) to a Turso/libsql database, or migrate to PostgreSQL. Optional: `ANTHROPIC_API_KEY` for the live AI tutor, `AUTH_SECRET` for session signing, `NEXT_PUBLIC_SITE_URL` for certificate links.
