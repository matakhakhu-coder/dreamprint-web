import { BRAND } from '@/core/manifest.js'

let mountEl  = null
let overlayEl = null
let escHandler = null

function productIcon(productId) {
  const base = 'w-full h-full'
  switch (productId) {
    case 'pj-set':
      return `
        <svg viewBox="0 0 64 64" class="${base}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 20 L2 12 L2 28 L18 24 L18 56 L46 56 L46 24 L62 28 L62 12 L50 20 Q42 26 32 26 Q22 26 14 20 Z"/>
          <path d="M35 38 C33 31 37 27 42 27 C38 28 36 31 36 34 C36 38 39 41 42 42 C38 42 35 40 35 38 Z" fill="currentColor" opacity="0.35"/>
          <circle cx="26" cy="37" r="1.5" fill="currentColor" stroke="none" opacity="0.4"/>
          <circle cx="23" cy="44" r="1"   fill="currentColor" stroke="none" opacity="0.4"/>
          <circle cx="31" cy="46" r="1"   fill="currentColor" stroke="none" opacity="0.4"/>
        </svg>`
    case 'tee':
      return `
        <svg viewBox="0 0 64 64" class="${base}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 20 L2 12 L2 28 L18 24 L18 56 L46 56 L46 24 L62 28 L62 12 L50 20 Q42 26 32 26 Q22 26 14 20 Z"/>
        </svg>`
    case 'mug':
      return `
        <svg viewBox="0 0 64 64" class="${base}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M10 24 L14 54 L50 54 L54 24 Z"/>
          <path d="M54 32 C60 32 62 37 62 40 C62 43 60 48 54 48"/>
          <path d="M21 18 Q21 14 25 15"/>
          <path d="M30 18 Q30 13 34 15"/>
          <path d="M39 18 Q39 14 43 15"/>
        </svg>`
    default:
      return `
        <svg viewBox="0 0 64 64" class="${base}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="10" y="26" width="44" height="32" rx="3"/>
          <path d="M22 26 C22 18 26 14 32 14 C38 14 42 18 42 26"/>
        </svg>`
  }
}

function sizePills(sizes) {
  return sizes.map(s => `
    <span class="inline-flex px-3 py-1.5 rounded-lg bg-dp-cream-dark text-dp-navy/70 text-xs font-body font-medium">
      ${s}
    </span>`).join('')
}

