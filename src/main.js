import './style.css'
import { SEOEngine } from '@/core/SEOEngine.js'

/**
 * Single-pass string hydration pattern.
 * Rule: render() returns pure HTML strings — no DOM access, no side effects.
 *       init() fires after innerHTML is written — queries DOM, attaches listeners.
 *
 * Phase 0: shell only. Module imports are added phase by phase.
 */

// ── Route detection ──────────────────────────────────────────────────────────
const path = window.location.pathname

function isAdmin() {
  return path.startsWith('/admin')
}

// ── Customer-facing render pass ──────────────────────────────────────────────
async function mountCustomer() {
  const app = document.getElementById('app')

  // Placeholder shell until Phase 1 components are wired in
  app.innerHTML = `
    <div class="min-h-screen flex items-center justify-center bg-dp-cream">
      <div class="text-center px-6">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-dp-coral mb-6 shadow-cta">
          <span class="text-white text-3xl font-display font-bold">DP</span>
        </div>
        <h1 class="font-display text-3xl font-bold text-dp-navy mb-3">
          DreamPrint SA
        </h1>
        <p class="font-body text-dp-navy/70 max-w-sm mx-auto mb-8">
          Custom-printed keepsakes from children's drawings.<br />
          <span class="text-dp-coral font-medium">Platform initialising — Phase 0 substrate active.</span>
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dp-sage/10 text-dp-sage text-sm font-medium">
            <span class="w-2 h-2 rounded-full bg-dp-sage animate-pulse"></span>
            Simulation mode active
          </span>
          <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dp-navy/5 text-dp-navy/60 text-sm font-medium">
            manifest.js ✓ · flags.js ✓ · adapters ✓
          </span>
        </div>
      </div>
    </div>
  `

  // Phase 0 init: apply SEO meta
  SEOEngine.applyMeta({ page: 'home' })
}

// ── Admin render pass ────────────────────────────────────────────────────────
async function mountAdmin() {
  document.getElementById('app').classList.add('hidden')
  const admin = document.getElementById('admin')
  admin.classList.remove('hidden')

  admin.innerHTML = `
    <div class="min-h-screen flex items-center justify-center bg-dp-navy">
      <div class="text-center text-white px-6">
        <h1 class="font-display text-2xl font-bold mb-2">DreamPrint Admin</h1>
        <p class="text-white/50 text-sm">Phase 8 — dashboard shell pending</p>
      </div>
    </div>
  `
}

// ── Bootstrap ────────────────────────────────────────────────────────────────
if (isAdmin()) {
  mountAdmin()
} else {
  mountCustomer()
}
