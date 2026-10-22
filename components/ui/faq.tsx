"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-mist/70 rounded-2xl border border-mist/70 bg-white">
      {items.map((it, i) => (
        <div key={i}>
          <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-[15px] font-bold text-ink" aria-expanded={open === i}>{it.q}<ChevronDown className={`h-4 w-4 shrink-0 text-steel transition ${open === i ? "rotate-180" : ""}`} /></button>
          <AnimatePresence initial={false}>{open === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><p className="px-5 pb-5 text-sm leading-relaxed text-slate">{it.a}</p></motion.div>}</AnimatePresence>
        </div>
      ))}
    </div>
  );
}
