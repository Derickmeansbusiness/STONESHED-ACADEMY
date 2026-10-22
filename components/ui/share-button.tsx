"use client";
import { useState } from "react";
import { Share2, Check } from "lucide-react";
export function ShareButton({ label, copied, dark = false }: { label: string; copied: string; dark?: boolean }) {
  const [done, setDone] = useState(false);
  return (
    <button onClick={async () => { try { if (navigator.share) await navigator.share({ url: window.location.href }); else { await navigator.clipboard.writeText(window.location.href); setDone(true); setTimeout(() => setDone(false), 1500); } } catch {} }} className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold ${dark ? "border-white/20 hover:bg-white/10" : "border-mist bg-white text-steel hover:border-finance"}`}>
      {done ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}{done ? copied : label}
    </button>
  );
}
