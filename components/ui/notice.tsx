import { Info, AlertTriangle, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
type Tone = "info" | "warning" | "compliance" | "demo";
const styles: Record<Tone, { cls: string; Icon: typeof Info }> = {
  info: { cls: "border-sky/40 bg-sky/10 text-slate", Icon: Info },
  warning: { cls: "border-amber/40 bg-amber/10 text-[#5c3d03]", Icon: AlertTriangle },
  compliance: { cls: "border-royal/20 bg-royal/5 text-slate", Icon: ShieldCheck },
  demo: { cls: "border-dashed border-steel/40 bg-cloud/60 text-steel", Icon: Sparkles },
};
export function Notice({ tone = "info", title, children, className }: { tone?: Tone; title?: string; children: React.ReactNode; className?: string }) {
  const { cls, Icon } = styles[tone];
  return (
    <div className={cn("flex gap-3 rounded-2xl border px-4 py-3.5 text-sm leading-relaxed", cls, className)} role="note">
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      <div>
        {title && <p className="mb-0.5 font-semibold">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}
