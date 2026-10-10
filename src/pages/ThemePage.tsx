import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Ar } from '../components/Ar'
import { PhraseRow } from '../components/PhraseRow'
import { SpeakButton } from '../components/SpeakButton'
import { Dialogue } from '../components/Dialogue'
import { JULIETTE_THEMES, MEDICAL_THEMES, themeById } from '../data/vocabulary'
import { useProgress } from '../store/progress'

export function ThemePage() {
  const { themeId = '' } = useParams()
  const theme = themeById(themeId)
  const markSeen = useProgress((s) => s.markThemeSeen)
  const [cards, setCards] = useState(false)
  const [flipped, setFlipped] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (theme) markSeen(theme.id)
  }, [theme, markSeen])

  if (!theme) return <Navigate to="/vocabulaire" replace />
  const special = JULIETTE_THEMES.includes(theme)
  const medical = MEDICAL_THEMES.includes(theme)

  return (
    <div className="space-y-4">
      <Link to="/vocabulaire" className="muted text-sm">← Vocabulaire</Link>
      <header>
        {special && <div className="text-xs font-bold tracking-wide text-nil-600 uppercase">Le vocabulaire spécial de Juliette</div>}
        {medical && <div className="text-xs font-bold tracking-wide text-sky-700 uppercase dark:text-sky-400">Comprendre ses patients</div>}
        <h1 className="text-2xl font-extrabold">{theme.emoji} {theme.title}</h1>
      </header>
      {theme.note && <p className="card border-l-4 border-nil-500 text-sm">{theme.note}</p>}
      <div className="grid grid-cols-2 gap-1 rounded-xl bg-sable-100 p-1 dark:bg-stone-800">
        <button className={`min-h-10 rounded-lg font-semibold ${!cards ? 'bg-white shadow dark:bg-stone-900' : 'muted'}`} onClick={() => setCards(false)}>Liste</button>
        <button className={`min-h-10 rounded-lg font-semibold ${cards ? 'bg-white shadow dark:bg-stone-900' : 'muted'}`} onClick={() => setCards(true)}>Cartes</button>
      </div>
      {cards ? (
        <div className="grid grid-cols-2 gap-2">
          {theme.words.map((w) => (
            <button
              key={w.id}
              onClick={() => setFlipped((f) => ({ ...f, [w.id]: !f[w.id] }))}
              className="card flex min-h-28 flex-col items-center justify-center gap-1 text-center"
            >
              {flipped[w.id] ? (
                <>
                  <span className="font-semibold">{w.fr}</span>
                  <span className="muted text-sm italic">{w.tr}</span>
                </>
              ) : (
                <Ar text={w.ar} className="text-2xl" />
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="card divide-y divide-stone-900/5 dark:divide-white/10">
          {theme.words.map((w) => <PhraseRow key={w.id} phrase={w} />)}
        </div>
      )}
      {theme.dialogue && <Dialogue podcast={theme.dialogue} />}
      {cards && (
        <p className="muted flex items-center gap-2 text-sm">
          Touchez une carte pour la retourner. <SpeakButton text={theme.words.map((w) => w.ar).join('، ')} label="Écouter toute la liste" />
        </p>
      )}
    </div>
  )
}
