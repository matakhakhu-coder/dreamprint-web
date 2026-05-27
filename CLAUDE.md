# CLAUDE.md — Working Protocol for DREAMPRINT_WEB

## Collaboration Protocol

Before executing any directive, Claude must:

1. **Audit** — Check against the SVVP system model, simulation/live switch architecture, and module placement rules.
2. **Weigh** — Suggest cleaner isolation paths if they exist. Never entangle modules.
3. **Flag deficits** — Surface missing data or unresolved integration stubs before building against them.
4. **Proceed** — Execute without friction once the path is sound.

---

## Project Identity

| Key | Value |
|-----|-------|
| **Name** | DREAMPRINT_WEB |
| **Client** | DreamPrint SA (Pty) Ltd |
| **Domain** | `dreamprintsa.co.za` |
| **Concept** | Custom print-on-demand platform — children's artwork printed on premium products |
| **Stack** | Vite · Vanilla JS ESM · Tailwind CSS 3.x · PostCSS · Autoprefixer |
| **Backend (Phase 2)** | Supabase (PostgreSQL · Storage · Edge Functions · Auth) |
| **Constraint** | Absolute feature isolation. Components in `/src/components`, feature modules in `/src/modules`, integration adapters in `/src/core/integrations`. |
| **Anchor document** | `DREAMPRINT_BUILD_MANIFEST.md` |

---

## SVVP Definition

**System Viable Viable Product.** The complete DreamPrint SA platform, built in full, deployed to a Vercel staging URL, operating in simulation mode for every external dependency. When a dependency is confirmed (API key, merchant account, phone number), a single boolean in `src/core/flags.js` flips it from simulated to live. The platform never ships incomplete — it ships complete and graduates to real-world operation switch by switch.

> This is identical to how `WELLNESS_METRICS_WEB` was built: a complete staging deployment before any client data was wired in. The `scripts/launch.js` gate + `CLIENT_DATA_REQUEST.md` pattern is the graduation mechanism.

---

## Phase Status

| Phase | Name | Status |
|-------|------|--------|
| 0 | Substrate (Project Init, Tooling, Manifest, Flags) | **Complete** |
| 1 | Core Layout (Navbar, Hero, Footer) | Pending |
| 2 | Product Showcase (ProductShowcase, ProductDetail) | Pending |
| 3 | Upload Portal (UploadPortal — core feature) | Pending |
| 4 | Content Sections (HowItWorks, Gallery, About, Testimonials, FAQ) | Pending |
| 5 | Contact & WhatsApp Engine | Pending |
| 6 | Order Confirmation & Post-Submit Flow | Pending |
| 7 | Compliance & POPIA Layer (ConsentBanner, LegalModals) | Pending |
| 8 | Admin Dashboard (OrderQueue, OrderDetail, StatusEngine, MockupUploader) | Pending |
| 9 | SEO Engine & Launch Gate | Pending |

---

## Deployment State

| Key | Value |
|-----|-------|
| **Staging URL** | TBC — Vercel project not yet created |
| **Production domain** | `dreamprintsa.co.za` |
| **Vercel account** | TBC |
| **Linked repo** | TBC — auto-deploys on `git push` to `main` |
| **X-Robots-Tag** | `noindex, nofollow, noarchive, nosnippet` (staging — edge-bound via `vercel.json`) |
| **robots.txt** | Staging mode — `Disallow: /` |
| **sitemap.xml** | Not yet generated |
| **Payment** | Simulation mode — `FLAGS.paymentSimulated: true` |
| **Uploads** | Simulation mode — `FLAGS.uploadSimulated: true` |
| **Orders** | Simulation mode — `FLAGS.ordersSimulated: true` |

---

## Architecture Constraints — Read Before Touching Any File

### Render / Init Lifecycle (non-negotiable)

Every module follows a strict two-function contract:
- `render()` — returns a pure HTML string. No side effects. No DOM access. No event binding.
- `init()` — called after `app.innerHTML` is written. Queries the DOM, attaches listeners, calls integration adapters.

`main.js` executes a **single-pass string hydration**: all `render()` calls concatenated into one `app.innerHTML` assignment, then all `init()` calls fire in sequence. Breaking this pattern (calling `document.querySelector` inside `render()`) returns `null` and silently breaks interactivity.

### Single Source of Truth

All brand data lives in `src/core/manifest.js` as the exported `BRAND` object. All simulation/live switches live in `src/core/flags.js` as the exported `FLAGS` object.

**Never hard-code business facts in components.** Every product name, price, size, phone number, copy string, and integration credential must be imported from `BRAND`. Every conditional behaviour based on environment must be imported from `FLAGS`.

### Simulation / Live Switch Architecture

Every external dependency has an adapter module in `src/core/integrations/`. Each adapter exports a single function. The function checks `FLAGS` and routes to either a simulation path (fake response, console tag `[SIM]`, visible toast) or a live path (real service call).

