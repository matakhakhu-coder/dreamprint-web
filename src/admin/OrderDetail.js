import { BRAND } from '@/core/manifest.js'
import { FLAGS } from '@/core/flags.js'

// ── Full lifecycle status list ────────────────────────────────────────────────
const ALL_STATUSES = [
  'RECEIVED',
  'ENHANCING',
  'MOCKUP_SENT',
  'REVISION_REQUESTED',
  'APPROVED',
  'PAYMENT_PENDING',
  'PAID',
  'IN_PRODUCTION',
  'SHIPPED',
  'DELIVERED',
]

// ── Simulated email notification templates ────────────────────────────────────
const EMAIL_TEMPLATES = {
  ENHANCING:          'Your artwork is being carefully enhanced by our design team. We\'ll have a mockup ready for you within 2–3 days.',
  MOCKUP_SENT:        'Your personalised mockup is ready! Please review and approve within 48 hours.',
  REVISION_REQUESTED: 'We\'ve received your revision request. Our team will update your mockup and resend shortly.',
  APPROVED:           'Your mockup has been approved. Your order is moving to the payment queue.',
  PAYMENT_PENDING:    'Your order is awaiting payment. Please complete checkout to begin production.',
  PAID:               'Payment confirmed! Your order is now in our production queue.',
  IN_PRODUCTION:      'Great news — your order is now in production! We\'ll update you once it ships.',
  SHIPPED:            'Your DreamPrint order is on its way! Tracking details to follow.',
  DELIVERED:          'Your order has been delivered. Thank you for creating with DreamPrint SA!',
}

function formatDate(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString('en-ZA', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  } catch { return iso }
}

function statusOption(s, current) {
  return `<option value="${s}" ${s === current ? 'selected' : ''}>${s.replace(/_/g, ' ')}</option>`
}

