import { BRAND } from '@/core/manifest.js'
import { open as openDetail } from '@/modules/ProductDetail.js'

const FILTER_TABS = [
  { label: 'All',       value: 'all'      },
  { label: 'PJ Sets',   value: 'pj-set'   },
  { label: 'T-Shirts',  value: 'tee'      },
  { label: 'Mugs',      value: 'mug'      },
  { label: 'Tote Bags', value: 'tote-bag' },
]

const TAB_BASE     = 'px-4 py-2 rounded-full text-sm font-body font-medium transition-colors duration-150'
const TAB_ACTIVE   = `${TAB_BASE} bg-dp-coral text-white shadow-sm`
const TAB_INACTIVE = `${TAB_BASE} bg-white text-dp-navy/60 border border-dp-cream-dark hover:border-dp-coral/30 hover:text-dp-coral`

function productIcon(productId) {
  const base = 'w-full h-full'
  switch (productId) {
    case 'pj-set':
      return `
        <svg viewBox="0 0 64 64" class="${base}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 20 L2 12 L2 28 L18 24 L18 56 L46 56 L46 24 L62 28 L62 12 L50 20 Q42 26 32 26 Q22 26 14 20 Z"/>
          <path d="M35 38 C33 31 37 27 42 27 C38 28 36 31 36 34 C36 38 39 41 42 42 C38 42 35 40 35 38 Z" fill="currentColor" opacity="0.35"/>
          <circle cx="26" cy="37" r="1.5" fill="currentColor" stroke="none" opacity="0.4"/>
          <circle cx="23" cy="44" r="1"   fill="currentColor" stroke="none" opacity="0.4"/>
          <circle cx="31" cy="46" r="1"   fill="currentColor" stroke="none" opacity="0.4"/>
        </svg>`
    case 'tee':
      return `
        <svg viewBox="0 0 64 64" class="${base}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M14 20 L2 12 L2 28 L18 24 L18 56 L46 56 L46 24 L62 28 L62 12 L50 20 Q42 26 32 26 Q22 26 14 20 Z"/>
        </svg>`
    case 'mug':
      return `
        <svg viewBox="0 0 64 64" class="${base}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M10 24 L14 54 L50 54 L54 24 Z"/>
          <path d="M54 32 C60 32 62 37 62 40 C62 43 60 48 54 48"/>
          <path d="M21 18 Q21 14 25 15"/>
          <path d="M30 18 Q30 13 34 15"/>
          <path d="M39 18 Q39 14 43 15"/>
        </svg>`
    default:
      return `
        <svg viewBox="0 0 64 64" class="${base}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="10" y="26" width="44" height="32" rx="3"/>
          <path d="M22 26 C22 18 26 14 32 14 C38 14 42 18 42 26"/>
        </svg>`
  }
}

