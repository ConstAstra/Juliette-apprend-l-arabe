import { useState } from 'react'
import { TIERS } from '../data/tiers'
import { ALL_THEMES } from '../data/vocabulary'
import { todayKey } from '../store/progress'
import { Ar } from './Ar'
import { SpeakButton } from './SpeakButton'

const POOL = [...TIERS.flatMap((t) => t.vocabulary), ...ALL_THEMES.flatMap((t) => t.words)]

/** Le même mot pour toute la journée, tiré de tout le vocabulaire. */
function wordOfTheDay() {
  const day = todayKey()
  let h = 0
  for (const c of day) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return POOL[h % POOL.length]
}

export function NightWord() {
  const word = wordOfTheDay()
  const [open, setOpen] = useState(false)
  return (
    <section className="card relative overflow-hidden">
      <div className="pointer-events-none absolute -top-16 -right-10 size-40 rounded-full bg-lueur-400/10 blur-2xl" />
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-lg text-or-300">Le mot de la nuit</h2>
        <span className="text-xs tracking-[0.18em] text-brume uppercase">Un seul par jour</span>
      </div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={open ? word.fr : 'Lever le voile sur le mot de la nuit'}
        className="mt-2 block w-full py-3 text-center"
      >
        <Ar as="div" text={word.ar} className={`lueur-or text-5xl text-or-300 transition duration-700 ${open ? '' : 'voile'}`} />
      </button>
      {open ? (
        <div className="flex items-center justify-center gap-3">
          <div className="text-center">
            <div className="text-lg font-bold">{word.fr}</div>
            <div className="muted italic">{word.tr}</div>
          </div>
          <SpeakButton text={word.ar} />
        </div>
      ) : (
        <p className="muted text-center text-sm">Touchez pour lever le voile.</p>
      )}
    </section>
  )
}
