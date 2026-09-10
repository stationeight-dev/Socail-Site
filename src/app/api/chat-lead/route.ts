import { getDb } from "@/lib/mongodb";
import { sendMail } from "@/lib/mailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

type LeadBody = {
  name?: string;
  email?: string;
  phone?: string;
  note?: string;
  transcript?: { role: "user" | "assistant"; content: string }[];
  locale?: string;
};

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const note = (body.note ?? "").trim();
  const transcript = Array.isArray(body.transcript) ? body.transcript : [];

  if (!name || !email || !isEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid_contact" }, { status: 400 });
  }

  const transcriptText = transcript
    .map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`)
    .join("\n");

  const locale = (body.locale ?? "en").trim();
  const enquiry = {
    name,
    email,
    phone: phone || null,
    note: note || null,
    transcript,
    locale,
    source: "chatbot",
    createdAt: new Date(),
  };

  // Persist first so the enquiry isn't lost even if the email send is slow
  // or fails; a missing/unreachable database degrades to "just log it"
  // rather than breaking the lead flow.
  const db = await getDb();
  if (db) {
    try {
      await db.collection("enquiries").insertOne(enquiry);
    } catch (error) {
      console.error("[station-eight] failed to save chatbot lead to MongoDB", error);
    }
  } else {
    console.info("[station-eight] enquiry not saved (MongoDB not configured) —", enquiry);
  }

  const result = await sendMail({
    subject: `New chatbot lead — ${name}`,
    replyTo: email,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      note ? `Note: ${note}` : null,
      "",
      "Conversation:",
      transcriptText || "(no messages yet)",
    ]
      .filter(Boolean)
      .join("\n"),
  });

  console.info("[station-eight] chatbot lead", { name, email, phone, note, sent: result.sent });

  return NextResponse.json({ ok: true });
}
