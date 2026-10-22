"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Captions, Gauge } from "lucide-react";
import { useLocale } from "@/lib/i18n/client";
import { Badge } from "@/components/ui/badge";
import type { VideoScript } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

type Props = { script: VideoScript; mediaUrl?: string | null; captionsVttUrl?: string | null; seed: string; title: string; onProgress?: (seconds: number, completed: boolean) => void; initialSeconds?: number };

/**
 * Plays approved production footage when a media URL exists; otherwise renders the scripted
 * storyboard scene by scene, labelled as a preview, with narration as captions/transcript.
 */
export function StoryboardPlayer({ script, mediaUrl, captionsVttUrl, seed, title, onProgress, initialSeconds = 0 }: Props) {
  const { locale, t } = useLocale();
  const reduce = useReducedMotion();
  const scenes = script.scenes;
  const total = scenes.reduce((s, x) => s + x.seconds, 0);
  const [elapsed, setElapsed] = useState(Math.min(initialSeconds, total));
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [captions, setCaptions] = useState(true);
  const lastReport = useRef(0);

  // Scene index from elapsed time
  let acc = 0, idx = 0;
  for (let i = 0; i < scenes.length; i++) { if (elapsed < acc + scenes[i].seconds) { idx = i; break; } acc += scenes[i].seconds; idx = i; }
  const scene = scenes[idx];

  useEffect(() => {
    if (!playing || mediaUrl) return;
    const id = setInterval(() => setElapsed((e) => { const n = Math.min(total, e + 0.25 * speed); if (n >= total) setPlaying(false); return n; }), 250);
    return () => clearInterval(id);
  }, [playing, speed, total, mediaUrl]);

  useEffect(() => {
    if (!onProgress) return;
    const completed = elapsed >= total - 0.5;
    if (completed || Math.floor(elapsed) - lastReport.current >= 10) { lastReport.current = Math.floor(elapsed); onProgress(Math.floor(elapsed), completed); }
  }, [elapsed, total, onProgress]);

  if (mediaUrl) {
    return (
      <div className="overflow-hidden rounded-2xl bg-black">
        <video src={mediaUrl} controls className="aspect-video w-full" onTimeUpdate={(e) => { const v = e.currentTarget; onProgress?.(Math.floor(v.currentTime), v.duration > 0 && v.currentTime / v.duration > 0.95); }}>
          {captionsVttUrl && <track kind="captions" src={captionsVttUrl} srcLang={locale} default />}
        </video>
      </div>
    );
  }

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const sceneStart = scenes.slice(0, idx).reduce((s, x) => s + x.seconds, 0);

  return (
    <div className="overflow-hidden rounded-2xl bg-midnight text-white shadow-[var(--shadow-lift)]">
      <div className="relative aspect-video w-full overflow-hidden" aria-label={title}>
        <AnimatePresence mode="wait">
          <motion.div key={idx} className="absolute inset-0" initial={reduce ? false : { opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
            <SceneArt index={idx} seed={seed} />
          </motion.div>
        </AnimatePresence>
        <div className="absolute top-4 left-4 flex gap-2"><Badge tone="white">{t.tv.storyboardMode}</Badge><Badge tone="white">{idx + 1}/{scenes.length}</Badge></div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-5 sm:p-8">
          <p className="eyebrow-light mb-1.5">{scene.title[locale]}</p>
          {captions && <p className="max-w-3xl font-display text-base font-semibold leading-snug sm:text-xl">{scene.narration[locale]}</p>}
          <p className="mt-2 max-w-2xl text-[11px] text-white/50 sm:text-xs"><span className="font-semibold text-white/70">{locale === "fr" ? "Visuel" : "Visual"} · </span>{scene.visual[locale]}</p>
        </div>
        {!playing && (
          <button onClick={() => { if (elapsed >= total) setElapsed(0); setPlaying(true); }} className="absolute inset-0 flex items-center justify-center" aria-label={t.tv.watch}>
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-royal shadow-xl transition hover:scale-105"><Play className="ml-1 h-7 w-7 fill-current" /></span>
          </button>
        )}
      </div>
      <div className="px-4 pt-3 pb-3 sm:px-5">
        <div className="group relative h-1.5 w-full cursor-pointer rounded-full bg-white/15" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setElapsed(((e.clientX - r.left) / r.width) * total); }} role="slider" aria-valuemin={0} aria-valuemax={total} aria-valuenow={Math.floor(elapsed)} tabIndex={0} onKeyDown={(e) => { if (e.key === "ArrowRight") setElapsed((v) => Math.min(total, v + 5)); if (e.key === "ArrowLeft") setElapsed((v) => Math.max(0, v - 5)); }}>
          <div className="h-full rounded-full bg-sky" style={{ width: `${(elapsed / total) * 100}%` }} />
          {scenes.slice(1).map((_, i) => { const st = scenes.slice(0, i + 1).reduce((s, x) => s + x.seconds, 0); return <span key={i} className="absolute top-0 h-full w-px bg-white/40" style={{ left: `${(st / total) * 100}%` }} />; })}
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
          <button onClick={() => setElapsed(Math.max(0, sceneStart - 0.1))} className="rounded-full p-2 hover:bg-white/10" aria-label={t.common.previous}><SkipBack className="h-4 w-4" /></button>
          <button onClick={() => { if (elapsed >= total) setElapsed(0); setPlaying((p) => !p); }} className="rounded-full bg-white/10 p-2 hover:bg-white/20" aria-label={playing ? "Pause" : "Play"}>{playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</button>
          <button onClick={() => setElapsed(Math.min(total, sceneStart + scene.seconds))} className="rounded-full p-2 hover:bg-white/10" aria-label={t.common.next}><SkipForward className="h-4 w-4" /></button>
          <span className="num ml-1 text-white/70">{fmt(elapsed)} / {fmt(total)}</span>
          <div className="ml-auto flex items-center gap-1">
            <button onClick={() => setCaptions((c) => !c)} className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 hover:bg-white/10", captions && "bg-white/15")} aria-pressed={captions}><Captions className="h-4 w-4" /> CC</button>
            <button onClick={() => setSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))} className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 hover:bg-white/10"><Gauge className="h-4 w-4" />{speed}×</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SceneArt({ index, seed }: { index: number; seed: string }) {
  let h = 0; for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const palettes = [["#071A36", "#0B2F73"], ["#0B2F73", "#1265C8"], ["#071A36", "#1265C8"], ["#0B2F73", "#24334A"], ["#1265C8", "#0B2F73"], ["#071A36", "#0F766E"]];
  const [a, b] = palettes[(index + h) % palettes.length];
  const kind = (index + (h >> 3)) % 4;
  const id = `sc${h}${index}`;
  return (
    <svg viewBox="0 0 1600 900" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient></defs>
      <rect width="1600" height="900" fill={`url(#${id})`} />
      <g stroke="#58B8F5" strokeOpacity="0.12">{Array.from({ length: 17 }, (_, i) => <line key={i} x1={i * 100} y1="0" x2={i * 100} y2="900" />)}{Array.from({ length: 10 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 100} x2="1600" y2={i * 100} />)}</g>
      {kind === 0 && Array.from({ length: 10 }, (_, i) => <rect key={i} x={200 + i * 120} y={700 - ((h >> i) % 350) - i * 15} width="60" height={((h >> i) % 350) + i * 15} rx="8" fill="#58B8F5" opacity={0.35 + i * 0.06} />)}
      {kind === 1 && <path d={`M100 ${650 - (h % 80)} C 400 ${600}, 700 ${500 + (h % 60)}, 1000 ${350} S 1400 ${250}, 1500 ${180}`} fill="none" stroke="#58B8F5" strokeWidth="6" strokeLinecap="round" />}
      {kind === 2 && Array.from({ length: 14 }, (_, i) => <circle key={i} cx={150 + ((h >> i) % 1300)} cy={120 + ((h >> (i + 2)) % 650)} r={8 + (i % 4) * 6} fill="#F7FAFF" opacity={0.3 + (i % 5) * 0.12} />)}
      {kind === 3 && [320, 240, 160, 80].map((r, i) => <circle key={r} cx="1100" cy="450" r={r} fill="none" stroke="#58B8F5" strokeOpacity={0.25 + i * 0.15} strokeWidth="26" strokeDasharray={`${r * 3} ${r * 2}`} />)}
    </svg>
  );
}
