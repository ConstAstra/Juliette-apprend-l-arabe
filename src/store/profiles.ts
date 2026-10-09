import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Profile {
  id: string
  name: string
  avatar: string
  createdAt: string
}

interface ProfilesState {
  profiles: Profile[]
  activeId: string
  addProfile: (name: string, avatar: string) => Profile
  renameProfile: (id: string, name: string, avatar: string) => void
  removeProfile: (id: string) => void
  setActive: (id: string) => void
}

export const PROFILES_KEY = 'jaa-profils'
export const AVATARS = ['🌙', '🐬', '⛵', '🌴', '🐪', '🦉', '🌸', '⭐', '🍋', '📜']

const makeId = () => Math.random().toString(36).slice(2, 10)

const DEFAULT: Profile = { id: 'juliette', name: 'Juliette', avatar: '🐬', createdAt: new Date().toISOString() }

export const useProfiles = create<ProfilesState>()(
  persist(
    (set, get) => ({
      profiles: [DEFAULT],
      activeId: DEFAULT.id,
      addProfile: (name, avatar) => {
        const profile: Profile = { id: makeId(), name: name.trim() || 'Sans nom', avatar, createdAt: new Date().toISOString() }
        set({ profiles: [...get().profiles, profile] })
        return profile
      },
      renameProfile: (id, name, avatar) =>
        set({ profiles: get().profiles.map((p) => (p.id === id ? { ...p, name: name.trim() || p.name, avatar } : p)) }),
      removeProfile: (id) => {
        const rest = get().profiles.filter((p) => p.id !== id)
        if (!rest.length) return
        set({ profiles: rest, activeId: get().activeId === id ? rest[0].id : get().activeId })
      },
      setActive: (id) => set({ activeId: id }),
    }),
    { name: PROFILES_KEY },
  ),
)

export const useActiveProfile = () =>
  useProfiles((s) => s.profiles.find((p) => p.id === s.activeId) ?? s.profiles[0])
