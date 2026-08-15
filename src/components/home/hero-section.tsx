"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { CATEGORIES } from "@/types/product";
import CategoryIcon from "@/components/shared/category-icon";
import AnimatedCounter from "@/components/shared/animated-counter";
import OpenStatus from "@/components/shared/open-status";
import { whatsappChatUrl } from "@/lib/whatsapp";
import { buttonClasses } from "@/components/ui/button";

const trustKeys = [
  { key: "genuine", icon: "M9 12l2 2 4-4M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" },
  { key: "price", icon: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
  { key: "delivery", icon: "M3 7h11v8H3zM14 10h4l3 3v2h-7M6.5 18.5A1.5 1.5 0 1 0 6.5 16a1.5 1.5 0 0 0 0 2.5ZM17.5 18.5A1.5 1.5 0 1 0 17.5 16a1.5 1.5 0 0 0 0 2.5Z" },
] as const;

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function HeroSection() {
  const t = useTranslations("home");

  return (
    <section className="relative overflow-hidden bg-mesh grain border-b border-slate-200/60 dark:border-slate-800">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12 lg:px-8 lg:py-20">
        {/* Left: copy */}
        <div className="text-center lg:text-left">
          <motion.div variants={fade} custom={0} initial="hidden" animate="show" className="flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-200/70 bg-white/70 px-3.5 py-1.5 text-sm font-semibold text-primary-700 backdrop-blur dark:border-primary-800 dark:bg-white/5 dark:text-primary-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
              </span>
              {t("hero_eyebrow")}
            </span>
          </motion.div>

          <motion.h1
            variants={fade}
            custom={1}
            initial="hidden"
            animate="show"
            className="font-display mt-5 text-balance text-[2.6rem] leading-[1.05] text-slate-900 sm:text-6xl lg:text-[4.1rem] dark:text-white"
          >
            {t("hero_title")}
          </motion.h1>

          <motion.p
            variants={fade}
            custom={2}
            initial="hidden"
            animate="show"
            className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-8 text-slate-600 lg:mx-0 dark:text-slate-300"
          >
            {t("hero_subtitle")}
          </motion.p>

          <motion.div
            variants={fade}
            custom={3}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Link href="/products" className={buttonClasses("primary", "lg")}>
              {t("hero_browse")}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <a href={whatsappChatUrl()} target="_blank" rel="noopener noreferrer" className={buttonClasses("whatsapp", "lg")}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
              {t("hero_whatsapp")}
            </a>
          </motion.div>

          <motion.ul variants={fade} custom={4} initial="hidden" animate="show" className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start">
            {trustKeys.map((b) => (
              <li key={b.key} className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-primary-600 shadow-sm dark:bg-white/10 dark:text-primary-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d={b.icon} /></svg>
                </span>
                {t(`trust_${b.key}`)}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Right: bento */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid auto-rows-[minmax(0,1fr)] grid-cols-2 gap-3 sm:gap-4"
        >
          {/* Big brand/quality tile */}
          <div className="relative col-span-2 overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-6 text-white shadow-[var(--shadow-glow)]">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent-400/30 blur-2xl" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary-100">
                {t("serving")}
              </p>
              <p className="font-display mt-2 text-2xl leading-tight sm:text-3xl">
                {t("bento_quality_title")}
              </p>
              <p className="mt-1 text-sm text-primary-100">{t("bento_quality_text")}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <span key={c.slug} className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur">
                    <CategoryIcon slug={c.slug} className="h-5 w-5" />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stat: products */}
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-[var(--shadow-card)] backdrop-blur dark:border-slate-700 dark:bg-white/5">
            <p className="font-display text-3xl text-primary-600 dark:text-primary-400">
              <AnimatedCounter to={20} suffix="+" />
            </p>
            <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">{t("stat_products")}</p>
          </div>

          {/* Stat: brands */}
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-[var(--shadow-card)] backdrop-blur dark:border-slate-700 dark:bg-white/5">
            <p className="font-display text-3xl text-accent-500">
              <AnimatedCounter to={8} suffix="+" />
            </p>
            <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">{t("stat_brands")}</p>
          </div>

          {/* Open now + hours tile */}
          <Link
            href="/contact"
            className="col-span-2 flex items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-[var(--shadow-card)] backdrop-blur transition-colors hover:border-primary-300 dark:border-slate-700 dark:bg-white/5"
          >
            <div className="min-w-0">
              <OpenStatus variant="full" />
              <p className="mt-2 truncate text-sm text-slate-600 dark:text-slate-300">
                Mon–Sat · 9 AM – 6 PM
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400">
              {t("view_hours")}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M9 6l6 6-6 6" /></svg>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
