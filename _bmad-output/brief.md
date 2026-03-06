# 📋 Project Brief — Smart Grocery Shopping List

**Version:** 1.1  
**Date:** March 2026  
**Current Phase:** Phase 1 — Analysis  
**Methodology:** BMAD  

---

## 1. Project Overview

### 1.1 Description
A web/mobile smart grocery shopping list app. The system allows users to organize their shopping, track consumption history, consult average product prices, and receive personalized suggestions based on their habits — all without making purchases directly through the app.

### 1.2 Main Objective
Help users plan their grocery trips with greater financial control and organization, offering price visibility, item history, and a total cost estimate before leaving home.

### 1.3 Target Audience
- People who shop for groceries regularly
- Users who want to track and control food spending
- Families who need to organize shared shopping lists

---

## 2. System Features

### 2.1 Authentication & User Account
- Login with email and password
- New account registration
- Password recovery via email
- Session management via Supabase Auth
- Editable user profile (name, photo, location)

**Suggested stack:** Supabase Auth + PostgreSQL (Supabase)

---

### 2.2 Profile Dashboard

User's central area with key metrics and an overview:

| Metric | Description |
|---|---|
| 🛒 Items in current cart | Number of products in the active list |
| 💰 Estimated total | Sum of average prices of items in the list |
| 📦 Most purchased products | Ranking of items added most frequently |
| 💸 Total spent (estimated) | Historical sum of recorded purchases |
| 📅 Shopping frequency | How many times the user created/finalized lists |
| 🔔 Personalized suggestions | Items suggested based on the user's history |

---

### 2.3 Food Catalog by Category

Tab-based navigation with product categories:

- 🥦 Vegetables & Greens
- 🍎 Fruits
- 🥩 Meat & Poultry
- 🐟 Fish & Seafood
- 🥛 Dairy & Eggs
- 🍞 Bakery & Grains
- 🧴 Hygiene & Cleaning
- 🥫 Canned & Preserved Foods
- 🧃 Beverages
- 🧂 Spices & Condiments
- 🍫 Snacks & Sweets
- ❄️ Frozen Foods

Each category displays a product grid with photo, name, and average price range.

---

### 2.4 Product Card (Modal/Detail)

When a user clicks on a product, they see:

- Product name and photo
- Description and basic nutritional information
- **Average price** (based on regional or collaborative data)
- Price comparison across nearby stores
- **"Add to List"** button with quantity field
- Personal history: last time the item was added and how often

---

### 2.5 Active Shopping List

- Add/remove products
- Adjust quantity per item
- Notes field per item (e.g. "brand X", "lactose-free")
- Check off items as purchased (during the physical shopping trip)
- **Estimated total** calculated automatically based on average prices
- Ability to create multiple lists (e.g. "Weekly Groceries", "Saturday BBQ")

---

### 2.6 Location-Based Suggestions

- Based on the user's geolocation, the system suggests:
  - Nearby supermarkets and stores where the product can be found
  - Establishments with lower prices for that item
- Location data obtained via the browser's Geolocation API (with user permission)
- Suggested integration: **Google Places API** or **OpenStreetMap + Overpass API** to map nearby stores

---

### 2.7 Activity Log & History

- Log of all lists created with date and items
- Visualization of product frequency over time
- Monthly consumption charts (which categories are bought most)
- Export list as PDF or plain text for sharing

---

### 2.8 Smart Suggestion System

Based on the user's history, the system suggests:

- Items commonly bought together (e.g. chicken + seasoning)
- Products the user buys periodically that haven't been added to the current list yet
- Replenishment alerts: "You usually buy milk every 7 days — it's been 8 days!"
- Seasonal suggestions (e.g. holiday or seasonal products)

---

### 2.9 Ready-Made Lists by Lifestyle (Suggestions Tab)

A dedicated tab featuring **pre-built shopping kits**, organized by health goal or dietary style. The user picks a profile that fits them and receives a curated list of products — both food and beverages — that can be added to their list in one click.

#### Lifestyle Categories

| Category | Kit Examples |
|---|---|
| 💪 Fitness & Body Definition | Low Carb Diet, Cutting, High Protein |
| 🏋️ Muscle Gain | Clean Bulking, Natural Hypercaloric, Mass + Strength |
| 🥗 Health & Wellness | Clean Eating, Anti-Inflammatory, Gut Health |
| 🌱 Restrictive Diets | Vegan, Vegetarian, Gluten-Free, Lactose-Free |
| ⚖️ Weight Loss | Ketogenic Diet (Keto), Intermittent Fasting, Low Fat |
| 🍼 Special Needs | Pregnant Women, Children, Elderly, Diabetics |
| ⚡ Sports Performance | Natural Pre-Workout, Muscle Recovery, Endurance |

#### How It Works

1. The user opens the **"Suggestions"** tab
2. They choose a category (e.g. Fitness) and then the desired kit (e.g. "High Protein")
3. **Product cards** appear for that objective, each containing:
   - Product photo and name
   - Category (food or beverage)
   - Why this product is in this kit (e.g. "High in protein — ideal for muscle recovery")
   - Estimated average price
   - **"Add to List"** button
