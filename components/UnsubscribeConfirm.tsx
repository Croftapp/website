"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "done" | "error";

export default function UnsubscribeConfirm({ token }: { token: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleUnsubscribe() {
    setStatus("submitting");
    try {
      const res = await fetch(
        `/api/unsubscribe?token=${encodeURIComponent(token)}`,
        { method: "POST" }
      );
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p>
        You&rsquo;ve been unsubscribed and removed from the Croft waitlist. We&rsquo;re
        sorry to see you go.
      </p>
    );
  }

  return (
    <>
      <p>Click below to remove your email from the Croft waitlist.</p>
      <button
        type="button"
        onClick={handleUnsubscribe}
        disabled={status === "submitting"}
        className="cta-btn"
      >
        {status === "submitting" ? "Unsubscribing…" : "Confirm unsubscribe"}
        <span aria-hidden>›</span>
      </button>
      {status === "error" && (
        <p className="text-fg4">Something went wrong. Please try again.</p>
      )}
    </>
  );
}
