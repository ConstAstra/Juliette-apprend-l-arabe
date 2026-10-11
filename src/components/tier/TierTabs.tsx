import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Tier } from '../../data/types'
import { letterById } from '../../data/letters'
import { FORM_LABELS, letterForm, type FormName } from '../../lib/arabic'
import { speak } from '../../lib/speech'
import { useProgress } from '../../store/progress'
import { Ar } from '../Ar'
import { LessonView } from '../LessonView'
import { PhraseRow } from '../PhraseRow'
import { Quiz } from '../Quiz'
import { SpeakButton } from '../SpeakButton'
import { TraceCanvas } from '../TraceCanvas'
import { ConversationTab } from './ConversationTab'
import { Dialogue } from '../Dialogue'

const FORMS = Object.keys(FORM_LABELS) as FormName[]

export function AlphabetTab({ tier }: { tier: Tier }) {
  const letters = (tier.letters ?? []).map(letterById).filter((l) => l !== undefined)
  return (
    <div className="space-y-3">
      <p className="muted">Les lettres de ce palier, sous leurs quatre formes (de droite à gauche : isolée, initiale, médiane, finale).</p>
      {letters.map((l) => (
        <Link key={l.id} to={`/alphabet/${l.id}`} className="card flex items-center gap-3">
          <SpeakButton text={l.arName} />
          <div className="w-20 shrink-0">
            <div className="font-bold">{l.name}</div>
            <div className="muted text-sm">{l.translit}</div>
          </div>
          <div dir="rtl" className="flex flex-1 justify-between">
            {FORMS.map((f) => (
              <Ar key={f} text={letterForm(l.char, l.joins, f)} keepTashkeel className="text-3xl" />
            ))}
          </div>
        </Link>
      ))}
    </div>
  )
}

export function GrammarTab({ tier, onQuizDone }: { tier: Tier; onQuizDone: (score: number) => void }) {
  return (
    <div className="space-y-4">
      {tier.grammar.lessons.map((l) => (
        <LessonView key={l.title} lesson={l} />
      ))}
      <h3 className="text-lg font-bold">Vérifiez vos acquis</h3>
      <Quiz questions={tier.grammar.quiz} onFinish={onQuizDone} />
    </div>
  )
}

export function LessonsTab({ lessons }: { lessons: Tier['pronunciation'] }) {
  return (
    <div className="space-y-4">
      {lessons.map((l) => (
        <LessonView key={l.title} lesson={l} />
      ))}
    </div>
  )
}

export function WritingTab({ tier }: { tier: Tier }) {
  const letters = (tier.letters ?? []).map(letterById).filter((l) => l !== undefined)
  const [current, setCurrent] = useState(0)
  return (
    <div className="space-y-4">
      <LessonsTab lessons={tier.writing} />
      {letters.length > 0 && (
        <section className="card space-y-3">
          <h3 className="text-lg font-bold">Atelier de tracé</h3>
          <div dir="rtl" className="flex flex-wrap gap-2">
            {letters.map((l, i) => (
              <button
                key={l.id}
                onClick={() => setCurrent(i)}
                aria-pressed={i === current}
                className={`size-11 rounded-xl font-arabic text-2xl ${i === current ? 'bg-or-400 text-nuit' : 'bg-abysse-2'}`}
              >
                {l.char}
              </button>
            ))}
          </div>
          <TraceCanvas glyph={letters[current].char} />
        </section>
      )}
    </div>
  )
}

export function VocabularyTab({ tier }: { tier: Tier }) {
  return (
    <div className="card divide-y divide-trait">
      {tier.vocabulary.map((w) => (
        <PhraseRow key={w.id} phrase={w} />
      ))}
    </div>
  )
}

export function MindMapTab({ tier }: { tier: Tier }) {
  const { center, branches } = tier.mindmap
  return (
    <div className="space-y-3">
      <div className="mx-auto flex w-fit flex-col items-center rounded-full border border-or-400/60 bg-abysse px-6 py-3 text-or-300 shadow-[0_0_30px_-6px_rgb(221_187_114/0.5)]">
        <Ar text={center.ar} className="text-3xl" />
        <span className="text-sm">{center.fr}</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {branches.map((b) => (
          <div key={b.label} className="card border-t-4 border-lueur-400">
            <h3 className="font-bold">{b.label}</h3>
            <div className="divide-y divide-trait">
              {b.items.map((it, i) => (
                <PhraseRow key={i} phrase={it} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function StoryTab({ tier }: { tier: Tier }) {
  const [showFr, setShowFr] = useState(false)
  const translit = useProgress((s) => s.settings.translit)
  const rate = useProgress((s) => s.settings.speechRate)
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-bold">{tier.story.title}</h3>
        <div className="flex gap-2">
          <button className="btn-soft" onClick={() => speak(tier.story.lines.map((l) => l.ar).join(' '), rate)}>🔊 Tout lire</button>
          <button className="btn-soft" onClick={() => setShowFr((v) => !v)}>{showFr ? 'Masquer' : 'Traduire'}</button>
        </div>
      </div>
      <div className="card space-y-3">
        {tier.story.lines.map((l, i) => (
          <div key={i} className="flex items-start gap-3">
            <SpeakButton text={l.ar} />
            <div className="flex-1 text-right">
              <Ar as="p" text={l.ar} className="text-2xl" />
              {translit && <p className="muted text-left text-sm italic" dir="ltr">{l.tr}</p>}
              {showFr && <p className="text-left text-sm" dir="ltr">{l.fr}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PodcastTab({ tier }: { tier: Tier }) {
  return <Dialogue podcast={tier.podcast} />
}

export function DialectTab({ tier }: { tier: Tier }) {
  const dialects = [...new Set(tier.dialect.map((d) => d.dialect))]
  return (
    <div className="space-y-3">
      <div className="card border-l-4 border-or-400 text-sm">
        <b>Hors tronc commun.</b> Ces expressions appartiennent aux dialectes parlés. Elles ne s’écrivent guère et varient d’un pays à l’autre ; l’arabe standard (en regard) reste compris partout.
      </div>
      {dialects.map((d) => (
        <section key={d} className="card">
          <h3 className="font-bold">{d}</h3>
          <div className="divide-y divide-trait">
            {tier.dialect.filter((x) => x.dialect === d).map((x, i) => (
              <div key={i}>
                <PhraseRow phrase={x} keepTashkeel />
                <p className="muted pb-2 text-right text-sm">
                  Standard : <Ar text={x.msa} />
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export { ConversationTab }
