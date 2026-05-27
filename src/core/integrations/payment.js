import { FLAGS } from '@/core/flags.js'
import { BRAND } from '@/core/manifest.js'

/**
 * initiatePayment(orderData) — Begin payment flow.
 * Simulation: returns config for a "Simulate Payment" button UI.
 * Live: constructs and returns a PayFast redirect URL.
 * @param {{ orderId: string, amount: number, customerName: string, email: string, description: string }} orderData
 * @returns {Promise<{ mode: 'sim'|'live', redirectUrl?: string, simConfig?: object }>}
 */
export async function initiatePayment(orderData) {
  if (FLAGS.paymentSimulated) {
    console.log('[SIM] payment.js — initiatePayment called', orderData)
    return {
      mode: 'sim',
      simConfig: {
        label:       'Simulate Successful Payment',
        orderId:     orderData.orderId,
        amount:      orderData.amount,
        description: orderData.description,
      },
    }
  }

  const params = new URLSearchParams({
    merchant_id:   BRAND.integrations.payfastMerchantId,
    merchant_key:  '__PAYFAST_KEY_SERVER_INJECTED__',
    return_url:    `${BRAND.url}/order-confirmed?order=${orderData.orderId}`,
    cancel_url:    `${BRAND.url}/upload#upload`,
    notify_url:    `${BRAND.integrations.formEndpoint}/payfast-notify`,
    name_first:    orderData.customerName.split(' ')[0],
    name_last:     orderData.customerName.split(' ').slice(1).join(' ') || '',
    email_address: orderData.email,
    m_payment_id:  orderData.orderId,
    amount:        orderData.amount.toFixed(2),
    item_name:     orderData.description,
  })

  return {
    mode: 'live',
    redirectUrl: `https://www.payfast.co.za/eng/process?${params.toString()}`,
  }
}

/**
 * confirmSimPayment(orderId) — Confirm a simulated payment (UI button handler).
 * @param {string} orderId
 * @returns {Promise<{ success: boolean, orderId: string }>}
 */
export async function confirmSimPayment(orderId) {
  console.log('[SIM] payment.js — confirmSimPayment called', { orderId })
  await new Promise(r => setTimeout(r, 600))
  console.log(`[SIM] payment.js — payment confirmed for order ${orderId}`)
  return { success: true, orderId }
}
