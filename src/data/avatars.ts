/** Avatars : des animaux marins, avec leur nom arabe, débloqués au fil des niveaux. */
export interface SeaAvatar {
  id: string
  emoji: string
  ar: string
  tr: string
  fr: string
  /** Niveau à atteindre pour débloquer l'avatar. */
  level: number
}

export const AVATARS: SeaAvatar[] = [
  { id: 'dauphin', emoji: '🐬', ar: 'دُلْفِينٌ', tr: 'dulfīn', fr: 'le dauphin', level: 1 },
  { id: 'poisson', emoji: '🐠', ar: 'سَمَكَةٌ', tr: 'samaka', fr: 'le poisson', level: 1 },
  { id: 'tortue', emoji: '🐢', ar: 'سُلَحْفَاةٌ بَحْرِيَّةٌ', tr: 'sulaḥfāt baḥriyya', fr: 'la tortue de mer', level: 1 },
  { id: 'crabe', emoji: '🦀', ar: 'سَرَطَانُ الْبَحْرِ', tr: 'saraṭānu l-baḥr', fr: 'le crabe', level: 1 },
  { id: 'pieuvre', emoji: '🐙', ar: 'أُخْطُبُوطٌ', tr: 'ukhṭubūṭ', fr: 'la pieuvre', level: 2 },
  { id: 'coquillage', emoji: '🐚', ar: 'صَدَفَةٌ', tr: 'ṣadafa', fr: 'le coquillage', level: 3 },
  { id: 'phoque', emoji: '🦭', ar: 'فُقْمَةٌ', tr: 'fuqma', fr: 'le phoque', level: 4 },
  { id: 'calamar', emoji: '🦑', ar: 'حَبَّارٌ', tr: 'ḥabbār', fr: 'le calamar', level: 5 },
  { id: 'crevette', emoji: '🦐', ar: 'رُوبْيَانٌ', tr: 'rūbyān', fr: 'la crevette', level: 6 },
  { id: 'homard', emoji: '🦞', ar: 'جَرَادُ الْبَحْرِ', tr: 'jarādu l-baḥr', fr: 'le homard (« sauterelle de mer »)', level: 7 },
  { id: 'requin', emoji: '🦈', ar: 'قِرْشٌ', tr: 'qirsh', fr: 'le requin', level: 8 },
  { id: 'baleine', emoji: '🐋', ar: 'حُوتٌ', tr: 'ḥūt', fr: 'la baleine', level: 10 },
  { id: 'baleine-bleue', emoji: '🐳', ar: 'اَلْحُوتُ الْأَزْرَقُ', tr: 'al-ḥūtu l-azraq', fr: 'la baleine bleue', level: 12 },
]

export const AVATAR_COLORS = [
  { id: 'lagon', label: 'Lagon', className: 'bg-teal-200 dark:bg-teal-800' },
  { id: 'ocean', label: 'Océan', className: 'bg-sky-200 dark:bg-sky-800' },
  { id: 'abysses', label: 'Abysses', className: 'bg-indigo-300 dark:bg-indigo-900' },
  { id: 'corail', label: 'Corail', className: 'bg-orange-200 dark:bg-orange-800' },
  { id: 'sable', label: 'Sable', className: 'bg-amber-100 dark:bg-amber-800' },
  { id: 'algue', label: 'Algue', className: 'bg-emerald-200 dark:bg-emerald-800' },
  { id: 'nacre', label: 'Nacre', className: 'bg-violet-200 dark:bg-violet-800' },
] as const

export type AvatarColorId = (typeof AVATAR_COLORS)[number]['id']

export const avatarById = (id: string) => AVATARS.find((a) => a.id === id) ?? AVATARS[0]
export const colorById = (id: string) => AVATAR_COLORS.find((c) => c.id === id) ?? AVATAR_COLORS[0]
export const unlockedAvatars = (level: number) => AVATARS.filter((a) => a.level <= level)
