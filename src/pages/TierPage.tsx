import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { TierSealed } from '../components/TierSealed'
import { Ar } from '../components/Ar'
import { ProgressBar } from '../components/ProgressBar'
import { toArabicDigits } from '../lib/arabic'
import {
  AlphabetTab, ConversationTab, DialectTab, GrammarTab, LessonsTab, MindMapTab, PodcastTab, StoryTab, VocabularyTab, WritingTab,
} from '../components/tier/TierTabs'
import { TIERS, tabsForTier, tierById, type TierTabId } from '../data/tiers'
import type { Tier } from '../data/types'
import { useCompletedTabs, useProgress } from '../store/progress'

function TabContent({ tier, tab, complete }: { tier: Tier; tab: TierTabId; complete: () => void }) {
  switch (tab) {
    case 'alphabet': return <AlphabetTab tier={tier} />
    case 'grammaire': return <GrammarTab tier={tier} onQuizDone={(score) => { if (score >= tier.grammar.quiz.length / 2) complete() }} />
    case 'prononciation': return <LessonsTab lessons={tier.pronunciation} />
    case 'ecriture': return <WritingTab tier={tier} />
    case 'vocabulaire': return <VocabularyTab tier={tier} />
    case 'carte': return <MindMapTab tier={tier} />
    case 'histoire': return <StoryTab tier={tier} />
    case 'podcast': return <PodcastTab tier={tier} />
    case 'conversation': return <ConversationTab tier={tier} onDone={complete} />
    case 'dialectes': return <DialectTab tier={tier} />
  }
}

export function TierPage() {
  const { tierId = '', tab } = useParams()
  const navigate = useNavigate()
  const tier = tierById(tierId)
  const done = useCompletedTabs(tierId)
  const completeTab = useProgress((s) => s.completeTab)
  const tashkeel = useProgress((s) => s.settings.tashkeel)
  const translit = useProgress((s) => s.settings.translit)
  const updateSettings = useProgress((s) => s.updateSettings)
  const addXp = useProgress((s) => s.addXp)
  const [sealed, setSealed] = useState(false)
  const previous = useRef<{ tierId: string; count: number } | null>(null)
  const total = tier ? tabsForTier(tier).length : 0

  // La cérémonie n'a lieu qu'au moment où la dernière section est validée sous nos yeux.
  useEffect(() => {
    const before = previous.current
    previous.current = { tierId, count: done.length }
    if (!before || before.tierId !== tierId) return
    if (before.count < total && done.length === total) {
      addXp(50)
      setSealed(true)
    }
  }, [tierId, done.length, total, addXp])

  if (!tier) return <Navigate to="/paliers" replace />
  const tabs = tabsForTier(tier)
  const active = tabs.find((t) => t.id === tab) ?? tabs[0]
  const activeIndex = tabs.indexOf(active)
  const isDone = done.includes(active.id)
  const nextTier = TIERS[TIERS.indexOf(tier) + 1]
  const complete = () => completeTab(tier.id, active.id)
  // La grammaire et la conversation se valident par l'exercice lui-même.
  const selfValidating = active.id === 'grammaire' || active.id === 'conversation'

  return (
    <div className="space-y-4">
      <Link to="/paliers" className="muted text-sm">← Paliers</Link>
      <header>
        <div className="text-xs tracking-[0.18em] text-lueur-300 uppercase">
          Palier {tier.level}.{tier.order}
        </div>
        <Ar as="p" text={tier.arTitle} className="lueur-or mt-1 text-4xl text-or-300" />
        <h1 className="text-2xl">{tier.title}</h1>
        <p className="muted">{tier.subtitle}</p>
        <ProgressBar value={done.length / tabs.length} className="mt-2" />
        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          <button className="btn-soft min-h-9 py-1 text-sm" onClick={() => updateSettings({ tashkeel: !tashkeel })} aria-pressed={tashkeel}>
            {tashkeel ? 'Avec diacritiques' : 'Sans diacritiques'}
          </button>
          <button className="btn-soft min-h-9 py-1 text-sm" onClick={() => updateSettings({ translit: !translit })} aria-pressed={translit}>
            {translit ? 'Translittération : oui' : 'Translittération : non'}
          </button>
        </div>
      </header>

      {tier.realReading && tashkeel && (
        <div className="card flex flex-wrap items-center justify-between gap-3 border-lueur-400/40">
          <p className="text-sm">Ce palier se lit comme la presse : <b className="text-lueur-300">sans diacritiques</b>. Prête à essayer ?</p>
          <button className="btn-soft" onClick={() => updateSettings({ tashkeel: false })}>Passer en lecture réelle</button>
        </div>
      )}

      {sealed && <TierSealed tier={tier} next={nextTier} onClose={() => setSealed(false)} />}

      <div role="tablist" aria-label="Sections du palier" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        {tabs.map((t, i) => {
          const selected = t.id === active.id
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={selected}
              onClick={() => navigate(`/paliers/${tier.id}/${t.id}`, { replace: true })}
              className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold whitespace-nowrap ${
                selected ? 'bg-or-400 text-nuit' : 'bg-abysse ring-1 ring-trait'
              }`}
            >
              <span lang="ar" className={`font-arabic ${selected ? '' : 'text-or-400'}`}>{toArabicDigits(i + 1)}</span>
              {t.label}
              {done.includes(t.id) && <span aria-label="terminé">✓</span>}
            </button>
          )
        })}
      </div>

      <section role="tabpanel" aria-label={active.label}>
        <TabContent key={`${tier.id}-${active.id}`} tier={tier} tab={active.id} complete={complete} />
      </section>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-trait pt-4">
        {isDone ? (
          <span className="font-semibold text-lueur-400">✓ Section terminée</span>
        ) : selfValidating ? (
          <span className="muted text-sm">{active.id === 'grammaire' ? 'Réussissez le quiz pour valider.' : 'Menez la conversation à son terme pour valider.'}</span>
        ) : (
          <button className="btn-soft" onClick={complete}>J’ai terminé (+10 XP)</button>
        )}
        {activeIndex < tabs.length - 1 ? (
          <button className="btn-primary" onClick={() => navigate(`/paliers/${tier.id}/${tabs[activeIndex + 1].id}`, { replace: true })}>
            {tabs[activeIndex + 1].label} →
          </button>
        ) : nextTier ? (
          <Link className="btn-primary" to={`/paliers/${nextTier.id}`}>Palier suivant →</Link>
        ) : null}
      </div>
    </div>
  )
}
