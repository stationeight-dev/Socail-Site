import LocaleLayout from "../[locale]/layout";

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return <LocaleLayout params={Promise.resolve({ locale: "en" })}>{children}</LocaleLayout>;
}
