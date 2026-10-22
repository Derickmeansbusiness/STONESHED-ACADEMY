"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Users, PiggyBank, UserCog, Building2, Scale, Coins } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";

const STEPS = {
  en: [
    { title: "Many investors", body: "Thousands of people each put in an amount they can afford — from 10,000 FCFA upwards.", icon: Users },
    { title: "One pooled fund", body: "Their money is combined into a single fund (an FCP). Each investor receives units in proportion to what they paid in.", icon: PiggyBank },
    { title: "Professional management", body: "A licensed management company decides what the fund buys, within rules set out in the fund's documentation.", icon: UserCog },
    { title: "Investments", body: "For a bond-oriented fund, that means government securities and other debt instruments that pay interest over time.", icon: Building2 },
    { title: "Independent valuation", body: "The fund's assets are valued and divided by the number of units to produce the net asset value (NAV). A depositary and auditor provide oversight.", icon: Scale },
    { title: "Results flow back", body: "Gains or losses are reflected in the unit value. A capitalisation fund reinvests income; a distribution fund pays it out.", icon: Coins },
  ],
  fr: [
    { title: "De nombreux investisseurs", body: "Des milliers de personnes versent chacune un montant à leur portée, à partir de 10 000 FCFA.", icon: Users },
    { title: "Un fonds commun", body: "Leur argent est mis en commun dans un seul fonds (un FCP). Chaque investisseur reçoit des parts proportionnelles à son versement.", icon: PiggyBank },
    { title: "Une gestion professionnelle", body: "Une société de gestion agréée décide des investissements du fonds, dans le cadre fixé par sa documentation.", icon: UserCog },
    { title: "Les investissements", body: "Pour un fonds orienté obligations, il s'agit de titres publics et d'autres titres de créance qui versent des intérêts dans le temps.", icon: Building2 },
    { title: "Une valorisation indépendante", body: "Les actifs du fonds sont valorisés puis divisés par le nombre de parts pour obtenir la valeur liquidative. Un dépositaire et un commissaire aux comptes assurent le contrôle.", icon: Scale },
    { title: "Les résultats reviennent", body: "Gains ou pertes se reflètent dans la valeur de la part. Un fonds de capitalisation réinvestit les revenus ; un fonds de distribution les verse.", icon: Coins },
  ],
};

