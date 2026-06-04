"use client";

import { useEffect, useRef, useState } from "react";
import { submitWaitlist } from "@/lib/supabase";

type WaitlistModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const firstFieldRef = useRef<HTMLInputElement>(null);
  const titleId = "waitlist-modal-title";

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // focus the first field for accessibility
    firstFieldRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // Reset state shortly after the modal closes.
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setName("");
      setEmail("");
      setStatus("idle");
      setError(null);
    }, 250);
    return () => clearTimeout(t);
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus("loading");

    const result = await submitWaitlist({
      name: name.trim(),
      email: email.trim(),
    });

    if (result.ok) {
      setStatus("done");
    } else {
      setError(result.error);
      setStatus("idle");
    }
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={{ position: "relative" }}
      >
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {status === "done" ? (
          <div>
            <p className="modal-eyebrow">Standby Air</p>
            <p className="modal-success-title" id={titleId}>
              boarding pass secured.
            </p>
            <p className="modal-success-sub">we&apos;ll see you at the gate.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="modal-eyebrow">Flight 01</p>
            <h2 className="modal-title" id={titleId}>
              Join Waitlist
            </h2>

            <div style={{ display: "grid", gap: 14, marginTop: 22 }}>
              <div className="modal-field">
                <label htmlFor="wl-name">Name</label>
                <input
                  id="wl-name"
                  ref={firstFieldRef}
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Amelia Earhart"
                />
              </div>

              <div className="modal-field">
                <label htmlFor="wl-email">Email</label>
                <input
                  id="wl-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                />
              </div>

              {error && <p className="modal-error">{error}</p>}

              <button
                type="submit"
                className="modal-submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Securing…" : "Chase Serendipity"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
