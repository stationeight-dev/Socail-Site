"use client";

import { confirmNewsletter, type NewsletterState } from "@/lib/newsletter-actions";
import { useActionState } from "react";

type Copy = {
  confirm: string;
  pending: string;
  done: string;
  error: string;
};

const initial: NewsletterState = { ok: false };

export function NewsletterConfirm({
  token,
  locale,
  copy,
}: {
  token: string;
  locale: string;
  copy: Copy;
}) {
  const [state, action, pending] = useActionState(confirmNewsletter, initial);

  if (state.ok) {
    return (
      <p className="heading mt-8 text-subheading-lg text-ink" role="status">
        {copy.done}
      </p>
    );
  }

  return (
    <form action={action} className="mt-8">
      <input type="hidden" name="token" value={token} />
      <input type="hidden" name="locale" value={locale} />
      {state.error ? (
        <p className="mb-4 text-body-sm text-danger" role="alert">
          {copy.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="btn-fill inline-flex px-6 py-4 text-body font-medium transition-opacity hover:opacity-90 disabled:cursor-progress disabled:opacity-70"
      >
        {pending ? copy.pending : copy.confirm}
      </button>
    </form>
  );
}
