import { buildSiteKnowledge } from "@/lib/site-knowledge";
import type { Locale } from "@/i18n/routing";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
// Give slower model responses room to finish instead of being cut off by the
// platform's default function timeout (which reads as a generic client error).
export const maxDuration = 45;

type ChatMessage = { role: "user" | "assistant"; content: string };

/**
 * Calls OpenRouter with a timeout and a single retry. Node's fetch can fail
 * with a transient DNS/network error (e.g. "fetch failed" / EAI_AGAIN) even
 * when the upstream is healthy — without a retry, that one hiccup surfaces
 * to the visitor as "something went wrong" for no real reason.
 */
async function callOpenRouter(payload: unknown, apiKey: string) {
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);
    try {
      return await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://www.stationeight.org",
          "X-Title": "Station Eight Labs",
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      lastError = error;
      if (attempt === 0) {
        console.warn("[station-eight] OpenRouter call failed, retrying once", error);
        continue;
      }
    } finally {
      clearTimeout(timeout);
    }
  }
  throw lastError;
}

function systemPrompt(locale: Locale) {
  const knowledge = buildSiteKnowledge(locale);
  const language = locale === "fr" ? "French" : "English";

  return `You are the friendly assistant on the Station Eight Labs website, a software development company. You talk like a knowledgeable, warm colleague — never like a script, never overly formal, never robotic. Keep replies short and conversational (2-4 sentences unless the question genuinely needs a list).

Answer questions about Station Eight Labs using ONLY the information below. If you don't know something (pricing specifics, timelines for a particular project, anything not covered below), say so honestly and suggest the visitor leave their name and email using the "get in touch" box in this chat so the team can follow up personally — don't make things up.

If someone describes a problem or project, help them figure out which service or page fits, and mention that they can leave their contact details in this chat for a human follow-up, or visit /contact.

Always reply in ${language}, matching the visitor.

--- Station Eight Labs site knowledge ---
${knowledge}
--- end of site knowledge ---`;
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "chat_not_configured" },
      { status: 503 },
    );
  }

  let body: { locale?: string; messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const locale: Locale = body.locale === "fr" ? "fr" : "en";
  const messages = Array.isArray(body.messages) ? body.messages.slice(-16) : [];

  if (messages.length === 0) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  try {
    const response = await callOpenRouter(
      {
        model: process.env.OPENROUTER_MODEL ?? "openai/gpt-4o",
        temperature: 0.6,
        max_tokens: 500,
        messages: [
          { role: "system", content: systemPrompt(locale) },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
      },
      apiKey,
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("[station-eight] OpenRouter error", response.status, errText);
      return NextResponse.json({ error: "upstream_error" }, { status: 502 });
    }

    const data = await response.json();
    const reply: string =
      data?.choices?.[0]?.message?.content ??
      (locale === "fr"
        ? "Désolé, je n'ai pas pu formuler de réponse à l'instant. Vous pouvez laisser vos coordonnées ci-dessous et l'équipe reviendra vers vous."
        : "Sorry, I couldn't put together a reply just now. Feel free to leave your details below and the team will follow up.");

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[station-eight] chat route failure", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
