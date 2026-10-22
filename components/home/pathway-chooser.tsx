"use client";
import Link from "next/link";
import { Wallet, TrendingUp, Layers, Landmark, BarChart3, Building2, GraduationCap, ArrowUpRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";
import { Stagger, StaggerItem } from "@/components/ui/reveal";

const ITEMS = [
  ["money", Wallet], ["investing", TrendingUp], ["funds", Layers], ["wealth", Landmark], ["markets", BarChart3], ["treasury", Building2], ["professional", GraduationCap],
] as const;

export function PathwayChooser() {
  const { locale, t } = useLocale();
  return (
    <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {ITEMS.map(([key, Icon], i) => (
        <StaggerItem key={key} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
          <Link href={`/${locale}/onboarding?interest=${key}`} className="group flex h-full flex-col justify-between rounded-2xl border border-mist/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky hover:shadow-[var(--shadow-lift)]">
            <div className="flex items-start justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal/5 text-royal transition group-hover:bg-royal group-hover:text-white"><Icon className="h-5 w-5" /></span>
              <ArrowUpRight className="h-4 w-4 text-steel/50 transition group-hover:text-finance" />
            </div>
            <p className="mt-8 font-display text-[17px] font-bold leading-tight text-ink">{t.pathways[key]}</p>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
