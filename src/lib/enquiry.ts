export type MailDelivery = "pending" | "sent" | "failed" | "skipped";

export type EnquiryEmailStatus = {
  notifyInbox: MailDelivery;
  thankYou: MailDelivery;
  lastError?: string;
};

export type EnquiryInput = {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
  locale: "en" | "fr";
  source: string;
};

export type EnquiryDocument = EnquiryInput & {
  createdAt: Date;
  emailStatus: EnquiryEmailStatus;
};
