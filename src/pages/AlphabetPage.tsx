import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Ar } from '../components/Ar'
import { SpeakButton } from '../components/SpeakButton'
import { LETTERS, VOWELS } from '../data/letters'
import { FORM_LABELS, letterForm, type FormName } from '../lib/arabic'
import { useProgress } from '../store/progress'

const FORMS = Object.keys(FORM_LABELS) as FormName[]

export function AlphabetPage() {
  const [form, setForm] = useState<FormName>('isolee')
  const seen = useProgress((s) => s.seenLetters)

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold">L’alphabet arabe</h1>
        <p className="muted">
          28 lettres, lues de droite à gauche. Chacune change de forme selon sa place dans le mot : choisissez une position pour comparer.
        </p>
      </div>

      <div role="tablist" aria-label="Position dans le mot" className="grid grid-cols-4 gap-1 rounded-xl bg-abysse-2 p-1">
        {FORMS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={form === f}
            onClick={() => setForm(f)}
            className={`min-h-10 rounded-lg text-sm font-semibold ${form === f ? 'bg-abysse shadow' : 'muted'}`}
          >
            {FORM_LABELS[f]}
          </button>
        ))}
      </div>

      <div dir="rtl" className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {LETTERS.map((l) => (
          <Link
            key={l.id}
            to={`/alphabet/${l.id}`}
            dir="ltr"
            className={`card flex flex-col items-center p-2 ${seen[l.id] ? 'ring-lueur-400/40' : ''}`}
          >
            <Ar text={letterForm(l.char, l.joins, form)} keepTashkeel className="text-4xl" />
            <span className="text-xs font-semibold">{l.name}</span>
            {seen[l.id] && <span className="sr-only">(découverte)</span>}
          </Link>
        ))}
      </div>

      <Link to="/alphabet/exercice" className="btn-primary w-full">
        🎯 Exercice de reconnaissance
      </Link>

      <section>
        <h2 className="text-lg font-bold">Les voyelles et autres signes (tashkīl)</h2>
        <p className="muted mb-2 text-sm">
          Ces petits signes ne s’écrivent presque jamais dans la vie courante, mais ils guident la lecture des débutants.
        </p>
        <div className="card divide-y divide-trait">
          {VOWELS.map((v) => (
            <div key={v.id} className="flex items-center gap-3 py-2">
              <SpeakButton text={v.mark} />
              <div className="min-w-0 flex-1">
                <div className="font-semibold">
                  {v.name} · <i>{v.tr}</i>
                </div>
                <div className="muted text-sm">{v.desc}</div>
              </div>
              <Ar text={v.mark} keepTashkeel className="text-3xl" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
