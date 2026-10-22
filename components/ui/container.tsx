import { cn } from "@/lib/utils";
export function Container({ className, children, size = "lg" }: { className?: string; children: React.ReactNode; size?: "sm" | "md" | "lg" | "xl" }) {
  const w = { sm: "max-w-3xl", md: "max-w-5xl", lg: "max-w-7xl", xl: "max-w-[88rem]" }[size];
  return <div className={cn("mx-auto w-full px-5 sm:px-8", w, className)}>{children}</div>;
}
