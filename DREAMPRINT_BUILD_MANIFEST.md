# DREAMPRINT_BUILD_MANIFEST.md — Source of Truth

All factual brand data lives here first. Update this document when confirmed details
are received, then mirror the changes into `src/core/manifest.js`.

---

## Phase Status

| Phase | Name | Status |
|-------|------|--------|
| 0 | Substrate (Project Init, Tooling, Manifest, Flags) | **Complete** |
| 1 | Core Layout (Navbar, Hero, Footer) | **Complete** |
| 2 | Product Showcase (ProductShowcase, ProductDetail) | **Complete** |
| 3 | Upload Portal (UploadPortal — core feature) | **Complete** |
| 4 | Content Sections (HowItWorks, Gallery, About, Testimonials, FAQ) | **Complete** |
| 5 | Contact & WhatsApp Engine | **Complete** |
| 6 | Order Confirmation & Post-Submit Flow | **Complete** |
| 7 | Compliance & POPIA Layer (ConsentBanner, LegalModals) | **Complete** |
| 8 | Admin Dashboard (OrderQueue, OrderDetail, StatusEngine, MockupUploader) | **Complete** |
| 9 | SEO Engine & Launch Gate | **In Progress** |

---

## Brand Identity

| Field | Value |
|-------|-------|
| **Legal name** | DreamPrint SA (Pty) Ltd |
| **Trading name** | DreamPrint SA |
| **Tagline** | Turn your child's art into something they'll wear forever. |
| **Sub-tagline** | Custom-printed keepsakes from children's drawings — SA-made, delivered nationwide. |
| **CIPC Reg No** | TBC |
| **VAT No** | TBC — optional until R1M revenue |
| **Domain** | `dreamprintsa.co.za` |
| **Alt domain** | `mzansipjstudio.co.za` (fallback if primary unavailable) |

---

## Contact & Social

| Field | Value |
|-------|-------|
| **WhatsApp Business** | TBC |
| **Email** | TBC — recommended: hello@dreamprintsa.co.za |
| **Instagram** | @dreamprintsa |
| **Facebook** | /dreamprintsa |
| **TikTok** | @dreamprintsa |
| **Pinterest** | /dreamprintsa |

> Social handles are reserved. Confirm account creation before populating `manifest.js`.

---

## Founder / Principal

| Field | Value |
|-------|-------|
| **Full name** | TBC |
| **Role title** | Founder & Creative Director |
| **Short bio** | TBC — for About section |
| **Portrait photo** | TBC — `public/assets/images/founder-portrait.jpg` |
| **Founder story** | TBC — Why DreamPrint was started (for About + marketing copy) |

---

## Product Catalog — Launch Set

### PJ Set (Custom Pyjama Set)

| Field | Value |
|-------|-------|
| **ID** | `pj-set` |
| **Name** | Custom PJ Set |
| **Tagline** | Wear their masterpiece to bed |
| **Price range** | R799 – R1,299 |
| **Sizes** | Kids 4 · Kids 6 · Kids 8 · Kids 10 · Kids 12 · Adult S · Adult M · Adult L |
| **Turnaround** | 10–12 days |
| **Supplier COGS** | ~R350–R450 (dropship) |
| **Featured** | Yes |
| **Images** | TBC — `public/assets/products/pj-set/` |

---

### T-Shirt (Custom Kids/Adult T-Shirt)

| Field | Value |
|-------|-------|
| **ID** | `tee` |
| **Name** | Custom T-Shirt |
| **Tagline** | Their art, your favourite tee |
| **Price range** | R450 – R650 |
| **Sizes** | Kids 4 · Kids 6 · Kids 8 · Kids 10 · Kids 12 · Adult S · Adult M · Adult L |
| **Turnaround** | 10–12 days |
| **Supplier COGS** | ~R150–R200 (dropship) |
| **Featured** | Yes |
| **Images** | TBC — `public/assets/products/tee/` |

---

### Mug (Custom Ceramic Mug)

| Field | Value |
|-------|-------|
| **ID** | `mug` |
| **Name** | Custom Mug |
| **Tagline** | Every morning with their art |
| **Price range** | R349 – R449 |
| **Sizes** | Standard (330ml) · Large (450ml) |
| **Turnaround** | 10–12 days |
| **Supplier COGS** | ~R80–R120 (dropship) |
| **Featured** | Yes |
| **Images** | TBC — `public/assets/products/mug/` |

---

### Tote Bag (Custom Canvas Tote)

| Field | Value |
|-------|-------|
| **ID** | `tote-bag` |
| **Name** | Custom Tote Bag |
| **Tagline** | Carry their creativity everywhere |
| **Price range** | R299 – R399 |
| **Sizes** | One Size |
| **Turnaround** | 10–12 days |
| **Supplier COGS** | ~R120–R160 (dropship) |
| **Featured** | No — Phase 2 featured |
| **Images** | TBC — `public/assets/products/tote-bag/` |

