"use client";
import { motion } from "framer-motion";
export function ProgressRing({ value, size = 120 }: { value: number; size?: number }) {
  const r = (size - 14) / 2, c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.15)" strokeWidth="12" fill="none" />
        <motion.circle cx={size / 2} cy={size / 2} r={r} stroke="#58B8F5" strokeWidth="12" fill="none" strokeLinecap="round" strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c - (c * value) / 100 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="num font-display text-2xl font-extrabold text-white">{value}%</span></div>
    </div>
  );
}
