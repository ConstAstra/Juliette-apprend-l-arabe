import { useState } from 'react'
import { Ar } from '../components/Ar'
import { PhraseRow } from '../components/PhraseRow'
import { HISTORY } from '../data/history'
import { useProgress } from '../store/progress'

/** Frise chronologique : un fil d'or, une étoile par époque. */
export function HistoryPage() {
  const seen = useProgress((s) => s.seenHistory)
  const markSeen = useProgress((s) => s.markHistorySeen)
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl">Histoire du monde arabophone</h1>
        <p className="muted">Quinze siècles d’une langue, des caravanes de l’Arabie aux villes d’aujourd’hui. Touchez une époque pour l’ouvrir.</p>
      </div>
      <ol className="relative space-y-4 border-l border-or-400/40 pl-6">
        {HISTORY.map((ch) => {
          const isOpen = open === ch.id
          return (
            <li key={ch.id} className="relative">
              <span
                aria-hidden
                className={`absolute top-4 -left-[31px] size-3 rotate-45 border border-or-400 ${seen[ch.id] ? 'bg-or-400 shadow-[0_0_10px_rgb(221_187_114/0.8)]' : 'bg-nuit'}`}
              />
              <div className="card">
                <button
                  type="button"
                  className="w-full text-left"
                  aria-expanded={isOpen}
                  onClick={() => {
                    setOpen(isOpen ? null : ch.id)
                    if (!isOpen) markSeen(ch.id)
                  }}
                >
                  <div className="text-xs tracking-[0.15em] text-lueur-300 uppercase">{ch.era}</div>
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="text-lg text-or-300">{ch.title}</h2>
                    <Ar text={ch.arTitle} className="shrink-0 text-lg text-brume" />
                  </div>
                </button>
                {isOpen && (
                  <div className="mt-3 space-y-3">
                    {ch.paragraphs.map((para, i) => <p key={i}>{para}</p>)}
                    <div className="divide-y divide-trait/60 rounded-xl border border-trait/60 px-3">
                      {ch.words.map((w, i) => <PhraseRow key={i} phrase={w} />)}
                    </div>
                    {ch.fact && (
                      <p className="rounded-xl border border-lueur-400/30 bg-lueur-600/10 p-3 text-sm">
                        <b className="text-lueur-300">Le saviez-vous ?</b> {ch.fact}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
