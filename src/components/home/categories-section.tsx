"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CATEGORIES } from "@/types/product";
import CategoryIcon from "@/components/shared/category-icon";
import Reveal from "@/components/shared/reveal";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

// Bento sizing: the first tile spans two columns on larger screens for rhythm.
const SPAN: Record<number, string> = {
  0: "sm:col-span-2",
};

export default function CategoriesSection() {
  const t = useTranslations("home");
  const tCat = useTranslations("categories");
  const tDesc = useTranslations("cat_desc");

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            title={t("categories_title")}
            subtitle={t("categories_subtitle")}
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3">
          {CATEGORIES.map((category, i) => (
            <Reveal key={category.slug} delay={i * 0.05} className={cn("h-full", SPAN[i])}>
              <Link
                href={`/products?category=${category.slug}`}
                className="group relative flex h-full min-h-[8.5rem] flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-primary-700"
              >
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-primary-900/30" />
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 transition-colors duration-300 group-hover:bg-primary-600 group-hover:text-white dark:bg-primary-900/40 dark:text-primary-300">
                  <CategoryIcon slug={category.slug} className="h-7 w-7" />
                </span>
                <div className="relative mt-4">
                  <h3 className="font-display text-lg text-slate-900 dark:text-white">
                    {tCat(category.slug)}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                    {tDesc(category.slug)}
                  </p>
                </div>
                <span className="relative mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-primary-400">
                  {t("view_all")}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
