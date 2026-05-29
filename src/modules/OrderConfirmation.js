import { BRAND }          from '@/core/manifest.js'
import { FLAGS }          from '@/core/flags.js'
import { processPayment } from '@/core/integrations/payment.js'

const FREE_DELIVERY_THRESHOLD = BRAND.fulfillment.freeDeliveryOver   // 650
const FLAT_SHIPPING            = 99

// ── Fulfillment timeline badges rendered after payment ────────────────────────
const TIMELINE_STEPS = [
  { icon: '🎨', label: 'Artwork Enhancement',  detail: BRAND.fulfillment.enhancementDays },
  { icon: '✉️', label: 'Mockup Approval',       detail: BRAND.fulfillment.approvalWindow  },
  { icon: '🖨️', label: 'Production',            detail: BRAND.fulfillment.productionDays  },
  { icon: '🚚', label: 'Courier Delivery',      detail: BRAND.fulfillment.courierDays     },
]

function timelineRow(step) {
  return `
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-xl bg-dp-sage/10 flex items-center justify-center flex-shrink-0 text-base" aria-hidden="true">
        ${step.icon}
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-display font-bold text-dp-navy text-sm leading-snug">${step.label}</p>
        <p class="font-body text-dp-navy/45 text-xs">${step.detail}</p>
      </div>
    </div>`
}