---

## Product Catalog — Phase 2 Expansions (Month 7–8)

| ID | Product | Price Range | Notes |
|----|---------|------------|-------|
| `phone-case` | Phone Case | R349 – R449 | High margin 60%+, easy ship |
| `puzzle` | Custom Puzzle | R299 – R399 | 24 or 48 piece, great for younger kids |
| `blanket` | Custom Blanket | R899 – R1,299 | High ticket, premium positioning |
| `water-bottle` | Custom Water Bottle | R249 – R349 | School essential, repeat visibility |
| `canvas-print` | Canvas Print | R599 – R999 | Wall art, nursery decor, gifting |
| `notebook` | Custom Notebook | R149 – R249 | Lower price point, gateway product |
| `backpack` | Custom Backpack | R549 – R749 | School essential, high perceived value |

---

## Bundles

| ID | Name | Price | Includes |
|----|------|-------|---------|
| `grandparent-gift-box` | Grandparent Gift Box | R999 | Mug + Canvas Print + Greeting Card + Gift Wrapping |
| `sibling-set` | Sibling Set | R1,299 | 2× T-Shirts + 2× Mugs (save R150) |
| `first-day-bundle` | First Day of School Bundle | R1,899 | Backpack + Water Bottle + Notebook (save R200) |
| `family-movie-night` | Family Movie Night | R2,499 | 4× PJ Sets + Blanket (save R300) |

---

## Fulfillment

| Field | Value |
|-------|-------|
| **Total turnaround** | 10–12 days |
| **Enhancement time** | 2–3 days |
| **Customer approval window** | 48 hours |
| **Production time** | 3–5 days (supplier) |
| **Courier time** | 3–5 business days (nationwide) |
| **Free delivery threshold** | Orders over R650 |
| **Courier partners** | TBC — Pargo (free collection option), Courier Guy, Dawn Wing |
| **Blind shipping** | Yes — no supplier branding on parcels |

---

## Primary Suppliers

| Supplier | Location | Products | Contact Status |
|----------|----------|---------|----------------|
| OneOff.co.za | Johannesburg | DTG/DTF — T-shirts, hoodies, mugs, bags | To contact |
| TeePrint.co.za | Nationwide | Wide range, dropshipping, API integration | To contact |
| Off Print | Johannesburg | Same-day/rush orders | To contact |
| OTC Printing | Bloemfontein | No minimums, 2–5 day turnaround | To contact |

> Negotiate: payment terms (upfront vs 30 days), volume discounts, rush order fees, defect replacement, blind shipping confirmation.

---

## Integrations

| Integration | Config Key | Status | Service |
|------------|-----------|--------|---------|
| Artwork upload | `uploadcareKey` | TBC | Uploadcare (public key — client-safe) |
| Order submission | `formEndpoint` | TBC | Formspree URL (Phase 1) or Supabase function URL (Phase 2) |
| Payment | `payfastMerchantId` | TBC | PayFast |
| Payment (secure) | `payfastMerchantKey` | TBC | PayFast — env var only, never client-side |
| Email | `mailerLiteKey` | TBC | MailerLite — env var only, never client-side |
| Backend DB | `supabaseUrl` | TBC | Supabase (Phase 2) |
| Backend (public) | `supabaseAnonKey` | TBC | Supabase anon key — client-safe |
| Admin auth | — | TBC | Supabase Auth (Phase 2) |

---

## Design System

| Token | Hex | Usage |
|-------|-----|-------|
| `dp-coral` | `#E8634A` | Primary CTA buttons, action elements, accents |
| `dp-coral-dark` | `#C44E35` | Hover state on coral elements |
| `dp-yellow` | `#F5C842` | Secondary accent, highlight strokes, before/after badge |
| `dp-navy` | `#1A2B4A` | All headings, body text, footer background |
| `dp-navy-light` | `#2A3F6A` | Hover state on navy, nav dropdowns |
| `dp-cream` | `#FDF8F2` | Primary page background |
| `dp-cream-dark` | `#F5EDE0` | Section alternating background (HowItWorks, FAQ) |
| `dp-sage` | `#4A7C6F` | Success states, trust badges, POPIA banner, confirmation |
| `dp-sage-light` | `#6A9E92` | Hover on sage |

| Role | Font | Weight |
|------|------|--------|
| Display headings | Nunito | 700, 800 — rounded, friendly, legible |
| Body copy | Inter | 400, 500 — clean, neutral |
| Labels / UI | Inter | 500, 600 |

Source: Google Fonts CDN (`preconnect` in `<head>`, loaded as `font-display: swap`).

---

## Brand Assets

