import { cn } from "@/lib/utils";

/**
 * Deterministic abstract cover art for courses, videos and events.
 * Replaces stock photography with brand-consistent data-visual compositions.
 */
const THEMES: Record<string, { from: string; to: string; accent: string }> = {
  blue: { from: "#0B2F73", to: "#1265C8", accent: "#58B8F5" },
  midnight: { from: "#071A36", to: "#0B2F73", accent: "#58B8F5" },
  sky: { from: "#1265C8", to: "#58B8F5", accent: "#F7FAFF" },
  teal: { from: "#0B2F73", to: "#0F766E", accent: "#5EEAD4" },
  violet: { from: "#1E1B4B", to: "#3730A3", accent: "#A5B4FC" },
  slate: { from: "#24334A", to: "#0B2F73", accent: "#E8EEF7" },
  amber: { from: "#0B2F73", to: "#8A5D05", accent: "#E0A526" },
  green: { from: "#071A36", to: "#1F9D6A", accent: "#A7F3D0" },
};

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

export function CoverArt({ seed, theme = "blue", className, pattern }: { seed: string; theme?: string; className?: string; pattern?: "bars" | "curve" | "nodes" | "rings" }) {
  const t = THEMES[theme] ?? THEMES.blue;
  const h = hash(seed);
  const p = pattern ?? (["bars", "curve", "nodes", "rings"] as const)[h % 4];
  const id = `g${h.toString(36)}`;
  const bars = Array.from({ length: 9 }, (_, i) => 20 + ((h >> (i * 3)) % 60));
  const pts = Array.from({ length: 8 }, (_, i) => ({ x: 20 + i * 52, y: 150 - ((h >> (i * 2)) % 90) - i * 5 }));
  const nodes = Array.from({ length: 9 }, (_, i) => ({ x: 40 + ((h >> (i * 2)) % 320), y: 30 + ((h >> (i * 3 + 1)) % 140) }));
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" className={cn("h-full w-full", className)} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={t.from} />
          <stop offset="100%" stopColor={t.to} />
        </linearGradient>
        <radialGradient id={`${id}r`} cx="80%" cy="20%" r="70%">
          <stop offset="0%" stopColor={t.accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={t.accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="200" fill={`url(#${id})`} />
      <rect width="400" height="200" fill={`url(#${id}r)`} />
      <g stroke={t.accent} strokeOpacity="0.12" strokeWidth="1">
        {Array.from({ length: 9 }, (_, i) => <line key={i} x1={i * 50} y1="0" x2={i * 50} y2="200" />)}
        {Array.from({ length: 5 }, (_, i) => <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} />)}
      </g>
      {p === "bars" && bars.map((b, i) => <rect key={i} x={40 + i * 36} y={170 - b * 1.6} width="20" height={b * 1.6} rx="4" fill={t.accent} opacity={0.35 + (i / 9) * 0.5} />)}
      {p === "curve" && (
        <>
          <path d={`M${pts.map((q) => `${q.x},${q.y}`).join(" L")} L384,200 L20,200 Z`} fill={t.accent} opacity="0.18" />
          <path d={`M${pts.map((q) => `${q.x},${q.y}`).join(" L")}`} fill="none" stroke={t.accent} strokeWidth="3" strokeLinecap="round" />
          {pts.map((q, i) => <circle key={i} cx={q.x} cy={q.y} r="4" fill="#fff" />)}
        </>
      )}
      {p === "nodes" && (
        <>
          {nodes.map((n, i) => nodes.slice(i + 1, i + 3).map((m, j) => <line key={`${i}${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke={t.accent} strokeOpacity="0.5" strokeWidth="1.5" />))}
          {nodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r={4 + (i % 3) * 2} fill={t.accent} opacity="0.9" />)}
        </>
      )}
      {p === "rings" && (
        <>
          {[90, 70, 50, 30].map((r, i) => <circle key={r} cx="300" cy="110" r={r} fill="none" stroke={t.accent} strokeOpacity={0.25 + i * 0.15} strokeWidth="10" strokeDasharray={`${r * 4} ${r * 2.5}`} transform={`rotate(${(h >> i) % 360} 300 110)`} />)}
          <circle cx="300" cy="110" r="12" fill={t.accent} />
        </>
      )}
    </svg>
  );
}
