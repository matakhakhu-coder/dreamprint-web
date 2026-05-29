export function render() {
  return `
    <!-- POPIA / Cookie Consent Banner -->
    <div id="dp-consent-banner"
         class="fixed bottom-0 inset-x-0 bg-dp-navy text-white p-4 md:py-5 md:px-8 z-50
                flex flex-col md:flex-row justify-between items-center gap-4
                shadow-2xl transition-transform duration-300 translate-y-full hidden"
         role="region"
         aria-label="Cookie and privacy consent">

      <!-- Left: copy -->
      <p class="font-body text-xs md:text-sm text-white/85 max-w-4xl leading-relaxed">
        We use cookies and process personal information in accordance with the
        <strong class="text-white font-semibold">Protection of Personal Information Act (POPIA)</strong>
        of South Africa. By continuing to use this site, you acknowledge our data practices
        and consent to the use of essential cookies required to operate the platform.
        <button data-modal="popia"
                type="button"
                class="text-dp-yellow hover:underline ml-1 font-medium transition-colors duration-150"
                aria-haspopup="dialog">
          Read our POPIA Notice
        </button>
      </p>

      <!-- Right: accept CTA -->
      <button id="dp-consent-accept"
              type="button"
              class="bg-dp-sage hover:bg-dp-sage-light text-white rounded-xl py-2 px-5
                     text-sm whitespace-nowrap min-h-[44px] font-body font-medium
                     transition-colors duration-150 flex-shrink-0">
        Accept All
      </button>

    </div>
  `
}

export function init() {
  // If already accepted, do nothing
  if (localStorage.getItem('dp_consent_accepted') === 'true') return

  const banner    = document.getElementById('dp-consent-banner')
  const acceptBtn = document.getElementById('dp-consent-accept')
  if (!banner) return

  // Reveal banner, then animate up from off-screen
  banner.classList.remove('hidden')
  setTimeout(() => {
    banner.classList.remove('translate-y-full')
  }, 80)

  // Accept — slide down and hide
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      banner.classList.add('translate-y-full')
      localStorage.setItem('dp_consent_accepted', 'true')
      banner.addEventListener('transitionend', () => {
        banner.classList.add('hidden')
      }, { once: true })
    })
  }

  // POPIA link — dispatch to LegalModals via custom event
  const popiaBtn = banner.querySelector('[data-modal="popia"]')
  if (popiaBtn) {
    popiaBtn.addEventListener('click', () => {
      document.dispatchEvent(
        new CustomEvent('dp:openModal', { detail: { modal: 'popia' } })
      )
    })
  }
}
