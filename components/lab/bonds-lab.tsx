"use client";
import { useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLocale } from "@/lib/i18n/client";
import { formatFcfa } from "@/lib/i18n";
import { bondPrice, bondPriceCurve, macaulayDuration } from "@/lib/lab/calc";
import { LabShell, ResultCard } from "./lab-shell";
import { Slider, Stat } from "@/components/home/lab-preview";
import { makeTooltip } from "@/components/charts/tooltip";

const DEF = { coupon: 5.5, years: 5, yieldPct: 5.5 };

export function BondsLab({ title, intro }: { title: string; intro: string }) {
  const { locale, t } = useLocale();
  const [s, setS] = useState(DEF);
  const price = bondPrice({ couponPct: s.coupon, yearsToMaturity: s.years, marketYieldPct: s.yieldPct });
  const curve = useMemo(() => bondPriceCurve({ couponPct: s.coupon, yearsToMaturity: s.years }), [s.coupon, s.years]);
  const dur = macaulayDuration({ couponPct: s.coupon, yearsToMaturity: s.years, marketYieldPct: s.yieldPct });
  const modDur = dur / (1 + s.yieldPct / 100);
  const Tip = useMemo(() => makeTooltip({ format: (v) => formatFcfa(v, locale), labelFormat: (l) => `${locale === "fr" ? "Taux" : "Yield"} ${l} %`, names: { price: locale === "fr" ? "Prix" : "Price" } }), [locale]);
  const cashflows = Array.from({ length: s.years }, (_, i) => ({ year: i + 1, coupon: 10000 * (s.coupon / 100), principal: i + 1 === s.years ? 10000 : 0 }));
  return (
    <LabShell slug="bonds" title={title} intro={intro} onReset={() => setS(DEF)} inputs={
      <>
        <Slider label={locale === "fr" ? "Taux du coupon (annuel)" : "Coupon rate (annual)"} value={s.coupon} min={0} max={12} step={0.25} onChange={(v) => setS({ ...s, coupon: v })} fmt={(v) => `${v} %`} />
        <Slider label={locale === "fr" ? "Années jusqu'à l'échéance" : "Years to maturity"} value={s.years} min={1} max={15} step={1} onChange={(v) => setS({ ...s, years: v })} fmt={(v) => `${v} ${t.common.years}`} />
        <Slider label={locale === "fr" ? "Taux de marché (rendement exigé)" : "Market yield (required return)"} value={s.yieldPct} min={1} max={15} step={0.25} onChange={(v) => setS({ ...s, yieldPct: v })} fmt={(v) => `${v} %`} />
        <p className="text-xs text-steel">{locale === "fr" ? "Valeur nominale de 10 000 FCFA, coupons annuels, pour l'exemple." : "Face value of 10,000 FCFA, annual coupons, for the example."}</p>
      </>
    }>
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label={locale === "fr" ? "Prix théorique" : "Theoretical price"} value={formatFcfa(price, locale)} accent sub={price > 10000 ? (locale === "fr" ? "Au-dessus du pair (coupon > taux)" : "Above par (coupon > yield)") : price < 10000 ? (locale === "fr" ? "Sous le pair (coupon < taux)" : "Below par (coupon < yield)") : locale === "fr" ? "Au pair" : "At par"} />
        <Stat label={locale === "fr" ? "Duration (Macaulay)" : "Duration (Macaulay)"} value={`${dur.toFixed(2)} ${t.common.years}`} />
        <Stat label={locale === "fr" ? "Sensibilité à +1 pt de taux" : "Sensitivity to +1 pt yield"} value={`≈ −${modDur.toFixed(1)} %`} />
      </div>
      <ResultCard title={locale === "fr" ? "Prix de l'obligation selon le taux de marché" : "Bond price versus market yield"}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={curve} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#e8eef7" vertical={false} />
            <XAxis dataKey="yieldPct" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#5b6b84" }} tickFormatter={(v) => `${v}%`} />
            <YAxis tickLine={false} axisLine={false} width={60} tick={{ fontSize: 11, fill: "#5b6b84" }} domain={["auto", "auto"]} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
            <Tooltip content={Tip} />
            <Line type="monotone" dataKey="price" stroke="#1265C8" strokeWidth={2.5} dot={false} isAnimationActive={false} />
            <ReferenceDot x={s.yieldPct} y={Math.round(price)} r={6} fill="#E0A526" stroke="#fff" />
          </LineChart>
        </ResponsiveContainer>
        <p className="mt-2 text-xs text-steel">{locale === "fr" ? "Quand le taux de marché monte, le prix des obligations existantes baisse, et inversement. Les maturités longues sont plus sensibles." : "When market yields rise, the price of existing bonds falls, and vice versa. Longer maturities are more sensitive."}</p>
      </ResultCard>
      <ResultCard title={locale === "fr" ? "Flux de trésorerie de l'obligation" : "Bond cash flows"}>
        <table className="w-full text-sm"><thead><tr className="text-left text-xs uppercase tracking-wider text-steel"><th className="py-2">{t.common.year}</th><th className="py-2 text-right">Coupon</th><th className="py-2 text-right">{locale === "fr" ? "Remboursement" : "Principal"}</th><th className="py-2 text-right">Total</th></tr></thead>
          <tbody>{cashflows.map((c) => <tr key={c.year} className="border-t border-mist/60"><td className="num py-1.5">{c.year}</td><td className="num py-1.5 text-right">{formatFcfa(c.coupon, locale)}</td><td className="num py-1.5 text-right">{c.principal ? formatFcfa(c.principal, locale) : "—"}</td><td className="num py-1.5 text-right font-semibold text-ink">{formatFcfa(c.coupon + c.principal, locale)}</td></tr>)}</tbody></table>
      </ResultCard>
    </LabShell>
  );
}
