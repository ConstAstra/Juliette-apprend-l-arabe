import { TierCard } from '../components/TierCard'
import { Seal } from '../components/Seal'
import { tierDone } from '../data/badges'
import { CEFR_LEVELS, TIERS } from '../data/tiers'
import { useProgress } from '../store/progress'

/** Le parcours comme une route de voyage : un fil d'or relie les sceaux des paliers. */
export function TiersPage() {
  const progress = useProgress()
  const current = TIERS.find((t) => !tierDone(progress, t.id))
  let step = 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl">Le chemin</h1>
        <p className="muted">
          Le parcours suit les niveaux du CECR. Le tronc commun est l’arabe standard (اَلْفُصْحَى), compris et écrit dans tout le monde arabe ; les dialectes sont présentés à part.
        </p>
      </div>
      {CEFR_LEVELS.map((lvl) => {
        const tiers = TIERS.filter((t) => t.level === lvl.level)
        return (
          <section key={lvl.level} className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="rounded-md border border-lueur-400/50 px-2 py-0.5 text-sm text-lueur-300">{lvl.level}</span>
              <h2 className="text-xl text-or-300">{lvl.title}</h2>
              <span className="h-px flex-1 bg-gradient-to-r from-or-400/40 to-transparent" />
            </div>
            <p className="muted text-sm">{lvl.description}</p>
            {tiers.length ? (
              <ol className="relative space-y-3 before:absolute before:top-6 before:bottom-6 before:left-10 before:w-px before:bg-or-400/30">
                {tiers.map((t) => {
                  step++
                  const state = tierDone(progress, t.id) ? 'done' : t.id === current?.id ? 'current' : 'todo'
                  return (
                    <li key={t.id} className="relative">
                      <TierCard tier={t} state={state} index={step} />
                    </li>
                  )
                })}
              </ol>
            ) : (
              <div className="card flex items-center gap-3 opacity-70">
                <Seal n={0} state="sealed" />
                <div>
                  <div className="font-display text-parchemin">Encore scellé</div>
                  <div className="muted text-sm">Ce chapitre du voyage est en préparation.</div>
                </div>
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
