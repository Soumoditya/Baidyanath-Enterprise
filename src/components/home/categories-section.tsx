"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CATEGORIES } from "@/types/product";
import CategoryIcon from "@/components/shared/category-icon";
import AnimatedSection from "@/components/shared/animated-section";

export default function CategoriesSection() {
  const t = useTranslations("home");
  const tCat = useTranslations("categories");
  const tDesc = useTranslations("cat_desc");

  return (
    <AnimatedSection>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {t("categories_title")}
          </h2>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
            {t("categories_subtitle")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-primary-700"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white dark:bg-primary-900/40 dark:text-primary-300">
                <CategoryIcon slug={category.slug} className="h-7 w-7" />
              </span>
              <span className="min-w-0">
                <span className="block text-lg font-bold text-slate-900 dark:text-white">
                  {tCat(category.slug)}
                </span>
                <span className="mt-0.5 block truncate text-sm text-slate-500 dark:text-slate-400">
                  {tDesc(category.slug)}
                </span>
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="ml-auto h-5 w-5 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-primary-600 dark:text-slate-600">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </Link>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}
