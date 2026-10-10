import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { LessonView } from '../components/LessonView'
import { REFERENCE, refById } from '../data/reference'
import { useProgress } from '../store/progress'

export function ReferenceList() {
  const seen = useProgress((s) => s.seenRefs)
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">Fiches de référence</h1>
      <p className="muted">À consulter à tout moment, indépendamment des paliers. Chaque fiche ouverte ajoute ses cartes au paquet de révision « Grammaire ».</p>
      <div className="grid gap-2">
        {REFERENCE.map((r) => (
          <Link key={r.id} to={`/fiches/${r.id}`} className="card flex items-center gap-3">
            <span className="text-3xl">{r.emoji}</span>
            <div className="flex-1">
              <div className="font-bold">{r.title}</div>
              <div className="muted line-clamp-2 text-sm">{r.intro}</div>
            </div>
            {seen[r.id] && <span className="text-nil-600" aria-label="consultée">✓</span>}
          </Link>
        ))}
      </div>
    </div>
  )
}

export function ReferenceSheet() {
  const { refId = '' } = useParams()
  const sheet = refById(refId)
  const markSeen = useProgress((s) => s.markRefSeen)
  useEffect(() => {
    if (sheet) markSeen(sheet.id)
  }, [sheet, markSeen])
  if (!sheet) return <Navigate to="/fiches" replace />
  return (
    <div className="space-y-4">
      <Link to="/fiches" className="muted text-sm">← Fiches</Link>
      <h1 className="text-2xl font-extrabold">{sheet.emoji} {sheet.title}</h1>
      <p className="card border-l-4 border-nil-500">{sheet.intro}</p>
      {sheet.lessons.map((l) => <LessonView key={l.title} lesson={l} />)}
      <Link to="/revisions/grammaire" className="btn-primary w-full">Réviser ces notions ({sheet.cards.length} cartes)</Link>
    </div>
  )
}
