import { useState } from 'react'
import type { Tier } from '../../data/types'
import { matchesAny } from '../../lib/arabic'
import { canListen, listen, speak } from '../../lib/speech'
import { useProgress } from '../../store/progress'
import { Ar } from '../Ar'
import { SpeakButton } from '../SpeakButton'

interface Turn {
  answer: string
  ok: boolean
}

/** Pratique conversationnelle : l'interlocuteur parle, on répond à la voix ou au clavier. */
export function ConversationTab({ tier, onDone }: { tier: Tier; onDone: () => void }) {
  const rate = useProgress((s) => s.settings.speechRate)
  const [step, setStep] = useState(0)
  const [turns, setTurns] = useState<Turn[]>([])
  const [typed, setTyped] = useState('')
  const [listening, setListening] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const steps = tier.conversation.steps
  const current = steps[step]

  const submit = (answers: string[]) => {
    if (!current || !answers.length) return
    const ok = answers.some((a) => matchesAny(a, current.expected))
    setTurns((t) => [...t, { answer: answers[0], ok }])
    setTyped('')
    setShowHint(false)
    if (ok) {
      const next = step + 1
      setStep(next)
      if (next === steps.length) onDone()
      else speak(steps[next].bot.ar, rate)
    }
  }

  const record = async () => {
    setListening(true)
    const results = await listen()
    setListening(false)
    if (results.length) submit(results)
  }

  return (
    <div className="space-y-3">
      <p className="muted">{tier.conversation.intro}</p>
      <div className="space-y-2">
        {steps.slice(0, step + 1).map((s, i) => (
          <div key={i} className="card flex items-center gap-3">
            <SpeakButton text={s.bot.ar} />
            <div className="flex-1 text-right">
              <Ar as="p" text={s.bot.ar} className="text-xl" />
              <p className="muted text-left text-sm" dir="ltr">{s.bot.fr}</p>
            </div>
          </div>
        ))}
      </div>
      {turns.length > 0 && (
        <div className="space-y-1">
          {turns.slice(-3).map((t, i) => (
            <p key={i} className={`ml-auto w-fit rounded-xl px-3 py-1 ${t.ok ? 'bg-lueur-400/15' : 'bg-grenat/15'}`}>
              <Ar text={t.answer} className="text-lg" /> {t.ok ? '✅' : '↻'}
            </p>
          ))}
        </div>
      )}

      {current ? (
        <div className="card space-y-3">
          <div className="flex flex-wrap gap-2">
            {canListen() && (
              <button className="btn-primary" onClick={record} disabled={listening}>
                {listening ? '🎙️ J’écoute…' : '🎙️ Répondre à voix haute'}
              </button>
            )}
            <button className="btn-soft" onClick={() => setShowHint((v) => !v)}>💡 Indice</button>
          </div>
          {showHint && (
            <div className="flex items-center gap-2 rounded-xl bg-abysse-2 p-2">
              <SpeakButton text={current.hint.ar} />
              <div className="flex-1 text-sm">
                {current.hint.fr} · <i>{current.hint.tr}</i>
              </div>
              <Ar text={current.hint.ar} className="text-xl" />
            </div>
          )}
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              submit([typed])
            }}
          >
            <input
              lang="ar"
              dir="rtl"
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder="اُكْتُبِي هُنَا…"
              aria-label="Votre réponse en arabe"
              className="min-h-11 min-w-0 flex-1 rounded-xl bg-nuit px-3 font-arabic text-xl ring-1 ring-trait"
            />
            <button className="btn-soft" type="submit">Envoyer</button>
          </form>
          {turns.length > 0 && !turns[turns.length - 1].ok && <p className="text-sm">Pas tout à fait : essayez encore ou consultez l’indice.</p>}
        </div>
      ) : (
        <div className="card text-center">
          <p className="text-4xl">🎉</p>
          <p className="font-bold">Conversation réussie !</p>
          <button className="btn-soft mt-2" onClick={() => { setStep(0); setTurns([]) }}>Recommencer</button>
        </div>
      )}
    </div>
  )
}
