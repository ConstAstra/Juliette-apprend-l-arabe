/** Outils pour le texte arabe : diacritiques, normalisation et formes positionnelles. */

// Harakat, tanwin, soukoun, chadda, alif suscrit et tatwil.
const TASHKEEL = /[ً-ْٰـ]/g

export function stripTashkeel(text: string): string {
  return text.replace(TASHKEEL, '')
}

/** Normalise une saisie pour la comparer avec souplesse (diacritiques, hamza, tā’ marbūṭa…). */
export function normalizeArabic(text: string): string {
  return stripTashkeel(text)
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[ؤئ]/g, 'ء')
    .replace(/[^ء-ي\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function matchesAny(answer: string, expected: string[]): boolean {
  const a = normalizeArabic(answer)
  if (!a) return false
  return expected.some((e) => {
    const n = normalizeArabic(e)
    return a.includes(n) || n.includes(a)
  })
}

export type FormName = 'isolee' | 'initiale' | 'mediane' | 'finale'

export const FORM_LABELS: Record<FormName, string> = {
  isolee: 'Isolée',
  initiale: 'Initiale',
  mediane: 'Médiane',
  finale: 'Finale',
}

// Le tatwil (ـ) matérialise la liaison : c'est la convention des manuels.
const TATWEEL = 'ـ'

export function letterForm(char: string, joinsNext: boolean, form: FormName): string {
  switch (form) {
    case 'isolee':
      return char
    case 'initiale':
      return joinsNext ? char + TATWEEL : char
    case 'mediane':
      return joinsNext ? TATWEEL + char + TATWEEL : TATWEEL + char
    case 'finale':
      return TATWEEL + char
  }
}

export function shuffle<T>(items: readonly T[]): T[] {
  const a = items.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩'
/** 12 → « ١٢ » : chiffres arabes orientaux. */
export const toArabicDigits = (n: number) => String(n).replace(/\d/g, (d) => ARABIC_DIGITS[Number(d)])
