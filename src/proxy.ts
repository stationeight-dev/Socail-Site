import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  return handleI18nRouting(request);
}

export const config = {
  // Skip i18n on Next internals, dotted files, and PWA/icon endpoints
  // (`/icon`, `/apple-icon`, `/icons/192`) so locale detection cannot redirect them.
  // The `.*\\..*` skip also matches query strings that contain a dot (newsletter
  // tokens). Keep an explicit newsletter matcher so those links still get a locale.
  matcher: [
    "/newsletter/:path*",
    "/(en|fr)/newsletter/:path*",
    "/((?!api|trpc|_next|_vercel|(?:icon|icons|apple-icon)(?:/|$)|.*\\..*).*)",
  ],
};
