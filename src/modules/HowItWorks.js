import { BRAND } from '@/core/manifest.js'

// 5-step operational flow — module-local (no BRAND key for this yet)
const STEPS = [
  {
    n:    1,
    title: 'Upload Your Art',
    body:  "Take a clear photo of your child's drawing and upload it through our portal. Any medium works — crayon, pencil, watercolour, felt-tip, even finger paint.",
    icon: `<svg viewBox="0 0 32 32" class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="4" y="6" width="24" height="20" rx="3"/>
      <path d="M16 18V10M13 13l3-3 3 3"/>
    </svg>`,
  },
  {
    n:    2,
    title: 'We Enhance It',
    body:  `Our team digitally cleans and refines the artwork — sharpening lines, balancing colours, and preparing it for premium printing. Turnaround: ${BRAND.fulfillment.enhancementDays}.`,
    icon: `<svg viewBox="0 0 32 32" class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20 4l2 2-12 12-3 1 1-3L20 4z"/>
      <path d="M26 20c0 3.31-2.69 6-6 6H8a4 4 0 010-8h1"/>
    </svg>`,
  },
  {
    n:    3,
    title: 'You Approve',
    body:  `We send you a digital mockup within ${BRAND.fulfillment.enhancementDays}. You have ${BRAND.fulfillment.approvalWindow} to approve or request revisions — we don't print until you're happy.`,
    icon: `<svg viewBox="0 0 32 32" class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="16" cy="16" r="11"/>
      <path d="M11 16l4 4 6-7"/>
    </svg>`,
  },
  {
    n:    4,
    title: 'We Print',
    body:  `Once approved, your order goes straight to our printing partners. Full-colour, premium-quality printing on your chosen product. Production: ${BRAND.fulfillment.productionDays}.`,
    icon: `<svg viewBox="0 0 32 32" class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="6" y="12" width="20" height="14" rx="2"/>
      <path d="M10 12V8a2 2 0 012-2h8a2 2 0 012 2v4"/>
      <circle cx="22" cy="19" r="1.5" fill="currentColor" stroke="none"/>
    </svg>`,
  },
  {
    n:    5,
    title: 'We Deliver',
    body:  `Your custom product ships nationwide via courier. ${BRAND.fulfillment.blindShipping ? 'Blind shipping — no supplier branding on your parcel.' : 'Delivered to your door.'} Courier time: ${BRAND.fulfillment.courierDays}.`,
    icon: `<svg viewBox="0 0 32 32" class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M2 20h18V10H2z"/>
      <path d="M20 14h4l4 4v2h-8V14z"/>
      <circle cx="7"  cy="23" r="2.5"/>
      <circle cx="23" cy="23" r="2.5"/>
    </svg>`,
  },
]

export function render() {
  return `
    <!-- HowItWorks -->
    <section id="how-it-works" class="bg-dp-cream py-16 px-4 md:px-8">
      <div class="max-w-7xl mx-auto">

        <!-- Section header -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dp-yellow/20 border border-dp-yellow/40 mb-4">
            <span class="w-1.5 h-1.5 rounded-full bg-dp-navy/40 flex-shrink-0"></span>
            <span class="text-dp-navy/60 text-xs font-body font-semibold uppercase tracking-wide">Simple Process</span>
          </div>
          <h2 class="font-display font-extrabold text-dp-navy text-3xl sm:text-4xl mb-3">
            How It Works
          </h2>
          <p class="font-body text-dp-navy/60 text-base max-w-md mx-auto leading-relaxed">
            From phone photo to product on your doorstep in ${BRAND.fulfillment.totalDays} — here's the journey.
          </p>
        </div>

        <!-- Step grid — 1 col mobile, 3 col tablet, 5 col desktop -->
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 max-w-7xl mx-auto">
          ${STEPS.map((step, i) => `
            <div class="flex flex-col items-center text-center relative">

              <!-- Connector line to next step (hidden on last, desktop only) -->
              ${i < STEPS.length - 1 ? `
                <div class="hidden lg:block absolute top-6 left-[calc(50%+2.5rem)] right-0 h-px bg-dp-yellow/40" aria-hidden="true"></div>
              ` : ''}

              <!-- Number bubble -->
              <div class="w-12 h-12 bg-dp-yellow text-dp-navy font-display font-bold rounded-full flex items-center justify-center text-lg mb-4 flex-shrink-0 relative z-10 shadow-sm">
                ${step.n}
              </div>

              <!-- Icon -->
              <div class="w-10 h-10 text-dp-coral mb-3">
                ${step.icon}
              </div>

              <!-- Copy -->
              <h3 class="font-display font-bold text-dp-navy text-base mb-2">
                ${step.title}
              </h3>
              <p class="font-body text-dp-navy/55 text-sm leading-relaxed">
                ${step.body}
              </p>
            </div>`).join('')}
        </div>

        <!-- Bottom CTA row -->
        <div class="text-center mt-12">
          <a href="#upload" class="btn-primary inline-flex">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
            </svg>
            Start Your Order
          </a>
        </div>

      </div>
    </section>
  `
}

export function init() {}
