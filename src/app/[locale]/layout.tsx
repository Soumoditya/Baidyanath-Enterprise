import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Locale } from "@/i18n/config";
import WhatsAppFab from "@/components/shared/whatsapp-fab";
import BackToTop from "@/components/shared/back-to-top";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className={`locale-${locale} flex flex-col min-h-screen`}>
        {children}
        <WhatsAppFab />
        <BackToTop />
      </div>
    </NextIntlClientProvider>
  );
}
