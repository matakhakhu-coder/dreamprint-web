import { BRAND } from '@/core/manifest.js'

export function render() {
  // Null-safe fallbacks — never leak raw null into the DOM
  const founderName    = BRAND.founder.name         || 'Our Founder'
  const founderTitle   = BRAND.founder.title        || 'Founder & Creative Director'
  const founderBio     = BRAND.founder.bio          || 'DreamPrint SA was born from a simple belief: a child\'s drawing deserves to outlive the fridge magnet.'
  const storyHeading   = BRAND.founder.storyHeading || 'Why we started DreamPrint SA'
  const founderStory   = BRAND.founder.story        ||
    `Every parent has seen it — a drawing so full of personality and love that it hurts to throw away. We started ${BRAND.name} because those moments deserve to live somewhere more permanent than a kitchen drawer. We take your child's raw, imperfect, brilliant artwork and put it onto products your family will actually use and treasure.`
  const hasPortrait    = false // portrait asset TBC — placeholder renders until confirmed

  return `
    <!-- About -->
    <section id="about" class="bg-dp-cream py-16 px-4 md:px-8">
      <div class="max-w-7xl mx-auto">

        <!-- Split layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

          <!-- LEFT: Portrait frame -->
          <div class="flex justify-center md:justify-end order-2 md:order-1">
            <div class="relative w-full max-w-sm">

              ${hasPortrait ? `
                <img src="${BRAND.founder.portrait}"
                     alt="Portrait of ${founderName}, ${founderTitle}"
                     class="w-full rounded-3xl object-cover aspect-[3/4] shadow-card-hover">
              ` : `
                <!-- Geometric placeholder — replaced when portrait is confirmed -->
                <div class="w-full rounded-3xl aspect-[3/4] bg-dp-cream-dark flex flex-col items-center justify-center relative overflow-hidden shadow-card">

                  <!-- Background decoration -->
                  <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <div class="absolute top-0 right-0 w-48 h-48 rounded-full bg-dp-coral/8 -translate-y-1/3 translate-x-1/3"></div>
                    <div class="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-dp-sage/8 translate-y-1/3 -translate-x-1/3"></div>
                    <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center opacity-5">
                      <svg viewBox="0 0 200 200" class="w-64 h-64" fill="currentColor" aria-hidden="true">
                        <path d="M100 10 C140 10 180 40 180 80 C180 120 150 150 100 160 C50 150 20 120 20 80 C20 40 60 10 100 10 Z"/>
                      </svg>
                    </div>
                  </div>

                  <!-- Placeholder content -->
                  <div class="relative z-10 flex flex-col items-center gap-4 p-8 text-center">
                    <div class="w-20 h-20 rounded-full bg-dp-coral/15 flex items-center justify-center">
                      <svg class="w-10 h-10 text-dp-coral/40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                      </svg>
                    </div>

                    <div>
                      <p class="font-display font-bold text-dp-navy text-lg">${founderName}</p>
                      <p class="font-body text-dp-navy/50 text-sm mt-0.5">${founderTitle}</p>
                    </div>

                    <div class="flex items-center justify-center gap-2 mt-2">
                      <div class="w-2 h-2 rounded-full bg-dp-coral/40"></div>
                      <p class="font-body text-dp-navy/30 text-xs italic">Portrait coming soon</p>
                      <div class="w-2 h-2 rounded-full bg-dp-coral/40"></div>
                    </div>
                  </div>
                </div>
              `}

              <!-- Floating accent badge -->
              <div class="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-dp-yellow flex flex-col items-center justify-center shadow-card text-center p-2" aria-hidden="true">
                <span class="font-display font-extrabold text-dp-navy text-2xl leading-none">${BRAND.name.split(' ')[0]}</span>
                <span class="font-body text-dp-navy/60 text-[10px] uppercase tracking-wide mt-0.5">SA-Made</span>
              </div>
            </div>
          </div>

          <!-- RIGHT: Copy block -->
          <div class="order-1 md:order-2">

            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dp-sage/10 border border-dp-sage/20 mb-5">
              <span class="w-1.5 h-1.5 rounded-full bg-dp-sage flex-shrink-0"></span>
              <span class="text-dp-sage text-xs font-body font-semibold uppercase tracking-wide">Our Story</span>
            </div>

            <h2 class="font-display font-extrabold text-dp-navy text-3xl sm:text-4xl mb-4 leading-tight">
              ${storyHeading}
            </h2>

            <p class="font-body text-dp-navy/65 text-base leading-relaxed mb-6">
              ${founderStory}
            </p>

            <p class="font-body text-dp-navy/65 text-base leading-relaxed mb-8">
              ${founderBio}
            </p>

            <!-- Mission pillars -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="bg-dp-cream-dark/60 rounded-xl p-4 text-center">
                <div class="w-8 h-8 rounded-lg bg-dp-coral/15 flex items-center justify-center mx-auto mb-2">
                  <svg class="w-4 h-4 text-dp-coral" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <p class="font-display font-bold text-dp-navy text-sm">Preserve Memories</p>
                <p class="font-body text-dp-navy/45 text-xs mt-1 leading-relaxed">Art that outlives the fridge</p>
              </div>
              <div class="bg-dp-cream-dark/60 rounded-xl p-4 text-center">
                <div class="w-8 h-8 rounded-lg bg-dp-sage/15 flex items-center justify-center mx-auto mb-2">
                  <svg class="w-4 h-4 text-dp-sage" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <p class="font-display font-bold text-dp-navy text-sm">SA-Made Quality</p>
                <p class="font-body text-dp-navy/45 text-xs mt-1 leading-relaxed">Premium print, locally proud</p>
              </div>
              <div class="bg-dp-cream-dark/60 rounded-xl p-4 text-center">
                <div class="w-8 h-8 rounded-lg bg-dp-yellow/30 flex items-center justify-center mx-auto mb-2">
                  <svg class="w-4 h-4 text-dp-navy" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <p class="font-display font-bold text-dp-navy text-sm">Your Child's Story</p>
                <p class="font-body text-dp-navy/45 text-xs mt-1 leading-relaxed">Every order is one of a kind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
}

export function init() {}
