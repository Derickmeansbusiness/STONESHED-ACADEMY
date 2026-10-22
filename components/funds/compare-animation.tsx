"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/lib/i18n/client";

export function CompareAnimation() {
  const { locale } = useLocale();
  const reduce = useReducedMotion();
  const [year, setYear] = useState(1);
  useEffect(() => { if (reduce) return; const id = setInterval(() => setYear((y) => (y % 4) + 1), 2400); return () => clearInterval(id); }, [reduce]);
  const cols = [
    { title: "FCP STONESHED CLASSIC", sub: locale === "fr" ? "Capitalisation : les revenus restent dans le fonds" : "Capitalisation: income stays in the fund", color: "bg-royal", retained: true },
    { title: "FCP STONESHED GOLD", sub: locale === "fr" ? "Distribution : les revenus sont versés chaque année" : "Distribution: income is paid out each year", color: "bg-midnight", retained: false },
  ];
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {cols.map((c) => (
        <div key={c.title} className={`${c.color} relative overflow-hidden rounded-3xl p-6 text-white sm:p-8`}>
          <p className="eyebrow-light">{c.title}</p><p className="mt-1 text-sm text-white/70">{c.sub}</p>
          <div className="mt-8 flex h-44 items-end gap-3">
            {[1, 2, 3, 4].map((y) => (
              <div key={y} className="flex flex-1 flex-col items-center gap-1">
                <div className="relative flex w-full flex-col justify-end" style={{ height: 150 }}>
                  {c.retained ? (
                    Array.from({ length: y }, (_, i) => <motion.div key={i} initial={false} animate={{ opacity: y <= year ? 1 : 0.2, height: i === 0 ? 70 : 14 }} className={`mb-0.5 w-full rounded-md ${i === 0 ? "bg-sky/80" : "bg-sky"}`} />)
                  ) : (
                    <>
                      <motion.div initial={false} animate={{ y: y <= year ? -60 : 0, opacity: y <= year ? 1 : 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="mb-0.5 w-full rounded-md bg-amber" style={{ height: 14 }} />
                      <motion.div initial={false} animate={{ opacity: y <= year ? 1 : 0.2 }} className="w-full rounded-md bg-sky/80" style={{ height: 70 }} />
                    </>
                  )}
                </div>
                <span className="text-[10px] text-white/60">{locale === "fr" ? "An" : "Yr"} {y}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-4 text-[11px] text-white/70"><span className="inline-flex items-center gap-1"><span className="h-2 w-3 rounded-sm bg-sky/80" />{locale === "fr" ? "Capital" : "Capital"}</span><span className="inline-flex items-center gap-1"><span className={`h-2 w-3 rounded-sm ${c.retained ? "bg-sky" : "bg-amber"}`} />{c.retained ? (locale === "fr" ? "Revenus réinvestis" : "Reinvested income") : locale === "fr" ? "Revenus distribués" : "Distributed income"}</span></div>
        </div>
      ))}
    </div>
  );
}
