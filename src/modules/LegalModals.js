import { BRAND } from '@/core/manifest.js'

// ── Null-safe compliance fields ───────────────────────────────────────────────
const CO_NAME    = BRAND.legalName
const CO_REG     = BRAND.compliance.registrationNumber || '[Registration number — pending CIPC confirmation]'
const POPIA_OFC  = BRAND.compliance.popiaContact       || '[Information Officer contact — TBC]'
const CO_EMAIL   = BRAND.email                         || 'hello@dreamprintsa.co.za'
const CO_DOMAIN  = BRAND.url

// ── Section heading helper ────────────────────────────────────────────────────
function h(text) {
  return `<h3 class="font-display font-bold text-dp-navy text-base mt-6 mb-1 first:mt-0">${text}</h3>`
}

function p(text) {
  return `<p class="font-body text-sm text-dp-navy/75 leading-relaxed">${text}</p>`
}

function li(items) {
  return `<ul class="list-disc list-inside space-y-1 font-body text-sm text-dp-navy/75 leading-relaxed pl-1">
    ${items.map(i => `<li>${i}</li>`).join('')}
  </ul>`
}

function meta(label, value) {
  return `<div class="flex gap-2 text-xs font-body">
    <span class="text-dp-navy/40 font-medium uppercase tracking-wide w-28 flex-shrink-0">${label}</span>
    <span class="text-dp-navy/70">${value}</span>
  </div>`
}

