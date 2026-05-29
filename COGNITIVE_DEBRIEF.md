# COGNITIVE_DEBRIEF.md
## Collaborative Intelligence Transfer Document

> **Purpose:** Context injector for a new Claude instance entering an active project with this operator.
> Read this in full before touching a single file. This document is the working mental model — not documentation.

---

## 1. THE COGNITIVE SYNCHRONIZATION

### Who This Operator Is

This operator functions as a **systems orchestrator and product architect**. They think in delivery phases, not features. They have already solved the business problem before issuing a directive — they are not exploring; they are executing a known plan through Claude as the implementation layer.

They do not need to be taught web development, Tailwind, or JavaScript patterns. They know what they want. The value Claude adds is precision translation from spec to working code, with zero drift.

### The Communication Protocol

**Directive format:** The operator issues structured implementation prompts broken into numbered sections, each with explicit sub-requirements. These are not suggestions — they are contracts. Every specified element must appear in the output exactly as described unless a genuine architectural blocker exists.

**What "Audit" means in practice:**
- Read every file that will be touched or imported before writing a single line
- Check that the data path exists in `manifest.js` before building against it
- Identify circular import risks before they happen
- Confirm module placement rules are respected
- If a specified function name doesn't exist in an adapter (e.g., `processPayment` when only `initiatePayment` exists), add it to the adapter — do not silently swap names

**What "Flag deficits" means in practice:**
- If the operator asks to import `BRAND.howItWorks` and it doesn't exist in `manifest.js`, build local constants and note it — do not crash or fabricate a wrong path
- If a spec references a null field (e.g., `BRAND.whatsapp`), implement null-safe fallbacks and document the guard in comments
- Surface the deficit in the commit message or summary, not as a question that blocks execution

**Pacing:** One phase = one complete commit + push. Do not split phases across multiple commits unless explicitly instructed. Do not batch phases together. Each delivery is atomic, verifiable, and immediately staged.

**Friction threshold:** Essentially zero. Once the path is confirmed, execute completely. Do not ask clarifying questions mid-implementation. Make the defensible architectural call and document it in code comments.

**The operator's shorthand you will encounter:**
- "SVVP" = System Viable Viable Product — the complete platform in simulation mode before any real credentials
- "Switch flip" = setting one boolean in `flags.js` to false to graduate a dependency from simulated to live
- "Sim mode" = `FLAGS.xyzSimulated: true`, fake responses, `[SIM]` console tags, localStorage persistence
- "The contract" = the render()/init() two-function rule — violated only when there is no alternative
- "Single-pass hydration" = all `render()` calls concatenated to one `app.innerHTML` write before any `init()` fires
- "Null-safe" = the operator will confirm missing data later; never let `null` leak raw into the DOM

### Decision-Making Alignment

When the spec and the codebase conflict, **the codebase wins**. Read the existing implementation patterns and extend them — do not introduce a new pattern unless the spec explicitly requires it.

When two approaches satisfy the spec equally, choose the one that:
1. Requires the fewest new dependencies
2. Maintains the existing module boundary structure
3. Is the most reversible when the client provides real data

Never introduce: React, Vue, Alpine, jQuery, Lodash, or any runtime dependency that isn't already in `package.json`. The stack is intentionally minimal — it is a feature, not a constraint to work around.

---

## 2. ARCHITECTURAL DNA & STACK PREFERENCES

### The SVVP Model

Every project built with this operator follows the **System Viable Viable Product** pattern:

1. Build the complete platform in simulation mode — all UI, all flows, all admin surfaces
2. Every external dependency has a boolean flag in `src/core/flags.js`
3. Every external dependency has an adapter in `src/core/integrations/`
4. When a credential is confirmed, flip one flag — zero component-level code changes required
5. The platform goes to staging immediately on Phase 0 completion and stays staged throughout

This means you build against `null` values constantly. You never say "we can't build this until the client provides X". You build it with a null-safe fallback and document exactly what to replace when X arrives.

### The Two-Function Contract (non-negotiable)

Every module exports exactly two functions:

```js
export function render()  { /* Returns pure HTML string. No DOM. No side effects. */ }
export function init()    { /* Queries DOM. Attaches listeners. Calls adapters.   */ }
```

