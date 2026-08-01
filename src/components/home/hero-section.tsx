"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";

export default function HeroSection() {
  const t = useTranslations("home");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white dark:from-primary-950 dark:to-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
          >
            {t("hero_title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300"
          >
            {t("hero_subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/products"
              className="inline-flex w-full items-center justify-center rounded-lg bg-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:w-auto"
            >
              {t("hero_browse_products")}
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-lg border-2 border-primary-600 px-8 py-3.5 text-base font-semibold text-primary-600 transition-colors hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 sm:w-auto dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950"
            >
              {t("hero_contact_us")}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
