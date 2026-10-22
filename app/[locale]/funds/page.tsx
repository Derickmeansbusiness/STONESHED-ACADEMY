import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitCompare } from "lucide-react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { listFunds } from "@/lib/services/content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { CoverArt } from "@/components/ui/cover-art";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { FundFlowDiagram } from "@/components/funds/fund-flow-diagram";

export const metadata: Metadata = { title: "Stoneshed Funds" };

export default async function FundsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const funds = await listFunds();
  return (
    <div className="pt-28 pb-12">
      <Container>
        <Reveal><SectionHeading eyebrow={t.nav.funds} title={t.funds.title} sub={t.funds.sub} size="lg" /></Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {funds.map((f) => {
            const approved = f.current?.fields.filter((x) => x.status === "approved") ?? [];
            const get = (k: string) => approved.find((x) => x.key === k);
            return (
              <Reveal key={f.id}>
                <div className="relative overflow-hidden rounded-3xl border border-mist/70 bg-white shadow-[var(--shadow-soft)]">
                  <div className="relative aspect-[2.6/1]"><CoverArt seed={f.slug} theme={f.theme} pattern={f.fundType === "capitalization" ? "curve" : "bars"} /><div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-midnight/90 to-transparent p-6 text-white"><Badge tone="white">{f.fundType === "capitalization" ? t.funds.classicOrientation : t.funds.goldOrientation}</Badge><h2 className="mt-3 font-display text-2xl font-extrabold">{f.officialName}</h2><p className="text-xs text-white/70">{f.cosumafFundRef} · Visa {f.cosumafVisaRef}</p></div></div>
                  <dl className="grid grid-cols-2 gap-4 p-6 text-sm">
                    {["fund_type", "classification", "min_subscription", "horizon"].map((k) => { const x = get(k); return x ? <div key={k}><dt className="text-[11px] uppercase tracking-wider text-steel">{locale === "fr" ? x.labelFr : x.labelEn}</dt><dd className="mt-0.5 font-medium text-ink">{locale === "fr" ? x.valueFr : x.valueEn}</dd></div> : null; })}
                  </dl>
                  <div className="flex flex-wrap gap-2 border-t border-mist/60 px-6 py-4">
                    <Button href={`/${locale}/funds/${f.slug}`} size="sm">{t.funds.understand} <ArrowRight className="h-4 w-4" /></Button>
                    <Button href={`/${locale}/funds/${f.slug}#adviser`} size="sm" variant="outline">{t.funds.speak}</Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-6"><Link href={`/${locale}/funds/compare`} className="flex items-center justify-between rounded-3xl bg-royal p-6 text-white transition hover:bg-finance sm:p-8"><div><p className="eyebrow-light mb-1">{t.funds.compare}</p><p className="font-display text-xl font-bold sm:text-2xl">{t.home.fundsTitle}</p></div><GitCompare className="h-8 w-8 text-sky" /></Link></Reveal>
        <section className="mt-20"><SectionHeading eyebrow={t.home.howEyebrow} title={locale === "fr" ? "Le circuit d'un FCP, de la souscription à la valorisation." : "The path of an FCP, from subscription to valuation."} /><div className="mt-10"><FundFlowDiagram /></div></section>
        <div className="mt-12 space-y-3"><Notice tone="warning">{t.funds.notGold}</Notice><Notice tone="compliance">{t.funds.subscribeNotice}</Notice></div>
      </Container>
    </div>
  );
}
