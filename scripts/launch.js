#!/usr/bin/env node
/**
 * scripts/launch.js — Production launch gate.
 * Run with: npm run launch
 *
 * 1. Scans manifest.js for null values — advisory warning per field.
 * 2. Scans flags.js for any true switches — warns if still in simulation.
 * 3. Toggles public/robots.txt: Disallow:/ → Allow:/ + Sitemap directive.
 * 4. Generates public/sitemap.xml.
 * Exit always 0 — warnings are advisory only.
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SITE_URL = process.env.SITE_URL || 'https://dreamprintsa.co.za'

let warnings = 0

function warn(msg) {
  console.warn(`  ⚠  ${msg}`)
  warnings++
}

function ok(msg) {
  console.log(`  ✓  ${msg}`)
}

// ── 1. Manifest null scan ────────────────────────────────────────────────────
console.log('\n📋  Manifest validation')

const manifestSrc = readFileSync(resolve(ROOT, 'src/core/manifest.js'), 'utf8')

const nullFields = [
  ['BRAND.whatsapp',                    'WhatsApp Business number'],
  ['BRAND.whatsappDisplay',             'WhatsApp display number'],
  ['BRAND.email',                       'Business email address'],
  ['BRAND.phone',                       'Business phone number'],
  ['BRAND.social.instagram',            'Instagram handle'],
  ['BRAND.social.facebook',             'Facebook page slug'],
  ['BRAND.social.tiktok',              'TikTok handle'],
  ['BRAND.founder.name',               'Founder full name'],
  ['BRAND.founder.bio',                'Founder bio'],
  ['BRAND.founder.story',              'Founder story'],
  ['BRAND.compliance.registrationNumber', 'CIPC registration number'],
  ['BRAND.compliance.vatNumber',       'VAT number'],
  ['BRAND.compliance.popiaContact',    'POPIA information officer contact'],
  ['BRAND.integrations.uploadcareKey', 'Uploadcare public key'],
  ['BRAND.integrations.formEndpoint',  'Formspree / Supabase form endpoint'],
  ['BRAND.integrations.payfastMerchantId', 'PayFast merchant ID'],
  ['BRAND.integrations.supabaseUrl',   'Supabase project URL'],
  ['BRAND.integrations.supabaseAnonKey', 'Supabase anon key'],
]

// Detect products with empty images arrays
const emptyImages = (manifestSrc.match(/images:\s*\[\]/g) || []).length
if (emptyImages > 0) warn(`${emptyImages} product(s) have empty images arrays — add photos to public/assets/products/`)
else ok('All product image arrays populated')

// Check each field by looking for its key followed by null
for (const [field, label] of nullFields) {
  const key = field.split('.').pop()
  const nullPattern = new RegExp(`${key}:\\s*null`)
  if (nullPattern.test(manifestSrc)) {
    warn(`${field} is null — ${label} not yet confirmed`)
  } else {
    ok(`${field} is set`)
  }
}

// ── 2. Flags simulation scan ─────────────────────────────────────────────────
console.log('\n🚦  Flags validation')

const flagsSrc = readFileSync(resolve(ROOT, 'src/core/flags.js'), 'utf8')
const simFlags = [
  ['uploadSimulated',  'Uploadcare upload'],
  ['ordersSimulated',  'Order submission'],
  ['paymentSimulated', 'PayFast payment'],
  ['emailSimulated',   'MailerLite email'],
  ['adminSimulated',   'Admin authentication'],
]

for (const [flag, label] of simFlags) {
  if (new RegExp(`${flag}:\\s*true`).test(flagsSrc)) {
    warn(`FLAGS.${flag} is still true — ${label} is in simulation mode`)
  } else {
    ok(`FLAGS.${flag} is live`)
  }
}

// ── 3. robots.txt toggle ─────────────────────────────────────────────────────
console.log('\n🤖  robots.txt')

const robotsPath = resolve(ROOT, 'public/robots.txt')
let robotsSrc
try {
  robotsSrc = readFileSync(robotsPath, 'utf8')
} catch {
  robotsSrc = 'User-agent: *\nDisallow: /\n'
}

if (robotsSrc.includes('Disallow: /')) {
  const updated = `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`
  writeFileSync(robotsPath, updated)
  ok('robots.txt updated — Disallow:/ → Allow:/ + Sitemap')
} else {
  ok('robots.txt already set to Allow:/')
}

// ── 4. sitemap.xml generation ─────────────────────────────────────────────────
console.log('\n🗺   sitemap.xml')

const today = new Date().toISOString().split('T')[0]
const urls = [
  { loc: SITE_URL,                     priority: '1.0', changefreq: 'weekly' },
  { loc: `${SITE_URL}/#shop`,          priority: '0.9', changefreq: 'weekly' },
  { loc: `${SITE_URL}/#upload`,        priority: '0.9', changefreq: 'monthly' },
  { loc: `${SITE_URL}/#how-it-works`,  priority: '0.7', changefreq: 'monthly' },
  { loc: `${SITE_URL}/#gallery`,       priority: '0.7', changefreq: 'weekly' },
  { loc: `${SITE_URL}/#about`,         priority: '0.6', changefreq: 'monthly' },
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`

writeFileSync(resolve(ROOT, 'public/sitemap.xml'), sitemap)
ok(`sitemap.xml generated — ${urls.length} URLs at ${SITE_URL}`)

// ── Summary ──────────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(50)}`)
if (warnings === 0) {
  console.log('✅  Launch gate passed — zero warnings. Ready for vercel --prod.')
} else {
  console.log(`⚠   Launch gate complete — ${warnings} warning(s). Resolve before vercel --prod.`)
}
console.log(`${'─'.repeat(50)}\n`)

process.exit(0)
