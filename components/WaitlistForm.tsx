"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = email.trim();
    if (!EMAIL_PATTERN.test(value)) {
      setStatus("error");
      setMessage("Enter a valid email.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      // Frontend-only for now. To persist, replace this block with a
      // Supabase insert, e.g.:
      //   await supabase.from("waitlist").insert({ email: value });
      // The UI states below already handle success and error paths.
      await new Promise((resolve) => setTimeout(resolve, 600));

      setStatus("success");
      setMessage("You're on the list.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-2.5 border-t border-line pt-5">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
        <p className="text-sm text-ink">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") {
              setStatus("idle");
              setMessage("");
            }
          }}
          aria-label="Email address"
          aria-invalid={status === "error"}
          className="w-full flex-1 border-b border-line bg-transparent pb-2 text-base text-ink placeholder:text-ink-soft/60 transition-colors focus:border-ink focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group relative shrink-0 self-start text-base font-medium text-ink transition-opacity disabled:opacity-50 sm:self-auto"
        >
          {status === "submitting" ? "Joining…" : "Join Waitlist"}
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-0"
          />
        </button>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-accent">
          {message}
        </p>
      )}
    </form>
  );
}
