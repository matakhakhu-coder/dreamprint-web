import { BRAND } from '@/core/manifest.js'

const NAV_LINKS = [
  { label: 'Shop',         href: '#shop' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Gallery',      href: '#gallery' },
  { label: 'About',        href: '#about' },
  { label: 'Contact',      href: '#contact' },
]

export function render() {
  const waHref = BRAND.whatsapp
    ? `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi, I'd like to create a custom product for my child!")}`
    : '#contact'

  return `
    <!-- Navbar -->
    <header id="navbar" class="fixed top-0 inset-x-0 z-50 bg-dp-cream/95 backdrop-blur-sm shadow-nav transition-shadow duration-300">
      <div class="section-container">
        <div class="flex items-center justify-between h-16 md:h-18">

          <!-- Logo -->
          <a href="/" class="flex items-center gap-2.5 min-h-0 min-w-0" aria-label="${BRAND.name} home">
            <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-dp-coral flex-shrink-0">
              <span class="text-white text-sm font-display font-bold leading-none">DP</span>
            </div>
            <span class="font-display font-bold text-dp-navy text-lg leading-none hidden sm:block">${BRAND.name}</span>
          </a>

          <!-- Desktop nav -->
          <nav class="hidden md:flex items-center gap-1" aria-label="Primary navigation">
            ${NAV_LINKS.map(l => `
              <a href="${l.href}"
                 data-nav-link
                 class="nav-link px-3 py-2 rounded-lg text-sm font-body font-medium text-dp-navy/70 hover:text-dp-navy hover:bg-dp-navy/5 transition-colors duration-150 min-h-0">
                ${l.label}
              </a>`).join('')}
          </nav>

          <!-- Desktop CTA -->
          <div class="hidden md:flex items-center gap-3">
            <a href="${waHref}"
               target="_blank" rel="noopener noreferrer"
               class="flex items-center gap-2 px-4 py-2 rounded-lg text-dp-sage border border-dp-sage/30 text-sm font-body font-medium hover:bg-dp-sage/5 transition-colors duration-150 min-h-0">
              <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.882a.5.5 0 0 0 .61.61l6.086-1.47A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.66-.497-5.19-1.365l-.37-.217-3.836.926.942-3.768-.238-.388A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              WhatsApp
            </a>
            <a href="#upload" class="btn-primary text-sm px-5 py-2.5">
              Upload Your Art
            </a>
          </div>

          <!-- Mobile hamburger -->
          <button id="nav-toggle"
                  class="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg hover:bg-dp-navy/5 transition-colors duration-150"
                  aria-label="Toggle navigation menu"
                  aria-expanded="false"
                  aria-controls="mobile-menu">
            <span class="hamburger-bar block w-5 h-0.5 bg-dp-navy rounded-full transition-all duration-300"></span>
            <span class="hamburger-bar block w-5 h-0.5 bg-dp-navy rounded-full transition-all duration-300"></span>
            <span class="hamburger-bar block w-5 h-0.5 bg-dp-navy rounded-full transition-all duration-300"></span>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div id="mobile-menu"
           class="md:hidden overflow-hidden max-h-0 transition-[max-height] duration-300 ease-in-out"
           aria-hidden="true">
        <div class="section-container pb-4 border-t border-dp-navy/8">
          <nav class="flex flex-col pt-3 gap-1" aria-label="Mobile navigation">
            ${NAV_LINKS.map(l => `
              <a href="${l.href}"
                 data-nav-link
                 class="nav-link block px-3 py-3 rounded-lg text-dp-navy/80 font-body font-medium hover:bg-dp-navy/5 transition-colors duration-150">
                ${l.label}
              </a>`).join('')}
          </nav>
          <div class="flex flex-col gap-2 mt-4 pt-4 border-t border-dp-navy/8">
            <a href="${waHref}" target="_blank" rel="noopener noreferrer"
               class="btn-whatsapp justify-center text-sm">
              WhatsApp Us
            </a>
            <a href="#upload" class="btn-primary justify-center text-sm">
              Upload Your Art
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- WhatsApp FAB — mobile only, fixed bottom-right -->
    <a href="${waHref}"
       target="_blank" rel="noopener noreferrer"
       id="whatsapp-fab"
       class="md:hidden fixed bottom-5 right-5 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-dp-sage shadow-lg hover:bg-dp-sage-light active:scale-95 transition-all duration-200"
       aria-label="Chat on WhatsApp">
      <svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.882a.5.5 0 0 0 .61.61l6.086-1.47A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.66-.497-5.19-1.365l-.37-.217-3.836.926.942-3.768-.238-.388A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
    </a>
  `
}

export function init() {
  const toggle   = document.getElementById('nav-toggle')
  const menu     = document.getElementById('mobile-menu')
  const bars     = toggle?.querySelectorAll('.hamburger-bar')
  const navLinks = document.querySelectorAll('[data-nav-link]')

  // ── Mobile menu toggle ─────────────────────────────────────────────────────
  function openMenu() {
    menu.style.maxHeight = menu.scrollHeight + 'px'
    menu.setAttribute('aria-hidden', 'false')
    toggle.setAttribute('aria-expanded', 'true')
    // X transform
    if (bars) {
      bars[0].style.cssText = 'transform: translateY(8px) rotate(45deg)'
      bars[1].style.cssText = 'opacity: 0; transform: scaleX(0)'
      bars[2].style.cssText = 'transform: translateY(-8px) rotate(-45deg)'
    }
  }

  function closeMenu() {
    menu.style.maxHeight = '0'
    menu.setAttribute('aria-hidden', 'true')
    toggle.setAttribute('aria-expanded', 'false')
    if (bars) {
      bars[0].style.cssText = ''
      bars[1].style.cssText = ''
      bars[2].style.cssText = ''
    }
  }

  toggle?.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true'
    isOpen ? closeMenu() : openMenu()
  })

  // Close mobile menu on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) closeMenu()
    })
  })

  // Close on outside click
  document.addEventListener('click', e => {
    if (!toggle?.contains(e.target) && !menu?.contains(e.target)) closeMenu()
  })

  // ── Smooth scroll for hash links ───────────────────────────────────────────
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href')
      if (!href?.startsWith('#')) return
      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()
      const navH = document.getElementById('navbar')?.offsetHeight || 64
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 8
      window.scrollTo({ top, behavior: 'smooth' })
    })
  })

  // ── Active nav link via IntersectionObserver ───────────────────────────────
  const sections = NAV_LINKS.map(l => document.querySelector(l.href)).filter(Boolean)

  if (sections.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const id   = '#' + entry.target.id
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === id
          link.classList.toggle('text-dp-coral', active)
          link.classList.toggle('text-dp-navy/70', !active)
          link.classList.toggle('font-semibold', active)
        })
      })
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 })

    sections.forEach(s => obs.observe(s))
  }

  // ── Navbar shadow on scroll ────────────────────────────────────────────────
  const navbar = document.getElementById('navbar')
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('shadow-md', window.scrollY > 8)
    navbar?.classList.toggle('shadow-nav', window.scrollY <= 8)
  }, { passive: true })
}
