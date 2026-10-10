import { Link } from 'react-router-dom'
import type { Tier } from '../data/types'
import { tabsForTier } from '../data/tiers'
import { useCompletedTabs } from '../store/progress'
import { Ar } from './Ar'
import { ProgressBar } from './ProgressBar'
import { Seal, type SealState } from './Seal'

export function TierCard({ tier, state, index }: { tier: Tier; state?: SealState; index?: number }) {
  const done = useCompletedTabs(tier.id)
  const total = tabsForTier(tier).length
  const s: SealState = state ?? (done.length === total ? 'done' : 'current')
  return (
    <Link to={`/paliers/${tier.id}`} className="card flex items-center gap-3 transition hover:border-or-400/60">
      <Seal n={index ?? tier.order} state={s} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-xs tracking-[0.15em] text-lueur-300 uppercase">{tier.level}.{tier.order}</span>
          <Ar text={tier.arTitle} className="truncate text-lg text-or-300" />
        </div>
        <div className="font-display text-lg leading-tight text-parchemin">{tier.title}</div>
        <div className="muted truncate text-sm">{tier.subtitle}</div>
        <div className="mt-2 flex items-center gap-2">
          <ProgressBar value={done.length / total} className="flex-1" />
          <span className="muted text-xs tabular-nums">{done.length}/{total}</span>
        </div>
      </div>
    </Link>
  )
}
