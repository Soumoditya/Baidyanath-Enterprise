"use client";

import { useTranslations } from "next-intl";

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
  "Vicks",
  "Colgate",
];

export default function BrandsStrip() {
  const t = useTranslations("home");
  // Duplicate the list so the marquee can loop seamlessly (-50% translate).
  const row = [...BRANDS, ...BRANDS];

  return (
    <section className="border-y border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-ink-900">
      <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {t("brands_title")}
      </p>
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track gap-3 sm:gap-4">
          {row.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-base font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
