"use client";
import { useState } from "react";
import { useLocale } from "@/lib/i18n/client";
import type { Still as StillType } from "@/lib/content/generated-media";
import { cn } from "@/lib/utils";

/** Renders an AI-generated concept still with a caption; hides itself if the asset cannot be loaded. */
export function Still({ still, className, caption = true, overlay = false, priority = false }: { still: StillType; className?: string; caption?: boolean; overlay?: boolean; priority?: boolean }) {
  const { locale } = useLocale();
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <figure className={cn("relative overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={still.url} alt={still.alt[locale]} loading={priority ? "eager" : "lazy"} onError={() => setFailed(true)} className={cn("h-full w-full object-cover", overlay && "opacity-30")} />
      {caption && !overlay && <figcaption className="absolute right-3 bottom-3 rounded-full bg-ink/60 px-2.5 py-1 text-[10px] font-medium text-white/85 backdrop-blur">{locale === "fr" ? "Image conceptuelle IA · en attente d'approbation" : "AI concept image · pending brand approval"}</figcaption>}
    </figure>
  );
}
