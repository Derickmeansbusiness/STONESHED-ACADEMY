"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Users, PiggyBank, UserCog, Landmark, Scale, FileCheck2, Coins } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";
import { formatFcfa } from "@/lib/i18n";
import { LabShell, ResultCard } from "./lab-shell";
import { Slider, Stat } from "@/components/home/lab-preview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STEPS = [
  { icon: Users, en: ["Individual investors", "Many people each subscribe with an amount they can afford. In exchange, each receives units of the fund at the NAV of the day."], fr: ["Les investisseurs", "De nombreuses personnes souscrivent chacune avec un montant à leur portée. En échange, chacune reçoit des parts du fonds à la valeur liquidative du jour."] },
  { icon: PiggyBank, en: ["The pooled fund", "All subscriptions form one portfolio: the FCP. It has no legal personality of its own; it is a co-ownership of securities governed by its management regulations."], fr: ["Le fonds commun", "Toutes les souscriptions forment un seul portefeuille : le FCP. Il n'a pas de personnalité juridique propre ; c'est une copropriété de valeurs mobilières régie par son règlement de gestion."] },
  { icon: UserCog, en: ["The fund manager", "A COSUMAF-licensed management company decides what to buy and sell within the rules of the fund. It is paid a management fee, taken from the fund's assets."], fr: ["Le gérant", "Une société de gestion agréée par la COSUMAF décide des achats et des ventes dans le cadre des règles du fonds. Elle perçoit des frais de gestion, prélevés sur les actifs du fonds."] },
  { icon: Landmark, en: ["The investments", "For a bond-oriented fund: Treasury bills and bonds of CEMAC states, other debt securities and deposits. These pay interest (coupons) over time and can be worth more or less than their purchase price."], fr: ["Les investissements", "Pour un fonds orienté obligations : bons et obligations du Trésor des États de la CEMAC, autres titres de créance et dépôts. Ils versent des intérêts (coupons) dans le temps et peuvent valoir plus ou moins que leur prix d'achat."] },
  { icon: Scale, en: ["Depositary & auditor", "The depositary (a bank) safekeeps the assets and checks that the manager's instructions respect the rules. The statutory auditor certifies the accounts."], fr: ["Dépositaire & commissaire aux comptes", "Le dépositaire (une banque) conserve les actifs et vérifie que les instructions du gérant respectent les règles. Le commissaire aux comptes certifie les comptes."] },
  { icon: FileCheck2, en: ["The regulator", "COSUMAF licenses the management company, approves the fund's documentation, and supervises the whole chain."], fr: ["Le régulateur", "La COSUMAF agrée la société de gestion, approuve la documentation du fonds et supervise l'ensemble de la chaîne."] },
  { icon: Coins, en: ["Valuation and results", "Assets are valued, costs deducted, and the total divided by the number of units: that is the NAV. Gains or losses show up in the NAV. A capitalisation fund keeps income inside; a distribution fund pays it out."], fr: ["Valorisation et résultats", "Les actifs sont valorisés, les frais déduits, et le total divisé par le nombre de parts : c'est la valeur liquidative. Gains et pertes s'y reflètent. Un fonds de capitalisation conserve les revenus ; un fonds de distribution les verse."] },
];

