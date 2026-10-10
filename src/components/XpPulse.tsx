import { useEffect, useRef, useState } from 'react'
import { useProfiles } from '../store/profiles'
import { useProgress } from '../store/progress'

/** Un « +XP » doré s'élève près de l'étoile de niveau à chaque gain. */
export function XpPulse() {
  const xp = useProgress((s) => s.xp)
  const activeId = useProfiles((s) => s.activeId)
  const previous = useRef({ xp, activeId })
  const [gain, setGain] = useState<{ n: number; key: number } | null>(null)

  useEffect(() => {
    const before = previous.current
    previous.current = { xp, activeId }
    if (before.activeId !== activeId || xp <= before.xp) return
    setGain({ n: xp - before.xp, key: Date.now() })
    const t = setTimeout(() => setGain(null), 1600)
    return () => clearTimeout(t)
  }, [xp, activeId])

  if (!gain) return null
  return (
    <span key={gain.key} aria-live="polite" className="envol pointer-events-none absolute -top-1 right-0 text-sm font-bold text-or-300 lueur-or">
      +{gain.n} XP
    </span>
  )
}
