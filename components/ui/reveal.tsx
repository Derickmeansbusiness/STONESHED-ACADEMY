"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Fallback: content becomes visible after a short delay even if the intersection observer never fires. */
function useSafety(ms = 2200) {
  const [forced, setForced] = useState(false);
  useEffect(() => { const id = setTimeout(() => setForced(true), ms); return () => clearTimeout(id); }, [ms]);
  return forced;
}

export function Reveal({ children, className, delay = 0, y = 24, once = true, immediate = false }: { children: React.ReactNode; className?: string; delay?: number; y?: number; once?: boolean; immediate?: boolean }) {
  const reduce = useReducedMotion();
  const forced = useSafety();
  const now = immediate || forced;
  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? false : { opacity: 0, y }}
      animate={now ? { opacity: 1, y: 0 } : undefined}
      whileInView={now ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.1 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const forced = useSafety();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      animate={forced ? "show" : undefined}
      whileInView={forced ? undefined : "show"}
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}>
      {children}
    </motion.div>
  );
}
