import { HeaderBar } from "@/components/header-bar";
import { hubs } from "@/content";
import type { Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export async function Header({ locale }: { locale: Locale }) {
  const t = await getTranslations("Nav");
  const theme = await getTranslations("Theme");
  const loc = await getTranslations("Locale");

  return (
    <>
      <a href="#main" className="skip-link btn-fill px-4 py-2.5 text-body-sm font-medium">
        {t("skip")}
      </a>
      <HeaderBar
        copy={{
          services: t("services"),
          industries: t("industries"),
          solutions: t("solutions"),
          products: t("products"),
          company: t("company"),
          work: t("work"),
          about: t("about"),
          blog: t("blog"),
          contact: t("contact"),
          bookCall: t("bookCall"),
          openMenu: t("openMenu"),
          closeMenu: t("closeMenu"),
          viewAll: t("viewAll"),
          localeLabel: loc("label"),
          localeSwitchTo: {
            en: loc("switchTo", { name: loc("names.en") }),
            fr: loc("switchTo", { name: loc("names.fr") }),
          },
          themeLabel: theme("toggle"),
        }}
        mega={{
          services: hubs.services.map((item) => ({
            href: `/services/${item.slug}`,
            title: item.title[locale],
            tagline: item.tagline[locale],
            icon: item.icon,
          })),
          industries: hubs.industries.map((item) => ({
            href: `/industries/${item.slug}`,
            title: item.title[locale],
            tagline: item.tagline[locale],
            icon: item.icon,
          })),
          solutions: hubs.solutions.map((item) => ({
            href: `/solutions/${item.slug}`,
            title: item.title[locale],
            tagline: item.tagline[locale],
            icon: item.icon,
          })),
        }}
        company={[
          { href: "/work", title: t("work"), tagline: t("companyMenu.work"), icon: "briefcase" },
          { href: "/about", title: t("about"), tagline: t("companyMenu.about"), icon: "radio" },
          { href: "/blog", title: t("blog"), tagline: t("companyMenu.blog"), icon: "notebook-pen" },
          { href: "/contact", title: t("contact"), tagline: t("companyMenu.contact"), icon: "mail" },
        ]}
      />
    </>
  );
}
