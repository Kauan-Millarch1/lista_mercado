# PRD-01 Task List (Ship Today)

## Objective
Deliver a working MVP flow today:
`signup/login -> browse catalog -> add/edit/check items -> estimated total -> finalize list -> view history`

## Current Execution Status (2026-03-06)
- Completed now:
  - Project bootstrap with Next.js + Tailwind + App Router
  - Base routes for auth and app sections
  - Supabase client/server setup and typed database model
  - Initial SQL migration and seed script prepared
  - Real auth forms connected to Supabase auth API
  - Route protection for `/app/*` and auth redirects implemented
  - Catalog, active list, history, and dashboard connected to real database reads
  - Server actions implemented for add/update/check/remove/finalize list operations
  - Multiple active lists flow implemented (create/select/finalize selected list) [FR-012]
  - Profile editing connected to database (name and avatar URL) [FR-004]
  - `typecheck`, `lint`, and `build` passing
- Pending to finish end-to-end:
  - Apply migration and seed in Supabase project
  - Validate full user flow with real Supabase credentials in `.env.local`

## Execution Rules
- Focus only on must-have FRs for shipping today.
- Do not implement advanced polish unless all critical tasks are done.
- Keep one active list per user if needed to reduce complexity.

## Critical Path
1. Environment + DB schema + RLS
2. Auth + route guards
3. Catalog + add-to-list
4. Active list operations + total estimator
5. Finalization + history
6. Smoke test + deployment

## Task Board

## T1 - Project bootstrap and env
- Priority: P0
- Owner: Dev
- Depends on: none
- Tasks:
  - [ ] Validate Next.js app boots locally.
  - [ ] Configure `.env.local` with Supabase URL and anon key.
  - [ ] Install and configure `@supabase/supabase-js`.
  - [ ] Create shared Supabase client (server/client).
- Done when:
  - App runs with Supabase connection available.

## T2 - Database schema (MVP tables)
- Priority: P0
- Owner: Dev
- Depends on: T1
- Tasks:
  - [ ] Create tables: `profiles`, `products`, `shopping_lists`, `list_items`.
  - [ ] Add indexes on foreign keys and frequent filters.
  - [ ] Seed minimal product dataset (categories + average price).
  - [ ] Add `status` and `finalized_at` to `shopping_lists`.
- Done when:
  - Schema migration runs cleanly.
  - Seed data is queryable from app.

## T3 - RLS and security policies
- Priority: P0
- Owner: Dev
- Depends on: T2
- Tasks:
  - [ ] Enable RLS on all user-scoped tables.
  - [ ] Policy: users can only read/write own profile/lists/items.
  - [ ] Policy: products are readable by authenticated users.
  - [ ] Validate unauthorized access is denied.
- Done when:
  - Basic security checks pass for cross-user access attempts.

## T4 - Authentication flow
- Priority: P0
- Owner: Dev
- Depends on: T1, T3
- Tasks:
  - [ ] Build `/signup` page (FR-001).
  - [ ] Build `/login` page (FR-002).
  - [ ] Build `/forgot-password` page (FR-003).
  - [ ] Add authenticated route guard (`/app/*`).
- Done when:
  - User can sign up, log in, log out, and request password recovery.

## T5 - Catalog and product detail
- Priority: P0
- Owner: Dev
- Depends on: T2, T4
- Tasks:
  - [ ] Build `/app/catalog` with category filter.
  - [ ] Show product card: image, name, average price.
  - [ ] Implement product detail modal/sheet.
  - [ ] Add CTA to include product in active list.
- Done when:
  - Authenticated user can browse and start add-to-list action.

## T6 - Active list core
- Priority: P0
- Owner: Dev
- Depends on: T5
- Tasks:
  - [ ] Build `/app/list` page with active list retrieval.
  - [ ] Add item with quantity (FR-007).
  - [ ] Edit quantity + note (FR-008).
  - [ ] Remove item (FR-009).
  - [ ] Check/uncheck purchased state (FR-010).
- Done when:
  - All item operations persist after page refresh.

## T7 - Estimated total engine
- Priority: P0
- Owner: Dev
- Depends on: T6
- Tasks:
  - [ ] Implement total calculation from `quantity * estimated_price`.
  - [ ] Recalculate on add/edit/remove/check actions.
  - [ ] Display total prominently on list page.
- Done when:
  - Total value updates correctly in all core list operations.

## T8 - Finalize and history
- Priority: P0
- Owner: Dev
- Depends on: T6, T7
- Tasks:
  - [ ] Finalize list action (set `status=done`, `finalized_at`).
  - [ ] Build `/app/history` page with finalized lists.
  - [ ] Build history detail view with item snapshot.
- Done when:
  - User can finalize and later review completed lists.

## T9 - Minimal dashboard (if time remains)
- Priority: P1
- Owner: Dev
- Depends on: T8
- Tasks:
  - [ ] Build `/app/dashboard` with:
    - Current list item count
    - Current estimated total
- Done when:
  - Dashboard renders with live values.

## T10 - Quality gate and release
- Priority: P0
- Owner: Dev
- Depends on: T8
- Tasks:
  - [ ] Run smoke test on mobile and desktop.
  - [ ] Validate no cross-user data leak.
  - [ ] Validate core flow end-to-end.
  - [ ] Deploy production build.
- Done when:
  - MVP is live and the end-to-end flow works in production.

## FR Coverage Matrix (Ship Today)
- FR-001/002/003: T4
- FR-005/006: T5
- FR-007/008/009/010: T6
- FR-011: T7
- FR-013/014: T8
- FR-015 (minimal): T9 (optional)

## Cut Strategy If Deadline Is At Risk
1. Cut T9 entirely.
2. Keep only one active list per user (defer FR-012).
3. Keep profile edit minimal (defer FR-004 details).
4. Use simple UI without non-critical animations.
