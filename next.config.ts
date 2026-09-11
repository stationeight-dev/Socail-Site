import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: ["mongodb", "nodemailer"],
  outputFileTracingIncludes: {
    "/*": ["./public/brand/email-logo.png"],
  },
  async rewrites() {
    // `/newsletter/*` would otherwise be captured as `[locale]=newsletter`
    // and 404 when i18n proxy is skipped (tokens in the query contain a dot).
    return {
      beforeFiles: [
        { source: "/newsletter/:path*", destination: "/en/newsletter/:path*" },
      ],
    };
  },
};

export default withNextIntl(nextConfig);
