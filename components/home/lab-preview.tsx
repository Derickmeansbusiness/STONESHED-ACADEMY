"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";
import { formatFcfa } from "@/lib/i18n";
import { growthSimulation } from "@/lib/lab/calc";
import { makeTooltip } from "@/components/charts/tooltip";

export function LabPreview() {
  const { locale, t } = useLocale();
  const [monthly, setMonthly] = useState(25000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(6);
  const data = useMemo(() => growthSimulation({ initial: 100000, monthly, years, annualRatePct: rate, compounding: "monthly" }), [monthly, years, rate]);
  const last = data[data.length - 1];
  const Tip = useMemo(() => makeTooltip({ format: (v) => formatFcfa(v, locale), labelFormat: (l) => `${t.common.year} ${l}`, names: { value: t.lab.ending, contributions: t.lab.contributions } }), [locale, t]);
  return (
    <div className="grid gap-6 rounded-3xl border border-mist/70 bg-white p-5 shadow-[var(--shadow-soft)] sm:p-8 lg:grid-cols-[320px_1fr]">
      <div className="space-y-5">
        <Slider label={t.lab.monthly} value={monthly} min={5000} max={300000} step={5000} onChange={setMonthly} fmt={(v) => formatFcfa(v, locale)} />
        <Slider label={t.lab.years} value={years} min={1} max={30} step={1} onChange={setYears} fmt={(v) => `${v} ${t.common.years}`} />
        <Slider label={t.lab.rate} value={rate} min={0} max={12} step={0.5} onChange={setRate} fmt={(v) => `${v.toLocaleString(locale === "fr" ? "fr-FR" : "en-US")} %`} />
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Stat label={t.lab.totalContrib} value={formatFcfa(last.contributions, locale, { compact: true })} />
          <Stat label={t.lab.ending} value={formatFcfa(last.value, locale, { compact: true })} accent />
        </div>
        <Link href={`/${locale}/lab/growth`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-finance hover:underline">{t.lab.open} <ArrowRight className="h-4 w-4" /></Link>
      </div>
      <div className="min-h-[260px]">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1265C8" stopOpacity={0.35} /><stop offset="100%" stopColor="#1265C8" stopOpacity={0} /></linearGradient>
              <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#58B8F5" stopOpacity={0.5} /><stop offset="100%" stopColor="#58B8F5" stopOpacity={0.05} /></linearGradient>
            </defs>
            <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#5b6b84" }} />
            <YAxis tickLine={false} axisLine={false} width={54} tick={{ fontSize: 11, fill: "#5b6b84" }} tickFormatter={(v) => `${Math.round(v / 1e6)}M`} />
            <Tooltip content={Tip} />
            <Area type="monotone" dataKey="value" stroke="#1265C8" strokeWidth={2.5} fill="url(#gv)" isAnimationActive={false} />
            <Area type="monotone" dataKey="contributions" stroke="#58B8F5" strokeWidth={2} fill="url(#gc)" isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
        <p className="mt-2 text-xs text-steel">{t.common.hypothetical}</p>
      </div>
    </div>
  );
}

export function Slider({ label, value, min, max, step, onChange, fmt }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; fmt: (v: number) => string }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-sm"><span className="font-semibold text-ink">{label}</span><span className="num font-semibold text-finance">{fmt(value)}</span></span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} aria-label={label} />
    </label>
  );
}

export function Stat({ label, value, accent = false, sub }: { label: string; value: string; accent?: boolean; sub?: string }) {
  return (
    <div className={`rounded-2xl p-4 ${accent ? "bg-royal text-white" : "bg-cloud/70 text-ink"}`}>
      <p className={`text-[11px] font-semibold uppercase tracking-wider ${accent ? "text-sky" : "text-steel"}`}>{label}</p>
      <p className="num mt-1 font-display text-lg font-extrabold leading-tight sm:text-xl">{value}</p>
      {sub && <p className={`mt-1 text-xs ${accent ? "text-white/70" : "text-steel"}`}>{sub}</p>}
    </div>
  );
}
