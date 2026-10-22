"use client";
import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/client";
import { formatFcfa } from "@/lib/i18n";
import { inflationErosion } from "@/lib/lab/calc";
import { LabShell, ResultCard } from "./lab-shell";
import { Slider, Stat } from "@/components/home/lab-preview";
import { makeTooltip } from "@/components/charts/tooltip";

const DEF = { amount: 1_000_000, inflation: 3, years: 10, growth: 0 };

export function InflationLab({ title, intro }: { title: string; intro: string }) {
  const { locale, t } = useLocale();
  const [s, setS] = useState(DEF);
  const data = useMemo(() => inflationErosion({ amount: s.amount, inflationPct: s.inflation, years: s.years, nominalGrowthPct: s.growth }), [s]);
  const last = data[data.length - 1];
  const fmt = (v: number) => formatFcfa(v, locale);
  const Tip = useMemo(() => makeTooltip({ format: fmt, labelFormat: (l) => `${t.common.year} ${l}`, names: { nominal: t.lab.nominal, real: t.lab.purchasingPower } }), [locale, t]); // eslint-disable-line react-hooks/exhaustive-deps
  const ratio = last.real / s.amount;
  const basket = locale === "fr" ? ["Riz 50 kg", "Carburant", "Loyer", "Frais scolaires", "Transport"] : ["50 kg rice", "Fuel", "Rent", "School fees", "Transport"];
  return (
    <LabShell slug="inflation" title={title} intro={intro} onReset={() => setS(DEF)} inputs={
      <>
        <Slider label={t.lab.initialAmount} value={s.amount} min={10000} max={50_000_000} step={10000} onChange={(v) => setS({ ...s, amount: v })} fmt={fmt} />
        <Slider label={t.lab.inflation} value={s.inflation} min={0} max={15} step={0.25} onChange={(v) => setS({ ...s, inflation: v })} fmt={(v) => `${v} %`} />
        <Slider label={t.lab.years} value={s.years} min={1} max={30} step={1} onChange={(v) => setS({ ...s, years: v })} fmt={(v) => `${v} ${t.common.years}`} />
        <Slider label={locale === "fr" ? "Rendement nominal de l'épargne (optionnel)" : "Nominal return on the money (optional)"} value={s.growth} min={0} max={12} step={0.25} onChange={(v) => setS({ ...s, growth: v })} fmt={(v) => `${v} %`} />
      </>
    }>
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label={t.lab.nominal} value={formatFcfa(last.nominal, locale, { compact: true })} />
        <Stat label={t.lab.purchasingPower} value={formatFcfa(last.real, locale, { compact: true })} accent sub={`${Math.round(ratio * 100)} % ${locale === "fr" ? "de la valeur d'aujourd'hui" : "of today's value"}`} />
        <Stat label={locale === "fr" ? "Niveau des prix" : "Price level"} value={`×${last.priceLevel.toFixed(2)}`} />
      </div>
      <ResultCard title={locale === "fr" ? "Ce que votre argent achète" : "What your money buys"}>
        <div className="grid gap-6 sm:grid-cols-2">
          {[0, 1].map((k) => (
            <div key={k}>
              <p className="mb-3 text-sm font-semibold text-ink">{k === 0 ? (locale === "fr" ? "Aujourd'hui" : "Today") : `${t.common.year} ${s.years}`}</p>
              <div className="flex flex-wrap gap-2">
                {basket.map((b, i) => (
                  <motion.span key={b} initial={false} animate={{ opacity: k === 0 ? 1 : Math.max(0.15, ratio), scale: k === 0 ? 1 : 0.6 + 0.4 * ratio }} transition={{ duration: 0.5 }} className="rounded-xl bg-cloud px-3 py-2 text-xs font-semibold text-slate" style={{ transformOrigin: "left" }}>{b}{i === 0 && k === 1 ? "" : ""}</motion.span>
                ))}
              </div>
              <div className="mt-4 h-4 overflow-hidden rounded-full bg-cloud"><motion.div className="h-full rounded-full bg-finance" initial={false} animate={{ width: `${k === 0 ? 100 : ratio * 100}%` }} transition={{ duration: 0.6 }} /></div>
            </div>
          ))}
        </div>
      </ResultCard>
      <ResultCard title={`${t.lab.nominal} vs ${t.lab.purchasingPower}`}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs><linearGradient id="inf" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E0A526" stopOpacity={0.4} /><stop offset="100%" stopColor="#E0A526" stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid stroke="#e8eef7" vertical={false} />
            <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#5b6b84" }} />
            <YAxis tickLine={false} axisLine={false} width={60} tick={{ fontSize: 11, fill: "#5b6b84" }} tickFormatter={(v) => (v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : `${Math.round(v / 1000)}k`)} />
            <Tooltip content={Tip} />
            <Area type="monotone" dataKey="nominal" stroke="#1265C8" strokeWidth={2} fill="none" isAnimationActive={false} />
            <Area type="monotone" dataKey="real" stroke="#E0A526" strokeWidth={2.5} fill="url(#inf)" isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </ResultCard>
    </LabShell>
  );
}
