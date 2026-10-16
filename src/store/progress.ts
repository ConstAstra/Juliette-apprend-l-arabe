import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { PROFILES_KEY, useProfiles } from './profiles'

export const progressKey = (profileId: string) => `jaa-progression-${profileId}`

const dateKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export const todayKey = () => dateKey(new Date())

export function addDays(day: string, n: number): string {
  const [y, m, d] = day.split('-').map(Number)
  return dateKey(new Date(y, m - 1, d + n))
}

/** Intervalle (en jours) avant la prochaine révision, selon la boîte atteinte. */
export const LEITNER_DAYS = [0, 1, 2, 4, 8, 16]

export interface Settings {
  /** Afficher les voyelles brèves et autres diacritiques. */
  tashkeel: boolean
  translit: boolean
  speechRate: number
  /** XP visée chaque jour. */
  dailyGoal: number
}

export interface LeitnerEntry {
  /** Boîte de 1 à 5. */
  box: number
  /** Prochaine révision (AAAA-MM-JJ). */
  due: string
}

export type DeckId = 'vocabulaire' | 'grammaire'

export interface Placement {
  level: string
  date: string
}

export interface ProgressData {
  xp: number
  /** Jours d'activité (AAAA-MM-JJ) → XP gagnée ce jour-là. */
  activity: Record<string, number>
  seenLetters: Record<string, true>
  /** Onglets terminés, par palier. */
  completed: Record<string, string[]>
  seenThemes: Record<string, true>
  bestRecognition: number
  seenRefs: Record<string, true>
  readTexts: Record<string, true>
  /** Meilleur score par jeu. */
  games: Record<string, number>
  seenHistory: Record<string, true>
  /** Deux paquets Leitner séparés : vocabulaire et grammaire. */
  srs: Record<DeckId, Record<string, LeitnerEntry>>
  placement: Placement | null
  settings: Settings
}

interface ProgressActions {
  addXp: (amount: number) => void
  markLetterSeen: (id: string) => void
  completeTab: (tierId: string, tabId: string, xp?: number) => void
  markThemeSeen: (id: string) => void
  recordRecognition: (score: number) => void
  markRefSeen: (id: string) => void
  markTextRead: (id: string) => void
  recordGame: (id: string, score: number) => void
  markHistorySeen: (id: string) => void
  reviewCard: (deck: DeckId, cardId: string, known: boolean) => void
  setPlacement: (level: string) => void
  updateSettings: (patch: Partial<Settings>) => void
  reset: () => void
}

export const INITIAL_PROGRESS: ProgressData = {
  xp: 0,
  activity: {},
  seenLetters: {},
  completed: {},
  seenThemes: {},
  bestRecognition: 0,
  seenRefs: {},
  readTexts: {},
  games: {},
  seenHistory: {},
  srs: { vocabulaire: {}, grammaire: {} },
  placement: null,
  settings: { tashkeel: true, translit: true, speechRate: 0.85, dailyGoal: 30 },
}

