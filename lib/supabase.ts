/**
 * Minimal Supabase REST helper for the waitlist insert.
 *
 * We talk to the PostgREST endpoint directly with fetch so the project
 * carries no extra runtime dependencies. Configure with:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export type WaitlistEntry = {
  name: string;
  email: string;
};

export type WaitlistResult =
  | { ok: true; simulated?: boolean }
  | { ok: false; error: string };

export async function submitWaitlist({
  name,
  email,
}: WaitlistEntry): Promise<WaitlistResult> {
  const payload = {
    name,
    email,
    timestamp: new Date().toISOString(),
  };

  // Fail gracefully when the project isn't configured yet.
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    const warning =
      "[standby] Supabase env vars missing — set NEXT_PUBLIC_SUPABASE_URL and " +
      "NEXT_PUBLIC_SUPABASE_ANON_KEY to persist waitlist signups.";

    if (process.env.NODE_ENV === "production") {
      console.error(warning);
      return { ok: false, error: "Waitlist is not configured yet." };
    }

    // In development we don't want to block the UX while iterating.
    console.warn(warning, "Simulating a successful insert:", payload);
    return { ok: true, simulated: true };
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[standby] Supabase insert failed:", res.status, detail);
      return { ok: false, error: "Something went wrong. Please try again." };
    }

    return { ok: true };
  } catch (err) {
    console.error("[standby] Supabase request error:", err);
    return { ok: false, error: "Network error. Please try again." };
  }
}
