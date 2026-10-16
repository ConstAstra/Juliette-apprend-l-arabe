import { todayKey, useProgress } from '../store/progress'

/** Anneau de l'objectif du jour : il se remplit de lueur, puis s'embrase d'or une fois atteint. */
export function DailyGoal() {
  const goal = useProgress((s) => s.settings.dailyGoal)
  const today = useProgress((s) => s.activity[todayKey()] ?? 0)
  const ratio = Math.min(1, today / goal)
  const reached = today >= goal
  const r = 30
  const c = 2 * Math.PI * r

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 72 72" className={`size-20 shrink-0 -rotate-90 ${reached ? 'drop-shadow-[0_0_10px_rgb(221_187_114/0.7)]' : ''}`} role="img" aria-label={`Objectif du jour : ${today} sur ${goal} XP`}>
        <defs>
          <linearGradient id="anneau" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5fdcc9" />
            <stop offset="1" stopColor="#ddbb72" />
          </linearGradient>
        </defs>
        <circle cx="36" cy="36" r={r} fill="none" stroke="#2a3557" strokeWidth="6" />
        <circle
          cx="36" cy="36" r={r} fill="none"
          stroke={reached ? '#ddbb72' : 'url(#anneau)'} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - ratio)}
          className="transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <div>
        <div className="text-xs tracking-[0.15em] text-lueur-300 uppercase">Objectif du jour</div>
        <div className="font-display text-2xl text-or-300 tabular-nums">{today} / {goal} XP</div>
        <div className="muted text-sm">{reached ? 'Atteint ✦ la nuit vous appartient.' : `Encore ${goal - today} XP pour l’atteindre.`}</div>
      </div>
    </div>
  )
}
