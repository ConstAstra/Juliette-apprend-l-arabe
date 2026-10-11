import { Link } from 'react-router-dom'
import type { VocabTheme } from '../data/types'
import { GENERAL_THEMES, JULIETTE_THEMES, MEDICAL_THEMES } from '../data/vocabulary'
import { useProgress } from '../store/progress'

function ThemeCard({ theme }: { theme: VocabTheme }) {
  const seen = useProgress((s) => s.seenThemes[theme.id])
  return (
    <Link to={`/vocabulaire/${theme.id}`} className="card flex items-center gap-3">
      <span className="text-3xl">{theme.emoji}</span>
      <div className="flex-1">
        <div className="font-bold">{theme.title}</div>
        <div className="muted text-sm">{theme.words.length} mots</div>
      </div>
      {seen && <span className="text-lueur-400" aria-label="consulté">✓</span>}
    </Link>
  )
}

export function VocabularyPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">Vocabulaire</h1>
      <section className="rounded-3xl border border-lueur-400/30 bg-gradient-to-br from-lueur-600/35 to-abysse p-4">
        <h2 className="text-lg font-extrabold">✨ Le vocabulaire spécial de Juliette</h2>
        <p className="mb-3 text-sm opacity-90">La mer, la voile, l’art de recevoir et l’amour des livres.</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {JULIETTE_THEMES.map((t) => <ThemeCard key={t.id} theme={t} />)}
        </div>
      </section>
      <section className="rounded-3xl border border-or-400/30 bg-gradient-to-br from-or-600/25 to-abysse p-4">
        <h2 className="text-lg font-extrabold">🩺 Comprendre ses patients</h2>
        <p className="mb-3 text-sm opacity-90">Le vocabulaire de la docteure Juliette : le corps, les maux, les maladies, la consultation, et les plaintes telles qu’on les entend en dialecte.</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {MEDICAL_THEMES.map((t) => <ThemeCard key={t.id} theme={t} />)}
        </div>
      </section>
      <section>
        <h2 className="mb-2 text-lg font-bold">Thèmes généraux</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {GENERAL_THEMES.map((t) => <ThemeCard key={t.id} theme={t} />)}
        </div>
      </section>
    </div>
  )
}
