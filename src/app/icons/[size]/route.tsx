import { appIconResponse, type AppIconVariant } from "@/lib/app-icon";
import { notFound } from "next/navigation";

const icons = {
  "192": { px: 192, variant: "any" },
  "512": { px: 512, variant: "any" },
  maskable: { px: 512, variant: "maskable" },
} as const satisfies Record<string, { px: number; variant: AppIconVariant }>;

export const dynamic = "force-static";

export function generateStaticParams() {
  return Object.keys(icons).map((size) => ({ size }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ size: string }> },
) {
  const { size } = await params;
  const icon = size in icons ? icons[size as keyof typeof icons] : null;
  if (!icon) notFound();
  return appIconResponse(icon.px, icon.variant);
}
