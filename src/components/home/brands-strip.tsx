"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/shared/animated-section";

// Recognisable FMCG names Baidyanath Enterprise supplies. Text only — no
// copyrighted logo images — used purely as a trust signal.
const BRANDS = [
  "Complan",
  "Glucon-D",
  "Sugar Free",
  "Sugar Lite",
  "Dabur",
  "Patanjali",
  "Dettol",
  "Harpic",
];

export default function BrandsStrip() {
  const t = useTranslations("home");

  return (
    <AnimatedSection>
      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t("brands_title")}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-6">
            {BRANDS.map((brand) => (
              <span
                key={brand}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-base font-bold text-slate-500 shadow-sm transition-colors hover:text-primary-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-primary-400"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
