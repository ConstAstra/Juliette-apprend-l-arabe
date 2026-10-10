export type Cefr = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

export interface Letter {
  id: string
  char: string
  name: string
  arName: string
  translit: string
  sound: string
  /** Se lie-t-elle à la lettre suivante ? (faux pour ا د ذ ر ز و) */
  joins: boolean
  /** Lettre solaire : le lām de l'article s'y assimile. */
  sun: boolean
  example: Phrase
}

/** Un fragment d'arabe vocalisé, sa translittération et sa traduction. */
export interface Phrase {
  ar: string
  tr: string
  fr: string
}

export interface Word extends Phrase {
  id: string
}

export interface VocabTheme {
  id: string
  title: string
  emoji: string
  words: Word[]
  note?: string
  /** Dialogue d'écoute facultatif, lu en synthèse vocale. */
  dialogue?: { title: string; intro: string; lines: DialogueLine[] }
}

export interface QuizQuestion {
  question: string
  /** Texte arabe à afficher sous la question, le cas échéant. */
  ar?: string
  options: string[]
  answer: number
  explanation?: string
}

export interface Lesson {
  title: string
  paragraphs: string[]
  examples?: Phrase[]
  /** Tableau facultatif : en-têtes puis lignes ; les cellules préfixées par « ar: » sont en arabe. */
  table?: { headers: string[]; rows: string[][] }
}

export interface MindMap {
  center: Phrase
  branches: { label: string; items: Phrase[] }[]
}

export interface DialogueLine {
  speaker: string
  ar: string
  fr: string
}

export interface ConversationStep {
  bot: Phrase
  /** Réponses acceptées (comparées après normalisation). */
  expected: string[]
  hint: Phrase
}

export type Dialect = 'Levantin' | 'Égyptien' | 'Marocain'

export interface DialectExpression extends Phrase {
  dialect: Dialect
  /** Équivalent en arabe standard. */
  msa: string
}

export interface Tier {
  id: string
  level: Cefr
  order: number
  title: string
  subtitle: string
  emoji: string
  letters?: string[]
  grammar: { lessons: Lesson[]; quiz: QuizQuestion[] }
  pronunciation: Lesson[]
  writing: Lesson[]
  vocabulary: Word[]
  mindmap: MindMap
  story: { title: string; lines: Phrase[] }
  podcast: { title: string; intro: string; lines: DialogueLine[] }
  conversation: { intro: string; steps: ConversationStep[] }
  dialect: DialectExpression[]
}

/** Carte de révision de grammaire (paquet Leitner distinct du vocabulaire). */
export interface GrammarCard {
  id: string
  question: string
  ar?: string
  answer: string
  answerAr?: string
}

export interface RefSheet {
  id: string
  title: string
  emoji: string
  intro: string
  lessons: Lesson[]
  cards: GrammarCard[]
}
