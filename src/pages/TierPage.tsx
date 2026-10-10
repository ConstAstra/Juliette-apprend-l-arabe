import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { ProgressBar } from '../components/ProgressBar'
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

  if (!tier) return <Navigate to="/paliers" replace />
  const tabs = tabsForTier(tier)
  const active = tabs.find((t) => t.id === tab) ?? tabs[0]
  const activeIndex = tabs.indexOf(active)
  const isDone = done.includes(active.id)
  const nextTier = TIERS.find((t) => t.order === tier.order + 1 && t.level === tier.level)
  const complete = () => completeTab(tier.id, active.id)
  // La grammaire et la conversation se valident par l'exercice lui-même.
  const selfValidating = active.id === 'grammaire' || active.id === 'conversation'

  return (
    <div className="space-y-4">
      <Link to="/paliers" className="muted text-sm">← Paliers</Link>
      <header>
        <div className="text-xs font-bold tracking-wide text-or-400 uppercase">
          Palier {tier.level}.{tier.order}
        </div>
        <h1 className="text-2xl font-extrabold">{tier.emoji} {tier.title}</h1>
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

      <div role="tablist" aria-label="Sections du palier" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        {tabs.map((t) => {
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
              <span className={t.id === 'alphabet' ? 'font-arabic' : ''}>{t.emoji}</span>
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
