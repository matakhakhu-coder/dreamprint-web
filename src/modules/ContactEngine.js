import { BRAND } from '@/core/manifest.js'
import { FLAGS } from '@/core/flags.js'

// ── WhatsApp href — null-safe ─────────────────────────────────────────────────
const waHref = BRAND.whatsapp
  ? `https://wa.me/${BRAND.whatsapp.replace(/\D/g, '')}`
  : '#'

const waSimAttr = BRAND.whatsapp ? '' : ' data-sim-whatsapp="true"'

// ── Email display — null-safe ─────────────────────────────────────────────────
const emailDisplay = BRAND.email || 'hello@dreamprintsa.co.za'

export function render() {
  return `
    <!-- Contact & WhatsApp Engine -->
    <section id="contact" class="bg-dp-cream-dark py-16 px-4 md:px-8">
      <div class="max-w-7xl mx-auto">

        <!-- Section header -->
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dp-sage/10 border border-dp-sage/20 mb-4">
            <span class="w-1.5 h-1.5 rounded-full bg-dp-sage flex-shrink-0"></span>
            <span class="text-dp-sage text-xs font-body font-semibold uppercase tracking-wide">Get In Touch</span>
          </div>
          <h2 class="font-display font-bold text-dp-navy text-3xl md:text-4xl mb-3">
            Have Questions? Let's Chat!
          </h2>
          <p class="font-body text-dp-navy/60 text-base max-w-md mx-auto leading-relaxed">
            Our team responds within 2 hours during business hours — we're here to help every step of the way.
          </p>
        </div>

        <!-- Two-column grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          <!-- ── LEFT: Support & messaging details ───────────────────────── -->
          <div class="space-y-6">

            <!-- Response promise strip -->
            <div class="flex flex-col sm:flex-row gap-4">
              <div class="flex items-center gap-3 flex-1 bg-white border border-dp-cream rounded-xl px-4 py-3 shadow-sm">
                <div class="w-8 h-8 rounded-lg bg-dp-yellow/30 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-dp-navy" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="font-display font-bold text-dp-navy text-sm">Fast Response</p>
                  <p class="font-body text-dp-navy/45 text-xs">Within 2 hours</p>
                </div>
              </div>
              <div class="flex items-center gap-3 flex-1 bg-white border border-dp-cream rounded-xl px-4 py-3 shadow-sm">
                <div class="w-8 h-8 rounded-lg bg-dp-sage/15 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-dp-sage" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                </div>
                <div>
                  <p class="font-display font-bold text-dp-navy text-sm">Mon – Sat</p>
                  <p class="font-body text-dp-navy/45 text-xs">08:00 – 18:00 SAST</p>
                </div>
              </div>
            </div>

            <!-- WhatsApp action card -->
            <div class="bg-white border border-dp-cream rounded-2xl p-6 shadow-sm flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-dp-sage/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <!-- WhatsApp icon -->
                <svg class="w-6 h-6 text-dp-sage" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-display font-bold text-dp-navy text-base mb-1">Chat via WhatsApp</h3>
                <p class="font-body text-dp-navy/60 text-sm leading-relaxed mb-4">
                  The fastest way to reach us. Send photos, ask questions, or check your order status instantly.
                </p>
                <a id="dp-wa-link"
                   href="${waHref}"
                   ${waSimAttr}
                   target="_blank"
                   rel="noopener noreferrer"
                   class="inline-flex items-center gap-2 bg-dp-sage hover:bg-dp-sage-light text-white min-h-[48px] px-6 rounded-xl font-body font-medium text-sm transition-colors duration-150">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat via WhatsApp
                </a>
              </div>
            </div>

            <!-- Email fallback row -->
            <div class="bg-white border border-dp-cream rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-dp-coral/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-dp-coral" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <p class="font-display font-bold text-dp-navy text-sm">Email Us</p>
                <a href="mailto:${emailDisplay}"
                   class="font-body text-dp-coral hover:text-dp-coral-dark text-sm transition-colors duration-150 underline underline-offset-2">
                  ${emailDisplay}
                </a>
                <p class="font-body text-dp-navy/40 text-xs mt-0.5">We reply within 24 hours</p>
              </div>
            </div>

          </div>

          <!-- ── RIGHT: Contact intake card ──────────────────────────────── -->
          <div class="bg-white border border-dp-cream rounded-2xl p-6 md:p-8 shadow-sm">

            <h3 class="font-display font-bold text-dp-navy text-xl mb-1">Send Us a Message</h3>
            <p class="font-body text-dp-navy/50 text-sm mb-6">Fill in the form and we'll get back to you promptly.</p>

            <!-- Contact form -->
            <form id="dp-contact-form" novalidate class="space-y-4">

              <!-- Name + Email row -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label for="dp-contact-name" class="block font-body text-xs font-medium text-dp-navy/60 mb-1.5 uppercase tracking-wide">
                    Your Name <span class="text-dp-coral" aria-hidden="true">*</span>
                  </label>
                  <input id="dp-contact-name"
                         type="text"
                         required
                         autocomplete="name"
                         placeholder="Jane Smith"
                         class="w-full border border-dp-cream-dark rounded-xl p-3 font-body text-sm text-dp-navy placeholder:text-dp-navy/30 focus:border-dp-coral focus:ring-1 focus:ring-dp-coral outline-none transition-colors duration-150">
                </div>
                <div>
                  <label for="dp-contact-email" class="block font-body text-xs font-medium text-dp-navy/60 mb-1.5 uppercase tracking-wide">
                    Email Address <span class="text-dp-coral" aria-hidden="true">*</span>
                  </label>
                  <input id="dp-contact-email"
                         type="email"
                         required
                         autocomplete="email"
                         placeholder="jane@example.com"
                         class="w-full border border-dp-cream-dark rounded-xl p-3 font-body text-sm text-dp-navy placeholder:text-dp-navy/30 focus:border-dp-coral focus:ring-1 focus:ring-dp-coral outline-none transition-colors duration-150">
                </div>
              </div>

              <!-- Phone -->
              <div>
                <label for="dp-contact-phone" class="block font-body text-xs font-medium text-dp-navy/60 mb-1.5 uppercase tracking-wide">
                  WhatsApp / Phone <span class="font-normal normal-case text-dp-navy/35">(optional)</span>
                </label>
                <input id="dp-contact-phone"
                       type="tel"
                       autocomplete="tel"
                       placeholder="+27 82 000 0000"
                       class="w-full border border-dp-cream-dark rounded-xl p-3 font-body text-sm text-dp-navy placeholder:text-dp-navy/30 focus:border-dp-coral focus:ring-1 focus:ring-dp-coral outline-none transition-colors duration-150">
              </div>

              <!-- Message -->
              <div>
                <label for="dp-contact-msg" class="block font-body text-xs font-medium text-dp-navy/60 mb-1.5 uppercase tracking-wide">
                  Your Message <span class="text-dp-coral" aria-hidden="true">*</span>
                </label>
                <textarea id="dp-contact-msg"
                          rows="4"
                          required
                          placeholder="Hi! I have a question about sizing for the PJ set…"
                          class="w-full border border-dp-cream-dark rounded-xl p-3 font-body text-sm text-dp-navy placeholder:text-dp-navy/30 focus:border-dp-coral focus:ring-1 focus:ring-dp-coral outline-none transition-colors duration-150 resize-none"></textarea>
              </div>

              <!-- Submit -->
              <button id="dp-contact-submit"
                      type="submit"
                      class="btn-primary w-full justify-center min-h-[48px]">
                Send Message
              </button>

            </form>

            <!-- Success pane (hidden until submission) -->
            <div id="dp-contact-success" class="hidden text-center py-8 space-y-3">
              <div class="w-12 h-12 bg-dp-sage/15 text-dp-sage rounded-full flex items-center justify-center mx-auto text-xl" aria-hidden="true">✓</div>
              <h3 class="font-display font-bold text-dp-navy text-xl">Message Sent!</h3>
              <p class="font-body text-sm text-dp-navy/65 max-w-xs mx-auto leading-relaxed">
                Thank you for reaching out. A DreamPrint team member will contact you shortly.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- Contact toast -->
    <div id="dp-contact-toast"
         class="hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-5 py-3 rounded-xl shadow-card-hover font-body text-sm font-medium transition-all duration-300 pointer-events-none"
         role="status"
         aria-live="polite"></div>
  `
}

