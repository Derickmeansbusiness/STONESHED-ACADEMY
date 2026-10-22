"use client";
import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLocale } from "@/lib/i18n/client";
import { formatFcfa } from "@/lib/i18n";
import { goalPlan } from "@/lib/lab/calc";
import { LabShell, ResultCard } from "./lab-shell";
import { Slider, Stat } from "@/components/home/lab-preview";
import { makeTooltip } from "@/components/charts/tooltip";
import { Notice } from "@/components/ui/notice";
import { cn } from "@/lib/utils";

const GOALS = [
  { key: "education", en: "Children's education", fr: "Études des enfants", target: 5_000_000, years: 8 },
  { key: "home", en: "Land or home deposit", fr: "Terrain ou apport logement", target: 15_000_000, years: 10 },
  { key: "business", en: "Business capital", fr: "Capital pour une activité", target: 3_000_000, years: 4 },
  { key: "retirement", en: "Retirement cushion", fr: "Complément retraite", target: 30_000_000, years: 25 },
  { key: "emergency", en: "Emergency fund", fr: "Fonds d'urgence", target: 1_500_000, years: 2 },
];

export function GoalsLab({ title, intro }: { title: string; intro: string }) {
  const { locale, t } = useLocale();
  const [goal, setGoal] = useState(GOALS[0]);
  const [s, setS] = useState({ target: GOALS[0].target, years: GOALS[0].years, initial: 200000, monthly: 40000, rate: 5, inflation: 3 });
  const plan = useMemo(() => goalPlan({ target: s.target, years: s.years, initial: s.initial, monthly: s.monthly, annualRatePct: s.rate, inflationPct: s.inflation }), [s]);
  const last = plan.points[plan.points.length - 1];
  const fmt = (v: number) => formatFcfa(v, locale);
  const Tip = useMemo(() => makeTooltip({ format: fmt, labelFormat: (l) => `${t.common.year} ${l}`, names: { balance: locale === "fr" ? "Épargne accumulée" : "Accumulated savings", realTarget: locale === "fr" ? "Objectif ajusté de l'inflation" : "Inflation-adjusted target" } }), [locale, t]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <LabShell slug="goals" title={title} intro={intro} inputs={
      <>
        <div className="flex flex-wrap gap-1.5">{GOALS.map((g) => <button key={g.key} onClick={() => { setGoal(g); setS({ ...s, target: g.target, years: g.years }); }} className={cn("rounded-full border px-3 py-1.5 text-xs font-semibold", goal.key === g.key ? "border-royal bg-royal text-white" : "border-mist text-steel hover:border-finance")}>{locale === "fr" ? g.fr : g.en}</button>)}</div>
        <Slider label={locale === "fr" ? "Objectif (en FCFA d'aujourd'hui)" : "Target (in today's FCFA)"} value={s.target} min={100000} max={100_000_000} step={100000} onChange={(v) => setS({ ...s, target: v })} fmt={fmt} />
        <Slider label={t.lab.years} value={s.years} min={1} max={30} step={1} onChange={(v) => setS({ ...s, years: v })} fmt={(v) => `${v} ${t.common.years}`} />
        <Slider label={t.lab.initialAmount} value={s.initial} min={0} max={10_000_000} step={50000} onChange={(v) => setS({ ...s, initial: v })} fmt={fmt} />
        <Slider label={t.lab.monthly} value={s.monthly} min={0} max={1_000_000} step={5000} onChange={(v) => setS({ ...s, monthly: v })} fmt={fmt} />
        <Slider label={t.lab.rate} value={s.rate} min={0} max={12} step={0.25} onChange={(v) => setS({ ...s, rate: v })} fmt={(v) => `${v} %`} />
        <Slider label={t.lab.inflation} value={s.inflation} min={0} max={10} step={0.25} onChange={(v) => setS({ ...s, inflation: v })} fmt={(v) => `${v} %`} />
      </>
    }>
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label={locale === "fr" ? "Objectif ajusté de l'inflation" : "Inflation-adjusted target"} value={formatFcfa(plan.inflatedTarget, locale, { compact: true })} />
        <Stat label={locale === "fr" ? "Épargne projetée" : "Projected savings"} value={formatFcfa(last.balance, locale, { compact: true })} accent sub={plan.reached ? (locale === "fr" ? "Objectif atteint dans ce scénario" : "Target reached in this scenario") : locale === "fr" ? "Objectif non atteint dans ce scénario" : "Target not reached in this scenario"} />
        <Stat label={locale === "fr" ? "Versement mensuel requis" : "Required monthly contribution"} value={formatFcfa(plan.requiredMonthly, locale)} />
      </div>
      <ResultCard title={locale === "fr" ? "Trajectoire vers l'objectif" : "Path to the goal"}>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={plan.points} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs><linearGradient id="goal" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1F9D6A" stopOpacity={0.4} /><stop offset="100%" stopColor="#1F9D6A" stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid stroke="#e8eef7" vertical={false} />
            <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#5b6b84" }} />
            <YAxis tickLine={false} axisLine={false} width={60} tick={{ fontSize: 11, fill: "#5b6b84" }} tickFormatter={(v) => (v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : `${Math.round(v / 1000)}k`)} />
            <Tooltip content={Tip} />
            <Area type="monotone" dataKey="balance" stroke="#1F9D6A" strokeWidth={2.5} fill="url(#goal)" isAnimationActive={false} />
            <Line type="monotone" dataKey="realTarget" stroke="#E0A526" strokeWidth={2} strokeDasharray="6 4" dot={false} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </ResultCard>
      <Notice tone="compliance">{locale === "fr" ? "Cet outil ne stocke aucune donnée financière personnelle : tout reste dans votre navigateur. Les objectifs proposés sont des exemples pédagogiques." : "This tool stores no personal financial data: everything stays in your browser. Suggested goals are educational examples."}</Notice>
    </LabShell>
  );
}
