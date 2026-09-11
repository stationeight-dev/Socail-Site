import { LegalShell, legalMeta } from "@/components/legal-shell";
import { siteConfig } from "@/config/site";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return legalMeta(locale, "/privacy", "privacyTitle");
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
    <LegalShell title={t("privacyTitle")}>
      <p>{t("updated")}</p>
      {fr ? (
        <>
          <p>
            Station Eight Labs (« nous ») traite les données que vous envoyez via le
            formulaire de contact (nom, e-mail, société, message) pour répondre à
            votre demande. Base : intérêt légitime et/ou mesures précontractuelles.
          </p>
          <p>
            Nous ne revendons pas ces données. Elles sont conservées le temps de la
            relation plus une durée d’archivage raisonnable. Les notes de la station
            ne partent que si vous confirmez le lien d’inscription dans notre e-mail ;
            vous pouvez vous désinscrire à tout moment. Pour exercer vos
            droits (accès, rectification, effacement, opposition), écrivez à{" "}
            {siteConfig.email}.
          </p>
          <p>
            Ce site peut être hébergé dans l’UE ou chez un sous-traitant (par ex.
            Vercel). Un transfert hors UE, s’il a lieu, s’appuiera sur des clauses
            contractuelles types.
          </p>
        </>
      ) : (
        <>
          <p>
            Station Eight Labs (“we”) process the data you send through the contact
            form (name, email, company, message) in order to answer you. Legal
            bases: legitimate interest and/or pre-contractual steps.
          </p>
          <p>
            We do not sell this data. We keep it for the length of the conversation
            plus a reasonable archive period. Newsletter notes are sent only if you
            confirm the subscribe link in our email; you can unsubscribe at any time.
            To exercise access, correction, erasure, or objection rights, write to{" "}
            {siteConfig.email}.
          </p>
          <p>
            The site may be hosted in the EU or with a processor (for example
            Vercel). If a transfer outside the EU happens, it will rely on standard
            contractual clauses.
          </p>
        </>
      )}
    </LegalShell>
  );
}
