"use client";
import { useLocale } from "@/lib/i18n/client";
import { Users, Building2, UserCog, Landmark, ShieldCheck, Scale, FileCheck2 } from "lucide-react";

export function FundFlowDiagram() {
  const { locale } = useLocale();
  const nodes = locale === "fr"
    ? [["Investisseurs", "Souscrivent dès 10 000 FCFA et reçoivent des parts", Users], ["Stoneshed Asset Management", "Société de gestion agréée COSUMAF-SGP-03/2023", UserCog], ["FCP", "Portefeuille commun : obligations et autres titres de créance", Building2], ["Émetteurs", "États de la CEMAC, entreprises, banques", Landmark]]
    : [["Investors", "Subscribe from 10,000 FCFA and receive units", Users], ["Stoneshed Asset Management", "Management company licensed COSUMAF-SGP-03/2023", UserCog], ["FCP", "Pooled portfolio: bonds and other debt securities", Building2], ["Issuers", "CEMAC states, companies, banks", Landmark]];
  const oversight = locale === "fr"
    ? [["Ecobank Cameroun", "Dépositaire : conservation des actifs et contrôle", ShieldCheck], ["Moore Stephens CA", "Commissaire aux comptes : certification des comptes", Scale], ["COSUMAF", "Régulateur : agrément, visa, supervision", FileCheck2]]
    : [["Ecobank Cameroon", "Depositary: safekeeping and control", ShieldCheck], ["Moore Stephens CA", "Statutory auditor: certifies the accounts", Scale], ["COSUMAF", "Regulator: licence, visa, supervision", FileCheck2]];
  return (
    <div className="rounded-3xl bg-midnight p-6 text-white sm:p-10">
      <div className="grid gap-3 md:grid-cols-4">
        {nodes.map(([a, b, Icon], i) => { const I = Icon as typeof Users; return (
          <div key={a as string} className="relative rounded-2xl border border-white/10 bg-white/[0.05] p-5">
            <I className="h-6 w-6 text-sky" /><p className="mt-3 font-display font-bold">{a as string}</p><p className="mt-1 text-xs text-white/60">{b as string}</p>
            {i < 3 && <span className="absolute top-1/2 -right-3 hidden h-px w-6 bg-sky/60 md:block" />}
          </div>
        ); })}
      </div>
      <p className="mt-8 mb-3 eyebrow-light">{locale === "fr" ? "Contrôle et supervision" : "Oversight and supervision"}</p>
      <div className="grid gap-3 md:grid-cols-3">
        {oversight.map(([a, b, Icon]) => { const I = Icon as typeof Users; return <div key={a as string} className="flex gap-4 rounded-2xl border border-sky/20 bg-sky/5 p-4"><I className="h-5 w-5 shrink-0 text-sky" /><div><p className="font-display text-sm font-bold">{a as string}</p><p className="text-xs text-white/60">{b as string}</p></div></div>; })}
      </div>
      <p className="mt-6 text-xs text-white/50">{locale === "fr" ? "Valorisation : les actifs du fonds sont évalués, les frais déduits, et le résultat divisé par le nombre de parts pour obtenir la valeur liquidative. Gains et pertes se reflètent dans cette valeur." : "Valuation: the fund's assets are valued, costs deducted, and the result divided by the number of units to produce the NAV. Gains and losses show up in that value."}</p>
    </div>
  );
}
