"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/client";
import { formatFcfa } from "@/lib/i18n";
import { RISK_TYPES } from "@/lib/lab/calc";
import { LabShell, ResultCard } from "./lab-shell";
import { Slider, Stat } from "@/components/home/lab-preview";
import { cn } from "@/lib/utils";

export function RiskLab({ title, intro }: { title: string; intro: string }) {
  const { locale, t } = useLocale();
  const [amount, setAmount] = useState(1_000_000);
  const [active, setActive] = useState<string>("market");
  const [intensity, setIntensity] = useState(1);
  const risk = RISK_TYPES.find((r) => r.key === active)!;
  const impactPct = risk.impact * intensity;
  const after = amount * (1 + impactPct / 100);
  return (
    <LabShell slug="risk" title={title} intro={intro} onReset={() => { setAmount(1_000_000); setActive("market"); setIntensity(1); }} inputs={
      <>
        <Slider label={locale === "fr" ? "Montant investi (hypothétique)" : "Amount invested (hypothetical)"} value={amount} min={10000} max={50_000_000} step={10000} onChange={setAmount} fmt={(v) => formatFcfa(v, locale)} />
        <Slider label={locale === "fr" ? "Intensité du scénario" : "Scenario intensity"} value={intensity} min={0.5} max={2} step={0.25} onChange={setIntensity} fmt={(v) => `×${v}`} />
        <div className="space-y-1.5">
          {RISK_TYPES.map((r) => <button key={r.key} onClick={() => setActive(r.key)} className={cn("w-full rounded-xl border px-3 py-2.5 text-left text-sm font-semibold transition", active === r.key ? "border-royal bg-royal text-white" : "border-mist text-slate hover:border-finance")}>{locale === "fr" ? r.labelFr : r.labelEn}</button>)}
        </div>
      </>
    }>
      <ResultCard>
        <p className="eyebrow mb-2">{locale === "fr" ? risk.labelFr : risk.labelEn}</p>
        <p className="text-[16px] leading-relaxed text-slate">{locale === "fr" ? risk.fr : risk.en}</p>
        <div className="mt-6 rounded-2xl bg-cloud/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-steel">{locale === "fr" ? "Scénario" : "Scenario"}</p>
          <p className="mt-1 text-[15px] text-ink">{locale === "fr" ? risk.scenarioFr : risk.scenarioEn}</p>
        </div>
      </ResultCard>
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label={locale === "fr" ? "Avant le choc" : "Before the shock"} value={formatFcfa(amount, locale, { compact: true })} />
        <Stat label={locale === "fr" ? "Impact illustratif" : "Illustrative impact"} value={`${impactPct > 0 ? "+" : ""}${impactPct.toFixed(1)} %`} />
        <Stat label={locale === "fr" ? "Après le choc" : "After the shock"} value={formatFcfa(after, locale, { compact: true })} accent />
      </div>
      <ResultCard title={locale === "fr" ? "Visualisation" : "Visualisation"}>
        <div className="flex h-56 items-end gap-8 px-4">
          {[amount, after].map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <motion.div className={cn("w-full rounded-t-2xl", i === 0 ? "bg-finance" : impactPct < 0 ? "bg-danger" : "bg-success")} initial={false} animate={{ height: `${(v / Math.max(amount, after)) * 100}%` }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
              <span className="text-xs font-semibold text-steel">{i === 0 ? (locale === "fr" ? "Avant" : "Before") : locale === "fr" ? "Après" : "After"}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-steel">{locale === "fr" ? "Les pourcentages d'impact sont des ordres de grandeur pédagogiques, pas des mesures de risque d'un produit réel." : "Impact percentages are educational orders of magnitude, not risk measures of any real product."}</p>
      </ResultCard>
    </LabShell>
  );
}
