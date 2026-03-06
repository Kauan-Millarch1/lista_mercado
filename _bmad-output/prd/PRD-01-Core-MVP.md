# Product Requirements Document (PRD)

## Document Control
- Product: Smart Grocery Shopping List
- PRD ID: PRD-01-Core-MVP
- Version: 1.1
- Date: 2026-03-06
- Source: `_bmad-output/brief.md`

## 1. Purpose
Define the core MVP scope required to deliver a reliable, useful, and production-ready shopping list web application.

## 2. Product Goal
Enable users to create, manage, and complete grocery shopping lists with estimated spending visibility and history tracking.

## 3. In Scope (MVP)
- Account authentication and profile basics
- Product catalog and product detail card
- Active shopping lists with item management
- Estimated total based on average prices
- List finalization and history recording
- Basic dashboard metrics

## 4. Out of Scope (MVP)
- Family real-time collaboration
- Advanced recommendation engine
- Lifestyle kits
- Store geolocation and map integrations
- Barcode scanner, push notifications, and gamification

## 5. User Personas
- Budget-aware shopper
- Organized household manager
- Routine buyer who repeats weekly purchases

## 6. User Journeys
1. User signs up and logs in.
2. User browses categories and adds items to a list.
3. User edits quantities and notes.
4. User checks items while shopping.
5. User finalizes list and reviews history.

## 7. Functional Requirements (FRs)
- FR-001: The system must allow sign up with email and password.
- FR-002: The system must allow login and logout with session persistence.
- FR-003: The system must support password recovery by email.
- FR-004: The system must provide profile editing for name and avatar.
- FR-005: The system must display a categorized product catalog.
- FR-006: The system must show product detail with name, image, description, and average price.
- FR-007: The system must allow adding a product to an active list with quantity.
- FR-008: The system must allow updating item quantity and notes in the active list.
- FR-009: The system must allow removing items from the active list.
- FR-010: The system must support item check/uncheck state for in-store usage.
- FR-011: The system must calculate and display estimated list total in real time.
- FR-012: The system must allow creating multiple shopping lists per user.
- FR-013: The system must allow finalizing a list and storing its snapshot in history.
- FR-014: The system must provide a history view of finalized lists with date and items.
- FR-015: The dashboard must show basic metrics:
  - Current list item count
  - Estimated total of active list
  - Most purchased products (top-N)
  - Shopping frequency

## 8. Non-Functional Requirements (NFRs)
- NFR-001 Security: Access control must be enforced with Supabase RLS for all user-scoped data.
- NFR-002 Security: All app traffic must use HTTPS in production.
- NFR-003 Privacy: Location and behavioral data must require explicit consent.
- NFR-004 Performance: Main screens should load in less than 2 seconds on standard 4G/mobile hardware.
- NFR-005 Performance: Product list and images must use lazy loading and pagination or incremental rendering.
- NFR-006 Availability: Service target is 99.5% monthly uptime.
- NFR-007 Reliability: List data changes must be persisted with no silent data loss.
- NFR-008 Responsiveness: UI must support mobile, tablet, and desktop breakpoints.
- NFR-009 Accessibility: UI must meet WCAG 2.1 AA baseline (contrast, keyboard navigation, labels).
- NFR-010 Maintainability: Frontend code must follow modular component structure and consistent naming patterns.

## 9. Acceptance Criteria (MVP Gate)
- A new user can sign up, log in, and recover password.
- A logged-in user can create a list, add products, update quantities, and finalize shopping.
- Estimated total updates correctly when items are added, edited, or removed.
- Finalized lists appear in history with accurate item snapshots.
- Unauthorized users cannot read or modify another user's lists.

## 10. Dependencies
- Supabase project (Auth, Postgres, Storage)
- Seed product catalog with categories and base price data
- UI component library setup (shadcn/ui + Tailwind CSS)

## 11. Risks and Mitigations
- Risk: Incomplete product and price dataset.
  - Mitigation: Launch with curated starter catalog and regional defaults.
- Risk: Weak mobile usability.
  - Mitigation: Mobile-first layouts and touch-target validation before release.
- Risk: Incorrect estimated total due to inconsistent unit handling.
  - Mitigation: Define strict unit model and validation rules in schema and UI.

## 12. Delivery Recommendation
Ship MVP in 3 increments:
1. Auth + profile + base layout
2. Catalog + active list + total estimator
3. Finalization + history + dashboard metrics

## 13. Execution Strategy (Speed-First)

### 13.1 Priority Rule
- Deliver vertical slices end-to-end before polishing visuals.
- Prefer stable, simple implementations over advanced abstractions.
- Keep architecture extensible, but do not build future features now.

### 13.2 Must-Have for First Public MVP
- FR-001, FR-002, FR-003
- FR-005, FR-006
- FR-007, FR-008, FR-009, FR-010, FR-011
- FR-013, FR-014

### 13.3 Can Be Deferred to MVP+1 (if needed)
- FR-004 (advanced profile fields beyond name/avatar)
- FR-012 (multiple lists; keep one active list in first cut if schedule is tight)
- FR-015 (dashboard metrics can start with only item count + estimated total)

### 13.4 Technical Tradeoffs Approved for Speed
- Start with server-side rendered pages and simple client state where needed.
- Use Supabase directly from Next.js server actions/route handlers for MVP.
- Seed catalog with curated static dataset first; admin tooling can come later.
- Use minimal charting in MVP (or postpone non-critical visual analytics).

### 13.5 Definition of Done (Speed-Oriented)
- Core purchase flow works on mobile and desktop:
  - login -> add product -> edit/check items -> finalize -> view history
- No critical security gap in user data access (RLS validated).
- No blocking data-loss bug in list operations.
