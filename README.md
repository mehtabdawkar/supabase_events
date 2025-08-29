# Supabase Events Demo

A minimal Next.js + Supabase app:
- /events: lists upcoming events
- /events/[id]: event details + RSVP form (Yes/No/Maybe)

## Tech
- Next.js (App Router, TS)
- Supabase (Postgres + RLS)
- @supabase/supabase-js

## Setup

1) Supabase
- Run the SQL in /supabase/schema.sql to create tables and sample data.
- Run the RLS policy SQL in /supabase/rls.sql (demo-open policies).
- Copy Project URL and anon key from Project Settings → API.

2) App
- `cp .env.example .env.local` and fill `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `npm i`
- `npm run dev` → open http://localhost:3000

## Deploy
- Push to GitHub.
- Import to Vercel.
- Add the same env vars in Vercel.
- Deploy.

## Notes
- Demo RLS allows anonymous RSVP writes. Do not use these policies in production.
- For production, use Supabase Auth, map `auth.users` to `public.users`, and restrict `rsvps` writes to the logged-in user via `auth.uid()`.
