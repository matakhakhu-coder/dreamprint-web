/**
 * FLAGS — Simulation / live switch architecture.
 * Every external dependency starts simulated (true).
 * Flip a switch to false only when the real credential is confirmed and placed in manifest.js.
 * No other code changes are needed to graduate a dependency.
 */
export const FLAGS = {
  // Artwork upload: Uploadcare widget
  // false when: BRAND.integrations.uploadcareKey is set
  uploadSimulated: true,

  // Order submission: Formspree / Supabase
  // false when: BRAND.integrations.formEndpoint is set
  ordersSimulated: true,

  // Payment: PayFast redirect
  // false when: BRAND.integrations.payfastMerchantId is set + PAYFAST_MERCHANT_KEY env var is set
  paymentSimulated: true,

  // Transactional email: MailerLite
  // false when: MAILER_LITE_KEY env var is set + template IDs are configured
  emailSimulated: true,

  // Admin authentication: Supabase Auth
  // false when: Supabase Auth is configured or ADMIN_PASSWORD_HASH env var is set
  adminSimulated: true,
}
