"use client";

import { cx } from "@/lib/utils";
import { useEffect, useId, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

type Copy = {
  openLabel: string;
  closeLabel: string;
  title: string;
  subtitle: string;
  greeting: string;
  placeholder: string;
  send: string;
  thinking: string;
  errorMessage: string;
  leadToggle: string;
  leadIntro: string;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  leadNote: string;
  leadSubmit: string;
  leadSending: string;
  leadSuccess: string;
  leadError: string;
};

export function Chatbot({ locale, copy }: { locale: string; copy: Copy }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: copy.greeting }]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadNote, setLeadNote] = useState("");
  const [leadState, setLeadState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending, leadOpen]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || pending) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setPending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, messages: next }),
      });
      if (!res.ok) throw new Error("chat_failed");
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply as string }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: copy.errorMessage }]);
    } finally {
      setPending(false);
    }
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    if (!leadName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail.trim())) {
      setLeadState("error");
      return;
    }
    setLeadState("sending");
    try {
      const res = await fetch("/api/chat-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName.trim(),
          email: leadEmail.trim(),
          phone: leadPhone.trim(),
          note: leadNote.trim(),
          transcript: messages,
          locale,
        }),
      });
      if (!res.ok) throw new Error("lead_failed");
      setLeadState("sent");
    } catch {
      setLeadState("error");
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 [--card-r:24px]">
      {open ? (
        <div
          role="dialog"
          aria-labelledby={titleId}
          className="flex h-[min(32rem,70vh)] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-[24px] bg-paper-elevated text-ink shadow-none ring-1 ring-line/40"
        >
          <div className="flex items-center justify-between border-b border-line/30 px-4 py-3">
            <div>
              <p id={titleId} className="heading text-body font-medium">
                {copy.title}
              </p>
              <p className="text-caption text-smoke">{copy.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={copy.closeLabel}
              className="flex h-8 w-8 items-center justify-center rounded-full text-ink-muted hover:bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cx(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-body-sm leading-relaxed",
                  m.role === "user"
                    ? "ml-auto bg-ink text-paper-elevated"
                    : "bg-mist text-ink",
                )}
              >
                {m.content}
              </div>
            ))}
            {pending ? (
              <div className="max-w-[85%] rounded-2xl bg-mist px-3.5 py-2.5 text-body-sm text-ink-muted">
                {copy.thinking}
              </div>
            ) : null}

            <div className="pt-1">
              {!leadOpen ? (
                <button
                  type="button"
                  onClick={() => setLeadOpen(true)}
                  className="text-body-sm font-medium text-ink underline underline-offset-4 hover:opacity-80"
                >
                  {copy.leadToggle}
                </button>
              ) : (
                <div className="rounded-2xl bg-mist p-3.5">
                  {leadState === "sent" ? (
                    <p className="text-body-sm text-ink">{copy.leadSuccess}</p>
                  ) : (
                    <form onSubmit={submitLead} className="grid gap-2">
                      <p className="text-body-sm text-ink-muted">{copy.leadIntro}</p>
                      <input
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder={copy.leadName}
                        className="field px-3 py-2 text-body-sm"
                        autoComplete="name"
                      />
                      <input
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder={copy.leadEmail}
                        type="email"
                        className="field px-3 py-2 text-body-sm"
                        autoComplete="email"
                      />
                      <input
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        placeholder={copy.leadPhone}
                        type="tel"
                        className="field px-3 py-2 text-body-sm"
                        autoComplete="tel"
                      />
                      <textarea
                        value={leadNote}
                        onChange={(e) => setLeadNote(e.target.value)}
                        placeholder={copy.leadNote}
                        rows={2}
                        className="field resize-y px-3 py-2 text-body-sm"
                      />
                      {leadState === "error" ? (
                        <p className="text-caption text-danger">{copy.leadError}</p>
                      ) : null}
                      <button
                        type="submit"
                        disabled={leadState === "sending"}
                        className="btn-fill px-4 py-2 text-body-sm font-medium disabled:opacity-70"
                      >
                        {leadState === "sending" ? copy.leadSending : copy.leadSubmit}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>

          <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-line/30 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={copy.placeholder}
              className="field flex-1 px-3.5 py-2.5 text-body-sm"
              aria-label={copy.placeholder}
            />
            <button
              type="submit"
              disabled={pending || !input.trim()}
              className="btn-fill px-4 py-2.5 text-body-sm font-medium disabled:opacity-50"
            >
              {copy.send}
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? copy.closeLabel : copy.openLabel}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-voltage text-black shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-1 ring-black/10 transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        {open ? (
          <span aria-hidden className="text-body-sm">
            ✕
          </span>
        ) : (
          <svg aria-hidden viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M4 4h16v12H8l-4 4V4Z" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  );
}
