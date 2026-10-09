import { useState } from 'react'
import type { QuizQuestion } from '../data/types'
import { Ar } from './Ar'

const isArabic = (s: string) => /[؀-ۿ]/.test(s)

/** Questionnaire à choix multiples ; appelle onFinish avec le score final. */
export function Quiz({ questions, onFinish }: { questions: QuizQuestion[]; onFinish?: (score: number) => void }) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const q = questions[index]

  if (!q) {
    return (
      <div className="card text-center">
        <p className="text-4xl">{score === questions.length ? '🏆' : '🎯'}</p>
        <p className="mt-2 text-xl font-bold">
          {score} / {questions.length}
        </p>
        <button className="btn-soft mt-3" onClick={() => { setIndex(0); setScore(0); setPicked(null) }}>
          Recommencer
        </button>
      </div>
    )
  }

  return (
    <div className="card">
      <p className="muted text-sm">
        Question {index + 1} / {questions.length}
      </p>
      <p className="mt-1 font-semibold">{q.question}</p>
      {q.ar && <Ar as="p" text={q.ar} keepTashkeel className="my-2 text-center text-4xl" />}
      <div className="mt-3 grid gap-2">
        {q.options.map((o, i) => {
          const state = picked === null ? '' : i === q.answer ? 'bg-nil-500/15 ring-nil-500' : i === picked ? 'bg-red-500/10 ring-red-500' : 'opacity-60'
          return (
            <button
              key={i}
              disabled={picked !== null}
              onClick={() => {
                setPicked(i)
                if (i === q.answer) setScore((s) => s + 1)
              }}
              className={`min-h-11 rounded-xl px-4 py-2 text-left ring-1 ring-stone-900/10 dark:ring-white/10 ${state}`}
            >
              {isArabic(o) ? <Ar text={o} keepTashkeel className="text-2xl" /> : o}
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-sm">
            {picked === q.answer ? '✅ Bravo !' : '❌ Pas tout à fait.'} {q.explanation}
          </p>
          <button
            className="btn-primary"
            onClick={() => {
              const last = index + 1 === questions.length
              if (last) onFinish?.(score)
              setIndex(index + 1)
              setPicked(null)
            }}
          >
            {index + 1 === questions.length ? 'Résultat' : 'Suivant'}
          </button>
        </div>
      )}
    </div>
  )
}
