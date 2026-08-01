"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import AnimatedSection from "@/components/shared/animated-section";

const values = [
  { key: "genuine", icon: "M9 12l2 2 4-4M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" },
  { key: "price", icon: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
  { key: "delivery", icon: "M3 7h11v8H3zM14 10h4l3 3v2h-7M6.5 18.5A1.5 1.5 0 1 0 6.5 16a1.5 1.5 0 0 0 0 2.5ZM17.5 18.5A1.5 1.5 0 1 0 17.5 16a1.5 1.5 0 0 0 0 2.5Z" },
  { key: "service", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
] as const;

export default function AboutSection() {
  const t = useTranslations("home");
  const ta = useTranslations("about");

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left: story + owner */}
        <AnimatedSection>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {t("about_title")}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              {t("about_text")}
            </p>

            {/* Owner card */}
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-[var(--shadow-soft)] dark:border-slate-700 dark:bg-slate-800">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-lg font-bold text-white">
                MP
              </span>
              <div>
                <p className="text-base font-bold text-slate-900 dark:text-white">
                  {t("about_owner")}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t("about_owner_role")}
                </p>
              </div>
              <Link
                href="/about"
                className="ml-auto hidden shrink-0 rounded-lg border border-primary-200 px-4 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50 sm:inline-block dark:border-primary-800 dark:text-primary-300 dark:hover:bg-primary-900/30"
              >
                {t("read_more")}
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Right: why choose us grid */}
        <AnimatedSection delay={0.1}>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {t("why_title")}
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {values.map((v) => (
                <div
                  key={v.key}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-[var(--shadow-soft)] dark:border-slate-700 dark:bg-slate-800"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-primary-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d={v.icon} /></svg>
                  </span>
                  <p className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                    {ta(`value_${v.key}`)}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {ta(`value_${v.key}_text`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