**`render()` rules — absolute:**
- Returns a template literal string. Nothing else.
- No `document.querySelector()` — returns null before innerHTML is written
- No `addEventListener()` — the DOM element doesn't exist yet
- No `fetch()` or async operations
- No `console.log()` in production paths
- Data is passed in as function arguments or read from imported module-level constants

**`init()` rules:**
- All DOM queries happen here, after `app.innerHTML` has been written
- All event listeners are attached here
- All adapter calls (upload, order submission, payment) happen here
- State lives in closure variables inside `init()`, never on `window` unless cross-module coordination requires it (and even then, use custom events instead where possible)

**The hydration sequence in `main.js`:**
```js
app.innerHTML = [
  renderA(),
  renderB(),
  renderC(),
].join('')   // ← ONE write. All strings concatenated first.

initA()      // ← Then ALL inits, in order.
initB()
initC()
```

Breaking this sequence (calling `document.querySelector` inside `render()`, or writing `innerHTML` inside `init()`) is a class of bug that is easy to miss and silent — it returns `null` and interactive elements simply don't work.

### Module Placement Rules

```
src/components/     Pure UI components. No business logic. No external adapters.
                    Examples: Navbar, Hero, Footer, About, ConsentBanner

src/modules/        Feature modules with state and business logic.
                    Examples: UploadPortal, ProductShowcase, ContactEngine, LegalModals

src/admin/          Admin-only modules. Never imported into customer paths.
                    Examples: AdminShell, OrderQueue, OrderDetail

src/core/           Utilities, data, adapters. No UI.
                    manifest.js   → BRAND object (single source of truth)
                    flags.js      → FLAGS object (all simulation switches)
                    SEOEngine.js  → Head meta management
                    integrations/ → One adapter file per external dependency

scripts/            Node.js tooling. Not bundled into the client.
                    launch.js     → Pre-production validation gate

public/             Static assets served as-is. robots.txt, sitemap.xml, images.
```

**Rule:** A module in `src/admin/` must never be imported into `src/modules/` or `src/components/`. Violation leaks admin UI into customer bundle. The routing isolation in `main.js` enforces this at the mount level.

### Routing Architecture

Three exclusive render paths in `main.js`. Each path hydrates only the modules it needs:

```
/admin              → mountAdmin()         → AdminShell only. No customer modules.
?order=DP-XXXXXX    → mountConfirmation()  → Navbar + OrderConfirmation + Footer + Compliance
everything else     → mountCustomer()      → Full landing page sequence
```

URL-based routing via `window.location.pathname` and `URLSearchParams` — no router library. Vercel's `vercel.json` catch-all rewrite serves `index.html` for all paths; the JS handles routing client-side.

### Simulation / Live Switch Architecture

Every external dependency follows this exact pattern:

```js
// src/core/integrations/example.js
import { FLAGS } from '@/core/flags.js'
import { BRAND } from '@/core/manifest.js'

export async function doThing(payload) {
  if (FLAGS.thingSimulated) {
    console.log('[SIM] example.js — doThing called', payload)
    await new Promise(r => setTimeout(r, 800))   // simulate latency
    return { success: true, id: 'sim-id-001' }   // fake response
  }

  // Live path — uses BRAND.integrations.* for credentials
  const res = await fetch(BRAND.integrations.endpoint, { ... })
  return res.json()
}
```

The `[SIM]` console tag is mandatory. It tells the operator and future developers exactly which paths are simulated without reading source. The delay is intentional — it makes UI loading states testable in simulation mode.

### Design Token System

Tailwind CSS v3 with custom tokens in `tailwind.config.js`:

```
Brand palette:
  dp-coral       #E8634A   Primary CTA, action elements, error states
  dp-coral-dark  #C44E35   Hover on coral
  dp-yellow      #F5C842   Secondary accent, highlight, warnings
  dp-navy        #1A2B4A   All headings, body text, footer background
  dp-navy-light  #2A3F6A   Hover on navy backgrounds
  dp-cream       #FDF8F2   Page background
  dp-cream-dark  #F5EDE0   Alternating section background, card borders
  dp-sage        #4A7C6F   Success, WhatsApp, trust badges, approval states
  dp-sage-light  #6A9E92   Hover on sage

Typography:
  font-display   Nunito 700/800     Section headings, product names, bold labels
  font-body      Inter 400/500/600  All body copy, form labels, data

Component classes in @layer components:
  .btn-primary      Coral CTA, shadow-cta, 48px min-height, active:scale-95
  .btn-secondary    Outlined coral, fills on hover
  .btn-whatsapp     Sage background, white text
  .card             White, rounded-2xl, shadow-card, hover:shadow-card-hover

Custom shadows: shadow-card, shadow-card-hover, shadow-nav, shadow-cta
Custom radii:   rounded-xl (0.875rem), rounded-2xl (1.25rem), rounded-3xl (1.75rem)
```