```
src/core/integrations/
  upload.js    — Uploadcare sim → Uploadcare live
  orders.js    — console/localStorage sim → Formspree → Supabase live
  payment.js   — button sim → PayFast redirect live
  email.js     — console sim → MailerLite live
  auth.js      — localStorage sim → Supabase Auth live
```

Flipping a switch in `flags.js` is the only code change needed to graduate a dependency. No hunting through components.

### Module Placement Rules

| Type | Directory | Examples |
|------|-----------|---------|
| Pure UI components | `src/components/` | `Navbar.js`, `Hero.js`, `Footer.js`, `ConsentBanner.js` |
| Feature modules with logic | `src/modules/` | `UploadPortal.js`, `ProductShowcase.js`, `ContactEngine.js`, `LegalModals.js` |
| Admin modules | `src/admin/` | `OrderQueue.js`, `OrderDetail.js`, `StatusEngine.js`, `MockupUploader.js` |
| Core utilities, data, adapters | `src/core/` | `manifest.js`, `flags.js`, `SEOEngine.js`, `integrations/` |
| Build / deployment scripts | `scripts/` | `launch.js` |
| Static assets | `public/assets/` | `images/`, `products/`, `demo/` |

### Admin Isolation

The admin dashboard lives under `/admin` route. It is auth-gated. In simulation mode, auth is a hardcoded password checked against `localStorage`. In live mode, `auth.js` adapter delegates to Supabase Auth. Admin modules must never be imported into customer-facing render paths.

---

## Component & Module Map

### Customer-Facing

| File | Section ID | Nav Anchor | Description |
|------|-----------|-----------|-------------|
| `src/components/Navbar.js` | — | — | Fixed top nav, mobile hamburger, WhatsApp FAB, "Upload Your Art" CTA |
| `src/components/Hero.js` | — | — | Full-viewport hero, emotional headline, before/after teaser, dual CTA: Upload + WhatsApp |
| `src/modules/HowItWorks.js` | `#how-it-works` | How It Works | 5-step animated flow: Upload → Enhance → Preview → Approve → Deliver |
| `src/modules/ProductShowcase.js` | `#shop` | Shop | Product grid with pricing, filter by type, "Add to Order" CTA per card |
| `src/modules/ProductDetail.js` | — | — | Product overlay: photos, size guide, pricing, shipping info, "Add to Order" |
| `src/modules/UploadPortal.js` | `#upload` | Upload | **Core feature** — Uploadcare widget, product selector, size, instructions, customer info, POPIA consent, submit |
| `src/modules/OrderConfirmation.js` | `/order-confirmed` | — | Post-submit page: order reference, what happens next, estimated timeline, WhatsApp link |
| `src/modules/Gallery.js` | `#gallery` | Gallery | Before/after artwork grid, customer photo features |
| `src/modules/Testimonials.js` | `#testimonials` | — | Customer quotes, star ratings, embedded in home flow |
| `src/components/About.js` | `#about` | About | Founder story, mission, behind-the-scenes |
| `src/modules/FAQ.js` | `#faq` | — | Accordion, common questions, inline on home |
| `src/modules/ContactEngine.js` | `#contact` | Contact | Email form (Formspree), WhatsApp link, response time promise |
| `src/components/ConsentBanner.js` | — | — | POPIA consent banner, `localStorage` key: `dp_consent` |
| `src/modules/LegalModals.js` | — | — | Privacy Policy, T&C, Refund Policy, Shipping Policy overlays |

### Founder-Facing (Admin)

| File | Route | Description |
|------|-------|-------------|
| `src/admin/AdminShell.js` | `/admin` | Auth gate, sidebar nav, order queue counter badge |
| `src/admin/OrderQueue.js` | `/admin/orders` | Orders table: sortable by status/date, artwork download link, customer contact |
| `src/admin/OrderDetail.js` | `/admin/orders/:id` | Full order view: customer info, artwork preview, status history, action controls |
| `src/admin/StatusEngine.js` | — | Lifecycle state machine: RECEIVED → ENHANCING → MOCKUP_SENT → APPROVED → PAID → IN_PRODUCTION → SHIPPED → DELIVERED |
| `src/admin/MockupUploader.js` | — | Upload enhanced mockup, trigger customer notification via `email.js` adapter |

### Core

| File | Description |
|------|-------------|
| `src/core/manifest.js` | `BRAND` object — all copy, product catalog, pricing, integration config stubs |
| `src/core/flags.js` | `FLAGS` object — all simulation/live switches |
| `src/core/SEOEngine.js` | Meta tags, OG tags, Twitter card, Product structured data, LocalBusiness schema |
| `src/core/integrations/upload.js` | Uploadcare adapter |
| `src/core/integrations/orders.js` | Order submission adapter (sim → Formspree → Supabase) |
| `src/core/integrations/payment.js` | PayFast adapter |
| `src/core/integrations/email.js` | MailerLite transactional email adapter |
| `src/core/integrations/auth.js` | Admin authentication adapter |

---

## CSS Architecture

Tailwind CSS v3 with custom design tokens in `tailwind.config.js`. Content scanning covers `./index.html` and `./src/**/*.{js,html}`.

Custom tokens:

