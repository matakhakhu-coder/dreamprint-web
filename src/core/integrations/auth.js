import { FLAGS } from '@/core/flags.js'

const SIM_PASSWORD  = 'dreamprint-admin-2024'
const SIM_TOKEN_KEY = 'dp_admin_token'

/**
 * adminLogin(password) — Authenticate as admin.
 * Simulation: checks plaintext password against hardcoded constant, stores token in localStorage.
 * Live: delegates to Supabase Auth.
 * @param {string} password
 * @returns {Promise<{ success: boolean, token?: string, error?: string }>}
 */
export async function adminLogin(password) {
  if (FLAGS.adminSimulated) {
    console.log('[SIM] auth.js — adminLogin attempt')
    await new Promise(r => setTimeout(r, 400))
    if (password === SIM_PASSWORD) {
      const token = `sim-token-${Date.now()}`
      localStorage.setItem(SIM_TOKEN_KEY, token)
      console.log('[SIM] auth.js — login successful, token stored')
      return { success: true, token }
    }
    console.log('[SIM] auth.js — login failed: incorrect password')
    return { success: false, error: 'Incorrect password' }
  }

  const { createClient } = await import('@supabase/supabase-js')
  const { BRAND } = await import('@/core/manifest.js')
  const supabase = createClient(BRAND.integrations.supabaseUrl, BRAND.integrations.supabaseAnonKey)
  const { data, error } = await supabase.auth.signInWithPassword({
    email: import.meta.env.VITE_ADMIN_EMAIL,
    password,
  })
  if (error) return { success: false, error: error.message }
  localStorage.setItem(SIM_TOKEN_KEY, data.session.access_token)
  return { success: true, token: data.session.access_token }
}

/**
 * adminLogout() — Clear admin session.
 */
export async function adminLogout() {
  localStorage.removeItem(SIM_TOKEN_KEY)
  if (!FLAGS.adminSimulated) {
    const { createClient } = await import('@supabase/supabase-js')
    const { BRAND } = await import('@/core/manifest.js')
    const supabase = createClient(BRAND.integrations.supabaseUrl, BRAND.integrations.supabaseAnonKey)
    await supabase.auth.signOut()
  }
  console.log('[AUTH] adminLogout — session cleared')
}

/**
 * isAdminAuthenticated() — Check if a valid admin session exists.
 * @returns {boolean}
 */
export function isAdminAuthenticated() {
  return !!localStorage.getItem(SIM_TOKEN_KEY)
}
