/** Synthèse et reconnaissance vocales du navigateur, en arabe. */

let cachedVoice: SpeechSynthesisVoice | null = null

function arabicVoice(): SpeechSynthesisVoice | null {
  if (!('speechSynthesis' in window)) return null
  if (cachedVoice) return cachedVoice
  cachedVoice = speechSynthesis.getVoices().find((v) => /^ar([-_]|$)/i.test(v.lang)) ?? null
  return cachedVoice
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  speechSynthesis.addEventListener?.('voiceschanged', () => {
    cachedVoice = null
  })
}

export const canSpeak = () => typeof window !== 'undefined' && 'speechSynthesis' in window
export const hasArabicVoice = () => arabicVoice() !== null

export function speak(text: string, rate = 0.85): Promise<void> {
  return new Promise((resolve) => {
    if (!canSpeak()) return resolve()
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    const voice = arabicVoice()
    u.lang = voice?.lang ?? 'ar-SA'
    if (voice) u.voice = voice
    u.rate = rate
    u.onend = () => resolve()
    u.onerror = () => resolve()
    speechSynthesis.speak(u)
  })
}

export function stopSpeaking() {
  if (canSpeak()) speechSynthesis.cancel()
}

type RecognitionCtor = new () => {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
  onerror: ((e: unknown) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
}

function recognitionCtor(): RecognitionCtor | null {
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export const canListen = () => typeof window !== 'undefined' && recognitionCtor() !== null

/** Écoute une phrase et renvoie les transcriptions candidates (vide en cas d'échec). */
export function listen(): Promise<string[]> {
  return new Promise((resolve) => {
    const Ctor = recognitionCtor()
    if (!Ctor) return resolve([])
    const rec = new Ctor()
    rec.lang = 'ar-SA'
    rec.interimResults = false
    rec.maxAlternatives = 3
    let done = false
    rec.onresult = (e) => {
      done = true
      resolve(Array.from(e.results[0] ?? []).map((r) => r.transcript))
    }
    rec.onerror = () => {
      if (!done) resolve([])
      done = true
    }
    rec.onend = () => {
      if (!done) resolve([])
    }
    rec.start()
  })
}
