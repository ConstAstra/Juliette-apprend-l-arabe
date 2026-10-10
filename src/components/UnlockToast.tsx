import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AVATARS, type SeaAvatar } from '../data/avatars'
import { useProfiles } from '../store/profiles'
import { levelInfo, useProgress } from '../store/progress'
import { Ar } from './Ar'

/** Annonce les animaux débloqués quand le niveau du profil actif augmente. */
export function UnlockToast() {
  const activeId = useProfiles((s) => s.activeId)
  const level = useProgress((s) => levelInfo(s.xp).level)
  const previous = useRef({ activeId, level })
  const [fresh, setFresh] = useState<SeaAvatar[]>([])

  useEffect(() => {
    const before = previous.current
    previous.current = { activeId, level }
    // Un changement de profil n'est pas une montée de niveau.
    if (before.activeId !== activeId || level <= before.level) return
    const gained = AVATARS.filter((a) => a.level > before.level && a.level <= level)
    if (!gained.length) return
    setFresh(gained)
    const t = setTimeout(() => setFresh([]), 6000)
    return () => clearTimeout(t)
  }, [activeId, level])

  if (!fresh.length) return null
  return (
    <div role="status" className="fixed inset-x-4 bottom-24 z-30 mx-auto max-w-sm rounded-2xl border border-lueur-400/50 bg-abysse p-4 text-parchemin shadow-[0_0_40px_-8px_rgb(95_220_201/0.6)]">
      <p className="font-extrabold">🎉 Niveau {level} ! Nouvel ami marin :</p>
      {fresh.map((a) => (
        <p key={a.id} className="flex items-center gap-2">
          <span className="text-3xl">{a.emoji}</span>
          <span>{a.fr}</span>
          <Ar text={a.ar} className="ml-auto text-xl" />
        </p>
      ))}
      <Link to="/avatar" onClick={() => setFresh([])} className="mt-1 inline-block text-sm font-semibold underline">
        Choisir mon avatar
      </Link>
    </div>
  )
}
