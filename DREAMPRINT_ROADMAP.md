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
- [x] Init git repo + first commit
- [x] Create Vercel project, link repo, confirm staging URL auto-deploys on push to `main`

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
- [x] Confirm layout renders correctly on 390px, 768px, 1280px, 1440px viewports

**Gate:** Navbar and Footer render on staging. Mobile hamburger functions. All links present (anchors scroll to `#placeholder` without error).

---

## Phase 2 — Product Showcase

*The shop — what we sell and at what price.*

- [x] `src/modules/ProductShowcase.js` — `render()` + `init()`
  - [x] Section header + tagline from `BRAND`
  - [x] Product grid (2 cols mobile, 4 cols desktop) from `BRAND.products` array
  - [x] Each product card: placeholder image, name, tagline, price range, "Order This" CTA
  - [x] Filter bar: All · PJs · T-Shirts · Mugs · Bags (JS filter, no page reload)
  - [x] "Order This" button scrolls to `#upload` and pre-selects that product in UploadPortal
  - [x] `featured: true` products visually distinguished (badge, priority grid position)
- [x] `src/modules/ProductDetail.js` — `render()` + `init()`
  - [x] Overlay modal triggered from product card "View Details" link
  - [x] Product photo carousel (placeholder images, JS-controlled)
  - [x] Size guide table
  - [x] Full pricing breakdown
  - [x] Turnaround time from `BRAND.products[].turnaround`
  - [x] Shipping info pull from `BRAND.fulfillment`
  - [x] "Order This" CTA (same behaviour as card CTA)
  - [x] Close on backdrop click or Escape key
- [x] Wire both modules into `main.js` render pass
- [x] Bundles section: render `BRAND.bundles` array as cards below main product grid

**Gate:** All 4 launch products display from manifest data. Filter works. ProductDetail overlay opens/closes. "Order This" scrolls to `#upload`.

---

## Phase 3 — Upload Portal

*The core of the entire business. The order begins here.*

