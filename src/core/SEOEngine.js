import { BRAND } from '@/core/manifest.js'

/**
 * SEOEngine.applyMeta(options) — Write all SEO tags into <head>.
 * Call once in main.js init phase.
 * @param {{ page?: string, product?: object }} options
 */
export const SEOEngine = {
  applyMeta({ page = 'home', product = null } = {}) {
    const title = product
      ? `${product.name} — ${BRAND.name}`
      : `${BRAND.name} — Custom Children's Artwork on Premium Products`
    const description = product
      ? `${product.description} ${BRAND.subTagline}`
      : `${BRAND.tagline} ${BRAND.subTagline}`
    const ogImage = product && product.images[0]
      ? `${BRAND.url}/${product.images[0]}`
      : `${BRAND.url}/assets/images/og-image.jpg`
    const canonical = `${BRAND.url}${page === 'home' ? '' : `/${page}`}`

    document.title = title

    this._setMeta('name', 'description', description)
    this._setMeta('name', 'robots', 'index, follow')

    this._setMeta('property', 'og:type',        'website')
    this._setMeta('property', 'og:url',         canonical)
    this._setMeta('property', 'og:title',       title)
    this._setMeta('property', 'og:description', description)
    this._setMeta('property', 'og:image',       ogImage)
    this._setMeta('property', 'og:locale',      'en_ZA')

    this._setMeta('name', 'twitter:card',        'summary_large_image')
    this._setMeta('name', 'twitter:title',       title)
    this._setMeta('name', 'twitter:description', description)
    this._setMeta('name', 'twitter:image',       ogImage)

    this._setCanonical(canonical)
    this._injectJsonLd(this._localBusinessSchema())
    if (product) this._injectJsonLd(this._productSchema(product), `ld-product-${product.id}`)
  },

  _setMeta(attr, key, content) {
    let el = document.querySelector(`meta[${attr}="${key}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, key)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  },

  _setCanonical(href) {
    let el = document.querySelector('link[rel="canonical"]')
    if (!el) {
      el = document.createElement('link')
      el.setAttribute('rel', 'canonical')
      document.head.appendChild(el)
    }
    el.setAttribute('href', href)
  },

  _injectJsonLd(schema, id = 'ld-localbusiness') {
    let el = document.getElementById(id)
    if (!el) {
      el = document.createElement('script')
      el.type = 'application/ld+json'
      el.id   = id
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(schema)
  },

  _localBusinessSchema() {
    return {
      '@context': 'https://schema.org',
      '@type':    'LocalBusiness',
      name:       BRAND.legalName,
      description: BRAND.tagline,
      url:        BRAND.url,
      telephone:  BRAND.phone,
      email:      BRAND.email,
      address: {
        '@type':       'PostalAddress',
        addressCountry: 'ZA',
      },
      sameAs: [
        BRAND.social.instagram ? `https://instagram.com/${BRAND.social.instagram}` : null,
        BRAND.social.facebook  ? `https://facebook.com/${BRAND.social.facebook}` : null,
      ].filter(Boolean),
    }
  },

  _productSchema(product) {
    return {
      '@context':   'https://schema.org',
      '@type':      'Product',
      name:         product.name,
      description:  product.description,
      url:          `${BRAND.url}/shop/${product.id}`,
      offers: {
        '@type':        'AggregateOffer',
        priceCurrency:  'ZAR',
        lowPrice:       product.priceMin,
        highPrice:      product.priceMax,
        availability:   'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: BRAND.legalName },
      },
    }
  },
}
