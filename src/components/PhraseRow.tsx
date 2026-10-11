import type { Phrase } from '../data/types'
import { useProgress } from '../store/progress'
import { Ar } from './Ar'
import { SpeakButton } from './SpeakButton'

export function PhraseRow({ phrase, keepTashkeel }: { phrase: Phrase; keepTashkeel?: boolean }) {
  const translit = useProgress((s) => s.settings.translit)
  return (
    <div className="flex items-center gap-3 py-2">
      <SpeakButton text={phrase.ar} />
      <div className="min-w-0 flex-1">
        <div className="font-semibold">{phrase.fr}</div>
        {translit && <div className="muted text-sm italic">{phrase.tr}</div>}
      </div>
      <Ar text={phrase.ar} keepTashkeel={keepTashkeel} className="text-right text-2xl" />
    </div>
  )
}
