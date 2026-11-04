/** Les douze signes du zodiaque, avec leurs noms arabes et leurs dates (tropicales, habituelles en Europe). */
export interface Sign {
  id: string
  /** Glyphe suivi de U+FE0E, pour obtenir la forme texte et non l'emoji coloré. */
  symbol: string
  ar: string
  tr: string
  fr: string
  /** Sens littéral du nom arabe, quand il diffère du français. */
  literal?: string
  /** Premier jour du signe : [mois (1-12), jour]. */
  start: [number, number]
  dates: string
  element: 'feu' | 'terre' | 'air' | 'eau'
}

export const SIGNS: Sign[] = [
  { id: 'belier', symbol: '♈\uFE0E', ar: 'اَلْحَمَلُ', tr: 'al-ḥamal', fr: 'le Bélier', literal: 'l’agneau', start: [3, 21], dates: '21 mars – 19 avril', element: 'feu' },
  { id: 'taureau', symbol: '♉\uFE0E', ar: 'اَلثَّوْرُ', tr: 'ath-thawr', fr: 'le Taureau', start: [4, 20], dates: '20 avril – 20 mai', element: 'terre' },
  { id: 'gemeaux', symbol: '♊\uFE0E', ar: 'اَلْجَوْزَاءُ', tr: 'al-jawzā’', fr: 'les Gémeaux', start: [5, 21], dates: '21 mai – 20 juin', element: 'air' },
  { id: 'cancer', symbol: '♋\uFE0E', ar: 'اَلسَّرَطَانُ', tr: 'as-saraṭān', fr: 'le Cancer', literal: 'le crabe', start: [6, 21], dates: '21 juin – 22 juillet', element: 'eau' },
  { id: 'lion', symbol: '♌\uFE0E', ar: 'اَلْأَسَدُ', tr: 'al-asad', fr: 'le Lion', start: [7, 23], dates: '23 juillet – 22 août', element: 'feu' },
  { id: 'vierge', symbol: '♍\uFE0E', ar: 'اَلْعَذْرَاءُ', tr: 'al-ʿadhrā’', fr: 'la Vierge', start: [8, 23], dates: '23 août – 22 septembre', element: 'terre' },
  { id: 'balance', symbol: '♎\uFE0E', ar: 'اَلْمِيزَانُ', tr: 'al-mīzān', fr: 'la Balance', start: [9, 23], dates: '23 septembre – 22 octobre', element: 'air' },
  { id: 'scorpion', symbol: '♏\uFE0E', ar: 'اَلْعَقْرَبُ', tr: 'al-ʿaqrab', fr: 'le Scorpion', start: [10, 23], dates: '23 octobre – 21 novembre', element: 'eau' },
  { id: 'sagittaire', symbol: '♐\uFE0E', ar: 'اَلْقَوْسُ', tr: 'al-qaws', fr: 'le Sagittaire', literal: 'l’arc', start: [11, 22], dates: '22 novembre – 21 décembre', element: 'feu' },
  { id: 'capricorne', symbol: '♑\uFE0E', ar: 'اَلْجَدْيُ', tr: 'al-jady', fr: 'le Capricorne', literal: 'le chevreau', start: [12, 22], dates: '22 décembre – 19 janvier', element: 'terre' },
  { id: 'verseau', symbol: '♒\uFE0E', ar: 'اَلدَّلْوُ', tr: 'ad-dalw', fr: 'le Verseau', literal: 'le seau', start: [1, 20], dates: '20 janvier – 18 février', element: 'air' },
  { id: 'poissons', symbol: '♓\uFE0E', ar: 'اَلْحُوتُ', tr: 'al-ḥūt', fr: 'les Poissons', literal: 'le poisson, la baleine', start: [2, 19], dates: '19 février – 20 mars', element: 'eau' },
]

export const ELEMENTS: Record<Sign['element'], { ar: string; tr: string; fr: string }> = {
  feu: { ar: 'نَارِيٌّ', tr: 'nārī', fr: 'de feu' },
  terre: { ar: 'تُرَابِيٌّ', tr: 'turābī', fr: 'de terre' },
  air: { ar: 'هَوَائِيٌّ', tr: 'hawā’ī', fr: 'd’air' },
  eau: { ar: 'مَائِيٌّ', tr: 'mā’ī', fr: 'd’eau' },
}

const startKey = (s: Sign) => s.start[0] * 100 + s.start[1]
const BY_START = [...SIGNS].sort((a, b) => startKey(a) - startKey(b))

/** Signe correspondant à un jour de l'année : le dernier signe commencé à cette date. */
export function signFor(month: number, day: number): Sign {
  const key = month * 100 + day
  const begun = BY_START.filter((s) => startKey(s) <= key)
  // Avant le 20 janvier, on est encore dans le Capricorne commencé en décembre.
  return begun.length ? begun[begun.length - 1] : BY_START[BY_START.length - 1]
}

/** Le signe que traverse le soleil aujourd'hui. */
export const sunSign = (date = new Date()) => signFor(date.getMonth() + 1, date.getDate())