**Section alternation pattern:** Sections alternate between `bg-dp-cream` and `bg-dp-cream-dark`. Content sections within the same background variant use internal card contrast (`bg-white border border-dp-cream-dark rounded-2xl`).

### UI/UX Tendencies

- **Mobile-first, 390px baseline.** Every section must be fully usable at 390px. WhatsApp CTA always accessible without scrolling on mobile.
- **48px minimum tap targets** on all interactive elements (enforced in `style.css` base layer).
- **Pill badges** for section labels: `inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full` with a colored dot and small-caps text.
- **Status pills** for lifecycle states: background opacity classes (`bg-dp-sage/15 text-dp-sage`) to avoid full saturation.
- **Placeholder-first** for all assets that are TBC: geometric SVGs, avatar initials, decorative blobs — never broken img tags.
- **Null-safe everything.** If `BRAND.founder.name` is null, render `'Our Founder'`. If `BRAND.whatsapp` is null, `href="#"` with `data-sim-whatsapp="true"` and an `init()` intercept.
- **CSS transitions prefer class toggling**, not inline style manipulation. Add/remove `hidden`, `translate-y-full`, `opacity-0`, `pointer-events-none` — never `el.style.display`.
- **Double `requestAnimationFrame`** when a CSS transition needs to fire after `classList.remove('hidden')` — the browser needs two frames to register the new display state before the transition class change takes effect.

### Cross-Module Communication

Modules never import each other across boundaries except at approved seams. Instead, use:

**Custom events on `document`:**
```js
// Sender (any module)
document.dispatchEvent(new CustomEvent('dp:openModal', { detail: { modal: 'privacy' } }))

// Receiver (LegalModals.init())
document.addEventListener('dp:openModal', (e) => openModal(e.detail.modal))
```

**`window.dp_*` globals** for cross-module state that must survive across `init()` boundaries:
```js
window.dp_selected_product   // Set by ProductShowcase/ProductDetail, read by UploadPortal
window.dp_order_id           // Set by UploadPortal after submission, read by OrderConfirmation
window.dp_order_payload      // Full order object for the confirmation page
```

**`data-*` attributes** for JS hooks — never use class names as JS selectors:
```html
<button data-action="manage" data-id="${order.id}">Manage →</button>
<!-- init() queries: document.querySelectorAll('[data-action="manage"]') -->
```

### Data Layer Conventions

**`localStorage` keys used by the platform:**
```
dp_sim_orders         Array of order objects — sim order store, read by admin + confirmation
dp_consent_accepted   'true' string — consent banner suppression flag
```

**`BRAND.demo.*`** is the fallback data when localStorage is empty. Never hardcode demo data inside modules.

---

## 3. THE EXECUTION ENGINE

### Pre-Build Audit (always first)

Before writing any code for a new directive:

1. **Read every file that will be modified.** Even if you think you know its contents — read it. Imports, existing exports, and patterns you assume may have changed.
2. **Read the files you will import from.** Confirm that `BRAND.xyz`, `FLAGS.xyz`, and any adapter function names actually exist. If they don't, add them to the source file first.
3. **Trace the import chain** for circular dependency risk. The only safe chain is: `main.js → modules → core`. Admin modules import other admin modules only.
4. **Check `main.js`** to see the current render/init sequence and where new modules slot in.

### Writing Code

- **Template literals for all HTML.** Single-line expressions are preferred; multi-line template literals use the indentation pattern that matches surrounding HTML.
- **Comment sections with `──` dividers** inside large functions: `// ── Section heading ───────────────────────────────────`
- **No trailing commas in single-line objects.** Multi-line objects always have trailing commas.
- **Async adapter calls** always have try/catch in `init()`. Errors restore UI state (re-enable buttons, show toast).
- **Toast pattern** (used across ContactEngine, OrderConfirmation, AdminShell): `let toastTimer = null` in closure, `clearTimeout(toastTimer)` before setting, 4000ms auto-hide, class rebuild not classList.add.
- **Re-hydration pattern** for admin sub-views: `mount.innerHTML = SubView.render(data); SubView.init(data)` — replaces entire sub-view content, letting the new `init()` create fresh closure state.

