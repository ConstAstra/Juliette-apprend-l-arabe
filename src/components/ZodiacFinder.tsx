import { useState } from 'react'
import { ELEMENTS, signFor, sunSign } from '../lib/zodiac'
import { Ar } from './Ar'
import { Ornate } from './Ornate'
import { SpeakButton } from './SpeakButton'

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
const DAYS_IN = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

/** « Trouver mon signe » : une date de naissance, et le signe s'écrit en arabe. */
export function ZodiacFinder() {
  const now = sunSign()
  const [day, setDay] = useState(1)
  const [month, setMonth] = useState(1)
  const sign = signFor(month, Math.min(day, DAYS_IN[month - 1]))
  const element = ELEMENTS[sign.element]

  return (
    <Ornate>
      <h2 className="text-lg text-or-300">Trouver mon signe</h2>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <label className="text-sm">
          <span className="muted">Jour de naissance</span>
          <select id="signe-jour" value={day} onChange={(e) => setDay(Number(e.target.value))} className="mt-1 min-h-11 w-full rounded-xl border border-trait bg-abysse-2 px-3">
            {Array.from({ length: DAYS_IN[month - 1] }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
          </select>
        </label>
        <label className="text-sm">
          <span className="muted">Mois</span>
          <select id="signe-mois" value={month} onChange={(e) => setMonth(Number(e.target.value))} className="mt-1 min-h-11 w-full rounded-xl border border-trait bg-abysse-2 px-3">
            {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
          </select>
        </label>
      </div>
      <div className="mt-4 text-center" aria-live="polite">
        <div className="text-5xl text-or-300" aria-hidden>{sign.symbol}</div>
        <div className="flex items-center justify-center gap-2">
          <Ar as="p" text={`بُرْجُكِ ${sign.ar}`} className="lueur-or text-3xl text-or-300" />
          <SpeakButton text={`بُرْجُكِ ${sign.ar}`} />
        </div>
        <p className="font-display text-xl">{sign.fr}</p>
        <p className="muted text-sm">
          <i>burjuki {sign.tr}</i> · {sign.dates} · signe {element.fr} (<Ar text={element.ar} />)
          {sign.literal && <> · en arabe, « {sign.literal} »</>}
        </p>
      </div>
      <p className="muted mt-4 border-t border-trait/60 pt-3 text-center text-sm">
        En ce moment, le soleil traverse <Ar text={now.ar} className="text-base text-or-300" /> : {now.fr}.
      </p>
    </Ornate>
  )
}
