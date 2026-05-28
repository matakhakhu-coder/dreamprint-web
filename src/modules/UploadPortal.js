import { BRAND } from '@/core/manifest.js'
import { FLAGS } from '@/core/flags.js'
import { uploadArtwork } from '@/core/integrations/upload.js'
import { submitOrder   } from '@/core/integrations/orders.js'

// ── Product icon SVGs (same shapes as ProductShowcase) ────────────────────────
function productIcon(productId) {
  const cls = 'w-10 h-10'
  switch (productId) {
    case 'pj-set':
      return `<svg viewBox="0 0 64 64" class="${cls}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M14 20 L2 12 L2 28 L18 24 L18 56 L46 56 L46 24 L62 28 L62 12 L50 20 Q42 26 32 26 Q22 26 14 20 Z"/>
        <path d="M35 38 C33 31 37 27 42 27 C38 28 36 31 36 34 C36 38 39 41 42 42 C38 42 35 40 35 38 Z" fill="currentColor" opacity="0.35"/>
      </svg>`
    case 'tee':
      return `<svg viewBox="0 0 64 64" class="${cls}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M14 20 L2 12 L2 28 L18 24 L18 56 L46 56 L46 24 L62 28 L62 12 L50 20 Q42 26 32 26 Q22 26 14 20 Z"/>
      </svg>`
    case 'mug':
      return `<svg viewBox="0 0 64 64" class="${cls}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M10 24 L14 54 L50 54 L54 24 Z"/>
        <path d="M54 32 C60 32 62 37 62 40 C62 43 60 48 54 48"/>
        <path d="M21 18 Q21 14 25 15"/><path d="M30 18 Q30 13 34 15"/><path d="M39 18 Q39 14 43 15"/>
      </svg>`
    default:
      return `<svg viewBox="0 0 64 64" class="${cls}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="10" y="26" width="44" height="32" rx="3"/>
        <path d="M22 26 C22 18 26 14 32 14 C38 14 42 18 42 26"/>
      </svg>`
  }
}

