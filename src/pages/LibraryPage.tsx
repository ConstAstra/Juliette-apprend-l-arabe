import { useEffect, useState, type ReactNode } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Ar } from '../components/Ar'
import { PhraseRow } from '../components/PhraseRow'
import { Quiz } from '../components/Quiz'
import { SpeakButton } from '../components/SpeakButton'
import { LIBRARY, textById } from '../data/library'
import type { LibraryText } from '../data/types'
import { speak, stopSpeaking } from '../lib/speech'
import { useProgress } from '../store/progress'

const GENRES: LibraryText['genre'][] = ['Conte', 'Fable', 'Poésie', 'Texte moderne']

const Chip = ({ children }: { children: ReactNode }) => (
  <span className="rounded-md border border-lueur-400/40 px-1.5 py-0.5 text-xs text-lueur-300">{children}</span>
)

export function LibraryList() {
  const read = useProgress((s) => s.readTexts)
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl">La bibliothèque</h1>
        <p className="muted">Contes, fables, poésie et textes d’aujourd’hui. Chaque texte lu enrichit votre paquet de révision.</p>
      </div>
      {GENRES.map((genre) => {
        const texts = LIBRARY.filter((t) => t.genre === genre)
        if (!texts.length) return null
        return (
          <section key={genre} className="space-y-2">
            <h2 className="text-lg text-or-300">{genre === 'Texte moderne' ? 'Textes modernes' : `${genre}s`}</h2>
            {texts.map((t) => (
              <Link key={t.id} to={`/bibliotheque/${t.id}`} className="card flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Chip>{t.level}</Chip>
                    {read[t.id] && <span className="text-xs text-lueur-400">lu ✓</span>}
                  </div>
                  <div className="mt-1 font-bold">{t.title}</div>
                  <div className="muted truncate text-sm">{t.source}</div>
                </div>
                <Ar text={t.arTitle} className="max-w-[45%] text-right text-xl text-or-300" />
              </Link>
            ))}
          </section>
        )
      })}
    </div>
  )
}

export function TextReader() {
  const { textId = '' } = useParams()
  const text = textById(textId)
  const settings = useProgress((s) => s.settings)
  const updateSettings = useProgress((s) => s.updateSettings)
  const read = useProgress((s) => (text ? !!s.readTexts[text.id] : false))
  const markRead = useProgress((s) => s.markTextRead)
  const [revealed, setRevealed] = useState<Record<number, boolean>>({})
  const [allRevealed, setAllRevealed] = useState(false)
  const [reading, setReading] = useState(false)

  useEffect(() => () => stopSpeaking(), [])

  if (!text) return <Navigate to="/bibliotheque" replace />

  const readAll = async () => {
    setReading(true)
    for (const line of text.lines) await speak(line.ar.replace(/\n/g, ' '), settings.speechRate)
    setReading(false)
  }

  return (
    <div className="space-y-5">
      <Link to="/bibliotheque" className="muted text-sm">← Bibliothèque</Link>
      <header className="space-y-1 text-center">
        <div className="mb-3 flex justify-center gap-2"><Chip>{text.genre}</Chip><Chip>{text.level}</Chip></div>
        <Ar as="p" text={text.arTitle} className="lueur-or pt-2 text-4xl text-or-300" />
        <h1 className="text-2xl">{text.title}</h1>
        <p className="muted text-sm italic">{text.source}</p>
      </header>
      <p className="card border-l-2 border-l-or-400/70">{text.intro}</p>

      <div className="flex flex-wrap gap-2">
        {reading ? (
          <button className="btn-primary" onClick={() => { stopSpeaking(); setReading(false) }}>■ Arrêter</button>
        ) : (
          <button className="btn-primary" onClick={readAll}>▶ Écouter le texte</button>
        )}
        <button className="btn-soft" onClick={() => updateSettings({ tashkeel: !settings.tashkeel })} aria-pressed={settings.tashkeel}>
          {settings.tashkeel ? 'Avec diacritiques' : 'Sans diacritiques'}
        </button>
        <button className="btn-soft" onClick={() => setAllRevealed((v) => !v)} aria-pressed={allRevealed}>
          {allRevealed ? 'Voiler les traductions' : 'Tout dévoiler'}
        </button>
      </div>

      <article className="card space-y-1 divide-y divide-trait/60">
        {text.lines.map((line, i) => {
          const open = allRevealed || revealed[i]
          return (
            <div key={i} className="flex items-start gap-3 py-3">
              <SpeakButton text={line.ar.replace(/\n/g, ' ')} />
              <button
                type="button"
                className="min-w-0 flex-1 text-right"
                onClick={() => setRevealed((r) => ({ ...r, [i]: !r[i] }))}
                aria-expanded={open}
                aria-label={open ? 'Voiler la traduction' : 'Dévoiler la traduction'}
              >
                <Ar as="p" text={line.ar} className="text-2xl leading-[2.1] whitespace-pre-line" />
                {open ? (
                  <span className="block text-left" dir="ltr">
                    {settings.translit && <span className="muted block text-sm italic">{line.tr}</span>}
                    <span className="block text-sm text-parchemin">{line.fr}</span>
                  </span>
                ) : (
                  <span className="block text-left text-xs tracking-widest text-brume/70" dir="ltr">· · · toucher pour dévoiler</span>
                )}
              </button>
            </div>
          )
        })}
      </article>

      <section className="space-y-2">
        <h2 className="text-lg text-or-300">Glossaire</h2>
        <div className="card divide-y divide-trait/60">
          {text.glossary.map((w) => <PhraseRow key={w.id} phrase={w} />)}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg text-or-300">Avez-vous compris ?</h2>
        <Quiz questions={text.quiz} onFinish={() => markRead(text.id)} />
      </section>

      {read ? (
        <p className="text-center font-semibold text-lueur-400">✓ Texte lu ; son glossaire a rejoint vos révisions.</p>
      ) : (
        <button className="btn-soft w-full" onClick={() => markRead(text.id)}>J’ai lu ce texte (+15 XP)</button>
      )}
    </div>
  )
}
