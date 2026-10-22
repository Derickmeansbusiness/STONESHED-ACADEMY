"use client";
import { useEffect, useRef } from "react";

/**
 * Abstract 3D-inspired network of financial data points and knowledge pathways.
 * Pure canvas; no heavy 3D dependency, degrades gracefully with reduced-motion.
 */
export function HeroNetwork() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0, h = 0, dpr = 1;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    type Node = { x: number; y: number; z: number; vx: number; vy: number; vz: number; r: number; pulse: number };
    const nodes: Node[] = [];
    const COUNT = () => (w < 640 ? 46 : w < 1024 ? 72 : 110);

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth; h = canvas!.clientHeight;
      canvas!.width = w * dpr; canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes.length = 0;
      for (let i = 0; i < COUNT(); i++) {
        nodes.push({ x: Math.random() * w, y: Math.random() * h, z: Math.random(), vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18, vz: (Math.random() - 0.5) * 0.0008, r: 1 + Math.random() * 2, pulse: Math.random() * Math.PI * 2 });
      }
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h);
      mouse.x += (mouse.tx - mouse.x) * 0.04; mouse.y += (mouse.ty - mouse.y) * 0.04;
      const px = (mouse.x - 0.5) * 40, py = (mouse.y - 0.5) * 30;

      // depth-sorted
      const sorted = [...nodes].sort((a, b) => a.z - b.z);
      // edges
      for (let i = 0; i < sorted.length; i++) {
        const a = sorted[i];
        for (let j = i + 1; j < sorted.length; j++) {
          const b = sorted[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          const max = 150 + 90 * Math.min(a.z, b.z);
          if (d2 < max * max) {
            const alpha = (1 - Math.sqrt(d2) / max) * 0.22 * (0.4 + a.z * 0.6);
            ctx!.strokeStyle = `rgba(88,184,245,${alpha})`;
            ctx!.lineWidth = 0.6 + a.z * 0.6;
            ctx!.beginPath();
            ctx!.moveTo(a.x + px * a.z, a.y + py * a.z);
            ctx!.lineTo(b.x + px * b.z, b.y + py * b.z);
            ctx!.stroke();
          }
        }
      }
      // nodes
      for (const n of sorted) {
        const glow = 0.5 + 0.5 * Math.sin(t * 0.0012 + n.pulse);
        const r = n.r * (0.6 + n.z * 0.9) * (0.9 + glow * 0.3);
        const x = n.x + px * n.z, y = n.y + py * n.z;
        const g = ctx!.createRadialGradient(x, y, 0, x, y, r * 4);
        g.addColorStop(0, `rgba(88,184,245,${0.55 * (0.3 + n.z)})`);
        g.addColorStop(1, "rgba(88,184,245,0)");
        ctx!.fillStyle = g;
        ctx!.beginPath(); ctx!.arc(x, y, r * 4, 0, Math.PI * 2); ctx!.fill();
        ctx!.fillStyle = `rgba(247,250,255,${0.5 + n.z * 0.5})`;
        ctx!.beginPath(); ctx!.arc(x, y, r, 0, Math.PI * 2); ctx!.fill();
        if (!reduce) {
          n.x += n.vx; n.y += n.vy; n.z += n.vz;
          if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20;
          if (n.z < 0 || n.z > 1) n.vz *= -1;
        }
      }
      // travelling pulses along a few pathways
      if (!reduce) {
        const k = 6;
        for (let i = 0; i < k; i++) {
          const a = sorted[(i * 13) % sorted.length], b = sorted[(i * 29 + 7) % sorted.length];
          const p = ((t * 0.00025) + i / k) % 1;
          const x = a.x + (b.x - a.x) * p + px * a.z, y = a.y + (b.y - a.y) * p + py * a.z;
          ctx!.fillStyle = "rgba(255,255,255,0.9)";
          ctx!.beginPath(); ctx!.arc(x, y, 1.6, 0, Math.PI * 2); ctx!.fill();
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    }

    const onMove = (e: PointerEvent) => { mouse.tx = e.clientX / window.innerWidth; mouse.ty = e.clientY / window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", onMove); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
