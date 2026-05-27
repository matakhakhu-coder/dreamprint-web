# DREAMPRINT_ROADMAP.md — Build Execution Checklist

Complete build sequence for the DREAMPRINT_WEB SVVP. Every item below must be checked
before the staging URL can be considered complete. Simulation switches are flipped
separately — see `DREAMPRINT_BUILD_MANIFEST.md` outstanding items.

Mark each item `[x]` as it is completed. Do not mark complete until the feature
is functional in simulation mode and renders without error.

---

## Phase 0 — Substrate

*Project scaffolding, toolchain, core data layer. Nothing visual until this is solid.*

- [x] `npm create vite@latest dreamprint-web -- --template vanilla` — init project
- [x] Install and configure Tailwind CSS v3 + PostCSS + Autoprefixer
- [x] Configure `tailwind.config.js` — brand palette tokens, font families, custom spacing, max-widths, shadows
- [x] Configure `vite.config.js` — port 3000, resolve aliases (`@` → `src/`)
- [x] Write `src/core/manifest.js` — full `BRAND` object with all nulls stubbed and demo data populated
- [x] Write `src/core/flags.js` — full `FLAGS` object, all switches `true` (simulation)
- [x] Create `src/core/integrations/upload.js` — sim path returns fake CDN URL + `[SIM]` console tag
- [x] Create `src/core/integrations/orders.js` — sim path logs payload + fires confirmation toast
- [x] Create `src/core/integrations/payment.js` — sim path renders "Simulate Payment" button, resolves with fake success
- [x] Create `src/core/integrations/email.js` — sim path logs email payload + `[SIM]` console tag
- [x] Create `src/core/integrations/auth.js` — sim path checks `localStorage` for admin token
- [x] Create `src/core/SEOEngine.js` — returns meta string from `BRAND` data
- [x] Create `index.html` — semantic shell, Google Fonts preconnect, Tailwind CDN ref, `<div id="app">`, `<div id="admin">`
- [x] Create `src/main.js` — single-pass string hydration pattern, `render()` → `innerHTML` → `init()` sequence
- [x] Create `scripts/launch.js` — validates manifest nulls, toggles robots.txt, generates sitemap.xml
- [x] Create `public/robots.txt` — staging: `Disallow: /`
- [x] Create `vercel.json` — `X-Robots-Tag: noindex` header block for staging
- [x] Create `.gitignore` — standard Vite + node_modules + `.env*`
- [x] Create `.env.example` — documents all required env vars (PayFast key, MailerLite key, Supabase URL)
- [ ] Init git repo + first commit
- [ ] Create Vercel project, link repo, confirm staging URL auto-deploys on push to `main`

**Gate:** `npm run dev` runs clean, staging URL live, `manifest.js` and `flags.js` importable in browser console.

---

## Phase 1 — Core Layout

*Fixed frame of the site. No content yet — just structure.*

- [x] `src/components/Navbar.js` — `render()` + `init()`
  - [x] Logo (SVG placeholder until asset arrives)
  - [x] Desktop nav links: Shop · How It Works · Gallery · About · Contact
  - [x] Mobile hamburger toggle — CSS-only animation, `init()` attaches click handler
  - [x] "Upload Your Art" CTA button (coral, top-right)
  - [x] WhatsApp floating action button (mobile only, fixed bottom-right, sage)
  - [x] Smooth scroll to anchor on nav link click
  - [x] Active state on current section (IntersectionObserver in `init()`)
- [x] `src/components/Hero.js` — `render()` + `init()`
  - [x] Full-viewport hero, emotional headline
  - [x] Before/After artwork placeholder cards with CSS illustration
  - [x] Dual CTA: "Upload Your Art" + "Chat on WhatsApp"
  - [x] Floating stat cards (10–12 days, 100% custom)
  - [x] Social proof row (avatar stack + star rating)
  - [x] Scroll indicator with bounce animation
- [x] `src/components/Footer.js` — `render()` + `init()`
  - [x] Brand name + tagline column
  - [x] Quick links column: Shop · How It Works · Upload · About · Contact
  - [x] Legal column: Privacy Policy · T&C · Refund Policy · Shipping Policy (all trigger LegalModals)
  - [x] Contact column: email · WhatsApp · social icon links
  - [x] CIPC reg no + POPIA notice line
  - [x] Copyright line (current year, computed in `render()`)
