import { LETTERS } from './letters'
import { JULIETTE_THEMES } from './vocabulary'
import { TIERS, tabsForTier } from './tiers'
import { streak, type ProgressData } from '../store/progress'

export interface Badge {
  id: string
  emoji: string
  title: string
  description: string
  earned: (p: ProgressData) => boolean
}

export const tierDone = (p: ProgressData, tierId: string) => {
  const tier = TIERS.find((t) => t.id === tierId)
  if (!tier) return false
  const done = p.completed[tierId] ?? []
  return tabsForTier(tier).every((tab) => done.includes(tab.id))
}

export const BADGES: Badge[] = [
  { id: 'premiere-lettre', emoji: '✨', title: 'Première lettre', description: 'Découvrir une lettre de l’alphabet.', earned: (p) => Object.keys(p.seenLetters).length >= 1 },
  { id: 'alphabet', emoji: '🔤', title: 'Alphabet complet', description: 'Découvrir les 28 lettres.', earned: (p) => LETTERS.every((l) => p.seenLetters[l.id]) },
  { id: 'oeil-de-lynx', emoji: '🦉', title: 'Œil de lynx', description: 'Obtenir 10/10 à l’exercice de reconnaissance.', earned: (p) => p.bestRecognition >= 10 },
  { id: 'premier-palier', emoji: '🏁', title: 'Premier palier', description: 'Terminer tous les onglets du palier A1.1.', earned: (p) => tierDone(p, 'a1-1') },
  { id: 'a1', emoji: '🎓', title: 'Niveau A1', description: 'Terminer les quatre paliers A1.', earned: (p) => TIERS.filter((t) => t.level === 'A1').every((t) => tierDone(p, t.id)) },
  { id: 'serie-3', emoji: '🔥', title: 'Trois jours d’affilée', description: 'Pratiquer trois jours de suite.', earned: (p) => streak(p.activity) >= 3 },
  { id: 'serie-7', emoji: '🌟', title: 'Une semaine entière', description: 'Pratiquer sept jours de suite.', earned: (p) => streak(p.activity) >= 7 },
  { id: 'xp-500', emoji: '💎', title: '500 XP', description: 'Accumuler 500 points d’expérience.', earned: (p) => p.xp >= 500 },
  { id: 'juliette', emoji: '🐬', title: 'Le monde de Juliette', description: 'Explorer les quatre fiches du vocabulaire spécial.', earned: (p) => JULIETTE_THEMES.every((t) => p.seenThemes[t.id]) },
]