export function init() {
  // ── Toast helper ─────────────────────────────────────────────────────────────
  let toastTimer = null

  function showContactToast(message, isSuccess = true) {
    const toast = document.getElementById('dp-contact-toast')
    if (!toast) return

    clearTimeout(toastTimer)

    toast.textContent = message
    toast.className = [
      'fixed bottom-6 left-1/2 -translate-x-1/2 z-40',
      'px-5 py-3 rounded-xl shadow-card-hover',
      'font-body text-sm font-medium text-white',
      'transition-all duration-300 pointer-events-none',
      isSuccess ? 'bg-dp-sage' : 'bg-dp-coral',
    ].join(' ')

    toastTimer = setTimeout(() => {
      toast.className = toast.className + ' hidden'
    }, 4000)
  }

  // ── WhatsApp link intercept (simulation guard) ────────────────────────────
  const waLink = document.getElementById('dp-wa-link')
  if (waLink && waLink.dataset.simWhatsapp === 'true') {
    waLink.addEventListener('click', (e) => {
      e.preventDefault()
      console.log('[SIM] WhatsApp engagement intercepted — Number is null in manifest')
      showContactToast('[SIM] WhatsApp channel simulation active. Live number pending client setup.', true)
    })
  }

  // ── Contact form submission ───────────────────────────────────────────────
  const form       = document.getElementById('dp-contact-form')
  const submitBtn  = document.getElementById('dp-contact-submit')
  const successDiv = document.getElementById('dp-contact-success')

  if (!form || !submitBtn || !successDiv) return

  // Error state helpers
  function setFieldError(el, hasError) {
    if (hasError) {
      el.classList.add('border-dp-coral', 'ring-1', 'ring-dp-coral')
      el.classList.remove('border-dp-cream-dark')
    } else {
      el.classList.remove('border-dp-coral', 'ring-1', 'ring-dp-coral')
      el.classList.add('border-dp-cream-dark')
    }
  }

  // Clear errors on input
  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => setFieldError(el, false))
  })

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const nameEl  = document.getElementById('dp-contact-name')
    const emailEl = document.getElementById('dp-contact-email')
    const phoneEl = document.getElementById('dp-contact-phone')
    const msgEl   = document.getElementById('dp-contact-msg')

    const name    = nameEl.value.trim()
    const email   = emailEl.value.trim()
    const phone   = phoneEl.value.trim()
    const message = msgEl.value.trim()

    // ── Validation ─────────────────────────────────────────────────────────
    let hasError = false

    if (!name) {
      setFieldError(nameEl, true)
      hasError = true
    }

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!email || !emailRe.test(email)) {
      setFieldError(emailEl, true)
      hasError = true
    }

    // Phone is optional — validate format only if provided
    if (phone) {
      const phoneRe = /^[+\d][\d\s\-().]{6,19}$/
      if (!phoneRe.test(phone)) {
        setFieldError(phoneEl, true)
        hasError = true
      }
    }

    if (!message) {
      setFieldError(msgEl, true)
      hasError = true
    }

    if (hasError) {
      showContactToast('Please fill in all required fields correctly.', false)
      return
    }

    // ── Lock UI ────────────────────────────────────────────────────────────
    submitBtn.disabled = true
    submitBtn.textContent = FLAGS.ordersSimulated ? '[SIM] Sending…' : 'Sending…'

    // ── Simulate async submission (1 s) ────────────────────────────────────
    await new Promise(resolve => setTimeout(resolve, 1000))

    const payload = { name, email, phone, message, sentAt: new Date().toISOString() }

    if (FLAGS.ordersSimulated) {
      console.log('[SIM] Contact form submission — payload:', payload)
    }

    // ── Show success state ─────────────────────────────────────────────────
    form.classList.add('hidden')
    successDiv.classList.remove('hidden')
    showContactToast('Message received! We\'ll be in touch soon.', true)

    // Reset for a potential future re-use (form is hidden, state is cleared)
    form.reset()
    submitBtn.disabled = false
    submitBtn.textContent = 'Send Message'
  })
}
