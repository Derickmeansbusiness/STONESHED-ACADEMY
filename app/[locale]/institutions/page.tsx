import type { Metadata } from "next";
import { GraduationCap, Users, BarChart3, Award, Handshake, ClipboardList } from "lucide-react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { PartnershipForm } from "@/components/institutions/partnership-form";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = { title: "Institutions" };

const PROGRAMS = [
  ["financial-literacy-foundations", "Financial Literacy Foundations", "Fondamentaux de la littératie financière"],
  ["investing-101", "Investment 101", "Investissement 101"],
  ["introduction-to-capital-markets", "Introduction to Capital Markets", "Introduction aux marchés de capitaux"],
  ["cemac-financial-markets", "CEMAC Financial Markets", "Les marchés financiers de la CEMAC"],
  ["mutual-fund-masterclass", "The Mutual Fund Masterclass", "La masterclass des fonds communs de placement"],
  ["financial-management-for-entrepreneurs", "Financial Management for Entrepreneurs", "Gestion financière pour entrepreneurs"],
  ["corporate-finance-and-treasury", "Corporate Finance and Treasury", "Finance d'entreprise et trésorerie"],
  ["applied-investment-research", "Applied Investment Research", "Recherche appliquée en investissement"],
];

export default async function InstitutionsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const user = await getSession();
  const steps = locale === "fr"
    ? [["Demande", "Vous décrivez votre institution, votre public et le programme souhaité."], ["Co-conception", "L'Academy adapte le programme au niveau et au calendrier de vos apprenants."], ["Livraison", "Masterclass sur campus, cohorte en ligne ou format mixte, avec supports bilingues."], ["Suivi", "Vos coordinateurs suivent la progression de la cohorte et reçoivent les rapports de complétion."]]
    : [["Request", "You describe your institution, audience and the program you want."], ["Co-design", "The Academy adapts the program to your learners' level and calendar."], ["Delivery", "On-campus masterclass, online cohort or blended format, with bilingual materials."], ["Follow-up", "Your coordinators track cohort progress and receive completion reports."]];
  const features = locale === "fr"
    ? [[GraduationCap, "Catalogue de cours attribué"], [Users, "Inscription par cohorte et invitation des apprenants"], [BarChart3, "Progression et analyses de cohorte"], [Award, "Certificats de réussite"], [ClipboardList, "Inscriptions aux événements"], [Handshake, "Communication avec les formateurs"]]
    : [[GraduationCap, "Assigned course catalog"], [Users, "Cohort enrollment and learner invitations"], [BarChart3, "Progress summaries and cohort analytics"], [Award, "Completion certificates"], [ClipboardList, "Event registrations"], [Handshake, "Instructor communications"]];
  return (
    <div className="pt-28 pb-12">
      <Container>
        <Reveal><SectionHeading eyebrow={t.institutions.title} title={t.institutions.headline} sub={t.institutions.sub} size="lg" /></Reveal>
        <section className="mt-16"><h2 className="display-sm text-ink">{t.institutions.model}</h2>
          <Stagger className="mt-6 grid gap-4 md:grid-cols-4">{steps.map(([a, b], i) => <StaggerItem key={a}><div className="h-full rounded-2xl border border-mist/70 bg-white p-6"><p className="num font-display text-3xl font-extrabold text-sky">0{i + 1}</p><p className="mt-3 font-display font-bold text-ink">{a}</p><p className="mt-1 text-sm text-steel">{b}</p></div></StaggerItem>)}</Stagger>
        </section>
        <section className="mt-16"><h2 className="display-sm text-ink">{t.institutions.programs}</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{PROGRAMS.map(([slug, en, fr]) => <div key={slug} className="rounded-2xl bg-royal p-5 text-white"><p className="font-display font-bold">{locale === "fr" ? fr : en}</p><p className="mt-1 text-xs text-sky">{locale === "fr" ? "Campus · En ligne · Mixte" : "Campus · Online · Blended"}</p></div>)}</div>
        </section>
        <section className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div><h2 className="display-sm text-ink">{t.institutions.portal}</h2><p className="mt-2 text-steel">{t.institutions.portalSub}</p>
            <ul className="mt-6 space-y-2">{features.map(([Icon, label]) => { const I = Icon as typeof Users; return <li key={label as string} className="flex items-center gap-3 rounded-xl border border-mist/70 bg-white p-3 text-sm text-slate"><I className="h-4 w-4 text-finance" />{label as string}</li>; })}</ul>
            {user?.role === "institutional_coordinator" || user?.role === "super_admin" ? <Button href={`/${locale}/institutions/portal`} className="mt-6">{t.institutions.portal}</Button> : null}
          </div>
          <div id="inquiry" className="surface scroll-mt-28 p-6 sm:p-8"><h2 className="display-sm text-ink">{t.institutions.inquiry}</h2><p className="mt-1 mb-6 text-sm text-steel">{t.institutions.inquirySub}</p><PartnershipForm programs={PROGRAMS.map(([slug, en, fr]) => ({ slug, label: locale === "fr" ? fr : en }))} /></div>
        </section>
      </Container>
    </div>
  );
}
