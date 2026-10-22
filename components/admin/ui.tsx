import { cn } from "@/lib/utils";

export function PageTitle({ title, sub, children }: { title: string; sub?: string; children?: React.ReactNode }) {
  return <div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><h1 className="display-sm text-ink">{title}</h1>{sub && <p className="mt-1 text-sm text-steel">{sub}</p>}</div>{children}</div>;
}
export function Kpi({ label, value, sub, tone = "white" }: { label: string; value: string | number; sub?: string; tone?: "white" | "royal" }) {
  return <div className={cn("rounded-2xl border p-5", tone === "royal" ? "border-royal bg-royal text-white" : "border-mist/70 bg-white")}><p className={cn("text-[11px] font-semibold uppercase tracking-wider", tone === "royal" ? "text-sky" : "text-steel")}>{label}</p><p className="num mt-1 font-display text-3xl font-extrabold">{value}</p>{sub && <p className={cn("mt-1 text-xs", tone === "royal" ? "text-white/70" : "text-steel")}>{sub}</p>}</div>;
}
export function Table({ head, children, className }: { head: string[]; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-x-auto rounded-2xl border border-mist/70 bg-white", className)}>
      <table className="w-full min-w-[640px] text-sm">
        <thead><tr className="border-b border-mist/60 bg-cloud/50 text-left text-[11px] uppercase tracking-wider text-steel">{head.map((h, i) => <th key={i} className="px-4 py-2.5 font-semibold">{h}</th>)}</tr></thead>
        <tbody className="divide-y divide-mist/50">{children}</tbody>
      </table>
    </div>
  );
}
export function Td({ children, className }: { children: React.ReactNode; className?: string }) { return <td className={cn("px-4 py-2.5 align-top", className)}>{children}</td>; }
export const selectCls = "rounded-lg border border-mist bg-white px-2 py-1.5 text-xs";
export const btnCls = "rounded-lg bg-royal px-3 py-1.5 text-xs font-semibold text-white hover:bg-finance";