### The Build Verification Loop

After every implementation:

```bash
npm run build   # Must exit 0. INEFFECTIVE_DYNAMIC_IMPORT warning is pre-existing, acceptable.
                # Any new error is a blocker — do not commit until resolved.
```

Then commit:

```bash
git add <specific files>   # Never git add -A or git add .
git commit -m "feat: Phase N — ..."
git push origin main       # Always push immediately — triggers Vercel auto-deploy
```

**Commit message format:**
```
feat: Phase N — Module1, Module2, brief description

- Bullet point per significant decision
- Note the key architectural choice made
- Note any sim path / live path split implemented

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
```

**Never amend.** If a pre-commit hook fails or a build breaks, fix and create a new commit. Amending risks destroying previous work.

### What Clean Means

A clean build is:
- Exit code 0 from `npm run build`
- Zero new warnings beyond the pre-existing `INEFFECTIVE_DYNAMIC_IMPORT` on `manifest.js`
- Bundle size documented if it's a milestone phase

The `INEFFECTIVE_DYNAMIC_IMPORT` warning is caused by `orders.js` doing a dynamic `import('@/core/manifest.js')` inside a function body while manifest.js is already statically imported by many modules. This is a pre-existing architectural quirk — do not attempt to fix it unless specifically asked.

### Deployment Architecture

- **Vercel** auto-deploys on every push to `main`
- **Staging URL:** `https://dreamprint-web.vercel.app`
- **SPA routing:** `vercel.json` contains `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }` — essential for any route that isn't a real file path
- **Staging headers:** `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet` applied to all routes in `vercel.json`
- **robots.txt:** Staging mode is `Disallow: /`. Production mode is `Allow: /` + Sitemap — `scripts/launch.js` performs the toggle as the promotion mechanism

### The Launch Gate Protocol

`npm run launch` (`node scripts/launch.js`) does four things:
1. Scans `manifest.js` for `null` values — advisory warning per field
2. Scans `flags.js` for `true` flags — warns if still in simulation
3. Rewrites `robots.txt`: `Disallow: /` → `Allow: /` + Sitemap directive
4. Regenerates `sitemap.xml` with today's dates

**Important:** After running `launch.js` in staging context, manually revert `robots.txt` to `Disallow: /` — the script is idempotent but its toggle is directional. It only runs in one direction per call.

Exit code is always 0. Warnings are advisory. The only hard gate before `vercel --prod` is zero warnings and a clean build.

---

## 4. COMPILATION AND FORESIGHT PROMPT

*The following block is the master directive. Paste it verbatim as the opening system prompt or first user message when initializing a new Claude instance for a project with this operator. Edit the bracketed values for the new project.*

---

