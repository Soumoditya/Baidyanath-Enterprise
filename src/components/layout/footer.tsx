"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Logo from "@/components/layout/logo";
import OpenStatus from "@/components/shared/open-status";
import { WEEK_MON_FIRST } from "@/lib/store-hours";
import { CALL_URL, whatsappChatUrl } from "@/lib/whatsapp";

const MAPS_URL = "https://maps.app.goo.gl/v7EjXBj8dW6ZPPud8";

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  const links = [
    { href: "/", key: "nav.home" },
    { href: "/products", key: "nav.products" },
    { href: "/about", key: "nav.about" },
    { href: "/contact", key: "nav.contact" },
    { href: "/orders", key: "nav.orders" },
  ] as const;

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-ink-900">
      <div className="h-1 bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Business */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {t("footer.tagline")}
            </p>
            <div className="mt-4">
              <OpenStatus variant="full" />
            </div>
            <div className="mt-5 flex gap-2">
              <a
                href={whatsappChatUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("common.whatsapp")}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white transition-colors hover:bg-green-700"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
              </a>
              <a
                href={CALL_URL}
                aria-label={t("common.call_now")}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white transition-colors hover:bg-primary-700"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {t("footer.quick_links")}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-slate-600 transition-colors hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400"
                  >
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {t("footer.contact_info")}
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0 text-primary-600 dark:text-primary-400"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                <span>{t("contact.address")}</span>
              </li>
              <li>
                <a href={CALL_URL} className="flex items-center gap-2.5 transition-colors hover:text-primary-600 dark:hover:text-primary-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-primary-600 dark:text-primary-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  {t("contact.phone")}
                </a>
              </li>
              <li>
                <a href="mailto:baidya.ent@gmail.com" className="flex items-center gap-2.5 break-all transition-colors hover:text-primary-600 dark:hover:text-primary-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-primary-600 dark:text-primary-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  {t("contact.email")}
                </a>
              </li>
              <li>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-primary-600 hover:underline dark:text-primary-400">
                  {t("contact.directions")}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M7 17L17 7M7 7h10v10" /></svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Hours table */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {t("footer.hours")}
            </h4>
            <table className="mt-4 w-full text-sm">
              <tbody>
                {WEEK_MON_FIRST.map((d) => {
                  const closed = d.openMin == null;
                  return (
                    <tr key={d.day} className="align-baseline">
                      <td className="py-1 pr-3 text-slate-500 dark:text-slate-400">{d.short}</td>
                      <td
                        className={
                          "py-1 text-right font-medium " +
                          (closed
                            ? "text-red-500 dark:text-red-400"
                            : "text-slate-700 dark:text-slate-200")
                        }
                      >
                        {closed ? t("contact.closed") : `${d.open} – ${d.close}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pb-20 pt-6 sm:pb-6 dark:border-slate-800">
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            {t("footer.copyright", { year: String(year) })}
          </p>
        </div>
      </div>
    </footer>
  );
}
