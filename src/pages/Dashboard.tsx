import { Link } from 'react-router-dom'
import { Ar } from '../components/Ar'
import { IconCards } from '../components/Icons'
import { DailyGoal } from '../components/DailyGoal'
import { NightWord } from '../components/NightWord'
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
  // Le salut suit l'heure : « bonjour » jusqu'à midi, « bonsoir » ensuite.
  const greeting = new Date().getHours() < 12 ? 'صَبَاحُ الْخَيْرِ' : 'مَسَاءُ الْخَيْرِ'
  const next = TIERS.find((t) => !tierDone(progress, t.id)) ?? TIERS[TIERS.length - 1]

  return (
    <div className="space-y-6">
      <section className="pt-2 text-center">
        <Ar as="p" text={`${greeting}${profile.name === 'Juliette' ? ' يَا جُولْيِيت' : ''}`} className="lueur-or text-4xl text-or-300" />
        <h1 className="mt-1 text-2xl">Bienvenue, {profile.name}</h1>
        <p className="muted">Un peu chaque jour : quelques lettres, quelques mots.</p>
        <div className="mx-auto mt-4 max-w-sm space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-or-300">Niveau {lvl.level}</span>
            <span className="muted">{progress.xp} XP · série de {streak(progress.activity)} j</span>
          </div>
          <ProgressBar value={lvl.ratio} />
          <p className="muted text-xs">{lvl.needed - lvl.current} XP avant le niveau {lvl.level + 1}</p>
        </div>
      </section>

      <section className="card">
        <DailyGoal />
      </section>

      <NightWord />

      <section className="space-y-2">
        <h2 className="text-lg text-or-300">Le chemin continue</h2>
        <TierCard tier={next} />
      </section>

      <section className="grid grid-cols-2 gap-3">
        <Link to="/alphabet" className="card">
          <Ar as="div" text="أ ب ت" className="text-3xl text-or-400" />
          <div className="font-bold">Alphabet</div>
          <div className="muted text-sm">{seen} / {LETTERS.length} lettres</div>
          <ProgressBar value={seen / LETTERS.length} className="mt-2" />
        </Link>
        <Link to="/alphabet/exercice" className="card">
          <Ar as="div" text="؟" className="text-3xl text-lueur-400" />
          <div className="font-bold">Reconnaissance</div>
          <div className="muted text-sm">Record : {progress.bestRecognition} / 10</div>
        </Link>
        <Link to="/revisions" className="card col-span-2 flex items-center gap-3">
          <IconCards className="size-8 text-lueur-400" />
          <div className="flex-1">
            <div className="font-bold">Révisions du jour</div>
            <div className="muted text-sm">{dueToday ? `${dueToday} cartes vous attendent` : 'Tout est à jour'}</div>
          </div>
        </Link>
        <Link to="/bibliotheque" className="card flex flex-col gap-1">
          <Ar as="span" text="حِكَايَات" className="text-2xl text-or-400" />
          <div className="font-bold">La bibliothèque</div>
          <div className="muted text-sm">Juḥā, Sindbad, poésie</div>
        </Link>
        <Link to="/histoire" className="card flex flex-col gap-1">
          <Ar as="span" text="تَارِيخ" className="text-2xl text-or-400" />
          <div className="font-bold">L’histoire</div>
          <div className="muted text-sm">Bagdad, Avicenne, les marins</div>
        </Link>
        <Link to="/vocabulaire" className="card flex flex-col gap-1">
          <span className="text-2xl">🐬 ⛵</span>
          <div className="font-bold">Le monde de Juliette</div>
          <div className="muted text-sm">Mer, voile, cocktails, livres, jeux</div>
        </Link>
        <Link to="/vocabulaire/plaintes-patients" className="card flex flex-col gap-1">
          <span className="text-2xl">🩺</span>
          <div className="font-bold">Comprendre ses patients</div>
          <div className="muted text-sm">Corps, maux, dialectes</div>
        </Link>
      </section>
    </div>
  )
}
