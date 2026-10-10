import { LETTERS } from './letters'
import type { GrammarCard, Phrase, RefSheet } from './types'

const p = (ar: string, tr: string, fr: string): Phrase => ({ ar, tr, fr })
const card = (id: string, question: string, answer: string, extra: Partial<GrammarCard> = {}): GrammarCard => ({ id: `g-${id}`, question, answer, ...extra })

const sun = LETTERS.filter((l) => l.sun)
const moon = LETTERS.filter((l) => !l.sun)

export const REFERENCE: RefSheet[] = [
  /* -------------------------------------------------- Racines et formes */
  {
    id: 'racines',
    title: 'Racines et formes verbales',
    emoji: '🌳',
    intro: 'Le cœur de la grammaire arabe : presque chaque mot se construit sur une racine de trois consonnes, coulée dans un « schème » (وَزْن) qui en précise le sens.',
    lessons: [
      {
        title: 'La racine trilitère',
        paragraphs: [
          'Une racine est une suite de trois consonnes porteuse d’une idée générale. ك ت ب évoque l’écriture, ع ل م le savoir, د ر س l’étude.',
          'En insérant des voyelles et des lettres supplémentaires selon des modèles fixes, on obtient toute une famille de mots. Connaître la racine permet souvent de deviner le sens d’un mot inconnu, et c’est aussi ainsi qu’on cherche dans un dictionnaire arabe.',
        ],
        examples: [
          p('كَتَبَ', 'kataba', 'il a écrit'),
          p('كِتَابٌ', 'kitāb', 'un livre'),
          p('كَاتِبٌ', 'kātib', 'un écrivain (celui qui écrit)'),
          p('مَكْتُوبٌ', 'maktūb', 'écrit (ce qui est écrit), une lettre'),
          p('مَكْتَبٌ', 'maktab', 'un bureau (le lieu où l’on écrit)'),
          p('مَكْتَبَةٌ', 'maktaba', 'une bibliothèque'),
        ],
      },
      {
        title: 'Les schèmes nominaux les plus utiles',
        paragraphs: ['Les grammairiens notent les schèmes avec la racine modèle ف ع ل (f-ʿ-l, « faire »). Il suffit d’y substituer les consonnes d’une autre racine.'],
        table: {
          headers: ['Schème', 'Valeur', 'Exemple'],
          rows: [
            ['ar:فَاعِلٌ', 'celui qui fait (participe actif)', 'ar:كَاتِبٌ'],
            ['ar:مَفْعُولٌ', 'ce qui subit (participe passif)', 'ar:مَكْتُوبٌ'],
            ['ar:مَفْعَلٌ / مَفْعَلَةٌ', 'le lieu de l’action', 'ar:مَكْتَبٌ'],
            ['ar:فِعَالٌ', 'objet, instrument, nom', 'ar:كِتَابٌ'],
            ['ar:فَعَّالٌ', 'métier, action répétée', 'ar:بَحَّارٌ'],
            ['ar:مُفَعِّلٌ', 'participe actif de la forme II', 'ar:مُعَلِّمٌ'],
          ],
        },
      },
      {
        title: 'Les dix formes verbales (أَوْزَانُ الْفِعْلِ)',
        paragraphs: [
          'À partir d’une même racine, l’arabe dérive jusqu’à dix formes verbales, numérotées par convention de I à X. Chacune ajoute une nuance : intensité, causalité, réciprocité, réflexivité, demande…',
          'Aucune racine ne possède toutes les formes, et le sens n’est pas toujours prévisible ; mais les tendances ci-dessous aident énormément à comprendre et à retenir.',
        ],
        table: {
          headers: ['Forme', 'Passé · présent', 'Nuance — exemple', ''],
          rows: [
            ['I', 'ar:فَعَلَ · يَفْعَلُ', 'sens de base — écrire', 'ar:كَتَبَ'],
            ['II', 'ar:فَعَّلَ · يُفَعِّلُ', 'intensif, causatif — enseigner', 'ar:عَلَّمَ'],
            ['III', 'ar:فَاعَلَ · يُفَاعِلُ', 'agir avec, envers quelqu’un — correspondre avec', 'ar:كَاتَبَ'],
            ['IV', 'ar:أَفْعَلَ · يُفْعِلُ', 'causatif — faire sortir', 'ar:أَخْرَجَ'],
            ['V', 'ar:تَفَعَّلَ · يَتَفَعَّلُ', 'réfléchi de II — apprendre', 'ar:تَعَلَّمَ'],
            ['VI', 'ar:تَفَاعَلَ · يَتَفَاعَلُ', 'réciproque — s’écrire mutuellement', 'ar:تَكَاتَبَ'],
            ['VII', 'ar:اِنْفَعَلَ · يَنْفَعِلُ', 'passif, se laisser… — se briser', 'ar:اِنْكَسَرَ'],
            ['VIII', 'ar:اِفْتَعَلَ · يَفْتَعِلُ', 'réfléchi, pour soi — écouter attentivement', 'ar:اِسْتَمَعَ'],
            ['IX', 'ar:اِفْعَلَّ · يَفْعَلُّ', 'couleurs, défauts — rougir', 'ar:اِحْمَرَّ'],
            ['X', 'ar:اِسْتَفْعَلَ · يَسْتَفْعِلُ', 'demander, juger, utiliser — utiliser', 'ar:اِسْتَخْدَمَ'],
          ],
        },
      },
      {
        title: 'Une racine, plusieurs formes : ع ل م',
        paragraphs: ['Voyez comment la racine du savoir se déploie : savoir, enseigner (faire savoir), apprendre (se faire savoir), s’informer (chercher à savoir).'],
        examples: [
          p('عَلِمَ', 'ʿalima', 'savoir (forme I)'),
          p('عَلَّمَ', 'ʿallama', 'enseigner (forme II)'),
          p('تَعَلَّمَ', 'taʿallama', 'apprendre (forme V)'),
          p('اِسْتَعْلَمَ', 'istaʿlama', 's’informer (forme X)'),
          p('عِلْمٌ', 'ʿilm', 'la science, le savoir'),
          p('مُعَلِّمٌ', 'muʿallim', 'un professeur'),
        ],
      },
    ],
    cards: [
      card('racine-ktb', 'Quelle idée porte la racine ك ت ب ?', 'L’écriture', { answerAr: 'كَتَبَ' }),
      card('schème-faail', 'Que désigne le schème فَاعِل ?', 'Celui qui fait l’action (participe actif)', { answerAr: 'كَاتِبٌ' }),
      card('schème-mafool', 'Que désigne le schème مَفْعُول ?', 'Ce qui subit l’action (participe passif)', { answerAr: 'مَكْتُوبٌ' }),
      card('schème-mafal', 'Que désigne le schème مَفْعَل ?', 'Le lieu de l’action', { answerAr: 'مَكْتَبٌ' }),
      card('forme-2', 'Forme II : schème et nuance ?', 'فَعَّلَ — intensif ou causatif', { ar: 'عَلَّمَ', answerAr: 'فَعَّلَ' }),
      card('forme-3', 'Forme III : schème et nuance ?', 'فَاعَلَ — agir avec quelqu’un', { ar: 'كَاتَبَ', answerAr: 'فَاعَلَ' }),
      card('forme-4', 'Forme IV : schème et nuance ?', 'أَفْعَلَ — causatif', { ar: 'أَخْرَجَ', answerAr: 'أَفْعَلَ' }),
      card('forme-5', 'Forme V : schème et nuance ?', 'تَفَعَّلَ — réfléchi de la forme II', { ar: 'تَعَلَّمَ', answerAr: 'تَفَعَّلَ' }),
      card('forme-6', 'Forme VI : schème et nuance ?', 'تَفَاعَلَ — réciproque', { ar: 'تَكَاتَبَ', answerAr: 'تَفَاعَلَ' }),
      card('forme-7', 'Forme VII : schème et nuance ?', 'اِنْفَعَلَ — passif, se laisser faire', { ar: 'اِنْكَسَرَ', answerAr: 'اِنْفَعَلَ' }),
      card('forme-8', 'Forme VIII : schème et nuance ?', 'اِفْتَعَلَ — réfléchi, pour soi', { ar: 'اِسْتَمَعَ', answerAr: 'اِفْتَعَلَ' }),
      card('forme-9', 'Forme IX : schème et nuance ?', 'اِفْعَلَّ — couleurs et défauts', { ar: 'اِحْمَرَّ', answerAr: 'اِفْعَلَّ' }),
      card('forme-10', 'Forme X : schème et nuance ?', 'اِسْتَفْعَلَ — demander, juger, utiliser', { ar: 'اِسْتَخْدَمَ', answerAr: 'اِسْتَفْعَلَ' }),
    ],
  },

  /* -------------------------------------------------- Cas */
  {
    id: 'cas',
    title: 'Les trois cas (اَلْإِعْرَابُ)',
    emoji: '🎚️',
    intro: 'Trois cas seulement, marqués par la voyelle finale du mot — et souvent muets à l’oral. Une notion contre-intuitive pour un francophone, mais très régulière.',
    lessons: [
      {
        title: 'Nominatif, accusatif, génitif',
        paragraphs: [
          'La fonction d’un nom dans la phrase se lit à sa dernière voyelle. Le nominatif (مَرْفُوعٌ) se termine en -u : c’est le cas du sujet et de l’attribut. L’accusatif (مَنْصُوبٌ) se termine en -a : complément d’objet, compléments circonstanciels. Le génitif (مَجْرُورٌ) se termine en -i : après une préposition, ou pour le complément du nom.',
          'Quand le nom est indéfini, la voyelle est « nunnée » (tanwīn) : -un, -an, -in. À l’accusatif indéfini, on ajoute un alif muet : كِتَابًا.',
        ],
        table: {
          headers: ['Cas', 'Défini', 'Indéfini', 'Emploi'],
          rows: [
            ['Nominatif', 'ar:اَلْكِتَابُ', 'ar:كِتَابٌ', 'sujet, attribut'],
            ['Accusatif', 'ar:اَلْكِتَابَ', 'ar:كِتَابًا', 'complément d’objet'],
            ['Génitif', 'ar:اَلْكِتَابِ', 'ar:كِتَابٍ', 'après préposition, complément du nom'],
          ],
        },
      },
      {
        title: 'Les cas en action',
        paragraphs: ['Le même mot change de terminaison selon sa fonction :'],
        examples: [
          p('اَلطَّالِبُ هُنَا.', 'aṭ-ṭālibu hunā.', 'L’étudiant est ici. (nominatif : sujet)'),
          p('رَأَيْتُ الطَّالِبَ.', 'ra’aytu ṭ-ṭāliba.', 'J’ai vu l’étudiant. (accusatif : objet)'),
          p('مَعَ الطَّالِبِ', 'maʿa ṭ-ṭālibi', 'avec l’étudiant (génitif : après préposition)'),
          p('كِتَابُ الطَّالِبِ', 'kitābu ṭ-ṭālibi', 'le livre de l’étudiant (génitif : complément du nom)'),
        ],
      },
      {
        title: 'Duel et pluriel : les cas se voient aussi',
        paragraphs: [
          'Au duel et au pluriel masculin régulier, l’accusatif et le génitif partagent une même terminaison, distincte du nominatif. Celle-ci s’entend toujours, même dans la langue courante.',
        ],
        table: {
          headers: ['', 'Nominatif', 'Accusatif / génitif'],
          rows: [
            ['Duel', 'ar:مُعَلِّمَانِ', 'ar:مُعَلِّمَيْنِ'],
            ['Pluriel masc.', 'ar:مُعَلِّمُونَ', 'ar:مُعَلِّمِينَ'],
          ],
        },
      },
      {
        title: 'Pourquoi on ne les entend presque pas',
        paragraphs: [
          'En fin de phrase (à la « pause », وَقْف), on supprime la voyelle finale : on dit « al-kitāb » et non « al-kitābu ». Dans les dialectes, les cas ont disparu. On les prononce surtout dans la lecture soignée, les discours, la poésie et les informations.',
          'Conseil : apprenez à les reconnaître à l’écrit, sans vous paralyser à l’oral.',
        ],
      },
    ],
    cards: [
      card('cas-nom', 'Quelle voyelle finale marque le nominatif ?', 'ḍamma : -u (indéfini -un)', { answerAr: 'اَلْكِتَابُ' }),
      card('cas-acc', 'Quelle voyelle finale marque l’accusatif ?', 'fatḥa : -a (indéfini -an, avec alif)', { answerAr: 'كِتَابًا' }),
      card('cas-gen', 'Quelle voyelle finale marque le génitif ?', 'kasra : -i (indéfini -in)', { answerAr: 'اَلْكِتَابِ' }),
      card('cas-prep', 'Quel cas après une préposition ?', 'Le génitif', { ar: 'فِي الْبَيْتِ' }),
      card('cas-sujet', 'À quel cas est le sujet ?', 'Le nominatif', { ar: 'اَلطَّالِبُ هُنَا' }),
      card('cas-duel', 'Duel : terminaison au nominatif ? à l’accusatif-génitif ?', '-āni / -ayni', { answerAr: 'ـَانِ / ـَيْنِ' }),
      card('cas-pluriel', 'Pluriel masculin régulier : terminaisons ?', '-ūna (nominatif) / -īna (accusatif-génitif)', { answerAr: 'ـُونَ / ـِينَ' }),
    ],
  },

  /* -------------------------------------------------- Conjugaison */
  {
    id: 'conjugaison',
    title: 'Conjugaison (avec le duel)',
    emoji: '🔁',
    intro: 'Le verbe arabe a deux grands temps : l’accompli (passé), conjugué par suffixes, et l’inaccompli (présent-futur), conjugué par préfixes et suffixes. Treize personnes, dont trois au duel.',
    lessons: [
      {
        title: 'L’accompli (passé) : كَتَبَ, « écrire »',
        paragraphs: ['La base est la forme « il » (كَتَبَ) ; on lui ajoute un suffixe propre à chaque personne. Le dictionnaire classe les verbes à cette personne, et non à l’infinitif, qui n’existe pas.'],
        table: {
          headers: ['Personne', 'Passé', 'Translittération'],
          rows: [
            ['je', 'ar:كَتَبْتُ', 'katabtu'],
            ['tu (m)', 'ar:كَتَبْتَ', 'katabta'],
            ['tu (f)', 'ar:كَتَبْتِ', 'katabti'],
            ['il', 'ar:كَتَبَ', 'kataba'],
            ['elle', 'ar:كَتَبَتْ', 'katabat'],
            ['vous deux', 'ar:كَتَبْتُمَا', 'katabtumā'],
            ['eux deux', 'ar:كَتَبَا', 'katabā'],
            ['elles deux', 'ar:كَتَبَتَا', 'katabatā'],
            ['nous', 'ar:كَتَبْنَا', 'katabnā'],
            ['vous (m)', 'ar:كَتَبْتُمْ', 'katabtum'],
            ['vous (f)', 'ar:كَتَبْتُنَّ', 'katabtunna'],
            ['ils', 'ar:كَتَبُوا', 'katabū'],
            ['elles', 'ar:كَتَبْنَ', 'katabna'],
          ],
        },
      },
      {
        title: 'L’inaccompli (présent) : يَكْتُبُ',
        paragraphs: [
          'Au présent, des préfixes (أَ، تَ، يَ، نَ) indiquent la personne, complétés par des suffixes. Pour le futur, il suffit d’ajouter سَـ : سَأَكْتُبُ, « j’écrirai ».',
        ],
        table: {
          headers: ['Personne', 'Présent', 'Translittération'],
          rows: [
            ['je', 'ar:أَكْتُبُ', 'aktubu'],
            ['tu (m)', 'ar:تَكْتُبُ', 'taktubu'],
            ['tu (f)', 'ar:تَكْتُبِينَ', 'taktubīna'],
            ['il', 'ar:يَكْتُبُ', 'yaktubu'],
            ['elle', 'ar:تَكْتُبُ', 'taktubu'],
            ['vous deux', 'ar:تَكْتُبَانِ', 'taktubāni'],
            ['eux deux', 'ar:يَكْتُبَانِ', 'yaktubāni'],
            ['elles deux', 'ar:تَكْتُبَانِ', 'taktubāni'],
            ['nous', 'ar:نَكْتُبُ', 'naktubu'],
            ['vous (m)', 'ar:تَكْتُبُونَ', 'taktubūna'],
            ['vous (f)', 'ar:تَكْتُبْنَ', 'taktubna'],
            ['ils', 'ar:يَكْتُبُونَ', 'yaktubūna'],
            ['elles', 'ar:يَكْتُبْنَ', 'yaktubna'],
          ],
        },
      },
      {
        title: 'L’ordre des mots',
        paragraphs: [
          'La phrase verbale commence souvent par le verbe. Quand le verbe précède un sujet pluriel exprimé, il reste au singulier : كَتَبَ الطُّلَّابُ, « les étudiants ont écrit ».',
        ],
        examples: [p('كَتَبَتْ جُولْيِيت رِسَالَةً.', 'katabat Jūliyet risālatan.', 'Juliette a écrit une lettre.'), p('سَأَكْتُبُ غَدًا.', 'sa-aktubu ghadan.', 'J’écrirai demain.')],
      },
    ],
    cards: [
      card('conj-ana-passe', '« J’ai écrit » ?', 'katabtu', { answerAr: 'كَتَبْتُ' }),
      card('conj-hiya-passe', '« Elle a écrit » ?', 'katabat', { answerAr: 'كَتَبَتْ' }),
      card('conj-huma-passe', '« Eux deux ont écrit » (duel) ?', 'katabā', { answerAr: 'كَتَبَا' }),
      card('conj-hum-passe', '« Ils ont écrit » ?', 'katabū', { answerAr: 'كَتَبُوا' }),
      card('conj-anti-present', '« Tu écris » (à une femme) ?', 'taktubīna', { answerAr: 'تَكْتُبِينَ' }),
      card('conj-antuma-present', '« Vous deux écrivez » ?', 'taktubāni', { answerAr: 'تَكْتُبَانِ' }),
      card('conj-futur', 'Comment forme-t-on le futur ?', 'Préfixe سَـ devant le présent', { answerAr: 'سَأَكْتُبُ' }),
    ],
  },

  /* -------------------------------------------------- Article */
  {
    id: 'article',
    title: 'L’article et les lettres solaires',
    emoji: '☀️',
    intro: 'Un seul article, ال, invariable — mais une prononciation qui dépend de la lettre qui suit.',
    lessons: [
      {
        title: 'La règle',
        paragraphs: [
          'Devant une lettre lunaire, on prononce le l : al-qamar. Devant une lettre solaire, le l s’efface et la consonne suivante est doublée : ash-shams. On écrit pourtant toujours ال.',
          'Astuce : les lettres solaires se prononcent avec le bout de la langue, à l’endroit même où se forme le l.',
        ],
        table: {
          headers: ['Lettres', 'Liste'],
          rows: [
            ['☀️ solaires', `ar:${sun.map((l) => l.char).join(' ')}`],
            ['🌙 lunaires', `ar:${moon.map((l) => l.char).join(' ')}`],
          ],
        },
      },
      {
        title: 'Exemples',
        paragraphs: ['Écoutez la différence :'],
        examples: [
          p('اَلشَّمْسُ', 'ash-shams', 'le soleil (solaire)'),
          p('اَلْقَمَرُ', 'al-qamar', 'la lune (lunaire)'),
          p('اَلنُّورُ', 'an-nūr', 'la lumière (solaire)'),
          p('اَلْبَحْرُ', 'al-baḥr', 'la mer (lunaire)'),
          p('اَلرِّيحُ', 'ar-rīḥ', 'le vent (solaire)'),
          p('اَلْكِتَابُ', 'al-kitāb', 'le livre (lunaire)'),
        ],
      },
      {
        title: 'La liaison après une voyelle',
        paragraphs: ['Après un mot terminé par une voyelle, le a de l’article disparaît à l’oral : فِي الْبَيْتِ se dit « fi l-bayt », et مَعَ السَّلَامَةِ « maʿa s-salāma ».'],
      },
    ],
    cards: [
      card('article-shams', 'Comment se prononce اَلشَّمْس ?', 'ash-shams (lettre solaire)', { ar: 'اَلشَّمْسُ' }),
      card('article-qamar', 'Comment se prononce اَلْقَمَر ?', 'al-qamar (lettre lunaire)', { ar: 'اَلْقَمَرُ' }),
      card('article-nombre', 'Combien de lettres solaires ?', 'Quatorze, la moitié de l’alphabet'),
      card('article-indefini', 'Comment marque-t-on l’indéfini ?', 'Par le tanwīn final (-un, -an, -in) : pas d’article indéfini', { answerAr: 'كِتَابٌ' }),
      card('article-r', 'ر est-elle solaire ou lunaire ?', 'Solaire : ar-rajul', { ar: 'اَلرَّجُلُ' }),
    ],
  },

  /* -------------------------------------------------- Nombres */
  {
    id: 'nombres',
    title: 'Les nombres',
    emoji: '🔢',
    intro: 'Les chiffres, les nombres jusqu’à mille, et la célèbre « polarité » des nombres de 3 à 10.',
    lessons: [
      {
        title: 'De 0 à 10',
        paragraphs: ['Les chiffres dits « indiens » sont employés au Moyen-Orient ; le Maghreb utilise les chiffres que nous appelons « arabes ». Les nombres se lisent de gauche à droite, même au milieu d’un texte arabe.'],
        table: {
          headers: ['Chiffre', 'Nombre', 'Translittération'],
          rows: [
            ['ar:٠', 'ar:صِفْرٌ', 'ṣifr'],
            ['ar:١', 'ar:وَاحِدٌ', 'wāḥid'],
            ['ar:٢', 'ar:اِثْنَانِ', 'ithnān'],
            ['ar:٣', 'ar:ثَلَاثَةٌ', 'thalātha'],
            ['ar:٤', 'ar:أَرْبَعَةٌ', 'arbaʿa'],
            ['ar:٥', 'ar:خَمْسَةٌ', 'khamsa'],
            ['ar:٦', 'ar:سِتَّةٌ', 'sitta'],
            ['ar:٧', 'ar:سَبْعَةٌ', 'sabʿa'],
            ['ar:٨', 'ar:ثَمَانِيَةٌ', 'thamāniya'],
            ['ar:٩', 'ar:تِسْعَةٌ', 'tisʿa'],
            ['ar:١٠', 'ar:عَشَرَةٌ', 'ʿashara'],
          ],
        },
      },
      {
        title: 'Au-delà de dix',
        paragraphs: ['Les dizaines se forment en ـُونَ. Pour 21 à 99, on dit l’unité avant la dizaine : « un et vingt ».'],
        table: {
          headers: ['Nombre', 'Arabe', 'Translittération'],
          rows: [
            ['11', 'ar:أَحَدَ عَشَرَ', 'aḥada ʿashara'],
            ['12', 'ar:اِثْنَا عَشَرَ', 'ithnā ʿashara'],
            ['20', 'ar:عِشْرُونَ', 'ʿishrūn'],
            ['21', 'ar:وَاحِدٌ وَعِشْرُونَ', 'wāḥid wa-ʿishrūn'],
            ['30', 'ar:ثَلَاثُونَ', 'thalāthūn'],
            ['40', 'ar:أَرْبَعُونَ', 'arbaʿūn'],
            ['50', 'ar:خَمْسُونَ', 'khamsūn'],
            ['100', 'ar:مِئَةٌ', 'mi’a'],
            ['1000', 'ar:أَلْفٌ', 'alf'],
          ],
        },
      },
      {
        title: 'La polarité : de 3 à 10, l’accord « à l’envers »',
        paragraphs: [
          'Avec un nom masculin, les nombres de 3 à 10 prennent la forme en ـة, qui ressemble à un féminin ; avec un nom féminin, ils la perdent. Le nom qui suit est au pluriel et au génitif.',
          'De 11 à 99, le nom compté se met au singulier et à l’accusatif : أَحَدَ عَشَرَ كِتَابًا, « onze livres ».',
        ],
        examples: [
          p('ثَلَاثَةُ كُتُبٍ', 'thalāthatu kutub', 'trois livres (كِتَاب est masculin)'),
          p('ثَلَاثُ غُرَفٍ', 'thalāthu ghuraf', 'trois chambres (غُرْفَة est féminin)'),
          p('عِشْرُونَ طَالِبًا', 'ʿishrūna ṭāliban', 'vingt étudiants (singulier accusatif)'),
        ],
      },
    ],
    cards: [
      card('nb-7', 'Quel est ce chiffre ?', 'sept — sabʿa', { ar: '٧', answerAr: 'سَبْعَةٌ' }),
      card('nb-20', 'Comment dit-on « vingt » ?', 'ʿishrūn', { answerAr: 'عِشْرُونَ' }),
      card('nb-21', 'Dans « 21 », quel ordre ?', 'L’unité d’abord : « un et vingt »', { answerAr: 'وَاحِدٌ وَعِشْرُونَ' }),
      card('nb-polarite', 'Polarité : « trois livres » (livre est masculin) ?', 'Le nombre prend ـة : thalāthatu kutub', { answerAr: 'ثَلَاثَةُ كُتُبٍ' }),
      card('nb-11-99', 'De 11 à 99, le nom compté est…', 'Au singulier et à l’accusatif', { answerAr: 'عِشْرُونَ طَالِبًا' }),
    ],
  },

  /* -------------------------------------------------- Expressions */
  {
    id: 'expressions',
    title: 'Expressions idiomatiques',
    emoji: '💎',
    intro: 'Quelques images et proverbes de l’arabe standard, compris dans tout le monde arabe.',
    lessons: [
      {
        title: 'Images du quotidien',
        paragraphs: ['Leur traduction littérale est souvent savoureuse :'],
        examples: [
          p('عَلَى رَأْسِي', 'ʿalā ra’sī', '« sur ma tête » : avec grand plaisir'),
          p('بَيْنَ لَيْلَةٍ وَضُحَاهَا', 'bayna laylatin wa-ḍuḥāhā', '« entre une nuit et sa matinée » : du jour au lendemain'),
          p('عَلَى قَدَمٍ وَسَاقٍ', 'ʿalā qadamin wa-sāq', '« sur pied et jambe » : à plein régime'),
          p('يَدًا بِيَدٍ', 'yadan bi-yad', 'main dans la main'),
          p('عَلَى أَحَرَّ مِنَ الْجَمْرِ', 'ʿalā aḥarra mina l-jamr', '« sur plus brûlant que la braise » : impatient'),
          p('مَاءُ الْوَجْهِ', 'mā’u l-wajh', '« l’eau du visage » : l’honneur, la dignité'),
        ],
      },
      {
        title: 'Proverbes',
        paragraphs: ['À glisser dans la conversation pour faire sourire vos interlocuteurs :'],
        examples: [
          p('مَنْ جَدَّ وَجَدَ', 'man jadda wajad', 'qui s’applique trouve (le succès)'),
          p('اَلصَّبْرُ مِفْتَاحُ الْفَرَجِ', 'aṣ-ṣabru miftāḥu l-faraj', 'la patience est la clé du soulagement'),
          p('خَيْرُ الْكَلَامِ مَا قَلَّ وَدَلَّ', 'khayru l-kalāmi mā qalla wa-dall', 'le meilleur discours est bref et parlant'),
          p('ضَرَبَ عُصْفُورَيْنِ بِحَجَرٍ وَاحِدٍ', 'ḍaraba ʿuṣfūrayni bi-ḥajarin wāḥid', 'faire d’une pierre deux coups (« deux moineaux »)'),
          p('اَلْوَقْتُ كَالسَّيْفِ', 'al-waqtu ka-s-sayf', 'le temps est comme un sabre (qui tranche si on ne le maîtrise pas)'),
        ],
      },
    ],
    cards: [
      card('expr-raas', 'Que veut dire عَلَى رَأْسِي ?', 'Avec grand plaisir (« sur ma tête »)', { ar: 'عَلَى رَأْسِي' }),
      card('expr-layla', 'Que veut dire بَيْنَ لَيْلَةٍ وَضُحَاهَا ?', 'Du jour au lendemain', { ar: 'بَيْنَ لَيْلَةٍ وَضُحَاهَا' }),
      card('expr-jadda', 'Que veut dire مَنْ جَدَّ وَجَدَ ?', 'Qui s’applique réussit', { ar: 'مَنْ جَدَّ وَجَدَ' }),
      card('expr-sabr', 'Complétez : اَلصَّبْرُ مِفْتَاحُ…', 'اَلْفَرَجِ : la patience est la clé du soulagement', { ar: 'اَلصَّبْرُ مِفْتَاحُ…', answerAr: 'اَلْفَرَجِ' }),
      card('expr-osfour', '« Faire d’une pierre deux coups » ?', 'Frapper deux moineaux d’une seule pierre', { answerAr: 'ضَرَبَ عُصْفُورَيْنِ بِحَجَرٍ وَاحِدٍ' }),
    ],
  },
]

export const refById = (id: string) => REFERENCE.find((r) => r.id === id)