| Asset | Path | Status |
|-------|------|--------|
| Logo (primary) | `public/assets/images/logo-color.svg` | TBC |
| Logo (white) | `public/assets/images/logo-white.svg` | TBC |
| Logo (dark) | `public/assets/images/logo-dark.svg` | TBC |
| Favicon | `public/favicon.ico` + `public/favicon.svg` | TBC |
| Founder portrait | `public/assets/images/founder-portrait.jpg` | TBC |
| Hero background | `public/assets/images/hero-bg.jpg` | TBC — family/child art lifestyle shot |
| Demo artwork 1 | `public/assets/demo/artwork-1.jpg` | To source — child drawing sample |
| Demo artwork 2 | `public/assets/demo/artwork-2.jpg` | To source — child drawing sample |
| Demo enhanced 1 | `public/assets/demo/enhanced-1.jpg` | To source — digitally cleaned version |
| Demo enhanced 2 | `public/assets/demo/enhanced-2.jpg` | To source — digitally cleaned version |
| Product: PJ Set | `public/assets/products/pj-set/` | TBC — min 3 photos |
| Product: T-Shirt | `public/assets/products/tee/` | TBC — min 3 photos |
| Product: Mug | `public/assets/products/mug/` | TBC — min 3 photos |
| Product: Tote Bag | `public/assets/products/tote-bag/` | TBC — min 3 photos |

---

## Compliance

| Item | Status |
|------|--------|
| CIPC Pty Ltd registration | TBC |
| POPIA information officer | TBC |
| Privacy Policy | To draft — modal (LegalModals.js) |
| Terms & Conditions | To draft — modal (LegalModals.js) |
| Refund Policy | To draft — modal (LegalModals.js) |
| Shipping Policy | To draft — modal (LegalModals.js) |
| POPIA consent banner | To build — `localStorage` key: `dp_consent` |
| Domain secured | TBC |
| robots.txt (staging) | `Disallow: /` — flip to `Allow: /` on production |
| sitemap.xml | Generated by `scripts/launch.js` on go-live |
| Professional indemnity insurance | TBC — R1,500–R3,000/year (Hollard, Santam) |
| Product liability insurance | TBC — R2,000–R4,000/year (children's products) |

---

## Financial Reference (from Business Playbook)

| Metric | Value |
|--------|-------|
| Average order value (AOV) | R650 |
| Price range per order | R450 – R2,200 |
| Target gross profit margin | 45–55% |
| Target net profit margin | 25–35% |
| Customer acquisition cost (CAC) target | R150–R300 |
| Customer lifetime value (CLV) target | R1,200–R2,500 |
| Break-even target | Month 5–7 |
| Product COGS (variable) | 40–50% of retail |
| Payment processing fee | 2.9% + R2 (PayFast) |
| Fulfilment: shipping to customer | R80–R150 (unless free promo) |
| Packaging materials | R10–R20 per order |

*These figures inform pricing displayed in `manifest.js` and the product catalog. Do not hard-code in components.*

---

## Outstanding Items — Switch Flip Checklist

### Flags (simulation → live)
- [ ] `FLAGS.uploadSimulated` → flip when Uploadcare key confirmed
- [ ] `FLAGS.ordersSimulated` → flip when Formspree/Supabase endpoint confirmed
- [ ] `FLAGS.paymentSimulated` → flip when PayFast merchant credentials confirmed
- [ ] `FLAGS.emailSimulated` → flip when MailerLite API key + template IDs confirmed
- [ ] `FLAGS.adminSimulated` → flip when Supabase Auth or admin password configured

### Brand Data (manifest.js nulls to resolve)
- [ ] `BRAND.whatsapp` — WhatsApp Business number
- [ ] `BRAND.email` — business email address
- [ ] `BRAND.phone` — business telephone
- [ ] `BRAND.social.instagram` — handle confirmed + account created
- [ ] `BRAND.social.facebook` — page confirmed + created
- [ ] `BRAND.social.tiktok` — handle confirmed + created
- [ ] `BRAND.founder.name` — full legal name
- [ ] `BRAND.founder.bio` — approved short bio
- [ ] `BRAND.compliance.registrationNumber` — CIPC Pty Ltd number
- [ ] `BRAND.compliance.popiaContact` — POPIA officer contact
- [ ] `BRAND.integrations.uploadcareKey` — Uploadcare public key
- [ ] `BRAND.integrations.formEndpoint` — Formspree or Supabase URL
- [ ] `BRAND.integrations.payfastMerchantId` — PayFast merchant ID

### Assets (files to place in public/)
- [ ] Logo files (color, white, dark SVG + favicon)
- [ ] Founder portrait photograph
- [ ] Hero background photograph
- [ ] Demo artwork pair (original + enhanced) — 2 sets minimum
- [ ] Product photography — minimum 3 photos per launch-set product
- [ ] Customer testimonial photos (with written permission)

*Never hard-code brand facts in components — always import from `src/core/manifest.js`.*
