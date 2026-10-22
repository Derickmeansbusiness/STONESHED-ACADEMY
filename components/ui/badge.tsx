import { cn } from "@/lib/utils";
type Tone = "blue" | "sky" | "gray" | "green" | "amber" | "red" | "dark" | "white";
const tones: Record<Tone, string> = {
  blue: "bg-royal/10 text-royal",
  sky: "bg-sky/20 text-royal",
  gray: "bg-cloud text-steel",
  green: "bg-success/10 text-success",
  amber: "bg-amber/15 text-[#8a5d05]",
  red: "bg-danger/10 text-danger",
  dark: "bg-midnight text-white",
  white: "bg-white/15 text-white backdrop-blur",
};
export function Badge({ tone = "blue", className, children }: { tone?: Tone; className?: string; children: React.ReactNode }) {
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider", tones[tone], className)}>{children}</span>;
}
