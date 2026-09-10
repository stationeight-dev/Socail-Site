"use server";

import { sendMail } from "@/lib/mailer";

export type EnquiryState = { ok: boolean; error?: string };

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const interest = String(formData.get("interest") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const locale = String(formData.get("locale") ?? "en").trim();
  const source = String(formData.get("source") ?? "contact").trim();

  if (!name || !email || !message) {
    return { ok: false, error: "required" };
  }
  if (!isEmail(email)) {
    return { ok: false, error: "email" };
  }

  const payload = {
    name,
    email,
    company,
    interest,
    message,
    locale,
    source,
    at: new Date().toISOString(),
  };

  console.info("[station-eight] enquiry", payload);

  await sendMail({
    subject: `New enquiry — ${name}${company ? ` (${company})` : ""}`,
    replyTo: email,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      interest ? `Interest: ${interest}` : null,
      `Source: ${source}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  return { ok: true };
}