// ── Modal content builders ────────────────────────────────────────────────────
function buildModalContent(type) {
  switch (type) {

    case 'privacy':
      return {
        title: 'Privacy Policy',
        html: `
          <div class="bg-dp-cream-dark rounded-xl p-4 space-y-1.5 mb-4 border border-dp-cream-dark">
            ${meta('Company',      CO_NAME)}
            ${meta('Registration', CO_REG)}
            ${meta('Domain',       CO_DOMAIN)}
            ${meta('Effective',    'Current operational version')}
          </div>
          ${h('1. Who We Are')}
          ${p(`${CO_NAME} ("DreamPrint", "we", "us", "our") is a South African custom print-on-demand business. This Privacy Policy explains how we collect, use, and protect your personal information when you use <a href="${CO_DOMAIN}" class="text-dp-coral underline underline-offset-2">${CO_DOMAIN}</a>.`)}
          ${h('2. Information We Collect')}
          ${li([
            'Your name and the name of your child (for personalisation)',
            'Email address (order communication)',
            'WhatsApp / phone number (order updates)',
            'Delivery address (fulfilment)',
            'Payment reference (transaction record — we do not store card details)',
            'Your child\'s artwork file (production only)',
          ])}
          ${h('3. How We Use Your Information')}
          ${p('We use your personal information solely to process and fulfil your order, communicate with you about your order status, and improve our service. We do not sell, rent, or share your data with third parties except our production and courier partners who require it to complete delivery.')}
          ${h('4. Data Retention')}
          ${p('Order records are retained for a minimum of 5 years for accounting and legal compliance. Artwork files are retained for 30 days after delivery and then permanently deleted unless you request otherwise.')}
          ${h('5. Your POPIA Rights')}
          ${p('Under POPIA you have the right to access, correct, or request deletion of your personal information at any time. To exercise these rights, contact our Information Officer:')}
          ${p(`<strong class="font-semibold">${POPIA_OFC}</strong>`)}
          ${h('6. Cookies')}
          ${p('We use essential cookies for site functionality (session state, consent record). We do not use tracking or advertising cookies. Accepting this notice records your consent in your browser\'s local storage.')}
          ${h('7. Security')}
          ${p('All data is transmitted over SSL/TLS encryption. Payments are processed via PayFast — we never handle raw card data. Our systems comply with reasonable industry security standards.')}
        `,
      }

    case 'terms':
      return {
        title: 'Terms & Conditions',
        html: `
          <div class="bg-dp-cream-dark rounded-xl p-4 space-y-1.5 mb-4 border border-dp-cream-dark">
            ${meta('Company',      CO_NAME)}
            ${meta('Registration', CO_REG)}
            ${meta('Jurisdiction', 'Republic of South Africa')}
          </div>
          ${h('1. Acceptance')}
          ${p(`By placing an order on ${CO_DOMAIN} you confirm that you have read, understood, and accepted these Terms & Conditions in full. If you do not agree, please do not place an order.`)}
          ${h('2. Eligibility')}
          ${p('You must be 18 years or older to place an order, or be purchasing under adult supervision. DreamPrint reserves the right to decline orders without providing a reason.')}
          ${h('3. Pricing & Payment')}
          ${li([
            'All prices are listed in South African Rand (ZAR).',
            'Prices are subject to change without notice.',
            'Orders are confirmed only once payment is received and cleared.',
            'Payment is processed by PayFast — a registered South African payment gateway.',
          ])}
          ${h('4. Artwork & Content')}
          ${p('You warrant that you own the rights to all artwork submitted and that it does not infringe third-party copyright. You warrant that submitted content is not offensive, defamatory, or illegal. DreamPrint reserves the right to decline production of any submission without refund if it violates these terms.')}
          ${h('5. Order Cancellation')}
          ${p('You may cancel an order within 2 hours of placement for a full refund, provided production has not commenced. Once the enhancement process begins, cancellation is not possible.')}
          ${h('6. Mockup Approval')}
          ${p('We will send you a digital mockup for approval before production. You have 48 hours to approve or request revisions. Silence beyond 48 hours constitutes approval and production will begin.')}
          ${h('7. Limitation of Liability')}
          ${p('DreamPrint\'s liability is limited to the value of the order placed. We are not liable for indirect or consequential losses. Products are consumer goods — warranty claims follow the Consumer Protection Act 68 of 2008.')}
          ${h('8. Governing Law')}
          ${p('These Terms are governed by the laws of the Republic of South Africa. Disputes will be submitted to the jurisdiction of the South Gauteng High Court or the applicable Magistrates\' Court.')}
        `,
      }

    case 'popia':
      return {
        title: 'POPIA Compliance Notice',
        html: `
          <div class="bg-dp-navy/5 border border-dp-navy/10 rounded-xl p-4 mb-4">
            <p class="font-body text-xs text-dp-navy/60 leading-relaxed">
              This notice is issued in compliance with the <strong class="font-semibold text-dp-navy/80">Protection of Personal Information Act 4 of 2013 (POPIA)</strong>,
              which regulates how organisations collect, use, store, and share personal information in South Africa.
            </p>
          </div>
          <div class="bg-dp-cream-dark rounded-xl p-4 space-y-1.5 mb-4 border border-dp-cream-dark">
            ${meta('Responsible Party', CO_NAME)}
            ${meta('Registration',      CO_REG)}
            ${meta('Info Officer',      POPIA_OFC)}
            ${meta('Contact Email',     CO_EMAIL)}
          </div>
          ${h('1. Identity of the Responsible Party')}
          ${p(`${CO_NAME} is the Responsible Party as defined in POPIA. We determine the purpose and means of processing your personal information in connection with your use of our platform and purchase of our products.`)}
          ${h('2. Categories of Personal Information Processed')}
          ${li([
            '<strong>Identity information</strong> — your name and your child\'s name',
            '<strong>Contact information</strong> — email address, phone / WhatsApp number',
            '<strong>Address information</strong> — delivery address',
            '<strong>Financial information</strong> — payment reference number (card data processed by PayFast, never stored by us)',
            '<strong>Special category</strong> — your child\'s artwork file (treated with heightened care; production use only)',
          ])}
          ${h('3. Purpose of Processing')}
          ${p('Personal information is processed for the following lawful purposes only:')}
          ${li([
            'Processing and fulfilling your order',
            'Communicating order status and updates',
            'Sending your digital mockup for approval',
            'Delivering your completed product via courier',
            'Complying with legal and accounting obligations',
          ])}
          ${h('4. Sharing of Information')}
          ${p('We share your personal information only with:')}
          ${li([
            'Our print production partner (artwork + product specification)',
            'Our courier partners (name + delivery address only)',
            'PayFast (payment processing — governed by their own POPIA-compliant privacy policy)',
          ])}
          ${p('We do not sell, rent, or share your personal information for marketing purposes.')}
          ${h('5. Your Rights Under POPIA')}
          ${p('As a Data Subject you have the right to:')}
          ${li([
            'Be notified when your personal information is collected',
            'Access a record of your personal information we hold',
            'Request correction of inaccurate personal information',
            'Request deletion of your personal information (subject to legal retention requirements)',
            'Object to the processing of your personal information',
            'Lodge a complaint with the Information Regulator (South Africa)',
          ])}
          ${h('6. Exercising Your Rights')}
          ${p(`To exercise any of your POPIA rights, contact our Information Officer at: <strong class="font-semibold text-dp-navy">${POPIA_OFC}</strong> or email us at <a href="mailto:${CO_EMAIL}" class="text-dp-coral underline underline-offset-2">${CO_EMAIL}</a>. We will respond within 30 days of receiving your request.`)}
          ${h('7. Information Regulator')}
          ${p('If you are not satisfied with our handling of your personal information, you may lodge a complaint with the Information Regulator (South Africa) at <a href="https://www.justice.gov.za/inforeg/" target="_blank" rel="noopener noreferrer" class="text-dp-coral underline underline-offset-2">www.justice.gov.za/inforeg</a>.')}
        `,
      }

    case 'shipping':
      return {
        title: 'Shipping Policy',
        html: `
          <div class="bg-dp-cream-dark rounded-xl p-4 space-y-1.5 mb-4 border border-dp-cream-dark">
            ${meta('Coverage',        'Nationwide South Africa')}
            ${meta('Free delivery',   `Orders over R${BRAND.fulfillment.freeDeliveryOver}`)}
            ${meta('Est. turnaround', BRAND.fulfillment.totalDays)}
            ${meta('Couriers',        BRAND.fulfillment.couriers.join(', '))}
          </div>
          ${h('1. Delivery Coverage')}
          ${p('We deliver to all major centres and most rural areas across South Africa via our courier network. If you are unsure whether we deliver to your area, contact us via WhatsApp before placing your order.')}
          ${h('2. Delivery Costs')}
          ${li([
            `Free delivery on orders over R${BRAND.fulfillment.freeDeliveryOver}`,
            'Standard flat-rate delivery: R80–R150 depending on your area',
            'Remote / outlying areas may incur a surcharge — we will notify you before processing',
          ])}
          ${h('3. Fulfilment Timeline')}
          ${p('Our end-to-end fulfilment process is structured as follows:')}
          ${li([
            `Artwork enhancement: ${BRAND.fulfillment.enhancementDays}`,
            `Digital mockup approval window: ${BRAND.fulfillment.approvalWindow}`,
            `Print production: ${BRAND.fulfillment.productionDays}`,
            `Courier delivery: ${BRAND.fulfillment.courierDays}`,
            `<strong>Estimated total: ${BRAND.fulfillment.totalDays}</strong> from order confirmation`,
          ])}
          ${h('4. Tracking')}
          ${p('Once your parcel is collected by our courier partner, you will receive a tracking number via WhatsApp and email. Tracking is available through the courier\'s website.')}
          ${h('5. Blind Shipping')}
          ${p(`${CO_NAME} ships blind — no supplier name, branding, or invoice appears on the outer packaging. Your parcel will arrive discreetly, making it perfect as a gift.`)}
          ${h('6. Missed Deliveries')}
          ${p('If your parcel cannot be delivered (no one home, incorrect address), the courier will attempt redelivery or hold at a collection point. If the parcel is returned to us, you will be responsible for the redelivery fee.')}
          ${h('7. Damaged or Lost Parcels')}
          ${p('If your order arrives damaged or is lost in transit, contact us within 7 days with your order reference and photos. We will open a claim with the courier and arrange a replacement at no cost to you.')}
        `,
      }

    default:
      return buildModalContent('privacy')
  }
}

