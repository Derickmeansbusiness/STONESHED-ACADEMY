"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";

type Term = { slug: string; term: string; other: string; definition: string; category: string; related: string[] };

export function GlossaryBrowser({ terms }: { terms: Term[] }) {
  const { t, locale } = useLocale();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | undefined>();
  const cats = Array.from(new Set(terms.map((x) => x.category))).sort();
  const sorted = useMemo(() => [...terms].sort((a, b) => a.term.localeCompare(b.term, locale)), [terms, locale]);
  const filtered = sorted.filter((x) => (!cat || x.category === cat) && (!q || `${x.term} ${x.other} ${x.definition}`.toLowerCase().includes(q.toLowerCase())));
  const bySlug = new Map(terms.map((x) => [x.slug, x]));
  const letters = Array.from(new Set(filtered.map((x) => x.term[0].toUpperCase())));
  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <label className="relative block"><Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-steel" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.insights.searchGlossary} className="w-full rounded-full border border-mist bg-white py-2.5 pr-4 pl-11 text-sm outline-none focus:border-finance" /></label>
        <div className="flex flex-wrap gap-1.5"><button onClick={() => setCat(undefined)} className={cn("rounded-full border px-3 py-1 text-xs font-semibold", !cat ? "border-royal bg-royal text-white" : "border-mist bg-white text-steel")}>{t.common.all}</button>{cats.map((c) => <button key={c} onClick={() => setCat(cat === c ? undefined : c)} className={cn("rounded-full border px-3 py-1 text-xs font-semibold", cat === c ? "border-royal bg-royal text-white" : "border-mist bg-white text-steel hover:border-finance")}>{c}</button>)}</div>
        <div className="flex flex-wrap gap-1">{letters.map((l) => <a key={l} href={`#g-${l}`} className="rounded-md px-2 py-1 text-xs font-bold text-finance hover:bg-cloud">{l}</a>)}</div>
        <p className="text-xs text-steel">{filtered.length} {locale === "fr" ? "termes" : "terms"}</p>
      </aside>
      <div className="space-y-3">
        {filtered.length === 0 && <p className="text-steel">{t.insights.noResults}</p>}
        {filtered.map((x, i) => {
          const first = x.term[0].toUpperCase();
          const newLetter = i === 0 || filtered[i - 1].term[0].toUpperCase() !== first;
          return (
            <div key={x.slug}>
              {newLetter && <p id={`g-${first}`} className="num scroll-mt-28 pt-4 pb-2 font-display text-2xl font-extrabold text-sky">{first}</p>}
              <div id={x.slug} className="scroll-mt-28 rounded-2xl border border-mist/70 bg-white p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="font-display text-lg font-bold text-ink">{x.term}</h3><span className="text-xs text-steel">{locale === "fr" ? "EN" : "FR"}: {x.other} · {x.category}</span></div>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{x.definition}</p>
                {x.related.length > 0 && <p className="mt-3 flex flex-wrap gap-1.5 text-xs">{x.related.map((r) => bySlug.get(r)).filter(Boolean).map((r) => <a key={r!.slug} href={`#${r!.slug}`} className="rounded-full bg-cloud px-2.5 py-1 font-semibold text-royal hover:bg-sky/30">{r!.term}</a>)}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
