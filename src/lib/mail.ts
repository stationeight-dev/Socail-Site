import { siteConfig } from "@/config/site";
import type { EnquiryInput, MailDelivery } from "@/lib/enquiry";
import { EMAIL_LOGO_CID, readEmailLogo } from "@/lib/email-logo";
import { newsletterToken } from "@/lib/newsletter";
import { socialLinks } from "@/lib/social";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

const SMTP_TIMEOUT_MS = 10_000;
const HOSTED_LOGO_SRC = `${siteConfig.url.replace(/\/$/, "")}/api/email-logo`;

const globalForMail = globalThis as unknown as {
  smtpTransporter?: Transporter;
};

function env(name: string) {
  return process.env[name]?.trim() ?? "";
}

function smtpPass() {
  return env("SMTP_PASS").replace(/\s+/g, "");
}

function mailConfig() {
  const user = env("SMTP_USER");
  const pass = smtpPass();
  const from = env("SMTP_FROM") || user;
  const to = env("MAIL_TO");
  if (!user || !pass || !from || !to) return null;
  return { user, pass, from, to };
}

function transporter() {
  const config = mailConfig();
  if (!config) return null;
  if (!globalForMail.smtpTransporter) {
    globalForMail.smtpTransporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: { user: config.user, pass: config.pass },
      connectionTimeout: SMTP_TIMEOUT_MS,
      greetingTimeout: SMTP_TIMEOUT_MS,
      socketTimeout: SMTP_TIMEOUT_MS,
    });
  }
  return globalForMail.smtpTransporter;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const interestLabel: Record<string, { en: string; fr: string }> = {
  service: { en: "A custom service", fr: "Un service sur mesure" },
  product: { en: "A product waitlist", fr: "Une liste d’attente produit" },
  other: { en: "Something else", fr: "Autre chose" },
};

function sendWithTimeout(mail: Parameters<Transporter["sendMail"]>[0]) {
  const transport = transporter();
  if (!transport) {
    return Promise.reject(new Error("smtp-not-configured"));
  }
  return Promise.race([
    transport.sendMail(mail),
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("smtp-timeout")), SMTP_TIMEOUT_MS);
    }),
  ]);
}

function newsletterUrls(email: string, _locale: "en" | "fr") {
  try {
    const origin = siteConfig.url.replace(/\/$/, "");
    const subscribeToken = encodeURIComponent(newsletterToken(email, "subscribe"));
    const unsubscribeToken = encodeURIComponent(newsletterToken(email, "unsubscribe"));
    // API routes skip i18n proxy, so Gmail links still land even when
    // `/newsletter/...` would be captured as an invalid locale.
    return {
      subscribe: `${origin}/api/newsletter/subscribe?token=${subscribeToken}`,
      unsubscribe: `${origin}/api/newsletter/unsubscribe?token=${unsubscribeToken}`,
    };
  } catch {
    return { subscribe: "", unsubscribe: "" };
  }
}

function socialHtml() {
  return socialLinks()
    .map(
      (item) =>
        `<a href="${escapeHtml(item.href)}" style="color:#000000;text-decoration:underline;margin:0 10px;">${escapeHtml(item.label)}</a>`,
    )
    .join("");
}

function socialText() {
  return socialLinks()
    .map((item) => `${item.label}: ${item.href}`)
    .join("\n");
}

