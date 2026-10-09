import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Ar } from '../components/Ar'
import { SpeakButton } from '../components/SpeakButton'
import { TraceCanvas } from '../components/TraceCanvas'
import { LETTERS } from '../data/letters'
import { TIERS } from '../data/tiers'
import { FORM_LABELS, letterForm, type FormName } from '../lib/arabic'
import { useProgress } from '../store/progress'

// Ordre d'affichage de droite à gauche : isolée, initiale, médiane, finale.
const FORMS: FormName[] = ['isolee', 'initiale', 'mediane', 'finale']

export function LetterPage() {
  const { letterId } = useParams()
  const index = LETTERS.findIndex((l) => l.id === letterId)
  const letter = LETTERS[index]
  const markSeen = useProgress((s) => s.markLetterSeen)

  useEffect(() => {
    if (letter) markSeen(letter.id)
  }, [letter, markSeen])

  if (!letter) return <Navigate to="/alphabet" replace />
  const prev = LETTERS[index - 1]
  const next = LETTERS[index + 1]
  const tier = TIERS.find((t) => t.letters?.includes(letter.id))

  return (
    <div className="space-y-4">
      <Link to="/alphabet" className="muted text-sm">
        ← Alphabet
      </Link>

      <section className="card flex items-center gap-4">
        <Ar text={letter.char} keepTashkeel className="w-24 text-center text-8xl text-terre-600" />
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-extrabold">
            {letter.name} <Ar text={letter.arName} className="text-xl" />
          </h1>
          <p>
            Son : <b>{letter.translit}</b>
          </p>
          <div className="mt-2 flex flex-wrap gap-1 text-xs font-semibold">
            <span className="rounded-full bg-sable-100 px-2 py-1 dark:bg-stone-800">{letter.sun ? '☀️ Lettre solaire' : '🌙 Lettre lunaire'}</span>
            {!letter.joins && <span className="rounded-full bg-sable-100 px-2 py-1 dark:bg-stone-800">Ne se lie pas à gauche</span>}
          </div>
        </div>
        <SpeakButton text={letter.arName} label="Écouter le nom de la lettre" />
      </section>

      <p className="card">{letter.sound}</p>

      <section>
        <h2 className="mb-2 text-lg font-bold">Ses quatre formes</h2>
        <div dir="rtl" className="grid grid-cols-4 gap-2">
          {FORMS.map((f) => (
            <div key={f} dir="ltr" className="card flex flex-col items-center p-2">
              <Ar text={letterForm(letter.char, letter.joins, f)} keepTashkeel className="text-5xl" />
              <span className="muted text-xs font-semibold">{FORM_LABELS[f]}</span>
            </div>
          ))}
        </div>
        {!letter.joins && (
          <p className="muted mt-2 text-sm">
            Comme elle ne se lie jamais à la lettre suivante, ses formes initiale et médiane ressemblent à ses formes isolée et finale.
          </p>
        )}
      </section>

      <section className="card flex items-center gap-3">
        <SpeakButton text={letter.example.ar} />
        <div className="flex-1">
          <div className="muted text-xs font-semibold uppercase">Un mot pour s’en souvenir</div>
          <div className="font-semibold">
            {letter.example.fr} · <i className="muted">{letter.example.tr}</i>
          </div>
        </div>
        <Ar text={letter.example.ar} className="text-3xl" />
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold">À vous de tracer</h2>
        <TraceCanvas glyph={letter.char} />
      </section>

      {tier && (
        <Link to={`/paliers/${tier.id}`} className="btn-soft w-full">
          {tier.emoji} Étudiée dans le palier {tier.level}.{tier.order} — {tier.title}
        </Link>
      )}

      <nav className="flex justify-between gap-2">
        {prev ? <Link className="btn-soft" to={`/alphabet/${prev.id}`}>← {prev.name}</Link> : <span />}
        {next ? (
          <Link className="btn-soft" to={`/alphabet/${next.id}`}>{next.name} →</Link>
        ) : (
          <Link className="btn-primary" to="/alphabet/exercice">Exercice 🎯</Link>
        )}
      </nav>
    </div>
  )
}