- [x] `src/modules/UploadPortal.js` — `render()` + `init()`
  - [x] Section header: "Upload Your Child's Artwork"
  - [x] Step indicator: 1 Upload → 2 Choose → 3 Your Details → 4 Submit
  - [x] **Step 1 — Artwork**
    - [x] Uploadcare widget (simulation: standard `<input type="file">` + fake CDN URL response)
    - [x] Accepted formats label: JPG, PNG, HEIC — "A clear phone photo is perfect"
    - [x] Child's name input field
    - [x] Special instructions textarea: colour preferences, placement notes
  - [x] **Step 2 — Product**
    - [x] Product type radio group (from `BRAND.products`) — with image thumb per option
    - [x] Size dropdown — options update conditionally based on selected product
    - [x] Quantity selector (1–5)
    - [x] Pre-selection from "Order This" CTA works correctly
  - [x] **Step 3 — Your Details**
    - [x] Parent/guardian name
    - [x] Email address
    - [x] WhatsApp number (primary contact for mockup delivery)
    - [x] Delivery address (street, suburb, city, province, postal code)
  - [x] **Step 4 — Submit**
    - [x] Order summary review (all fields, artwork thumbnail, selected product)
    - [x] POPIA consent checkbox — required, links to Privacy Policy modal
    - [x] Total price display (product price + shipping if applicable)
    - [x] "Submit Order" button — triggers `orders.js` adapter
    - [x] In simulation: logs payload, fires "[SIM] Order received" toast, navigates to `OrderConfirmation`
    - [x] In live mode: POSTs to Formspree/Supabase, triggers `email.js` adapter, navigates to `OrderConfirmation`
  - [x] Field validation on submit (required fields, file present, email format, phone format)
  - [x] Multi-step progress persists in local state (don't lose data on step back)
- [x] Wire module into `main.js` render pass

**Gate:** Full form flow works in simulation. Submit fires `[SIM]` console tag + toast. All validation fires on empty submit. Product pre-selection from Phase 2 works.

---

## Phase 4 — Content Sections

*Education, trust, and social proof. Converts browsers into submitters.*

- [x] `src/modules/HowItWorks.js` — `render()` + `init()`
  - [x] 5-step horizontal flow (desktop) / vertical stacked (mobile)
  - [x] Step 1: Upload — icon + copy
  - [x] Step 2: We Enhance — icon + copy (this is the magic)
  - [x] Step 3: Preview Mockup — icon + copy
  - [x] Step 4: Approve — icon + copy
  - [x] Step 5: Delivered — icon + copy
  - [x] CTA at end: "Start with your artwork →" scrolls to `#upload`
  - [x] Animated step reveal on scroll (IntersectionObserver)
- [x] `src/modules/Gallery.js` — `render()` + `init()`
  - [x] Section header: "Real artwork. Real results."
  - [x] Before/after grid from `BRAND.demo` assets (original → enhanced → on product)
  - [x] Masonry or uniform grid layout
  - [x] Customer photo features with first name + city (from `manifest.js` demo data)
  - [x] Lightbox on click (JS, no external library)
  - [x] Instagram CTA: "See more on @dreamprintsa →"
- [x] `src/modules/Testimonials.js` — `render()` + `init()`
  - [x] 3–5 testimonial cards from `BRAND.testimonials` demo array
  - [x] Star rating, quote, parent name, child age, product purchased
  - [x] Auto-scroll carousel (mobile), static grid (desktop)
- [x] `src/components/About.js` — `render()` + `init()`
  - [x] Two-column layout: founder portrait (left) + story text (right)
  - [x] Portrait placeholder frame (decorative, same pattern as wellness project)
  - [x] Founder name + title from `BRAND.founder`
  - [x] Bio text from `BRAND.founder.bio`
  - [x] Mission statement
  - [x] "SA-made · POPIA compliant · Nationwide delivery" trust badges
- [x] `src/modules/FAQ.js` — `render()` + `init()`
  - [x] Accordion items from `BRAND.faq` array in `manifest.js`
  - [x] Min 8 questions covering: turnaround, formats, refunds, shipping, quality, revisions, POPIA
  - [x] Smooth expand/collapse animation
  - [x] One item open at a time
- [x] Wire all modules into `main.js` render pass

**Gate:** All 5 sections render from manifest data. Animations fire on scroll. Gallery lightbox opens. FAQ accordion functions.

---

## Phase 5 — Contact & WhatsApp Engine

- [x] `src/modules/ContactEngine.js` — `render()` + `init()`
  - [x] Section header + sub-copy
  - [x] Email enquiry form: name, email, message, submit
    - [x] Simulation: logs payload + toast
    - [x] Live: POSTs to `BRAND.integrations.formEndpoint`
  - [x] WhatsApp CTA card: "Chat with us directly" — links to `wa.me/` with pre-filled message
  - [x] Response time promise: "WhatsApp: within 1 hour · Email: within 2 hours (business hours)"
  - [x] Social media links row: Instagram · Facebook · TikTok · Pinterest
  - [x] Email address display: `BRAND.email`
- [x] WhatsApp FAB (in Navbar.js) confirmed working on mobile
- [x] WhatsApp pre-filled message: "Hi, I'd like to create a custom product for my child!"
- [x] Wire into `main.js`

**Gate:** Form submits in simulation. WhatsApp link opens correct conversation on mobile. All contact details render from `BRAND`.

---

## Phase 6 — Order Confirmation & Post-Submit Flow

- [x] `src/modules/OrderConfirmation.js` — `render()` + `init()`
  - [x] Rendered at `?order=DP-XXXXXX` route (URL param triggers isolated confirmation layout)
  - [x] Order reference number (generated client-side: `DP-XXXXXX` in sim, Supabase ID in live)
  - [x] "What happens next" timeline: 4 steps — Enhancement, Mockup Preview, Production, Delivery
  - [x] Estimated delivery date range (computed from `BRAND.fulfillment` turnaround)
  - [x] Itemized pricing ledger: base price + shipping threshold (free ≥ R650, else R99)
  - [x] WhatsApp CTA: "Questions? Chat with us"
- [x] Payment simulation flow:
  - [x] `processPayment()` adapter in sim mode: 1500ms delay, marks order PAID in localStorage
  - [x] On click: fires `[SIM]` tag, status banner transitions to sage/paid state
  - [x] In live mode: redirects to PayFast hosted payment page via `initiatePayment()`
- [x] `main.js` dual-route: `?order=` param isolates confirmation view (Navbar + Confirmation + Footer only)

**Gate:** Order confirmation renders correctly with sim order data. Payment simulation button works. PayFast redirect URL is correctly constructed (even though merchant ID is null in sim).

---

## Phase 7 — Compliance & POPIA Layer

- [x] `src/components/ConsentBanner.js` — `render()` + `init()`
  - [x] Bottom-of-screen banner on first visit
  - [x] "By using this site, you consent to our use of data as described in our Privacy Policy."
  - [x] "Accept" button writes `dp_consent_accepted=true` to `localStorage`
  - [x] "Privacy Policy" / "POPIA Notice" text triggers POPIA modal via `dp:openModal` event
  - [x] Banner does not re-appear after acceptance (localStorage guard in `init()`)
  - [x] Slide-up CSS transition animation on entry
- [x] `src/modules/LegalModals.js` — `render()` + `init()`
  - [x] Four overlay modals: Privacy Policy · Terms & Conditions · POPIA Notice · Shipping Policy
  - [x] Triggered by: Footer legal links, ConsentBanner link, UploadPortal POPIA checkbox link
  - [x] Each modal: heading + structured full copy from `BRAND.legal.*` + `BRAND.compliance.*`
  - [x] Close on backdrop click or Escape key — `transitionend` fires hidden
  - [x] Scroll independently of page (`overflow-y-auto` on modal card, `overflow-hidden` on body)
  - [x] POPIA notice: responsible party, data categories, processing purpose, officer contact
  - [x] Global `[data-modal]` click delegation — captures triggers from Footer, UploadPortal, ConsentBanner
- [x] `BRAND.legal` populated with draft copy for all four policies in `manifest.js`
- [x] Wire both into `main.js` — appended to both `mountCustomer()` and `mountConfirmation()`

**Gate:** Consent banner fires on first load, does not reappear after accept. All 4 modal triggers open the correct modal. Modals close correctly. POPIA officer field renders (even if `null` placeholder in sim).

---

## Phase 8 — Admin Dashboard

*Founder-facing. Auth-gated. Works fully in simulation mode with demo orders.*

- [x] `src/admin/AdminShell.js` — `render()` + `init()`
  - [x] Fixed sidebar: brand badge, simulation mode indicator, nav menu
  - [x] Sidebar nav: Order Queue · System Settings · Back to Storefront
  - [x] Sticky top toolbar with staff profile area
  - [x] `#admin-content-mount` canvas container
  - [x] Boots `OrderQueue` view by default on load
  - [x] Handles `admin:navigate` custom events for back-from-detail navigation
  - [x] Sidebar active-state highlight management
- [x] `src/admin/OrderQueue.js` — `render()` + `init()`
  - [x] Table: Order Ref · Parent · Child (Artist) · Product · Price · Status · Actions
  - [x] Status colour coding across all 10 lifecycle states
  - [x] In simulation: renders `dp_sim_orders` localStorage (falls back to `BRAND.demo.orders`)
  - [x] "Manage →" click → injects `OrderDetail` view into content mount
  - [x] Empty-state banner with simulation hint
- [x] `src/admin/OrderDetail.js` — `render()` + `init()`
  - [x] Full order card: customer metadata, artwork image, order total
  - [x] Status engine: dropdown across all 10 lifecycle states, active state pre-selected
  - [x] Status change: persists to localStorage, fires `[SIM]` console log + email template log
  - [x] Mockup uploader workspace (visible only on `ENHANCING` status): URL input → advances to `MOCKUP_SENT`
  - [x] Re-hydrates view in-place without page reload on any status change
  - [x] "← Back to Queue" dispatches `admin:navigate` event
  - [x] Fulfillment reference card from `BRAND.fulfillment`
- [x] Wire admin into `main.js` — `mountAdmin()` sets `app.innerHTML = renderAdminShell()` exclusively

**Gate:** Admin dashboard renders at `/admin`. Order queue renders demo orders. All status transitions fire in sim. Mockup uploader advances status. All demo order data renders in OrderDetail.

---

## Phase 9 — SEO Engine & Launch Gate

- [x] `src/core/SEOEngine.js` complete
  - [x] `<title>` — dynamic per page: "DreamPrint SA — Custom Children's Artwork Products"
  - [x] `<meta name="description">` — from `BRAND.tagline` + `BRAND.subTagline`
  - [x] Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
  - [x] Twitter Card tags: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
  - [x] `<link rel="canonical">` — keyed to `BRAND.url`
  - [x] JSON-LD structured data: `LocalBusiness` schema (name, description, url, telephone, email, sameAs)
  - [x] JSON-LD structured data: `Product` schema per product (name, description, price range, AggregateOffer)
  - [x] `SEOEngine.applyMeta()` wired in both `mountCustomer()` and `mountConfirmation()` in `main.js`
- [x] `scripts/launch.js` complete
  - [x] Scans `manifest.js` for all `null` values — logs advisory warning per field
  - [x] Scans `flags.js` for any `true` switches — warns if any simulation flag still active
  - [x] Toggles `public/robots.txt`: `Disallow: /` → `Allow: /` + `Sitemap:` directive
  - [x] Generates `public/sitemap.xml` — 6 URLs keyed to `BRAND.domain`
  - [x] Exit code always 0 (warnings non-blocking)
- [x] `public/robots.txt` — staging: `Disallow: /` enforced (simulation mode)
- [x] `public/sitemap.xml` — 6-URL sitemap pre-generated, refreshed on `npm run launch`
- [x] `npm run build` — clean build, zero errors
- [x] `npm run launch` — advisory warnings logged, zero hard errors

**Gate:** Clean production build. `npm run launch` runs without errors. All SEO tags render in production HTML. sitemap.xml generated.

---

## SVVP Complete — Staging Checklist

The SVVP is complete and the staging URL is the canonical demo when all of the following are checked:

- [x] All phases above marked complete
- [ ] Every page section renders without console errors in simulation mode
- [ ] Upload portal accepts a file and shows "[SIM] Order received" confirmation
- [ ] Admin dashboard shows demo orders, all status transitions fire
- [ ] Payment simulation button flows through to OrderConfirmation
- [ ] POPIA consent banner fires on first load, persists on dismissal
- [ ] All 4 legal modals open and close correctly
- [ ] Mobile responsive — every section usable at 390px viewport
- [ ] WhatsApp FAB visible and functional on mobile
- [x] `npm run build` exits clean
- [x] `npm run launch` runs — warnings logged, zero errors
- [x] Staging URL is live and shareable

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
