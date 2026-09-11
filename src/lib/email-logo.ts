import { readFileSync } from "node:fs";
import { join } from "node:path";

export const EMAIL_LOGO_CID = "station-eight-logo";
export const EMAIL_LOGO_FILE = "public/brand/email-logo.png";

export function readEmailLogo(): Buffer | null {
  try {
    return readFileSync(join(process.cwd(), EMAIL_LOGO_FILE));
  } catch {
    return null;
  }
}
