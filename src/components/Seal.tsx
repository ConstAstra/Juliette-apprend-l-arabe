import { toArabicDigits } from '../lib/arabic'

export type SealState = 'done' | 'current' | 'todo' | 'sealed'

/** Sceau octogonal portant un chiffre arabe : l'état du palier se lit à sa lueur. */
export function Seal({ n, state, className = '' }: { n: number; state: SealState; className?: string }) {
  const styles: Record<SealState, string> = {
    done: 'fill-or-400 stroke-or-300 text-nuit drop-shadow-[0_0_8px_rgb(221_187_114/0.7)]',
    current: 'fill-abysse stroke-lueur-400 text-lueur-300 drop-shadow-[0_0_10px_rgb(95_220_201/0.8)] animate-[pulse_3s_ease-in-out_infinite]',
    todo: 'fill-abysse stroke-or-500/70 text-or-300',
    sealed: 'fill-nuit stroke-trait text-brume',
  }
  return (
    <span className={`relative inline-flex size-12 shrink-0 items-center justify-center ${styles[state]} ${className}`}>
      <svg viewBox="0 0 48 48" className="absolute inset-0 size-full" aria-hidden>
        <rect x="9" y="9" width="30" height="30" strokeWidth="1.5" />
        <rect x="9" y="9" width="30" height="30" strokeWidth="1.5" transform="rotate(45 24 24)" />
      </svg>
      <span lang="ar" className="relative font-arabic text-xl leading-none font-bold">
        {state === 'sealed' ? '✦' : toArabicDigits(n)}
      </span>
    </span>
  )
}