export function render() {
  return `
    <!-- ProductShowcase -->
    <section id="shop" class="bg-dp-cream py-16 px-4 md:px-8">
      <div class="max-w-7xl mx-auto">

        <!-- Section header -->
        <div class="text-center mb-10">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dp-coral/10 border border-dp-coral/20 mb-4">
            <span class="w-1.5 h-1.5 rounded-full bg-dp-coral flex-shrink-0"></span>
            <span class="text-dp-coral text-xs font-body font-semibold uppercase tracking-wide">Their Art. On Everything.</span>
          </div>
          <h2 class="font-display font-extrabold text-dp-navy text-3xl sm:text-4xl mb-3">
            Choose Your Product
          </h2>
          <p class="font-body text-dp-navy/60 text-base max-w-lg mx-auto leading-relaxed">
            Upload once. Print on any product. Free delivery on orders over R${BRAND.fulfillment.freeDeliveryOver}.
          </p>
        </div>

        <!-- Category filter -->
        <div class="flex items-center justify-center gap-2 flex-wrap mb-8" role="tablist" aria-label="Filter products by type">
          ${FILTER_TABS.map((tab, i) => `
            <button
              data-filter="${tab.value}"
              role="tab"
              aria-selected="${i === 0 ? 'true' : 'false'}"
              class="${i === 0 ? TAB_ACTIVE : TAB_INACTIVE}">
              ${tab.label}
            </button>`).join('')}
        </div>

        <!-- Product grid -->
        <div id="product-grid" class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto mb-16">
          ${BRAND.products.map(product => `
            <article
              data-product-card
              data-filter-key="${product.id}"
              class="card flex flex-col">

              <!-- Image or placeholder -->
              <div class="bg-dp-cream-dark aspect-square rounded-t-2xl relative overflow-hidden group flex items-center justify-center">
                ${product.images.length ? `
                  <img
                    src="${product.images[0]}"
                    alt="${product.name}"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"/>
                ` : `
                  <div class="w-20 h-20 text-dp-navy/20 group-hover:text-dp-navy/30 transition-colors duration-200 p-1">
                    ${productIcon(product.id)}
                  </div>
                `}
                ${product.featured ? `
                  <span class="absolute top-2.5 right-2.5 bg-dp-yellow text-dp-navy text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm" aria-label="Popular product">
                    Popular
                  </span>
                ` : ''}
              </div>

              <!-- Card body -->
              <div class="p-4 flex flex-col flex-1 gap-2">
                <h3 class="font-display font-bold text-dp-navy text-sm leading-snug">
                  ${product.name}
                </h3>
                <p class="font-body text-dp-coral font-semibold text-sm">
                  From R${product.priceMin}
                </p>
                <p class="font-body text-dp-navy/55 text-xs leading-relaxed flex-1">
                  ${product.tagline}
                </p>
                <div class="flex flex-col gap-2 mt-2">
                  <button
                    data-id="${product.id}"
                    class="bg-dp-coral hover:bg-dp-coral-dark text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 w-full text-center block text-sm">
                    Order This
                  </button>
                  <button
                    data-details="${product.id}"
                    class="text-dp-coral/70 hover:text-dp-coral text-xs font-body font-medium py-1 transition-colors duration-150 w-full text-center">
                    View Details →
                  </button>
                </div>
              </div>
            </article>`).join('')}
        </div>

        <!-- Gift Bundles -->
        <div class="border-t border-dp-cream-dark pt-12">
          <div class="text-center mb-8">
            <h3 class="font-display font-bold text-dp-navy text-2xl sm:text-3xl mb-2">
              Gift Bundles
            </h3>
            <p class="font-body text-dp-navy/55 text-sm max-w-md mx-auto leading-relaxed">
              Curated sets for families, grandparents, and gifting occasions.
            </p>
          </div>
          <div class="flex flex-col gap-4 max-w-4xl mx-auto">
            ${BRAND.bundles.map(bundle => `
              <div class="bg-white border border-dp-cream-dark rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div class="flex-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-3 mb-3">
                    <h4 class="font-display font-bold text-dp-navy text-lg">${bundle.name}</h4>
                    ${bundle.saving ? `
                      <span class="inline-flex items-center bg-dp-sage/15 text-dp-sage text-xs font-bold px-2.5 py-0.5 rounded-full">
                        Save R${bundle.saving}
                      </span>` : ''}
                  </div>
                  <ul class="flex flex-wrap gap-2" aria-label="Bundle includes">
                    ${bundle.includes.map(item => `
                      <li class="inline-flex items-center gap-1.5 text-xs font-body text-dp-navy/55 bg-dp-cream px-2.5 py-1 rounded-full border border-dp-cream-dark">
                        <span class="w-1 h-1 rounded-full bg-dp-coral/60 flex-shrink-0" aria-hidden="true"></span>
                        ${item}
                      </li>`).join('')}
                  </ul>
                </div>
                <div class="flex flex-row md:flex-col lg:flex-row items-center gap-4 flex-shrink-0">
                  <p class="font-display font-bold text-dp-navy text-2xl">R${bundle.price}</p>
                  <button
                    data-id="${bundle.id}"
                    class="bg-dp-coral hover:bg-dp-coral-dark text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 text-sm whitespace-nowrap">
                    Order Bundle
                  </button>
                </div>
              </div>`).join('')}
          </div>
        </div>

      </div>
    </section>
  `
}

export function init() {
  const filterBtns   = document.querySelectorAll('#shop [data-filter]')
  const productCards = document.querySelectorAll('#product-grid [data-product-card]')

  // ── Category filter ──────────────────────────────────────────────────────────
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter')

      filterBtns.forEach(b => {
        const active = b === btn
        b.className = active ? TAB_ACTIVE : TAB_INACTIVE
        b.setAttribute('aria-selected', active ? 'true' : 'false')
      })

      productCards.forEach(card => {
        const key = card.getAttribute('data-filter-key')
        card.classList.toggle('hidden', filter !== 'all' && key !== filter)
      })
    })
  })

  // ── Order This + Order Bundle buttons ────────────────────────────────────────
  document.querySelectorAll('#shop [data-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      window.dp_selected_product = btn.getAttribute('data-id')
      const target = document.getElementById('upload')
      if (!target) return
      const navH = document.getElementById('navbar')?.offsetHeight || 64
      window.scrollTo({ top: target.offsetTop - navH - 8, behavior: 'smooth' })
    })
  })

  // ── View Details buttons ─────────────────────────────────────────────────────
  document.querySelectorAll('#shop [data-details]').forEach(btn => {
    btn.addEventListener('click', () => {
      openDetail(btn.getAttribute('data-details'))
    })
  })
}
