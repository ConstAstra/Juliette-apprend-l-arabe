import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import { useEffect, type ComponentType } from 'react'
import { useActiveProfile } from '../store/profiles'
import { levelInfo, streak, useProgress } from '../store/progress'
import { Avatar } from './Avatar'
import { IconArch, IconAstrolabe, IconCards, IconCrescent, IconFlame, IconStar8 } from './Icons'
import { Plankton } from './Plankton'
import { UnlockToast } from './UnlockToast'

const LetterIcon = ({ className }: { className?: string }) => (
  <span lang="ar" className={`font-arabic text-[1.6rem] leading-none ${className ?? ''}`}>ب</span>
)

const NAV: { to: string; label: string; Icon: ComponentType<{ className?: string }>; end: boolean }[] = [
  { to: '/', label: 'Accueil', Icon: IconArch, end: true },
  { to: '/alphabet', label: 'Alphabet', Icon: LetterIcon, end: false },
  { to: '/paliers', label: 'Paliers', Icon: IconAstrolabe, end: false },
  { to: '/revisions', label: 'Réviser', Icon: IconCards, end: false },
  { to: '/plus', label: 'Plus', Icon: IconCrescent, end: false },
]

// Pages regroupées sous l'onglet « Plus ».
const UNDER_MORE = ['/vocabulaire', '/fiches', '/test-niveau', '/progres', '/profils', '/avatar']

export function Layout() {
  const profile = useActiveProfile()
  const xp = useProgress((s) => s.xp)
  const activity = useProgress((s) => s.activity)
  const { pathname } = useLocation()

  useEffect(() => window.scrollTo(0, 0), [pathname])

  return (
    <div className="min-h-dvh pb-[calc(5rem+env(safe-area-inset-bottom))]">
      <Plankton />
      <header className="sticky top-0 z-20 border-b border-trait/60 bg-nuit/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-2">
          <Link to="/" className="flex min-w-0 flex-1 items-center gap-2">
            <span lang="ar" dir="rtl" className="lueur-or font-arabic text-3xl leading-none text-or-400">ع</span>
            <span className="truncate font-display text-lg tracking-wide text-or-300">Juliette apprend l’arabe</span>
          </Link>
          <span className="flex items-center gap-1 text-sm text-parchemin" title="Série de jours">
            <IconFlame className="size-4 text-or-400" /> {streak(activity)}
          </span>
          <span className="flex items-center gap-1 text-sm text-parchemin" title="Niveau">
            <IconStar8 className="size-4 text-lueur-400" /> {levelInfo(xp).level}
          </span>
          <Link to="/avatar" aria-label={`Profil : ${profile.name}`}>
            <Avatar profile={profile} size="sm" />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-5">
        <Outlet />
      </main>

      <UnlockToast />

      <nav aria-label="Navigation principale" className="fixed inset-x-0 bottom-0 z-20 border-t border-trait/70 bg-nuit/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
        <ul className="mx-auto grid max-w-3xl grid-cols-5">
          {NAV.map(({ to, label, Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) => {
                  const on = isActive || (to === '/plus' && UNDER_MORE.some((p) => pathname.startsWith(p)))
                  return `group relative flex flex-col items-center gap-1 pt-2.5 pb-2 text-[0.72rem] tracking-wide transition ${on ? 'text-or-300' : 'text-brume hover:text-parchemin'}`
                }}
              >
                {({ isActive }) => {
                  const on = isActive || (to === '/plus' && UNDER_MORE.some((p) => pathname.startsWith(p)))
                  return (
                    <>
                      <span className={`absolute top-0 h-px w-8 rounded-full transition ${on ? 'bg-or-400 shadow-[0_0_10px_2px_rgb(221_187_114/0.6)]' : 'bg-transparent'}`} />
                      <Icon className={`size-6 ${on ? 'lueur-or' : ''}`} />
                      {label}
                    </>
                  )
                }}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
