# Standby

Minimal waitlist landing page for **Standby** — an airport social app that turns
the dead time between check-in and boarding into one curated introduction with
someone nearby.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (CSS-first config)
- [Sora](https://fonts.google.com/specimen/Sora) via `next/font`

## Design system

A restrained black / near-white / TWA-Hotel-red palette. Red is an accent only.
Tokens live in `app/globals.css` under `@theme`:

| Token            | Value     | Use                          |
| ---------------- | --------- | ---------------------------- |
| `--color-paper`  | `#fafaf9` | Background                   |
| `--color-ink`    | `#0a0a0a` | Primary type, dark surfaces  |
| `--color-ink-soft`| `#525252`| Secondary type               |
| `--color-line`   | `#e7e5e4` | Hairlines / borders          |
| `--color-accent` | `#e4002b` | Restrained red accent only   |

Use them in markup as `text-ink`, `bg-paper`, `bg-accent`, `border-line`, etc.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/
  layout.tsx     # Sora font + metadata
  page.tsx       # Composes the sections
  globals.css    # Tailwind import + design tokens
components/
  Navbar.tsx
  Hero.tsx
  WaitlistForm.tsx          # client component, frontend-only for now
  ProductDemoPlaceholder.tsx
  PositioningSection.tsx
  Footer.tsx
```

## Wiring up the waitlist (later)

`components/WaitlistForm.tsx` is frontend-only today and already has success /
error states. To persist submissions with Supabase, replace the simulated
`await` in `handleSubmit` with an insert:

```ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const { error } = await supabase.from("waitlist").insert({ email: value });
if (error) throw error;
```

A SQL table to match:

```sql
create table waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);
```