function thankYou(enquiry: EnquiryInput, inbox: string, logoSrc: string) {
  const fr = enquiry.locale === "fr";
  const first = escapeHtml(enquiry.name.split(/\s+/)[0] || enquiry.name);
  const urls = newsletterUrls(enquiry.email, enquiry.locale);
  const home = siteConfig.url.replace(/\/$/, "");

  if (fr) {
    return {
      subject: `La station a votre message — ${siteConfig.name}`,
      text: [
        `Bonjour ${enquiry.name.split(/\s+/)[0] || enquiry.name},`,
        "",
        "Votre message est arrivé. Une personne le lira et vous répondra à cette adresse, en général sous un jour ouvré.",
        "",
        urls.subscribe ? `Notes de la station (newsletter) : ${urls.subscribe}` : null,
        `Site : ${home}`,
        inbox ? `Urgent : ${inbox}` : null,
        "",
        socialText(),
        "",
        urls.unsubscribe ? `Se désinscrire : ${urls.unsubscribe}` : null,
        siteConfig.name,
      ]
        .filter((line): line is string => line !== null)
        .join("\n"),
      html: thankYouHtml({
        preheader: "Votre message est arrivé à la station.",
        tag: "Message reçu",
        headline: "LA STATION A VOTRE MESSAGE.",
        hello: `Bonjour ${first},`,
        body: "Une personne lira ce que vous avez envoyé et vous répondra à cette adresse, en général sous un jour ouvré. Pas de théâtre — un vrai retour, en anglais ou en français.",
        ctaLabel: "Recevoir les notes de la station",
        ctaHref: urls.subscribe,
        ctaHint: "Courtes notes sur le logiciel qui tient. Vous pourrez vous désinscrire à tout moment.",
        urgent: `Si c’est urgent, écrivez à ${escapeHtml(inbox)}.`,
        follow: "Nous suivre",
        unsubLabel: "Se désinscrire des notes",
        unsubHref: urls.unsubscribe,
        home,
        logoSrc,
      }),
    };
  }

  return {
    subject: `The station has your note — ${siteConfig.name}`,
    text: [
      `Hello ${enquiry.name.split(/\s+/)[0] || enquiry.name},`,
      "",
      "Your message reached the station. Someone will read it and reply to this address, usually within one working day.",
      "",
      urls.subscribe ? `Subscribe to station notes: ${urls.subscribe}` : null,
      `Site: ${home}`,
      inbox ? `Urgent: ${inbox}` : null,
      "",
      socialText(),
      "",
      urls.unsubscribe ? `Unsubscribe: ${urls.unsubscribe}` : null,
      siteConfig.name,
    ]
      .filter((line): line is string => line !== null)
      .join("\n"),
    html: thankYouHtml({
      preheader: "Your message reached the station.",
      tag: "Message received",
      headline: "THE STATION HAS YOUR NOTE.",
      hello: `Hello ${first},`,
      body: "Someone will read what you sent and reply to this address, usually within one working day. No theatre — a real answer, in English or French.",
      ctaLabel: "Subscribe to station notes",
      ctaHref: urls.subscribe,
      ctaHint: "Short notes on software that has to hold. Unsubscribe whenever you want.",
      urgent: `If it is urgent, write to ${escapeHtml(inbox)}.`,
      follow: "Follow the station",
      unsubLabel: "Unsubscribe from notes",
      unsubHref: urls.unsubscribe,
      home,
      logoSrc,
    }),
  };
}

