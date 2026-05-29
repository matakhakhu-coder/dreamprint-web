import { BRAND } from '@/core/manifest.js'
import { FLAGS } from '@/core/flags.js'
import * as OrderQueue from '@/admin/OrderQueue.js'
import * as OrderDetail from '@/admin/OrderDetail.js'

// ── Helpers ───────────────────────────────────────────────────────────────────
function loadOrders() {
  const sim = JSON.parse(localStorage.getItem('dp_sim_orders') || '[]')
  return sim.length > 0 ? sim : BRAND.demo.orders
}

function mountView(html, initFn) {
  const mount = document.getElementById('admin-content-mount')
  if (!mount) return
  mount.innerHTML = html
  initFn()
}

// ── Placeholder views ─────────────────────────────────────────────────────────
function settingsView() {
  return `
    <div class="bg-white border border-dp-cream-dark rounded-2xl p-8 shadow-sm text-center space-y-3 max-w-lg mx-auto">
      <div class="w-12 h-12 rounded-2xl bg-dp-navy/8 flex items-center justify-center mx-auto">
        <svg class="w-6 h-6 text-dp-navy/35" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      </div>
      <h3 class="font-display font-bold text-dp-navy text-lg">System Settings</h3>
      <p class="font-body text-dp-navy/50 text-sm leading-relaxed">
        Phase 9 — settings panel pending. Simulation flags, integration credentials, and brand configuration will be managed here.
      </p>
    </div>
  `
}

// ── render() ──────────────────────────────────────────────────────────────────
export function render() {
  const simBadge = Object.values(FLAGS).some(v => v === true)

  return `
    <!-- Admin Shell -->
    <div class="flex min-h-screen">

      <!-- ── Sidebar ──────────────────────────────────────────────────────── -->
      <aside class="w-64 bg-dp-navy text-white min-h-screen p-6 flex flex-col justify-between fixed left-0 top-0 z-40">

        <!-- Top: Brand + sim flag -->
        <div class="space-y-6">

          <!-- Brand badge -->
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-dp-coral flex items-center justify-center flex-shrink-0">
              <span class="font-display font-extrabold text-white text-sm leading-none">DP</span>
            </div>
            <div>
              <p class="font-display font-bold text-white text-sm leading-tight">${BRAND.name}</p>
              <p class="font-body text-white/40 text-xs">Operations Dashboard</p>
            </div>
          </div>

          <!-- Simulation indicator -->
          ${simBadge ? `
          <div class="bg-dp-yellow/15 border border-dp-yellow/30 rounded-xl px-3 py-2">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-dp-yellow flex-shrink-0 animate-pulse"></span>
              <span class="font-body text-dp-yellow text-[10px] font-semibold uppercase tracking-wide">[SIMULATION MODE]</span>
            </div>
            <p class="font-body text-white/35 text-[10px] mt-0.5 leading-snug">All integrations simulated</p>
          </div>` : `
          <div class="bg-dp-sage/20 border border-dp-sage/30 rounded-xl px-3 py-2">
            <div class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-dp-sage flex-shrink-0"></span>
              <span class="font-body text-dp-sage text-[10px] font-semibold uppercase tracking-wide">LIVE MODE</span>
            </div>
          </div>`}

          <!-- Nav menu -->
          <nav class="space-y-1" aria-label="Admin navigation">
            <button data-admin-nav="queue"
                    class="admin-nav-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors duration-150 bg-white/10 text-white">
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              <span class="font-body text-sm font-medium">Order Queue</span>
            </button>

            <button data-admin-nav="settings"
                    class="admin-nav-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors duration-150 text-white/60 hover:text-white hover:bg-white/8">
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="font-body text-sm font-medium">System Settings</span>
            </button>
          </nav>

        </div>

        <!-- Bottom: Storefront link -->
        <div class="space-y-3">
          <div class="border-t border-white/10 pt-4">
            <a href="/"
               class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/8 transition-colors duration-150">
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <span class="font-body text-sm font-medium">Back to Storefront</span>
            </a>
          </div>
        </div>

      </aside>

      <!-- ── Main activity arena ───────────────────────────────────────────── -->
      <main class="flex-1 pl-64 bg-dp-cream min-h-screen">

        <!-- Top toolbar -->
        <div class="bg-white border-b border-dp-cream-dark px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 id="admin-toolbar-title" class="font-display font-bold text-dp-navy text-lg leading-tight">Order Queue</h1>
            <p class="font-body text-dp-navy/40 text-xs mt-0.5">DreamPrint SA operations</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-dp-coral/15 flex items-center justify-center">
              <span class="font-display font-bold text-dp-coral text-sm leading-none">A</span>
            </div>
            <div class="hidden sm:block text-right">
              <p class="font-display font-bold text-dp-navy text-sm leading-snug">Admin</p>
              <p class="font-body text-dp-navy/40 text-xs">Staff account</p>
            </div>
          </div>
        </div>

        <!-- Content mount -->
        <div id="admin-content-mount" class="p-6 md:p-8 max-w-7xl mx-auto space-y-6"></div>

      </main>

    </div>
  `
}

// ── init() ────────────────────────────────────────────────────────────────────
export function init() {
  // ── Set active nav highlight ────────────────────────────────────────────────
  function setActiveNav(key) {
    document.querySelectorAll('.admin-nav-btn').forEach(btn => {
      const isActive = btn.dataset.adminNav === key
      btn.className = [
        'admin-nav-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors duration-150',
        isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/8',
      ].join(' ')
    })
    const title = document.getElementById('admin-toolbar-title')
    const TITLES = { queue: 'Order Queue', settings: 'System Settings' }
    if (title) title.textContent = TITLES[key] || 'Dashboard'
  }

  // ── Initial view: Order Queue ───────────────────────────────────────────────
  const orders = loadOrders()
  mountView(OrderQueue.render(orders), () => OrderQueue.init(orders))

  // ── Sidebar nav clicks ──────────────────────────────────────────────────────
  document.querySelectorAll('[data-admin-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.adminNav
      setActiveNav(view)

      if (view === 'queue') {
        const o = loadOrders()
        mountView(OrderQueue.render(o), () => OrderQueue.init(o))
      } else if (view === 'settings') {
        mountView(settingsView(), () => {})
      }
    })
  })

  // ── admin:navigate events (from OrderDetail back button) ───────────────────
  document.addEventListener('admin:navigate', (e) => {
    const { view, orderId } = e.detail || {}

    if (view === 'queue') {
      setActiveNav('queue')
      const o = loadOrders()
      mountView(OrderQueue.render(o), () => OrderQueue.init(o))

    } else if (view === 'detail' && orderId) {
      setActiveNav('queue')
      const o     = loadOrders()
      const order = o.find(ord => ord.id === orderId)
      if (order) {
        mountView(OrderDetail.render(order), () => OrderDetail.init(order))
      }
    }
  })
}
