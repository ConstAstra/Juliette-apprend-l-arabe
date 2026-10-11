import { useState } from 'react'
import { speak } from '../lib/speech'
import { useProgress } from '../store/progress'

export function SpeakButton({ text, label = 'Écouter', className = '' }: { text: string; label?: string; className?: string }) {
  const rate = useProgress((s) => s.settings.speechRate)
  const [playing, setPlaying] = useState(false)
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={async (e) => {
        e.stopPropagation()
        setPlaying(true)
        await speak(text, rate)
        setPlaying(false)
      }}
      className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-lueur-400/10 text-lg text-lueur-300 transition hover:bg-lueur-400/20 ${playing ? 'animate-pulse' : ''} ${className}`}
    >
      🔊
    </button>
  )
}
