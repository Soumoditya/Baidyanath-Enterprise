"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/shared/animated-section";
import { whatsappChatUrl } from "@/lib/whatsapp";

const MAPS_URL = "https://maps.app.goo.gl/v7EjXBj8dW6ZPPud8";

export default function ContactSection() {
  const t = useTranslations("home");
  const tc = useTranslations("contact");

  const cards = [
    {
      key: "address",
      label: tc("address_title"),
      value: tc("address"),
      icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    },
    {
      key: "phone",
      label: tc("phone_title"),
      value: tc("phone"),
      icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
    },
    {
      key: "email",
      label: tc("email_title"),
      value: tc("email"),
      icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
    },
    {
      key: "hours",
      label: tc("hours_title"),
      value: `${tc("hours_weekday")} · ${tc("hours_sunday")}`,
      icon: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
    },
  ];

  return (
    <AnimatedSection>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {t("contact_title")}
          </h2>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
            {t("contact_subtitle")}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.key}
              className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-[var(--shadow-soft)] dark:border-slate-700 dark:bg-slate-800"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d={c.icon} /></svg>
              </span>
              <h3 className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {c.label}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-slate-700 dark:text-slate-200">
                {c.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappChatUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-green-700 sm:w-auto"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
            {tc("whatsapp")}
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary-600 px-7 py-3.5 text-base font-semibold text-primary-700 transition-colors hover:bg-primary-50 sm:w-auto dark:border-primary-500 dark:text-primary-300 dark:hover:bg-primary-950/30"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M9 20l-5.5 2.5v-15L9 5m0 15 6-2.5M9 20V5m6 12.5L20.5 20v-15L15 7.5m0 10v-10m0 0L9 5" /></svg>
            {tc("directions")}
          </a>
        </div>
      </section>
    </AnimatedSection>
  );
}
