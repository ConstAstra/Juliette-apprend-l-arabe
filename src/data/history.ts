import type { HistoryChapter, Phrase } from './types'

const p = (ar: string, tr: string, fr: string): Phrase => ({ ar, tr, fr })

/** Frise de l'histoire du monde arabophone, centrée sur la langue, les sciences et la mer. */
export const HISTORY: HistoryChapter[] = [
  {
    id: 'arabie-antique',
    era: 'Avant le VIIe siècle',
    title: 'L’Arabie des caravanes et des poètes',
    arTitle: 'جَزِيرَةُ الْعَرَبِ',
    paragraphs: [
      'Bien avant d’être écrite partout, la langue arabe vivait par la voix. Dans la péninsule Arabique, les tribus nomades et les cités caravanières faisaient circuler l’encens, les épices et les poèmes.',
      'Au nord, les Nabatéens bâtirent Pétra ; leur écriture, en se liant peu à peu, est l’ancêtre direct de l’alphabet arabe. Au sud, les royaumes du Yémen, comme celui de Saba, prospéraient grâce au commerce.',
      'Les plus beaux poèmes, les Muʿallaqāt (« les suspendues »), étaient récités lors des grandes foires. Imru’ al-Qays, que vous pouvez lire dans la bibliothèque, en est le plus célèbre auteur.',
    ],
    words: [p('قَافِلَةٌ', 'qāfila', 'une caravane'), p('قَبِيلَةٌ', 'qabīla', 'une tribu'), p('شَاعِرٌ', 'shāʿir', 'un poète')],
    fact: 'Le mot français « caravane » vient du persan, mais « magasin » vient de l’arabe مَخْزَنٌ (makhzan), « entrepôt ».',
  },
  {
    id: 'expansion',
    era: 'VIIe – VIIIe siècles',
    title: 'Une langue d’empire',
    arTitle: 'لُغَةُ الدَّوَاوِينِ',
    paragraphs: [
      'En un siècle, un immense empire s’étend de l’Espagne à l’Asie centrale. Les califes omeyyades, installés à Damas, font de l’arabe la langue officielle de l’administration vers l’an 700.',
      'L’écriture se perfectionne : on ajoute les points qui distinguent ب ت ث, puis les signes des voyelles brèves que vous apprenez aujourd’hui. Ils servaient déjà à éviter les erreurs de lecture.',
    ],
    words: [p('دِمَشْقُ', 'Dimashq', 'Damas'), p('دِيوَانٌ', 'dīwān', 'un registre, une administration ; un recueil de poèmes'), p('خَطٌّ', 'khaṭṭ', 'l’écriture, la calligraphie')],
    fact: 'Le mot « douane » vient de دِيوَانٌ (dīwān), le bureau où l’on enregistrait les taxes.',
  },
  {
    id: 'age-or',
    era: 'VIIIe – XIIIe siècles',
    title: 'Bagdad et l’âge d’or des sciences',
    arTitle: 'بَيْتُ الْحِكْمَةِ',
    paragraphs: [
      'Fondée en 762, Bagdad devient la plus grande ville du monde. À la Maison de la sagesse, on traduit en arabe les savants grecs, persans et indiens, puis on les dépasse.',
      'Al-Khwārizmī donne son nom à l’algorithme et son livre « al-jabr » à l’algèbre. Les chiffres venus d’Inde, et le zéro (صِفْرٌ, ṣifr), gagneront l’Europe par l’intermédiaire arabe.',
      'La médecine y brille tout particulièrement. Al-Rāzī (Rhazès) est le premier à distinguer la variole de la rougeole. Ibn Sīnā (Avicenne) écrit le « Canon de la médecine », enseigné dans les universités européennes pendant plus de cinq siècles. Au XIIIe siècle, Ibn al-Nafīs décrit la circulation pulmonaire.',
    ],
    words: [p('بَغْدَادُ', 'Baghdād', 'Bagdad'), p('عِلْمٌ / عُلُومٌ', 'ʿilm / ʿulūm', 'la science / les sciences'), p('طِبٌّ', 'ṭibb', 'la médecine'), p('مُسْتَشْفًى', 'mustashfā', 'un hôpital')],
    fact: 'Les grandes villes avaient des hôpitaux publics, les bīmāristān, avec des services séparés et des médecins examinés avant d’exercer. Une histoire qui intéressera la docteure Juliette.',
  },
  {
    id: 'andalus',
    era: 'VIIIe – XVe siècles',
    title: 'Al-Andalus, entre Orient et Occident',
    arTitle: 'اَلْأَنْدَلُسُ',
    paragraphs: [
      'Dans la péninsule Ibérique, Cordoue devient au Xe siècle l’une des capitales les plus raffinées d’Europe, avec ses bibliothèques, ses jardins et ses traducteurs.',
      'Ibn Rushd (Averroès), médecin et philosophe de Cordoue, commente Aristote et influence durablement la pensée européenne. À Grenade, l’Alhambra déploie sur ses murs une calligraphie et des étoiles géométriques, comme celles qui ornent discrètement cette application.',
      'L’histoire d’al-Andalus s’achève en 1492, mais l’espagnol garde des milliers de mots arabes : aceite (huile, اَلزَّيْتُ), ojalá…',
    ],
    words: [p('قُرْطُبَةُ', 'Qurṭuba', 'Cordoue'), p('غَرْنَاطَةُ', 'Gharnāṭa', 'Grenade'), p('حَدِيقَةٌ', 'ḥadīqa', 'un jardin')],
    fact: 'Le nom « Alhambra » vient de اَلْحَمْرَاءُ (al-ḥamrā’), « la rouge », à cause de la couleur de ses murs.',
  },
  {
    id: 'navigateurs',
    era: 'IXe – XVe siècles',
    title: 'Marins, marchands et voyageurs',
    arTitle: 'اَلْبَحَّارَةُ وَالرَّحَّالَةُ',
    paragraphs: [
      'Sur leurs boutres à voile triangulaire, les marins arabes sillonnaient l’océan Indien, de Zanzibar jusqu’à la Chine, guidés par les étoiles et par les vents de la mousson.',
      'Au XVe siècle, Aḥmad ibn Mājid rédige de véritables manuels de navigation. Un siècle plus tôt, Ibn Baṭṭūṭa, parti de Tanger, avait parcouru près de 120 000 kilomètres et raconté son voyage dans un livre, la « Riḥla ».',
      'Le français a gardé la trace de ces échanges : « amiral » vient de أَمِيرُ الْبَحْرِ (amīr al-baḥr, « le prince de la mer ») et « arsenal » de دَارُ الصِّنَاعَةِ (« la maison de la fabrication »).',
    ],
    words: [p('بَحَّارٌ', 'baḥḥār', 'un marin'), p('رَحَّالَةٌ', 'raḥḥāla', 'un grand voyageur'), p('أَمِيرُ الْبَحْرِ', 'amīru l-baḥr', 'l’amiral, « le prince de la mer »'), p('نَجْمٌ / نُجُومٌ', 'najm / nujūm', 'une étoile / des étoiles')],
    fact: 'Beaucoup d’étoiles portent encore un nom arabe : Aldébaran (اَلدَّبَرَانُ, « la suivante »), Bételgeuse, Véga, Altaïr (اَلطَّائِرُ, « l’oiseau »).',
  },
  {
    id: 'nahda',
    era: 'XIXe – début du XXe siècle',
    title: 'La Nahda, une renaissance',
    arTitle: 'اَلنَّهْضَةُ',
    paragraphs: [
      'Après des siècles où l’arabe littéraire s’était figé, une « renaissance » (النَّهْضَةُ) s’épanouit au Caire, à Beyrouth et à Damas. Imprimeries, journaux et traductions se multiplient.',
      'Les écrivains modernisent la langue : ils forgent des mots nouveaux à partir des racines anciennes pour dire le train, le journal ou l’hôpital moderne. C’est la naissance de l’arabe standard moderne, celui que vous apprenez.',
    ],
    words: [p('جَرِيدَةٌ', 'jarīda', 'un journal'), p('مَطْبَعَةٌ', 'maṭbaʿa', 'une imprimerie'), p('تَرْجَمَةٌ', 'tarjama', 'une traduction')],
    fact: 'Pour « train », on a recyclé قِطَارٌ (qiṭār), qui désignait autrefois une file de chameaux attachés les uns aux autres.',
  },
  {
    id: 'aujourdhui',
    era: 'Aujourd’hui',
    title: 'Une langue, de nombreuses voix',
    arTitle: 'اَلْعَالَمُ الْعَرَبِيُّ الْيَوْمَ',
    paragraphs: [
      'L’arabe est la langue officielle de plus de vingt pays, du Maroc à Oman, et compte environ 400 millions de locuteurs. C’est l’une des six langues officielles de l’ONU.',
      'Chaque arabophone vit avec deux registres : l’arabe standard, commun à tous, pour l’écrit, les informations et les discours ; et son dialecte, pour la vie de tous les jours. C’est pourquoi l’application sépare le tronc commun et les expressions dialectales.',
      'Le 18 décembre est la Journée mondiale de la langue arabe, célébrée chaque année par l’UNESCO.',
    ],
    words: [p('اَلْفُصْحَى', 'al-fuṣḥā', 'l’arabe standard'), p('لَهْجَةٌ', 'lahja', 'un dialecte'), p('اَلْعَالَمُ الْعَرَبِيُّ', 'al-ʿālamu l-ʿarabī', 'le monde arabe')],
    fact: 'Le français a emprunté à l’arabe plusieurs centaines de mots : sucre (سُكَّرٌ), café (قَهْوَةٌ), sirop (شَرَابٌ), jupe (جُبَّةٌ)… et même « alcool », de اَلْكُحْلُ, la fine poudre du khôl.',
  },
]
