"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/hooks/use-auth";
import { AnimatePresence, motion } from "framer-motion";

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
  const { isAdmin } = useAuth();

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
              <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                Baidyanath Enterprise
              </span>
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

                {isAdmin && (
                  <li>
                    <Link
                      href="/admin"
                      onClick={onClose}
                      className="flex items-center rounded-lg px-3 py-2.5 text-base font-medium text-primary-600 transition-colors hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-slate-800"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                      >
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      {t("admin")}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
