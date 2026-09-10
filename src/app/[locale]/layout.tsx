import { Chatbot } from "@/components/chatbot";
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
      "Station Eight Labs",
      "Station Eight",
      "Station 8",
      "Station8",
      "software development company",
      "software development",
      "custom software development",
      "web development company",
      "mobile app development",
      "SaaS development",
      "AI development company",
      "Next.js",
      "ERP",
      "AI",
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
  const chatT = await getTranslations({ locale: asLocale(locale), namespace: "Chat" });

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
            <Chatbot
              locale={locale}
              copy={{
                openLabel: chatT("openLabel"),
                closeLabel: chatT("closeLabel"),
                title: chatT("title"),
                subtitle: chatT("subtitle"),
                greeting: chatT("greeting"),
                placeholder: chatT("placeholder"),
                send: chatT("send"),
                thinking: chatT("thinking"),
                errorMessage: chatT("errorMessage"),
                leadToggle: chatT("leadToggle"),
                leadIntro: chatT("leadIntro"),
                leadName: chatT("leadName"),
                leadEmail: chatT("leadEmail"),
                leadNote: chatT("leadNote"),
                leadSubmit: chatT("leadSubmit"),
                leadSending: chatT("leadSending"),
                leadSuccess: chatT("leadSuccess"),
                leadError: chatT("leadError"),
              }}
            />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
