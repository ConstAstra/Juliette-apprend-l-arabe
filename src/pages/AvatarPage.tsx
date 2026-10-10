import { Link } from 'react-router-dom'
import { Ar } from '../components/Ar'
import { Avatar } from '../components/Avatar'
import { SpeakButton } from '../components/SpeakButton'
import { AVATARS, AVATAR_COLORS, avatarById } from '../data/avatars'
import { useActiveProfile, useProfiles } from '../store/profiles'
import { levelInfo, useProgress } from '../store/progress'

export function AvatarPage() {
  const profile = useActiveProfile()
  const updateProfile = useProfiles((s) => s.updateProfile)
  const xp = useProgress((s) => s.xp)
  const { level } = levelInfo(xp)
  const current = avatarById(profile.avatar)
  const unlocked = AVATARS.filter((a) => a.level <= level).length
  const next = AVATARS.find((a) => a.level > level)

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-extrabold">Mon avatar</h1>

      <section className="card flex items-center gap-4 bg-gradient-to-b from-lueur-600/20 to-abysse">
        <Avatar profile={profile} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="text-xl font-extrabold">{profile.name}</div>
          <div className="flex items-center gap-2">
            <Ar text={current.ar} className="text-2xl" />
            <SpeakButton text={current.ar} label={`Écouter : ${current.fr}`} />
          </div>
          <div className="muted text-sm">
            {current.fr} · <i>{current.tr}</i>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-2 font-bold">Couleur de fond</h2>
        <div className="flex flex-wrap gap-2">
          {AVATAR_COLORS.map((c) => (
            <button
              key={c.id}
              onClick={() => updateProfile(profile.id, { color: c.id })}
              aria-pressed={profile.color === c.id}
              aria-label={c.label}
              title={c.label}
              className={`size-10 rounded-full ${c.className} ${profile.color === c.id ? 'ring-4 ring-or-400' : 'ring-1 ring-trait'}`}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="font-bold">L’aquarium</h2>
          <span className="muted text-sm">{unlocked} / {AVATARS.length} animaux</span>
        </div>
        {next && (
          <p className="muted mb-2 text-sm">
            Prochain animal au niveau {next.level} (vous êtes niveau {level}). Chaque leçon, révision ou exercice rapporte de l’XP.
          </p>
        )}
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {AVATARS.map((a) => {
            const open = a.level <= level
            const chosen = a.id === profile.avatar
            return (
              <button
                key={a.id}
                disabled={!open}
                onClick={() => updateProfile(profile.id, { avatar: a.id })}
                aria-pressed={chosen}
                aria-label={open ? `Choisir ${a.fr}` : `${a.fr} : se débloque au niveau ${a.level}`}
                className={`card flex flex-col items-center gap-1 p-2 ${chosen ? 'ring-2 ring-or-400' : ''}`}
              >
                <span className={`text-4xl ${open ? '' : 'opacity-25 grayscale'}`}>{a.emoji}</span>
                {open ? (
                  <>
                    <Ar text={a.ar} className="text-base leading-tight" />
                    <span className="muted text-xs">{a.fr.replace(/ \(.*\)$/, '')}</span>
                  </>
                ) : (
                  <span className="muted text-xs font-semibold">🔒 Niveau {a.level}</span>
                )}
              </button>
            )
          })}
        </div>
      </section>

      <Link to="/profils" className="btn-soft w-full">👥 Profils et réglages</Link>
    </div>
  )
}