```
You are the implementation layer of a two-agent development system.

The operator (your user) is the systems architect and product director. You are the 
execution engine — the "Hands" to their "Brain." Your function is to translate 
structured technical directives into working, committed code with zero friction.

WORKING PROTOCOL:
Before executing any directive:
1. AUDIT — Read every file you will touch. Confirm imports exist. Trace dependency chains.
2. WEIGH — Identify the cleanest isolation path. Never entangle modules.
3. FLAG DEFICITS — Surface missing data or architectural blockers before building against them.
4. PROCEED — Execute completely and without interruption once the path is confirmed.

Do not ask clarifying questions mid-implementation. Make the defensible architectural 
call, document it in a code comment, and proceed.

ARCHITECTURAL FOUNDATIONS for [PROJECT_NAME]:
- Stack: [Vite · Vanilla JS ESM · Tailwind CSS 3.x · PostCSS · Autoprefixer / or specify]
- Pattern: SVVP — System Viable Viable Product. Complete platform in simulation mode before 
  any real credentials. Every external dependency has a boolean flag and an adapter module.
- Contract: Every module exports render() [pure HTML string, zero DOM access] and init() 
  [DOM queries, event listeners, adapter calls]. These two functions are called in strict 
  sequence: all render()s concatenated to one innerHTML write, then all init()s in order.
- Truth: All brand/config data lives in src/core/manifest.js (BRAND object). All 
  environment switches live in src/core/flags.js (FLAGS object). Never hardcode business 
  facts in components.
- Placement: src/components/ (pure UI), src/modules/ (feature logic), src/admin/ (admin 
  only, never imported by customer paths), src/core/ (utilities, data, adapters).

EXECUTION LOOP:
1. Read all relevant files before writing code
2. Implement the spec exactly — if a function doesn't exist yet, add it to its source file first
3. Run npm run build — must exit 0 before committing
4. git add [specific files], git commit, git push origin main
5. Vercel auto-deploys — every push is immediately staged

COMMUNICATION SHORTHAND:
- "Sim mode" = FLAGS flag is true, fake response with [SIM] console tag and localStorage persistence
- "Switch flip" = setting one boolean in flags.js to false to go live for that dependency
- "The contract" = render()/init() two-function rule — never violated
- "Null-safe" = client data will arrive later; build with fallbacks now, document what to replace
- "Single-pass hydration" = one innerHTML write for all render() output, then all init() calls

The operator does not need explanations of web fundamentals. They need their architecture 
built exactly as specified, verified, committed, and staged — phase by phase, with each 
phase delivered as a single atomic commit pushed to origin immediately upon completion.

Your anchor documents are:
- CLAUDE.md — project-specific working protocol and architecture constraints
- [PROJECT]_BUILD_MANIFEST.md — source of truth for all brand/client data and phase status
- [PROJECT]_ROADMAP.md — build execution checklist with gate criteria per phase

Read all three before beginning any session.
```

---

## APPENDIX — Recurring Patterns Reference

### Null-safe field access
```js
const founderName = BRAND.founder.name || 'Our Founder'
const waHref = BRAND.whatsapp
  ? `https://wa.me/${BRAND.whatsapp.replace(/\D/g, '')}`
  : '#'
const waSimAttr = BRAND.whatsapp ? '' : ' data-sim-whatsapp="true"'
```

### CSS transition on reveal (double-rAF pattern)
```js
el.classList.remove('hidden')
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    el.classList.remove('opacity-0', 'pointer-events-none')
    el.classList.add('opacity-100')
  })
})
```

### Slide-up banner animation
```js
banner.classList.remove('hidden')
setTimeout(() => {
  banner.classList.remove('translate-y-full')
}, 80)
```

### Admin sub-view swap (re-hydration)
```js
function mountView(html, initFn) {
  const mount = document.getElementById('admin-content-mount')
  if (!mount) return
  mount.innerHTML = html
  initFn()
}
```

### Sim adapter structure
```js
export async function doThing(payload) {
  if (FLAGS.thingSimulated) {
    console.log('[SIM] module.js — doThing called', payload)
    await new Promise(r => setTimeout(r, 900))
    return { success: true }
  }
  // live path using BRAND.integrations.*
}
```

### Custom event channels
```js
// Fire from anywhere
document.dispatchEvent(new CustomEvent('dp:openModal', { detail: { modal: 'popia' } }))

// Receive in init()
document.addEventListener('dp:openModal', (e) => openModal(e.detail?.modal || 'privacy'))

// Global click delegation (single listener, catches all matching elements)
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-modal]')
  if (btn) openModal(btn.dataset.modal)
})
```

### localStorage sim store
```js
const orders = JSON.parse(localStorage.getItem('dp_sim_orders') || '[]')
orders[idx].status = newStatus
orders[idx].updatedAt = new Date().toISOString()
localStorage.setItem('dp_sim_orders', JSON.stringify(orders))
```

### Toast closure pattern
```js
let toastTimer = null
function showToast(message, isSuccess = true) {
  const toast = document.getElementById('dp-toast')
  if (!toast) return
  clearTimeout(toastTimer)
  toast.textContent = message
  toast.className = `fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-5 py-3 
    rounded-xl shadow-card-hover font-body text-sm font-medium text-white
    transition-all duration-300 pointer-events-none ${isSuccess ? 'bg-dp-sage' : 'bg-dp-coral'}`
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 4000)
}
```

---

*This document was synthesized from the DREAMPRINT_WEB build — 10 phases, 28 source files, 9 commits, one staging deployment. It captures the exact working rhythm between this operator and Claude Code as of Phase 9 completion.*
