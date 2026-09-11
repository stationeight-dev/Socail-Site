import { ButtonLink } from "@/components/button-link";
import { FadeIn } from "@/components/fade-in";
import { NewsletterConfirm } from "@/components/newsletter-confirm";
import { asLocale } from "@/lib/locale";
import { readNewsletterToken, setSubscriberStatus, type NewsletterAction } from "@/lib/newsletter";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function NewsletterGate({
  locale,
  token,
  action,
}: {
  locale: string;
  token: string;
  action: NewsletterAction;
}) {
  const resolved = asLocale(locale);
  setRequestLocale(resolved);
  const t = await getTranslations("Newsletter");
  const parsed = token ? readNewsletterToken(token) : null;
  const valid = parsed?.action === action;
  const title = action === "subscribe" ? t("subscribeTitle") : t("unsubscribeTitle");
  const lead = action === "subscribe" ? t("subscribeLead") : t("unsubscribeLead");
  const confirm = action === "subscribe" ? t("subscribeConfirm") : t("unsubscribeConfirm");
  const done = action === "subscribe" ? t("subscribeDone") : t("unsubscribeDone");

  let applied = false;
  if (valid && parsed && action === "unsubscribe") {
    try {
      await setSubscriberStatus(parsed.email, "unsubscribed");
      applied = true;
    } catch {
      applied = false;
    }
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-20">
      <FadeIn>
        <p className="tag">Station Eight</p>
        <h1 className="display mt-5 text-[clamp(3rem,6vw,5rem)]">{title}</h1>
        <p className="mt-6 max-w-xl text-body leading-[1.4] text-ink-muted">{lead}</p>
        {valid && applied ? (
          <p className="heading mt-8 text-subheading-lg text-ink" role="status">
            {done}
          </p>
        ) : valid ? (
          <NewsletterConfirm
            token={token}
            locale={resolved}
            copy={{
              confirm,
              pending: t("pending"),
              done,
              error: t("error"),
            }}
          />
        ) : (
          <p className="mt-8 text-body-sm text-danger">{t("invalid")}</p>
        )}
        <div className="mt-10">
          <ButtonLink href="/" variant="secondary">
            {t("home")}
          </ButtonLink>
        </div>
      </FadeIn>
    </section>
  );
}
