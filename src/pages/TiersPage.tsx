import { TierCard } from '../components/TierCard'
import { CEFR_LEVELS, TIERS } from '../data/tiers'

export function TiersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Les paliers</h1>
        <p className="muted">
          Le parcours suit les niveaux du CECR. Le tronc commun est l’arabe standard moderne (اَلْفُصْحَى), compris et écrit dans tout le monde arabe ; les dialectes sont présentés à part.
        </p>
      </div>
      {CEFR_LEVELS.map((lvl) => {
        const tiers = TIERS.filter((t) => t.level === lvl.level)
        return (
          <section key={lvl.level}>
            <h2 className="flex items-baseline gap-2 text-lg font-bold">
              <span className="rounded-md border border-lueur-400/50 px-2 py-0.5 font-sans text-sm text-lueur-300">{lvl.level}</span>
              {lvl.title}
            </h2>
            <p className="muted mb-2 text-sm">{lvl.description}</p>
            {tiers.length ? (
              <div className="grid gap-3">{tiers.map((t) => <TierCard key={t.id} tier={t} />)}</div>
            ) : (
              <div className="card muted text-sm">🔒 Encore scellé — en préparation.</div>
            )}
          </section>
        )
      })}
    </div>
  )
}
