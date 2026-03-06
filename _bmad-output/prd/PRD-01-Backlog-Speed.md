# PRD-01 Execution Backlog (Speed-First)

## Planning Baseline
- PRD Reference: `PRD-01-Core-MVP.md`
- Delivery mode: Speed-first
- Tech: Next.js + React + Tailwind CSS + shadcn/ui + Supabase

## Epic E1 - Foundation and Auth

### Story E1-S1
As a new user, I want to create an account so I can access my lists.
- FR: FR-001
- Acceptance:
  - Signup with email/password works.
  - Validation errors are shown clearly.

### Story E1-S2
As a user, I want to log in and keep my session active.
- FR: FR-002
- Acceptance:
  - Login/logout works.
  - Session persists across refresh.

### Story E1-S3
As a user, I want to recover my password via email.
- FR: FR-003
- Acceptance:
  - Recovery email flow is functional.

### Tasks
- Configure Supabase project and environment variables.
- Implement auth pages (`/login`, `/signup`, `/forgot-password`).
- Add route protection for authenticated areas.
- Validate RLS for user-scoped tables.

## Epic E2 - Product Catalog

### Story E2-S1
As a user, I want to browse products by category.
- FR: FR-005
- Acceptance:
  - Category navigation works.
  - Product cards render image, name, average price.

### Story E2-S2
As a user, I want to view product details before adding to list.
- FR: FR-006
- Acceptance:
  - Product detail shows required fields.
  - Add-to-list action can be triggered from detail view.

### Tasks
- Create seed dataset for categories and products.
- Implement catalog page and product card component.
- Implement product detail modal/sheet.

## Epic E3 - Active Shopping List

### Story E3-S1
As a user, I want to add products with quantity to my list.
- FR: FR-007
- Acceptance:
  - Item is added with quantity and default estimated price.

### Story E3-S2
As a user, I want to update quantities and notes.
- FR: FR-008
- Acceptance:
  - Item updates persist after refresh.

### Story E3-S3
As a user, I want to remove items from my list.
- FR: FR-009
- Acceptance:
  - Removed item is not returned in current list query.

### Story E3-S4
As a user, I want to check/uncheck items while shopping.
- FR: FR-010
- Acceptance:
  - Checked state is persisted.

### Story E3-S5
As a user, I want real-time estimated total updates.
- FR: FR-011
- Acceptance:
  - Total recalculates correctly on add/edit/remove/check flows.

### Tasks
- Create `shopping_lists` and `list_items` schema.
- Implement active list UI page with editable item rows.
- Implement total estimator service (server + client consistency checks).

## Epic E4 - Finalization and History

### Story E4-S1
As a user, I want to finalize my list to store completed shopping.
- FR: FR-013
- Acceptance:
  - Finalize action locks list status and stores timestamp.

### Story E4-S2
As a user, I want to review finalized lists and items.
- FR: FR-014
- Acceptance:
  - History page lists finalized records with item snapshots.

### Tasks
- Add finalization workflow and status transitions.
- Implement history page and list detail view.

## Epic E5 - Basic Dashboard (Minimum Slice)

### Story E5-S1
As a user, I want basic indicators of my current shopping activity.
- FR: FR-015 (minimum subset for speed)
- Acceptance:
  - Show current item count and current estimated total.
  - Optional stretch: top products and frequency.

### Tasks
- Implement dashboard cards.
- Query aggregation endpoints for minimal metrics.

## NFR Technical Checklist
- NFR-001: RLS policies validated for each user table.
- NFR-004: Baseline performance check on mobile viewport.
- NFR-007: Persistence tests for list write operations.
- NFR-008: Responsive checks (`sm`, `md`, `lg`).
- NFR-009: Keyboard navigation and label checks on key forms.

## Suggested Delivery Sequence (2 Weeks)
1. Days 1-3: Epic E1
2. Days 3-6: Epic E2
3. Days 6-10: Epic E3
4. Days 10-12: Epic E4
5. Days 12-14: Epic E5 + hardening

## Ready-for-Dev Checklist
- [ ] Supabase project configured
- [ ] Schema migration files prepared
- [ ] Product seed dataset available
- [ ] UI shell and navigation defined
- [ ] Auth guards working