- [x] Wire Navbar, Hero, and Footer into `main.js` render pass
- [ ] Confirm layout renders correctly on 390px, 768px, 1280px, 1440px viewports

**Gate:** Navbar and Footer render on staging. Mobile hamburger functions. All links present (anchors scroll to `#placeholder` without error).

---

## Phase 2 — Product Showcase

*The shop — what we sell and at what price.*

- [ ] `src/modules/ProductShowcase.js` — `render()` + `init()`
  - [ ] Section header + tagline from `BRAND`
  - [ ] Product grid (2 cols mobile, 4 cols desktop) from `BRAND.products` array
  - [ ] Each product card: placeholder image, name, tagline, price range, "Order This" CTA
  - [ ] Filter bar: All · PJs · T-Shirts · Mugs · Bags (JS filter, no page reload)
  - [ ] "Order This" button scrolls to `#upload` and pre-selects that product in UploadPortal
  - [ ] `featured: true` products visually distinguished (badge, priority grid position)
- [ ] `src/modules/ProductDetail.js` — `render()` + `init()`
  - [ ] Overlay modal triggered from product card "View Details" link
  - [ ] Product photo carousel (placeholder images, JS-controlled)
  - [ ] Size guide table
  - [ ] Full pricing breakdown
  - [ ] Turnaround time from `BRAND.products[].turnaround`
  - [ ] Shipping info pull from `BRAND.fulfillment`
  - [ ] "Order This" CTA (same behaviour as card CTA)
  - [ ] Close on backdrop click or Escape key
- [ ] Wire both modules into `main.js` render pass
- [ ] Bundles section: render `BRAND.bundles` array as cards below main product grid

**Gate:** All 4 launch products display from manifest data. Filter works. ProductDetail overlay opens/closes. "Order This" scrolls to `#upload`.

---

## Phase 3 — Upload Portal

*The core of the entire business. The order begins here.*

