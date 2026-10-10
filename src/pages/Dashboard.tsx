import { Link } from 'react-router-dom'
import { Ar } from '../components/Ar'
import { Avatar } from '../components/Avatar'
import { ProgressBar } from '../components/ProgressBar'
import { TierCard } from '../components/TierCard'
import { tierDone } from '../data/badges'
import { LETTERS } from '../data/letters'
import { TIERS } from '../data/tiers'
import { deckStats } from '../lib/srs'
import { useActiveProfile } from '../store/profiles'
import { levelInfo, streak, useProgress } from '../store/progress'

export function Dashboard() {
  const profile = useActiveProfile()
  const progress = useProgress()
  const lvl = levelInfo(progress.xp)
  const seen = Object.keys(progress.seenLetters).length
  const dueToday = deckStats('vocabulaire', progress).today + deckStats('grammaire', progress).today
  const next = TIERS.find((t) => !tierDone(progress, t.id)) ?? TIERS[TIERS.length - 1]

  return (
    <div className="space-y-5">
      <section className="rounded-3xl bg-gradient-to-br from-terre-600 to-terre-700 p-5 text-white shadow">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Ar as="p" text="أَهْلًا وَسَهْلًا!" className="text-3xl" />
            <h1 className="text-2xl font-extrabold">Bienvenue, {profile.name} !</h1>
          </div>
          <Link to="/avatar" aria-label="Mon avatar">
            <Avatar profile={profile} size="md" />
          </Link>
        </div>
        <p className="opacity-90">Un peu chaque jour : quelques lettres, quelques mots.</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-white/15 p-2">
            <div className="text-xl font-extrabold">{lvl.level}</div>
            <div className="text-xs">niveau</div>
          </div>
          <div className="rounded-xl bg-white/15 p-2">
            <div className="text-xl font-extrabold">{progress.xp}</div>
            <div className="text-xs">XP</div>
          </div>
          <div className="rounded-xl bg-white/15 p-2">
            <div className="text-xl font-extrabold">🔥 {streak(progress.activity)}</div>
            <div className="text-xs">jours d’affilée</div>
          </div>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full bg-white" style={{ width: `${lvl.ratio * 100}%` }} />
        </div>
        <p className="mt-1 text-xs opacity-90">
          {lvl.current} / {lvl.needed} XP avant le niveau {lvl.level + 1}
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold">Continuer</h2>
        <TierCard tier={next} />
      </section>

      <section className="grid grid-cols-2 gap-3">
        <Link to="/alphabet" className="card">
          <Ar as="div" text="أ ب ت" className="text-3xl text-terre-600" />
          <div className="font-bold">Alphabet</div>
          <div className="muted text-sm">
            {seen} / {LETTERS.length} lettres
          </div>
          <ProgressBar value={seen / LETTERS.length} className="mt-2" />
        </Link>
        <Link to="/alphabet/exercice" className="card">
          <div className="text-3xl">🎯</div>
          <div className="font-bold">Reconnaissance</div>
          <div className="muted text-sm">Record : {progress.bestRecognition} / 10</div>
        </Link>
        <Link to="/revisions" className="card col-span-2 flex items-center gap-3">
          <span className="text-3xl">🃏</span>
          <div className="flex-1">
            <div className="font-bold">Révisions du jour</div>
            <div className="muted text-sm">{dueToday ? `${dueToday} cartes vous attendent (vocabulaire et grammaire)` : 'Tout est à jour ✓'}</div>
          </div>
        </Link>
        <Link to="/vocabulaire/plaintes-patients" className="card col-span-2 flex items-center gap-3">
          <span className="text-3xl">🩺</span>
          <div>
            <div className="font-bold">Comprendre ses patients</div>
            <div className="muted text-sm">Le corps, les maux, les maladies, la consultation, les dialectes</div>
          </div>
        </Link>
        <Link to="/vocabulaire" className="card col-span-2 flex items-center gap-3">
          <span className="text-3xl">🐬⛵🍹✒️</span>
          <div>
            <div className="font-bold">Le vocabulaire spécial de Juliette</div>
            <div className="muted text-sm">Animaux marins, voile, cocktails, écriture et lecture</div>
          </div>
        </Link>
      </section>
    </div>
  )
}