// Pure function — returns full modal HTML for a given product. No DOM access.
export function render(product) {
  return `
    <div id="pd-overlay" class="fixed inset-0 z-50 hidden" role="dialog" aria-modal="true" aria-labelledby="pd-title">

      <!-- Backdrop — captures click-outside-to-close -->
      <div id="pd-backdrop" class="absolute inset-0 bg-dp-navy/60 backdrop-blur-sm cursor-pointer"></div>

      <!-- Panel wrapper — pointer-events-none so backdrop stays clickable -->
      <div class="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div id="pd-panel"
             class="bg-dp-cream max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-card-hover relative pointer-events-auto">

          <!-- Close button -->
          <button
            id="pd-close-btn"
            class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-dp-navy/8 hover:bg-dp-navy/15 flex items-center justify-center transition-colors duration-150"
            aria-label="Close product detail">
            <svg class="w-4 h-4 text-dp-navy/60" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <!-- Inner layout: stacked on mobile, side-by-side on md+ -->
          <div class="flex flex-col md:flex-row gap-0 md:gap-6 p-6 md:p-8">

            <!-- Left: image / placeholder -->
            <div class="flex-shrink-0 w-full md:w-52 mb-6 md:mb-0">
              <div class="bg-dp-cream-dark rounded-xl aspect-square flex items-center justify-center overflow-hidden relative">
                ${product.images.length ? `
                  <img
                    src="${product.images[0]}"
                    alt="${product.name}"
                    class="w-full h-full object-cover"
                    loading="lazy"/>
                ` : `
                  <div class="w-24 h-24 text-dp-navy/20">
                    ${productIcon(product.id)}
                  </div>
                `}
                ${product.featured ? `
                  <span class="absolute top-2.5 right-2.5 bg-dp-yellow text-dp-navy text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    Popular
                  </span>
                ` : ''}
              </div>

              <!-- Turnaround chip below image -->
              <div class="mt-3 flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 border border-dp-cream-dark">
                <div class="w-6 h-6 rounded-md bg-dp-sage/15 flex items-center justify-center flex-shrink-0">
                  <svg class="w-3.5 h-3.5 text-dp-sage" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <span class="font-body text-dp-navy/65 text-xs">
                  Ready in <strong class="text-dp-navy font-semibold">${product.turnaround}</strong>
                </span>
              </div>
            </div>

            <!-- Right: product details -->
            <div class="flex-1 min-w-0 flex flex-col gap-4">

              <!-- Title + tagline -->
              <div>
                <h2 id="pd-title" class="font-display font-extrabold text-dp-navy text-2xl leading-tight mb-1 pr-10">
                  ${product.name}
                </h2>
                <p class="font-body text-dp-navy/60 text-sm leading-relaxed">
                  ${product.description}
                </p>
              </div>

              <!-- Price range -->
              <div class="flex items-baseline gap-2 flex-wrap">
                <span class="font-display font-bold text-dp-coral text-3xl">R${product.priceMin}</span>
                ${product.priceMax !== product.priceMin ? `
                  <span class="font-body text-dp-navy/40 text-lg">– R${product.priceMax}</span>
                  <span class="font-body text-dp-navy/35 text-xs">depending on size</span>
                ` : ''}
              </div>

              <!-- Available sizes -->
              <div>
                <p class="font-body text-dp-navy/45 text-xs uppercase tracking-wider font-semibold mb-2">
                  Available Sizes
                </p>
                <div class="flex flex-wrap gap-2">
                  ${sizePills(product.sizes)}
                </div>
              </div>

              <!-- Trust row -->
              <div class="bg-white rounded-xl p-4 flex flex-col gap-3 border border-dp-cream-dark">
                <div class="flex items-center gap-3">
                  <div class="w-7 h-7 rounded-lg bg-dp-sage/15 flex items-center justify-center flex-shrink-0">
                    <svg class="w-3.5 h-3.5 text-dp-sage" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span class="font-body text-dp-navy/70 text-sm">
                    Free delivery on orders over <strong class="text-dp-navy">R${BRAND.fulfillment.freeDeliveryOver}</strong>
                  </span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-7 h-7 rounded-lg bg-dp-sage/15 flex items-center justify-center flex-shrink-0">
                    <svg class="w-3.5 h-3.5 text-dp-sage" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                  <span class="font-body text-dp-navy/70 text-sm">
                    You approve the digital mockup before we print — revision included
                  </span>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-7 h-7 rounded-lg bg-dp-sage/15 flex items-center justify-center flex-shrink-0">
                    <svg class="w-3.5 h-3.5 text-dp-sage" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                    </svg>
                  </div>
                  <span class="font-body text-dp-navy/70 text-sm">
                    ${BRAND.fulfillment.blindShipping ? 'Blind shipping — no supplier branding on your parcel' : 'Nationwide courier delivery'}
                  </span>
                </div>
              </div>

              <!-- Primary CTA -->
              <button
                id="pd-order-btn"
                class="btn-primary w-full justify-center mt-auto">
                Order This Product
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

// Appends the modal mount point to <body>. Called once after app.innerHTML is written.
export function init() {
  mountEl = document.createElement('div')
  mountEl.id = 'pd-mount'
  document.body.appendChild(mountEl)
}

// Finds product by ID, injects render(product) into the mount, wires close triggers, shows overlay.
export function open(productId) {
  const product = BRAND.products.find(p => p.id === productId)
  if (!product || !mountEl) return

  mountEl.innerHTML = render(product)
  overlayEl = document.getElementById('pd-overlay')

  document.getElementById('pd-backdrop')?.addEventListener('click', close)
  document.getElementById('pd-close-btn')?.addEventListener('click', close)
  document.getElementById('pd-order-btn')?.addEventListener('click', () => {
    window.dp_selected_product = productId
    close()
    const target = document.getElementById('upload')
    if (!target) return
    const navH = document.getElementById('navbar')?.offsetHeight || 64
    window.scrollTo({ top: target.offsetTop - navH - 8, behavior: 'smooth' })
  })

  if (escHandler) window.removeEventListener('keydown', escHandler)
  escHandler = e => { if (e.key === 'Escape') close() }
  window.addEventListener('keydown', escHandler)

  overlayEl.classList.remove('hidden')
  document.body.classList.add('overflow-hidden')
}

// Hides overlay, restores scroll, removes Escape listener.
export function close() {
  overlayEl?.classList.add('hidden')
  document.body.classList.remove('overflow-hidden')
  if (escHandler) {
    window.removeEventListener('keydown', escHandler)
    escHandler = null
  }
}
