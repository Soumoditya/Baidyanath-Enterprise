"use client";

import { useTranslations } from "next-intl";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AnimatedSection from "@/components/shared/animated-section";

export default function AboutPage() {
  const t = useTranslations("about");

  const values = [
    { key: "genuine", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    { key: "price", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { key: "delivery", icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" },
    { key: "service", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" },
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <AnimatedSection>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {t("title")}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
              {t("subtitle")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-primary-50 dark:bg-primary-950/30 rounded-2xl p-8 mb-10">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {t("story_title")}
              </h2>
              <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {t("story_text")}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 mb-10">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {t("mission_title")}
              </h2>
              <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {t("mission_text")}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              {t("values_title")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map(({ key, icon }) => (
                <div
                  key={key}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
                >
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-primary-600 dark:text-primary-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={icon}
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {t(`value_${key}`)}
                  </h3>
                  <p className="text-base text-slate-600 dark:text-slate-400">
                    {t(`value_${key}_text`)}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </>
  );
}