- [ ] `src/modules/UploadPortal.js` — `render()` + `init()`
  - [ ] Section header: "Upload Your Child's Artwork"
  - [ ] Step indicator: 1 Upload → 2 Choose → 3 Your Details → 4 Submit
  - [ ] **Step 1 — Artwork**
    - [ ] Uploadcare widget (simulation: standard `<input type="file">` + fake CDN URL response)
    - [ ] Accepted formats label: JPG, PNG, HEIC — "A clear phone photo is perfect"
    - [ ] Child's name input field
    - [ ] Special instructions textarea: colour preferences, placement notes
  - [ ] **Step 2 — Product**
    - [ ] Product type radio group (from `BRAND.products`) — with image thumb per option
    - [ ] Size dropdown — options update conditionally based on selected product
    - [ ] Quantity selector (1–5)
    - [ ] Pre-selection from "Order This" CTA works correctly
  - [ ] **Step 3 — Your Details**
    - [ ] Parent/guardian name
    - [ ] Email address
    - [ ] WhatsApp number (primary contact for mockup delivery)
    - [ ] Delivery address (street, suburb, city, province, postal code)
  - [ ] **Step 4 — Submit**
    - [ ] Order summary review (all fields, artwork thumbnail, selected product)
    - [ ] POPIA consent checkbox — required, links to Privacy Policy modal
    - [ ] Total price display (product price + shipping if applicable)
    - [ ] "Submit Order" button — triggers `orders.js` adapter
    - [ ] In simulation: logs payload, fires "[SIM] Order received" toast, navigates to `OrderConfirmation`
    - [ ] In live mode: POSTs to Formspree/Supabase, triggers `email.js` adapter, navigates to `OrderConfirmation`
  - [ ] Field validation on submit (required fields, file present, email format, phone format)
  - [ ] Multi-step progress persists in local state (don't lose data on step back)
- [ ] Wire module into `main.js` render pass

**Gate:** Full form flow works in simulation. Submit fires `[SIM]` console tag + toast. All validation fires on empty submit. Product pre-selection from Phase 2 works.

---

## Phase 4 — Content Sections

*Education, trust, and social proof. Converts browsers into submitters.*

- [ ] `src/modules/HowItWorks.js` — `render()` + `init()`
  - [ ] 5-step horizontal flow (desktop) / vertical stacked (mobile)
  - [ ] Step 1: Upload — icon + copy
  - [ ] Step 2: We Enhance — icon + copy (this is the magic)
  - [ ] Step 3: Preview Mockup — icon + copy
  - [ ] Step 4: Approve — icon + copy
  - [ ] Step 5: Delivered — icon + copy
  - [ ] CTA at end: "Start with your artwork →" scrolls to `#upload`
  - [ ] Animated step reveal on scroll (IntersectionObserver)
- [ ] `src/modules/Gallery.js` — `render()` + `init()`
  - [ ] Section header: "Real artwork. Real results."
  - [ ] Before/after grid from `BRAND.demo` assets (original → enhanced → on product)
  - [ ] Masonry or uniform grid layout
  - [ ] Customer photo features with first name + city (from `manifest.js` demo data)
  - [ ] Lightbox on click (JS, no external library)
  - [ ] Instagram CTA: "See more on @dreamprintsa →"
- [ ] `src/modules/Testimonials.js` — `render()` + `init()`
  - [ ] 3–5 testimonial cards from `BRAND.testimonials` demo array
  - [ ] Star rating, quote, parent name, child age, product purchased
  - [ ] Auto-scroll carousel (mobile), static grid (desktop)
- [ ] `src/components/About.js` — `render()` + `init()`
  - [ ] Two-column layout: founder portrait (left) + story text (right)
  - [ ] Portrait placeholder frame (decorative, same pattern as wellness project)
  - [ ] Founder name + title from `BRAND.founder`
  - [ ] Bio text from `BRAND.founder.bio`
  - [ ] Mission statement
  - [ ] "SA-made · POPIA compliant · Nationwide delivery" trust badges
- [ ] `src/modules/FAQ.js` — `render()` + `init()`
  - [ ] Accordion items from `BRAND.faq` array in `manifest.js`
  - [ ] Min 8 questions covering: turnaround, formats, refunds, shipping, quality, revisions, POPIA
  - [ ] Smooth expand/collapse animation
  - [ ] One item open at a time
- [ ] Wire all modules into `main.js` render pass

**Gate:** All 5 sections render from manifest data. Animations fire on scroll. Gallery lightbox opens. FAQ accordion functions.

---

## Phase 5 — Contact & WhatsApp Engine

- [ ] `src/modules/ContactEngine.js` — `render()` + `init()`
  - [ ] Section header + sub-copy
  - [ ] Email enquiry form: name, email, message, submit
    - [ ] Simulation: logs payload + toast
    - [ ] Live: POSTs to `BRAND.integrations.formEndpoint`
  - [ ] WhatsApp CTA card: "Chat with us directly" — links to `wa.me/` with pre-filled message
  - [ ] Response time promise: "WhatsApp: within 1 hour · Email: within 2 hours (business hours)"
  - [ ] Social media links row: Instagram · Facebook · TikTok · Pinterest
  - [ ] Email address display: `BRAND.email`
- [ ] WhatsApp FAB (in Navbar.js) confirmed working on mobile
- [ ] WhatsApp pre-filled message: "Hi, I'd like to create a custom product for my child!"
- [ ] Wire into `main.js`

**Gate:** Form submits in simulation. WhatsApp link opens correct conversation on mobile. All contact details render from `BRAND`.

---

## Phase 6 — Order Confirmation & Post-Submit Flow

- [ ] `src/modules/OrderConfirmation.js` — `render()` + `init()`
  - [ ] Rendered at `/order-confirmed` route (or shown as overlay post-submit)
  - [ ] Order reference number (generated client-side: `DP-XXXXXX` in sim, Supabase ID in live)
  - [ ] "What happens next" timeline: 3 steps — Enhancement (2–3 days), Mockup Preview (48hr window), Production & Delivery (5–7 days)
  - [ ] Estimated delivery date range (computed from `BRAND.fulfillment` turnaround)
  - [ ] "We'll contact you on WhatsApp and email" confirmation message
  - [ ] WhatsApp CTA: "Questions? Chat with us"
  - [ ] "Share the love" social share prompt (optional)
- [ ] Payment simulation flow:
  - [ ] `payment.js` adapter in sim mode renders a "Simulate Successful Payment" button
  - [ ] On click: fires `[SIM]` tag, navigates to `OrderConfirmation` with simulated order data
  - [ ] In live mode: redirects to PayFast hosted payment page, PayFast redirects back to `/order-confirmed`

**Gate:** Order confirmation renders correctly with sim order data. Payment simulation button works. PayFast redirect URL is correctly constructed (even though merchant ID is null in sim).

---

## Phase 7 — Compliance & POPIA Layer

- [ ] `src/components/ConsentBanner.js` — `render()` + `init()`
  - [ ] Bottom-of-screen banner on first visit
  - [ ] "By using this site, you consent to our use of data as described in our Privacy Policy."
  - [ ] "Accept" button writes `dp_consent=true` to `localStorage`
  - [ ] "Privacy Policy" text triggers Privacy Policy modal
  - [ ] Banner does not re-appear after acceptance
- [ ] `src/modules/LegalModals.js` — `render()` + `init()`
  - [ ] Four overlay modals: Privacy Policy · Terms & Conditions · Refund Policy · Shipping Policy
  - [ ] Triggered by: Footer legal links, ConsentBanner link, Upload Portal POPIA checkbox link
  - [ ] Each modal: heading, full copy (from `BRAND.legal` in `manifest.js`), close button
  - [ ] Close on backdrop click or Escape key
  - [ ] Scroll independently of page
  - [ ] POPIA-compliant copy: data collected, how used, POPIA information officer contact
- [ ] Populate `BRAND.legal` in `manifest.js` with draft copy for all four policies
- [ ] Wire both into `main.js`

**Gate:** Consent banner fires on first load, does not reappear after accept. All 4 modal triggers open the correct modal. Modals close correctly. POPIA officer field renders (even if `null` placeholder in sim).

---

## Phase 8 — Admin Dashboard

*Founder-facing. Auth-gated. Works fully in simulation mode with demo orders.*

- [ ] `src/admin/AdminShell.js` — `render()` + `init()`
  - [ ] Auth gate: sim mode checks `localStorage` for token; live mode delegates to `auth.js` adapter
  - [ ] Login form: password input, "Enter Dashboard" button
  - [ ] Sidebar nav: Orders · Settings · Logout
  - [ ] Order queue badge counter (count of RECEIVED + ENHANCING orders)
  - [ ] Renders `OrderQueue` by default after auth
- [ ] `src/admin/OrderQueue.js` — `render()` + `init()`
  - [ ] Table: Order ID · Child Name · Product · Status · Date · Actions
  - [ ] Status colour coding: RECEIVED (yellow) · ENHANCING (blue) · MOCKUP_SENT (purple) · APPROVED (green) · PAID (teal) · IN_PRODUCTION (orange) · SHIPPED (indigo) · DELIVERED (grey)
  - [ ] In simulation: renders `BRAND.demo.orders` array
  - [ ] In live mode: fetches from Supabase via `orders.js` adapter
  - [ ] Artwork download link per row
  - [ ] Customer WhatsApp link per row
  - [ ] Click row → opens `OrderDetail`
  - [ ] Filter by status (tab strip)
  - [ ] Sort by date (default: newest first)
- [ ] `src/admin/OrderDetail.js` — `render()` + `init()`
  - [ ] Full order card: all submitted fields, artwork preview, current status
  - [ ] Status history log (timestamped)
  - [ ] `StatusEngine` action buttons (context-aware — shows only valid next transitions)
  - [ ] `MockupUploader` embedded for MOCKUP_SENT step
  - [ ] Customer contact row: email + WhatsApp button
  - [ ] Supplier order reference field (manual entry, saved to order)
  - [ ] Tracking number field (manual entry for SHIPPED transition)
- [ ] `src/admin/StatusEngine.js`
  - [ ] `transition(orderId, newStatus)` — validates state machine rules, updates order
  - [ ] In simulation: updates `localStorage` order state + fires toast
  - [ ] In live mode: writes to Supabase, triggers `email.js` customer notification
  - [ ] Each transition fires the correct customer email template
- [ ] `src/admin/MockupUploader.js` — `render()` + `init()`
  - [ ] File input for enhanced mockup image
  - [ ] In simulation: reads file locally, shows preview, logs "mockup would be emailed to customer"
  - [ ] In live mode: uploads to Supabase Storage, triggers customer email with mockup link via `email.js`
  - [ ] "Revision requested" button — transitions status back to REVISION_REQUESTED
- [ ] Wire admin into `main.js` under `/admin` route guard (not included in customer-facing render pass)

**Gate:** Admin login works with sim password. Order queue renders demo orders. All status transitions fire toasts in sim. MockupUploader previews file upload. All demo order data renders in OrderDetail.

---

## Phase 9 — SEO Engine & Launch Gate

- [ ] `src/core/SEOEngine.js` complete
  - [ ] `<title>` — dynamic per page: "DreamPrint SA — Custom Children's Artwork Products"
  - [ ] `<meta name="description">` — from `BRAND.tagline` + `BRAND.description`
  - [ ] Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
  - [ ] Twitter Card tags
  - [ ] `<link rel="canonical">` — keyed to `BRAND.domain`
  - [ ] JSON-LD structured data: `LocalBusiness` schema (name, address, phone, url)
  - [ ] JSON-LD structured data: `Product` schema per product (name, description, price, image)
  - [ ] Favicon links: ICO + SVG + Apple Touch Icon
- [ ] `scripts/launch.js` complete
  - [ ] Scans `manifest.js` for all `null` values — logs advisory warning per field
  - [ ] Scans `flags.js` for any `true` switches — warns if any simulation flag still active
  - [ ] Toggles `public/robots.txt`: `Disallow: /` → `Allow: /` + `Sitemap:` directive
  - [ ] Generates `public/sitemap.xml` — 6 URLs keyed to `BRAND.domain`
  - [ ] Exit code always 0 (warnings non-blocking)
- [ ] Run `npm run build` — confirm zero errors, confirm bundle size documented in `CLAUDE.md`
- [ ] Run `npm run preview` — confirm production build matches dev
- [ ] Run `npm run launch` — review all warnings, document in manifest outstanding items

**Gate:** Clean production build. `npm run launch` runs without errors. All SEO tags render in production HTML. sitemap.xml generated.

---

## SVVP Complete — Staging Checklist

The SVVP is complete and the staging URL is the canonical demo when all of the following are checked:

- [ ] All phases above marked complete
- [ ] Every page section renders without console errors in simulation mode
- [ ] Upload portal accepts a file and shows "[SIM] Order received" confirmation
- [ ] Admin dashboard shows demo orders, all status transitions fire
- [ ] Payment simulation button flows through to OrderConfirmation
- [ ] POPIA consent banner fires on first load, persists on dismissal
- [ ] All 4 legal modals open and close correctly
- [ ] Mobile responsive — every section usable at 390px viewport
- [ ] WhatsApp FAB visible and functional on mobile
- [ ] `npm run build` exits clean
- [ ] `npm run launch` runs — warnings logged, zero errors
- [ ] Staging URL is live and shareable

---

## Switch Flip Log

*Record each switch flip here as it is executed.*

| Date | Switch | `flags.js` key set to | Confirmed by |
|------|--------|----------------------|-------------|
| — | Upload | `uploadSimulated: false` | — |
| — | Orders | `ordersSimulated: false` | — |
| — | Payment | `paymentSimulated: false` | — |
| — | Email | `emailSimulated: false` | — |
| — | Admin Auth | `adminSimulated: false` | — |

---

## Pre-Production Final Gate

Run before `vercel --prod`:

- [ ] All 5 simulation flags set to `false`
- [ ] All `null` values in `manifest.js` resolved (see `DREAMPRINT_BUILD_MANIFEST.md`)
- [ ] All asset files placed in `public/assets/`
- [ ] `vercel.json` headers block removed (or file deleted)
- [ ] `npm run launch` — zero warnings
- [ ] `npm run build` — clean build
- [ ] DNS `A` record pointed at Vercel (confirm propagation)
- [ ] SSL certificate active on `dreamprintsa.co.za`
- [ ] Production smoke test: place a real test order end-to-end
- [ ] `vercel --prod` — promote to production domain
