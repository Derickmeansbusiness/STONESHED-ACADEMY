import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, type Locale } from "@/lib/i18n";
import { listFunds } from "@/lib/services/content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Notice } from "@/components/ui/notice";
import { Button } from "@/components/ui/button";
import { CompareAnimation } from "@/components/funds/compare-animation";

export const metadata: Metadata = { title: "Compare the funds" };

export default async function ComparePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const funds = await listFunds();
  const [classic, gold] = [funds.find((f) => f.slug === "stoneshed-classic")!, funds.find((f) => f.slug === "stoneshed-gold")!];
  const keys = ["fund_type", "income_treatment", "classification", "min_subscription", "horizon", "depositary", "auditor", "manager", "target_yield"];
  const get = (f: typeof classic, k: string) => f.current?.fields.find((x) => x.key === k && x.status === "approved");
  return (
    <div className="pt-28 pb-12">
      <Container>
        <SectionHeading eyebrow={t.funds.compare} title={t.home.fundsTitle} sub={locale === "fr" ? "Même portefeuille orienté obligations, même société de gestion, même dépositaire : la différence tient à ce que le fonds fait de ses revenus." : "Same bond-oriented portfolio, same management company, same depositary: the difference is what the fund does with its income."} size="lg" />
        <div className="mt-12"><CompareAnimation /></div>
        <div className="mt-12 overflow-hidden rounded-3xl border border-mist/70 bg-white">
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-mist/60 bg-cloud/50 text-sm font-bold text-ink"><div className="p-4" /><div className="p-4"><Badge tone="blue">{t.funds.classicOrientation}</Badge><p className="mt-2">{classic.officialName}</p></div><div className="p-4"><Badge tone="dark">{t.funds.goldOrientation}</Badge><p className="mt-2">{gold.officialName}</p></div></div>
          {keys.map((k) => { const a = get(classic, k), b = get(gold, k); if (!a && !b) return null; return (
            <div key={k} className="grid grid-cols-[1fr_1fr_1fr] border-b border-mist/40 text-sm last:border-0"><div className="p-4 font-semibold text-slate">{locale === "fr" ? (a ?? b)!.labelFr : (a ?? b)!.labelEn}</div><div className="p-4 text-ink">{a ? (locale === "fr" ? a.valueFr : a.valueEn) : "—"}</div><div className="p-4 text-ink">{b ? (locale === "fr" ? b.valueFr : b.valueEn) : "—"}</div></div>
          ); })}
        </div>
        <div className="mt-6 space-y-3"><Notice tone="info">{t.funds.targetYield}</Notice><Notice tone="warning">{t.funds.notGold}</Notice><Notice tone="compliance">{locale === "fr" ? "Ce comparatif est pédagogique. Le choix entre capitalisation et distribution dépend de votre situation ; l'Academy ne formule pas de recommandation personnalisée." : "This comparison is educational. Choosing between capitalisation and distribution depends on your situation; the Academy does not make personal recommendations."}</Notice></div>
        <div className="mt-8 flex flex-wrap gap-3"><Button href={`/${locale}/lab/cap-vs-dist`}>{t.lab.open}: {locale === "fr" ? "Capitalisation ou distribution" : "Compounding vs distribution"}</Button><Button href={`/${locale}/tv/capitalisation-vs-distribution-in-60-seconds`} variant="outline">{t.tv.watch}: 60s</Button><Link href={`/${locale}/learn/capitalization-versus-distribution-funds`} className="inline-flex items-center text-sm font-semibold text-finance hover:underline">{t.learn.title} →</Link></div>
      </Container>
    </div>
  );
}
