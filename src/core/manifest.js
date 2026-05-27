/**
 * BRAND — Single source of truth for all brand data.
 * Mirror confirmed values from DREAMPRINT_BUILD_MANIFEST.md into this file.
 * Never hard-code business facts in components — always import from here.
 */
export const BRAND = {
  // ── Identity ──────────────────────────────────────────────────────────────
  name:        'DreamPrint SA',
  legalName:   'DreamPrint SA (Pty) Ltd',
  tagline:     "Turn your child's art into something they'll wear forever.",
  subTagline:  "Custom-printed keepsakes from children's drawings — SA-made, delivered nationwide.",
  domain:      'dreamprintsa.co.za',
  url:         'https://dreamprintsa.co.za',

  // ── Contact ───────────────────────────────────────────────────────────────
  whatsapp:    null,              // TBC — WhatsApp Business number (no + prefix for wa.me)
  whatsappDisplay: null,          // TBC — formatted display number e.g. +27 82 123 4567
  email:       null,              // TBC — hello@dreamprintsa.co.za
  phone:       null,              // TBC

  // ── Social ────────────────────────────────────────────────────────────────
  social: {
    instagram: null,              // TBC — handle without @
    facebook:  null,              // TBC — page slug
    tiktok:    null,              // TBC — handle without @
    pinterest: null,              // TBC
  },

  // ── Founder ───────────────────────────────────────────────────────────────
  founder: {
    name:       null,             // TBC — full legal name
    title:      'Founder & Creative Director',
    bio:        null,             // TBC — approved short bio for About section
    portrait:   '/assets/images/founder-portrait.jpg',
    storyHeading: 'Why we started DreamPrint SA',
    story:      null,             // TBC — founder story for marketing copy
  },

  // ── Products — Launch Set ─────────────────────────────────────────────────
  products: [
    {
      id:         'pj-set',
      name:       'Custom PJ Set',
      tagline:    "Wear their masterpiece to bed",
      description: "Full-sublimation pyjama set featuring your child's original artwork, digitally cleaned and beautifully placed. Kids and adult sizes available.",
      priceMin:   799,
      priceMax:   1299,
      sizes:      ['Kids 4', 'Kids 6', 'Kids 8', 'Kids 10', 'Kids 12', 'Adult S', 'Adult M', 'Adult L'],
      turnaround: '10–12 days',
      category:   'apparel',
      featured:   true,
      images:     [],             // TBC — place files in public/assets/products/pj-set/
    },
    {
      id:         'tee',
      name:       'Custom T-Shirt',
      tagline:    "Their art, your favourite tee",
      description: "Premium cotton tee with full-colour artwork print. Light, breathable, and machine washable. Sizes from toddler to adult.",
      priceMin:   450,
      priceMax:   650,
      sizes:      ['Kids 4', 'Kids 6', 'Kids 8', 'Kids 10', 'Kids 12', 'Adult S', 'Adult M', 'Adult L'],
      turnaround: '10–12 days',
      category:   'apparel',
      featured:   true,
      images:     [],             // TBC — place files in public/assets/products/tee/
    },
    {
      id:         'mug',
      name:       'Custom Mug',
      tagline:    "Every morning with their art",
      description: "High-quality ceramic mug with full-wrap sublimation print. Dishwasher safe. Available in two sizes.",
      priceMin:   349,
      priceMax:   449,
      sizes:      ['Standard (330ml)', 'Large (450ml)'],
      turnaround: '10–12 days',
      category:   'homeware',
      featured:   true,
      images:     [],             // TBC — place files in public/assets/products/mug/
    },
    {
      id:         'tote-bag',
      name:       'Custom Tote Bag',
      tagline:    "Carry their creativity everywhere",
      description: "Sturdy canvas tote with full-colour artwork print. Generous size for shopping, school, or the beach.",
      priceMin:   299,
      priceMax:   399,
      sizes:      ['One Size'],
      turnaround: '10–12 days',
      category:   'accessories',
      featured:   false,
      images:     [],             // TBC — place files in public/assets/products/tote-bag/
    },
  ],

  // ── Bundles ───────────────────────────────────────────────────────────────
  bundles: [
    {
      id:       'grandparent-gift-box',
      name:     'Grandparent Gift Box',
      price:    999,
      includes: ['Custom Mug', 'Canvas Print', 'Greeting Card', 'Gift Wrapping'],
      saving:   null,
    },
    {
      id:       'sibling-set',
      name:     'Sibling Set',
      price:    1299,
      includes: ['2× Custom T-Shirts', '2× Custom Mugs'],
      saving:   150,
    },
    {
      id:       'family-movie-night',
      name:     'Family Movie Night',
      price:    2499,
      includes: ['4× Custom PJ Sets', '1× Custom Blanket'],
      saving:   300,
    },
  ],

  // ── Fulfillment ───────────────────────────────────────────────────────────
  fulfillment: {
    totalDays:         '10–12 days',
    enhancementDays:   '2–3 days',
    approvalWindow:    '48 hours',
    productionDays:    '3–5 days',
    courierDays:       '3–5 business days',
    freeDeliveryOver:  650,
    blindShipping:     true,
    couriers:          ['Pargo', 'The Courier Guy', 'Dawn Wing'],
  },

  // ── Integrations (stubs — populated when credentials confirmed) ───────────
  integrations: {
    uploadcareKey:       null,   // TBC — Uploadcare public key
    formEndpoint:        null,   // TBC — Formspree URL or Supabase function URL
    payfastMerchantId:   null,   // TBC — PayFast merchant ID
    supabaseUrl:         null,   // TBC — Supabase project URL
    supabaseAnonKey:     null,   // TBC — Supabase anon key (client-safe)
  },

  // ── Compliance ────────────────────────────────────────────────────────────
  compliance: {
    registrationNumber: null,    // TBC — CIPC Pty Ltd number
    vatNumber:          null,    // TBC — optional until R1M revenue
    popiaContact:       null,    // TBC — POPIA information officer contact
    insurancePIL:       null,    // TBC — professional indemnity
    insurancePL:        null,    // TBC — product liability
  },

  // ── Legal copy (draft — will be reviewed before go-live) ─────────────────
  legal: {
    privacyPolicy: `DreamPrint SA (Pty) Ltd ("DreamPrint", "we", "us") is committed to protecting your personal information in accordance with the Protection of Personal Information Act 4 of 2013 (POPIA). We collect only what is necessary to process your order: your name, email address, WhatsApp number, delivery address, and your child's artwork. Your data is never sold or shared with third parties except our fulfilment partners who require it to produce and deliver your order. You have the right to access, correct, or request deletion of your personal information at any time. Contact our Information Officer at [POPIA contact TBC].`,
    termsAndConditions: `These Terms and Conditions govern your use of dreamprintsa.co.za and any orders placed with DreamPrint SA (Pty) Ltd. By placing an order you confirm you have read, understood, and accepted these terms. All prices are in South African Rand (ZAR) inclusive of VAT where applicable. Orders are confirmed once payment is received. We reserve the right to decline orders that contain inappropriate content. Artwork submitted must be owned by the customer or the child; DreamPrint accepts no liability for copyright infringement by the customer.`,
    refundPolicy: `We want you to love your DreamPrint product. If your order arrives damaged or is materially different from the approved mockup, we will reprint or refund at no cost to you — please contact us within 7 days of delivery with a photo of the issue. Because each product is custom-made to your artwork and specification, we are unable to accept returns or issue refunds for change-of-mind orders. Size exchanges are available if the garment is unworn and in original condition, subject to availability.`,
    shippingPolicy: `We deliver nationwide across South Africa via courier (Pargo, The Courier Guy, or Dawn Wing depending on your area). Standard delivery is R80–R150. Free delivery on orders over R650. Estimated delivery is 10–12 business days from order confirmation (including 2–3 days enhancement, 48-hour approval window, and 3–5 days production + courier). Tracking details are sent via WhatsApp and email once your parcel is collected by the courier. We ship blind — no supplier branding appears on your parcel.`,
  },

  // ── Demo / Simulation Data ────────────────────────────────────────────────
  demo: {
    artworkUrl:  'https://images.unsplash.com/photo-1581547848200-85cb245b3462?w=600',
    enhancedUrl: 'https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?w=600',
    testimonials: [
      {
        quote:     "I cried happy tears when the package arrived. My daughter's drawing of our dog, printed on a mug — it's the most special thing we own.",
        name:      'Priya M.',
        childAge:  '6 years old',
        product:   'Custom Mug',
        stars:     5,
        location:  'Cape Town',
      },
      {
        quote:     "The quality is incredible. We ordered PJ sets for both kids and they wore them every night for two weeks straight. Worth every rand.",
        name:      'Lizette van der M.',
        childAge:  '4 & 8 years old',
        product:   'Custom PJ Set',
        stars:     5,
        location:  'Pretoria',
      },
      {
        quote:     "Ordered for my mom as a birthday gift — a mug with my son's drawing of her garden. She keeps it on her desk and shows everyone.",
        name:      'Sipho K.',
        childAge:  '7 years old',
        product:   'Custom Mug',
        stars:     5,
        location:  'Johannesburg',
      },
    ],
    orders: [
      {
        id:          'DP-000001',
        childName:   'Emma',
        product:     'Custom PJ Set',
        size:        'Kids 6',
        status:      'RECEIVED',
        customerName: 'Sarah Johnson',
        email:       'sarah.j@example.com',
        whatsapp:    '0821234567',
        artworkUrl:  'https://images.unsplash.com/photo-1581547848200-85cb245b3462?w=300',
        createdAt:   new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        total:       929,
      },
      {
        id:          'DP-000002',
        childName:   'Liam',
        product:     'Custom T-Shirt',
        size:        'Kids 8',
        status:      'ENHANCING',
        customerName: 'James Mokoena',
        email:       'james.m@example.com',
        whatsapp:    '0839876543',
        artworkUrl:  'https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?w=300',
        createdAt:   new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        total:       530,
      },
      {
        id:          'DP-000003',
        childName:   'Aisha',
        product:     'Custom Mug',
        size:        'Large (450ml)',
        status:      'DELIVERED',
        customerName: 'Fatima Dlamini',
        email:       'fatima.d@example.com',
        whatsapp:    '0711112222',
        artworkUrl:  'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=300',
        createdAt:   new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        total:       449,
      },
    ],
  },

  // ── FAQ ───────────────────────────────────────────────────────────────────
  faq: [
    {
      q: 'What kind of artwork can I upload?',
      a: "Any drawing or painting made by your child — crayon, pencil, watercolour, felt-tip, even finger paint. A clear phone photo is all we need. The artwork doesn't have to be perfect; that's the beauty of it.",
    },
    {
      q: 'How long does the whole process take?',
      a: "10–12 business days from the moment you place your order. That's 2–3 days for our team to digitally enhance the artwork, a 48-hour window for you to approve the mockup, then 3–5 days production and 3–5 days for the courier to reach you.",
    },
    {
      q: "What if I don't like the enhanced mockup?",
      a: "No problem — you have a 48-hour revision window. Just tell us what you'd like adjusted (colours, placement, cleanup level) and we'll update it. We don't go to print until you're happy.",
    },
    {
      q: 'Can I get a refund if I change my mind?',
      a: "Because every product is custom-made to your artwork, we can't accept change-of-mind returns. However, if your product arrives damaged or materially different from the approved mockup, we will reprint or refund — no questions asked.",
    },
    {
      q: 'Do you deliver to my area?',
      a: "Yes — we deliver nationwide across South Africa via courier. Standard delivery is R80–R150. Free delivery on orders over R650. We use Pargo, The Courier Guy, and Dawn Wing depending on your area.",
    },
    {
      q: "Is my child's artwork safe with you?",
      a: "Absolutely. We use your artwork only to produce your order. We never share, publish, or use it for any other purpose without your written consent. We're fully POPIA compliant.",
    },
    {
      q: 'What sizes are available for PJ sets and T-shirts?',
      a: "Kids 4, Kids 6, Kids 8, Kids 10, Kids 12, Adult S, Adult M, and Adult L. Size guides with chest and length measurements are shown on each product page. When in doubt, size up.",
    },
    {
      q: 'Can I order for an adult, not a child?',
      a: "Of course! We print on adult sizes for all apparel products. Many customers order for grandparents, partners, or themselves. Anyone's artwork is welcome.",
    },
  ],
}
