/** Icônes au trait, dessinées pour l'univers nocturne de l'application. */
type P = { className?: string }
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

// Arc outrepassé, comme une porte andalouse.
export const IconArch = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <path d="M5 21V11a7 7 0 0 1 14 0v10" />
    <path d="M9 21v-7a3 3 0 0 1 6 0v7" />
    <path d="M3 21h18" />
  </svg>
)

// Astrolabe : cercle gradué et alidade.
export const IconAstrolabe = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <circle cx="12" cy="13" r="8" />
    <circle cx="12" cy="13" r="4.5" />
    <path d="M12 2.5V5M5.5 19.5l13-13" />
    <circle cx="12" cy="13" r="0.8" fill="currentColor" />
  </svg>
)

export const IconCards = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <rect x="7" y="4" width="12" height="16" rx="2" />
    <path d="M4.5 7.5 4 17a2 2 0 0 0 2 2.1" />
    <path d="M11 10h4M11 13h4" />
  </svg>
)

// Croissant et étoile.
export const IconCrescent = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <path d="M15.5 4.5a8 8 0 1 0 4 12.5 6.5 6.5 0 1 1-4-12.5Z" />
    <path d="m18 6 .6 1.4L20 8l-1.4.6L18 10l-.6-1.4L16 8l1.4-.6Z" fill="currentColor" />
  </svg>
)

export const IconFlame = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <path d="M12 21c-3.9 0-6.5-2.6-6.5-6.1 0-3.4 2.6-5.3 3.6-8.4.4 1.8 1.6 3 2.7 3.4.1-2.6 1.4-5 3.6-6.4-.5 3 2.1 5.5 2.1 9.6 0 4.6-2.1 7.9-5.5 7.9Z" />
  </svg>
)

export const IconStar8 = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden>
    <rect x="6" y="6" width="12" height="12" />
    <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" />
  </svg>
)
