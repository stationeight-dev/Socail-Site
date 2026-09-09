import { LegalShell, legalMeta } from "@/components/legal-shell";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return legalMeta(locale, "/cookies", "cookiesTitle");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Legal");
  const fr = locale === "fr";

  return (
    <LegalShell title={t("cookiesTitle")}>
      <p>{t("updated")}</p>
      {fr ? (
        <>
          <p>
            Aujourd’hui, nous n’utilisons pas de cookies analytics. Un cookie de
            préférence (thème clair/sombre, langue) peut être déposé par le
            navigateur — strictement nécessaire au fonctionnement.
          </p>
          <p>
            Si nous ajoutons un outil de mesure d’audience, un bandeau de
            consentement conforme ePrivacy/RGPD sera mis en place avant tout cookie
            non essentiel.
          </p>
        </>
      ) : (
        <>
          <p>
            We do not currently run analytics cookies. A preference cookie (light
            or dark theme, language) may be stored by the browser — strictly
            necessary for the site to work as you left it.
          </p>
          <p>
            If we add audience measurement, an ePrivacy/GDPR consent banner will
            appear before any non-essential cookie is set.
          </p>
        </>
      )}
    </LegalShell>
  );
}
