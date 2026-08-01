"use client";

import { Link } from "@/i18n/navigation";

interface LogoProps {
  /** Hide the wordmark and show only the monogram tile (e.g. tight mobile bars). */
  compact?: boolean;
}

export default function Logo({ compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Baidyanath Enterprise — Home"
      className="group flex items-center gap-2.5"
    >
      {/* Monogram tile */}
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-sm ring-1 ring-primary-700/20 transition-transform duration-300 group-hover:scale-105">
        <span className="text-sm font-extrabold tracking-tight text-white">
          BE
        </span>
        <span className="pointer-events-none absolute -right-3 -top-3 h-6 w-6 rounded-full bg-white/20" />
      </span>

      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg dark:text-white">
            Baidyanath
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400">
            Enterprise
          </span>
        </span>
      )}
    </Link>
  );
}
