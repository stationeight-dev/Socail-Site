import { LegalShell, legalMeta } from "@/components/legal-shell";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return legalMeta(locale, "/terms", "termsTitle");
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
    <LegalShell title={t("termsTitle")}>
      <p>{t("updated")}</p>
      {fr ? (
        <>
          <p>
            Le site présente nos services et produits. Un devis, un contrat, ou un
            achat futur de logiciel fera l’objet de conditions séparées.
          </p>
          <p>
            Les contenus (textes, marque, code de démonstration) appartiennent à
            Station Eight Labs sauf mention contraire. Vous restez propriétaire du
            code que nous livrons sous contrat.
          </p>
          <p>
            Le site est fourni « en l’état ». Les études de cas peuvent être
            anonymisées. Le droit applicable et le tribunal compétent seront
            précisés avec l’adresse du siège, une fois celle-ci publiée.
          </p>
        </>
      ) : (
        <>
          <p>
            This site presents our services and products. A proposal, a contract,
            or a future software purchase will have its own terms.
          </p>
          <p>
            Copy, marks, and demo code belong to Station Eight Labs unless stated
            otherwise. You own the code we deliver under a signed agreement.
          </p>
          <p>
            The site is provided as-is. Case studies may be anonymised. Governing
            law and venue will be stated with the registered office once published.
          </p>
        </>
      )}
    </LegalShell>
  );
}
