import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/config/site";
import { routing, type Locale } from "@/i18n/routing";
import { asLocale } from "@/lib/locale";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Barlow_Condensed, Geist_Mono, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import type { Metadata, Viewport } from "next";

// Variable axis so the spec's 450 "book" weight for secondary headings exists.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin", "latin-ext"],
  weight: ["700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e5e5e5" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
  viewportFit: "cover",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: asLocale(locale), namespace: "Meta" });
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("homeTitle"),
      template: `%s · ${siteConfig.name}`,
    },
    description: t("homeDescription"),
    applicationName: siteConfig.appName,
    appleWebApp: {
      capable: true,
      title: siteConfig.appName,
      statusBarStyle: "black",
    },
    other: {
      "apple-mobile-web-app-capable": "yes",
    },
    authors: [{ name: siteConfig.name }],
    keywords: [
      "software development",
      "Next.js",
      "mobile apps",
      "ERP",
      "AI",
      "Station Eight Labs",
    ],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${barlow.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header locale={locale as Locale} />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer locale={locale as Locale} />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
