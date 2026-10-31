import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { EXPRESSIONS, expressionOfTheDay } from '../data/expressions'
import { useProgress } from '../store/progress'
import { Ar } from './Ar'
import { Ornate } from './Ornate'
import { SpeakButton } from './SpeakButton'

/** L'expression du jour : découverte à l'ouverture, elle rejoint le carnet. */
export function DailyExpression() {
  const expr = expressionOfTheDay()
  const markSeen = useProgress((s) => s.markExpressionSeen)
  const collected = useProgress((s) => Object.keys(s.seenExpressions).length)

  useEffect(() => markSeen(expr.id), [expr.id, markSeen])

  return (
    <Ornate>
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-lg text-or-300">L’expression du jour</h2>
        <span className="rounded-md border border-lueur-400/40 px-1.5 py-0.5 text-xs text-lueur-300">{expr.register}</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <SpeakButton text={expr.ar} />
        <Ar as="p" text={expr.ar} className="lueur-or flex-1 text-right text-3xl leading-[1.8] text-or-300" />
      </div>
      <p className="muted mt-1 text-right text-sm italic">{expr.tr}</p>
      <dl className="mt-3 space-y-1.5 text-sm">
        <div><dt className="inline text-brume">Mot à mot : </dt><dd className="inline">{expr.literal}</dd></div>
        <div><dt className="inline text-brume">Sens : </dt><dd className="inline font-bold text-parchemin">{expr.meaning}</dd></div>
        <div><dt className="inline text-brume">Quand ? </dt><dd className="inline">{expr.usage}</dd></div>
      </dl>
      <Link to="/expressions" className="mt-3 inline-block text-sm text-lueur-300 underline-offset-4 hover:underline">
        Mon carnet d’expressions · {collected} / {EXPRESSIONS.length}
      </Link>
    </Ornate>
  )
}
