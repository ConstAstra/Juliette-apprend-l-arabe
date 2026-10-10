import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ANSWERS, CAN_DO, placementResult } from '../data/placement'
import { useProgress } from '../store/progress'

export function PlacementPage() {
  const placement = useProgress((s) => s.placement)
  const setPlacement = useProgress((s) => s.setPlacement)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<string | null>(null)
  const total = CAN_DO.reduce((n, b) => n + b.statements.length, 0)
  const answered = Object.keys(answers).length

  if (result) {
    return (
      <div className="card space-y-3 text-center">
        <p className="text-5xl">🧭</p>
        <h1 className="text-2xl font-extrabold">Votre niveau estimé : {result}</h1>
        <p className="muted">
          {result === 'Pré-A1' || result === 'A1'
            ? 'Le palier A1.1 est le point de départ idéal : alphabet, voyelles et salutations.'
            : 'Les paliers au-delà de A1 sont en préparation ; en attendant, les fiches de référence et les révisions vous attendent.'}
        </p>
        <div className="flex justify-center gap-2">
          <button className="btn-soft" onClick={() => { setResult(null); setAnswers({}) }}>Refaire le test</button>
          <Link to="/paliers" className="btn-primary">Voir les paliers</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">Test de niveau (CECR)</h1>
      <p className="muted">
        Une autoévaluation honnête en {total} affirmations. Le résultat est une estimation, pas un diplôme !
        {placement && <> Dernier résultat : <b>{placement.level}</b> ({new Date(placement.date).toLocaleDateString('fr-FR')}).</>}
      </p>
      {CAN_DO.map((block) => (
        <section key={block.level} className="space-y-2">
          <h2 className="flex items-center gap-2 font-bold">
            <span className="rounded-md border border-lueur-400/50 px-2 py-0.5 font-sans text-sm text-lueur-300">{block.level}</span>
          </h2>
          {block.statements.map((s, i) => {
            const key = `${block.level}-${i}`
            return (
              <fieldset key={key} className="card space-y-2">
                <legend className="sr-only">{s}</legend>
                <p aria-hidden>{s}</p>
                <div className="grid grid-cols-3 gap-1">
                  {ANSWERS.map((a) => (
                    <button
                      key={a.value}
                      type="button"
                      aria-pressed={answers[key] === a.value}
                      onClick={() => setAnswers((prev) => ({ ...prev, [key]: a.value }))}
                      className={`min-h-10 rounded-lg text-sm font-semibold ${answers[key] === a.value ? 'bg-or-400 text-nuit' : 'bg-abysse-2'}`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            )
          })}
        </section>
      ))}
      <div className="sticky bottom-20 z-10">
        <button
          className="btn-primary w-full shadow-lg"
          onClick={() => {
            const level = placementResult(answers)
            setPlacement(level)
            setResult(level)
          }}
        >
          Voir mon niveau ({answered}/{total} réponses)
        </button>
      </div>
    </div>
  )
}
