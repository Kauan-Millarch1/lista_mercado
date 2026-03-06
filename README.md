# Smart Grocery Shopping List

MVP bootstrap for PRD-01 (speed-first).

## Stack
- Next.js (App Router)
- React + Tailwind CSS
- Supabase (Auth + Postgres + RLS)

## 1) Install dependencies
```bash
npm install
```

## 2) Configure environment
Copy `.env.example` to `.env.local` and fill values:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 3) Apply database setup in Supabase SQL editor
1. Run `supabase/migrations/20260306_000001_init.sql`
2. Run `supabase/seed.sql`

## 4) Run project
```bash
npm run dev
```

## Quality checks
```bash
npm run typecheck
npm run lint
npm run build
```
