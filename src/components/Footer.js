import { BRAND } from '@/core/manifest.js'

const QUICK_LINKS = [
  { label: 'Shop',         href: '#shop' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Upload Your Art', href: '#upload' },
  { label: 'Gallery',      href: '#gallery' },
  { label: 'About',        href: '#about' },
  { label: 'Contact',      href: '#contact' },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy',  modal: 'privacy' },
  { label: 'Terms & Conditions', modal: 'terms' },
  { label: 'Refund Policy',   modal: 'refund' },
  { label: 'Shipping Policy', modal: 'shipping' },
]

export function render() {
  const year    = new Date().getFullYear()
  const waHref  = BRAND.whatsapp
    ? `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi, I'd like to create a custom product for my child!")}`
    : '#contact'
  const emailHref = BRAND.email ? `mailto:${BRAND.email}` : '#contact'
  const igHref  = BRAND.social.instagram ? `https://instagram.com/${BRAND.social.instagram}` : '#'
  const fbHref  = BRAND.social.facebook  ? `https://facebook.com/${BRAND.social.facebook}` : '#'
  const ttHref  = BRAND.social.tiktok    ? `https://tiktok.com/@${BRAND.social.tiktok}` : '#'

  return `
    <!-- Footer -->
    <footer id="footer" class="bg-dp-navy text-white" role="contentinfo">

      <!-- Main footer grid -->
      <div class="section-container py-14 md:py-16">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          <!-- Column 1: Brand -->
          <div class="sm:col-span-2 lg:col-span-1">
            <a href="/" class="flex items-center gap-2.5 mb-4 min-h-0" aria-label="${BRAND.name} home">
              <div class="flex items-center justify-center w-9 h-9 rounded-xl bg-dp-coral flex-shrink-0">
                <span class="text-white font-display font-bold text-base leading-none">DP</span>
              </div>
              <span class="font-display font-bold text-white text-xl">${BRAND.name}</span>
            </a>
            <p class="font-body text-white/55 text-sm leading-relaxed mb-5 max-w-xs">
              ${BRAND.tagline}
            </p>
            <!-- Social icons -->
            <div class="flex items-center gap-3">
              <a href="${igHref}" ${BRAND.social.instagram ? 'target="_blank" rel="noopener noreferrer"' : 'aria-disabled="true"'}
                 class="w-9 h-9 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors duration-150"
                 aria-label="Instagram${BRAND.social.instagram ? ` @${BRAND.social.instagram}` : ' (coming soon)'}">
                <svg class="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="${fbHref}" ${BRAND.social.facebook ? 'target="_blank" rel="noopener noreferrer"' : 'aria-disabled="true"'}
                 class="w-9 h-9 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors duration-150"
                 aria-label="Facebook${BRAND.social.facebook ? ` /${BRAND.social.facebook}` : ' (coming soon)'}">
                <svg class="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="${ttHref}" ${BRAND.social.tiktok ? 'target="_blank" rel="noopener noreferrer"' : 'aria-disabled="true"'}
                 class="w-9 h-9 rounded-lg bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors duration-150"
                 aria-label="TikTok${BRAND.social.tiktok ? ` @${BRAND.social.tiktok}` : ' (coming soon)'}">
                <svg class="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Column 2: Quick links -->
          <div>
            <h3 class="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul class="flex flex-col gap-2.5">
              ${QUICK_LINKS.map(l => `
                <li>
                  <a href="${l.href}"
                     class="font-body text-white/55 text-sm hover:text-white transition-colors duration-150">
                    ${l.label}
                  </a>
                </li>`).join('')}
            </ul>
          </div>

          <!-- Column 3: Legal -->
          <div>
            <h3 class="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">Legal</h3>
            <ul class="flex flex-col gap-2.5">
              ${LEGAL_LINKS.map(l => `
                <li>
                  <button data-modal="${l.modal}"
                          class="font-body text-white/55 text-sm hover:text-white transition-colors duration-150 text-left min-h-0">
                    ${l.label}
                  </button>
                </li>`).join('')}
            </ul>
          </div>

          <!-- Column 4: Contact -->
          <div>
            <h3 class="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">Contact Us</h3>
            <ul class="flex flex-col gap-3">
              ${BRAND.email ? `
                <li>
                  <a href="${emailHref}"
                     class="flex items-center gap-2.5 font-body text-white/55 text-sm hover:text-white transition-colors duration-150">
                    <svg class="w-4 h-4 flex-shrink-0 text-white/30" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    ${BRAND.email}
                  </a>
                </li>` : `
                <li class="flex items-center gap-2.5">
                  <svg class="w-4 h-4 flex-shrink-0 text-white/20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span class="font-body text-white/25 text-sm italic">Email coming soon</span>
                </li>`}

              <li>
                <a href="${waHref}" target="_blank" rel="noopener noreferrer"
                   class="flex items-center gap-2.5 font-body text-white/55 text-sm hover:text-white transition-colors duration-150">
                  <svg class="w-4 h-4 flex-shrink-0 text-dp-sage" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.882a.5.5 0 0 0 .61.61l6.086-1.47A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.66-.497-5.19-1.365l-.37-.217-3.836.926.942-3.768-.238-.388A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  ${BRAND.whatsapp ? BRAND.whatsappDisplay || BRAND.whatsapp : 'WhatsApp (coming soon)'}
                </a>
              </li>
            </ul>

            <!-- Trust badges -->
            <div class="mt-6 flex flex-wrap gap-2">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/6 text-white/45 text-xs font-body">
                <svg class="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
                POPIA Compliant
              </span>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/6 text-white/45 text-xs font-body">
                <svg class="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>
                SA-Made
              </span>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/6 text-white/45 text-xs font-body">
                <svg class="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                PayFast Secured
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-white/8">
        <div class="section-container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p class="font-body text-white/35 text-xs">
            &copy; ${year} ${BRAND.legalName}.
            ${BRAND.compliance.registrationNumber
              ? `Reg. No. ${BRAND.compliance.registrationNumber}.`
              : ''}
            All rights reserved.
          </p>
          <p class="font-body text-white/25 text-xs">
            POPIA: your data is handled as described in our
            <button data-modal="privacy"
                    class="text-white/40 underline underline-offset-2 hover:text-white/60 transition-colors duration-150 min-h-0">
              Privacy Policy
            </button>.
          </p>
        </div>
      </div>
    </footer>
  `
}

export function init() {
  // Smooth scroll for footer quick links
  document.querySelectorAll('#footer a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'))
      if (!target) return
      e.preventDefault()
      const navH = document.getElementById('navbar')?.offsetHeight || 64
      window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' })
    })
  })

  // Legal modal triggers — dispatches a custom event that LegalModals.js will handle in Phase 7
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.getAttribute('data-modal')
      document.dispatchEvent(new CustomEvent('dp:openModal', { detail: { modal } }))
    })
  })
}
