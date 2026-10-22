import { cn } from "@/lib/utils";
export function SectionHeading({ eyebrow, title, sub, light = false, align = "left", className, size = "md" }: { eyebrow?: string; title: string; sub?: string; light?: boolean; align?: "left" | "center"; className?: string; size?: "md" | "lg" }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("mb-3", light ? "eyebrow-light" : "eyebrow")}>{eyebrow}</p>}
      <h2 className={cn(size === "lg" ? "display-lg" : "display-md", light ? "text-white" : "text-ink")}>{title}</h2>
      {sub && <p className={cn("mt-4 text-lg leading-relaxed", light ? "text-white/70" : "text-steel")}>{sub}</p>}
    </div>
  );
}
