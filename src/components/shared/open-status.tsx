"use client";

import { useEffect, useState } from "react";
import { getOpenStatus } from "@/lib/store-hours";
import { cn } from "@/lib/utils";

interface OpenStatusProps {
  className?: string;
  /** compact = dot + word only; full adds the closing/opening time */
  variant?: "compact" | "full";
}

/**
 * Live "Open now / Closed" pill computed in IST. Renders nothing until mounted
 * to avoid a hydration mismatch (server and client clocks differ).
 */
export default function OpenStatus({ className, variant = "compact" }: OpenStatusProps) {
  const [status, setStatus] = useState<ReturnType<typeof getOpenStatus> | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) return null;

  const open = status.open;
  const detail =
    variant === "full"
      ? open
        ? status.until != null && status.until <= 60
          ? ` · closes in ${status.until} min`
          : ` · until ${status.today.close}`
        : status.today.openMin != null
          ? ` · opens ${status.today.open}`
          : " · opens Monday"
      : "";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        open
          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        {open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        )}
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            open ? "bg-green-500" : "bg-slate-400"
          )}
        />
      </span>
      {open ? "Open now" : "Closed"}
      {detail}
    </span>
  );
}
