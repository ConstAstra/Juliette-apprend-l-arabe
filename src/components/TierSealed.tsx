import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import type { Tier } from '../data/types'
import { Ar } from './Ar'
import { Seal } from './Seal'

/** Cérémonie de fin de palier : le sceau se referme dans la nuit. */
export function TierSealed({ tier, next, onClose }: { tier: Tier; next?: Tier; onClose: () => void }) {
  // Rendu dans <body> : l'animation d'apparition des pages piégerait un élément fixe.
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="Palier scellé" className="fixed inset-0 z-40 flex items-center justify-center bg-nuit/85 p-6 backdrop-blur-md">
      <div className="apparition w-full max-w-sm space-y-4 text-center">
        <div className="sceau-entree mx-auto w-fit">
          <Seal n={tier.order} state="done" className="size-28 [&_span]:text-5xl" />
        </div>
        <p className="text-xs tracking-[0.25em] text-lueur-300 uppercase">Palier scellé</p>
        <Ar as="p" text={tier.arTitle} className="lueur-or text-4xl text-or-300" />
        <h2 className="text-2xl">{tier.title}</h2>
        <p className="muted">Toutes les sections sont accomplies. Le sceau est d’or, et +50 XP rejoignent votre trésor.</p>
        <div className="flex flex-col gap-2">
          {next && (
            <Link to={`/paliers/${next.id}`} onClick={onClose} className="btn-primary">
              Ouvrir le palier suivant : {next.title}
            </Link>
          )}
          <button className="btn-soft" onClick={onClose}>Rester ici</button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
