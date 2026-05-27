import { FLAGS } from '@/core/flags.js'
import { BRAND } from '@/core/manifest.js'

function generateOrderId() {
  const n = Math.floor(100000 + Math.random() * 900000)
  return `DP-${n}`
}

/**
 * submitOrder(payload) — Submit a customer order.
 * Simulation: logs payload, stores in localStorage, resolves with a mock order ID.
 * Live: POSTs to Formspree or Supabase edge function.
 * @param {object} payload
 * @returns {Promise<{ orderId: string }>}
 */
export async function submitOrder(payload) {
  if (FLAGS.ordersSimulated) {
    console.log('[SIM] orders.js — submitOrder called with payload:')
    console.table(payload)
    await new Promise(r => setTimeout(r, 900))
    const orderId = generateOrderId()
    const order = { ...payload, id: orderId, status: 'RECEIVED', createdAt: new Date().toISOString() }
    const existing = JSON.parse(localStorage.getItem('dp_sim_orders') || '[]')
    existing.unshift(order)
    localStorage.setItem('dp_sim_orders', JSON.stringify(existing))
    console.log(`[SIM] orders.js — order stored in localStorage. ID: ${orderId}`)
    return { orderId }
  }

  const res = await fetch(BRAND.integrations.formEndpoint, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body:    JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Order submission error: ${res.status}`)
  const data = await res.json()
  return { orderId: data.id || generateOrderId() }
}

/**
 * fetchOrders() — Retrieve all orders (admin use).
 * Simulation: reads from localStorage.
 * Live: fetches from Supabase.
 * @returns {Promise<Array>}
 */
export async function fetchOrders() {
  if (FLAGS.ordersSimulated) {
    console.log('[SIM] orders.js — fetchOrders from localStorage')
    const { BRAND: brand } = await import('@/core/manifest.js')
    const sim = JSON.parse(localStorage.getItem('dp_sim_orders') || '[]')
    return sim.length > 0 ? sim : brand.demo.orders
  }

  const res = await fetch(`${BRAND.integrations.supabaseUrl}/rest/v1/orders?order=created_at.desc`, {
    headers: { 'apikey': BRAND.integrations.supabaseAnonKey, 'Authorization': `Bearer ${BRAND.integrations.supabaseAnonKey}` },
  })
  if (!res.ok) throw new Error(`fetchOrders error: ${res.status}`)
  return res.json()
}

/**
 * updateOrderStatus(orderId, newStatus) — Transition order lifecycle status (admin use).
 */
export async function updateOrderStatus(orderId, newStatus) {
  if (FLAGS.ordersSimulated) {
    console.log(`[SIM] orders.js — updateOrderStatus: ${orderId} → ${newStatus}`)
    const orders = JSON.parse(localStorage.getItem('dp_sim_orders') || '[]')
    const idx = orders.findIndex(o => o.id === orderId)
    if (idx !== -1) {
      orders[idx].status = newStatus
      orders[idx].updatedAt = new Date().toISOString()
      localStorage.setItem('dp_sim_orders', JSON.stringify(orders))
    }
    return { ok: true }
  }

  const res = await fetch(`${BRAND.integrations.supabaseUrl}/rest/v1/orders?id=eq.${orderId}`, {
    method:  'PATCH',
    headers: {
      'apikey': BRAND.integrations.supabaseAnonKey,
      'Authorization': `Bearer ${BRAND.integrations.supabaseAnonKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal',
    },
    body: JSON.stringify({ status: newStatus, updated_at: new Date().toISOString() }),
  })
  if (!res.ok) throw new Error(`updateOrderStatus error: ${res.status}`)
  return { ok: true }
}
