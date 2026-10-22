"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type StoryboardFrame = { title: string; visual: string; narration: string; seconds: number };

export function FilmModal({ frames, mediaUrl, label, trigger = "primary" }: { frames: StoryboardFrame[]; mediaUrl?: string | null; label: string; trigger?: "primary" | "light" | "outline" }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!open || !playing || mediaUrl) return;
    const id = setTimeout(() => setI((v) => (v + 1) % frames.length), Math.max(2500, frames[i].seconds * 1000));
    return () => clearTimeout(id);
  }, [open, playing, i, frames, mediaUrl]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); if (e.key === "ArrowRight") setI((v) => (v + 1) % frames.length); if (e.key === "ArrowLeft") setI((v) => (v - 1 + frames.length) % frames.length); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, frames.length]);

  const f = frames[i];
  return (
    <>
      <Button variant={trigger} size="lg" onClick={() => { setOpen(true); setI(0); setPlaying(true); }}>
        <Play className="h-4 w-4 fill-current" /> {label}
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} role="dialog" aria-modal aria-label={t.home.filmTitle}>
            <motion.div className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-midnight shadow-2xl" initial={{ scale: 0.96, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 20 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setOpen(false)} className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20" aria-label={t.nav.close}><X className="h-5 w-5" /></button>
              {mediaUrl ? (
                <video src={mediaUrl} controls autoPlay className="aspect-video w-full bg-black" />
              ) : (
                <div className="relative aspect-video w-full overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }}>
                      <FrameArt index={i} />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                    <Badge tone="white">{t.tv.storyboardMode} · {i + 1}/{frames.length}</Badge>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent p-6 sm:p-10">
                    <p className="eyebrow-light mb-2">{f.title}</p>
                    <p className="max-w-3xl font-display text-lg font-semibold leading-snug text-white sm:text-2xl">{f.narration}</p>
                    <p className="mt-3 max-w-2xl text-xs text-white/55 sm:text-sm"><span className="font-semibold text-white/70">Visual · </span>{f.visual}</p>
                  </div>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button onClick={() => { setI((v) => (v - 1 + frames.length) % frames.length); setPlaying(false); }} className="rounded-full bg-white/10 p-2 text-white hover:bg-white/25" aria-label={t.common.previous}><ChevronLeft className="h-5 w-5" /></button>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <button onClick={() => { setI((v) => (v + 1) % frames.length); setPlaying(false); }} className="rounded-full bg-white/10 p-2 text-white hover:bg-white/25" aria-label={t.common.next}><ChevronRight className="h-5 w-5" /></button>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex h-1 bg-white/10">
                    {frames.map((_, k) => <div key={k} className={`flex-1 transition-colors ${k <= i ? "bg-sky" : "bg-transparent"}`} />)}
                  </div>
                </div>
              )}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-3 text-xs text-white/60">
                <span>{t.home.filmNotice}</span>
                {!mediaUrl && <button onClick={() => setPlaying((p) => !p)} className="rounded-full border border-white/20 px-3 py-1 font-semibold text-white hover:bg-white/10">{playing ? "Pause" : "Play"}</button>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FrameArt({ index }: { index: number }) {
  const palettes = [["#071A36", "#0B2F73"], ["#0B2F73", "#1265C8"], ["#071A36", "#1265C8"], ["#0B2F73", "#071A36"], ["#1265C8", "#0B2F73"], ["#071A36", "#24334A"]];
  const [a, b] = palettes[index % palettes.length];
  return (
    <svg viewBox="0 0 1600 900" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id={`fm${index}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient>
        <radialGradient id={`fr${index}`} cx="70%" cy="30%" r="60%"><stop offset="0" stopColor="#58B8F5" stopOpacity="0.35" /><stop offset="1" stopColor="#58B8F5" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="1600" height="900" fill={`url(#fm${index})`} />
      <rect width="1600" height="900" fill={`url(#fr${index})`} />
      <g stroke="#58B8F5" strokeOpacity="0.15">
        {Array.from({ length: 17 }, (_, i) => <line key={i} x1={i * 100} y1="0" x2={i * 100} y2="900" />)}
        {Array.from({ length: 10 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 100} x2="1600" y2={i * 100} />)}
      </g>
      <g fill="none" stroke="#58B8F5" strokeWidth="4" strokeLinecap="round" opacity="0.9">
        <path d={`M100 ${700 - index * 30} C 400 ${620 - index * 20}, 700 ${560 + index * 15}, 1000 ${380 - index * 10} S 1400 ${220 + index * 10}, 1500 ${180}`} />
      </g>
      {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={150 + i * 120 + (index * 37) % 60} cy={400 + Math.sin(i + index) * 160} r={6 + (i % 3) * 4} fill="#F7FAFF" opacity={0.5 + (i % 4) * 0.12} />)}
    </svg>
  );
}
