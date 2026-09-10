import nodemailer from "nodemailer";

type MailInput = {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) return null;

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user, pass },
    });
  }
  return transporter;
}

/**
 * Sends an email via SMTP if credentials are configured; otherwise logs the
 * message so nothing is silently lost during local development or before
 * SMTP_USER/SMTP_PASS are set.
 */
export async function sendMail(input: MailInput): Promise<{ sent: boolean }> {
  const t = getTransporter();
  const to = process.env.MAIL_TO;

  if (!t || !to) {
    console.info("[station-eight] email not sent (SMTP not configured) —", {
      to: to ?? "(MAIL_TO unset)",
      subject: input.subject,
      text: input.text,
    });
    return { sent: false };
  }

  try {
    await t.sendMail({
      from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
      to,
      replyTo: input.replyTo,
      subject: input.subject,
      text: input.text,
      html: input.html,
    });
    return { sent: true };
  } catch (error) {
    console.error("[station-eight] failed to send email", error);
    return { sent: false };
  }
}
