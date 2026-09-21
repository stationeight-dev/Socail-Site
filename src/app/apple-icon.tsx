import { appIconResponse } from "@/lib/app-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  // Opaque on purpose — iOS composites a transparent icon onto black.
  return appIconResponse(180, "apple");
}
