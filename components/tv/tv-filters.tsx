"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";

export function TvFilters({ topics, current }: { topics: string[]; current: { topic?: string; duration?: string; lang?: string } }) {
  const { t } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  function set(next: Partial<typeof current>) {
    const merged = { ...current, ...next };
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries(merged)) if (v) p.set(k, v);
    router.replace(`${pathname}${p.size ? `?${p}` : ""}`, { scroll: false });
  }
  const chip = (on: boolean) => cn("rounded-full border px-3 py-1.5 text-xs font-semibold transition", on ? "border-sky bg-sky text-midnight" : "border-white/15 bg-white/5 text-white/75 hover:bg-white/15");
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2"><span className="mr-1 text-[11px] uppercase tracking-wider text-white/50">{t.tv.filterTopic}</span><button onClick={() => set({ topic: undefined })} className={chip(!current.topic)}>{t.common.all}</button>{topics.map((x) => <button key={x} onClick={() => set({ topic: current.topic === x ? undefined : x })} className={chip(current.topic === x)}>{x}</button>)}</div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[11px] uppercase tracking-wider text-white/50">{t.tv.filterDuration}</span>
        {[["under2", t.tv.under2], ["under10", t.tv.under10], ["over10", t.tv.over10]].map(([k, l]) => <button key={k} onClick={() => set({ duration: current.duration === k ? undefined : k })} className={chip(current.duration === k)}>{l}</button>)}
        <span className="mr-1 ml-4 text-[11px] uppercase tracking-wider text-white/50">{t.tv.filterLanguage}</span>
        {[["en", "EN"], ["fr", "FR"]].map(([k, l]) => <button key={k} onClick={() => set({ lang: current.lang === k ? undefined : k })} className={chip(current.lang === k)}>{l}</button>)}
      </div>
    </div>
  );
}
