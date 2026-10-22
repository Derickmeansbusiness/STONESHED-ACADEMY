import { cn } from "@/lib/utils";

/**
 * Stoneshed Academy wordmark. The official Stoneshed Asset Management logo file was not
 * supplied with the project; this mark follows the brand palette and is to be replaced by
 * the official asset (see implementation report).
 */
export function Logo({ className, light = false, compact = false }: { className?: string; light?: boolean; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden className="shrink-0">
        <rect x="1" y="1" width="32" height="32" rx="9" fill={light ? "#ffffff" : "#0B2F73"} />
        <path d="M9 22.5 L17 9 L25 22.5 Z" fill={light ? "#0B2F73" : "#58B8F5"} opacity="0.95" />
        <path d="M12.5 22.5 L17 15 L21.5 22.5 Z" fill={light ? "#58B8F5" : "#0B2F73"} />
        <rect x="8" y="24" width="18" height="2.2" rx="1.1" fill={light ? "#0B2F73" : "#F7FAFF"} />
      </svg>
      {!compact && (
        <span className={cn("font-display leading-none", light ? "text-white" : "text-royal")}>
          <span className="block text-[15px] font-extrabold tracking-[0.12em]">STONESHED</span>
          <span className={cn("block text-[10px] font-semibold tracking-[0.32em]", light ? "text-sky" : "text-finance")}>ACADEMY</span>
        </span>
      )}
    </span>
  );
}
