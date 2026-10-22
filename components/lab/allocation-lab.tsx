"use client";
import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useLocale } from "@/lib/i18n/client";
import { ASSET_CLASSES, portfolioStats, scenarioShock } from "@/lib/lab/calc";
import { LabShell, ResultCard } from "./lab-shell";
import { Slider, Stat } from "@/components/home/lab-preview";
import { makeTooltip } from "@/components/charts/tooltip";
import { Notice } from "@/components/ui/notice";
import { cn } from "@/lib/utils";

const DEF: Record<string, number> = { cash: 20, tbills: 20, bonds: 40, equity: 10, property: 10, business: 0 };
const SCENARIOS = ["rates_up", "equity_crash", "liquidity_squeeze", "inflation_spike"] as const;

export function AllocationLab({ title, intro }: { title: string; intro: string }) {
  const { locale, t } = useLocale();
  const [w, setW] = useState(DEF);
  const [scenario, setScenario] = useState<(typeof SCENARIOS)[number]>("rates_up");
  const total = Object.values(w).reduce((a, b) => a + b, 0);
  const stats = useMemo(() => portfolioStats(w), [w]);
  const shock = useMemo(() => scenarioShock(w, scenario), [w, scenario]);
  const pie = ASSET_CLASSES.map((a) => ({ name: locale === "fr" ? a.labelFr : a.labelEn, value: w[a.key] ?? 0, color: a.color })).filter((x) => x.value > 0);
  const Tip = useMemo(() => makeTooltip({ format: (v) => `${Math.round((v / Math.max(1, total)) * 100)} %` }), [total]);
  const scenarioLabel: Record<string, { en: string; fr: string }> = { rates_up: { en: "Interest rates rise", fr: "Hausse des taux" }, equity_crash: { en: "Equity market fall", fr: "Chute des actions" }, liquidity_squeeze: { en: "Liquidity squeeze", fr: "Crise de liquidité" }, inflation_spike: { en: "Inflation spike", fr: "Poussée d'inflation" } };
  const concentrationLabel = stats.concentration > 0.5 ? (locale === "fr" ? "Très concentré" : "Highly concentrated") : stats.concentration > 0.3 ? (locale === "fr" ? "Concentré" : "Concentrated") : locale === "fr" ? "Diversifié" : "Diversified";
  return (
    <LabShell slug="allocation" title={title} intro={intro} onReset={() => setW(DEF)} inputs={
      <>
        {ASSET_CLASSES.map((a) => <Slider key={a.key} label={locale === "fr" ? a.labelFr : a.labelEn} value={w[a.key] ?? 0} min={0} max={100} step={5} onChange={(v) => setW({ ...w, [a.key]: v })} fmt={(v) => `${v}`} />)}
        <p className={cn("text-xs", total === 100 ? "text-success" : "text-[#8a5d05]")}>{locale === "fr" ? "Total des poids" : "Total weights"}: {total} {total !== 100 && (locale === "fr" ? "(normalisé à 100 %)" : "(normalised to 100%)")}</p>
      </>
    }>
      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label={locale === "fr" ? "Rendement attendu (illustratif)" : "Expected return (illustrative)"} value={`${stats.expectedReturnPct.toFixed(1)} %`} />
        <Stat label={locale === "fr" ? "Volatilité (illustrative)" : "Volatility (illustrative)"} value={`${stats.volatilityPct.toFixed(1)} %`} />
        <Stat label={locale === "fr" ? "Concentration" : "Concentration"} value={concentrationLabel} sub={`${locale === "fr" ? "Poids max" : "Max weight"} ${Math.round(stats.maxWeight * 100)} %`} />
        <Stat label={locale === "fr" ? "Liquidité" : "Liquidity"} value={`${Math.round(stats.liquidityScore * 100)} / 100`} accent />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <ResultCard title={locale === "fr" ? "Composition" : "Composition"}>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart><Pie data={pie} dataKey="value" nameKey="name" innerRadius={60} outerRadius={110} paddingAngle={2} isAnimationActive={false}>{pie.map((p) => <Cell key={p.name} fill={p.color} />)}</Pie><Tooltip content={Tip} /></PieChart>
          </ResponsiveContainer>
          <ul className="mt-2 grid grid-cols-2 gap-1 text-xs">{pie.map((p) => <li key={p.name} className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: p.color }} />{p.name} · {Math.round((p.value / Math.max(1, total)) * 100)} %</li>)}</ul>
        </ResultCard>
        <ResultCard title={locale === "fr" ? "Scénario de stress" : "Stress scenario"}>
          <div className="flex flex-wrap gap-2">{SCENARIOS.map((s) => <button key={s} onClick={() => setScenario(s)} className={cn("rounded-full border px-3 py-1.5 text-xs font-semibold", scenario === s ? "border-royal bg-royal text-white" : "border-mist text-steel hover:border-finance")}>{scenarioLabel[s][locale]}</button>)}</div>
          <p className={cn("num mt-6 font-display text-5xl font-extrabold", shock < 0 ? "text-danger" : "text-success")}>{shock > 0 ? "+" : ""}{shock.toFixed(1)} %</p>
          <p className="mt-1 text-sm text-steel">{locale === "fr" ? "Impact illustratif sur la valeur du portefeuille" : "Illustrative impact on portfolio value"}</p>
          <ul className="mt-5 space-y-1.5 text-xs text-slate">{ASSET_CLASSES.filter((a) => (w[a.key] ?? 0) > 0).map((a) => <li key={a.key} className="flex justify-between"><span>{locale === "fr" ? a.labelFr : a.labelEn}</span><span className="num">{Math.round(((w[a.key] ?? 0) / Math.max(1, total)) * 100)} %</span></li>)}</ul>
        </ResultCard>
      </div>
      <Notice tone="compliance">{locale === "fr" ? "Les classes d'actifs et leurs caractéristiques sont génériques et pédagogiques (sans matrice de corrélation). Cet atelier illustre des principes de diversification ; il ne constitue pas une allocation recommandée." : "Asset classes and their characteristics are generic and educational (no correlation matrix). This studio illustrates diversification principles; it is not a recommended allocation."}</Notice>
    </LabShell>
  );
}