// ── render(order) ─────────────────────────────────────────────────────────────
export function render(order) {
  const isMockupPhase = order.status === 'ENHANCING'

  return `
    <!-- OrderDetail -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- ── LEFT: Intake & metadata review ─────────────────────────────── -->
      <div class="space-y-5">

        <!-- Back link -->
        <button id="dp-detail-back"
                type="button"
                class="inline-flex items-center gap-2 font-body text-sm text-dp-navy/55 hover:text-dp-coral transition-colors duration-150">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to Queue
        </button>

        <!-- Order header -->
        <div>
          <div class="flex items-center gap-3 flex-wrap">
            <h2 class="font-display font-bold text-dp-navy text-2xl">${order.id}</h2>
            <span class="font-body text-dp-navy/40 text-xs">${formatDate(order.createdAt)}</span>
          </div>
          <p class="font-body text-dp-navy/50 text-sm mt-0.5">${order.product || '—'} · ${order.size || '—'}</p>
        </div>

        <!-- Customer data card -->
        <div class="bg-white border border-dp-cream-dark rounded-2xl divide-y divide-dp-cream-dark shadow-sm">

          <div class="flex items-start justify-between px-5 py-3.5 gap-4">
            <span class="font-body text-dp-navy/45 text-xs uppercase tracking-wide flex-shrink-0 mt-0.5">Parent Name</span>
            <span class="font-display font-bold text-dp-navy text-sm text-right">${order.customerName || '—'}</span>
          </div>

          <div class="flex items-start justify-between px-5 py-3.5 gap-4">
            <span class="font-body text-dp-navy/45 text-xs uppercase tracking-wide flex-shrink-0 mt-0.5">Email</span>
            <a href="mailto:${order.email || ''}"
               class="font-body text-dp-coral text-sm text-right underline underline-offset-2 hover:text-dp-coral-dark transition-colors">
              ${order.email || '—'}
            </a>
          </div>

          <div class="flex items-start justify-between px-5 py-3.5 gap-4">
            <span class="font-body text-dp-navy/45 text-xs uppercase tracking-wide flex-shrink-0 mt-0.5">WhatsApp</span>
            <a href="tel:${order.whatsapp || ''}"
               class="font-body text-dp-navy text-sm text-right hover:text-dp-coral transition-colors">
              ${order.whatsapp || '—'}
            </a>
          </div>

          <div class="flex items-start justify-between px-5 py-3.5 gap-4">
            <span class="font-body text-dp-navy/45 text-xs uppercase tracking-wide flex-shrink-0 mt-0.5">Child (Artist)</span>
            <span class="font-body text-dp-navy text-sm text-right">${order.childName || '—'}</span>
          </div>

          <div class="flex items-start justify-between px-5 py-3.5 gap-4">
            <span class="font-body text-dp-navy/45 text-xs uppercase tracking-wide flex-shrink-0 mt-0.5">Deliver To</span>
            <span class="font-body text-dp-navy text-sm text-right leading-relaxed">${order.addressLine || order.address || '—'}</span>
          </div>

          ${order.instructions ? `
          <div class="flex items-start justify-between px-5 py-3.5 gap-4">
            <span class="font-body text-dp-navy/45 text-xs uppercase tracking-wide flex-shrink-0 mt-0.5">Instructions</span>
            <span class="font-body text-dp-navy/70 text-sm text-right italic leading-relaxed">${order.instructions}</span>
          </div>` : ''}

          <div class="flex items-start justify-between px-5 py-3.5 gap-4">
            <span class="font-body text-dp-navy/45 text-xs uppercase tracking-wide flex-shrink-0 mt-0.5">Order Total</span>
            <span class="font-display font-bold text-dp-coral text-sm text-right">R ${order.total ? Number(order.total).toFixed(2) : '—'}</span>
          </div>

        </div>

        <!-- Artwork image -->
        <div>
          <p class="font-body text-dp-navy/45 text-xs uppercase tracking-wide mb-2">Customer Artwork</p>
          <div class="relative bg-dp-cream-dark rounded-2xl overflow-hidden aspect-video flex items-center justify-center border border-dp-cream-dark shadow-sm">
            ${order.artworkUrl ? `
              <img src="${order.artworkUrl}"
                   alt="Artwork for order ${order.id}"
                   class="w-full h-full object-contain"
                   loading="lazy">` : `
              <div class="flex flex-col items-center gap-2 text-dp-navy/25">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span class="font-body text-xs">No artwork URL on record</span>
              </div>`}
          </div>
          ${order.artworkUrl ? `
          <a href="${order.artworkUrl}" target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center gap-1.5 mt-2 font-body text-xs text-dp-coral hover:text-dp-coral-dark underline underline-offset-2 transition-colors">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            Download Original
          </a>` : ''}
        </div>

      </div>

      <!-- ── RIGHT: Status control & mockup actions ──────────────────────── -->
      <div class="space-y-5">

        <!-- Status engine card -->
        <div class="bg-white border border-dp-cream-dark rounded-2xl p-6 shadow-sm space-y-4">

          <div class="flex items-center justify-between">
            <h3 class="font-display font-bold text-dp-navy text-lg">Status Engine</h3>
            <span class="font-body text-dp-navy/40 text-xs">Order lifecycle</span>
          </div>

          <!-- Active state label -->
          <div id="dp-detail-status-label"
               class="bg-dp-cream-dark rounded-xl px-4 py-2.5 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-dp-coral flex-shrink-0"></span>
            <span class="font-display font-bold text-dp-navy text-sm">${order.status.replace(/_/g, ' ')}</span>
          </div>

          <!-- Dropdown -->
          <div>
            <label for="dp-status-select" class="block font-body text-xs font-medium text-dp-navy/50 mb-1.5 uppercase tracking-wide">
              Transition to
            </label>
            <select id="dp-status-select"
                    class="w-full border border-dp-cream-dark rounded-xl p-3 bg-dp-cream font-body text-sm text-dp-navy outline-none focus:border-dp-coral transition-colors duration-150 cursor-pointer">
              ${ALL_STATUSES.map(s => statusOption(s, order.status)).join('')}
            </select>
          </div>

          <p class="font-body text-dp-navy/35 text-xs leading-relaxed">
            Changing status logs a simulation event and triggers a customer notification email${FLAGS.emailSimulated ? ' (simulated)' : ''}.
          </p>

        </div>

        <!-- Mockup uploader workspace -->
        <div id="dp-mockup-uploader-zone" class="${isMockupPhase ? '' : 'hidden'} bg-white border border-dp-cream-dark rounded-2xl p-6 shadow-sm space-y-4">

          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-dp-coral/10 flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-dp-coral" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-display font-bold text-dp-navy text-base">Mockup Workspace</h3>
              <p class="font-body text-dp-navy/45 text-xs">Send finalized mockup to customer</p>
            </div>
          </div>

          <div class="border-2 border-dashed border-dp-coral/25 rounded-xl p-5 bg-dp-coral/3 space-y-3">
            <p class="font-body text-sm text-dp-navy/60 leading-relaxed">
              Paste the production-ready mockup image URL below. Submitting will automatically advance the order to <strong class="font-semibold text-dp-navy">MOCKUP_SENT</strong> and notify the customer.
            </p>
            <input id="dp-mockup-url"
                   type="url"
                   placeholder="https://your-storage-url.com/mockup-${order.id}.jpg"
                   class="w-full border border-dp-cream-dark rounded-xl p-3 font-body text-sm text-dp-navy placeholder:text-dp-navy/25 outline-none focus:border-dp-coral focus:ring-1 focus:ring-dp-coral transition-colors duration-150">
            <button id="dp-mockup-submit"
                    type="button"
                    class="btn-primary w-full justify-center min-h-[44px]">
              Send Mockup to Customer
            </button>
          </div>

        </div>

        <!-- Fulfillment reference card -->
        <div class="bg-white border border-dp-cream-dark rounded-2xl p-5 shadow-sm">
          <h3 class="font-display font-bold text-dp-navy text-sm mb-3">Fulfillment Reference</h3>
          <div class="space-y-1.5">
            <div class="flex justify-between text-xs font-body">
              <span class="text-dp-navy/45">Enhancement</span>
              <span class="text-dp-navy/70">${BRAND.fulfillment.enhancementDays}</span>
            </div>
            <div class="flex justify-between text-xs font-body">
              <span class="text-dp-navy/45">Approval window</span>
              <span class="text-dp-navy/70">${BRAND.fulfillment.approvalWindow}</span>
            </div>
            <div class="flex justify-between text-xs font-body">
              <span class="text-dp-navy/45">Production</span>
              <span class="text-dp-navy/70">${BRAND.fulfillment.productionDays}</span>
            </div>
            <div class="flex justify-between text-xs font-body">
              <span class="text-dp-navy/45">Courier</span>
              <span class="text-dp-navy/70">${BRAND.fulfillment.courierDays}</span>
            </div>
            <div class="flex justify-between text-xs font-body font-semibold pt-1.5 border-t border-dp-cream-dark">
              <span class="text-dp-navy/60">Total est.</span>
              <span class="text-dp-navy">${BRAND.fulfillment.totalDays}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  `
}