4. The user can add items individually or click **"Add All"** to import the entire kit into their active list
5. Added items flow normally into the shopping record, with the estimated total updated accordingly

#### Suggestion Card Behavior

- **Food** and **beverage** cards are separated into sections within the same kit (e.g. "Recommended Foods" | "Recommended Drinks")
- Each card shows a simplified macronutrient indicator (protein, carbs, fats)
- Kits may include **availability tags** (e.g. "Easy to find", "Available at specialty stores")
- When adding a kit, the system asks: *"Would you like to create a separate list for this kit or add it to your current list?"*

#### Additional Data Model

```
diet_kits
  - id, name, category, description, objective, image_url, tags[]

kit_products
  - id, kit_id, product_id, quantity, unit, reason (explanatory text), type (food/drink)
```

---

## 3. Architecture & Tech Stack

### 3.1 Frontend
- **Recommended stack:** Next.js
- **UI/Visual layer:** React + Tailwind CSS + shadcn/ui
- **State management:** Zustand or Context API
- **PWA:** Progressive Web App for mobile installation without an app store

### 3.2 Backend / BaaS
- **Supabase** as the main solution:
  - Auth (authentication and session management)
  - PostgreSQL (relational database)
  - Storage (profile photos and product images)
  - Realtime (list sync across devices)
  - Row Level Security (per-user access control)

### 3.3 Price Data
- Initial phase: prices entered manually or via curation
- Future phase: collaborative collection (users report prices after shopping)
- Alternative: integration with price comparison APIs (Google Shopping, etc.)

### 3.4 Geolocation
- Browser Geolocation API (user permission required)
- Google Places API or OpenStreetMap to find nearby stores

---

## 4. Data Model (Initial Draft)

```
users
  - id, email, name, avatar_url, location, created_at

products
  - id, name, category, description, image_url, unit (kg, unit, L)

price_history
  - id, product_id, store_id, price, region, recorded_at, source (manual/api)

stores
  - id, name, address, lat, lng, google_place_id

shopping_lists
  - id, user_id, title, created_at, finalized_at, status (active/done)

list_items
  - id, list_id, product_id, quantity, unit, note, is_checked, estimated_price

activity_log
  - id, user_id, product_id, list_id, action, created_at
```

---

## 5. Main User Flow

```
1. Sign Up / Login
        ↓
2. Dashboard (profile overview)
        ↓
3. Browse the category catalog
        ↓
4. Click a product → view card with average price and comparison
        ↓
5. Add to list with quantity
        ↓
6. View active list with estimated total
        ↓
7. Go to the store → check off purchased items
        ↓
8. Finalize list → history is updated
        ↓
9. Dashboard updates metrics and suggestions
```

---

## 6. Future Features (Backlog)

- [ ] Shared list between family members
- [ ] Barcode scanner to add products
- [ ] Recipe integration (e.g. "to make this recipe, you need X items")
- [ ] Push notifications for deals on favorite products
- [ ] Offline mode with sync on reconnect
- [ ] Gamification: monthly savings goals with visual rewards
- [ ] Month-by-month spending comparison with detailed charts
- [ ] Voice assistant integration (Google Assistant / Siri)

---

## 7. Non-Functional Requirements

| Requirement | Description |
|---|---|
| Security | RLS in Supabase, HTTPS, encrypted sensitive data |
| Performance | Load time < 2s, lazy loading for images |
| Responsiveness | Works on mobile, tablet, and desktop |
| Availability | 99.5% uptime (Supabase manages infrastructure) |
| Privacy | LGPD/GDPR — location and history data with explicit consent |
| Accessibility | Adequate contrast, screen reader support (WCAG 2.1 AA) |

---

## 8. UX Considerations

- Simple onboarding: maximum 3 screens before reaching the list
- Main screen should be the active list, not the catalog
- Visual feedback when adding an item (cart animation)
- Dark mode available
- Icons and colors per category for quick visual navigation

---

## 9. Development Phases (Suggested Roadmap)

| Phase | Deliverable | Status |
|---|---|---|
| Phase 1 | Analysis & Brief | 🔄 In Progress |
| Phase 2 | Design (Wireframes & Prototype) | ⏳ Pending |
| Phase 3 | Project Setup + Authentication | ⏳ Pending |
| Phase 4 | Product Catalog + Cards | ⏳ Pending |
| Phase 5 | Shopping List + Price Estimation | ⏳ Pending |
| Phase 6 | Dashboard + History + Suggestions | ⏳ Pending |
| Phase 6.5 | Lifestyle Kits Tab | ⏳ Pending |
| Phase 7 | Geolocation & Nearby Stores | ⏳ Pending |
| Phase 8 | Testing, Polish & Deployment | ⏳ Pending |

---

*Document generated in Phase 1 of the BMAD process — subject to revision as the project evolves.*
