import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "accent" | "outline" | "ghost" | "whatsapp" | "danger";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-[var(--shadow-lift)]",
  accent:
    "bg-accent-500 text-white hover:bg-accent-600 shadow-sm",
  outline:
    "border-2 border-primary-600 text-primary-700 hover:bg-primary-50 dark:border-primary-500 dark:text-primary-300 dark:hover:bg-primary-950/30",
  ghost:
    "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
  whatsapp: "bg-green-600 text-white hover:bg-green-700 shadow-sm",
  danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-base rounded-xl gap-2",
  lg: "px-7 py-3.5 text-base sm:text-lg rounded-xl gap-2",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
}

/** Shared button styles. For links, apply `buttonClasses(...)` to an <a>/<Link>. */
export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  block = false
) {
  return cn(
    "inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-60 disabled:pointer-events-none",
    VARIANTS[variant],
    SIZES[size],
    block && "w-full"
  );
}

export default function Button({
  variant = "primary",
  size = "md",
  block = false,
  className,
  ...props
}: ButtonProps) {
  return <button className={cn(buttonClasses(variant, size, block), className)} {...props} />;
}
