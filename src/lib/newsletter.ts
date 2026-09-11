import { createHmac, timingSafeEqual } from "crypto";
import type { Locale } from "@/i18n/routing";
import { getDb } from "@/lib/mongodb";
import type { Collection } from "mongodb";

export type NewsletterAction = "subscribe" | "unsubscribe";
export type SubscriberStatus = "pending" | "subscribed" | "unsubscribed";

export type SubscriberDocument = {
  email: string;
  name: string;
  locale: Locale;
  status: SubscriberStatus;
  source: string;
  createdAt: Date;
  updatedAt: Date;
  subscribedAt?: Date;
  unsubscribedAt?: Date;
};

const globalForNewsletter = globalThis as unknown as {
  subscriberIndexes?: Promise<void>;
};

function secret() {
  const explicit = process.env.NEWSLETTER_SECRET?.trim();
  if (explicit) return explicit;
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "") ?? "";
  if (pass) return `s8-newsletter:${pass}`;
  throw new Error("NEWSLETTER_SECRET is not set");
}

function signedParts(token: string) {
  let value = token.trim();
  try {
    value = decodeURIComponent(value);
  } catch {
    // already decoded
  }
  const tilde = value.lastIndexOf("~");
  const separator = tilde > 0 ? tilde : value.lastIndexOf(".");
  if (separator <= 0 || separator === value.length - 1) return null;
  return { body: value.slice(0, separator), sig: value.slice(separator + 1) };
}

export function newsletterToken(email: string, action: NewsletterAction) {
  const payload = JSON.stringify({
    a: action,
    e: email.trim().toLowerCase(),
  });
  const body = Buffer.from(payload).toString("base64url");
  const sig = createHmac("sha256", secret()).update(body).digest("base64url");
  // Tilde avoids a dot in the query string, which some proxy matchers treat as a file.
  return `${body}~${sig}`;
}

export function readNewsletterToken(token: string): { action: NewsletterAction; email: string } | null {
  try {
    const parts = signedParts(token);
    if (!parts) return null;
    const { body, sig } = parts;
    const expected = createHmac("sha256", secret()).update(body).digest("base64url");
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as {
      a?: string;
      e?: string;
    };
    if ((parsed.a !== "subscribe" && parsed.a !== "unsubscribe") || !parsed.e) {
      return null;
    }
    return { action: parsed.a, email: parsed.e };
  } catch {
    return null;
  }
}

export async function getSubscribersCollection(): Promise<Collection<SubscriberDocument>> {
  const collection = (await getDb()).collection<SubscriberDocument>("subscribers");
  if (!globalForNewsletter.subscriberIndexes) {
    globalForNewsletter.subscriberIndexes = collection
      .createIndexes([{ key: { email: 1 }, unique: true }])
      .then(() => undefined)
      .catch(() => undefined);
  }
  await globalForNewsletter.subscriberIndexes;
  return collection;
}

export async function rememberPendingSubscriber(input: {
  email: string;
  name: string;
  locale: Locale;
  source: string;
}) {
  const email = input.email.trim().toLowerCase();
  const now = new Date();
  const subscribers = await getSubscribersCollection();
  await subscribers.updateOne(
    { email },
    {
      $setOnInsert: {
        email,
        status: "pending",
        createdAt: now,
      },
      $set: {
        name: input.name,
        locale: input.locale,
        source: input.source,
        updatedAt: now,
      },
    },
    { upsert: true },
  );
}

export async function setSubscriberStatus(email: string, status: "subscribed" | "unsubscribed") {
  const normalised = email.trim().toLowerCase();
  const now = new Date();
  const subscribers = await getSubscribersCollection();
  const extra =
    status === "subscribed" ? { subscribedAt: now } : { unsubscribedAt: now };
  await subscribers.updateOne(
    { email: normalised },
    {
      $setOnInsert: {
        email: normalised,
        name: "",
        locale: "en",
        source: "newsletter",
        createdAt: now,
      },
      $set: {
        status,
        updatedAt: now,
        ...extra,
      },
    },
    { upsert: true },
  );
  return subscribers.findOne({ email: normalised });
}
