import { Link } from 'react-router-dom'
import type { VocabTheme } from '../data/types'
import { GENERAL_THEMES, JULIETTE_THEMES } from '../data/vocabulary'
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
      {seen && <span className="text-nil-600" aria-label="consulté">✓</span>}
    </Link>
  )
}

export function VocabularyPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">Vocabulaire</h1>
      <section className="rounded-3xl bg-gradient-to-br from-nil-600 to-nil-700 p-4 text-white">
        <h2 className="text-lg font-extrabold">✨ Le vocabulaire spécial de Juliette</h2>
        <p className="mb-3 text-sm opacity-90">La mer, la voile, l’art de recevoir et l’amour des livres.</p>
        <div className="grid gap-2 text-encre-900 sm:grid-cols-2 dark:text-stone-100">
          {JULIETTE_THEMES.map((t) => <ThemeCard key={t.id} theme={t} />)}
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
