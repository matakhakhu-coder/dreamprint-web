import './style.css'
import { SEOEngine } from '@/core/SEOEngine.js'
import { render as renderNavbar, init as initNavbar } from '@/components/Navbar.js'
import { render as renderHero,   init as initHero   } from '@/components/Hero.js'
import { render as renderFooter, init as initFooter } from '@/components/Footer.js'

/**
 * Single-pass string hydration pattern.
 * Rule: render() returns pure HTML strings — no DOM access, no side effects.
 *       init() fires after innerHTML is written — queries DOM, attaches listeners.
 */

// ── Route detection ──────────────────────────────────────────────────────────
const path = window.location.pathname

function isAdmin() {
  return path.startsWith('/admin')
}

// ── Customer-facing render pass ──────────────────────────────────────────────
async function mountCustomer() {
  const app = document.getElementById('app')

  // Phase 1: single-pass string hydration
  // All render() calls concatenated → one innerHTML write → all init() calls in sequence
  app.innerHTML = [
    renderNavbar(),
    renderHero(),
    // Phase 2+ modules will be added here:
    // renderProductShowcase(), renderHowItWorks(), renderGallery(),
    // renderTestimonials(), renderAbout(), renderFAQ(),
    // renderContactEngine(), renderConsentBanner(), renderLegalModals()
    renderFooter(),
  ].join('')

  // init() sequence — DOM is guaranteed written at this point
  initNavbar()
  initHero()
  initFooter()

  // Apply SEO meta
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
