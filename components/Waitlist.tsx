"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function Waitlist() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!consent) {
      setStatus("error");
      setMessage("Please confirm you'd like to hear from us.");
      return;
    }
    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company,
          consent,
          source: typeof window !== "undefined" ? window.location.pathname : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      setMessage(
        data.alreadyJoined
          ? "You're already on the list."
          : "You're on the list — check your inbox for a note from us."
      );
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="mt-12">
      <p className="font-body text-[18px] text-fg">
        Be among the first. Join the waitlist for early access to Croft.
      </p>

      <div className="mt-[18px] max-w-[430px]">
        {status === "success" ? (
          <p className="font-ui text-[14px] text-muted">{message}</p>
        ) : !open ? (
          <button type="button" onClick={() => setOpen(true)} className="cta-btn">
            Join now
            <span aria-hidden>›</span>
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="font-ui w-full rounded-full border border-rule bg-bg px-5 py-[10px] text-[14px] text-fg outline-none focus:border-fg"
              />
              <button type="submit" disabled={status === "submitting"} className="cta-btn">
                {status === "submitting" ? "Joining…" : "Join"}
                <span aria-hidden>›</span>
              </button>
            </div>

            {/* Honeypot — hidden from people, catches bots. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="absolute -left-[9999px]"
            />

            <label className="font-ui flex items-start gap-2 text-[13px] text-muted">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-[3px]"
              />
              <span>Email me about early access and the launch.</span>
            </label>

            {status === "error" && (
              <p className="font-ui text-[13px] text-muted">{message}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
