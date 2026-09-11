"use server";

import {
  readNewsletterToken,
  setSubscriberStatus,
  type NewsletterAction,
} from "@/lib/newsletter";

export type NewsletterState = { ok: boolean; error?: string; status?: NewsletterAction };

export async function confirmNewsletter(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const token = String(formData.get("token") ?? "");
  const parsed = readNewsletterToken(token);
  if (!parsed) {
    return { ok: false, error: "invalid" };
  }

  try {
    await setSubscriberStatus(
      parsed.email,
      parsed.action === "subscribe" ? "subscribed" : "unsubscribed",
    );
    return { ok: true, status: parsed.action };
  } catch {
    return { ok: false, error: "save" };
  }
}
