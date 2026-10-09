import { useProfiles } from '../store/profiles'
import { switchProfile } from '../store/progress'

const PREFIX = 'jaa-'

export function exportBackup(): string {
  const data: Record<string, string> = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith(PREFIX)) data[key] = localStorage.getItem(key) ?? ''
  }
  return JSON.stringify({ app: 'juliette-apprend-l-arabe', version: 1, date: new Date().toISOString(), data }, null, 2)
}

export function downloadBackup() {
  const blob = new Blob([exportBackup()], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `juliette-arabe-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

/** Restaure une sauvegarde et réhydrate les magasins, sans recharger la page. */
export async function importBackup(json: string) {
  const parsed = JSON.parse(json) as { app?: string; data?: Record<string, string> }
  if (parsed.app !== 'juliette-apprend-l-arabe' || !parsed.data) throw new Error('Ce fichier n’est pas une sauvegarde de l’application.')
  for (const [key, value] of Object.entries(parsed.data)) {
    if (key.startsWith(PREFIX) && typeof value === 'string') localStorage.setItem(key, value)
  }
  await useProfiles.persist.rehydrate()
  await switchProfile(useProfiles.getState().activeId)
}
