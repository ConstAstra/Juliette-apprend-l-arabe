import { REFERENCE } from '../data/reference'
import { TIERS } from '../data/tiers'
import type { Tier } from '../data/types'
import { ALL_THEMES } from '../data/vocabulary'
import { LIBRARY } from '../data/library'
import { shuffle } from './arabic'
import { todayKey, type DeckId, type ProgressData } from '../store/progress'

/** Une carte de révision, quel que soit le paquet. */
export interface ReviewCard {
  id: string
  /** Recto : texte arabe et/ou question en français. */
  frontAr?: string
  frontFr?: string
  backAr?: string
  backFr: string
  backTr?: string
  speak?: string
}

const tierStarted = (p: ProgressData, t: Tier) => t.order === 1 || (p.completed[t.id]?.length ?? 0) > 0

/** Vocabulaire des paliers entamés, des thèmes consultés et des glossaires des textes lus. */
export function vocabularyCards(p: ProgressData): ReviewCard[] {
  const words = [
    ...TIERS.filter((t) => tierStarted(p, t)).flatMap((t) => t.vocabulary),
    ...ALL_THEMES.filter((t) => p.seenThemes[t.id]).flatMap((t) => t.words),
    ...LIBRARY.filter((t) => p.readTexts[t.id]).flatMap((t) => t.glossary),
  ]
  return words.map((w) => ({ id: w.id, frontAr: w.ar, backFr: w.fr, backTr: w.tr, speak: w.ar }))
}

/** Questions de grammaire des paliers entamés et cartes des fiches consultées. */
export function grammarCards(p: ProgressData): ReviewCard[] {
  const fromTiers = TIERS.filter((t) => tierStarted(p, t)).flatMap((t) =>
    t.grammar.quiz.map((q, i) => ({
      id: `g-${t.id}-q${i}`,
      frontFr: q.question,
      frontAr: q.ar,
      backFr: [q.options[q.answer], q.explanation].filter(Boolean).join(' — '),
    })),
  )
  const fromSheets = REFERENCE.filter((r) => p.seenRefs[r.id]).flatMap((r) =>
    r.cards.map((c) => ({ id: c.id, frontFr: c.question, frontAr: c.ar, backFr: c.answer, backAr: c.answerAr, speak: c.answerAr ?? c.ar })),
  )
  // Une réponse arabe dans les options du quiz s'affiche en arabe.
  return [...fromTiers, ...fromSheets].map((c) =>
    /[؀-ۿ]/.test(c.backFr) && !('backAr' in c && c.backAr) ? { ...c, backAr: c.backFr, backFr: '' } : c,
  )
}

export const deckCards = (deck: DeckId, p: ProgressData) => (deck === 'vocabulaire' ? vocabularyCards(p) : grammarCards(p))

const NEW_PER_SESSION = 10
const SESSION_MAX = 20

export function deckStats(deck: DeckId, p: ProgressData) {
  const cards = deckCards(deck, p)
  const entries = p.srs[deck]
  const today = todayKey()
  const fresh = cards.filter((c) => !entries[c.id]).length
  const due = cards.filter((c) => entries[c.id] && entries[c.id].due <= today).length
  const mastered = cards.filter((c) => (entries[c.id]?.box ?? 0) >= 4).length
  return { total: cards.length, fresh, due, mastered, today: due + Math.min(fresh, NEW_PER_SESSION) }
}

/** Cartes à revoir aujourd'hui, puis quelques nouvelles. */
export function buildSession(deck: DeckId, p: ProgressData): ReviewCard[] {
  const cards = deckCards(deck, p)
  const entries = p.srs[deck]
  const today = todayKey()
  const due = shuffle(cards.filter((c) => entries[c.id] && entries[c.id].due <= today))
  const fresh = cards.filter((c) => !entries[c.id]).slice(0, NEW_PER_SESSION)
  return [...due, ...fresh].slice(0, SESSION_MAX)
}
