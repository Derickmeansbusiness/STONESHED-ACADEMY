"use client";
import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";

/** Camera-based ticket scanner using the browser BarcodeDetector API where available; falls back to manual entry. */
export function QrScanner({ label }: { label: string }) {
  const [on, setOn] = useState(false);
  const [supported, setSupported] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => { setSupported(typeof window !== "undefined" && "BarcodeDetector" in window); }, []);
  useEffect(() => {
    if (!on) return;
    let stream: MediaStream | null = null; let raf = 0;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (video.current) { video.current.srcObject = stream; await video.current.play(); }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const detector = new (window as any).BarcodeDetector({ formats: ["qr_code"] });
        const tick = async () => {
          if (!video.current) return;
          try { const codes = await detector.detect(video.current); const v = codes[0]?.rawValue as string | undefined; if (v?.startsWith("SA-TICKET:")) { const input = document.querySelector<HTMLInputElement>('input[name="ticketCode"]'); if (input) { input.value = v.slice(10); input.form?.requestSubmit(); } setOn(false); return; } } catch {}
          raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      } catch { setOn(false); }
    })();
    return () => { cancelAnimationFrame(raf); stream?.getTracks().forEach((t) => t.stop()); };
  }, [on]);
  if (!supported) return <p className="text-xs text-steel">{label}: {typeof window !== "undefined" ? "BarcodeDetector API not available in this browser — use manual entry." : ""}</p>;
  return (
    <div>
      <button type="button" onClick={() => setOn((v) => !v)} className="inline-flex items-center gap-2 rounded-lg border border-mist px-3 py-2 text-xs font-semibold hover:border-finance"><Camera className="h-4 w-4" />{label}</button>
      {on && <video ref={video} className="mt-3 aspect-video w-full rounded-xl bg-black" muted playsInline />}
    </div>
  );
}