// ── render() — pure HTML string, zero side effects, zero DOM access ───────────
export function render() {
  const waHref = BRAND.whatsapp
    ? `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi! I just placed a DreamPrint order and wanted to follow up.")}`
    : '#contact'

  return `
    <!-- UploadPortal -->
    <section id="upload" class="bg-dp-cream-dark py-16 px-4 md:px-8">
      <div class="max-w-7xl mx-auto">

        <!-- Section header -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dp-navy/8 border border-dp-navy/12 mb-4">
            <span class="w-1.5 h-1.5 rounded-full bg-dp-navy/40 flex-shrink-0"></span>
            <span class="text-dp-navy/60 text-xs font-body font-semibold uppercase tracking-wide">Step-by-step · 3 minutes</span>
          </div>
          <h2 class="font-display font-bold text-dp-navy text-3xl md:text-4xl mb-3">
            Upload Your Child's Art
          </h2>
          <p class="font-body text-dp-navy/60 text-base max-w-md mx-auto leading-relaxed">
            ${BRAND.subTagline}
          </p>
        </div>

        <!-- Split grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          <!-- LEFT: Canvas preview (desktop sticky) -->
          <div id="up-canvas-panel" class="sticky top-24 hidden lg:block">
            <div class="bg-dp-cream border border-dp-cream-dark rounded-2xl aspect-square overflow-hidden flex flex-col items-center justify-center relative p-4 shadow-sm">

              <!-- Placeholder (visible until image loaded) -->
              <div id="up-preview-placeholder" class="flex flex-col items-center justify-center gap-4 text-center">
                <div class="w-24 h-24 text-dp-navy/15">
                  <svg viewBox="0 0 96 96" class="w-full h-full" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <rect x="8" y="16" width="80" height="64" rx="6"/>
                    <circle cx="32" cy="38" r="8"/>
                    <path d="M8 68 L28 48 L44 62 L60 44 L88 68"/>
                    <path d="M60 24 L72 12 M72 12 L80 18 M72 12 L68 20" stroke-width="2"/>
                  </svg>
                </div>
                <div>
                  <p class="font-body text-dp-navy/35 text-sm font-medium">Artwork preview</p>
                  <p class="font-body text-dp-navy/25 text-xs mt-0.5">will appear here</p>
                </div>
              </div>

              <!-- Preview image (hidden until file loaded) -->
              <img id="up-preview-img-desktop"
                   class="hidden w-full h-full object-contain rounded-xl absolute inset-0"
                   alt="Your child's artwork preview">
            </div>

            <!-- Dynamic caption below preview -->
            <p id="up-canvas-caption"
               class="text-sm font-body text-dp-navy/65 text-center mt-3 font-medium min-h-[20px]">
              —
            </p>
          </div>

          <!-- RIGHT: Multi-step form panel -->
          <div id="up-form-panel"
               class="w-full bg-white border border-dp-cream-dark rounded-2xl p-6 md:p-8 shadow-sm">

            <!-- Step indicator bar -->
            <div class="flex items-center gap-0 mb-8" aria-label="Progress steps">

              <div data-step-dot="1"
                   class="w-9 h-9 rounded-full bg-dp-coral text-white flex items-center justify-center text-sm font-display font-bold flex-shrink-0 transition-colors duration-200">
                1
              </div>
              <div data-step-connector="1-2"
                   class="flex-1 h-0.5 bg-dp-cream-dark transition-colors duration-300 mx-1">
              </div>
              <div data-step-dot="2"
                   class="w-9 h-9 rounded-full bg-white border-2 border-dp-cream-dark text-dp-navy/40 flex items-center justify-center text-sm font-display font-bold flex-shrink-0 transition-colors duration-200">
                2
              </div>
              <div data-step-connector="2-3"
                   class="flex-1 h-0.5 bg-dp-cream-dark transition-colors duration-300 mx-1">
              </div>
              <div data-step-dot="3"
                   class="w-9 h-9 rounded-full bg-white border-2 border-dp-cream-dark text-dp-navy/40 flex items-center justify-center text-sm font-display font-bold flex-shrink-0 transition-colors duration-200">
                3
              </div>

              <!-- Step labels row -->
            </div>
            <div class="flex items-start justify-between -mt-5 mb-8 px-0">
              <span class="text-xs font-body text-dp-navy/50 w-9 text-center -ml-0">Upload</span>
              <span class="text-xs font-body text-dp-navy/50 text-center flex-1">Product</span>
              <span class="text-xs font-body text-dp-navy/50 w-9 text-center">Details</span>
            </div>

            <!-- ── STEP 1: Artwork Upload ──────────────────────────────────── -->
            <div data-step-panel="1" class="space-y-4">

              <div>
                <h3 class="font-display font-bold text-dp-navy text-lg mb-1">
                  Upload the artwork
                </h3>
                <p class="font-body text-dp-navy/55 text-sm leading-relaxed">
                  Take a clear photo of your child's drawing or painting. Any medium works — crayon, pencil, watercolour, felt-tip.
                </p>
              </div>

              <!-- Drop zone -->
              <div id="up-drop-zone"
                   class="border-2 border-dashed border-dp-navy/20 hover:border-dp-coral/40 rounded-2xl bg-dp-cream/30 hover:bg-dp-coral/5 flex flex-col items-center justify-center min-h-[220px] p-6 text-center transition-all duration-150 cursor-pointer"
                   role="button"
                   tabindex="0"
                   aria-label="Upload artwork — drag and drop or click to browse">

                <div class="w-12 h-12 rounded-xl bg-dp-coral/10 flex items-center justify-center mb-3">
                  <svg class="w-6 h-6 text-dp-coral" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                  </svg>
                </div>

                <p class="font-body text-dp-navy/70 text-sm font-medium mb-1">
                  Drag artwork here, or
                  <label for="up-file-input"
                         class="text-dp-coral underline underline-offset-2 cursor-pointer hover:text-dp-coral-dark">
                    browse your device
                  </label>
                </p>
                <p class="font-body text-dp-navy/35 text-xs">
                  JPG, PNG or HEIC · Max 10 MB
                </p>

                <input type="file"
                       id="up-file-input"
                       accept="image/*"
                       class="sr-only">
              </div>

              <!-- Mobile preview strip -->
              <div id="up-mobile-preview"
                   class="hidden lg:hidden mt-4 rounded-xl overflow-hidden aspect-video bg-dp-cream flex items-center justify-center">
                <img id="up-preview-img-mobile"
                     class="w-full h-full object-contain"
                     alt="Artwork preview">
              </div>

              <!-- Upload progress track -->
              <div id="up-upload-progress" class="hidden mt-4">
                <div class="bg-dp-cream-dark rounded-full h-1.5 overflow-hidden">
                  <div id="up-progress-bar"
                       class="h-full bg-dp-coral rounded-full transition-all duration-300"
                       style="width:0%">
                  </div>
                </div>
                <p id="up-upload-status"
                   class="text-xs text-dp-navy/50 mt-1.5 font-body text-center">
                </p>
              </div>

              <button id="up-upload-btn"
                      class="btn-primary w-full justify-center mt-4"
                      disabled>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                </svg>
                Upload Artwork
              </button>
            </div>

            <!-- ── STEP 2: Product & Size ──────────────────────────────────── -->
            <div data-step-panel="2" class="hidden space-y-6">

              <div>
                <h3 class="font-display font-bold text-dp-navy text-lg mb-1">
                  Choose a product & size
                </h3>
                <p class="font-body text-dp-navy/55 text-sm leading-relaxed">
                  Select what you'd like printed. You can order more products later.
                </p>
              </div>

              <!-- Bundle notice (hidden unless bundle was selected) -->
              <div id="up-bundle-notice"
                   class="hidden rounded-xl bg-dp-yellow/15 border border-dp-yellow/40 p-4">
                <p class="font-body text-dp-navy text-sm">
                  You selected a bundle: <strong id="up-bundle-name"></strong>
                </p>
                <p class="text-xs text-dp-navy/65 mt-1 font-body">
                  Please choose the base product and sizes below. Bundle pricing applies at checkout.
                </p>
              </div>

              <!-- Product selector grid -->
              <div class="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Select a product">
                ${BRAND.products.map(product => `
                  <label class="product-option-card block cursor-pointer rounded-xl border-2 border-dp-cream-dark bg-white p-3 transition-all duration-150 hover:border-dp-coral/30"
                         data-product-label="${product.id}">
                    <input type="radio"
                           name="up-product"
                           value="${product.id}"
                           class="sr-only">
                    <div class="flex flex-col items-center text-center gap-2">
                      <div class="w-10 h-10 text-dp-navy/25">
                        ${productIcon(product.id)}
                      </div>
                      <div>
                        <p class="font-display font-bold text-dp-navy text-xs leading-snug">
                          ${product.name}
                        </p>
                        <p class="font-body text-dp-coral text-xs font-semibold mt-0.5">
                          From R${product.priceMin}
                        </p>
                      </div>
                    </div>
                  </label>`).join('')}
              </div>

              <!-- Size picker — pre-renders all size groups, JS shows correct one -->
              <div id="up-size-picker" class="hidden">
                <p class="font-body text-dp-navy/50 text-xs uppercase tracking-wider font-semibold mb-3">
                  Select a Size
                </p>
                ${BRAND.products.map(product => `
                  <div class="up-size-group hidden flex-wrap gap-2"
                       data-sizes-for="${product.id}">
                    ${product.sizes.map(size => `
                      <label class="size-pill-label cursor-pointer"
                             data-size-label="${size}">
                        <input type="radio"
                               name="up-size"
                               value="${size}"
                               data-size="${size}"
                               class="sr-only">
                        <span class="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-dp-cream-dark bg-dp-cream text-dp-navy/70 text-xs font-body font-medium transition-all duration-150 hover:border-dp-coral/40 hover:text-dp-coral cursor-pointer">
                          ${size}
                        </span>
                      </label>`).join('')}
                  </div>`).join('')}
              </div>

              <!-- Step 2 navigation -->
              <div class="flex items-center gap-3 pt-2">
                <button id="up-step2-back" type="button" class="btn-secondary">
                  ← Back
                </button>
                <button id="up-step2-next" type="button" class="btn-primary flex-1 justify-center" disabled>
                  Continue →
                </button>
              </div>
            </div>

            <!-- ── STEP 3: Customer Details ────────────────────────────────── -->
            <div data-step-panel="3" class="hidden space-y-4">

              <div>
                <h3 class="font-display font-bold text-dp-navy text-lg mb-1">
                  Your details
                </h3>
                <p class="font-body text-dp-navy/55 text-sm leading-relaxed">
                  We need these to process your order and send your mockup for approval.
                </p>
              </div>

              <form id="up-order-form" novalidate class="space-y-4">

                <!-- Child name -->
                <div>
                  <label for="up-child-name"
                         class="block font-body text-dp-navy/70 text-sm font-medium mb-1.5">
                    Child's Name <span class="text-dp-coral">*</span>
                  </label>
                  <input id="up-child-name"
                         type="text"
                         name="childName"
                         autocomplete="off"
                         placeholder="E.g. Amara"
                         class="w-full rounded-xl border border-dp-cream-dark bg-dp-cream px-4 py-3 font-body text-dp-navy text-sm placeholder:text-dp-navy/30 focus:outline-none focus:ring-2 focus:ring-dp-coral/40 focus:border-dp-coral transition-colors duration-150">
                </div>

                <!-- Customer name -->
                <div>
                  <label for="up-customer-name"
                         class="block font-body text-dp-navy/70 text-sm font-medium mb-1.5">
                    Your Full Name <span class="text-dp-coral">*</span>
                  </label>
                  <input id="up-customer-name"
                         type="text"
                         name="customerName"
                         autocomplete="name"
                         placeholder="Name as on delivery"
                         class="w-full rounded-xl border border-dp-cream-dark bg-dp-cream px-4 py-3 font-body text-dp-navy text-sm placeholder:text-dp-navy/30 focus:outline-none focus:ring-2 focus:ring-dp-coral/40 focus:border-dp-coral transition-colors duration-150">
                </div>

                <!-- Email + WhatsApp side by side on md+ -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="up-email"
                           class="block font-body text-dp-navy/70 text-sm font-medium mb-1.5">
                      Email Address <span class="text-dp-coral">*</span>
                    </label>
                    <input id="up-email"
                           type="email"
                           name="email"
                           autocomplete="email"
                           placeholder="hello@youremail.com"
                           class="w-full rounded-xl border border-dp-cream-dark bg-dp-cream px-4 py-3 font-body text-dp-navy text-sm placeholder:text-dp-navy/30 focus:outline-none focus:ring-2 focus:ring-dp-coral/40 focus:border-dp-coral transition-colors duration-150">
                  </div>
                  <div>
                    <label for="up-whatsapp"
                           class="block font-body text-dp-navy/70 text-sm font-medium mb-1.5">
                      WhatsApp Number <span class="text-dp-coral">*</span>
                    </label>
                    <input id="up-whatsapp"
                           type="tel"
                           name="whatsapp"
                           autocomplete="tel"
                           placeholder="0821234567"
                           class="w-full rounded-xl border border-dp-cream-dark bg-dp-cream px-4 py-3 font-body text-dp-navy text-sm placeholder:text-dp-navy/30 focus:outline-none focus:ring-2 focus:ring-dp-coral/40 focus:border-dp-coral transition-colors duration-150">
                    <p class="text-xs font-body text-dp-navy/35 mt-1">Digits only, no spaces or +</p>
                  </div>
                </div>

                <!-- Delivery address -->
                <div>
                  <label for="up-address"
                         class="block font-body text-dp-navy/70 text-sm font-medium mb-1.5">
                    Delivery Address <span class="text-dp-coral">*</span>
                  </label>
                  <textarea id="up-address"
                            name="addressLine"
                            rows="2"
                            placeholder="Street · Suburb · City · Postal code"
                            class="w-full rounded-xl border border-dp-cream-dark bg-dp-cream px-4 py-3 font-body text-dp-navy text-sm placeholder:text-dp-navy/30 focus:outline-none focus:ring-2 focus:ring-dp-coral/40 focus:border-dp-coral transition-colors duration-150 resize-none"></textarea>
                </div>

                <!-- Special instructions -->
                <div>
                  <label for="up-instructions"
                         class="block font-body text-dp-navy/70 text-sm font-medium mb-1.5">
                    Special Instructions
                    <span class="text-dp-navy/35 font-normal">(optional)</span>
                  </label>
                  <textarea id="up-instructions"
                            name="instructions"
                            rows="2"
                            placeholder="E.g. Please clean up the background colour, keep the drawing style raw..."
                            class="w-full rounded-xl border border-dp-cream-dark bg-dp-cream px-4 py-3 font-body text-dp-navy text-sm placeholder:text-dp-navy/30 focus:outline-none focus:ring-2 focus:ring-dp-coral/40 focus:border-dp-coral transition-colors duration-150 resize-none"></textarea>
                </div>

                <!-- POPIA consent -->
                <label id="up-consent-label"
                       class="flex items-start gap-3 cursor-pointer rounded-xl p-4 border border-dp-cream-dark bg-dp-cream/50 hover:border-dp-sage/40 transition-colors duration-150">
                  <input type="checkbox"
                         id="up-consent"
                         name="consent"
                         class="mt-0.5 w-4 h-4 rounded accent-dp-sage flex-shrink-0">
                  <span class="font-body text-dp-navy/65 text-sm leading-relaxed">
                    I consent to DreamPrint SA processing my personal information and my child's artwork to fulfil this order, as described in the
                    <button data-modal="privacy"
                            type="button"
                            class="text-dp-coral underline underline-offset-2 hover:text-dp-coral-dark">
                      Privacy Policy
                    </button>.
                  </span>
                </label>

                <!-- Order summary -->
                <div id="up-order-summary"
                     class="rounded-xl bg-dp-cream border border-dp-cream-dark p-4 text-sm font-body text-dp-navy/80 space-y-1">
                  <div class="flex justify-between items-center">
                    <span>Product</span>
                    <strong id="up-summary-product">—</strong>
                  </div>
                  <div class="flex justify-between items-center">
                    <span>Size</span>
                    <strong id="up-summary-size">—</strong>
                  </div>
                  <div class="flex justify-between items-center border-t border-dp-cream-dark pt-2 mt-2">
                    <span class="font-medium">Total</span>
                    <strong id="up-summary-total"
                            class="text-dp-coral text-base font-display font-bold">
                      —
                    </strong>
                  </div>
                </div>

                <!-- Step 3 navigation + submit -->
                <div class="flex items-center gap-3 pt-2">
                  <button id="up-step3-back" type="button" class="btn-secondary">
                    ← Back
                  </button>
                  <button id="up-submit-btn"
                          type="submit"
                          class="btn-primary flex-1 justify-center"
                          disabled>
                    Place Order
                  </button>
                </div>

              </form>
            </div>

            <!-- ── SUCCESS PANEL ───────────────────────────────────────────── -->
            <div id="up-success-panel" class="hidden text-center py-8 space-y-4">

              <div class="w-16 h-16 rounded-full bg-dp-sage/15 flex items-center justify-center mx-auto">
                <svg class="w-8 h-8 text-dp-sage" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </div>

              <div>
                <h3 class="font-display font-bold text-dp-navy text-2xl mb-1">
                  Order Placed!
                </h3>
                <p class="font-body text-dp-navy/60 text-sm">
                  Your order reference is:
                  <strong id="up-success-ref" class="text-dp-navy font-semibold"></strong>
                </p>
              </div>

              <div class="bg-dp-cream border border-dp-cream-dark rounded-xl p-4 text-left space-y-2 text-sm font-body text-dp-navy/65">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-dp-sage flex-shrink-0"></span>
                  Our team will digitally enhance your artwork within <strong class="text-dp-navy">${BRAND.fulfillment.enhancementDays}</strong>.
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-dp-sage flex-shrink-0"></span>
                  You'll receive a mockup for approval — <strong class="text-dp-navy">${BRAND.fulfillment.approvalWindow}</strong> to respond.
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-dp-sage flex-shrink-0"></span>
                  Total turnaround: <strong class="text-dp-navy">${BRAND.fulfillment.totalDays}</strong> from today.
                </div>
              </div>

              <p class="font-body text-dp-navy/50 text-xs">
                We'll be in touch via your email and WhatsApp number.
                ${BRAND.whatsapp ? `You can also <a href="${waHref}" target="_blank" rel="noopener noreferrer" class="text-dp-sage underline underline-offset-2">message us on WhatsApp</a> anytime.` : ''}
              </p>

              <button id="up-reset-btn" class="btn-primary mx-auto">
                Order Another Print
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Toast -->
    <div id="up-toast"
         class="hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-5 py-3 rounded-xl shadow-card-hover font-body text-sm font-medium pointer-events-none"
         role="alert"
         aria-live="polite">
    </div>
  `
}

