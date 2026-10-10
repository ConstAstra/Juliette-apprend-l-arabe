import { Link } from 'react-router-dom'
import { Avatar } from '../components/Avatar'
import { useActiveProfile } from '../store/profiles'

const LINKS = [
  { to: '/vocabulaire', emoji: '📚', title: 'Vocabulaire', text: 'Le vocabulaire spécial de Juliette, le vocabulaire médical et les thèmes généraux' },
  { to: '/bibliotheque', emoji: '📜', title: 'La bibliothèque', text: 'Contes, fables, poésie et textes modernes, du A2 au B2' },
  { to: '/histoire', emoji: '🏛️', title: 'Histoire du monde arabophone', text: 'Des caravanes à la Nahda : sciences, médecine et navigateurs' },
  { to: '/fiches', emoji: '📑', title: 'Fiches de référence', text: 'Racines et formes verbales, cas, conjugaison, nombres, expressions' },
  { to: '/test-niveau', emoji: '🧭', title: 'Test de niveau', text: 'Autoévaluation selon le CECR' },
  { to: '/progres', emoji: '🏅', title: 'Progrès', text: 'Niveau, badges et calendrier de régularité' },
  { to: '/profils', emoji: '👥', title: 'Profils et réglages', text: 'Diacritiques, voix, sauvegarde' },
]

export function MorePage() {
  const profile = useActiveProfile()
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-extrabold">Plus</h1>
      <Link to="/avatar" className="card flex items-center gap-3">
        <Avatar profile={profile} />
        <div className="flex-1">
          <div className="font-bold">Mon avatar</div>
          <div className="muted text-sm">L’aquarium des animaux marins à débloquer</div>
        </div>
      </Link>
      {LINKS.map((l) => (
        <Link key={l.to} to={l.to} className="card flex items-center gap-3">
          <span className="text-3xl">{l.emoji}</span>
          <div className="flex-1">
            <div className="font-bold">{l.title}</div>
            <div className="muted text-sm">{l.text}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
