import type { Cefr } from './types'

/** Descripteurs « je peux… » inspirés du CECR, adaptés à l'arabe. */
export const CAN_DO: { level: Cefr; statements: string[] }[] = [
  {
    level: 'A1',
    statements: [
      'Je reconnais les lettres arabes et je lis lentement un mot vocalisé.',
      'Je sais saluer, me présenter et dire d’où je viens.',
      'Je comprends des questions très simples si l’on parle lentement.',
      'Je sais écrire mon prénom et quelques mots en arabe.',
    ],
  },
  {
    level: 'A2',
    statements: [
      'Je lis des phrases courtes vocalisées sans l’aide de la translittération.',
      'Je parle simplement de ma famille, de mon travail et de mes loisirs.',
      'Je sais faire des achats, commander au restaurant, demander mon chemin.',
      'Je conjugue un verbe courant au passé et au présent.',
    ],
  },
  {
    level: 'B1',
    statements: [
      'Je lis un texte simple sans diacritiques, en devinant les voyelles.',
      'Je comprends l’essentiel d’un podcast pour apprenants ou d’un journal lent.',
      'Je raconte un événement et je donne mon avis en quelques phrases.',
      'Je reconnais les formes verbales dérivées (II à X) et leur nuance.',
    ],
  },
  {
    level: 'B2',
    statements: [
      'Je lis un article de presse en comprenant la plupart des détails.',
      'Je suis une conversation entre arabophones sur un sujet familier.',
      'J’argumente à l’oral comme à l’écrit avec des connecteurs variés.',
      'J’applique les cas grammaticaux dans un texte soigné.',
    ],
  },
  {
    level: 'C1',
    statements: [
      'Je lis avec aisance des textes littéraires ou spécialisés.',
      'Je comprends films et émissions sans effort excessif, y compris un peu de dialecte.',
      'Je m’exprime avec précision en adaptant mon registre.',
      'Je rédige des textes longs, structurés et nuancés.',
    ],
  },
]

export const ANSWERS = [
  { value: 0, label: 'Pas encore' },
  { value: 1, label: 'En partie' },
  { value: 2, label: 'Oui' },
]

/** Niveau atteint : le plus haut dont la moyenne est ≥ 1,5, sans palier sauté. */
export function placementResult(answers: Record<string, number>): string {
  let reached = 'Pré-A1'
  for (const block of CAN_DO) {
    const scores = block.statements.map((_, i) => answers[`${block.level}-${i}`] ?? 0)
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length
    if (avg < 1.5) break
    reached = block.level
  }
  return reached
}
