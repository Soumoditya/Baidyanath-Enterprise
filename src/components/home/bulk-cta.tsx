"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/shared/animated-section";
import { whatsappBulkUrl } from "@/lib/whatsapp";

/** Wholesale / retailer bulk-order call-to-action (he is a distributor). */
export default function BulkCta() {
  const t = useTranslations("home");

  return (
    <AnimatedSection>
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 px-6 py-10 text-center shadow-[var(--shadow-lift)] sm:px-12 sm:py-12">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {t("bulk_title")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-primary-100">
              {t("bulk_text")}
            </p>
            <a
              href={whatsappBulkUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-bold text-primary-700 shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
              {t("bulk_cta")}
            </a>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
