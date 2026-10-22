import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "light" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-[var(--ease-premium)] disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap";
const variants: Record<Variant, string> = {
  primary: "bg-royal text-white hover:bg-finance hover:shadow-[var(--shadow-glow)] hover:-translate-y-px",
  secondary: "bg-finance text-white hover:bg-royal hover:-translate-y-px",
  ghost: "text-royal hover:bg-cloud",
  outline: "border border-mist bg-white text-royal hover:border-finance hover:bg-porcelain",
  light: "bg-white text-royal hover:bg-sky/20 hover:-translate-y-px",
  danger: "bg-danger text-white hover:bg-red-700",
};
const sizes: Record<Size, string> = { sm: "h-9 px-4 text-sm", md: "h-11 px-6 text-[15px]", lg: "h-13 px-8 text-base" };

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  href?: string;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({ variant = "primary", size = "md", className, href, children, ...rest }: Props) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
