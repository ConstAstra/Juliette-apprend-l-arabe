import { litPath, moonPhase } from '../lib/moon'
import { Ar } from './Ar'

/** La lune de ce soir, dessinée selon sa phase réelle, avec son nom arabe. */
export function Moon() {
  const moon = moonPhase()
  return (
    <div className="flex items-center justify-center gap-3">
      <svg viewBox="0 0 40 40" className="size-10 drop-shadow-[0_0_8px_rgb(240_217_160/0.5)]" role="img" aria-label={`Lune de ce soir : ${moon.fr}`}>
        <circle cx="20" cy="20" r="16" fill="#19243f" stroke="#2a3557" />
        <path d={litPath(moon.phase, 20, 20, 16)} fill="#f0d9a0" />
      </svg>
      <div className="text-left">
        <div className="text-[0.7rem] tracking-[0.18em] text-lueur-300 uppercase">La lune ce soir</div>
        <div className="flex items-baseline gap-2">
          <Ar text={moon.ar} className="text-lg text-or-300" />
          <span className="muted text-sm">{moon.fr}</span>
        </div>
      </div>
    </div>
  )
}
