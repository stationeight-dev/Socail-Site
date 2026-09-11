import { readNewsletterToken, setSubscriberStatus } from "@/lib/newsletter";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function page(title: string, lead: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title}</title>
</head>
<body style="margin:0;background:#e5e5e5;color:#000;font-family:Arial,Helvetica,sans-serif;">
  <main style="max-width:40rem;margin:0 auto;padding:4rem 1.5rem;">
    <p style="font-family:ui-monospace,Menlo,monospace;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">Station Eight</p>
    <h1 style="font-size:clamp(2.4rem,6vw,4rem);line-height:0.95;text-transform:uppercase;letter-spacing:-0.03em;">${title}</h1>
    <p style="margin-top:1.5rem;font-size:1.125rem;line-height:1.4;color:#444;">${lead}</p>
    <p style="margin-top:2.5rem;"><a href="/" style="color:#000;">Back to the station</a></p>
  </main>
</body>
</html>`;
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  const parsed = readNewsletterToken(token);
  if (!parsed || parsed.action !== "unsubscribe") {
    return new NextResponse(
      page("Leave the list", "This link is not valid. Write to us if you need a new one."),
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  try {
    await setSubscriberStatus(parsed.email, "unsubscribed");
  } catch {
    return new NextResponse(
      page("Leave the list", "Something did not hold. Try again, or email us directly."),
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  return new NextResponse(
    page("Leave the list", "You are off the list. No more notes from this address."),
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

export async function POST(request: Request) {
  return GET(request);
}
