"use client";
import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLocale } from "@/lib/i18n/client";
import { formatFcfa } from "@/lib/i18n";
import { growthSimulation } from "@/lib/lab/calc";
import { LabShell, ResultCard } from "./lab-shell";
import { Slider, Stat } from "@/components/home/lab-preview";
import { makeTooltip } from "@/components/charts/tooltip";
import { Select, Field } from "@/components/ui/form";

const DEF = { initial: 100000, monthly: 25000, years: 10, rate: 6, compounding: "monthly" as const };

export function GrowthLab({ title, intro }: { title: string; intro: string }) {
  const { locale, t } = useLocale();
  const [s, setS] = useState(DEF);
  const data = useMemo(() => growthSimulation({ initial: s.initial, monthly: s.monthly, years: s.years, annualRatePct: s.rate, compounding: s.compounding }), [s]);
  const last = data[data.length - 1];
  const Tip = useMemo(() => makeTooltip({ format: (v) => formatFcfa(v, locale), labelFormat: (l) => `${t.common.year} ${l}`, names: { value: t.lab.ending, contributions: t.lab.contributions, growth: t.lab.growth } }), [locale, t]);
  const fmt = (v: number) => formatFcfa(v, locale);
  return (
    <LabShell slug="growth" title={title} intro={intro} onReset={() => setS(DEF)} inputs={
      <>
        <Slider label={t.lab.initialAmount} value={s.initial} min={0} max={5_000_000} step={10000} onChange={(v) => setS({ ...s, initial: v })} fmt={fmt} />
        <Slider label={t.lab.monthly} value={s.monthly} min={0} max={500_000} step={5000} onChange={(v) => setS({ ...s, monthly: v })} fmt={fmt} />
        <Slider label={t.lab.years} value={s.years} min={1} max={40} step={1} onChange={(v) => setS({ ...s, years: v })} fmt={(v) => `${v} ${t.common.years}`} />
        <Slider label={t.lab.rate} value={s.rate} min={0} max={15} step={0.25} onChange={(v) => setS({ ...s, rate: v })} fmt={(v) => `${v.toLocaleString(locale === "fr" ? "fr-FR" : "en-US")} %`} />
        <Field label={t.lab.compounding}><Select value={s.compounding} onChange={(e) => setS({ ...s, compounding: e.target.value as typeof s.compounding })}><option value="monthly">{t.lab.monthly_}</option><option value="quarterly">{t.lab.quarterly}</option><option value="annually">{t.lab.annually}</option></Select></Field>
      </>
    }>
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label={t.lab.totalContrib} value={formatFcfa(last.contributions, locale, { compact: true })} />
        <Stat label={t.lab.growth} value={formatFcfa(last.growth, locale, { compact: true })} sub={`${Math.round((last.growth / Math.max(1, last.contributions)) * 100)} % ${locale === "fr" ? "des versements" : "of contributions"}`} />
        <Stat label={t.lab.ending} value={formatFcfa(last.value, locale, { compact: true })} accent />
      </div>
      <ResultCard title={`${t.lab.contributions} vs ${t.lab.growth}`}>
        <ResponsiveContainer width="100%" height={340}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1265C8" stopOpacity={0.4} /><stop offset="100%" stopColor="#1265C8" stopOpacity={0} /></linearGradient><linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#58B8F5" stopOpacity={0.5} /><stop offset="100%" stopColor="#58B8F5" stopOpacity={0.05} /></linearGradient></defs>
            <CartesianGrid stroke="#e8eef7" vertical={false} />
            <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#5b6b84" }} />
            <YAxis tickLine={false} axisLine={false} width={60} tick={{ fontSize: 11, fill: "#5b6b84" }} tickFormatter={(v) => (v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : `${Math.round(v / 1000)}k`)} />
            <Tooltip content={Tip} />
            <Legend formatter={(v) => (v === "value" ? t.lab.ending : t.lab.contributions)} />
            <Area type="monotone" dataKey="value" stroke="#1265C8" strokeWidth={2.5} fill="url(#g1)" isAnimationActive={false} />
            <Area type="monotone" dataKey="contributions" stroke="#58B8F5" strokeWidth={2} fill="url(#g2)" isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </ResultCard>
      <ResultCard title={locale === "fr" ? "Tableau annuel" : "Year by year"}>
        <div className="max-h-72 overflow-auto thin-scroll">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white"><tr className="text-left text-xs uppercase tracking-wider text-steel"><th className="py-2">{t.common.year}</th><th className="py-2 text-right">{t.lab.contributions}</th><th className="py-2 text-right">{t.lab.growth}</th><th className="py-2 text-right">{t.lab.ending}</th></tr></thead>
            <tbody>{data.map((d) => <tr key={d.year} className="border-t border-mist/60"><td className="num py-1.5">{d.year}</td><td className="num py-1.5 text-right">{fmt(d.contributions)}</td><td className="num py-1.5 text-right text-finance">{fmt(d.growth)}</td><td className="num py-1.5 text-right font-semibold text-ink">{fmt(d.value)}</td></tr>)}</tbody>
          </table>
        </div>
      </ResultCard>
    </LabShell>
  );
}
