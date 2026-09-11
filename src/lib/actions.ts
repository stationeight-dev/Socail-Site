"use server";

import type { EnquiryInput } from "@/lib/enquiry";
import { sendEnquiryMail } from "@/lib/mail";
import { getEnquiriesCollection } from "@/lib/mongodb";
import { rememberPendingSubscriber } from "@/lib/newsletter";
import { ObjectId } from "mongodb";

export type EnquiryState = { ok: boolean; error?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INTEREST = new Set(["", "service", "product", "other"]);

const limits = {
  name: 120,
  email: 254,
  company: 160,
  message: 8000,
  source: 200,
};

function clip(value: string, max: number) {
  return value.trim().slice(0, max);
}

function isEmail(value: string) {
  return EMAIL_RE.test(value) && value.length <= limits.email;
}

function logError(scope: string, error: unknown) {
  const message = error instanceof Error ? error.message : "unknown";
  console.error(
    `[station-eight] ${scope}`,
    message.replace(/mongodb(\+srv)?:\/\/[^@\s]+@/gi, "mongodb$1://***@"),
  );
}

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  // Bots fill hidden fields. Pretend success so they do not retry.
  if (clip(String(formData.get("website") ?? ""), 200)) {
    return { ok: true };
  }

  const name = clip(String(formData.get("name") ?? ""), limits.name);
  const email = clip(String(formData.get("email") ?? ""), limits.email).toLowerCase();
  const company = clip(String(formData.get("company") ?? ""), limits.company);
  const interestRaw = clip(String(formData.get("interest") ?? ""), 32);
  const message = clip(String(formData.get("message") ?? ""), limits.message);
  const localeRaw = clip(String(formData.get("locale") ?? "en"), 8);
  const source = clip(String(formData.get("source") ?? "contact"), limits.source).replace(
    /[\r\n]/g,
    "",
  );

  if (!name || !email || !message) {
    return { ok: false, error: "required" };
  }
  if (!isEmail(email)) {
    return { ok: false, error: "email" };
  }

  const enquiry: EnquiryInput = {
    name,
    email,
    company,
    interest: INTEREST.has(interestRaw) ? interestRaw : "",
    message,
    locale: localeRaw === "fr" ? "fr" : "en",
    source: source || "contact",
  };

  let enquiryId: ObjectId;
  try {
    const enquiries = await getEnquiriesCollection();
    const inserted = await enquiries.insertOne({
      ...enquiry,
      createdAt: new Date(),
      emailStatus: { notifyInbox: "pending", thankYou: "pending" },
    });
    enquiryId = inserted.insertedId;
  } catch (error) {
    logError("enquiry save failed", error);
    return { ok: false, error: "save" };
  }

  try {
    await rememberPendingSubscriber({
      email: enquiry.email,
      name: enquiry.name,
      locale: enquiry.locale,
      source: enquiry.source,
    });
  } catch (error) {
    logError("subscriber remember failed", error);
  }

  // Lead is already stored. Mail is best-effort and must not fail the submit.
  try {
    const emailStatus = await sendEnquiryMail(enquiry);
    const enquiries = await getEnquiriesCollection();
    await enquiries.updateOne({ _id: enquiryId }, { $set: { emailStatus } });
  } catch (error) {
    logError("enquiry mail failed", error);
    try {
      const enquiries = await getEnquiriesCollection();
      await enquiries.updateOne(
        { _id: enquiryId },
        {
          $set: {
            emailStatus: {
              notifyInbox: "failed",
              thankYou: "failed",
              lastError: error instanceof Error ? error.message.slice(0, 500) : "mail-failed",
            },
          },
        },
      );
    } catch (statusError) {
      logError("enquiry status update failed", statusError);
    }
  }

  return { ok: true };
}
