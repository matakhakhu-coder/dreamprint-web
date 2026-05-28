import { BRAND } from '@/core/manifest.js'

function starRow(count) {
  return Array.from({ length: 5 }, (_, i) =>
    `<svg class="w-4 h-4 ${i < count ? 'text-dp-yellow' : 'text-dp-navy/15'}" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
     </svg>`
  ).join('')
}

function testimonialCard(t) {
  return `
    <article class="bg-white border border-dp-cream rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">

      <!-- Stars -->
      <div class="flex items-center gap-0.5" role="img" aria-label="${t.stars} out of 5 stars">
        ${starRow(t.stars)}
      </div>

      <!-- Quote -->
      <blockquote class="font-body text-dp-navy/75 text-sm leading-relaxed flex-1">
        <span class="text-dp-coral text-2xl font-display font-bold leading-none mr-1 align-middle" aria-hidden="true">"</span>${t.quote}<span class="text-dp-coral text-2xl font-display font-bold leading-none ml-1 align-middle" aria-hidden="true">"</span>
      </blockquote>

      <!-- Attribution -->
      <footer class="border-t border-dp-cream-dark pt-4 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <!-- Avatar initials -->
          <div class="w-9 h-9 rounded-full bg-dp-coral/15 flex items-center justify-center flex-shrink-0">
            <span class="font-display font-bold text-dp-coral text-sm leading-none">
              ${t.name.charAt(0)}
            </span>
          </div>
          <div>
            <p class="font-display font-bold text-dp-navy text-sm leading-snug">${t.name}</p>
            <p class="font-body text-dp-navy/45 text-xs">Child aged ${t.childAge}</p>
          </div>
        </div>
        <div class="text-right flex-shrink-0">
          <p class="font-body text-dp-navy/40 text-xs">${t.location}</p>
          <p class="font-body text-dp-coral/60 text-xs mt-0.5">${t.product}</p>
        </div>
      </footer>
    </article>`
}

export function render() {
  const testimonials = BRAND.demo.testimonials

  return `
    <!-- Testimonials -->
    <section id="testimonials" class="bg-dp-cream-dark py-16 px-4 md:px-8">
      <div class="max-w-7xl mx-auto">

        <!-- Section header -->
        <div class="text-center mb-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dp-yellow/20 border border-dp-yellow/40 mb-4">
            <span class="text-dp-yellow text-sm leading-none" aria-hidden="true">★</span>
            <span class="text-dp-navy/60 text-xs font-body font-semibold uppercase tracking-wide">What Parents Say</span>
          </div>
          <h2 class="font-display font-extrabold text-dp-navy text-3xl sm:text-4xl mb-3">
            Loved by SA Families
          </h2>
          <p class="font-body text-dp-navy/60 text-base max-w-md mx-auto leading-relaxed">
            Every order is custom-made and one of a kind — just like the little artist behind it.
          </p>
        </div>

        <!-- Testimonials grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mt-12">
          ${testimonials.map(t => testimonialCard(t)).join('')}
        </div>

        <!-- Social trust strip -->
        <div class="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <div class="flex items-center gap-2">
            <div class="flex gap-0.5" aria-label="5 stars average">
              ${starRow(5)}
            </div>
            <span class="font-display font-bold text-dp-navy text-sm">5.0</span>
            <span class="font-body text-dp-navy/40 text-xs">average rating</span>
          </div>
          <div class="w-px h-5 bg-dp-navy/15 hidden sm:block" aria-hidden="true"></div>
          <div class="flex items-center gap-2">
            <div class="w-5 h-5 rounded-full bg-dp-sage/20 flex items-center justify-center">
              <svg class="w-3 h-3 text-dp-sage" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <span class="font-body text-dp-navy/55 text-xs">100% custom — no two orders alike</span>
          </div>
          <div class="w-px h-5 bg-dp-navy/15 hidden sm:block" aria-hidden="true"></div>
          <div class="flex items-center gap-2">
            <div class="w-5 h-5 rounded-full bg-dp-coral/15 flex items-center justify-center">
              <svg class="w-3 h-3 text-dp-coral" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <span class="font-body text-dp-navy/55 text-xs">SA-made · Delivered nationwide</span>
          </div>
        </div>

      </div>
    </section>
  `
}

export function init() {}