// ── init() — all DOM access, event binding, and async logic lives here ────────
export function init() {

  // ── Module-level state (scoped inside init closure) ──────────────────────────
  const state = {
    step          : 1,
    artworkFile   : null,
    artworkCdnUrl : null,
    artworkUuid   : null,
    productId     : null,
    size          : null,
    childName     : '',
    customerName  : '',
    email         : '',
    whatsapp      : '',
    addressLine   : '',
    instructions  : '',
  }

  let toastTimer = null

  // ── Element cache ─────────────────────────────────────────────────────────────
  const stepPanels     = document.querySelectorAll('[data-step-panel]')
  const stepDots       = document.querySelectorAll('[data-step-dot]')
  const connector12    = document.querySelector('[data-step-connector="1-2"]')
  const connector23    = document.querySelector('[data-step-connector="2-3"]')
  const previewDesktop = document.getElementById('up-preview-img-desktop')
  const previewMobile  = document.getElementById('up-preview-img-mobile')
  const placeholder    = document.getElementById('up-preview-placeholder')
  const mobilePreview  = document.getElementById('up-mobile-preview')
  const caption        = document.getElementById('up-canvas-caption')
  const dropZone       = document.getElementById('up-drop-zone')
  const fileInput      = document.getElementById('up-file-input')
  const uploadBtn      = document.getElementById('up-upload-btn')
  const uploadProgress = document.getElementById('up-upload-progress')
  const progressBar    = document.getElementById('up-progress-bar')
  const uploadStatus   = document.getElementById('up-upload-status')
  const bundleNotice   = document.getElementById('up-bundle-notice')
  const bundleName     = document.getElementById('up-bundle-name')
  const sizePicker     = document.getElementById('up-size-picker')
  const step2Next      = document.getElementById('up-step2-next')
  const step2Back      = document.getElementById('up-step2-back')
  const step3Back      = document.getElementById('up-step3-back')
  const submitBtn      = document.getElementById('up-submit-btn')
  const orderForm      = document.getElementById('up-order-form')
  const consentBox     = document.getElementById('up-consent')
  const summaryProduct = document.getElementById('up-summary-product')
  const summarySize    = document.getElementById('up-summary-size')
  const summaryTotal   = document.getElementById('up-summary-total')
  const successPanel   = document.getElementById('up-success-panel')
  const successRef     = document.getElementById('up-success-ref')
  const resetBtn       = document.getElementById('up-reset-btn')
  const toast          = document.getElementById('up-toast')

  const ADULT_SIZES = ['Adult S', 'Adult M', 'Adult L', 'Large (450ml)']

  // ── Helpers ───────────────────────────────────────────────────────────────────

  function sleep(ms) {
    return new Promise(r => setTimeout(r, ms))
  }

  // Checkmark SVG for done step dots
  const CHECK_SVG = `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`

  function goToStep(n) {
    state.step = n

    // Toggle step panels
    stepPanels.forEach(panel => {
      const panelN = parseInt(panel.getAttribute('data-step-panel'))
      panel.classList.toggle('hidden', panelN !== n)
    })

    // Update step dots
    stepDots.forEach(dot => {
      const dotN = parseInt(dot.getAttribute('data-step-dot'))
      dot.classList.remove(
        'bg-dp-coral', 'text-white',
        'bg-dp-sage',
        'bg-white', 'border-2', 'border-dp-cream-dark', 'text-dp-navy/40'
      )
      if (dotN < n) {
        // Done — sage with checkmark
        dot.classList.add('bg-dp-sage', 'text-white')
        dot.innerHTML = CHECK_SVG
      } else if (dotN === n) {
        // Active — coral
        dot.classList.add('bg-dp-coral', 'text-white')
        dot.textContent = String(dotN)
      } else {
        // Future — inactive
        dot.classList.add('bg-white', 'border-2', 'border-dp-cream-dark', 'text-dp-navy/40')
        dot.textContent = String(dotN)
      }
    })

    // Update connectors
    if (connector12) {
      connector12.classList.toggle('bg-dp-sage', n > 1)
      connector12.classList.toggle('bg-dp-cream-dark', n <= 1)
    }
    if (connector23) {
      connector23.classList.toggle('bg-dp-sage', n > 2)
      connector23.classList.toggle('bg-dp-cream-dark', n <= 2)
    }

    // Scroll form panel into view
    document.getElementById('up-form-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

    // Step-specific activation hooks
    if (n === 2) activateStep2()
    if (n === 3) activateStep3()
  }

  function showToast(message, type = 'success') {
    if (!toast) return
    clearTimeout(toastTimer)
    toast.textContent = message
    toast.className = [
      'fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-5 py-3 rounded-xl',
      'shadow-card-hover font-body text-sm font-medium pointer-events-none',
      'transition-all duration-300',
      type === 'success' ? 'bg-dp-sage text-white' : 'bg-dp-coral text-white',
    ].join(' ')
    toastTimer = setTimeout(() => toast.classList.add('hidden'), 4000)
  }

  function resolveSelection(id) {
    if (!id) return null
    const product = BRAND.products.find(p => p.id === id)
    if (product) return { type: 'product', data: product }
    const bundle = BRAND.bundles.find(b => b.id === id)
    if (bundle) return { type: 'bundle', data: bundle }
    return null
  }

  function resolvePrice(productId, size) {
    const product = BRAND.products.find(p => p.id === productId)
    if (!product) return 0
    return ADULT_SIZES.includes(size) ? product.priceMax : product.priceMin
  }

  function setFieldError(inputEl, hasError) {
    if (!inputEl) return
    inputEl.classList.toggle('border-dp-coral', hasError)
    inputEl.classList.toggle('ring-2',          hasError)
    inputEl.classList.toggle('ring-dp-coral/40', hasError)
  }

  // ── Step 1: Drop zone & upload ────────────────────────────────────────────────

  function setDropHover(active) {
    if (!dropZone) return
    dropZone.classList.toggle('border-dp-coral',    active)
    dropZone.classList.toggle('bg-dp-coral/5',      active)
    dropZone.classList.toggle('border-dp-navy/20',  !active)
    dropZone.classList.toggle('bg-dp-cream/30',     !active)
  }

  function applyFilePreview(file) {
    if (!file || !file.type.startsWith('image/')) {
      showToast('Please select an image file (JPG, PNG, or HEIC).', 'error')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      showToast('File is too large. Maximum size is 10 MB.', 'error')
      return
    }
    state.artworkFile = file
    const reader = new FileReader()
    reader.onload = e => {
      const src = e.target.result
      if (previewDesktop) {
        previewDesktop.src = src
        previewDesktop.classList.remove('hidden')
      }
      if (placeholder) placeholder.classList.add('hidden')
      if (previewMobile) previewMobile.src = src
      if (mobilePreview) mobilePreview.classList.remove('hidden')
    }
    reader.readAsDataURL(file)
    if (uploadBtn) uploadBtn.disabled = false
  }

  dropZone?.addEventListener('dragenter', e => { e.preventDefault(); setDropHover(true)  })
  dropZone?.addEventListener('dragover',  e => { e.preventDefault(); setDropHover(true)  })
  dropZone?.addEventListener('dragleave', ()  => setDropHover(false))
  dropZone?.addEventListener('drop', e => {
    e.preventDefault()
    setDropHover(false)
    const file = e.dataTransfer?.files?.[0]
    if (file) applyFilePreview(file)
  })
  dropZone?.addEventListener('click', () => fileInput?.click())
  dropZone?.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput?.click() }
  })
  fileInput?.addEventListener('change', () => {
    const file = fileInput.files?.[0]
    if (file) applyFilePreview(file)
  })

  uploadBtn?.addEventListener('click', async () => {
    if (!state.artworkFile) return

    uploadBtn.disabled    = true
    uploadBtn.textContent = FLAGS.uploadSimulated ? '[SIM] Uploading...' : 'Uploading...'
    uploadProgress?.classList.remove('hidden')
    if (progressBar) progressBar.style.width = '25%'
    if (uploadStatus) uploadStatus.textContent = FLAGS.uploadSimulated
      ? '[SIM] Preparing artwork...'
      : 'Uploading to Uploadcare...'

    try {
      if (progressBar) progressBar.style.width = '60%'
      const result = await uploadArtwork(state.artworkFile)
      state.artworkCdnUrl = result.cdnUrl
      state.artworkUuid   = result.uuid

      if (progressBar) progressBar.style.width = '100%'
      if (uploadStatus) uploadStatus.textContent = FLAGS.uploadSimulated
        ? '[SIM] Artwork ready ✓'
        : 'Artwork ready ✓'

      await sleep(400)
      goToStep(2)
    } catch {
      showToast('Upload failed. Please try again.', 'error')
      uploadBtn.disabled    = false
      uploadBtn.textContent = 'Upload Artwork'
      if (progressBar) progressBar.style.width = '0%'
      uploadProgress?.classList.add('hidden')
    }
  })

  // ── Step 2: Product & size selection ─────────────────────────────────────────

  function selectProduct(productId) {
    state.productId = productId
    state.size      = null

    // Update card visual states
    document.querySelectorAll('.product-option-card').forEach(label => {
      const isSelected = label.getAttribute('data-product-label') === productId
      label.classList.toggle('border-dp-coral',  isSelected)
      label.classList.toggle('ring-2',           isSelected)
      label.classList.toggle('ring-dp-coral',    isSelected)
      label.classList.toggle('shadow-card',      isSelected)
      label.classList.toggle('border-dp-cream-dark', !isSelected)
    })

    // Show relevant size group
    document.querySelectorAll('.up-size-group').forEach(group => {
      const forId = group.getAttribute('data-sizes-for')
      const isMatch = forId === productId
      group.classList.toggle('hidden',  !isMatch)
      group.classList.toggle('flex',    isMatch)
    })

    // Clear any selected size pills
    document.querySelectorAll('.size-pill-label span').forEach(span => {
      span.classList.remove('border-dp-coral', 'bg-dp-coral/10', 'text-dp-coral', 'ring-1', 'ring-dp-coral')
      span.classList.add('border-dp-cream-dark', 'bg-dp-cream', 'text-dp-navy/70')
    })

    sizePicker?.classList.remove('hidden')
    if (step2Next) step2Next.disabled = true

    // Update canvas caption (product only; size will append)
    const product = BRAND.products.find(p => p.id === productId)
    if (caption && product) caption.textContent = product.name
  }

  function activateStep2() {
    // Re-read window.dp_selected_product at the moment step 2 activates
    const sel = resolveSelection(window.dp_selected_product)

    bundleNotice?.classList.add('hidden')

    if (sel?.type === 'product') {
      const radio = document.querySelector(`input[name="up-product"][value="${sel.data.id}"]`)
      if (radio) radio.checked = true
      selectProduct(sel.data.id)
    } else if (sel?.type === 'bundle') {
      bundleNotice?.classList.remove('hidden')
      if (bundleName) bundleName.textContent = sel.data.name
    }
    // null selection → user picks manually; no pre-selection needed
  }

  // Wire product card radios
  document.querySelectorAll('input[name="up-product"]').forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.checked) selectProduct(radio.value)
    })
  })

  // Wire size pill radios
  document.querySelectorAll('input[name="up-size"]').forEach(radio => {
    radio.addEventListener('change', () => {
      if (!radio.checked) return
      state.size = radio.value

      // Update pill styles
      document.querySelectorAll('.size-pill-label span').forEach(span => {
        span.classList.remove('border-dp-coral', 'bg-dp-coral/10', 'text-dp-coral', 'ring-1', 'ring-dp-coral')
        span.classList.add('border-dp-cream-dark', 'bg-dp-cream', 'text-dp-navy/70')
      })
      const activePill = radio.closest('.size-pill-label')?.querySelector('span')
      if (activePill) {
        activePill.classList.remove('border-dp-cream-dark', 'bg-dp-cream', 'text-dp-navy/70')
        activePill.classList.add('border-dp-coral', 'bg-dp-coral/10', 'text-dp-coral', 'ring-1', 'ring-dp-coral')
      }

      // Update caption
      const product = BRAND.products.find(p => p.id === state.productId)
      if (caption && product) caption.textContent = `${product.name} · ${state.size}`

      // Enable Continue
      if (step2Next) step2Next.disabled = !(state.productId && state.size)
    })
  })

  step2Back?.addEventListener('click', () => goToStep(1))
  step2Next?.addEventListener('click', () => {
    if (state.productId && state.size) goToStep(3)
  })

  // ── Step 3: Customer form & submission ────────────────────────────────────────

  function activateStep3() {
    const product = BRAND.products.find(p => p.id === state.productId)
    if (product) {
      if (summaryProduct) summaryProduct.textContent = product.name
      if (summarySize)    summarySize.textContent    = state.size || '—'
      const price = resolvePrice(state.productId, state.size)
      if (summaryTotal)   summaryTotal.textContent   = price ? `R${price}` : '—'
    }
    document.getElementById('up-child-name')?.focus()
  }

  consentBox?.addEventListener('change', () => {
    if (submitBtn) submitBtn.disabled = !consentBox.checked
  })

  // Privacy Policy modal trigger inside consent block
  document.querySelector('#up-order-form [data-modal="privacy"]')
    ?.addEventListener('click', e => {
      e.stopPropagation()
      document.dispatchEvent(new CustomEvent('dp:openModal', { detail: { modal: 'privacy' } }))
    })

  step3Back?.addEventListener('click', () => goToStep(2))

  orderForm?.addEventListener('submit', async e => {
    e.preventDefault()

    // Gather values
    state.childName    = document.getElementById('up-child-name')?.value.trim()     || ''
    state.customerName = document.getElementById('up-customer-name')?.value.trim()  || ''
    state.email        = document.getElementById('up-email')?.value.trim()          || ''
    state.whatsapp     = document.getElementById('up-whatsapp')?.value.trim()       || ''
    state.addressLine  = document.getElementById('up-address')?.value.trim()        || ''
    state.instructions = document.getElementById('up-instructions')?.value.trim()   || ''

    // Inline validation
    const emailRe  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRe  = /^\d{9,12}$/
    let firstError = null

    const checks = [
      { id: 'up-child-name',     fail: !state.childName                         },
      { id: 'up-customer-name',  fail: !state.customerName                      },
      { id: 'up-email',          fail: !emailRe.test(state.email)               },
      { id: 'up-whatsapp',       fail: !phoneRe.test(state.whatsapp.replace(/\D/g, '')) },
      { id: 'up-address',        fail: !state.addressLine                       },
    ]

    checks.forEach(({ id, fail }) => {
      const el = document.getElementById(id)
      setFieldError(el, fail)
      if (fail && !firstError) firstError = el
    })

    if (firstError) {
      firstError.focus()
      showToast('Please fill in all required fields.', 'error')
      return
    }

    // Lock UI
    if (submitBtn) {
      submitBtn.disabled    = true
      submitBtn.textContent = FLAGS.ordersSimulated ? '[SIM] Placing order...' : 'Placing order...'
    }

    const product = BRAND.products.find(p => p.id === state.productId)
    const total   = resolvePrice(state.productId, state.size)

    const payload = {
      childName    : state.childName,
      product      : product?.name   || state.productId,
      productId    : state.productId,
      size         : state.size,
      customerName : state.customerName,
      email        : state.email,
      whatsapp     : state.whatsapp.replace(/\D/g, ''),
      addressLine  : state.addressLine,
      artworkUrl   : state.artworkCdnUrl,
      artworkUuid  : state.artworkUuid,
      instructions : state.instructions,
      total,
      consentGiven : true,
    }

    try {
      const { orderId } = await submitOrder(payload)

      // Persist for Phase 6 (OrderConfirmation)
      window.dp_order_id      = orderId
      window.dp_order_payload = { ...payload, id: orderId }

      // Clear product selection so a fresh visit starts clean
      window.dp_selected_product = null

      showToast(
        FLAGS.ordersSimulated
          ? `[SIM] Order received! Ref: ${orderId}`
          : `Order received! Ref: ${orderId}`,
        'success'
      )

      await sleep(700)

      // Transition to success view
      if (successRef) successRef.textContent = orderId
      orderForm?.classList.add('hidden')
      document.querySelector('[data-step-panel="3"] h3')?.closest('div')?.classList?.add('hidden')
      successPanel?.classList.remove('hidden')

    } catch {
      showToast('Something went wrong. Please try again.', 'error')
      if (submitBtn) {
        submitBtn.disabled    = false
        submitBtn.textContent = 'Place Order'
      }
    }
  })

  // ── Reset ─────────────────────────────────────────────────────────────────────

  resetBtn?.addEventListener('click', () => {
    // Reset state
    state.step          = 1
    state.artworkFile   = null
    state.artworkCdnUrl = null
    state.artworkUuid   = null
    state.productId     = null
    state.size          = null
    state.childName     = ''
    state.customerName  = ''
    state.email         = ''
    state.whatsapp      = ''
    state.addressLine   = ''
    state.instructions  = ''

    // Reset form fields
    if (orderForm) orderForm.reset()
    if (consentBox) consentBox.checked = false
    if (submitBtn)  submitBtn.disabled = true

    // Reset previews
    if (previewDesktop) { previewDesktop.src = ''; previewDesktop.classList.add('hidden') }
    if (previewMobile)  { previewMobile.src  = ''; }
    if (mobilePreview)  mobilePreview.classList.add('hidden')
    if (placeholder)    placeholder.classList.remove('hidden')
    if (caption)        caption.textContent = '—'

    // Reset upload state
    if (uploadBtn) { uploadBtn.disabled = true; uploadBtn.textContent = 'Upload Artwork' }
    if (progressBar)    progressBar.style.width = '0%'
    uploadProgress?.classList.add('hidden')

    // Reset product cards
    document.querySelectorAll('.product-option-card').forEach(label => {
      label.classList.remove('border-dp-coral', 'ring-2', 'ring-dp-coral', 'shadow-card')
      label.classList.add('border-dp-cream-dark')
    })
    document.querySelectorAll('input[name="up-product"]').forEach(r => r.checked = false)
    document.querySelectorAll('input[name="up-size"]').forEach(r => r.checked = false)
    document.querySelectorAll('.up-size-group').forEach(g => { g.classList.add('hidden'); g.classList.remove('flex') })
    sizePicker?.classList.add('hidden')
    if (step2Next) step2Next.disabled = true

    // Restore success → form panels
    successPanel?.classList.add('hidden')
    orderForm?.classList.remove('hidden')
    document.querySelector('[data-step-panel="3"] h3')?.closest('div')?.classList?.remove('hidden')

    goToStep(1)
  })
}