```js
// Brand palette
colors: {
  'dp-coral':      '#E8634A',   // primary CTA, action elements
  'dp-coral-dark': '#C44E35',   // hover state
  'dp-yellow':     '#F5C842',   // secondary accent, highlight
  'dp-navy':       '#1A2B4A',   // headings, body text, footer
  'dp-navy-light': '#2A3F6A',   // hover on dark backgrounds
  'dp-cream':      '#FDF8F2',   // page background
  'dp-cream-dark': '#F5EDE0',   // section alternating background
  'dp-sage':       '#4A7C6F',   // success states, trust badges, confirmation
  'dp-sage-light': '#6A9E92',   // hover on sage
}

// Typography
fontFamily: {
  display: ['Nunito', 'sans-serif'],   // friendly, rounded — section headings
  body:    ['Inter', 'sans-serif'],    // clean, neutral — body copy, labels
}
```

**Design principle:** Every section must work on a 390px mobile viewport. WhatsApp CTA button always accessible without scrolling on mobile. Minimum tap target 48px. Product cards must show price and CTA without horizontal scroll.

---

## Order Lifecycle State Machine

```
RECEIVED
  └─→ ENHANCING
        └─→ MOCKUP_SENT
              ├─→ REVISION_REQUESTED → MOCKUP_SENT (loop until approved)
              └─→ APPROVED
                    └─→ PAYMENT_PENDING
                          └─→ PAID
                                └─→ IN_PRODUCTION
                                      └─→ SHIPPED (tracking number attached)
                                            └─→ DELIVERED
```

Each transition is a method in `src/admin/StatusEngine.js`. In simulation, transitions update local state and fire a visible toast. In live mode, they write to Supabase and invoke the `email.js` adapter to notify the customer.

Target fulfillment: **10–12 days total.** Enhancement: 2–3 days. Approval window: 48 hours. Production + courier: 5–7 days.

---

## Tooling & Scripts

```bash
npm run dev        # Vite dev server → localhost:3000
npm run build      # Production build → dist/
npm run preview    # Preview dist/ locally
npm run launch     # Production launch gate:
                   #   1. robots.txt toggle (Disallow → Allow + Sitemap)
                   #   2. sitemap.xml generation (SITE_URL env var, default: https://dreamprintsa.co.za)
                   #   3. Manifest validation — advisory warnings for null/placeholder values
                   #   4. FLAGS validation — warns if any switch still in simulation on production build
```

`scripts/launch.js` — Node.js ESM. Idempotent — safe to re-run. Exit always 0. Warnings are advisory only.

## Build Output (Phase 0 baseline)

| File | Size | Gzip |
|------|------|------|
| `dist/index.html` | 1.92 kB | 0.86 kB |
| `dist/assets/index-*.css` | 6.52 kB | 2.21 kB |
| `dist/assets/index-*.js` | 13.88 kB | 5.62 kB |

---

## Launch Gate — Switch Flip Map

All switches start `true` (simulation). Flip each to `false` when the dependency is confirmed and credentials are placed in `manifest.js`.

| Switch | `flags.js` key | Resolved when |
|--------|---------------|---------------|
| Artwork upload | `uploadSimulated` | Uploadcare public key placed in `BRAND.integrations.uploadcareKey` |
| Order submission | `ordersSimulated` | Formspree URL or Supabase URL placed in `BRAND.integrations.formEndpoint` |
| Payment | `paymentSimulated` | PayFast merchant ID + key placed in manifest (key via env var only) |
| Email | `emailSimulated` | MailerLite API key + template IDs placed (via env var only) |
| Admin auth | `adminSimulated` | Supabase Auth configured or admin password hash set |

Non-flag items that must also be resolved before `vercel --prod`:

| # | Item | Priority |
|---|------|----------|
| 1 | `BRAND.whatsapp` — null | Required |
| 2 | `BRAND.email` — null | Required |
| 3 | `BRAND.social.instagram` — null | Required |
| 4 | `BRAND.compliance.registrationNumber` — null | Required |
| 5 | `BRAND.compliance.popiaContact` — null | Required |
| 6 | `products[].images` — empty arrays | Required |
| 7 | Founder portrait / brand photography | Required |
| 8 | Product photography (min 3 per product) | Required |
| 9 | `vercel.json` headers block removed | Required |
| 10 | `FLAGS` simulation warnings resolved or documented | Required |

---

## Standby Protocol

When awaiting client data (photography, credentials, registration details), the project is in **switch-flip standby**. The SVVP is staging-live and fully functional in simulation mode.

On re-entry, the agent must:
1. Read this file (`CLAUDE.md`) first.
2. Read `DREAMPRINT_BUILD_MANIFEST.md` — update it with confirmed client values.
3. Mirror confirmed values into `src/core/manifest.js`.
4. Place received asset files into `public/assets/`.
5. Flip resolved switches in `src/core/flags.js`.
6. Run `npm run launch` — confirm warning count decreases.
7. Run `npm run build` — confirm clean build.
8. Strip `vercel.json` headers block.
9. Run `vercel --prod` — promote to production domain.