export function HowInvestingWorks() {
  const { locale } = useLocale();
  const steps = STEPS[locale];
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 4200);
    return () => clearInterval(id);
  }, [steps.length, reduce]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
      <div className="relative overflow-hidden rounded-3xl bg-midnight p-6 text-white sm:p-10">
        <div className="grid-fade absolute inset-0 opacity-60" />
        <svg viewBox="0 0 600 420" className="relative h-auto w-full" aria-hidden>
          <defs>
            <linearGradient id="flow" x1="0" x2="1"><stop offset="0" stopColor="#58B8F5" stopOpacity="0" /><stop offset="0.5" stopColor="#58B8F5" /><stop offset="1" stopColor="#58B8F5" stopOpacity="0" /></linearGradient>
          </defs>
          {/* investors */}
          {Array.from({ length: 6 }, (_, i) => (
            <g key={i}>
              <circle cx={60} cy={60 + i * 60} r={active >= 0 ? 12 : 10} fill={active === 0 ? "#58B8F5" : "#1265C8"} opacity="0.9" />
              <path d={`M72 ${60 + i * 60} C 150 ${60 + i * 60}, 150 210, 230 210`} fill="none" stroke="#58B8F5" strokeOpacity={active >= 1 ? 0.7 : 0.25} strokeWidth="2" />
              {!reduce && active >= 1 && <circle r="3" fill="#fff"><animateMotion dur="2.4s" repeatCount="indefinite" begin={`${i * 0.3}s`} path={`M72 ${60 + i * 60} C 150 ${60 + i * 60}, 150 210, 230 210`} /></circle>}
            </g>
          ))}
          {/* fund */}
          <rect x="230" y="150" width="120" height="120" rx="24" fill={active === 1 || active === 4 ? "#1265C8" : "#0B2F73"} stroke="#58B8F5" strokeOpacity="0.6" strokeWidth="2" />
          <text x="290" y="203" textAnchor="middle" fill="#F7FAFF" fontSize="15" fontWeight="700" fontFamily="var(--font-manrope)">FCP</text>
          <text x="290" y="226" textAnchor="middle" fill="#58B8F5" fontSize="11" fontFamily="var(--font-inter)">{locale === "fr" ? "fonds commun" : "pooled fund"}</text>
          {/* manager */}
          <g opacity={active >= 2 ? 1 : 0.5}>
            <circle cx="290" cy="80" r="26" fill={active === 2 ? "#58B8F5" : "#1265C8"} />
            <text x="290" y="85" textAnchor="middle" fill="#071A36" fontSize="10" fontWeight="700">{locale === "fr" ? "Gérant" : "Manager"}</text>
            <line x1="290" y1="106" x2="290" y2="150" stroke="#58B8F5" strokeWidth="2" strokeDasharray="4 4" />
          </g>
          {/* oversight */}
          <g opacity={active >= 4 ? 1 : 0.45}>
            <rect x="240" y="320" width="100" height="34" rx="17" fill="#0B2F73" stroke="#58B8F5" strokeOpacity="0.6" />
            <text x="290" y="342" textAnchor="middle" fill="#F7FAFF" fontSize="10">{locale === "fr" ? "Dépositaire · Audit · COSUMAF" : "Depositary · Audit · COSUMAF"}</text>
            <line x1="290" y1="270" x2="290" y2="320" stroke="#58B8F5" strokeWidth="2" strokeDasharray="4 4" />
          </g>
          {/* investments */}
          {["Bonds", "T-bills", "Deposits"].map((lbl, i) => (
            <g key={lbl} opacity={active >= 3 ? 1 : 0.4}>
              <path d={`M350 210 C 420 210, 420 ${110 + i * 100}, 470 ${110 + i * 100}`} fill="none" stroke="#58B8F5" strokeOpacity="0.6" strokeWidth="2" />
              {!reduce && active === 3 && <circle r="3" fill="#fff"><animateMotion dur="2s" repeatCount="indefinite" begin={`${i * 0.4}s`} path={`M350 210 C 420 210, 420 ${110 + i * 100}, 470 ${110 + i * 100}`} /></circle>}
              {!reduce && active === 5 && <circle r="3" fill="#E0A526"><animateMotion dur="2s" repeatCount="indefinite" begin={`${i * 0.4}s`} path={`M470 ${110 + i * 100} C 420 ${110 + i * 100}, 420 210, 350 210`} /></circle>}
              <rect x="470" y={92 + i * 100} width="100" height="36" rx="10" fill="#0B2F73" stroke="#58B8F5" strokeOpacity="0.5" />
              <text x="520" y={115 + i * 100} textAnchor="middle" fill="#F7FAFF" fontSize="11" fontWeight="600">{locale === "fr" ? ["Obligations", "Bons du Trésor", "Dépôts"][i] : lbl}</text>
            </g>
          ))}
        </svg>
      </div>
      <ol className="space-y-2">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const on = i === active;
          return (
            <li key={i}>
              <button onClick={() => setActive(i)} className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${on ? "border-finance bg-white shadow-[var(--shadow-soft)]" : "border-transparent hover:bg-white/60"}`} aria-current={on}>
                <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${on ? "bg-royal text-white" : "bg-cloud text-royal"}`}><Icon className="h-4 w-4" /></span>
                <span>
                  <span className="flex items-center gap-2 font-display text-[16px] font-bold text-ink"><span className="text-xs text-steel num">0{i + 1}</span>{s.title}</span>
                  <AnimatePresence initial={false}>
                    {on && <motion.span initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="block overflow-hidden text-[15px] leading-relaxed text-steel"><span className="block pt-1.5">{s.body}</span></motion.span>}
                  </AnimatePresence>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
