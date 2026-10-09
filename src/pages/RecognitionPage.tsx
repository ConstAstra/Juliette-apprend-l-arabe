import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Ar } from '../components/Ar'
import { ProgressBar } from '../components/ProgressBar'
import { SpeakButton } from '../components/SpeakButton'
import { LETTERS } from '../data/letters'
import type { Letter } from '../data/types'
import { FORM_LABELS, letterForm, shuffle, type FormName } from '../lib/arabic'
import { useProgress } from '../store/progress'

const FORMS = Object.keys(FORM_LABELS) as FormName[]
const LENGTH = 10

interface Question {
  letter: Letter
  form: FormName
  /** « glyph » : on montre la lettre, on choisit son nom ; « name » : l'inverse. */
  kind: 'glyph' | 'name'
  options: Letter[]
}

function buildQuestions(pool: Letter[]): Question[] {
  return shuffle(pool)
    .slice(0, LENGTH)
    .map((letter) => ({
      letter,
      form: FORMS[Math.floor(Math.random() * FORMS.length)],
      kind: Math.random() < 0.6 ? 'glyph' : 'name',
      options: shuffle([letter, ...shuffle(LETTERS.filter((l) => l.id !== letter.id)).slice(0, 3)]),
    }))
}

export function RecognitionPage() {
  const seen = useProgress((s) => s.seenLetters)
  const record = useProgress((s) => s.recordRecognition)
  const [onlySeen, setOnlySeen] = useState(false)
  const [round, setRound] = useState(0)
  const pool = onlySeen && Object.keys(seen).length >= 4 ? LETTERS.filter((l) => seen[l.id]) : LETTERS
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = useMemo(() => buildQuestions(pool), [round, onlySeen])
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const restart = () => {
    setRound((r) => r + 1)
    setIndex(0)
    setScore(0)
    setPicked(null)
  }

  const q = questions[index]
  if (!q) {
    return (
      <div className="card space-y-3 text-center">
        <p className="text-5xl">{score === questions.length ? '🏆' : '🎯'}</p>
        <h1 className="text-2xl font-extrabold">
          {score} / {questions.length}
        </h1>
        <p>{score === questions.length ? 'Parfait, mabrūk !' : score >= 7 ? 'Très bien, continuez ainsi !' : 'C’est en répétant qu’on retient.'}</p>
        <div className="flex justify-center gap-2">
          <Link to="/alphabet" className="btn-soft">Alphabet</Link>
          <button className="btn-primary" onClick={restart}>Rejouer</button>
        </div>
      </div>
    )
  }

  const answer = (l: Letter) => {
    if (picked) return
    setPicked(l.id)
    if (l.id === q.letter.id) setScore((s) => s + 1)
  }

  const nextQuestion = () => {
    const final = index + 1 === questions.length
    if (final) record(score)
    setIndex(index + 1)
    setPicked(null)
  }

  return (
    <div className="space-y-4">
      <Link to="/alphabet" className="muted text-sm">← Alphabet</Link>
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-extrabold">Reconnaissance des lettres</h1>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={onlySeen} onChange={(e) => { setOnlySeen(e.target.checked); restart() }} />
          Lettres vues
        </label>
      </div>
      <ProgressBar value={index / questions.length} />
      <p className="muted text-sm">
        Question {index + 1} / {questions.length} · score {score}
      </p>

      <div className="card text-center">
        {q.kind === 'glyph' ? (
          <>
            <p className="muted text-sm">Quelle est cette lettre ? (forme {FORM_LABELS[q.form].toLowerCase()})</p>
            <Ar as="div" text={letterForm(q.letter.char, q.letter.joins, q.form)} keepTashkeel className="my-2 text-8xl" />
          </>
        ) : (
          <>
            <p className="muted text-sm">Trouvez la lettre :</p>
            <p className="my-3 text-3xl font-extrabold">{q.letter.name}</p>
            <p className="muted text-sm">son « {q.letter.translit} »</p>
          </>
        )}
        <SpeakButton text={q.letter.arName} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {q.options.map((o) => {
          const state = !picked ? '' : o.id === q.letter.id ? 'bg-nil-500/15 ring-2 ring-nil-500' : o.id === picked ? 'bg-red-500/10 ring-2 ring-red-500' : 'opacity-50'
          return (
            <button key={o.id} onClick={() => answer(o)} disabled={!!picked} className={`card min-h-16 ${state}`}>
              {q.kind === 'glyph' ? (
                <span className="text-lg font-bold">{o.name}</span>
              ) : (
                <Ar text={letterForm(o.char, o.joins, q.form)} keepTashkeel className="text-4xl" />
              )}
            </button>
          )
        })}
      </div>

      {picked && (
        <div className="flex items-center justify-between gap-3">
          <p>{picked === q.letter.id ? '✅ Bravo !' : `❌ C’était ${q.letter.name}.`}</p>
          <button className="btn-primary" onClick={nextQuestion}>
            {index + 1 === questions.length ? 'Résultat' : 'Suivant →'}
          </button>
        </div>
      )}
    </div>
  )
}
