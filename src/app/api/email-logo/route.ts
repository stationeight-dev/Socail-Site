import { readEmailLogo } from "@/lib/email-logo";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export function GET() {
  const file = readEmailLogo();
  if (!file) {
    return new NextResponse("Not found", { status: 404 });
  }
  return new NextResponse(new Uint8Array(file), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
