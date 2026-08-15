"use client";

import { useTranslations } from "next-intl";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Reveal from "@/components/shared/reveal";
import Container from "@/components/ui/container";
import OpenStatus from "@/components/shared/open-status";
import { WEEK_MON_FIRST } from "@/lib/store-hours";
import { CALL_URL, whatsappChatUrl } from "@/lib/whatsapp";

// Marked embed centred on the verified Google Business listing (drops a labelled pin).
const MAP_EMBED =
  "https://www.google.com/maps?q=BAIDYANATH%20ENTERPRISE,%20Bamakhapa%20Rd,%20Chaldhowanipara,%20Rampurhat,%20West%20Bengal%20731224&z=17&output=embed";
const MAPS_URL = "https://maps.app.goo.gl/v7EjXBj8dW6ZPPud8";

export default function ContactPage() {
  const t = useTranslations("contact");
  const tCommon = useTranslations("common");

  const cards = [
    {
      key: "phone",
      title: t("phone_title"),
      value: t("phone"),
      href: CALL_URL,
      icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
    },
    {
      key: "email",
      title: t("email_title"),
      value: t("email"),
      href: "mailto:baidya.ent@gmail.com",
      icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Header band */}
        <div className="bg-mesh grain relative border-b border-slate-200/60 dark:border-slate-800">
          <Container className="relative py-12">
            <Reveal>
              <h1 className="font-display text-4xl text-slate-900 sm:text-5xl dark:text-white">
                {t("title")}
              </h1>
              <p className="mt-3 max-w-xl text-lg text-slate-600 dark:text-slate-300">
                {t("subtitle")}
              </p>
              <div className="mt-4">
                <OpenStatus variant="full" />
              </div>
            </Reveal>
          </Container>
        </div>

        <Container className="py-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left column: info + hours */}
            <div className="space-y-6">
              {/* Address */}
              <Reveal className="h-full">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-card)] dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-primary-300">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg text-slate-900 dark:text-white">
                        {t("address_title")}
                      </h3>
                      <p className="mt-1 leading-relaxed text-slate-600 dark:text-slate-400">
                        {t("address")}
                      </p>
                      <a
                        href={MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:underline dark:text-primary-400"
                      >
                        {t("directions")}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M7 17L17 7M7 7h10v10" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Phone + email */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {cards.map((c, i) => (
                  <Reveal key={c.key} delay={i * 0.06} className="h-full">
                    <a
                      href={c.href}
                      className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-card)] transition-colors hover:border-primary-300 dark:border-slate-700 dark:bg-slate-800"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-900/40 dark:text-primary-300">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d={c.icon} /></svg>
                      </span>
                      <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {c.title}
                      </h3>
                      <p className="mt-1 break-words text-lg font-semibold text-primary-600 dark:text-primary-400">
                        {c.value}
                      </p>
                    </a>
                  </Reveal>
                ))}
              </div>

              {/* Hours table */}
              <Reveal>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-card)] dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg text-slate-900 dark:text-white">
                      {t("hours_title")}
                    </h3>
                    <OpenStatus />
                  </div>
                  <table className="mt-4 w-full">
                    <tbody>
                      {WEEK_MON_FIRST.map((d) => {
                        const closed = d.openMin == null;
                        return (
                          <tr key={d.day} className="border-t border-slate-100 first:border-0 dark:border-slate-700/60">
                            <td className="py-2 font-medium text-slate-700 dark:text-slate-200">{d.label}</td>
                            <td className={"py-2 text-right " + (closed ? "font-semibold text-red-500 dark:text-red-400" : "text-slate-600 dark:text-slate-300")}>
                              {closed ? t("closed") : `${d.open} – ${d.close}`}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            </div>

            {/* Right column: map + actions */}
            <Reveal delay={0.1} className="h-full">
              <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[var(--shadow-card)] dark:border-slate-700 dark:bg-slate-800">
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-4 dark:border-slate-700">
                  <h3 className="font-display text-lg text-slate-900 dark:text-white">
                    {t("find_us")}
                  </h3>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M9 20l-5.5 2.5v-15L9 5m0 15 6-2.5M9 20V5m6 12.5L20.5 20v-15L15 7.5m0 10v-10m0 0L9 5" /></svg>
                    {t("directions")}
                  </a>
                </div>
                <iframe
                  title="Baidyanath Enterprise location"
                  src={MAP_EMBED}
                  className="min-h-[320px] w-full flex-1"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="grid grid-cols-2 gap-3 p-4">
                  <a href={whatsappChatUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
                    {t("whatsapp")}
                  </a>
                  <a href={CALL_URL} className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary-600 px-4 py-3 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50 dark:border-primary-500 dark:text-primary-300 dark:hover:bg-primary-950/30">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    {tCommon("call_now")}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
