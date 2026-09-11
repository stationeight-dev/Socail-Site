import { readNewsletterToken, setSubscriberStatus } from "@/lib/newsletter";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function page(inner: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Station notes</title>
</head>
<body style="margin:0;background:#e5e5e5;color:#000;font-family:Arial,Helvetica,sans-serif;">
  <main style="max-width:40rem;margin:0 auto;padding:4rem 1.5rem;">
    <p style="font-family:ui-monospace,Menlo,monospace;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;">Station Eight</p>
    <h1 style="font-size:clamp(2.4rem,6vw,4rem);line-height:0.95;text-transform:uppercase;letter-spacing:-0.03em;">Station notes</h1>
    ${inner}
    <p style="margin-top:2.5rem;"><a href="/" style="color:#000;">Back to the station</a></p>
  </main>
</body>
</html>`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") ?? "";
  const parsed = readNewsletterToken(token);
  if (!parsed || parsed.action !== "subscribe") {
    return new NextResponse(
      page(`<p style="margin-top:1.5rem;font-size:1.125rem;line-height:1.4;color:#444;">This link is not valid. Write to us if you need a new one.</p>`),
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  const actionUrl = `/api/newsletter/subscribe?token=${encodeURIComponent(token)}`;
  return new NextResponse(
    page(`
      <p style="margin-top:1.5rem;font-size:1.125rem;line-height:1.4;color:#444;">Short notes on software that has to hold. Confirm below to join the list.</p>
      <form method="post" action="${actionUrl}" style="margin-top:2rem;">
        <button type="submit" style="background:#000;color:#fff;border:0;padding:1rem 1.5rem;font-size:1rem;cursor:pointer;">Subscribe</button>
      </form>
    `),
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

export async function POST(request: Request) {
  const token =
    new URL(request.url).searchParams.get("token") ??
    (await request.formData().then((form) => String(form.get("token") ?? "")).catch(() => ""));
  const parsed = readNewsletterToken(token);
  if (!parsed || parsed.action !== "subscribe") {
    return new NextResponse(
      page(`<p style="margin-top:1.5rem;font-size:1.125rem;line-height:1.4;color:#444;">This link is not valid. Write to us if you need a new one.</p>`),
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  try {
    await setSubscriberStatus(parsed.email, "subscribed");
  } catch {
    return new NextResponse(
      page(`<p style="margin-top:1.5rem;font-size:1.125rem;line-height:1.4;color:#444;">Something did not hold. Try again, or email us directly.</p>`),
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  return new NextResponse(
    page(
      `<p style="margin-top:1.5rem;font-size:1.125rem;line-height:1.4;color:#000;">You are on the list. We will write when there is something worth holding.</p>`,
    ),
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
