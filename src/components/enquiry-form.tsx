"use client";

import { LetterSent } from "@/components/letter-sent";
import { submitEnquiry, type EnquiryState } from "@/lib/actions";
import { cx } from "@/lib/utils";
import { useActionState, useId } from "react";

const initial: EnquiryState = { ok: false };

type Copy = {
  name: string;
  email: string;
  company: string;
  interest: string;
  interestPlaceholder: string;
  interestService: string;
  interestProduct: string;
  interestOther: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  required: string;
};

export function EnquiryForm({
  locale,
  source,
  defaultInterest,
  copy,
}: {
  locale: string;
  source: string;
  defaultInterest?: string;
  copy: Copy;
}) {
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  const errorId = useId();

  if (state.ok) {
    return <LetterSent>{copy.success}</LetterSent>;
  }

  return (
    <form action={action} className="relative grid gap-4">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="source" value={source} />
      {/* Honeypot: hidden from people, filled by most bots. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <Field label={copy.name} name="name" autoComplete="name" required maxLength={120} copy={copy} />
      <Field
        label={copy.email}
        name="email"
        type="email"
        autoComplete="email"
        inputMode="email"
        required
        maxLength={254}
        copy={copy}
      />
      <Field
        label={copy.company}
        name="company"
        autoComplete="organization"
        maxLength={160}
        copy={copy}
      />
      <label className="grid gap-1.5 text-body-sm font-medium">
        <span>{copy.interest}</span>
        <select name="interest" defaultValue={defaultInterest ?? ""} className="field">
          <option value="">{copy.interestPlaceholder}</option>
          <option value="service">{copy.interestService}</option>
          <option value="product">{copy.interestProduct}</option>
          <option value="other">{copy.interestOther}</option>
        </select>
      </label>
      <label className="grid gap-1.5 text-body-sm font-medium">
        <span>
          {copy.message}
          <RequiredMark label={copy.required} />
        </span>
          <textarea name="message" required rows={5} maxLength={8000} className="field resize-y" />
      </label>
      {state.error ? (
        <p id={errorId} className="text-body-sm text-danger" role="alert">
          {copy.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        aria-describedby={state.error ? errorId : undefined}
        className={cx(
          "btn-fill inline-flex items-center justify-center px-6 py-4 text-body font-medium transition-opacity hover:opacity-90 disabled:cursor-progress",
          pending && "opacity-70",
        )}
      >
        {pending ? copy.sending : copy.submit}
      </button>
    </form>
  );
}

function RequiredMark({ label }: { label: string }) {
  return (
    <>
      <span className="text-danger" aria-hidden>
        {" "}
        *
      </span>
      <span className="sr-only"> ({label})</span>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  inputMode,
  required,
  maxLength,
  copy,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  required?: boolean;
  maxLength?: number;
  copy: Copy;
}) {
  return (
    <label className="grid gap-1.5 text-body-sm font-medium">
      <span>
        {label}
        {required ? <RequiredMark label={copy.required} /> : null}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={required}
        maxLength={maxLength}
        className="field"
      />
    </label>
  );
}
