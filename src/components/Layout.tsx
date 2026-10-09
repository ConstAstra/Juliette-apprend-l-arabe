import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useActiveProfile } from '../store/profiles'
import { levelInfo, streak, useProgress } from '../store/progress'

const NAV = [
  { to: '/', label: 'Accueil', icon: '🏠', end: true },
  { to: '/alphabet', label: 'Alphabet', icon: 'ب', end: false },
  { to: '/paliers', label: 'Paliers', icon: '🧭', end: false },
  { to: '/vocabulaire', label: 'Mots', icon: '📚', end: false },
  { to: '/progres', label: 'Progrès', icon: '🏅', end: false },
]

export function Layout() {
  const profile = useActiveProfile()
  const xp = useProgress((s) => s.xp)
  const activity = useProgress((s) => s.activity)
  const { pathname } = useLocation()

  useEffect(() => window.scrollTo(0, 0), [pathname])

  return (
    <div className="min-h-dvh pb-[calc(4.5rem+env(safe-area-inset-bottom))]">
      <header className="sticky top-0 z-20 border-b border-stone-900/5 bg-sable-50/90 backdrop-blur dark:border-white/10 dark:bg-stone-950/90">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-2">
          <Link to="/" className="flex min-w-0 flex-1 items-center gap-2 font-extrabold">
            <span lang="ar" dir="rtl" className="font-arabic text-2xl text-terre-600">ع</span>
            <span className="truncate">Juliette apprend l’arabe</span>
          </Link>
          <span className="text-sm font-semibold" title="Série de jours">🔥 {streak(activity)}</span>
          <span className="text-sm font-semibold" title="Niveau">⭐ {levelInfo(xp).level}</span>
          <Link to="/profils" className="flex size-9 items-center justify-center rounded-full bg-sable-100 text-lg dark:bg-stone-800" aria-label={`Profil : ${profile.name}`}>
            {profile.avatar}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-4">
        <Outlet />
      </main>

      <nav aria-label="Navigation principale" className="fixed inset-x-0 bottom-0 z-20 border-t border-stone-900/10 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur dark:border-white/10 dark:bg-stone-900/95">
        <ul className="mx-auto grid max-w-3xl grid-cols-5">
          {NAV.map((n) => (
            <li key={n.to}>
              <NavLink
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-0.5 py-2 text-xs font-semibold ${isActive ? 'text-terre-600' : 'muted'}`
                }
              >
                <span className={`text-xl leading-none ${n.icon === 'ب' ? 'font-arabic' : ''}`}>{n.icon}</span>
                {n.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