// ─────────────────────────────────────────────────────────────────────────────

export function render() {
  return `
    <!-- Legal Modals Engine -->
    <div id="dp-legal-modal-overlay"
         class="fixed inset-0 z-50 flex items-center justify-center p-4
                bg-dp-navy/60 backdrop-blur-sm
                transition-opacity duration-200 opacity-0 pointer-events-none hidden"
         role="dialog"
         aria-modal="true"
         aria-labelledby="dp-legal-modal-title">

      <div id="dp-legal-modal-card"
           class="bg-dp-cream max-w-3xl w-full max-h-[85vh] overflow-y-auto
                  rounded-2xl shadow-2xl p-6 md:p-8 relative flex flex-col">

        <!-- Close button -->
        <button id="dp-legal-modal-close"
                type="button"
                class="absolute top-4 right-4 w-9 h-9 rounded-xl bg-dp-navy/8
                       hover:bg-dp-navy/15 flex items-center justify-center
                       transition-colors duration-150 flex-shrink-0"
                aria-label="Close">
          <svg class="w-4 h-4 text-dp-navy/60" fill="none" stroke="currentColor"
               stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <!-- Title (populated by openModal) -->
        <h2 id="dp-legal-modal-title"
            class="font-display font-bold text-dp-navy text-xl mb-5 pr-10 flex-shrink-0">
        </h2>

        <!-- Scrollable body (populated by openModal) -->
        <div id="dp-legal-modal-body"
             class="font-body text-sm text-dp-navy/80 space-y-4 leading-relaxed pr-2">
        </div>

      </div>
    </div>
  `
}

