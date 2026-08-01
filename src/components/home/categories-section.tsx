"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CATEGORIES } from "@/types/product";
import AnimatedSection from "@/components/shared/animated-section";

export default function CategoriesSection() {
  const t = useTranslations();

  return (
    <AnimatedSection>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          {t("home.shop_by_category")}
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 sm:gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="group flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
            >
              <span className="text-4xl" role="img" aria-hidden="true">
                {category.icon}
              </span>
              <span className="text-base font-medium text-slate-700 group-hover:text-primary-600 dark:text-slate-200 dark:group-hover:text-primary-400">
                {t(`categories.${category.slug}`)}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}
