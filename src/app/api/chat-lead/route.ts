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
