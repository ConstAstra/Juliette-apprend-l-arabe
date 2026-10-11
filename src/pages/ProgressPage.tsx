import { ProgressBar } from '../components/ProgressBar'
import { BADGES, tierDone } from '../data/badges'
import { LETTERS } from '../data/letters'
import { TIERS } from '../data/tiers'
import { levelInfo, streak, useProgress } from '../store/progress'

const WEEKS = 15
const DAY_LABELS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

const dayKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

/** Calendrier de régularité : une colonne par semaine, du lundi au dimanche. */
function Calendar({ activity }: { activity: Record<string, number> }) {
  const today = new Date()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7) - (WEEKS - 1) * 7)
  const weeks = Array.from({ length: WEEKS }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const day = new Date(monday)
      day.setDate(monday.getDate() + w * 7 + d)
      return day
    }),
  )
  const shade = (xp: number) => (xp === 0 ? 'bg-trait' : xp < 20 ? 'bg-lueur-400/40' : xp < 50 ? 'bg-lueur-400/70' : 'bg-lueur-500')
  return (
    <div className="flex gap-1">
      <div className="muted grid grid-rows-7 gap-1 text-[10px]">
        {DAY_LABELS.map((l, i) => <span key={i} className="flex h-3.5 items-center">{l}</span>)}
      </div>
      {weeks.map((week, w) => (
        <div key={w} className="grid flex-1 grid-rows-7 gap-1">
          {week.map((day) => {
            const xp = day > today ? -1 : activity[dayKey(day)] ?? 0
            return (
              <span
                key={dayKey(day)}
                title={xp >= 0 ? `${day.toLocaleDateString('fr-FR')} : ${xp} XP` : undefined}
                className={`h-3.5 rounded-sm ${xp < 0 ? 'bg-transparent' : shade(xp)}`}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export function ProgressPage() {
  const progress = useProgress()
  const lvl = levelInfo(progress.xp)
  const earned = BADGES.filter((b) => b.earned(progress))
  const activeDays = Object.keys(progress.activity).length

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-extrabold">Progrès</h1>

      <section className="card">
        <div className="flex items-baseline justify-between">
          <span className="text-xl font-extrabold">Niveau {lvl.level}</span>
          <span className="muted text-sm">{progress.xp} XP au total</span>
        </div>
        <ProgressBar value={lvl.ratio} className="mt-2" />
        <p className="muted mt-1 text-sm">{lvl.needed - lvl.current} XP avant le niveau {lvl.level + 1}</p>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div><div className="text-xl font-bold">🔥 {streak(progress.activity)}</div><div className="muted text-xs">série</div></div>
          <div><div className="text-xl font-bold">{activeDays}</div><div className="muted text-xs">jours actifs</div></div>
          <div><div className="text-xl font-bold">{Object.keys(progress.seenLetters).length}/{LETTERS.length}</div><div className="muted text-xs">lettres</div></div>
        </div>
      </section>

      <section className="card">
        <h2 className="mb-2 font-bold">Régularité</h2>
        <Calendar activity={progress.activity} />
      </section>

      <section>
        <h2 className="mb-2 font-bold">Badges · {earned.length} / {BADGES.length}</h2>
        <div className="grid grid-cols-3 gap-x-2 gap-y-4">
          {BADGES.map((b) => {
            const ok = b.earned(progress)
            return (
              <div key={b.id} className="flex flex-col items-center gap-1 text-center" title={b.description}>
                <span className={`relative flex size-16 items-center justify-center ${ok ? 'text-or-400 drop-shadow-[0_0_10px_rgb(221_187_114/0.55)]' : 'text-trait'}`}>
                  <svg viewBox="0 0 48 48" className="absolute inset-0 size-full" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                    <rect x="9" y="9" width="30" height="30" className={ok ? 'fill-abysse' : 'fill-nuit'} />
                    <rect x="9" y="9" width="30" height="30" transform="rotate(45 24 24)" className={ok ? 'fill-abysse' : 'fill-nuit'} />
                    <circle cx="24" cy="24" r="12.5" />
                  </svg>
                  <span className={`relative text-2xl ${ok ? '' : 'opacity-25 grayscale'}`}>{b.emoji}</span>
                </span>
                <span className={`text-sm leading-tight ${ok ? 'font-bold text-or-300' : 'text-brume'}`}>{b.title}</span>
                <span className="muted text-[0.7rem] leading-tight">{b.description}</span>
              </div>
            )
          })}
        </div>
      </section>

      <section className="card">
        <h2 className="mb-2 font-bold">Paliers</h2>
        {TIERS.map((t) => (
          <div key={t.id} className="flex items-center justify-between py-1 text-sm">
            <span>{t.emoji} {t.level}.{t.order} · {t.title}</span>
            <span>{tierDone(progress, t.id) ? '✅' : `${(progress.completed[t.id] ?? []).length} sections`}</span>
          </div>
        ))}
      </section>
    </div>
  )
}
