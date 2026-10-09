import { stripTashkeel } from '../lib/arabic'
import { useProgress } from '../store/progress'

interface Props {
  text: string
  className?: string
  /** Conserver les diacritiques même en mode « sans » (leçons sur les voyelles). */
  keepTashkeel?: boolean
  as?: 'span' | 'p' | 'div'
}

/** Tout texte arabe passe par ce composant : direction RTL, police dédiée, mode diacritiques. */
export function Ar({ text, className = '', keepTashkeel = false, as: Tag = 'span' }: Props) {
  const tashkeel = useProgress((s) => s.settings.tashkeel)
  return (
    <Tag lang="ar" dir="rtl" className={`font-arabic ${className}`}>
      {tashkeel || keepTashkeel ? text : stripTashkeel(text)}
    </Tag>
  )
}
