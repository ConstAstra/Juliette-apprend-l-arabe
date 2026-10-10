import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Ar } from '../components/Ar'
import { ProgressBar } from '../components/ProgressBar'
import { SpeakButton } from '../components/SpeakButton'
import { buildSession, deckStats, type ReviewCard } from '../lib/srs'
import { useProgress, type DeckId } from '../store/progress'

const DECKS: { id: DeckId; title: string; emoji: string; description: string }[] = [
  { id: 'vocabulaire', title: 'Vocabulaire', emoji: '📚', description: 'Les mots des paliers entamés et des thèmes consultés.' },
  { id: 'grammaire', title: 'Grammaire', emoji: '📐', description: 'Les questions des paliers et les cartes des fiches de référence.' },
]

export function ReviewHome() {
  const progress = useProgress()
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">Révisions</h1>
      <p className="muted">
        Méthode Leitner : chaque carte réussie monte d’une boîte et revient plus tard (1, 2, 4, 8 puis 16 jours) ; une carte manquée retourne dans la première boîte.
      </p>
      <Link to="/jeux" className="card flex items-center gap-3 border-or-400/40">
        <span lang="ar" className="font-arabic text-3xl text-or-300">جـ</span>
        <div className="flex-1">
          <div className="font-bold">Envie de jouer ?</div>
          <div className="muted text-sm">Racines, formes verbales et mémo des abysses</div>
        </div>
      </Link>
      {DECKS.map((d) => {
        const s = deckStats(d.id, progress)
        return (
          <section key={d.id} className="card space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{d.emoji}</span>
              <div className="flex-1">
                <h2 className="font-bold">{d.title}</h2>
                <p className="muted text-sm">{d.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div><b className="text-lg">{s.due}</b><div className="muted">à revoir</div></div>
              <div><b className="text-lg">{s.fresh}</b><div className="muted">nouvelles</div></div>
              <div><b className="text-lg">{s.mastered}</b><div className="muted">maîtrisées</div></div>
            </div>
            <ProgressBar value={s.total ? s.mastered / s.total : 0} />
            {s.today ? (
              <Link to={`/revisions/${d.id}`} className="btn-primary w-full">Réviser {s.today} carte{s.today > 1 ? 's' : ''}</Link>
            ) : (
              <p className="text-center text-sm font-semibold text-lueur-400">✓ Rien à revoir aujourd’hui</p>
            )}
          </section>
        )
      })}
    </div>
  )
}

function CardFace({ card, revealed }: { card: ReviewCard; revealed: boolean }) {
  return (
    <div className="card flex min-h-64 flex-col items-center justify-center gap-3 text-center">
      {card.frontFr && <p className="text-lg font-semibold">{card.frontFr}</p>}
      {card.frontAr && <Ar as="p" text={card.frontAr} keepTashkeel className="text-4xl" />}
      {revealed && (
        <div className="w-full space-y-1 border-t border-trait pt-3">
          {card.backAr && <Ar as="p" text={card.backAr} keepTashkeel className="text-3xl text-lueur-300" />}
          {card.backFr && <p className="text-lg font-bold">{card.backFr}</p>}
          {card.backTr && <p className="muted italic">{card.backTr}</p>}
        </div>
      )}
      {card.speak && <SpeakButton text={card.speak} />}
    </div>
  )
}

export function ReviewSession() {
  const { deck } = useParams()
  const valid = deck === 'vocabulaire' || deck === 'grammaire'
  const reviewCard = useProgress((s) => s.reviewCard)
  // La séance est figée à l'ouverture : les cartes revues ne doivent pas en sortir en cours de route.
  const [queue, setQueue] = useState<ReviewCard[]>(() => (valid ? buildSession(deck, useProgress.getState()) : []))
  const [total] = useState(queue.length)
  const [revealed, setRevealed] = useState(false)
  const [known, setKnown] = useState(0)

  if (!valid) return <Navigate to="/revisions" replace />
  const card = queue[0]

  if (!card) {
    return (
      <div className="card space-y-3 text-center">
        <p className="text-5xl">🎉</p>
        <h1 className="text-xl font-extrabold">Séance terminée</h1>
        <p>{known} carte{known > 1 ? 's' : ''} sue{known > 1 ? 's' : ''} du premier coup sur {total}.</p>
        <Link to="/revisions" className="btn-primary">Retour aux révisions</Link>
      </div>
    )
  }

  const answer = (ok: boolean) => {
    const first = !queue.slice(1).some((c) => c.id === card.id)
    reviewCard(deck, card.id, ok)
    if (ok && first) setKnown((k) => k + 1)
    // Une carte manquée revient en fin de séance.
    setQueue((q) => (ok ? q.slice(1) : [...q.slice(1), q[0]]))
    setRevealed(false)
  }

  return (
    <div className="space-y-4">
      <Link to="/revisions" className="muted text-sm">← Révisions</Link>
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-extrabold">{deck === 'vocabulaire' ? '📚 Vocabulaire' : '📐 Grammaire'}</h1>
        <span className="muted text-sm">{queue.length} restante{queue.length > 1 ? 's' : ''}</span>
      </div>
      <ProgressBar value={total ? 1 - queue.length / total : 1} />
      <CardFace card={card} revealed={revealed} />
      {revealed ? (
        <div className="grid grid-cols-2 gap-2">
          <button className="btn bg-grenat/15 text-grenat" onClick={() => answer(false)}>À revoir</button>
          <button className="btn bg-lueur-400/15 text-lueur-300" onClick={() => answer(true)}>Je savais ✓</button>
        </div>
      ) : (
        <button className="btn-primary w-full" onClick={() => setRevealed(true)}>Voir la réponse</button>
      )}
    </div>
  )
}