export function render() {
  return `
    <!-- Order Confirmation -->
    <section id="confirmation" class="bg-dp-cream py-16 px-4 md:px-8 min-h-[70vh]">
      <div class="max-w-4xl mx-auto">

        <!-- ── Fallback: order not found (shown by init if lookup fails) ──── -->
        <div id="dp-conf-fallback" class="hidden flex flex-col items-center justify-center py-24 text-center space-y-6">
          <div class="w-20 h-20 rounded-full bg-dp-cream-dark flex items-center justify-center mx-auto">
            <svg class="w-10 h-10 text-dp-navy/25" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <h2 class="font-display font-bold text-dp-navy text-2xl mb-2">Order Not Found</h2>
            <p class="font-body text-dp-navy/55 text-sm max-w-xs mx-auto leading-relaxed">
              We couldn't locate this order reference. It may have expired or the link may be incorrect.
            </p>
          </div>
          <a href="#shop" class="btn-primary inline-flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Back to Shop
          </a>
        </div>

        <!-- ── Main confirmation content (populated by init()) ────────────── -->
        <div id="dp-conf-content">

          <!-- Page heading -->
          <div class="mb-6">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dp-coral/10 border border-dp-coral/20 mb-4">
              <span class="w-1.5 h-1.5 rounded-full bg-dp-coral flex-shrink-0"></span>
              <span class="text-dp-coral text-xs font-body font-semibold uppercase tracking-wide">Order Received</span>
            </div>
            <h1 class="font-display font-extrabold text-dp-navy text-3xl sm:text-4xl leading-tight">
              Thank you for your order!
            </h1>
            <p class="font-body text-dp-navy/55 text-base mt-2">
              Here's your full receipt and next steps.
            </p>
          </div>

          <!-- Status banner — classes swapped by init() on payment -->
          <div id="dp-conf-status-banner"
               class="rounded-2xl px-5 py-4 flex items-center gap-4 bg-dp-yellow/15 border border-dp-yellow/30">
            <!-- Icon -->
            <div id="dp-conf-status-icon"
                 class="w-10 h-10 rounded-xl bg-dp-yellow/30 flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-dp-navy" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p id="dp-conf-status-text"
                 class="font-display font-bold text-dp-navy text-base leading-snug">
                Payment Pending
              </p>
              <p id="dp-conf-status-sub"
                 class="font-body text-dp-navy/55 text-sm mt-0.5">
                Complete your payment below to confirm your order and begin production.
              </p>
            </div>
            <span id="dp-conf-order-ref-badge"
                  class="font-display font-bold text-dp-navy/60 text-xs bg-white/60 px-3 py-1 rounded-lg flex-shrink-0">
              —
            </span>
          </div>

          <!-- Two-column grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

            <!-- ── LEFT: Receipt invoice details ──────────────────────────── -->
            <div class="space-y-5">
              <h2 class="font-display font-bold text-dp-navy text-xl">Order Summary</h2>

              <!-- Details table -->
              <div class="bg-white border border-dp-cream-dark rounded-2xl divide-y divide-dp-cream-dark shadow-sm">

                <div class="flex items-start justify-between px-5 py-3.5 gap-4">
                  <span class="font-body text-dp-navy/50 text-xs uppercase tracking-wide flex-shrink-0 mt-0.5">Order ID</span>
                  <span id="dp-conf-id" class="font-display font-bold text-dp-navy text-sm text-right">—</span>
                </div>

                <div class="flex items-start justify-between px-5 py-3.5 gap-4">
                  <span class="font-body text-dp-navy/50 text-xs uppercase tracking-wide flex-shrink-0 mt-0.5">Product</span>
                  <span id="dp-conf-product" class="font-display font-bold text-dp-navy text-sm text-right">—</span>
                </div>

                <div class="flex items-start justify-between px-5 py-3.5 gap-4">
                  <span class="font-body text-dp-navy/50 text-xs uppercase tracking-wide flex-shrink-0 mt-0.5">Size</span>
                  <span id="dp-conf-size" class="font-body text-dp-navy text-sm text-right">—</span>
                </div>

                <div class="flex items-start justify-between px-5 py-3.5 gap-4">
                  <span class="font-body text-dp-navy/50 text-xs uppercase tracking-wide flex-shrink-0 mt-0.5">Child's Name</span>
                  <span id="dp-conf-child" class="font-body text-dp-navy text-sm text-right">—</span>
                </div>

                <div class="flex items-start justify-between px-5 py-3.5 gap-4">
                  <span class="font-body text-dp-navy/50 text-xs uppercase tracking-wide flex-shrink-0 mt-0.5">Deliver To</span>
                  <span id="dp-conf-address" class="font-body text-dp-navy text-sm text-right leading-relaxed">—</span>
                </div>

                <div id="dp-conf-instructions-row" class="hidden flex items-start justify-between px-5 py-3.5 gap-4">
                  <span class="font-body text-dp-navy/50 text-xs uppercase tracking-wide flex-shrink-0 mt-0.5">Instructions</span>
                  <span id="dp-conf-instructions" class="font-body text-dp-navy/70 text-sm text-right italic leading-relaxed">—</span>
                </div>

              </div>

              <!-- Artwork thumb -->
              <div>
                <p class="font-body text-dp-navy/50 text-xs uppercase tracking-wide mb-2">Artwork Reference</p>
                <div class="relative bg-dp-cream-dark rounded-2xl overflow-hidden aspect-video flex items-center justify-center border border-dp-cream-dark shadow-sm">
                  <img id="dp-conf-artwork"
                       src=""
                       alt="Your uploaded artwork"
                       class="hidden w-full h-full object-contain">
                  <!-- Placeholder shown until artwork URL resolves -->
                  <div id="dp-conf-artwork-placeholder"
                       class="flex flex-col items-center gap-2 text-dp-navy/25">
                    <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span class="font-body text-xs">Artwork on file</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- ── RIGHT: Pricing & payment ───────────────────────────────── -->
            <div class="bg-white border border-dp-cream-dark rounded-2xl p-6 shadow-sm space-y-4 self-start">

              <h2 class="font-display font-bold text-dp-navy text-xl">Payment</h2>

              <!-- Pricing ledger -->
              <div class="space-y-2 border-b border-dp-cream-dark pb-4">
                <div class="flex justify-between items-center">
                  <span class="font-body text-dp-navy/60 text-sm">Base price</span>
                  <span id="dp-conf-base-price" class="font-body text-dp-navy text-sm font-medium">—</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="font-body text-dp-navy/60 text-sm">Delivery</span>
                  <span id="dp-conf-shipping" class="font-body text-dp-navy text-sm font-medium">—</span>
                </div>
              </div>

              <div class="flex justify-between items-center">
                <span class="font-display font-bold text-dp-navy text-base">Total</span>
                <span id="dp-conf-total" class="font-display font-extrabold text-dp-coral text-xl">—</span>
              </div>

              <!-- Payment button (hidden once paid) -->
              <div id="dp-conf-pay-frame">
                <button id="dp-pay-btn"
                        type="button"
                        class="btn-primary w-full justify-center min-h-[48px] bg-dp-coral hover:bg-dp-coral-dark text-white font-bold rounded-xl shadow-cta mt-2">
                  Securely Pay with PayFast
                </button>
                <p class="font-body text-dp-navy/35 text-xs text-center mt-2">
                  Secured by PayFast · 256-bit SSL encryption
                </p>
              </div>

              <!-- Post-payment: receipt verification + timeline (hidden until paid) -->
              <div id="dp-conf-paid-block" class="hidden space-y-5">

                <!-- Receipt badge -->
                <div class="flex items-center gap-3 bg-dp-sage/8 rounded-xl px-4 py-3">
                  <div class="w-8 h-8 rounded-full bg-dp-sage/20 flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 text-dp-sage" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <p class="font-display font-bold text-dp-sage text-sm">Order Secured & Paid ✓</p>
                    <p class="font-body text-dp-navy/50 text-xs">Receipt sent to your email</p>
                  </div>
                </div>

                <!-- Fulfillment timeline -->
                <div>
                  <p class="font-body text-dp-navy/50 text-xs uppercase tracking-wide mb-3">What happens next</p>
                  <div class="space-y-3">
                    ${TIMELINE_STEPS.map(s => timelineRow(s)).join('')}
                  </div>
                  <div class="mt-4 bg-dp-yellow/15 border border-dp-yellow/30 rounded-xl px-4 py-3 flex items-center gap-2">
                    <svg class="w-4 h-4 text-dp-navy/60 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="font-body text-dp-navy/65 text-xs">Estimated total: <strong class="font-semibold">${BRAND.fulfillment.totalDays}</strong> from today</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div><!-- /dp-conf-content -->
      </div>
    </section>

    <!-- Confirmation toast -->
    <div id="dp-conf-toast"
         class="hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-5 py-3 rounded-xl shadow-card-hover font-body text-sm font-medium transition-all duration-300 pointer-events-none"
         role="status"
         aria-live="polite"></div>
  `
}

