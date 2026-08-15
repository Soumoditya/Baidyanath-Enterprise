"use client";

import { Link } from "@/i18n/navigation";

interface LogoProps {
  /** Hide the wordmark and show only the mark (e.g. tight mobile bars). */
  compact?: boolean;
}

/**
 * Brand mark: a rounded shield (trust) holding a stylised "B" formed from two
 * stacked package bars (distribution), with a check cut into the lower bar for
 * "genuine products".
 */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[0.7rem] bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 shadow-sm ring-1 ring-primary-900/10 ${className}`}
    >
      {/* soft highlight */}
      <span className="pointer-events-none absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white/25 blur-[2px]" />
      <svg
        viewBox="0 0 32 32"
        fill="none"
        className="relative h-[62%] w-[62%]"
        aria-hidden="true"
      >
        {/* upper package bar */}
        <rect x="6" y="6" width="17" height="8.5" rx="3" fill="white" fillOpacity="0.95" />
        {/* lower package bar */}
        <rect x="6" y="17.5" width="20" height="8.5" rx="3" fill="white" fillOpacity="0.8" />
        {/* verification check on the lower bar */}
        <path
          d="M10.5 21.8l2.4 2.4 4.6-4.9"
          stroke="#1d4ed8"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function Logo({ compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Baidyanath Enterprise — Home"
      className="group flex items-center gap-2.5"
    >
      <LogoMark className="h-10 w-10 transition-transform duration-300 group-hover:scale-105" />

      {!compact && (
        <span className="flex min-w-0 flex-col leading-none">
          <span className="font-display truncate text-[1.05rem] text-slate-900 sm:text-lg dark:text-white">
            Baidyanath
          </span>
          <span className="mt-0.5 truncate text-[10px] font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
            Enterprise
          </span>
        </span>
      )}
    </Link>
  );
}
