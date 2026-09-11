import { siteConfig } from "@/config/site";

export type SocialLink = {
  label: string;
  href: string;
};

/** Public profiles. LinkedIn is omitted until NEXT_PUBLIC_LINKEDIN_URL is set. */
export function socialLinks(): SocialLink[] {
  const { x, instagram, facebook, linkedin } = siteConfig.social;
  return [
    { label: "X", href: x },
    { label: "Instagram", href: instagram },
    { label: "Facebook", href: facebook },
    { label: "LinkedIn", href: linkedin },
  ].filter((item): item is SocialLink => Boolean(item.href));
}