export function init() {
  const overlay  = document.getElementById('dp-legal-modal-overlay')
  const bodyEl   = document.getElementById('dp-legal-modal-body')
  const titleEl  = document.getElementById('dp-legal-modal-title')
  const closeBtn = document.getElementById('dp-legal-modal-close')

  if (!overlay || !bodyEl) return

  // ── Open ──────────────────────────────────────────────────────────────────
  function openModal(type) {
    const content = buildModalContent(type)

    if (titleEl) titleEl.textContent = content.title
    bodyEl.innerHTML = content.html

    // Scroll body to top on each open
    const card = document.getElementById('dp-legal-modal-card')
    if (card) card.scrollTop = 0

    overlay.classList.remove('hidden')
    // Defer opacity frame so the CSS transition fires after display:block
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.classList.remove('opacity-0', 'pointer-events-none')
        overlay.classList.add('opacity-100')
      })
    })

    document.body.classList.add('overflow-hidden')
  }

  // ── Close ─────────────────────────────────────────────────────────────────
  function closeModal() {
    overlay.classList.add('opacity-0', 'pointer-events-none')
    overlay.classList.remove('opacity-100')
    document.body.classList.remove('overflow-hidden')

    overlay.addEventListener('transitionend', () => {
      overlay.classList.add('hidden')
    }, { once: true })
  }

  // ── Custom event (from ConsentBanner + anywhere else) ─────────────────────
  document.addEventListener('dp:openModal', (e) => {
    openModal(e.detail?.modal || 'privacy')
  })

  // ── Global click delegation — captures [data-modal] anywhere in the DOM ───
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-modal]')
    if (btn) openModal(btn.dataset.modal)
  })

  // ── Close mechanics ───────────────────────────────────────────────────────
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal)
  }

  // Backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal()
  })

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
      closeModal()
    }
  })
}
