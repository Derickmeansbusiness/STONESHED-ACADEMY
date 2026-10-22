"use client";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLocale } from "@/lib/i18n/client";
import { formatFcfa } from "@/lib/i18n";
import { capitalisationVsDistribution } from "@/lib/lab/calc";
import { LabShell, ResultCard } from "./lab-shell";
import { Slider, Stat } from "@/components/home/lab-preview";
import { makeTooltip } from "@/components/charts/tooltip";
import { Notice } from "@/components/ui/notice";

const DEF = { initial: 1_000_000, years: 10, rate: 6, payout: 100 };

export function CapVsDistLab({ title, intro }: { title: string; intro: string }) {
  const { locale, t } = useLocale();
  const [s, setS] = useState(DEF);
  const data = useMemo(() => capitalisationVsDistribution({ initial: s.initial, years: s.years, annualRatePct: s.rate, payoutPct: s.payout }), [s]);
  const last = data[data.length - 1];
  const fmt = (v: number) => formatFcfa(v, locale);
  const Tip = useMemo(() => makeTooltip({ format: fmt, labelFormat: (l) => `${t.common.year} ${l}`, names: { capValue: t.lab.reinvest, distValue: t.lab.distribute, distIncomeCumulative: t.lab.cumulativeIncome, distIncomeYear: t.lab.distributed } }), [locale, t]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <LabShell slug="cap-vs-dist" title={title} intro={intro} onReset={() => setS(DEF)} inputs={
      <>
        <Slider label={t.lab.initialAmount} value={s.initial} min={10000} max={20_000_000} step={10000} onChange={(v) => setS({ ...s, initial: v })} fmt={fmt} />
        <Slider label={t.lab.years} value={s.years} min={1} max={30} step={1} onChange={(v) => setS({ ...s, years: v })} fmt={(v) => `${v} ${t.common.years}`} />
        <Slider label={t.lab.rate} value={s.rate} min={0} max={12} step={0.25} onChange={(v) => setS({ ...s, rate: v })} fmt={(v) => `${v} %`} />
        <Slider label={locale === "fr" ? "Part des revenus distribuée" : "Share of income paid out"} value={s.payout} min={0} max={100} step={5} onChange={(v) => setS({ ...s, payout: v })} fmt={(v) => `${v} %`} />
      </>
    }>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl bg-royal p-6 text-white">
          <p className="eyebrow-light">{t.lab.reinvest}</p>
          <p className="mt-1 text-xs text-white/60">{locale === "fr" ? "Exemple : fonds de capitalisation" : "Example: capitalisation fund"}</p>
          <p className="num mt-5 font-display text-3xl font-extrabold">{formatFcfa(last.capValue, locale, { compact: true })}</p>
          <p className="text-xs text-white/70">{t.lab.futureValue}</p>
          <dl className="mt-5 space-y-2 text-sm"><div className="flex justify-between"><dt className="text-white/70">{t.lab.retained}</dt><dd className="num">{formatFcfa(last.capValue - s.initial, locale, { compact: true })}</dd></div><div className="flex justify-between"><dt className="text-white/70">{t.lab.distributed}</dt><dd className="num">0 FCFA</dd></div></dl>
        </div>
        <div className="rounded-3xl bg-midnight p-6 text-white">
          <p className="eyebrow-light">{t.lab.distribute}</p>
          <p className="mt-1 text-xs text-white/60">{locale === "fr" ? "Exemple : fonds de distribution" : "Example: distribution fund"}</p>
          <p className="num mt-5 font-display text-3xl font-extrabold">{formatFcfa(last.distValue, locale, { compact: true })}</p>
          <p className="text-xs text-white/70">{t.lab.futureValue}</p>
          <dl className="mt-5 space-y-2 text-sm"><div className="flex justify-between"><dt className="text-white/70">{t.lab.retained}</dt><dd className="num">{formatFcfa(last.distValue - s.initial, locale, { compact: true })}</dd></div><div className="flex justify-between"><dt className="text-white/70">{t.lab.cumulativeIncome}</dt><dd className="num">{formatFcfa(last.distIncomeCumulative, locale, { compact: true })}</dd></div></dl>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Stat label={locale === "fr" ? "Total reçu + valeur (distribution)" : "Total received + value (distribution)"} value={formatFcfa(last.distValue + last.distIncomeCumulative, locale, { compact: true })} />
        <Stat label={locale === "fr" ? "Écart de valeur finale" : "Difference in ending value"} value={formatFcfa(last.capValue - last.distValue, locale, { compact: true })} accent />
      </div>
      <ResultCard title={t.lab.futureValue}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#e8eef7" vertical={false} />
            <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#5b6b84" }} />
            <YAxis tickLine={false} axisLine={false} width={60} tick={{ fontSize: 11, fill: "#5b6b84" }} tickFormatter={(v) => (v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : `${Math.round(v / 1000)}k`)} />
            <Tooltip content={Tip} />
            <Line type="monotone" dataKey="capValue" stroke="#1265C8" strokeWidth={2.5} dot={false} isAnimationActive={false} />
            <Line type="monotone" dataKey="distValue" stroke="#58B8F5" strokeWidth={2.5} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </ResultCard>
      <ResultCard title={t.lab.distributed + ` (${t.common.perYear})`}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data.slice(1)} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#e8eef7" vertical={false} />
            <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#5b6b84" }} />
            <YAxis tickLine={false} axisLine={false} width={60} tick={{ fontSize: 11, fill: "#5b6b84" }} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
            <Tooltip content={Tip} />
            <Bar dataKey="distIncomeYear" fill="#E0A526" radius={[6, 6, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </ResultCard>
      <Notice tone="info">{locale === "fr" ? "Illustration conceptuelle avec un rendement supposé constant. La performance réelle, les décisions de distribution, les frais et les valorisations d'un fonds diffèrent et peuvent être négatives." : "Conceptual illustration at a constant assumed rate. Actual fund performance, distribution decisions, charges and valuations differ and can be negative."}</Notice>
    </LabShell>
  );
}
