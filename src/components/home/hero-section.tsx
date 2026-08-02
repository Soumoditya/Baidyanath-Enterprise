"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { CATEGORIES } from "@/types/product";
import CategoryIcon from "@/components/shared/category-icon";
import { whatsappChatUrl } from "@/lib/whatsapp";

const trustKeys = [
  { key: "genuine", icon: "M9 12l2 2 4-4M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" },
  { key: "price", icon: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
  { key: "delivery", icon: "M3 7h11v8H3zM14 10h4l3 3v2h-7M6.5 18.5A1.5 1.5 0 1 0 6.5 16a1.5 1.5 0 0 0 0 2.5ZM17.5 18.5A1.5 1.5 0 1 0 17.5 16a1.5 1.5 0 0 0 0 2.5Z" },
] as const;

export default function HeroSection() {
  const t = useTranslations("home");
  const tCat = useTranslations("categories");

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-primary-50 via-white to-white dark:border-slate-800 dark:from-primary-950 dark:via-slate-900 dark:to-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8 lg:py-24">
        {/* Left: copy */}
        <div className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1.5 text-sm font-semibold text-primary-700 dark:border-primary-800 dark:bg-primary-900/40 dark:text-primary-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-600" />
            </span>
            {t("hero_eyebrow")}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
          >
            {t("hero_title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mx-auto mt-5 max-w-xl text-balance text-lg leading-8 text-slate-600 lg:mx-0 dark:text-slate-300"
          >
            {t("hero_subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center"
          >
            <Link
              href="/products"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-7 py-3.5 text-base font-semibold text-white shadow-[var(--shadow-lift)] transition-all hover:-translate-y-0.5 hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:w-auto"
            >
              {t("hero_browse")}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <a
              href={whatsappChatUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-green-600 bg-white px-7 py-3.5 text-base font-semibold text-green-700 transition-colors hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:w-auto dark:bg-transparent dark:text-green-400 dark:hover:bg-green-950/30"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
              {t("hero_whatsapp")}
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start"
          >
            {trustKeys.map((b) => (
              <li key={b.key} className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d={b.icon} /></svg>
                </span>
                {t(`trust_${b.key}`)}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Right: category tile visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 lg:mt-0"
        >
          <div className="relative mx-auto grid max-w-md grid-cols-2 gap-4 sm:gap-5">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-primary-600/10 blur-2xl dark:bg-primary-500/10" />
            {CATEGORIES.slice(0, 4).map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className={`group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-primary-300 dark:border-slate-700 dark:bg-slate-800/80 ${i % 2 === 1 ? "mt-6" : ""}`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white dark:bg-primary-900/40 dark:text-primary-300">
                  <CategoryIcon slug={cat.slug} className="h-6 w-6" />
                </span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {tCat(cat.slug)}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
