"use client";
import { useRouter, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const CATS = ["foundations", "investment", "funds", "cemac", "wealth", "business", "research"] as const;

export function CatalogFilters({ current }: { locale: Locale; current: { level?: string; category?: string; q?: string } }) {
  const { t } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  function set(next: Partial<typeof current>) {
    const p = new URLSearchParams();
    const merged = { ...current, ...next };
    for (const [k, v] of Object.entries(merged)) if (v) p.set(k, v);
    router.replace(`${pathname}${p.size ? `?${p}` : ""}`, { scroll: false });
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative flex-1 min-w-[220px]">
          <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-steel" />
          <input defaultValue={current.q} onChange={(e) => set({ q: e.target.value || undefined })} placeholder={t.common.search} className="w-full rounded-full border border-mist bg-white py-2.5 pr-4 pl-11 text-sm outline-none focus:border-finance" aria-label={t.common.search} />
        </label>
        <div className="flex gap-1 rounded-full border border-mist bg-white p-1">
          {[undefined, "beginner", "intermediate", "advanced"].map((lvl) => (
            <button key={lvl ?? "all"} onClick={() => set({ level: lvl })} className={cn("rounded-full px-3.5 py-1.5 text-xs font-semibold transition", current.level === lvl ? "bg-royal text-white" : "text-steel hover:text-royal")}>{lvl ? t.common[lvl as "beginner"] : t.common.all}</button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => set({ category: undefined })} className={cn("rounded-full border px-3 py-1.5 text-xs font-semibold transition", !current.category ? "border-royal bg-royal text-white" : "border-mist bg-white text-steel hover:border-finance")}>{t.common.all}</button>
        {CATS.map((c) => (
          <button key={c} onClick={() => set({ category: current.category === c ? undefined : c })} className={cn("rounded-full border px-3 py-1.5 text-xs font-semibold transition", current.category === c ? "border-royal bg-royal text-white" : "border-mist bg-white text-steel hover:border-finance")}>{t.learn.categories[c]}</button>
        ))}
      </div>
    </div>
  );
}
