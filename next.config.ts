import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Old service slugs -> renamed, keyword-aligned slugs. Permanent redirects
// so any external links / search index entries carry their signal forward.
const serviceSlugRedirects: Array<[string, string]> = [
  ["mobile-apps", "mobile-app-development"],
  ["custom-software", "custom-software-development"],
  ["ai-integration", "ai-development"],
  ["backend-cloud", "cloud-development"],
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return serviceSlugRedirects.flatMap(([from, to]) => [
      {
        source: `/services/${from}`,
        destination: `/services/${to}`,
        permanent: true,
      },
      {
        source: `/fr/services/${from}`,
        destination: `/fr/services/${to}`,
        permanent: true,
      },
    ]);
  },
};

export default withNextIntl(nextConfig);
