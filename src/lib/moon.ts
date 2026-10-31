/** Phase de la lune, calculée à partir d'une nouvelle lune de référence (6 janvier 2000, 18 h 14 UTC). */
const SYNODIC = 29.530588853
const REFERENCE = Date.UTC(2000, 0, 6, 18, 14)

export interface MoonPhase {
  /** 0 = nouvelle lune, 0,5 = pleine lune. */
  phase: number
  ar: string
  tr: string
  fr: string
}

const NAMES: [string, string, string][] = [
  ['مُحَاقٌ', 'muḥāq', 'nouvelle lune'],
  ['هِلَالٌ مُتَزَايِدٌ', 'hilālun mutazāyid', 'premier croissant'],
  ['تَرْبِيعٌ أَوَّلُ', 'tarbīʿun awwal', 'premier quartier'],
  ['أَحْدَبُ مُتَزَايِدٌ', 'aḥdabu mutazāyid', 'lune gibbeuse croissante'],
  ['بَدْرٌ', 'badr', 'pleine lune'],
  ['أَحْدَبُ مُتَنَاقِصٌ', 'aḥdabu mutanāqiṣ', 'lune gibbeuse décroissante'],
  ['تَرْبِيعٌ أَخِيرٌ', 'tarbīʿun akhīr', 'dernier quartier'],
  ['هِلَالٌ مُتَنَاقِصٌ', 'hilālun mutanāqiṣ', 'dernier croissant'],
]

export function moonPhase(date = new Date()): MoonPhase {
  const days = (date.getTime() - REFERENCE) / 86400000
  const phase = (((days / SYNODIC) % 1) + 1) % 1
  // Huit secteurs, centrés sur les phases principales.
  const [ar, tr, fr] = NAMES[Math.floor(phase * 8 + 0.5) % 8]
  return { phase, ar, tr, fr }
}

/** Tracé SVG de la partie éclairée, vue depuis l'hémisphère nord. */
export function litPath(phase: number, cx: number, cy: number, r: number): string {
  const rx = Math.abs(Math.cos(2 * Math.PI * phase)) * r
  const waxing = phase < 0.5
  const crescent = phase < 0.25 || phase > 0.75
  const outer = waxing ? 1 : 0
  const inner = waxing ? (crescent ? 0 : 1) : crescent ? 1 : 0
  return `M ${cx} ${cy - r} A ${r} ${r} 0 0 ${outer} ${cx} ${cy + r} A ${rx} ${r} 0 0 ${inner} ${cx} ${cy - r} Z`
}
