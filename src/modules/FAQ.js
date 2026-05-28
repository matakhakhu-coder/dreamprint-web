import { BRAND } from '@/core/manifest.js'

const CHEVRON_SVG = `
  <svg class="faq-chevron w-5 h-5 text-dp-navy/40 transition-transform duration-200 flex-shrink-0"
       fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
  </svg>`

export function render() {
  return `
    <!-- FAQ -->
    <section id="faq" class="bg-dp-cream py-16 px-4 md:px-8">
      <div class="max-w-7xl mx-auto">

        <!-- Section header -->
        <div class="text-center mb-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dp-navy/6 border border-dp-navy/10 mb-4">
            <span class="w-1.5 h-1.5 rounded-full bg-dp-navy/30 flex-shrink-0"></span>
            <span class="text-dp-navy/50 text-xs font-body font-semibold uppercase tracking-wide">Got Questions?</span>
          </div>
          <h2 class="font-display font-extrabold text-dp-navy text-3xl sm:text-4xl mb-3">
            Frequently Asked Questions
          </h2>
          <p class="font-body text-dp-navy/60 text-base max-w-md mx-auto leading-relaxed">
            Everything you need to know before you order.
          </p>
        </div>

        <!-- Accordion list -->
        <div class="max-w-3xl mx-auto mt-12 space-y-4">
          ${BRAND.faq.map((item, i) => `
            <div class="faq-item bg-white border border-dp-cream-dark rounded-xl overflow-hidden shadow-sm">

              <button class="faq-trigger w-full flex justify-between items-center p-5 text-left font-display font-bold text-dp-navy hover:text-dp-coral group transition-colors duration-150"
                      data-faq-id="${i}"
                      aria-expanded="false"
                      aria-controls="faq-content-${i}">
                <span class="pr-4 text-sm sm:text-base leading-snug">${item.q}</span>
                ${CHEVRON_SVG}
              </button>

              <div id="faq-content-${i}"
                   class="faq-content hidden px-5 pb-5 font-body text-sm text-dp-navy/70 border-t border-dp-cream-dark bg-dp-cream/30 leading-relaxed pt-4">
                ${item.a}
              </div>

            </div>`).join('')}
        </div>

        <!-- Bottom prompt -->
        <div class="text-center mt-10">
          <p class="font-body text-dp-navy/50 text-sm">
            Still have questions?
            <a href="#contact"
               class="text-dp-coral hover:text-dp-coral-dark underline underline-offset-2 transition-colors duration-150">
              Get in touch
            </a>
            — we respond within 24 hours.
          </p>
        </div>

      </div>
    </section>
  `
}

export function init() {
  document.querySelectorAll('.faq-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const item    = btn.closest('.faq-item')
      const content = item?.querySelector('.faq-content')
      const chevron = btn.querySelector('.faq-chevron')
      if (!content) return

      const isOpen  = !content.classList.contains('hidden')

      // Close all open items first (one-open-at-a-time accordion)
      document.querySelectorAll('.faq-content').forEach(c => {
        c.classList.add('hidden')
        c.closest('.faq-item')
          ?.querySelector('.faq-trigger')
          ?.setAttribute('aria-expanded', 'false')
        c.closest('.faq-item')
          ?.querySelector('.faq-chevron')
          ?.classList.remove('rotate-180')
      })

      // Toggle the clicked item
      if (!isOpen) {
        content.classList.remove('hidden')
        btn.setAttribute('aria-expanded', 'true')
        chevron?.classList.add('rotate-180')
      }
    })
  })
}
