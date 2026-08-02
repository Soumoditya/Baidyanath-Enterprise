"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { signUp, authErrorMessage } from "@/lib/firebase/auth";
import { useAuth } from "@/hooks/use-auth";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function SignUpPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const { user, isAdmin, isLoading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading || !user) return;
    router.replace(isAdmin ? "/admin" : "/account");
  }, [user, isAdmin, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError(t("enter_name"));
      return;
    }
    if (password.length < 6) {
      setError(t("password_too_short"));
      return;
    }

    setLoading(true);
    try {
      await signUp(email.trim(), password, name);
      // Redirect handled by the effect once auth state resolves.
    } catch (err) {
      setError(authErrorMessage(err));
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[var(--shadow-soft)] sm:p-8 dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-7 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 8v6M22 11h-6" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t("signup_title")}
              </h1>
              <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                {t("signup_subtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="su-name" className="mb-2 block text-base font-semibold text-slate-700 dark:text-slate-300">
                  {t("full_name")}
                </label>
                <input
                  id="su-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="su-email" className="mb-2 block text-base font-semibold text-slate-700 dark:text-slate-300">
                  {t("email")}
                </label>
                <input
                  id="su-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="su-password" className="mb-2 block text-base font-semibold text-slate-700 dark:text-slate-300">
                  {t("password")}
                </label>
                <input
                  id="su-password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                />
                <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                  {t("password_hint")}
                </p>
              </div>

              {error && (
                <p className="rounded-xl bg-red-50 p-3 text-center text-sm font-medium text-red-700 dark:bg-red-900/20 dark:text-red-300">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-primary-600 py-3.5 text-lg font-bold text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
              >
                {loading ? t("creating") : t("create_account")}
              </button>
            </form>

            <p className="mt-6 text-center text-base text-slate-600 dark:text-slate-400">
              {t("have_account")}{" "}
              <Link href="/login" className="font-bold text-primary-600 hover:underline dark:text-primary-400">
                {t("signin")}
              </Link>
            </p>
          </div>

          <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
            {t("guest_hint")}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
