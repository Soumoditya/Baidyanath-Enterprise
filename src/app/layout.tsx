import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali, Noto_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const notoDevanagari = Noto_Sans({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Baidyanath Enterprise - Trusted FMCG Distributor in Rampurhat",
    template: "%s | Baidyanath Enterprise",
  },
  description:
    "Trusted Distributor of FMCG, Healthcare & Cleaning Products in Rampurhat, Birbhum, West Bengal. Complan, Sugar Free, Glucon-D, OTC Products, Phenyl, and more at competitive prices.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${inter.variable} ${notoBengali.variable} ${notoDevanagari.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
