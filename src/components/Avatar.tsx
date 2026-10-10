import { avatarById, colorById } from '../data/avatars'
import type { Profile } from '../store/profiles'

const SIZES = {
  sm: 'size-9 text-xl',
  md: 'size-14 text-3xl',
  lg: 'size-24 text-6xl',
}

export function Avatar({ profile, size = 'md', className = '' }: { profile: Pick<Profile, 'avatar' | 'color'>; size?: keyof typeof SIZES; className?: string }) {
  const animal = avatarById(profile.avatar)
  return (
    <span
      role="img"
      aria-label={animal.fr}
      className={`inline-flex shrink-0 items-center justify-center rounded-full ring-2 ring-white/70 dark:ring-black/30 ${colorById(profile.color).className} ${SIZES[size]} ${className}`}
    >
      {animal.emoji}
    </span>
  )
}
