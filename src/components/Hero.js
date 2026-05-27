import { BRAND } from '@/core/manifest.js'

export function render() {
  const waHref = BRAND.whatsapp
    ? `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi, I'd like to create a custom product for my child!")}`
    : '#contact'

  return `
    <!-- Hero -->
    <section id="hero" class="relative min-h-screen flex items-center bg-dp-cream overflow-hidden pt-16">

      <!-- Background decoration -->
      <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-dp-coral/6 blur-3xl"></div>
        <div class="absolute top-1/3 -left-24 w-80 h-80 rounded-full bg-dp-yellow/8 blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-dp-sage/6 blur-3xl"></div>
      </div>

      <div class="section-container relative z-10 py-16 md:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <!-- Copy block -->
          <div class="max-w-xl">

            <!-- Trust badge -->
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dp-sage/10 border border-dp-sage/20 mb-6">
              <span class="w-2 h-2 rounded-full bg-dp-sage flex-shrink-0"></span>
              <span class="text-dp-sage text-xs font-body font-semibold uppercase tracking-wide">SA-made · Delivered nationwide</span>
            </div>

            <!-- Primary headline -->
            <h1 class="font-display font-extrabold text-dp-navy text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight mb-5">
              Turn your child's art<br />
              <span class="text-dp-coral">into something they'll<br />wear forever.</span>
            </h1>

            <!-- Sub-headline -->
            <p class="font-body text-dp-navy/65 text-lg sm:text-xl leading-relaxed mb-8 max-w-md">
              Custom-printed keepsakes from their drawings — pyjamas, tees, mugs, and more. From photo to product in 10–12 days.
            </p>

            <!-- CTAs -->
            <div class="flex flex-col sm:flex-row gap-3 mb-10">
              <a href="#upload" class="btn-primary text-base px-7 py-3.5 justify-center sm:justify-start">
                <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                </svg>
                Upload Your Art
              </a>
              <a href="${waHref}" target="_blank" rel="noopener noreferrer"
                 class="btn-whatsapp text-base px-7 py-3.5 justify-center sm:justify-start">
                <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.882a.5.5 0 0 0 .61.61l6.086-1.47A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.66-.497-5.19-1.365l-.37-.217-3.836.926.942-3.768-.238-.388A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>

            <!-- Social proof row -->
            <div class="flex items-center gap-4 flex-wrap">
              <div class="flex -space-x-2">
                ${['E', 'P', 'L'].map((initial, i) => `
                  <div class="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                       style="background-color: ${['#E8634A','#4A7C6F','#1A2B4A'][i]}">
                    ${initial}
                  </div>`).join('')}
              </div>
              <div>
                <div class="flex text-dp-yellow gap-0.5" aria-label="5 stars">
                  ${'★'.repeat(5)}
                </div>
                <p class="text-dp-navy/60 text-xs font-body mt-0.5">Loved by SA families</p>
              </div>
            </div>
          </div>

          <!-- Before/After showcase -->
          <div class="relative">
            <div class="relative grid grid-cols-2 gap-4">

              <!-- Before card -->
              <div class="before-after-card relative rounded-2xl overflow-hidden bg-dp-cream-dark shadow-card aspect-[3/4]">
                <div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <!-- Placeholder artwork frame -->
                  <div class="w-full flex-1 rounded-xl bg-white/70 border-2 border-dashed border-dp-navy/15 flex flex-col items-center justify-center mb-3 relative overflow-hidden">
                    <!-- Crayon scribble illustration (CSS only) -->
                    <div class="absolute inset-4 opacity-30" aria-hidden="true">
                      <svg viewBox="0 0 120 140" class="w-full h-full" fill="none">
                        <path d="M20 100 Q40 20 60 60 Q80 100 100 30" stroke="#E8634A" stroke-width="4" stroke-linecap="round" fill="none"/>
                        <circle cx="45" cy="50" r="12" fill="#F5C842" opacity="0.7"/>
                        <path d="M30 110 Q50 90 70 105 Q90 120 110 95" stroke="#4A7C6F" stroke-width="3" stroke-linecap="round" fill="none"/>
                        <rect x="55" y="30" width="20" height="25" rx="3" fill="#1A2B4A" opacity="0.3"/>
                        <circle cx="85" cy="85" r="8" fill="#E8634A" opacity="0.5"/>
                      </svg>
                    </div>
                    <div class="relative z-10">
                      <svg class="w-8 h-8 text-dp-navy/20 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <p class="text-dp-navy/30 text-xs font-body">Your artwork</p>
                    </div>
                  </div>
                  <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-dp-navy/8 text-dp-navy/50 text-xs font-body font-medium">
                    Before
                  </span>
                </div>
              </div>

              <!-- After card (larger, offset up) -->
              <div class="before-after-card relative rounded-2xl overflow-hidden bg-dp-coral/8 shadow-card-hover aspect-[3/4] -mt-6">
                <div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <!-- Placeholder product frame -->
                  <div class="w-full flex-1 rounded-xl bg-white/80 border border-dp-coral/20 flex flex-col items-center justify-center mb-3 relative overflow-hidden">
                    <!-- T-shirt shape illustration (CSS only) -->
                    <div class="absolute inset-3 opacity-25" aria-hidden="true">
                      <svg viewBox="0 0 120 140" class="w-full h-full" fill="none">
                        <path d="M15 25 L40 15 L50 30 L70 30 L80 15 L105 25 L95 55 L80 50 L80 125 L40 125 L40 50 L25 55 Z" fill="#E8634A" opacity="0.4"/>
                        <path d="M45 60 Q55 40 75 70 Q85 90 65 100 Q45 110 45 90 Z" fill="#F5C842" opacity="0.6"/>
                      </svg>
                    </div>
                    <div class="relative z-10">
                      <div class="w-8 h-8 rounded-lg bg-dp-coral/20 flex items-center justify-center mx-auto mb-1">
                        <svg class="w-4 h-4 text-dp-coral" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <p class="text-dp-navy/40 text-xs font-body">On product</p>
                    </div>
                  </div>
                  <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-dp-coral/15 text-dp-coral text-xs font-body font-semibold">
                    ✦ After
                  </span>
                </div>

                <!-- Premium badge -->
                <div class="absolute top-3 right-3 w-10 h-10 rounded-full bg-dp-yellow flex items-center justify-center shadow-md" aria-hidden="true">
                  <span class="text-dp-navy text-xs font-display font-bold leading-none">✦</span>
                </div>
              </div>

              <!-- Floating stat cards -->
              <div class="absolute -bottom-4 left-4 bg-white rounded-xl shadow-card px-4 py-2.5 flex items-center gap-2.5 z-10">
                <div class="w-8 h-8 rounded-lg bg-dp-sage/15 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-dp-sage" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="font-display font-bold text-dp-navy text-sm leading-none">10–12 days</p>
                  <p class="font-body text-dp-navy/50 text-xs mt-0.5">Nationwide delivery</p>
                </div>
              </div>

              <div class="absolute -top-4 right-4 bg-white rounded-xl shadow-card px-4 py-2.5 flex items-center gap-2.5 z-10">
                <div class="w-8 h-8 rounded-lg bg-dp-yellow/20 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-dp-navy" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="font-display font-bold text-dp-navy text-sm leading-none">100% custom</p>
                  <p class="font-body text-dp-navy/50 text-xs mt-0.5">From their drawing</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Scroll indicator -->
        <div class="flex justify-center mt-16 md:mt-20" aria-hidden="true">
          <button id="hero-scroll"
                  class="flex flex-col items-center gap-2 text-dp-navy/30 hover:text-dp-navy/50 transition-colors duration-200 min-h-0 min-w-0"
                  aria-label="Scroll to discover more">
            <span class="font-body text-xs uppercase tracking-widest">Discover</span>
            <div class="w-5 h-8 rounded-full border-2 border-current flex items-start justify-center pt-1.5">
              <div class="w-1 h-2 rounded-full bg-current animate-bounce"></div>
            </div>
          </button>
        </div>
      </div>
    </section>
  `
}

export function init() {
  // Scroll indicator button
  document.getElementById('hero-scroll')?.addEventListener('click', () => {
    const target = document.getElementById('how-it-works') || document.getElementById('shop')
    if (!target) return
    const navH = document.getElementById('navbar')?.offsetHeight || 64
    window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' })
  })

  // Animate before/after cards on load
  const cards = document.querySelectorAll('.before-after-card')
  cards.forEach((card, i) => {
    card.style.opacity = '0'
    card.style.transform = 'translateY(20px)'
    card.style.transition = `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.style.opacity = '1'
        card.style.transform = 'translateY(0)'
      })
    })
  })
}
