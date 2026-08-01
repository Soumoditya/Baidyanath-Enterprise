"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/shared/animated-section";

export default function AboutSection() {
  const t = useTranslations("home");

  return (
    <AnimatedSection>
      <section className="bg-slate-50 dark:bg-slate-800/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Illustration side */}
            <div className="flex items-center justify-center">
              <div className="flex h-56 w-56 items-center justify-center rounded-full bg-primary-100 sm:h-64 sm:w-64 dark:bg-primary-900/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-24 w-24 text-primary-600 sm:h-28 sm:w-28 dark:text-primary-400"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
            </div>

            {/* Text side */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                {t("about_title")}
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
                {t("about_text")}
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white dark:bg-primary-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <p className="text-base font-semibold text-slate-900 dark:text-white">
                    {t("about_owner")}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {t("about_owner_role")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