function thankYouHtml(copy: {
  preheader: string;
  tag: string;
  headline: string;
  hello: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  ctaHint: string;
  urgent: string;
  follow: string;
  unsubLabel: string;
  unsubHref: string;
  home: string;
  logoSrc: string;
}) {
  const cta = copy.ctaHref
    ? `<tr>
        <td style="padding:0 40px 8px;">
          <a href="${escapeHtml(copy.ctaHref)}" style="display:inline-block;background:#000000;color:#ffffff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:700;padding:16px 24px;border-radius:8px;">${escapeHtml(copy.ctaLabel)}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:0 40px 32px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.45;color:#444444;">${escapeHtml(copy.ctaHint)}</td>
      </tr>`
    : "";

  const unsub = copy.unsubHref
    ? `<a href="${escapeHtml(copy.unsubHref)}" style="color:#979797;text-decoration:underline;">${escapeHtml(copy.unsubLabel)}</a>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${escapeHtml(copy.headline)}</title>
</head>
<body style="margin:0;padding:0;background:#e5e5e5;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(copy.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e5e5e5;padding:32px 12px;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:32px;overflow:hidden;">
        <tr>
          <td align="center" style="background:#ffffff;padding:24px 24px 8px;">
            <a href="${escapeHtml(copy.home)}" style="text-decoration:none;">
              <img src="${escapeHtml(copy.logoSrc)}" width="220" height="220" alt="${escapeHtml(siteConfig.name)}" style="display:block;width:220px;max-width:70%;height:auto;border:0;background:#ffffff;"/>
            </a>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 28px;">
            <div style="height:4px;width:72px;background:#fff100;"></div>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 16px;">
            <span style="display:inline-block;background:#d1ffca;color:#000000;font-family:ui-monospace,Menlo,monospace;font-size:12px;letter-spacing:-0.03em;padding:8px 16px;border-radius:64px;">${escapeHtml(copy.tag)}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 16px;font-family:Arial,Helvetica,sans-serif;font-size:40px;line-height:0.95;font-weight:700;letter-spacing:-0.03em;text-transform:uppercase;color:#000000;">
            ${escapeHtml(copy.headline)}
          </td>
        </tr>
        <tr>
          <td style="padding:0 40px 12px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.4;color:#000000;">${copy.hello}</td>
        </tr>
        <tr>
          <td style="padding:0 40px 28px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.45;color:#444444;">${escapeHtml(copy.body)}</td>
        </tr>
        ${cta}
        <tr>
          <td style="padding:0 40px 28px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.45;color:#444444;">${copy.urgent}</td>
        </tr>
        <tr>
          <td style="padding:0 40px 12px;font-family:ui-monospace,Menlo,monospace;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#979797;">${escapeHtml(copy.follow)}</td>
        </tr>
        <tr>
          <td align="left" style="padding:0 40px 36px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:2;color:#000000;">
            ${socialHtml()}
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px 28px;border-top:1px solid #e5e5e5;font-family:ui-monospace,Menlo,monospace;font-size:11px;line-height:1.6;color:#979797;">
            ${escapeHtml(siteConfig.name)} · <a href="${escapeHtml(copy.home)}" style="color:#979797;">${escapeHtml(copy.home.replace(/^https?:\/\//, ""))}</a>
            ${unsub ? `<br/>${unsub}` : ""}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function inboxNotice(enquiry: EnquiryInput) {
  const topic = interestLabel[enquiry.interest]?.en ?? (enquiry.interest || "—");
  const lines = [
    `New enquiry from ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    enquiry.company ? `Company: ${enquiry.company}` : null,
    `Interest: ${topic}`,
    `Locale: ${enquiry.locale}`,
    `Source: ${enquiry.source}`,
    "",
    enquiry.message,
  ].filter((line): line is string => line !== null);

  return {
    subject: `Enquiry · ${enquiry.name} · ${enquiry.source}`,
    text: lines.join("\n"),
    html: `<pre style="font-family:ui-monospace,monospace;white-space:pre-wrap">${escapeHtml(lines.join("\n"))}</pre>`,
  };
}

export type EnquiryMailResult = {
  notifyInbox: MailDelivery;
  thankYou: MailDelivery;
  lastError?: string;
};

export async function sendEnquiryMail(enquiry: EnquiryInput): Promise<EnquiryMailResult> {
  const config = mailConfig();
  if (!config || !transporter()) {
    return { notifyInbox: "failed", thankYou: "failed", lastError: "smtp-not-configured" };
  }

  const logo = readEmailLogo();
  const logoSrc = logo ? `cid:${EMAIL_LOGO_CID}` : HOSTED_LOGO_SRC;
  const notice = inboxNotice(enquiry);
  const thanks = thankYou(enquiry, config.to, logoSrc);
  const errors: string[] = [];
  const urls = newsletterUrls(enquiry.email, enquiry.locale);
  const attachments = logo
    ? [
        {
          filename: "station-eight-logo.png",
          content: logo,
          cid: EMAIL_LOGO_CID,
          contentType: "image/png",
          contentDisposition: "inline" as const,
        },
      ]
    : undefined;

  const notify = await sendWithTimeout({
    from: config.from,
    to: config.to,
    replyTo: enquiry.email,
    subject: notice.subject,
    text: notice.text,
    html: notice.html,
  })
    .then(() => "sent" as const)
    .catch((error: unknown) => {
      errors.push(error instanceof Error ? error.message : "notify-failed");
      return "failed" as const;
    });

  const thankYouStatus = await sendWithTimeout({
    from: `${siteConfig.name} <${config.from}>`,
    to: enquiry.email,
    replyTo: config.to,
    subject: thanks.subject,
    text: thanks.text,
    html: thanks.html,
    attachments,
    headers: urls.unsubscribe
      ? {
          "List-Unsubscribe": `<${urls.unsubscribe}>`,
        }
      : undefined,
  })
    .then(() => "sent" as const)
    .catch((error: unknown) => {
      errors.push(error instanceof Error ? error.message : "thankyou-failed");
      return "failed" as const;
    });

  return {
    notifyInbox: notify,
    thankYou: thankYouStatus,
    lastError: errors.length ? errors.join("; ").slice(0, 500) : undefined,
  };
}
