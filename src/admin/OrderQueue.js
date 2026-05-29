import * as OrderDetail from '@/admin/OrderDetail.js'

// ── Status pill colour map ────────────────────────────────────────────────────
const PILL_MAP = {
  RECEIVED:            'bg-dp-cream-dark text-dp-navy',
  IN_PRODUCTION:       'bg-dp-cream-dark text-dp-navy',
  ENHANCING:           'bg-dp-yellow/20 text-dp-navy',
  PAYMENT_PENDING:     'bg-dp-yellow/20 text-dp-navy',
  REVISION_REQUESTED:  'bg-dp-yellow/20 text-dp-navy',
  MOCKUP_SENT:         'bg-dp-coral/10 text-dp-coral',
  SHIPPED:             'bg-dp-coral/10 text-dp-coral',
  APPROVED:            'bg-dp-sage/15 text-dp-sage',
  PAID:                'bg-dp-sage/15 text-dp-sage',
  DELIVERED:           'bg-dp-sage/15 text-dp-sage',
}

function statusPill(status) {
  const cls = PILL_MAP[status] || 'bg-dp-cream-dark text-dp-navy'
  return `<span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-body font-semibold ${cls}">
    ${status.replace(/_/g, ' ')}
  </span>`
}

function formatDate(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString('en-ZA', {
      day: '2-digit', month: 'short', year: 'numeric',
    })
  } catch { return iso }
}

// ── render(orders) ────────────────────────────────────────────────────────────
export function render(orders) {
  if (!orders || orders.length === 0) {
    return `
      <div class="flex flex-col items-center justify-center py-24 text-center space-y-4">
        <div class="w-16 h-16 rounded-2xl bg-dp-cream-dark flex items-center justify-center">
          <svg class="w-8 h-8 text-dp-navy/25" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
        </div>
        <div>
          <h3 class="font-display font-bold text-dp-navy text-lg">No Orders Yet</h3>
          <p class="font-body text-dp-navy/50 text-sm mt-1 max-w-xs">
            Orders submitted through the storefront will appear here.
          </p>
        </div>
        <div class="bg-dp-yellow/15 border border-dp-yellow/30 rounded-xl px-4 py-3 text-xs font-body text-dp-navy/60 max-w-sm">
          Simulation mode active — place a test order via the storefront to see it here.
        </div>
      </div>
    `
  }

  const rows = orders.map(order => `
    <tr class="border-t border-dp-cream-dark hover:bg-dp-cream/60 transition-colors duration-100 group">
      <td class="px-5 py-3.5">
        <span class="font-display font-bold text-dp-navy text-sm">${order.id}</span>
        <br>
        <span class="font-body text-dp-navy/40 text-xs">${formatDate(order.createdAt)}</span>
      </td>
      <td class="px-5 py-3.5 font-body text-dp-navy text-sm">${order.customerName || '—'}</td>
      <td class="px-5 py-3.5 font-body text-dp-navy text-sm">${order.childName || '—'}</td>
      <td class="px-5 py-3.5">
        <span class="font-body text-dp-navy text-sm">${order.product || '—'}</span>
        ${order.size ? `<br><span class="font-body text-dp-navy/40 text-xs">${order.size}</span>` : ''}
      </td>
      <td class="px-5 py-3.5 font-display font-bold text-dp-coral text-sm whitespace-nowrap">
        R ${order.total ? Number(order.total).toFixed(2) : '—'}
      </td>
      <td class="px-5 py-3.5">${statusPill(order.status)}</td>
      <td class="px-5 py-3.5">
        <button data-action="manage"
                data-id="${order.id}"
                class="font-body text-sm text-dp-coral hover:underline font-medium transition-colors duration-150 whitespace-nowrap">
          Manage →
        </button>
      </td>
    </tr>
  `).join('')

  return `
    <!-- Order Queue -->
    <div class="flex items-center justify-between mb-2">
      <h2 class="font-display font-bold text-dp-navy text-xl">Order Queue</h2>
      <span class="font-body text-dp-navy/40 text-xs">${orders.length} order${orders.length !== 1 ? 's' : ''}</span>
    </div>

    <div class="overflow-x-auto">
      <table class="bg-white rounded-2xl border border-dp-cream-dark shadow-sm overflow-hidden w-full text-left font-body text-sm">
        <thead class="bg-dp-cream-dark/60">
          <tr>
            <th class="px-5 py-3 font-body font-semibold text-dp-navy/55 text-xs uppercase tracking-wide">Order Ref</th>
            <th class="px-5 py-3 font-body font-semibold text-dp-navy/55 text-xs uppercase tracking-wide">Parent</th>
            <th class="px-5 py-3 font-body font-semibold text-dp-navy/55 text-xs uppercase tracking-wide">Child (Artist)</th>
            <th class="px-5 py-3 font-body font-semibold text-dp-navy/55 text-xs uppercase tracking-wide">Product</th>
            <th class="px-5 py-3 font-body font-semibold text-dp-navy/55 text-xs uppercase tracking-wide">Price</th>
            <th class="px-5 py-3 font-body font-semibold text-dp-navy/55 text-xs uppercase tracking-wide">Status</th>
            <th class="px-5 py-3 font-body font-semibold text-dp-navy/55 text-xs uppercase tracking-wide">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `
}

// ── init(orders) ──────────────────────────────────────────────────────────────
export function init(orders) {
  document.querySelectorAll('[data-action="manage"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const orderId = btn.dataset.id
      const order   = orders.find(o => o.id === orderId)
      if (!order) return

      const mount = document.getElementById('admin-content-mount')
      if (!mount) return

      mount.innerHTML = OrderDetail.render(order)
      OrderDetail.init(order)
    })
  })
}
