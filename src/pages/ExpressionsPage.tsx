import { Link } from 'react-router-dom'
import { Ar } from '../components/Ar'
import { ProgressBar } from '../components/ProgressBar'
import { SpeakButton } from '../components/SpeakButton'
import { EXPRESSIONS } from '../data/expressions'
import { useProgress } from '../store/progress'

/** Le carnet : les expressions découvertes jour après jour ; les autres restent voilées. */
export function ExpressionsPage() {
  const seen = useProgress((s) => s.seenExpressions)
  const found = EXPRESSIONS.filter((e) => seen[e.id]).sort((a, b) => seen[b.id].localeCompare(seen[a.id]))
  const hidden = EXPRESSIONS.length - found.length

  return (
    <div className="space-y-5">
      <Link to="/" className="muted text-sm">← Accueil</Link>
      <div>
        <h1 className="text-2xl">Le carnet d’expressions</h1>
        <p className="muted">Une nouvelle expression se révèle chaque jour sur l’accueil. Elles rejoignent aussi vos révisions de vocabulaire.</p>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm"><span className="text-or-300">{found.length} découverte{found.length > 1 ? 's' : ''}</span><span className="muted">{hidden} encore voilée{hidden > 1 ? 's' : ''}</span></div>
        <ProgressBar value={found.length / EXPRESSIONS.length} />
      </div>
      <div className="space-y-3">
        {found.map((e) => (
          <article key={e.id} className="card space-y-1">
            <div className="flex items-center gap-3">
              <SpeakButton text={e.ar} />
              <Ar as="p" text={e.ar} className="flex-1 text-right text-2xl text-or-300" />
            </div>
            <p className="font-bold">{e.meaning}</p>
            <p className="muted text-sm"><i>{e.tr}</i> · {e.literal} · {e.register}</p>
          </article>
        ))}
        {Array.from({ length: Math.min(hidden, 3) }, (_, i) => (
          <div key={i} aria-hidden className="card text-center">
            <p className="voile font-arabic text-2xl text-or-300">كَلِمَاتٌ تَنْتَظِرُ</p>
          </div>
        ))}
        {hidden > 0 && <p className="muted text-center text-sm">Revenez demain pour lever un nouveau voile.</p>}
      </div>
    </div>
  )
}
