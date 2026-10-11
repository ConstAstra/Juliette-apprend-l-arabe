import { useRef, useState } from 'react'
import type { Tier } from '../data/types'
import { speak, stopSpeaking } from '../lib/speech'
import { useProgress } from '../store/progress'
import { Ar } from './Ar'
import { SpeakButton } from './SpeakButton'

/** Dialogue lu en synthèse vocale, avec mode d'écoute active (transcription masquée). */
export function Dialogue({ podcast }: { podcast: Tier['podcast'] }) {
  const rate = useProgress((s) => s.settings.speechRate)
  const [active, setActive] = useState(true)
  const [revealed, setRevealed] = useState(false)
  const [playing, setPlaying] = useState<number | null>(null)
  const stopped = useRef(false)

  const playAll = async () => {
    stopped.current = false
    for (let i = 0; i < podcast.lines.length && !stopped.current; i++) {
      setPlaying(i)
      await speak(podcast.lines[i].ar, rate)
    }
    setPlaying(null)
  }
  const stop = () => {
    stopped.current = true
    stopSpeaking()
    setPlaying(null)
  }
  const hidden = active && !revealed

  return (
    <div className="space-y-3">
      <div className="card">
        <h3 className="text-lg font-bold">🎧 {podcast.title}</h3>
        <p className="muted">{podcast.intro}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {playing === null ? (
            <button className="btn-primary" onClick={playAll}>▶ Écouter</button>
          ) : (
            <button className="btn-primary" onClick={stop}>■ Arrêter</button>
          )}
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={active} onChange={(e) => { setActive(e.target.checked); setRevealed(false) }} />
            Écoute active (texte masqué)
          </label>
        </div>
      </div>
      <div className="space-y-2">
        {podcast.lines.map((l, i) => (
          <div key={i} className={`card flex items-start gap-3 ${playing === i ? 'ring-2 ring-lueur-400' : ''}`}>
            <span className="w-16 shrink-0 text-sm font-bold text-or-400">{l.speaker}</span>
            <div className="flex-1 text-right">
              {hidden ? (
                <p className="muted text-left text-sm">• • •</p>
              ) : (
                <>
                  <Ar as="p" text={l.ar} className="text-xl" />
                  <p className="muted text-left text-sm" dir="ltr">{l.fr}</p>
                </>
              )}
            </div>
            <SpeakButton text={l.ar} />
          </div>
        ))}
      </div>
      {hidden && (
        <button className="btn-soft w-full" onClick={() => setRevealed(true)}>
          Révéler la transcription
        </button>
      )}
    </div>
  )
}