export const useProgress = create<ProgressData & ProgressActions>()(
  persist(
    (set, get) => ({
      ...INITIAL_PROGRESS,
      addXp: (amount) => {
        const day = todayKey()
        const { xp, activity } = get()
        set({ xp: xp + amount, activity: { ...activity, [day]: (activity[day] ?? 0) + amount } })
      },
      markLetterSeen: (id) => {
        if (get().seenLetters[id]) return
        set({ seenLetters: { ...get().seenLetters, [id]: true } })
        get().addXp(2)
      },
      completeTab: (tierId, tabId, xp = 10) => {
        const done = get().completed[tierId] ?? []
        if (done.includes(tabId)) return
        set({ completed: { ...get().completed, [tierId]: [...done, tabId] } })
        get().addXp(xp)
      },
      markThemeSeen: (id) => {
        if (get().seenThemes[id]) return
        set({ seenThemes: { ...get().seenThemes, [id]: true } })
        get().addXp(5)
      },
      recordRecognition: (score) => {
        set({ bestRecognition: Math.max(get().bestRecognition, score) })
        get().addXp(score)
      },
      markRefSeen: (id) => {
        if (get().seenRefs[id]) return
        set({ seenRefs: { ...get().seenRefs, [id]: true } })
        get().addXp(5)
      },
      markTextRead: (id) => {
        if (get().readTexts[id]) return
        set({ readTexts: { ...get().readTexts, [id]: true } })
        get().addXp(15)
      },
      recordGame: (id, score) => {
        set({ games: { ...get().games, [id]: Math.max(get().games[id] ?? 0, score) } })
        get().addXp(score)
      },
      markHistorySeen: (id) => {
        if (get().seenHistory[id]) return
        set({ seenHistory: { ...get().seenHistory, [id]: true } })
        get().addXp(5)
      },
      reviewCard: (deck, cardId, known) => {
        const previous = get().srs[deck][cardId]?.box ?? 0
        const box = known ? Math.min(previous + 1, 5) : 1
        const entry = { box, due: addDays(todayKey(), known ? LEITNER_DAYS[box] : 0) }
        set({ srs: { ...get().srs, [deck]: { ...get().srs[deck], [cardId]: entry } } })
        get().addXp(known ? 2 : 1)
      },
      setPlacement: (level) => {
        set({ placement: { level, date: todayKey() } })
        get().addXp(10)
      },
      updateSettings: (patch) => set({ settings: { ...get().settings, ...patch } }),
      reset: () => set({ ...INITIAL_PROGRESS }),
    }),
    {
      name: progressKey(readActiveId()),
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (s) => {
        const data: Partial<ProgressData> = {}
        for (const k of Object.keys(INITIAL_PROGRESS) as (keyof ProgressData)[]) {
          ;(data as Record<string, unknown>)[k] = s[k]
        }
        return data as ProgressData
      },
      // Un profil neuf n'a rien en stockage : on repart des valeurs initiales plutôt
      // que de conserver l'état du profil précédent.
      merge: (persisted, current) => ({
        ...current,
        ...INITIAL_PROGRESS,
        ...((persisted as Partial<ProgressData>) ?? {}),
        settings: { ...INITIAL_PROGRESS.settings, ...((persisted as Partial<ProgressData>)?.settings ?? {}) },
        srs: { ...INITIAL_PROGRESS.srs, ...((persisted as Partial<ProgressData>)?.srs ?? {}) },
      }),
    },
  ),
)

/** Lit le profil actif directement dans le stockage, avant même l'hydratation des profils. */
function readActiveId(): string {
  try {
    const raw = localStorage.getItem(PROFILES_KEY)
    return (raw && JSON.parse(raw)?.state?.activeId) || 'juliette'
  } catch {
    return 'juliette'
  }
}

/** Bascule la progression vers un autre profil, sans recharger la page. */
export async function switchProfile(profileId: string) {
  useProfiles.getState().setActive(profileId)
  useProgress.persist.setOptions({ name: progressKey(profileId) })
  await useProgress.persist.rehydrate()
}

/* ---------- Dérivés : niveau, série, badges ---------- */

/** XP cumulée nécessaire pour atteindre un niveau : 0, 100, 300, 600, 1000… */
export const xpForLevel = (level: number) => 50 * (level - 1) * level

export function levelInfo(xp: number) {
  let level = 1
  while (xp >= xpForLevel(level + 1)) level++
  const floor = xpForLevel(level)
  const next = xpForLevel(level + 1)
  return { level, current: xp - floor, needed: next - floor, ratio: (xp - floor) / (next - floor) }
}

export function streak(activity: Record<string, number>): number {
  let count = 0
  const d = new Date()
  const key = (x: Date) => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`
  // Une série reste valable tant qu'on n'a pas encore manqué la journée en cours.
  if (!activity[key(d)]) d.setDate(d.getDate() - 1)
  while (activity[key(d)]) {
    count++
    d.setDate(d.getDate() - 1)
  }
  return count
}

const NO_TABS: string[] = []
/** Onglets terminés d'un palier (référence stable pour les sélecteurs). */
export const useCompletedTabs = (tierId: string) => useProgress((s) => s.completed[tierId] ?? NO_TABS)
