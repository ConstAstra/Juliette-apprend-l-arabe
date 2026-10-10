import { useRef, useState } from 'react'
import { downloadBackup, importBackup } from '../lib/backup'
import { canListen, canSpeak, hasArabicVoice } from '../lib/speech'
import { Link } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { AVATAR_COLORS, unlockedAvatars, type AvatarColorId } from '../data/avatars'
import { useProfiles } from '../store/profiles'
import { levelInfo, progressKey, switchProfile, useProgress } from '../store/progress'

export function ProfilesPage() {
  const { profiles, activeId, addProfile, removeProfile, updateProfile } = useProfiles()
  const settings = useProgress((s) => s.settings)
  const updateSettings = useProgress((s) => s.updateSettings)
  const reset = useProgress((s) => s.reset)
  const xp = useProgress((s) => s.xp)
  const [name, setName] = useState('')
  const starters = unlockedAvatars(1)
  const [avatar, setAvatar] = useState(starters[0].id)
  const [color, setColor] = useState<AvatarColorId>('lagon')
  const [editing, setEditing] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const otherXp = (id: string) => {
    if (id === activeId) return xp
    try {
      return JSON.parse(localStorage.getItem(progressKey(id)) ?? '{}')?.state?.xp ?? 0
    } catch {
      return 0
    }
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-extrabold">Profils et réglages</h1>
      <p className="muted text-sm">Les profils sont locaux : ils restent sur cet appareil, sans compte en ligne.</p>
      <Link to="/avatar" className="btn-soft w-full">🐬 Changer d’avatar (l’aquarium)</Link>

      <section className="space-y-2">
        {profiles.map((p) => (
          <div key={p.id} className={`card flex items-center gap-3 ${p.id === activeId ? 'ring-2 ring-terre-500' : ''}`}>
            <Avatar profile={p} />
            {editing === p.id ? (
              <form
                className="flex flex-1 gap-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  const input = (e.currentTarget.elements.namedItem('nom') as HTMLInputElement).value
                  updateProfile(p.id, { name: input })
                  setEditing(null)
                }}
              >
                <input name="nom" defaultValue={p.name} aria-label="Nouveau nom" className="min-h-11 min-w-0 flex-1 rounded-xl px-3 ring-1 ring-stone-900/10 dark:bg-stone-950" />
                <button className="btn-soft">OK</button>
              </form>
            ) : (
              <div className="flex-1">
                <div className="font-bold">{p.name}</div>
                <div className="muted text-sm">Niveau {levelInfo(otherXp(p.id)).level} · {otherXp(p.id)} XP</div>
              </div>
            )}
            {p.id === activeId ? (
              <span className="text-sm font-semibold text-terre-600">Actif</span>
            ) : (
              <button className="btn-soft" onClick={() => switchProfile(p.id)}>Choisir</button>
            )}
            {editing !== p.id && (
              <button className="muted px-1" aria-label={`Renommer ${p.name}`} onClick={() => setEditing(p.id)}>✏️</button>
            )}
            {profiles.length > 1 && (
              <button
                className="muted px-1"
                aria-label={`Supprimer ${p.name}`}
                onClick={async () => {
                  if (!confirm(`Supprimer le profil « ${p.name} » et toute sa progression ?`)) return
                  const wasActive = p.id === activeId
                  removeProfile(p.id)
                  localStorage.removeItem(progressKey(p.id))
                  if (wasActive) await switchProfile(useProfiles.getState().activeId)
                }}
              >
                🗑️
              </button>
            )}
          </div>
        ))}
      </section>

      <form
        className="card space-y-3"
        onSubmit={async (e) => {
          e.preventDefault()
          if (!name.trim()) return
          const p = addProfile(name, avatar, color)
          setName('')
          await switchProfile(p.id)
        }}
      >
        <h2 className="font-bold">Nouveau profil</h2>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Prénom" aria-label="Prénom" className="min-h-11 w-full rounded-xl px-3 ring-1 ring-stone-900/10 dark:bg-stone-950 dark:ring-white/10" />
        <div className="flex items-center gap-3">
          <Avatar profile={{ avatar, color }} />
          <p className="muted text-sm">Quatre animaux pour commencer ; les autres se débloquent en progressant.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {starters.map((a) => (
            <button type="button" key={a.id} onClick={() => setAvatar(a.id)} aria-pressed={a.id === avatar} aria-label={a.fr} className={`size-11 rounded-full text-2xl ${a.id === avatar ? 'bg-terre-600/20 ring-2 ring-terre-500' : 'bg-sable-100 dark:bg-stone-800'}`}>
              {a.emoji}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {AVATAR_COLORS.map((c) => (
            <button type="button" key={c.id} onClick={() => setColor(c.id)} aria-pressed={c.id === color} aria-label={`Fond ${c.label}`} title={c.label} className={`size-8 rounded-full ${c.className} ${c.id === color ? 'ring-4 ring-terre-500' : 'ring-1 ring-stone-900/10'}`} />
          ))}
        </div>
        <button className="btn-primary w-full" type="submit">Créer et utiliser</button>
      </form>

      <section className="card space-y-3">
        <h2 className="font-bold">Réglages de lecture</h2>
        <label className="flex items-center justify-between gap-3">
          <span>
            Diacritiques (tashkīl)
            <span className="muted block text-sm">Recommandés au début ; à retirer pour lire comme dans la vie réelle.</span>
          </span>
          <input type="checkbox" className="size-5" checked={settings.tashkeel} onChange={(e) => updateSettings({ tashkeel: e.target.checked })} />
        </label>
        <label className="flex items-center justify-between gap-3">
          <span>Translittération latine</span>
          <input type="checkbox" className="size-5" checked={settings.translit} onChange={(e) => updateSettings({ translit: e.target.checked })} />
        </label>
        <label className="block">
          <span>Vitesse de la voix : {settings.speechRate.toFixed(2)}</span>
          <input type="range" min={0.5} max={1.2} step={0.05} value={settings.speechRate} onChange={(e) => updateSettings({ speechRate: Number(e.target.value) })} className="w-full" />
        </label>
        <p className="muted text-sm">
          Synthèse vocale : {canSpeak() ? (hasArabicVoice() ? 'voix arabe disponible ✓' : 'aucune voix arabe détectée — installez-en une dans les réglages de l’appareil') : 'non prise en charge'}.
          {' '}Reconnaissance vocale : {canListen() ? 'disponible ✓' : 'non prise en charge par ce navigateur (la saisie au clavier reste possible)'}.
        </p>
      </section>

      <section className="card space-y-3">
        <h2 className="font-bold">Sauvegarde</h2>
        <p className="muted text-sm">Exportez toutes les données (profils et progression) dans un fichier, pour les restaurer ici ou sur un autre appareil.</p>
        <div className="flex flex-wrap gap-2">
          <button className="btn-soft" onClick={downloadBackup}>⬇️ Exporter</button>
          <button className="btn-soft" onClick={() => fileRef.current?.click()}>⬆️ Restaurer</button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (!file) return
              try {
                await importBackup(await file.text())
                setMessage('Sauvegarde restaurée ✓')
              } catch (err) {
                setMessage(err instanceof Error ? err.message : 'Restauration impossible.')
              }
              e.target.value = ''
            }}
          />
        </div>
        {message && <p className="text-sm font-semibold">{message}</p>}
        <button
          className="text-sm text-red-600 underline"
          onClick={() => {
            if (confirm('Effacer toute la progression de ce profil ?')) reset()
          }}
        >
          Réinitialiser la progression de ce profil
        </button>
      </section>
    </div>
  )
}
