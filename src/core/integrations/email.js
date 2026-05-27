import { FLAGS } from '@/core/flags.js'

const TEMPLATES = {
  ORDER_RECEIVED:    'order-received',
  MOCKUP_READY:      'mockup-ready',
  REVISION_REQUESTED: 'revision-requested',
  ORDER_APPROVED:    'order-approved',
  PAYMENT_RECEIVED:  'payment-received',
  IN_PRODUCTION:     'in-production',
  SHIPPED:           'shipped',
  DELIVERED:         'delivered',
}

/**
 * sendEmail({ template, to, data }) — Send a transactional email.
 * Simulation: logs the full payload with [SIM] tag.
 * Live: POSTs to MailerLite transactional API.
 * @param {{ template: string, to: string, data: object }} params
 */
export async function sendEmail({ template, to, data }) {
  if (FLAGS.emailSimulated) {
    console.log(`[SIM] email.js — sendEmail template="${template}" to="${to}"`)
    console.log('[SIM] email.js — payload:', data)
    return { ok: true, simulated: true }
  }

  const res = await fetch('https://connect.mailerlite.com/api/emails', {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_MAILER_LITE_KEY}`,
    },
    body: JSON.stringify({ template, to: [{ email: to }], variables: data }),
  })
  if (!res.ok) throw new Error(`MailerLite error: ${res.status}`)
  return { ok: true }
}

export { TEMPLATES }
