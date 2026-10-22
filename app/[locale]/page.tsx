import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, FileCheck2, Landmark, GraduationCap, Building2, Users } from "lucide-react";
import { getDictionary, pick, type Locale } from "@/lib/i18n";
import { listCourses, listVideos, listEvents, listArticles, listFunds } from "@/lib/services/content";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { HeroNetwork } from "@/components/home/hero-network";
import { FilmModal } from "@/components/home/film-modal";
import { PathwayChooser } from "@/components/home/pathway-chooser";
import { HowInvestingWorks } from "@/components/home/how-investing-works";
import { LabPreview } from "@/components/home/lab-preview";
import { CourseCard } from "@/components/cards/course-card";
import { VideoCard } from "@/components/cards/video-card";
import { EventCard } from "@/components/cards/event-card";
import { ArticleCard } from "@/components/cards/article-card";
import { CoverArt } from "@/components/ui/cover-art";
import { ACADEMY_FILM } from "@/lib/content/academy-film";

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const [courses, videos, events, articles, funds] = await Promise.all([
    listCourses({ featuredOnly: true }),
    listVideos({ limit: 4 }),
    listEvents({ upcomingOnly: true, limit: 3 }),
    listArticles({ limit: 3 }),
    listFunds(),
  ]);
  const frames = ACADEMY_FILM.map((f) => ({ title: f.title[locale], visual: f.visual[locale], narration: f.narration[locale], seconds: f.seconds }));

  return (
    <>
      {/* 1. Hero */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-midnight text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(18,101,200,0.35),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(11,47,115,0.6),_transparent_60%)]" />
        <HeroNetwork />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-midnight to-transparent" />
        <Container className="relative z-10 pt-32 pb-24">
          <Reveal>
            <p className="eyebrow-light mb-6 flex items-center gap-2"><span className="h-px w-8 bg-sky" />{t.home.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.1}><h1 className="display-xl max-w-4xl text-white">{t.home.heroTitle}</h1></Reveal>
          <Reveal delay={0.2}><p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">{t.home.heroSub}</p></Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href={`/${locale}/learn`} size="lg" variant="light">{t.home.ctaExplore} <ArrowRight className="h-4 w-4" /></Button>
              <FilmModal frames={frames} label={t.home.ctaFilm} trigger="outline" />
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              {[["7", locale === "fr" ? "catégories de cours" : "course categories"], ["8", locale === "fr" ? "laboratoires interactifs" : "interactive labs"], ["6", locale === "fr" ? "séries Academy TV" : "Academy TV series"], ["EN · FR", locale === "fr" ? "entièrement bilingue" : "fully bilingual"]].map(([n, l]) => (
                <div key={l}><dt className="num font-display text-2xl font-extrabold text-white">{n}</dt><dd className="mt-1 text-xs text-white/55">{l}</dd></div>
              ))}
            </dl>
          </Reveal>
        </Container>
        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/40 sm:flex"><span className="h-8 w-px animate-pulse bg-white/30" />{t.home.scroll}</div>
      </section>

      {/* 2. Welcome */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <Reveal>
              <SectionHeading eyebrow={t.home.welcomeEyebrow} title={t.home.welcomeTitle} size="lg" />
              <p className="mt-6 text-[17px] leading-[1.8] text-slate">{t.home.welcomeBody}</p>
            </Reveal>
            <Stagger className="grid gap-4 sm:grid-cols-1">
              {t.home.welcomePillars.map((p, i) => (
                <StaggerItem key={p.title}>
                  <div className="flex gap-5 rounded-2xl border border-mist/70 bg-white p-6 shadow-[var(--shadow-soft)]">
                    <span className="num font-display text-3xl font-extrabold text-sky">0{i + 1}</span>
                    <div><h3 className="font-display text-lg font-bold text-ink">{p.title}</h3><p className="mt-1.5 text-[15px] leading-relaxed text-steel">{p.body}</p></div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* 3. Pathways */}
      <section className="bg-cloud/50 py-24">
        <Container>
          <Reveal><SectionHeading eyebrow={t.home.pathwayEyebrow} title={t.home.pathwayTitle} sub={t.home.pathwaySub} align="center" /></Reveal>
          <div className="mt-12"><PathwayChooser /></div>
        </Container>
      </section>

      {/* 4. How investing works */}
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal><SectionHeading eyebrow={t.home.howEyebrow} title={t.home.howTitle} sub={t.home.howSub} /></Reveal>
          <div className="mt-12"><HowInvestingWorks /></div>
        </Container>
      </section>

      {/* 5. Featured courses */}
      <section className="py-24">
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={t.home.coursesEyebrow} title={t.home.coursesTitle} />
            <Button href={`/${locale}/learn`} variant="outline">{t.common.viewAll} <ArrowRight className="h-4 w-4" /></Button>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 6).map((c) => <StaggerItem key={c.id}><CourseCard course={c} locale={locale} /></StaggerItem>)}
          </Stagger>
        </Container>
      </section>

      {/* 6. Academy TV */}
      <section className="relative overflow-hidden bg-midnight py-24 text-white sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(18,101,200,0.3),_transparent_50%)]" />
        <Container className="relative">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={t.home.tvEyebrow} title={t.home.tvTitle} sub={t.home.tvSub} light />
            <Button href={`/${locale}/tv`} variant="light">{t.nav.tv} <ArrowRight className="h-4 w-4" /></Button>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {videos.map((v) => <StaggerItem key={v.id}><VideoCard video={v} locale={locale} dark /></StaggerItem>)}
          </Stagger>
        </Container>
      </section>

      {/* 7. Lab preview */}
      <section className="py-24 sm:py-32">
        <Container>
          <Reveal><SectionHeading eyebrow={t.home.labEyebrow} title={t.home.labTitle} sub={t.home.labSub} /></Reveal>
          <div className="mt-12"><LabPreview /></div>
        </Container>
      </section>

      {/* 8. Funds */}
      <section className="bg-cloud/50 py-24">
        <Container>
          <Reveal><SectionHeading eyebrow={t.home.fundsEyebrow} title={t.home.fundsTitle} sub={t.home.fundsSub} align="center" /></Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {funds.map((f) => (
              <Reveal key={f.id}>
                <Link href={`/${locale}/funds/${f.slug}`} className="group relative block overflow-hidden rounded-3xl bg-royal p-8 text-white transition hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] sm:p-10">
                  <div className="absolute inset-0 opacity-40"><CoverArt seed={f.slug} theme={f.theme} pattern={f.fundType === "capitalization" ? "curve" : "bars"} /></div>
                  <div className="relative">
                    <Badge tone="white">{f.fundType === "capitalization" ? t.funds.classicOrientation : t.funds.goldOrientation}</Badge>
                    <h3 className="mt-5 font-display text-2xl font-extrabold sm:text-3xl">{f.officialName}</h3>
                    <p className="mt-2 text-sm text-white/70">{f.cosumafFundRef} · {locale === "fr" ? "Visa" : "Visa"} {f.cosumafVisaRef}</p>
                    <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/80">
                      {f.fundType === "capitalization"
                        ? locale === "fr" ? "Les revenus du fonds sont réinvestis : la valeur de la part reflète la croissance cumulée." : "Income earned by the fund is reinvested, so growth accumulates in the unit value."
                        : locale === "fr" ? "Les revenus du fonds sont distribués chaque année aux porteurs de parts." : "Income earned by the fund is paid out to unitholders each year."}
                    </p>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sky">{t.funds.understand} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 text-center"><Button href={`/${locale}/funds/compare`} variant="outline">{t.funds.compare}</Button></Reveal>
        </Container>
      </section>

      {/* 9. Events */}
      <section className="py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
            <Reveal>
              <SectionHeading eyebrow={t.home.eventsEyebrow} title={t.home.eventsTitle} />
              <p className="mt-5 text-[16px] leading-relaxed text-steel">{locale === "fr" ? "Masterclasses universitaires, séminaires Investissement 101 et ateliers de trésorerie, à Douala, Yaoundé et en ligne. Inscription gratuite avec billet QR." : "University masterclasses, Investment 101 seminars and treasury workshops in Douala, Yaoundé and online. Free registration with a QR ticket."}</p>
              <Button href={`/${locale}/events`} className="mt-8" variant="outline">{t.common.viewAll} <ArrowRight className="h-4 w-4" /></Button>
            </Reveal>
            <Stagger className="space-y-4">
              {events.map((e) => <StaggerItem key={e.id}><EventCard event={e} locale={locale} /></StaggerItem>)}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* 10. Ask AI */}
      <section className="py-12">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-sky/30 bg-gradient-to-br from-royal via-finance to-royal p-8 text-white sm:p-14">
              <div className="grid-fade absolute inset-0 opacity-30" />
              <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                <div>
                  <p className="eyebrow-light mb-3 flex items-center gap-2"><Sparkles className="h-4 w-4" />{t.home.askEyebrow}</p>
                  <h2 className="display-md text-white">{t.home.askTitle}</h2>
                  <p className="mt-4 text-white/75">{t.home.askSub}</p>
                  <Button href={`/${locale}/ask`} className="mt-8" variant="light">{t.nav.ask} <ArrowRight className="h-4 w-4" /></Button>
                </div>
                <div className="space-y-2">
                  {t.ask.examples.slice(0, 4).map((q) => (
                    <Link key={q} href={`/${locale}/ask?q=${encodeURIComponent(q)}`} className="block rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white backdrop-blur transition hover:bg-white/20">{q}</Link>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 11. Insights */}
      <section className="py-24">
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={t.home.insightsEyebrow} title={t.home.insightsTitle} />
            <Button href={`/${locale}/insights`} variant="outline">{t.common.viewAll} <ArrowRight className="h-4 w-4" /></Button>
          </Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            {articles[0] && <Reveal><ArticleCard article={articles[0]} locale={locale} featured /></Reveal>}
            <Stagger className="space-y-8">{articles.slice(1, 3).map((a) => <StaggerItem key={a.id}><ArticleCard article={a} locale={locale} /></StaggerItem>)}</Stagger>
          </div>
        </Container>
      </section>

      {/* 12. Institutions */}
      <section className="bg-cloud/50 py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <SectionHeading eyebrow={t.home.institutionsEyebrow} title={t.home.institutionsTitle} sub={t.home.institutionsSub} />
              <Button href={`/${locale}/institutions`} className="mt-8">{t.home.institutionsCta} <ArrowRight className="h-4 w-4" /></Button>
            </Reveal>
            <Stagger className="grid grid-cols-2 gap-4">
              {[[GraduationCap, locale === "fr" ? "Universités" : "Universities"], [Building2, locale === "fr" ? "Écoles de commerce" : "Business schools"], [Users, locale === "fr" ? "Organismes professionnels" : "Professional bodies"], [Landmark, locale === "fr" ? "Employeurs & trésoreries" : "Employers & treasuries"]].map(([Icon, label]) => {
                const I = Icon as typeof GraduationCap;
                return (
                  <StaggerItem key={label as string}>
                    <div className="rounded-2xl border border-mist/70 bg-white p-6 shadow-[var(--shadow-soft)]"><I className="h-6 w-6 text-finance" /><p className="mt-4 font-display font-bold text-ink">{label as string}</p></div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* 13. Credibility */}
      <section className="py-24">
        <Container size="md">
          <Reveal>
            <SectionHeading eyebrow={t.home.credEyebrow} title={t.home.credTitle} align="center" />
            <p className="mx-auto mt-6 max-w-2xl text-center text-[16px] leading-relaxed text-steel">{t.home.credBody}</p>
          </Reveal>
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-3">
            {[[ShieldCheck, "COSUMAF-SGP-03/2023", locale === "fr" ? "Agrément société de gestion" : "Management company licence"], [FileCheck2, locale === "fr" ? "Revue conformité" : "Compliance review", locale === "fr" ? "Avant publication de tout contenu produit" : "Before any product content is published"], [Landmark, "Ecobank Cameroon · Moore Stephens CA", locale === "fr" ? "Dépositaire et commissaire aux comptes des FCP" : "Depositary and auditor of the FCPs"]].map(([Icon, a, b]) => {
              const I = Icon as typeof ShieldCheck;
              return (
                <StaggerItem key={a as string}>
                  <div className="h-full rounded-2xl border border-mist/70 bg-white p-6 text-center shadow-[var(--shadow-soft)]"><I className="mx-auto h-6 w-6 text-royal" /><p className="mt-4 font-display text-[15px] font-bold text-ink">{a as string}</p><p className="mt-1 text-sm text-steel">{b as string}</p></div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* 14. Final CTA */}
      <section className="pb-8">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-royal px-8 py-16 text-center text-white sm:px-16 sm:py-24">
              <div className="absolute inset-0 opacity-30"><CoverArt seed="final-cta" theme="midnight" pattern="nodes" /></div>
              <div className="relative">
                <h2 className="display-lg mx-auto max-w-3xl text-white">{t.home.finalTitle}</h2>
                <p className="mx-auto mt-5 max-w-xl text-white/75">{t.home.finalSub}</p>
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <Button href={`/${locale}/register`} size="lg" variant="light">{t.home.finalCta}</Button>
                  <Button href={`/${locale}/learn`} size="lg" variant="ghost" className="text-white hover:bg-white/10">{t.home.finalSecondary}</Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
