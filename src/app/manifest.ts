import { siteConfig } from "@/config/site";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: siteConfig.appName,
    short_name: siteConfig.appName,
    description: siteConfig.tagline.en,
    start_url: "/",
    scope: "/",
    display: "standalone",
    lang: "en",
    dir: "ltr",
    background_color: "#e5e5e5",
    theme_color: "#000000",
    categories: ["business", "developer"],
    icons: [
      {
        src: "/icons/192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
