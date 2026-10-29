import { LETTERS } from './letters'
import { ALL_THEMES, MEDICAL_THEMES } from './vocabulary'
import { TIERS, tabsForTier } from './tiers'
import { REFERENCE } from './reference'
import { HISTORY } from './history'
import { levelInfo, streak, type ProgressData } from '../store/progress'

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
  { id: 'a2', emoji: '🗝️', title: 'Niveau A2', description: 'Terminer les trois paliers A2.', earned: (p) => TIERS.filter((t) => t.level === 'A2').every((t) => tierDone(p, t.id)) },
  { id: 'b1', emoji: '🌳', title: 'Niveau B1', description: 'Terminer les paliers B1.', earned: (p) => TIERS.filter((t) => t.level === 'B1').every((t) => tierDone(p, t.id)) },
  { id: 'b2', emoji: '📰', title: 'Niveau B2', description: 'Terminer les paliers B2.', earned: (p) => TIERS.filter((t) => t.level === 'B2').every((t) => tierDone(p, t.id)) },
  { id: 'c1', emoji: '👑', title: 'Niveau C1', description: 'Terminer tout le parcours, jusqu’au C1.', earned: (p) => TIERS.every((t) => tierDone(p, t.id)) },
  { id: 'serie-3', emoji: '🔥', title: 'Trois jours d’affilée', description: 'Pratiquer trois jours de suite.', earned: (p) => streak(p.activity) >= 3 },
  { id: 'serie-7', emoji: '🌟', title: 'Une semaine entière', description: 'Pratiquer sept jours de suite.', earned: (p) => streak(p.activity) >= 7 },
  { id: 'xp-500', emoji: '💎', title: '500 XP', description: 'Accumuler 500 points d’expérience.', earned: (p) => p.xp >= 500 },
  { id: 'premiere-revision', emoji: '🃏', title: 'Première révision', description: 'Réviser une carte en méthode Leitner.', earned: (p) => Object.keys(p.srs.vocabulaire).length + Object.keys(p.srs.grammaire).length > 0 },
  { id: 'bibliothecaire', emoji: '📑', title: 'Rat de bibliothèque', description: 'Consulter toutes les fiches de référence.', earned: (p) => REFERENCE.every((r) => p.seenRefs[r.id]) },
  { id: 'conteuse', emoji: '📜', title: 'Conteuse', description: 'Lire trois textes de la bibliothèque.', earned: (p) => Object.keys(p.readTexts).length >= 3 },
  { id: 'historienne', emoji: '🏛️', title: 'Historienne', description: 'Parcourir toute la frise historique.', earned: (p) => HISTORY.every((h) => p.seenHistory[h.id]) },
  { id: 'joueuse', emoji: '🎲', title: 'Joueuse', description: 'Jouer aux quatre jeux.', earned: (p) => ['racines', 'formes', 'oreille', 'memoire'].every((g) => p.games[g] !== undefined) },
  { id: 'boussole', emoji: '🧭', title: 'Boussole', description: 'Passer le test de niveau.', earned: (p) => p.placement !== null },
  { id: 'aquarium', emoji: '🦈', title: 'Grand aquarium', description: 'Atteindre le niveau 8 et débloquer le requin.', earned: (p) => levelInfo(p.xp).level >= 8 },
  { id: 'blouse-blanche', emoji: '🩺', title: 'Blouse blanche', description: 'Explorer les cinq fiches « Comprendre ses patients ».', earned: (p) => MEDICAL_THEMES.every((t) => p.seenThemes[t.id]) },
  { id: 'lexicographe', emoji: '📖', title: 'Lexicographe', description: 'Ouvrir quinze fiches de vocabulaire.', earned: (p) => ALL_THEMES.filter((t) => p.seenThemes[t.id]).length >= 15 },
  { id: 'stratege', emoji: '♟️', title: 'Stratège', description: 'Ouvrir la fiche des jeux de société.', earned: (p) => !!p.seenThemes['jeux-de-societe'] },
  { id: 'juliette', emoji: '🐬', title: 'Le monde de Juliette', description: 'Explorer les quatre premières fiches du vocabulaire spécial.', earned: (p) => ['animaux-marins', 'sports-voile', 'alcool-cocktails', 'ecriture-lecture'].every((id) => p.seenThemes[id]) },
]
