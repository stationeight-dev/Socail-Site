"use server";

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

  // Wire Resend / SMTP via CONTACT_TO_EMAIL later. For now, persist to server logs.
  console.info("[station-eight] enquiry", payload);

  return { ok: true };
}
