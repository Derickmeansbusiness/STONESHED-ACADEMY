import { notFound } from "next/navigation";
import Link from "next/link";
import { FileText, Lock, AlertTriangle, ArrowRight, GitCompare, PlayCircle } from "lucide-react";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getFund, listFlags } from "@/lib/services/content";
import { getSession, isStaff } from "@/lib/auth/session";
import { track } from "@/lib/services/audit";
import { FUND_FAQ, FUND_RISKS } from "@/lib/content/funds";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { CoverArt } from "@/components/ui/cover-art";
import { AdviserForm } from "@/components/funds/adviser-form";
import { Faq } from "@/components/ui/faq";

export default async function FundPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const t = getDictionary(locale);
  const [fund, user] = await Promise.all([getFund(slug), getSession()]);
  if (!fund || !fund.current) notFound();
  const staff = isStaff(user?.role);
  await track({ userId: user?.id, eventName: "fund_page_view", locale, path: `/${locale}/funds/${slug}`, properties: { fund: slug } });
  const flags = staff ? await listFlags(fund.id) : [];
  const fields = fund.current.fields.filter((f) => f.status === "approved" || staff);
  const L = (f: { labelEn: string; labelFr: string }) => (locale === "fr" ? f.labelFr : f.labelEn);
  const V = (f: { valueEn: string; valueFr: string }) => (locale === "fr" ? f.valueFr : f.valueEn);
  const groups = [
    { key: "identity", title: locale === "fr" ? "Identité du fonds" : "Fund identity", keys: ["fund_type", "income_treatment", "name_note", "manager", "classification"] },
    { key: "investing", title: locale === "fr" ? "Investir" : "Investing", keys: ["min_subscription", "horizon", "objective", "strategy", "subscription_process", "redemption_terms"] },
    { key: "costs", title: locale === "fr" ? "Frais et valorisation" : "Fees and valuation", keys: ["subscription_fee", "redemption_fee", "management_fee", "nav_frequency", "target_yield"] },
    { key: "oversight", title: locale === "fr" ? "Contrôle" : "Oversight", keys: ["depositary", "auditor"] },
  ];
  const other = fund.slug === "stoneshed-classic" ? "stoneshed-gold" : "stoneshed-classic";

  return (
    <div className="pb-12">
      <section className="relative overflow-hidden bg-midnight pt-32 pb-14 text-white">
        <div className="absolute inset-0 opacity-40"><CoverArt seed={fund.slug} theme={fund.theme} pattern={fund.fundType === "capitalization" ? "curve" : "bars"} /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/85 to-transparent" />
        <Container className="relative">
          <Link href={`/${locale}/funds`} className="text-sm text-white/60 hover:text-white">← {t.nav.funds}</Link>
          <div className="mt-4 flex flex-wrap gap-2"><Badge tone="white">{fund.fundType === "capitalization" ? t.funds.classicOrientation : t.funds.goldOrientation}</Badge><Badge tone="white">{fund.cosumafFundRef}</Badge><Badge tone="white">Visa {fund.cosumafVisaRef}</Badge></div>
          <h1 className="display-lg mt-4 text-white">{fund.officialName}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/75">{fund.fundType === "capitalization" ? (locale === "fr" ? "Un fonds commun de placement de capitalisation, orienté obligations et autres titres de créance, qui réinvestit les revenus qu'il perçoit." : "A capitalisation mutual fund, oriented to bonds and other debt securities, that reinvests the income it earns.") : locale === "fr" ? "Un fonds commun de placement de distribution, orienté obligations et autres titres de créance, qui verse ses revenus chaque année." : "A distribution mutual fund, oriented to bonds and other debt securities, that pays out its income each year."}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#data" variant="light">{t.funds.understand}</Button>
            <Button href="#docs" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">{t.funds.download}</Button>
            <Button href="#adviser" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10">{t.funds.speak}</Button>
            <Button href={`/${locale}/funds/compare`} variant="ghost" className="text-sky hover:bg-white/10"><GitCompare className="h-4 w-4" />{t.funds.compare}</Button>
          </div>
        </Container>
      </section>

      <Container className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-12">
          {fund.slug === "stoneshed-gold" && <Notice tone="warning">{t.funds.notGold}</Notice>}
          <Notice tone="compliance">{t.funds.dataNotice}</Notice>
          <section id="data" className="scroll-mt-28 space-y-8">
            {groups.map((g) => {
              const rows = g.keys.map((k) => fields.find((f) => f.key === k)).filter(Boolean) as typeof fields;
              if (!rows.length) return null;
              return (
                <div key={g.key} className="overflow-hidden rounded-2xl border border-mist/70 bg-white">
                  <h2 className="border-b border-mist/60 bg-cloud/50 px-5 py-3 font-display font-bold text-ink">{g.title}</h2>
                  <dl>
                    {rows.map((f) => (
                      <div key={f.key} className="grid gap-1 border-b border-mist/40 px-5 py-4 last:border-0 sm:grid-cols-[220px_1fr]">
                        <dt className="text-sm font-semibold text-slate">{L(f)}</dt>
                        <dd className="text-sm text-ink">
                          <p>{V(f)}</p>
                          <p className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-steel"><span>{t.funds.source}: {f.source}</span>{f.status === "approved" ? <Badge tone="green">{t.funds.approved}</Badge> : f.status === "pending_verification" ? <Badge tone="amber">{t.funds.pending}</Badge> : <Badge tone="gray">{t.funds.notSupplied}</Badge>}</p>
                          {f.note && staff && <p className="mt-1 text-[11px] text-[#8a5d05]">{f.note}</p>}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              );
            })}
            <Notice tone="info">{t.funds.targetYield}</Notice>
          </section>
          <section>
            <h2 className="display-sm text-ink">{t.funds.risks}</h2>
            <ul className="mt-5 space-y-2">{FUND_RISKS.filter((r) => r.key !== "distribution" || fund.fundType === "distribution").map((r) => <li key={r.key} className="flex gap-3 rounded-xl border border-mist/70 bg-white p-4 text-sm text-slate"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber" />{locale === "fr" ? r.fr : r.en}</li>)}</ul>
          </section>
          <section>
            <h2 className="display-sm text-ink">{t.funds.howToSubscribe}</h2>
            <ol className="mt-5 space-y-3">
              {(locale === "fr" ? ["Lisez le document d'information et le règlement de gestion du fonds.", "Contactez Stoneshed Asset Management via le processus de souscription approuvé.", "Complétez les formalités d'identification requises par la réglementation.", "Versez votre souscription selon la procédure indiquée par la société de gestion et son dépositaire (Ecobank Cameroun).", "Recevez la confirmation de vos parts à la valeur liquidative applicable."] : ["Read the fund's information document and management regulations.", "Contact Stoneshed Asset Management through the approved subscription process.", "Complete the identification formalities required by regulation.", "Pay your subscription following the procedure set by the management company and its depositary (Ecobank Cameroon).", "Receive confirmation of your units at the applicable NAV."]).map((x, i) => <li key={i} className="flex gap-4 rounded-xl bg-white p-4 text-sm text-slate shadow-[var(--shadow-soft)]"><span className="num font-display font-extrabold text-finance">0{i + 1}</span>{x}</li>)}
            </ol>
            <Notice tone="compliance" className="mt-4">{t.funds.subscribeNotice}</Notice>
          </section>
          <section><h2 className="display-sm text-ink">{t.funds.faq}</h2><div className="mt-5"><Faq items={FUND_FAQ.map((q) => ({ q: q.q[locale], a: q.a[locale] }))} /></div></section>
          {staff && flags.length > 0 && (
            <section className="rounded-2xl border border-amber/40 bg-amber/5 p-6">
              <p className="eyebrow mb-2 text-[#8a5d05]">{t.admin.flags} · {locale === "fr" ? "visible par les réviseurs uniquement" : "visible to reviewers only"}</p>
              <ul className="space-y-2 text-sm">{flags.map((f) => <li key={f.id} className="flex gap-2"><Badge tone={f.severity === "high" ? "red" : "amber"}>{f.severity}</Badge><span>{f.description}</span></li>)}</ul>
              <Link href={`/${locale}/admin/funds`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-finance">{t.admin.fundData} <ArrowRight className="h-4 w-4" /></Link>
            </section>
          )}
        </div>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div id="docs" className="surface scroll-mt-28 p-6">
            <p className="eyebrow mb-3">{t.funds.docs}</p>
            <ul className="space-y-2">
              {fund.documents.map((d) => (
                <li key={d.id} className="flex items-start gap-3 rounded-xl border border-mist p-3 text-sm">
                  {d.fileUrl ? <FileText className="mt-0.5 h-4 w-4 text-finance" /> : <Lock className="mt-0.5 h-4 w-4 text-steel" />}
                  <div><p className="font-medium text-ink">{locale === "fr" ? d.titleFr : d.titleEn}</p>{d.fileUrl ? <a href={d.fileUrl} className="text-xs text-finance underline">{t.funds.download}</a> : <p className="text-xs text-steel">{t.funds.awaitingUpload}</p>}</div>
                </li>
              ))}
            </ul>
          </div>
          <Link href={`/${locale}/tv/understanding-stoneshed-classic-and-gold`} className="surface flex items-center gap-3 p-5 text-sm hover:border-finance"><PlayCircle className="h-5 w-5 text-finance" /><span><span className="block font-semibold text-ink">{locale === "fr" ? "Épisode : Comprendre Classic et Gold" : "Episode: Understanding Classic and Gold"}</span><span className="text-xs text-steel">{t.tv.productSpecific}</span></span></Link>
          <Link href={`/${locale}/funds/${other}`} className="surface flex items-center justify-between p-5 text-sm font-semibold text-royal hover:border-finance">{locale === "fr" ? "Voir l'autre fonds" : "See the other fund"} <ArrowRight className="h-4 w-4" /></Link>
        </aside>
      </Container>

      <Container size="md" className="mt-20">
        <div className="surface p-6 sm:p-10">
          <p className="eyebrow mb-2">{t.funds.speak}</p>
          <h2 className="display-sm text-ink">{t.funds.adviserTitle}</h2>
          <p className="mt-2 mb-6 text-sm text-steel">{t.funds.adviserSub}</p>
          <AdviserForm fundSlug={fund.slug} defaultTopic={`${fund.officialName}`} user={user ? { fullName: user.fullName, email: user.email } : null} />
        </div>
      </Container>
    </div>
  );
}
