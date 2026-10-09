export function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100)
  return (
    <div className={`h-2 overflow-hidden rounded-full bg-sable-200 dark:bg-stone-800 ${className}`} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-nil-500 transition-all" style={{ width: `${pct}%` }} />
    </div>
  )
}
