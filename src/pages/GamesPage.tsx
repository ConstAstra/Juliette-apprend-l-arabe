import { useMemo, useState, type ReactNode } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Ar } from '../components/Ar'
import { ProgressBar } from '../components/ProgressBar'
import { SpeakButton } from '../components/SpeakButton'
import { AVATARS } from '../data/avatars'
import { FORM_ITEMS, FORM_PATTERNS, FORMS, ROOT_ITEMS } from '../data/games'
import { shuffle, stripTashkeel } from '../lib/arabic'
import { useProgress } from '../store/progress'

const GAMES = [
  { id: 'racines', title: 'Le chasseur de racines', ar: 'صَيَّادُ الْجُذُورِ', text: 'Retrouvez les trois consonnes cachées au cœur d’un mot.' },
  { id: 'formes', title: 'Devine la forme', ar: 'خَمِّنِ الْوَزْنَ', text: 'À quelle forme, de I à X, appartient ce verbe ?' },
  { id: 'memoire', title: 'Le mémo des abysses', ar: 'ذَاكِرَةُ الْأَعْمَاقِ', text: 'Associez chaque animal marin à son nom arabe.' },
]

export function GamesHome() {
  const best = useProgress((s) => s.games)
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl">Les jeux</h1>
        <p className="muted">Pour s’entraîner autrement. Chaque partie rapporte de l’XP.</p>
      </div>
      {GAMES.map((g) => (
        <Link key={g.id} to={`/jeux/${g.id}`} className="card flex items-center gap-3 transition hover:border-or-400/60">
          <div className="min-w-0 flex-1">
            <Ar as="div" text={g.ar} className="text-2xl text-or-300" />
            <div className="font-display text-lg text-parchemin">{g.title}</div>
            <div className="muted text-sm">{g.text}</div>
          </div>
          {best[g.id] !== undefined && <span className="text-sm text-lueur-300 tabular-nums">record {best[g.id]}</span>}
        </Link>
      ))}
    </div>
  )
}

interface Question {
  prompt: ReactNode
  speak?: string
  options: { id: string; label: ReactNode }[]
  answer: string
  explain: ReactNode
}

