import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  return (
    <div className="page max-w-xl py-24 text-center">
      <p className="tag">404</p>
      <h1 className="display mt-4 text-heading-lg md:text-display">{t("title")}</h1>
      <p className="mt-5 text-body leading-[1.4] text-ink-muted">{t("lead")}</p>
      <Link
        href="/"
        className="btn-fill mt-8 inline-flex px-6 py-4 text-body font-medium transition-opacity hover:opacity-90"
      >
        {t("home")}
      </Link>
    </div>
  );
}
