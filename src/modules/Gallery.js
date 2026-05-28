import { BRAND } from '@/core/manifest.js'

// Placeholder items — used when BRAND.gallery is absent or empty
const PLACEHOLDER_ITEMS = [
  { label: "Emma's Elephant",   product: 'Custom Mug',     pattern: 0 },
  { label: "Liam's Spaceship",  product: 'Custom PJ Set',  pattern: 1 },
  { label: "Amara's Rainbow",   product: 'Custom T-Shirt', pattern: 2 },
  { label: "Kai's Dog",         product: 'Tote Bag',       pattern: 3 },
  { label: "Sofia's Flowers",   product: 'Custom Mug',     pattern: 0 },
  { label: "Leo's Dinosaur",    product: 'Custom PJ Set',  pattern: 1 },
  { label: "Zara's Butterfly",  product: 'Custom T-Shirt', pattern: 2 },
  { label: "Noah's Rocket",     product: 'Tote Bag',       pattern: 3 },
]

// 4 rotating sketch SVG patterns (child-art inspired)
const SKETCH_PATTERNS = [
  // Elephant / organic shapes
  `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
    <ellipse cx="40" cy="48" rx="22" ry="16"/>
    <circle  cx="40" cy="28" r="12"/>
    <path    d="M30 40 Q24 52 22 62"/>
    <path    d="M50 40 Q56 52 58 62"/>
    <path    d="M32 22 Q30 14 28 12"/>
    <circle  cx="36" cy="26" r="2" fill="currentColor" stroke="none" opacity="0.5"/>
  </svg>`,
  // Spaceship / geometric
  `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
    <path d="M40 12 L54 52 L40 46 L26 52 Z"/>
    <ellipse cx="40" cy="52" rx="14" ry="6"/>
    <circle  cx="40" cy="34" r="6"/>
    <path    d="M26 56 Q20 62 18 68"/>
    <path    d="M54 56 Q60 62 62 68"/>
    <circle  cx="26" cy="28" r="2" fill="currentColor" stroke="none" opacity="0.4"/>
    <circle  cx="54" cy="28" r="2" fill="currentColor" stroke="none" opacity="0.4"/>
  </svg>`,
  // Rainbow / arcs
  `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
    <path d="M10 60 Q40 14 70 60"/>
    <path d="M18 60 Q40 22 62 60"/>
    <path d="M26 60 Q40 30 54 60"/>
    <circle cx="16" cy="62" r="5"/>
    <circle cx="64" cy="62" r="5"/>
    <path   d="M30 68 Q40 64 50 68"/>
  </svg>`,
  // Dog / figure
  `<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
    <ellipse cx="40" cy="46" rx="20" ry="14"/>
    <circle  cx="40" cy="28" r="10"/>
    <path    d="M30 20 Q26 12 22 14"/>
    <path    d="M50 20 Q54 12 58 14"/>
    <path    d="M26 52 L20 68"/>
    <path    d="M54 52 L60 68"/>
    <path    d="M36 50 L44 50"/>
    <circle  cx="36" cy="26" r="1.5" fill="currentColor" stroke="none" opacity="0.6"/>
    <circle  cx="44" cy="26" r="1.5" fill="currentColor" stroke="none" opacity="0.6"/>
  </svg>`,
]

// Product-on-surface silhouettes (one per product type, cycling)
const PRODUCT_ICONS = [
  // Mug
  `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
    <path d="M12 22 L15 50 L49 50 L52 22 Z"/>
    <path d="M52 30 C57 30 59 34 59 38 C59 42 57 46 52 46"/>
    <path d="M22 16 Q22 12 26 13"/><path d="M30 16 Q30 11 34 13"/>
  </svg>`,
  // PJ set
  `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
    <path d="M14 20 L2 12 L2 28 L18 24 L18 56 L46 56 L46 24 L62 28 L62 12 L50 20 Q42 26 32 26 Q22 26 14 20 Z"/>
  </svg>`,
  // T-shirt
  `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
    <path d="M14 20 L2 12 L2 28 L18 24 L18 56 L46 56 L46 24 L62 28 L62 12 L50 20 Q42 26 32 26 Q22 26 14 20 Z"/>
    <path d="M26 38 Q32 34 38 38 Q32 44 26 38 Z" fill="currentColor" opacity="0.2" stroke="none"/>
  </svg>`,
  // Tote
  `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
    <rect x="10" y="26" width="44" height="32" rx="3"/>
    <path d="M22 26 C22 18 26 14 32 14 C38 14 42 18 42 26"/>
  </svg>`,
]

function galleryCard(item) {
  const sketch  = SKETCH_PATTERNS[item.pattern]
  const product = PRODUCT_ICONS[item.pattern]

  return `
    <div class="bg-white border border-dp-cream-dark rounded-2xl p-4 shadow-sm aspect-square flex flex-col justify-between relative group overflow-hidden">

      <!-- Hover shimmer -->
      <div class="absolute inset-0 bg-dp-coral/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden="true"></div>

      <!-- Before / After split frame -->
      <div class="flex-1 grid grid-cols-2 gap-2 rounded-xl overflow-hidden mb-3">

        <!-- Before: original sketch -->
        <div class="bg-dp-cream-dark/60 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div class="w-14 h-14 text-dp-navy/25">
            ${sketch}
          </div>
          <span class="absolute bottom-1.5 left-1.5 text-[8px] font-body text-dp-navy/30 uppercase tracking-wide leading-none">Before</span>
        </div>

        <!-- After: on product -->
        <div class="bg-dp-coral/8 rounded-lg flex items-center justify-center relative overflow-hidden">
          <div class="w-10 h-10 text-dp-coral/40">
            ${product}
          </div>
          <span class="absolute bottom-1.5 right-1.5 text-[8px] font-body text-dp-coral/50 uppercase tracking-wide leading-none">After</span>
        </div>
      </div>

      <!-- Card label -->
      <div class="text-center">
        <p class="font-display font-bold text-dp-navy text-xs leading-snug">${item.label}</p>
        <p class="font-body text-dp-navy/40 text-[10px] mt-0.5">${item.product}</p>
      </div>
    </div>`
}

export function render() {
  const items = BRAND.gallery?.length ? BRAND.gallery : PLACEHOLDER_ITEMS

  return `
    <!-- Gallery -->
    <section id="gallery" class="bg-dp-cream-dark py-16 px-4 md:px-8">
      <div class="max-w-7xl mx-auto">

        <!-- Section header -->
        <div class="text-center mb-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dp-coral/10 border border-dp-coral/20 mb-4">
            <span class="w-1.5 h-1.5 rounded-full bg-dp-coral flex-shrink-0"></span>
            <span class="text-dp-coral text-xs font-body font-semibold uppercase tracking-wide">Real Artwork · Real Products</span>
          </div>
          <h2 class="font-display font-bold text-dp-navy text-3xl sm:text-4xl mb-3">
            Art Gallery Showcase
          </h2>
          <p class="font-body text-dp-navy/60 text-base max-w-md mx-auto leading-relaxed">
            Every piece is unique. Every product tells a story. Here's what our customers create.
          </p>
        </div>

        <!-- Gallery grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto mt-12">
          ${items.map(item => galleryCard(item)).join('')}
        </div>

        <!-- Photography note -->
        <p class="text-center font-body text-dp-navy/30 text-xs mt-8">
          Gallery showcases the DreamPrint transformation process. Customer photography coming soon.
        </p>

      </div>
    </section>
  `
}

export function init() {}
