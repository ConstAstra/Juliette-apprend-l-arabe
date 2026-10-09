import { Link } from 'react-router-dom'
import type { Tier } from '../data/types'
import { tabsForTier } from '../data/tiers'
import { useCompletedTabs } from '../store/progress'
import { ProgressBar } from './ProgressBar'

export function TierCard({ tier }: { tier: Tier }) {
  const done = useCompletedTabs(tier.id)
  const total = tabsForTier(tier).length
  return (
    <Link to={`/paliers/${tier.id}`} className="card flex items-center gap-3 transition hover:ring-terre-500/40">
      <span className="text-3xl">{tier.emoji}</span>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-bold tracking-wide text-terre-600 uppercase">
          {tier.level}.{tier.order}
        </div>
        <div className="font-bold">{tier.title}</div>
        <div className="muted truncate text-sm">{tier.subtitle}</div>
        <ProgressBar value={done.length / total} className="mt-2" />
      </div>
      <span className="muted text-sm">
        {done.length}/{total}
      </span>
    </Link>
  )
}
