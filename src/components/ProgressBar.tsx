export function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  const pct = Math.round(Math.max(0, Math.min(1, value)) * 100)
  return (
    <div className={`h-2 overflow-hidden rounded-full bg-trait ${className}`} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-gradient-to-r from-lueur-500 to-lueur-300 shadow-[0_0_10px_rgb(95_220_201/0.6)] transition-all" style={{ width: `${pct}%` }} />
    </div>
  )
}