/** Partie de dix questions à choix multiple, commune aux jeux de racines et de formes. */
function ChoiceGame({ id, title, build }: { id: string; title: string; build: () => Question[] }) {
  const record = useProgress((s) => s.recordGame)
  const [round, setRound] = useState(0)
  // `round` relance un tirage à chaque nouvelle partie.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = useMemo(() => build(), [round, build])
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const q = questions[index]

  if (!q) {
    return (
      <div className="card space-y-3 text-center">
        <p className="lueur-or font-display text-5xl text-or-300">{score} / {questions.length}</p>
        <p>{score === questions.length ? 'Parfait ! Les racines n’ont plus de secret pour vous.' : score >= 7 ? 'Très beau score.' : 'Encore une partie ?'}</p>
        <div className="flex justify-center gap-2">
          <Link to="/jeux" className="btn-soft">Les jeux</Link>
          <button className="btn-primary" onClick={() => { setRound((r) => r + 1); setIndex(0); setScore(0); setPicked(null) }}>Rejouer</button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Link to="/jeux" className="muted text-sm">← Les jeux</Link>
      <h1 className="text-xl">{title}</h1>
      <ProgressBar value={index / questions.length} />
      <div className="card space-y-2 text-center">
        {q.prompt}
        {q.speak && <SpeakButton text={q.speak} />}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {q.options.map((o) => {
          const state = !picked ? 'hover:border-or-400/60' : o.id === q.answer ? 'border-lueur-400 bg-lueur-600/20' : o.id === picked ? 'border-grenat bg-grenat/10' : 'opacity-40'
          return (
            <button
              key={o.id}
              disabled={!!picked}
              onClick={() => { setPicked(o.id); if (o.id === q.answer) setScore((s) => s + 1) }}
              className={`card min-h-16 text-center transition ${state}`}
            >
              {o.label}
            </button>
          )
        })}
      </div>
      {picked && (
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm">{picked === q.answer ? '✓ ' : '✗ '}{q.explain}</div>
          <button
            className="btn-primary shrink-0"
            onClick={() => {
              if (index + 1 === questions.length) record(id, score)
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

const ROOTS = [...new Set(ROOT_ITEMS.map((r) => r.root))]

/** Piège plausible : les trois premières consonnes du mot, préfixes compris. */
function trapRoot(word: string) {
  const letters = [...stripTashkeel(word)].filter((c) => !'اوىيةإأآٌ'.includes(c))
  return letters.slice(0, 3).join(' ')
}

function buildRootGame(): Question[] {
  return shuffle(ROOT_ITEMS).slice(0, 10).map((item) => {
    const trap = trapRoot(item.ar)
    const others = shuffle(ROOTS.filter((r) => r !== item.root && r !== trap)).slice(0, trap !== item.root ? 2 : 3)
    const options = shuffle([item.root, ...(trap !== item.root ? [trap] : []), ...others])
    return {
      prompt: (
        <>
          <p className="muted text-sm">Quelle est la racine de ce mot ?</p>
          <Ar as="p" text={item.ar} keepTashkeel className="lueur-or pt-4 text-5xl text-or-300" />
          <p className="muted text-sm italic">{item.tr}</p>
        </>
      ),
      speak: item.ar,
      options: options.map((r) => ({ id: r, label: <Ar text={r} keepTashkeel className="text-3xl" /> })),
      answer: item.root,
      explain: <>{item.fr} — racine <Ar text={item.root} className="text-lg" /></>,
    }
  })
}

function buildFormGame(): Question[] {
  return shuffle(FORM_ITEMS).slice(0, 10).map((item) => {
    const options = shuffle([item.form, ...shuffle(FORMS.filter((f) => f !== item.form)).slice(0, 3)])
    return {
      prompt: (
        <>
          <p className="muted text-sm">À quelle forme appartient ce verbe ?</p>
          <Ar as="p" text={item.ar} keepTashkeel className="lueur-or pt-4 text-5xl text-or-300" />
          <p className="muted text-sm italic">{item.tr}</p>
        </>
      ),
      speak: item.ar,
      options: options.map((f) => ({ id: f, label: <span className="font-display text-2xl text-parchemin">{f}</span> })),
      answer: item.form,
      explain: <>« {item.fr} » — forme {item.form}, schème <Ar text={FORM_PATTERNS[item.form]} keepTashkeel className="text-lg" /></>,
    }
  })
}

const PAIRS = 6

/** Mémo : retourner deux cartes, associer l'animal et son nom arabe. */
function MemoryGame() {
  const record = useProgress((s) => s.recordGame)
  const [round, setRound] = useState(0)
  const cards = useMemo(() => {
    const animals = shuffle(AVATARS).slice(0, PAIRS)
    return shuffle(animals.flatMap((a) => [
      { key: `${a.id}-e`, pair: a.id, kind: 'emoji' as const, animal: a },
      { key: `${a.id}-a`, pair: a.id, kind: 'ar' as const, animal: a },
    ]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round])
  const [open, setOpen] = useState<string[]>([])
  const [found, setFound] = useState<string[]>([])
  const [moves, setMoves] = useState(0)
  const done = found.length === PAIRS
  // Moins de coups, plus de points : 20 pour une partie parfaite (6 coups).
  const score = Math.max(5, 26 - moves)

  const flip = (key: string, pair: string) => {
    if (open.length === 2 || open.includes(key) || found.includes(pair)) return
    const next = [...open, key]
    setOpen(next)
    if (next.length === 2) {
      setMoves((m) => m + 1)
      const [a, b] = next.map((k) => cards.find((c) => c.key === k)!)
      if (a.pair === b.pair) {
        const nowFound = [...found, a.pair]
        setFound(nowFound)
        setOpen([])
        if (nowFound.length === PAIRS) record('memoire', Math.max(5, 26 - (moves + 1)))
      } else {
        setTimeout(() => setOpen([]), 900)
      }
    }
  }

  return (
    <div className="space-y-4">
      <Link to="/jeux" className="muted text-sm">← Les jeux</Link>
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl">Le mémo des abysses</h1>
        <span className="muted text-sm tabular-nums">{moves} coup{moves > 1 ? 's' : ''} · {found.length}/{PAIRS}</span>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {cards.map((c) => {
          const visible = open.includes(c.key) || found.includes(c.pair)
          return (
            <button
              key={c.key}
              onClick={() => flip(c.key, c.pair)}
              aria-label={visible ? (c.kind === 'emoji' ? c.animal.fr : c.animal.tr) : 'Carte retournée'}
              className={`card flex aspect-square items-center justify-center p-1 transition duration-300 ${
                found.includes(c.pair) ? 'border-lueur-400/70 bg-lueur-600/15' : visible ? 'border-or-400/70' : 'hover:border-or-400/50'
              }`}
            >
              {visible ? (
                c.kind === 'emoji' ? <span className="text-4xl">{c.animal.emoji}</span> : <Ar text={c.animal.ar} className="text-lg leading-tight text-or-300" />
              ) : (
                <svg viewBox="0 0 24 24" className="size-8 text-or-500/50" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                  <rect x="6" y="6" width="12" height="12" />
                  <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" />
                </svg>
              )}
            </button>
          )
        })}
      </div>
      {done && (
        <div className="card space-y-2 text-center">
          <p className="lueur-or font-display text-3xl text-or-300">Bravo ! {moves} coup{moves > 1 ? 's' : ''}</p>
          <p className="muted">+{score} XP</p>
          <button className="btn-primary" onClick={() => { setRound((r) => r + 1); setOpen([]); setFound([]); setMoves(0) }}>Rejouer</button>
        </div>
      )}
    </div>
  )
}

export function GamePlay() {
  const { gameId } = useParams()
  if (gameId === 'racines') return <ChoiceGame id="racines" title="Le chasseur de racines" build={buildRootGame} />
  if (gameId === 'formes') return <ChoiceGame id="formes" title="Devine la forme" build={buildFormGame} />
  if (gameId === 'memoire') return <MemoryGame />
  return <Navigate to="/jeux" replace />
}
