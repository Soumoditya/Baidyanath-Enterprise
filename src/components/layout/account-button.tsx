"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/hooks/use-auth";

/** Header entry point to sign-in / account. Shows initials once signed in. */
export default function AccountButton() {
  const t = useTranslations("account");
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <span className="h-10 w-10" aria-hidden="true" />;
  }

  if (!user) {
    return (
      <Link
        href="/login"
        aria-label={t("sign_in")}
        title={t("sign_in")}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </Link>
    );
  }

  const initials = (user.displayName || user.email || "?")
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <Link
      href={isAdmin ? "/admin" : "/account"}
      aria-label={isAdmin ? t("admin_panel") : t("my_account")}
      title={isAdmin ? t("admin_panel") : t("my_account")}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-sm font-bold text-white transition-transform hover:scale-105"
    >
      {initials}
    </Link>
  );
}
