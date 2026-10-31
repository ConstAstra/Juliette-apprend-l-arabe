import type { ReactNode } from 'react'

const Star = ({ className }: { className: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden className={`pointer-events-none absolute size-5 text-or-400 ${className}`}>
    <g fill="currentColor" opacity="0.9">
      <rect x="7" y="7" width="10" height="10" />
      <rect x="7" y="7" width="10" height="10" transform="rotate(45 12 12)" />
    </g>
    <circle cx="12" cy="12" r="2.2" fill="#0a0f1f" />
  </svg>
)

/** Carte d'apparat : double filet d'or et étoiles aux quatre coins, pour les rendez-vous du jour. */
export function Ornate({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`relative rounded-2xl border border-or-400/50 bg-abysse/85 p-5 shadow-[0_0_40px_-18px_rgb(221_187_114/0.6)] ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-1.5 rounded-xl border border-or-400/20" />
      <Star className="-top-2.5 -left-2.5" />
      <Star className="-top-2.5 -right-2.5" />
      <Star className="-bottom-2.5 -left-2.5" />
      <Star className="-right-2.5 -bottom-2.5" />
      <div className="relative">{children}</div>
    </section>
  )
}
