import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AVATARS, type AvatarColorId } from '../data/avatars'

export interface Profile {
  id: string
  name: string
  /** Identifiant d'un animal marin (voir data/avatars). */
  avatar: string
  color: AvatarColorId
  createdAt: string
}

interface ProfilesState {
  profiles: Profile[]
  activeId: string
  addProfile: (name: string, avatar: string, color: AvatarColorId) => Profile
  updateProfile: (id: string, patch: Partial<Pick<Profile, 'name' | 'avatar' | 'color'>>) => void
  removeProfile: (id: string) => void
  setActive: (id: string) => void
}

export const PROFILES_KEY = 'jaa-profils'

const makeId = () => Math.random().toString(36).slice(2, 10)

const DEFAULT: Profile = { id: 'juliette', name: 'Juliette', avatar: 'dauphin', color: 'lagon', createdAt: new Date().toISOString() }

export const useProfiles = create<ProfilesState>()(
  persist(
    (set, get) => ({
      profiles: [DEFAULT],
      activeId: DEFAULT.id,
      addProfile: (name, avatar, color) => {
        const profile: Profile = { id: makeId(), name: name.trim() || 'Sans nom', avatar, color, createdAt: new Date().toISOString() }
        set({ profiles: [...get().profiles, profile] })
        return profile
      },
      updateProfile: (id, patch) =>
        set({
          profiles: get().profiles.map((p) =>
            p.id === id ? { ...p, ...patch, name: patch.name !== undefined ? patch.name.trim() || p.name : p.name } : p,
          ),
        }),
      removeProfile: (id) => {
        const rest = get().profiles.filter((p) => p.id !== id)
        if (!rest.length) return
        set({ profiles: rest, activeId: get().activeId === id ? rest[0].id : get().activeId })
      },
      setActive: (id) => set({ activeId: id }),
    }),
    {
      name: PROFILES_KEY,
      version: 1,
      // Version 0 : l'avatar était un emoji libre. On le rattache à l'animal correspondant.
      migrate: (persisted, version) => {
        const state = persisted as { profiles: (Omit<Profile, 'color'> & { color?: AvatarColorId })[]; activeId: string }
        if (version < 1) {
          state.profiles = state.profiles.map((p) => ({
            ...p,
            avatar: AVATARS.find((a) => a.emoji === p.avatar || a.id === p.avatar)?.id ?? 'dauphin',
            color: p.color ?? 'lagon',
          }))
        }
        return state as unknown as ProfilesState
      },
    },
  ),
)

export const useActiveProfile = () =>
  useProfiles((s) => s.profiles.find((p) => p.id === s.activeId) ?? s.profiles[0])