export function init() {
  // ── Toast helper ─────────────────────────────────────────────────────────────
  let toastTimer = null

  function showConfToast(message, isSuccess = true) {
    const toast = document.getElementById('dp-conf-toast')
    if (!toast) return

    clearTimeout(toastTimer)

    toast.textContent = message
    toast.className = [
      'fixed bottom-6 left-1/2 -translate-x-1/2 z-40',
      'px-5 py-3 rounded-xl shadow-card-hover',
      'font-body text-sm font-medium text-white',
      'transition-all duration-300 pointer-events-none',
      isSuccess ? 'bg-dp-sage' : 'bg-dp-coral',
    ].join(' ')

    toastTimer = setTimeout(() => {
      toast.classList.add('hidden')
    }, 4000)
  }

  // ── Order resolution ──────────────────────────────────────────────────────────
  function getOrderData() {
    // 1. URL param ?order=DP-XXXXXX
    const urlParams = new URLSearchParams(window.location.search)
    const urlOrderId = urlParams.get('order')

    if (urlOrderId) {
      // Try localStorage sim store first (survives page reload)
      const simOrders = JSON.parse(localStorage.getItem('dp_sim_orders') || '[]')
      const found = simOrders.find(o => o.id === urlOrderId)
      if (found) return found

      // Fall back to window.dp_order_payload if IDs match
      if (window.dp_order_payload?.id === urlOrderId ||
          window.dp_order_id === urlOrderId) {
        return { id: urlOrderId, ...(window.dp_order_payload || {}) }
      }

      // Try BRAND demo orders (for development/testing)
      const demoFound = BRAND.demo.orders.find(o => o.id === urlOrderId)
      if (demoFound) return demoFound

      return null
    }

    // 2. In-session payload (same tab, no reload)
    if (window.dp_order_payload) {
      return { id: window.dp_order_id, ...window.dp_order_payload }
    }

    return null
  }

  // ── Populate DOM from order record ───────────────────────────────────────────
  function populateContent(order) {
    const set = (id, value) => {
      const el = document.getElementById(id)
      if (el) el.textContent = value || '—'
    }

    const basePrice = order.total || order.price || 0
    const shipping  = basePrice >= FREE_DELIVERY_THRESHOLD ? 0 : FLAT_SHIPPING
    const grandTotal = basePrice + shipping

    // Reference badge
    set('dp-conf-order-ref-badge', order.id)
    set('dp-conf-id',              order.id)
    set('dp-conf-product',         order.product     || order.productId || '—')
    set('dp-conf-size',            order.size        || '—')
    set('dp-conf-child',           order.childName   || '—')
    set('dp-conf-address',         order.addressLine || order.address || '—')

    // Instructions row (optional)
    if (order.instructions) {
      const row = document.getElementById('dp-conf-instructions-row')
      if (row) row.classList.remove('hidden')
      set('dp-conf-instructions', order.instructions)
    }

    // Pricing
    set('dp-conf-base-price', `R ${basePrice.toFixed(2)}`)
    set('dp-conf-shipping',   shipping === 0 ? 'Free' : `R ${shipping.toFixed(2)}`)
    set('dp-conf-total',      `R ${grandTotal.toFixed(2)}`)

    // Artwork thumb
    const artUrl = order.artworkCdnUrl || order.artworkUrl || ''
    if (artUrl) {
      const img         = document.getElementById('dp-conf-artwork')
      const placeholder = document.getElementById('dp-conf-artwork-placeholder')
      if (img) {
        img.src = artUrl
        img.classList.remove('hidden')
      }
      if (placeholder) placeholder.classList.add('hidden')
    }

    // If already paid, show paid state immediately
    if (order.status === 'PAID' || order.status === 'IN_PRODUCTION' ||
        order.status === 'SHIPPED' || order.status === 'DELIVERED') {
      applyPaidState(order.id)
    }

    return { orderId: order.id, total: grandTotal }
  }

  // ── DOM transitions on successful payment ────────────────────────────────────
  function applyPaidState(orderId) {
    // Status banner → sage/green
    const banner   = document.getElementById('dp-conf-status-banner')
    const iconWrap = document.getElementById('dp-conf-status-icon')
    const text     = document.getElementById('dp-conf-status-text')
    const sub      = document.getElementById('dp-conf-status-sub')

    if (banner) {
      banner.className = 'rounded-2xl px-5 py-4 flex items-center gap-4 bg-dp-sage text-white'
    }
    if (iconWrap) {
      iconWrap.className = 'w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0'
      iconWrap.innerHTML = `
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
        </svg>`
    }
    if (text) {
      text.className  = 'font-display font-bold text-white text-base leading-snug'
      text.textContent = 'Order Secured & Paid ✓'
    }
    if (sub) {
      sub.className  = 'font-body text-white/75 text-sm mt-0.5'
      sub.textContent = `Your artwork is queued for enhancement. Order ref: ${orderId}`
    }

    // Swap payment frame for paid block
    const payFrame  = document.getElementById('dp-conf-pay-frame')
    const paidBlock = document.getElementById('dp-conf-paid-block')
    if (payFrame)  payFrame.classList.add('hidden')
    if (paidBlock) paidBlock.classList.remove('hidden')
  }

  // ── Main init flow ────────────────────────────────────────────────────────────
  const order = getOrderData()

  if (!order) {
    // No order found — show fallback, hide main content
    const fallback = document.getElementById('dp-conf-fallback')
    const content  = document.getElementById('dp-conf-content')
    if (fallback) fallback.classList.remove('hidden')
    if (content)  content.classList.add('hidden')
    return
  }

  const { orderId, total } = populateContent(order)

  // Skip pay-button binding if order is already paid
  if (order.status === 'PAID' || order.status === 'IN_PRODUCTION' ||
      order.status === 'SHIPPED' || order.status === 'DELIVERED') {
    return
  }

  // ── PayFast pay button ───────────────────────────────────────────────────────
  const payBtn = document.getElementById('dp-pay-btn')
  if (!payBtn) return

  payBtn.addEventListener('click', async () => {
    payBtn.disabled    = true
    payBtn.textContent = FLAGS.paymentSimulated
      ? '[SIM] Connecting to PayFast Sandbox…'
      : 'Connecting to PayFast…'

    try {
      const result = await processPayment(orderId, total)

      if (result.success) {
        applyPaidState(orderId)
        showConfToast(
          FLAGS.paymentSimulated
            ? '[SIM] Payment successfully authorized via PayFast Sandbox!'
            : 'Payment confirmed! Your order is now in production.',
          true
        )
      }
    } catch (err) {
      console.error('processPayment error:', err)
      payBtn.disabled    = false
      payBtn.textContent = 'Securely Pay with PayFast'
      showConfToast('Payment could not be processed. Please try again.', false)
    }
  })
}
