import { FLAGS } from '@/core/flags.js'
import { BRAND } from '@/core/manifest.js'

const SIM_CDN_URL = 'https://ucarecdn.com/sim-demo-artwork-uuid/sim-artwork.jpg'

/**
 * uploadArtwork(file) — Upload customer artwork file.
 * Simulation: resolves with a fake CDN URL after a short delay.
 * Live: uploads to Uploadcare using the public API key.
 * @param {File} file
 * @returns {Promise<{ cdnUrl: string, uuid: string }>}
 */
export async function uploadArtwork(file) {
  if (FLAGS.uploadSimulated) {
    console.log('[SIM] upload.js — uploadArtwork called', { fileName: file?.name, fileSize: file?.size })
    await new Promise(r => setTimeout(r, 1200))
    console.log('[SIM] upload.js — resolved with mock CDN URL:', SIM_CDN_URL)
    return { cdnUrl: SIM_CDN_URL, uuid: 'sim-demo-artwork-uuid' }
  }

  const formData = new FormData()
  formData.append('UPLOADCARE_PUB_KEY', BRAND.integrations.uploadcareKey)
  formData.append('UPLOADCARE_STORE', '1')
  formData.append('file', file)

  const res = await fetch('https://upload.uploadcare.com/base/', { method: 'POST', body: formData })
  if (!res.ok) throw new Error(`Uploadcare error: ${res.status}`)
  const data = await res.json()
  return { cdnUrl: `https://ucarecdn.com/${data.file}/`, uuid: data.file }
}
