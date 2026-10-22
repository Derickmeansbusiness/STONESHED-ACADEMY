"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X, Check, Clock, BookOpen, PlayCircle, FlaskConical, Sparkles, GraduationCap, CalendarDays, Building2, Landmark, ShieldCheck, Users, BarChart3 } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLocale } from "@/lib/i18n/client";
import { Logo } from "@/components/ui/logo";
import { makeTooltip } from "@/components/charts/tooltip";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

type Metrics = Record<string, number>;
type Week = { week: string; registrations: number; lessons: number; videos: number };

export function VisionDeck({ locale, metrics, weeks }: { locale: Locale; metrics: Metrics; weeks: Week[] }) {
  const { t } = useLocale();
  const [i, setI] = useState(0);
  const fr = locale === "fr";
  const chapters = t.vision.chapters;
  const total = chapters.length + 1;
  const next = useCallback(() => setI((v) => Math.min(total - 1, v + 1)), [total]);
  const prev = useCallback(() => setI((v) => Math.max(0, v - 1)), []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (["ArrowRight", " ", "PageDown"].includes(e.key)) { e.preventDefault(); next(); } if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); prev(); } };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);
  const Tip = makeTooltip({ format: (v) => String(v) });

  const Tag = ({ done }: { done: boolean }) => <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider", done ? "bg-success/20 text-emerald-200" : "bg-amber/20 text-amber")}>{done ? <Check className="h-3 w-3" /> : <Clock className="h-3 w-3" />}{done ? t.vision.implemented : t.vision.proposed}</span>;

  const slides: React.ReactNode[] = [
    // Cover
    <div key="cover" className="flex h-full flex-col items-center justify-center text-center">
      <Logo light className="mb-10 scale-125" />
      <p className="eyebrow-light mb-4">{fr ? "Présentation exécutive" : "Executive presentation"}</p>
      <h1 className="display-xl max-w-4xl text-white">{t.vision.title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-white/70">{t.vision.sub}</p>
      <p className="mt-12 text-xs text-white/40">{t.vision.navHint}</p>
    </div>,
    // 1 Opportunity
    <Chapter key="c1" n={1} title={chapters[0]} sub={fr ? "Pourquoi l'éducation des investisseurs compte après l'extension de Stoneshed à la gestion collective." : "Why investor education matters after Stoneshed's expansion into collective investment management."}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {(fr ? [["Deux FCP visés par la COSUMAF", "FCP Stoneshed Classic (capitalisation) et FCP Stoneshed Gold (distribution), accessibles dès 10 000 FCFA."], ["Un écart de connaissance", "Beaucoup d'épargnants ont une capacité d'investissement mais ne comprennent ni les FCP, ni la valeur liquidative, ni le risque de taux."], ["Une réponse par l'éducation", "Former avant de vendre : une plateforme indépendante, bilingue, mobile d'abord, qui construit la confiance et la capacité de décision."]] : [["Two COSUMAF-visaed funds", "FCP Stoneshed Classic (capitalisation) and FCP Stoneshed Gold (distribution), accessible from 10,000 FCFA."], ["A knowledge gap", "Many savers have investment capacity but do not understand mutual funds, NAV or interest-rate risk."], ["Education as the answer", "Teach before you sell: an independent, bilingual, mobile-first platform that builds confidence and decision capability."]]).map(([a, b]) => (
            <div key={a} className="rounded-2xl border border-white/10 bg-white/5 p-5"><p className="font-display text-lg font-bold">{a}</p><p className="mt-1 text-sm text-white/65">{b}</p></div>
          ))}
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="eyebrow-light mb-4">{fr ? "Le parcours visé" : "The intended journey"}</p>
          <ol className="space-y-3">{(fr ? ["Découvrir l'Academy (gratuit)", "Apprendre les fondamentaux", "Expérimenter dans le laboratoire", "Comprendre Classic et Gold", "Demander volontairement un conseiller"] : ["Discover the Academy (free)", "Learn the fundamentals", "Experiment in the Lab", "Understand Classic and Gold", "Voluntarily request an adviser"]).map((s, k) => <li key={s} className="flex items-center gap-3"><span className="num flex h-8 w-8 items-center justify-center rounded-full bg-sky text-sm font-bold text-midnight">{k + 1}</span><span className="text-[15px]">{s}</span>{k < 4 && <span className="ml-auto h-px w-10 bg-sky/40" />}</li>)}</ol>
        </div>
      </div>
    </Chapter>,
    // 2 Academy
    <Chapter key="c2" n={2} title={chapters[1]} sub={fr ? "Un écosystème connecté d'éducation financière, pas un site de cours ordinaire." : "A connected financial learning ecosystem, not an ordinary course website."}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {([[BookOpen, "LMS", true], [PlayCircle, "Academy TV", true], [FlaskConical, fr ? "Laboratoire" : "Investment Lab", true], [Sparkles, "Ask Stoneshed AI", true], [Landmark, fr ? "Centre fonds" : "Funds center", true], [CalendarDays, fr ? "Événements" : "Events", true], [Building2, fr ? "Institutions" : "Institutions", true], [BarChart3, "Insights", true], [GraduationCap, fr ? "Certificats" : "Certificates", true], [ShieldCheck, fr ? "Gouvernance" : "Governance", true]] as const).map(([Icon, label, done]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4"><Icon className="h-6 w-6 text-sky" /><p className="mt-3 font-display font-bold">{label}</p><div className="mt-2"><Tag done={done} /></div></div>
        ))}
      </div>
      <p className="mt-6 text-sm text-white/60">{fr ? "Tout est bilingue (FR/EN), responsive, adossé à une base de données réelle avec authentification, rôles et journal d'audit." : "Everything is bilingual (EN/FR), responsive, backed by a real database with authentication, roles and an audit log."}</p>
    </Chapter>,
    // 3 Learner experience
    <Chapter key="c3" n={3} title={chapters[2]} sub={fr ? "Catalogue, Academy TV, quiz, tuteur IA et simulateurs — tous fonctionnels dans cette version." : "Catalog, Academy TV, quizzes, AI tutor and simulators, all functional in this build."}>
      <div className="grid gap-4 lg:grid-cols-3">
        {([[`/${locale}/learn/investing-101`, fr ? "Investissement 101" : "Investing 101", fr ? "7 modules, leçons réelles, quiz et évaluation finale, certificat vérifiable par QR." : "7 modules, real lessons, knowledge checks, final assessment, QR-verifiable certificate.", true], [`/${locale}/tv`, "Academy TV", fr ? "6 séries, 19 épisodes scénarisés en storyboard ; lecteur réel dès que les images sont approuvées." : "6 series, 19 scripted storyboard episodes; real player once footage is approved.", true], [`/${locale}/lab`, fr ? "Laboratoire" : "Investment Lab", fr ? "8 laboratoires avec vrais calculs : croissance, capitalisation/distribution, inflation, risque, allocation, FCP, obligations, objectifs." : "8 labs with real maths: growth, capitalisation vs distribution, inflation, risk, allocation, fund mechanics, bonds, goals.", true], [`/${locale}/ask`, "Ask Stoneshed AI", fr ? "Réponses ancrées dans 230+ sources approuvées avec citations ; modèle en direct dès qu'une clé est fournie." : "Answers grounded in 230+ approved sources with citations; live model once a key is provided.", true], [`/${locale}/dashboard`, fr ? "Tableau de bord" : "Dashboard", fr ? "Progression, reprise, badges, certificats, billets d'événements, notes." : "Progress, resume, badges, certificates, event tickets, notes.", true], [`/${locale}/funds/compare`, fr ? "Classic vs Gold" : "Classic vs Gold", fr ? "Comparatif animé fondé sur le registre de données approuvées." : "Animated comparison grounded in the approved data register.", true]] as const).map(([href, a, b, done]) => (
          <Link key={a} href={href} className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"><div className="flex items-start justify-between gap-2"><p className="font-display text-lg font-bold">{a}</p><Tag done={done} /></div><p className="mt-2 text-sm text-white/65">{b}</p><p className="mt-3 text-xs font-semibold text-sky">{fr ? "Ouvrir →" : "Open →"}</p></Link>
        ))}
      </div>
    </Chapter>,
    // 4 Institutional reach
    <Chapter key="c4" n={4} title={chapters[3]} sub={fr ? "Partenariats campus, masterclasses physiques et gestion de cohortes." : "Campus partnerships, physical masterclasses and cohort management."}>
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-3">
          {([[fr ? "Formulaire de partenariat et pipeline" : "Partnership inquiry form and pipeline", true], [fr ? "Événements : liste, calendrier, inscription, billet QR, accueil" : "Events: list, calendar, registration, QR ticket, check-in", true], [fr ? "Portail institutionnel : cohortes, progression, certificats" : "Institutional portal: cohorts, progress, certificates", true], [fr ? "Invitations d'apprenants et communications formateurs" : "Learner invitations and instructor messaging", false], [fr ? "Rappels e-mail / WhatsApp" : "Email / WhatsApp reminders", false], [fr ? "Portail formateur : devoirs et retours" : "Instructor portal: assignments and feedback", false]] as const).map(([a, done]) => <div key={a} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"><span className="text-[15px]">{a}</span><Tag done={done} /></div>)}
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="eyebrow-light mb-4">{fr ? "Programmes institutionnels" : "Institutional programs"}</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">{["Financial Literacy Foundations", "Investment 101", "Introduction to Capital Markets", "CEMAC Financial Markets", "Mutual Fund Masterclass", "Financial Management for Entrepreneurs", "Corporate Finance & Treasury", "Applied Investment Research"].map((p) => <li key={p} className="rounded-lg bg-white/5 px-3 py-2">{p}</li>)}</ul>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">{[[metrics.events, fr ? "événements (démo)" : "events (demo)"], [metrics.registrations, fr ? "inscriptions (démo)" : "registrations (demo)"], [metrics.partnerInquiries, fr ? "demandes (démo)" : "inquiries (demo)"]].map(([n, l]) => <div key={l as string}><p className="num font-display text-3xl font-extrabold text-sky">{n as number}</p><p className="text-[11px] text-white/50">{l as string}</p></div>)}</div>
        </div>
      </div>
    </Chapter>,
    // 5 Business model
    <Chapter key="c5" n={5} title={chapters[4]} sub={fr ? "L'éducation nourrit la notoriété, l'engagement éclairé, la visibilité institutionnelle et la relation de long terme." : "Education drives awareness, informed engagement, institutional visibility and longer-term relationships."}>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="eyebrow-light mb-3">{fr ? "Activité hebdomadaire (données de démonstration fictives)" : "Weekly activity (fictional demonstration data)"}</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weeks}><XAxis dataKey="week" tick={{ fontSize: 10, fill: "#9fb3cf" }} tickLine={false} axisLine={false} /><YAxis hide /><Tooltip content={Tip} /><Area type="monotone" dataKey="lessons" stroke="#58B8F5" fill="#58B8F5" fillOpacity={0.25} isAnimationActive={false} /><Area type="monotone" dataKey="registrations" stroke="#E0A526" fill="#E0A526" fillOpacity={0.2} isAnimationActive={false} /></AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-4 gap-2 text-center">{[[metrics.learners, fr ? "apprenants" : "learners"], [metrics.completions, fr ? "cours terminés" : "completions"], [metrics.fundPageViews, fr ? "vues pages fonds" : "fund page views"], [metrics.adviserInquiries, fr ? "demandes conseiller" : "adviser requests"]].map(([n, l]) => <div key={l as string}><p className="num font-display text-2xl font-extrabold">{n as number}</p><p className="text-[10px] text-white/50">{l as string}</p></div>)}</div>
        </div>
        <ol className="space-y-3">{(fr ? [["Notoriété", "L'Academy est la porte d'entrée gratuite vers la marque Stoneshed."], ["Engagement éclairé", "Des investisseurs qui comprennent les FCP posent de meilleures questions et restent plus longtemps."], ["Visibilité institutionnelle", "Universités, écoles et employeurs deviennent des partenaires de distribution de connaissances."], ["Relation de long terme", "Seules les demandes volontaires et consenties sont transmises aux conseillers — jamais la simple navigation."]] : [["Awareness", "The Academy is the free front door to the Stoneshed brand."], ["Informed engagement", "Investors who understand mutual funds ask better questions and stay longer."], ["Institutional visibility", "Universities, schools and employers become knowledge-distribution partners."], ["Long-term relationships", "Only voluntary, consented requests reach advisers — never mere browsing."]]).map(([a, b], k) => <li key={a} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"><span className="num font-display text-2xl font-extrabold text-sky">0{k + 1}</span><div><p className="font-display font-bold">{a}</p><p className="text-sm text-white/65">{b}</p></div></li>)}</ol>
      </div>
    </Chapter>,
    // 6 Roadmap
    <Chapter key="c6" n={6} title={chapters[5]} sub={fr ? "Déploiement en trois phases, approbations requises, mesures de succès et prochaines étapes." : "Phased rollout, required approvals, success measures and next steps."}>
      <div className="grid gap-4 lg:grid-cols-3">
        {([[fr ? "Phase 1 — MVP prêt pour la direction" : "Phase 1 — CEO-ready MVP", true, fr ? ["Site premium bilingue", "Inscription, connexion, parcours", "Catalogue + 6 cours avec leçons", "Lecteur de leçon + progression + certificats", "Academy TV (storyboards)", "8 simulateurs", "Centre fonds Classic / Gold", "Événements + billets QR + accueil", "Formulaire institutionnel + portail", "Tableau de bord + administration", "Mode présentation"] : ["Premium bilingual site", "Registration, login, pathways", "Catalog + 6 courses with lessons", "Lesson player + progress + certificates", "Academy TV (storyboards)", "8 simulators", "Classic / Gold funds center", "Events + QR tickets + check-in", "Institutional form + portal", "Dashboard + admin", "Presentation mode"]], [fr ? "Phase 2 — Plateforme intelligente" : "Phase 2 — Intelligent platform", false, fr ? ["Clé IA en production + RAG vectoriel", "Vidéos produites (tournage / génération approuvée)", "E-mail / WhatsApp connectés", "Intégration CRM des demandes consenties", "Upload sécurisé des documents fonds", "Cohortes complètes et portail formateur", "Analyses étendues"] : ["Production AI key + vector RAG", "Produced videos (filmed / approved generation)", "Email / WhatsApp connected", "CRM integration for consented leads", "Secure fund document uploads", "Full cohort and instructor portals", "Expanded analytics"]], [fr ? "Phase 3 — Écosystème régional" : "Phase 3 — Regional ecosystem", false, fr ? ["Partenariats multi-institutions", "Programmes professionnels avancés", "Packs de formation entreprise", "Parcours personnalisés", "Contenus régionaux CEMAC élargis", "Exploitation régionale à l'échelle"] : ["Multi-institution partnerships", "Advanced professional programs", "Corporate learning packages", "Personalised pathways", "Expanded CEMAC regional content", "Scalable regional operations"]]] as const).map(([title, done, items]) => (
          <div key={title} className={cn("rounded-3xl border p-5", done ? "border-sky/40 bg-sky/10" : "border-white/10 bg-white/5")}><div className="flex items-start justify-between gap-2"><p className="font-display text-lg font-bold">{title}</p><Tag done={done} /></div><ul className="mt-4 space-y-1.5 text-sm text-white/75">{items.map((x) => <li key={x} className="flex gap-2"><span className="text-sky">•</span>{x}</li>)}</ul></div>
        ))}
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-amber/40 bg-amber/10 p-4 text-sm"><p className="font-bold text-amber">{fr ? "Approbations requises" : "Required approvals"}</p><p className="mt-1 text-white/75">{fr ? "Rapprochement du registre de données avec la brochure et les documents d'information ; validation conformité des épisodes produits et des scripts ; nom de domaine academy.stoneshed-am.com ; logo officiel ; remplacement des formateurs fictifs." : "Reconcile the data register with the brochure and information documents; compliance sign-off on product episodes and scripts; academy.stoneshed-am.com domain; official logo; replace placeholder instructors."}</p></div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm"><p className="font-bold text-sky">{fr ? "Mesures de succès" : "Success measures"}</p><p className="mt-1 text-white/75">{fr ? "Apprenants actifs, taux de complétion, progression aux évaluations, engagement Academy TV, participation institutionnelle, présence aux événements, demandes de conseil volontaires et qualifiées." : "Active learners, completion rate, assessment improvement, Academy TV engagement, institutional participation, event attendance, qualified voluntary adviser requests."}</p></div>
      </div>
    </Chapter>,
  ];

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-midnight text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(18,101,200,0.35),_transparent_55%)]" />
      <div className="grid-fade absolute inset-0 opacity-40" />
      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <Logo light compact />
        <div className="flex items-center gap-1">{Array.from({ length: total }, (_, k) => <button key={k} onClick={() => setI(k)} className={cn("h-1.5 rounded-full transition-all", k === i ? "w-8 bg-sky" : "w-3 bg-white/25 hover:bg-white/50")} aria-label={`${k}`} />)}</div>
        <Link href={`/${locale}/dashboard`} className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold hover:bg-white/10"><X className="h-3.5 w-3.5" />{t.vision.exit}</Link>
      </header>
      <main className="relative z-10 flex-1 overflow-y-auto px-6 py-6 sm:px-12 thin-scroll">
        <AnimatePresence mode="wait">
          <motion.div key={i} className="mx-auto h-full max-w-6xl" initial={{ opacity: 0, x: 40, filter: "blur(6px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -40, filter: "blur(6px)" }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>{slides[i]}</motion.div>
        </AnimatePresence>
      </main>
      <footer className="relative z-10 flex items-center justify-between px-6 py-4 text-xs text-white/50">
        <span>{i === 0 ? t.vision.title : `${i}/${chapters.length} · ${chapters[i - 1]}`}</span>
        <div className="flex gap-2"><button onClick={prev} disabled={i === 0} className="rounded-full border border-white/20 p-2 hover:bg-white/10 disabled:opacity-30" aria-label={t.common.previous}><ArrowLeft className="h-4 w-4" /></button><button onClick={next} disabled={i === total - 1} className="rounded-full bg-sky p-2 text-midnight hover:bg-white disabled:opacity-30" aria-label={t.common.next}><ArrowRight className="h-4 w-4" /></button></div>
        <span><Users className="mr-1 inline h-3.5 w-3.5" />{fr ? "Données de démonstration fictives" : "Fictional demonstration data"}</span>
      </footer>
    </div>
  );
}

function Chapter({ n, title, sub, children }: { n: number; title: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <p className="eyebrow-light mb-2">{`Chapter ${n}`}</p>
      <h2 className="display-lg text-white">{title}</h2>
      <p className="mt-3 max-w-3xl text-base text-white/65 sm:text-lg">{sub}</p>
      <div className="mt-8 flex-1">{children}</div>
    </div>
  );
}