// ── init(order) ───────────────────────────────────────────────────────────────
export function init(order) {

  // ── Back to queue ───────────────────────────────────────────────────────────
  const backBtn = document.getElementById('dp-detail-back')
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      document.dispatchEvent(
        new CustomEvent('admin:navigate', { detail: { view: 'queue' } })
      )
    })
  }

  // ── Helper: persist status change to localStorage ───────────────────────────
  function persistStatus(orderId, newStatus) {
    const orders = JSON.parse(localStorage.getItem('dp_sim_orders') || '[]')
    const idx = orders.findIndex(o => o.id === orderId)
    if (idx !== -1) {
      orders[idx].status    = newStatus
      orders[idx].updatedAt = new Date().toISOString()
      localStorage.setItem('dp_sim_orders', JSON.stringify(orders))
    }
  }

  // ── Helper: simulate email notification ─────────────────────────────────────
  function simEmail(status, email) {
    if (!FLAGS.emailSimulated) return
    const template = EMAIL_TEMPLATES[status]
    if (template) {
      console.log(`[SIM] email.js — Notification dispatched to ${email}`)
      console.log(`[SIM]   Template: ${status}`)
      console.log(`[SIM]   Message:  "${template}"`)
    }
  }

  // ── Helper: re-hydrate the detail view with updated order ───────────────────
  function rehydrate(updatedOrder) {
    const mount = document.getElementById('admin-content-mount')
    if (!mount) return
    mount.innerHTML = render(updatedOrder)
    init(updatedOrder)
  }

  // ── Status select change ────────────────────────────────────────────────────
  const select = document.getElementById('dp-status-select')
  if (select) {
    select.addEventListener('change', () => {
      const oldStatus = order.status
      const newStatus = select.value
      if (newStatus === oldStatus) return

      persistStatus(order.id, newStatus)
      console.log(`[SIM] State transition executed for order ${order.id}: ${oldStatus} -> ${newStatus}`)
      simEmail(newStatus, order.email)

      rehydrate({ ...order, status: newStatus })
    })
  }

  // ── Mockup uploader submit ──────────────────────────────────────────────────
  const mockupSubmit = document.getElementById('dp-mockup-submit')
  if (mockupSubmit) {
    mockupSubmit.addEventListener('click', () => {
      const urlInput  = document.getElementById('dp-mockup-url')
      const mockupUrl = urlInput?.value?.trim()

      if (!mockupUrl) {
        if (urlInput) {
          urlInput.classList.add('border-dp-coral', 'ring-1', 'ring-dp-coral')
          urlInput.focus()
        }
        return
      }

      const newStatus = 'MOCKUP_SENT'
      persistStatus(order.id, newStatus)
      console.log(`[SIM] State transition executed for order ${order.id}: ${order.status} -> ${newStatus}`)
      console.log(`[SIM] Mockup URL stored: ${mockupUrl}`)
      simEmail(newStatus, order.email)

      rehydrate({ ...order, status: newStatus, mockupUrl })
    })
  }
}
