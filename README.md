# Juliette apprend l’arabe

Application web progressive (PWA) d’apprentissage de l’arabe, en français. Elle est entièrement statique : tout est stocké sur l’appareil (`localStorage`), sans compte ni serveur.

**Pile technique** : React 19, TypeScript, Vite, Tailwind CSS v4, React Router (`HashRouter`), Zustand (`persist`).

## Contenu

- **Tronc commun : l’arabe standard moderne** (اَلْفُصْحَى). Les expressions dialectales (levantin, égyptien, marocain) sont présentées à part, dans l’onglet « Dialectes » de chaque palier.
- **Alphabet** : les 28 lettres et leurs quatre formes (isolée, initiale, médiane, finale), la prononciation en synthèse vocale, les lettres solaires et lunaires, un atelier de tracé et un exercice de reconnaissance.
- **Paliers CECR** : A1.1 à A1.4 pour l’instant (A2 à C1 en préparation). Chaque palier comprend les onglets alphabet, grammaire (avec quiz), prononciation, écriture, vocabulaire, carte mentale, histoire, podcast dialogué (avec écoute active), conversation (reconnaissance vocale ou saisie) et dialectes.
- **Vocabulaire** : le vocabulaire spécial de Juliette (animaux marins, sports à voile, alcool et cocktails, écriture et lecture) ; « Comprendre ses patients » (le corps, maux et symptômes, maladies, consultation avec dialogue d’écoute, plaintes en dialecte égyptien, levantin et marocain) ; des thèmes généraux.
- **Fiches de référence** : racines trilitères et dix formes verbales (I à X), les trois cas (iʿrāb), conjugaison avec le duel, article et lettres solaires, nombres, expressions idiomatiques.
- **Révisions espacées (Leitner)** : deux paquets distincts, vocabulaire et grammaire.
- **Test de niveau CECR** autoévalué (20 affirmations « je peux… »).
- **Avatars marins** : treize animaux, chacun avec son nom arabe à écouter, débloqués au fil des niveaux (du dauphin à la baleine bleue), sur sept fonds aux couleurs de la mer.
- **Mode avec ou sans diacritiques**, translittération facultative.
- **Progression** : XP, niveaux, série quotidienne, badges, calendrier de régularité.
- **Profils locaux multiples**, sauvegarde et restauration dans un fichier JSON.

## Développement

```bash
npm install
npm run dev          # serveur de développement
npm run check        # typecheck + lint + build (à lancer avant chaque commit)
npm run serve        # sert dist/ sous /Juliette-apprend-l-arabe/ (ne pas utiliser vite preview)
npm run test:e2e     # parcours Playwright sur viewport iPhone (après npm run build)
```

Les tests de bout en bout utilisent `playwright-core` et le Chromium indiqué par `CHROMIUM_PATH` (par défaut `/opt/pw-browsers/chromium`).

## Déploiement

Le workflow `.github/workflows/deploy.yml` construit et publie le site sur GitHub Pages à chaque push sur `main`. Dans les réglages du dépôt, choisissez **Pages → Source : GitHub Actions**.

## Organisation

```
src/
  data/        contenu pédagogique (lettres, paliers, vocabulaire, badges)
  store/       état Zustand : profils et progression par profil
  lib/         outils arabes (diacritiques, formes), synthèse et reconnaissance vocales, sauvegarde
  components/  composants partagés ; tier/ pour les onglets de palier
  pages/       écrans routés
```

Tout texte arabe passe par le composant `<Ar>`, qui pose `lang="ar"`, `dir="rtl"`, la police `font-arabic` et applique le réglage des diacritiques.