export function FundMechanicsLab({ title, intro }: { title: string; intro: string }) {
  const { locale, t } = useLocale();
  const [step, setStep] = useState(0);
  const [investors, setInvestors] = useState(500);
  const [avg, setAvg] = useState(50000);
  const [nav0] = useState(10000);
  const [change, setChange] = useState(2);
  const [fee, setFee] = useState(1.5);
  const pooled = investors * avg;
  const units = pooled / nav0;
  const gross = pooled * (1 + change / 100);
  const net = gross - pooled * (fee / 100);
  const nav1 = net / units;
  const s = STEPS[step];
  const Icon = s.icon;
  const text = locale === "fr" ? s.fr : s.en;
  const diagram = useMemo(() => STEPS.map((x, i) => ({ i, Icon: x.icon, label: (locale === "fr" ? x.fr : x.en)[0] })), [locale]);
  return (
    <LabShell slug="fund-mechanics" title={title} intro={intro} inputs={
      <>
        <Slider label={locale === "fr" ? "Nombre d'investisseurs" : "Number of investors"} value={investors} min={10} max={20000} step={10} onChange={setInvestors} fmt={(v) => v.toLocaleString()} />
        <Slider label={locale === "fr" ? "Souscription moyenne" : "Average subscription"} value={avg} min={10000} max={5_000_000} step={10000} onChange={setAvg} fmt={(v) => formatFcfa(v, locale)} />
        <Slider label={locale === "fr" ? "Variation hypothétique des actifs sur la période" : "Hypothetical change in asset value over the period"} value={change} min={-10} max={10} step={0.5} onChange={setChange} fmt={(v) => `${v > 0 ? "+" : ""}${v} %`} />
        <Slider label={locale === "fr" ? "Frais prélevés (illustratif)" : "Fees charged (illustrative)"} value={fee} min={0} max={4} step={0.1} onChange={setFee} fmt={(v) => `${v.toFixed(1)} %`} />
        <p className="text-xs text-steel">{locale === "fr" ? "Valeur liquidative initiale fixée à 10 000 FCFA par part pour l'exemple." : "Initial NAV set at 10,000 FCFA per unit for the example."}</p>
      </>
    }>
      <ResultCard>
        <div className="flex flex-wrap items-center justify-between gap-2">
          {diagram.map(({ i, Icon: I, label }) => (
            <button key={i} onClick={() => setStep(i)} className={cn("flex flex-col items-center gap-1.5 rounded-xl px-2 py-2 text-[10px] font-semibold transition sm:text-[11px]", i === step ? "bg-royal text-white" : i < step ? "text-finance" : "text-steel hover:bg-cloud")} aria-current={i === step}>
              <I className="h-5 w-5" /><span className="max-w-[80px] text-center leading-tight">{label}</span>
            </button>
          ))}
        </div>
        <div className="my-4 h-1 w-full rounded-full bg-mist"><motion.div className="h-full rounded-full bg-finance" animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }} /></div>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="flex gap-5 rounded-2xl bg-cloud/60 p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-royal text-white"><Icon className="h-6 w-6" /></span>
            <div><p className="eyebrow mb-1">{locale === "fr" ? "Étape" : "Step"} {step + 1} / {STEPS.length}</p><h3 className="font-display text-xl font-bold text-ink">{text[0]}</h3><p className="mt-2 text-[15px] leading-relaxed text-slate">{text[1]}</p></div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-4 flex justify-between"><Button variant="outline" size="sm" onClick={() => setStep((v) => Math.max(0, v - 1))} disabled={step === 0}><ChevronLeft className="h-4 w-4" />{t.common.previous}</Button><Button size="sm" onClick={() => setStep((v) => Math.min(STEPS.length - 1, v + 1))} disabled={step === STEPS.length - 1}>{t.common.next}<ChevronRight className="h-4 w-4" /></Button></div>
      </ResultCard>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label={locale === "fr" ? "Actifs mis en commun" : "Pooled assets"} value={formatFcfa(pooled, locale, { compact: true })} />
        <Stat label={locale === "fr" ? "Parts émises" : "Units issued"} value={Math.round(units).toLocaleString()} />
        <Stat label={locale === "fr" ? "Actif net après frais" : "Net assets after fees"} value={formatFcfa(net, locale, { compact: true })} />
        <Stat label={locale === "fr" ? "Nouvelle valeur liquidative" : "New NAV per unit"} value={formatFcfa(nav1, locale)} accent sub={`${nav1 >= nav0 ? "+" : ""}${(((nav1 - nav0) / nav0) * 100).toFixed(2)} %`} />
      </div>
    </LabShell>
  );
}
