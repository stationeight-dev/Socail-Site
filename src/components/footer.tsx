import { Logo } from "@/components/logo";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

// The band is black in both themes, so colours here are fixed, not tokens.
const footerLink =
  "text-body-sm text-[#c6c6c6] transition-colors hover:text-white focus-visible:outline-white";

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations("Footer");
  const nav = await getTranslations("Nav");
  const year = new Date().getFullYear();

  return (
      <footer className="bg-black pb-[env(safe-area-inset-bottom)] text-white">
      <div className="page grid gap-10 py-14 md:grid-cols-5 md:py-16">
        <div className="md:col-span-2">
          {/* The band is always black, so force the brand's own dark-canvas
              wordmark here regardless of the page theme. */}
          <Link href="/" className="dark inline-flex rounded-sm focus-visible:outline-white">
            <Logo variant="wordmark" />
          </Link>
          <p className="mt-6 max-w-sm text-body leading-[1.4] text-smoke">{t("blurb")}</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-5 inline-block bg-voltage px-2 py-0.5 font-mono text-caption text-black focus-visible:outline-white"
          >
            {siteConfig.email}
          </a>
        </div>

        <FooterColumn title={t("navigate")}>
          <li>
            <Link href="/work" className={footerLink}>
              {nav("work")}
            </Link>
          </li>
          <li>
            <Link href="/products" className={footerLink}>
              {nav("products")}
            </Link>
          </li>
          <li>
            <Link href="/about" className={footerLink}>
              {nav("about")}
            </Link>
          </li>
          <li>
            <Link href="/blog" className={footerLink}>
              {nav("blog")}
            </Link>
          </li>
          <li>
            <Link href="/contact" className={footerLink}>
              {nav("contact")}
            </Link>
          </li>
        </FooterColumn>

        <FooterColumn title={t("services")}>
          {services.slice(0, 6).map((item) => (
            <li key={item.slug}>
              <Link href={`/services/${item.slug}`} className={footerLink}>
                {item.title[locale]}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={t("legal")}>
          <li>
            <Link href="/privacy" className={footerLink}>
              {t("privacy")}
            </Link>
          </li>
          <li>
            <Link href="/terms" className={footerLink}>
              {t("terms")}
            </Link>
          </li>
          <li>
            <Link href="/cookies" className={footerLink}>
              {t("cookies")}
            </Link>
          </li>
        </FooterColumn>
      </div>

      <div className="page flex flex-col gap-2 border-t border-white/10 py-5 font-mono text-caption text-smoke md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {t("rights")}
        </p>
        <p className="uppercase">EN · FR</p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-caption uppercase text-smoke">{title}</p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}
