import './style.css'
import { SEOEngine } from '@/core/SEOEngine.js'
import { render as renderNavbar,            init as initNavbar            } from '@/components/Navbar.js'
import { render as renderHero,              init as initHero              } from '@/components/Hero.js'
import { render as renderProductShowcase,   init as initProductShowcase   } from '@/modules/ProductShowcase.js'
import {                                    init as initProductDetail     } from '@/modules/ProductDetail.js'
import { render as renderUploadPortal,      init as initUploadPortal      } from '@/modules/UploadPortal.js'
import { render as renderHowItWorks                                       } from '@/modules/HowItWorks.js'
import { render as renderGallery                                          } from '@/modules/Gallery.js'
import { render as renderAbout                                            } from '@/components/About.js'
import { render as renderTestimonials                                     } from '@/modules/Testimonials.js'
import { render as renderFAQ,               init as initFAQ               } from '@/modules/FAQ.js'
import { render as renderContactEngine,     init as initContactEngine     } from '@/modules/ContactEngine.js'
import { render as renderOrderConfirmation, init as initOrderConfirmation } from '@/modules/OrderConfirmation.js'
import * as ConsentBanner from '@/components/ConsentBanner.js'
import * as LegalModals   from '@/modules/LegalModals.js'
import { render as renderFooter,            init as initFooter            } from '@/components/Footer.js'

/**
 * Single-pass string hydration pattern.
 * Rule: render() returns pure HTML strings — no DOM access, no side effects.
 *       init() fires after innerHTML is written — queries DOM, attaches listeners.
 */

// ── Route detection ──────────────────────────────────────────────────────────
const path      = window.location.pathname
const urlParams = new URLSearchParams(window.location.search)

const isConfirmationRoute = urlParams.has('order')

function isAdmin() {
  return path.startsWith('/admin')
}

// ── Confirmation render pass — isolated single-page receipt view ─────────────
function mountConfirmation() {
  const app = document.getElementById('app')

  app.innerHTML = [
    renderNavbar(),
    renderOrderConfirmation(),
    renderFooter(),
    ConsentBanner.render(),
    LegalModals.render(),
  ].join('')

  initNavbar()
  initOrderConfirmation()
  initFooter()
  ConsentBanner.init()
  LegalModals.init()

  SEOEngine.applyMeta({ page: 'confirmation' })
}

// ── Customer-facing render pass ──────────────────────────────────────────────
function mountCustomer() {
  const app = document.getElementById('app')

  // Single-pass string hydration:
  // All render() calls concatenated → one innerHTML write → all init() calls in sequence
  app.innerHTML = [
    renderNavbar(),
    renderHero(),
    renderProductShowcase(),
    renderUploadPortal(),
    renderHowItWorks(),
    renderGallery(),
    renderAbout(),
    renderTestimonials(),
    renderFAQ(),
    renderContactEngine(),
    renderFooter(),
    ConsentBanner.render(),
    LegalModals.render(),
  ].join('')

  // init() sequence — DOM is guaranteed written at this point
  initNavbar()
  initHero()
  initProductShowcase()
  initProductDetail()
  initUploadPortal()
  initFAQ()
  initContactEngine()
  initFooter()
  ConsentBanner.init()
  LegalModals.init()

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
} else if (isConfirmationRoute) {
  mountConfirmation()
} else {
  mountCustomer()
}
