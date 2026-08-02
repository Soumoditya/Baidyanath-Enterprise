"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

/** Small "scroll to top" button that appears after scrolling down. */
export default function BackToTop() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible || pathname.startsWith("/admin")) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("back_to_top")}
      className="fixed bottom-4 left-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-md backdrop-blur transition-transform duration-200 hover:scale-110 hover:text-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:bottom-6 sm:left-6 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-200"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
