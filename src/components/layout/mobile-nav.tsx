"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/hooks/use-auth";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/layout/logo";
import LanguageSwitcher from "@/components/layout/language-switcher";
import ThemeToggle from "@/components/layout/theme-toggle";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/", labelKey: "home" },
  { href: "/products", labelKey: "products" },
  { href: "/about", labelKey: "about" },
  { href: "/contact", labelKey: "contact" },
  { href: "/orders", labelKey: "orders" },
] as const;

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const t = useTranslations("nav");
  const ta = useTranslations("account");
  const { user, isAdmin } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-xl dark:bg-slate-900"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-slate-700">
              <div onClick={onClose}>
                <Logo />
              </div>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 py-3">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 transition-colors hover:bg-primary-50 hover:text-primary-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-primary-400"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}

                <li className="my-2 border-t border-slate-200 dark:border-slate-700" />

                <li>
                  <Link
                    href={user ? (isAdmin ? "/admin" : "/account") : "/login"}
                    onClick={onClose}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-semibold text-primary-600 transition-colors hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-slate-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.9}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 shrink-0"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    {user
                      ? isAdmin
                        ? ta("admin_panel")
                        : ta("my_account")
                      : ta("sign_in")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Language + theme */}
            <div className="flex items-center justify-between gap-2 border-t border-slate-200 px-4 py-3 dark:border-slate-700">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
