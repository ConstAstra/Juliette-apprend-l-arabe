import type { Cefr, Tier, Word } from './types'

const w = (prefix: string, raw: [string, string, string][]): Word[] =>
  raw.map(([ar, tr, fr], i) => ({ id: `${prefix}-v${i}`, ar, tr, fr }))

const p = (ar: string, tr: string, fr: string) => ({ ar, tr, fr })

export const TIERS: Tier[] = [
  /* ------------------------------------------------------------------ A1.1 */
  {
    id: 'a1-1',
    level: 'A1',
    order: 1,
    title: 'Premiers pas',
    arTitle: 'اَلْخُطُوَاتُ الْأُولَى',
    subtitle: 'Six lettres, les voyelles et les salutations',
    emoji: '👋',
    letters: ['alif', 'ba', 'ta', 'tha', 'nun', 'ya'],
    grammar: {
      lessons: [
        {
          title: 'Écrire de droite à gauche, en lettres liées',
          paragraphs: [
            'L’arabe s’écrit et se lit de droite à gauche. Les lettres d’un même mot se lient entre elles, un peu comme notre écriture cursive, et c’est vrai aussi bien à la main qu’à l’imprimé.',
            'Six lettres seulement refusent de se lier à la lettre qui les suit : ا د ذ ر ز و. Après elles, le mot continue avec une forme « initiale », comme s’il recommençait.',
          ],
          examples: [p('بَيْت', 'bayt', 'une maison : ses trois lettres sont liées'), p('بَاب', 'bāb', 'une porte : l’alif ne se lie pas à la lettre suivante')],
        },
        {
          title: 'Les voyelles brèves et longues',
          paragraphs: [
            'L’alphabet arabe ne note en principe que les consonnes et les voyelles longues. Les trois voyelles brèves sont de petits signes facultatifs : la fatḥa (a) au-dessus, la kasra (i) au-dessous, la ḍamma (ou) au-dessus.',
            'Une voyelle brève suivie de ا, ي ou و devient longue : ā, ī, ū. Dans la vie courante, les signes brefs disparaissent presque toujours : c’est pourquoi l’application propose un mode « sans diacritiques ».',
          ],
          table: {
            headers: ['Signe', 'Nom', 'Son'],
            rows: [
              ['ar:بَ', 'fatḥa', 'ba'],
              ['ar:بِ', 'kasra', 'bi'],
              ['ar:بُ', 'ḍamma', 'bu'],
              ['ar:بَا', 'fatḥa + alif', 'bā'],
              ['ar:بِي', 'kasra + yā’', 'bī'],
              ['ar:بُو', 'ḍamma + wāw', 'bū'],
            ],
          },
        },
      ],
      quiz: [
        { question: 'Dans quel sens lit-on l’arabe ?', options: ['De gauche à droite', 'De droite à gauche', 'De haut en bas'], answer: 1 },
        { question: 'Quelle voyelle brève se place sous la lettre ?', options: ['fatḥa', 'kasra', 'ḍamma'], answer: 1 },
        { question: 'Comment se lit ce signe ?', ar: 'بُ', options: ['ba', 'bi', 'bu'], answer: 2 },
        { question: 'Combien de lettres ne se lient jamais à la suivante ?', options: ['Deux', 'Six', 'Dix'], answer: 1, explanation: 'ا د ذ ر ز و' },
      ],
    },
    pronunciation: [
      {
        title: 'Le son « th » de ث',
        paragraphs: ['Placez le bout de la langue entre les dents et soufflez, comme dans l’anglais « think ». Ne le confondez pas avec ت (t) ou س (s).'],
        examples: [p('ثَلَاثَة', 'thalātha', 'trois'), p('ثَوْب', 'thawb', 'un vêtement'), p('تِين', 'tīn', 'des figues')],
      },
      {
        title: 'Brèves et longues',
        paragraphs: ['La longueur change le sens : tenez les voyelles longues environ deux fois plus longtemps.'],
        examples: [p('بِنْت', 'bint', 'une fille'), p('بَيْت', 'bayt', 'une maison'), p('نَبِيل', 'nabīl', 'noble')],
      },
    ],
    writing: [
      {
        title: 'Une même silhouette, des points différents',
        paragraphs: [
          'ب ت ث ن ي partagent la même petite « dent » au milieu d’un mot. Seuls les points les distinguent : un dessous pour ب, deux dessus pour ت, trois dessus pour ث, un dessus pour ن, deux dessous pour ي.',
          'Tracez d’abord le corps de la lettre, de droite à gauche, puis ajoutez les points à la fin.',
        ],
        examples: [p('ـبـ ـتـ ـثـ ـنـ ـيـ', '-b- -t- -th- -n- -y-', 'les cinq formes médianes')],
      },
    ],
    vocabulary: w('a1-1', [
      ['مَرْحَبًا', 'marḥaban', 'bonjour, salut'],
      ['أَهْلًا', 'ahlan', 'salut, bienvenue'],
      ['اَلسَّلَامُ عَلَيْكُمْ', 'as-salāmu ʿalaykum', 'bonjour (« la paix sur vous »)'],
      ['وَعَلَيْكُمُ السَّلَامُ', 'wa ʿalaykumu s-salām', 'réponse : « et sur vous la paix »'],
      ['صَبَاحُ الْخَيْرِ', 'ṣabāḥu l-khayr', 'bonjour (le matin)'],
      ['صَبَاحُ النُّورِ', 'ṣabāḥu n-nūr', 'réponse : bonjour (le matin)'],
      ['مَسَاءُ الْخَيْرِ', 'masā’u l-khayr', 'bonsoir'],
      ['شُكْرًا', 'shukran', 'merci'],
      ['عَفْوًا', 'ʿafwan', 'de rien ; pardon'],
      ['نَعَمْ', 'naʿam', 'oui'],
      ['لَا', 'lā', 'non'],
      ['مَعَ السَّلَامَةِ', 'maʿa s-salāma', 'au revoir'],
      ['إِلَى اللِّقَاءِ', 'ilā l-liqā’', 'à bientôt'],
      ['بَيْتٌ', 'bayt', 'une maison'],
      ['بِنْتٌ', 'bint', 'une fille'],
    ]),
    mindmap: {
      center: p('اَلتَّحِيَّاتُ', 'at-taḥiyyāt', 'les salutations'),
      branches: [
        { label: 'Le matin', items: [p('صَبَاحُ الْخَيْرِ', 'ṣabāḥu l-khayr', 'bonjour'), p('صَبَاحُ النُّورِ', 'ṣabāḥu n-nūr', 'réponse')] },
        { label: 'Le soir', items: [p('مَسَاءُ الْخَيْرِ', 'masā’u l-khayr', 'bonsoir'), p('مَسَاءُ النُّورِ', 'masā’u n-nūr', 'réponse')] },
        { label: 'À toute heure', items: [p('مَرْحَبًا', 'marḥaban', 'bonjour'), p('أَهْلًا', 'ahlan', 'salut')] },
        { label: 'En partant', items: [p('مَعَ السَّلَامَةِ', 'maʿa s-salāma', 'au revoir'), p('إِلَى اللِّقَاءِ', 'ilā l-liqā’', 'à bientôt')] },
      ],
    },
    story: {
      title: 'Le matin de Juliette',
      lines: [
        p('هَذِهِ جُولْيِيت.', 'hādhihi Jūliyet.', 'Voici Juliette.'),
        p('جُولْيِيت فِي الْبَيْتِ.', 'Jūliyet fī l-bayt.', 'Juliette est à la maison.'),
        p('تَقُولُ: صَبَاحُ الْخَيْرِ يَا أُمِّي!', 'taqūlu : ṣabāḥu l-khayr yā ummī !', 'Elle dit : « Bonjour, maman ! »'),
        p('تَقُولُ الْأُمُّ: صَبَاحُ النُّورِ يَا بِنْتِي.', 'taqūlu l-umm : ṣabāḥu n-nūr yā bintī.', 'La mère dit : « Bonjour, ma fille. »'),
        p('تَأْكُلُ جُولْيِيت الْخُبْزَ وَتَشْرَبُ الشَّايَ.', 'ta’kulu Jūliyet al-khubza wa tashrabu sh-shāy.', 'Juliette mange du pain et boit du thé.'),
        p('ثُمَّ تَقُولُ: شُكْرًا، مَعَ السَّلَامَةِ!', 'thumma taqūlu : shukran, maʿa s-salāma !', 'Puis elle dit : « Merci, au revoir ! »'),
      ],
    },
    podcast: {
      title: 'Bonjour, Sami !',
      intro: 'Juliette croise son ami Sami un matin.',
      lines: [
        { speaker: 'Sami', ar: 'مَرْحَبًا يَا جُولْيِيت!', fr: 'Bonjour, Juliette !' },
        { speaker: 'Juliette', ar: 'أَهْلًا يَا سَامِي! صَبَاحُ الْخَيْرِ.', fr: 'Salut, Sami ! Bonjour.' },
        { speaker: 'Sami', ar: 'صَبَاحُ النُّورِ. كَيْفَ حَالُكِ؟', fr: 'Bonjour. Comment vas-tu ?' },
        { speaker: 'Juliette', ar: 'أَنَا بِخَيْرٍ، شُكْرًا. وَأَنْتَ؟', fr: 'Je vais bien, merci. Et toi ?' },
        { speaker: 'Sami', ar: 'أَنَا بِخَيْرٍ أَيْضًا.', fr: 'Je vais bien aussi.' },
        { speaker: 'Juliette', ar: 'مَعَ السَّلَامَةِ!', fr: 'Au revoir !' },
        { speaker: 'Sami', ar: 'إِلَى اللِّقَاءِ!', fr: 'À bientôt !' },
      ],
    },
    conversation: {
      intro: 'Sami vous salue : répondez à voix haute (ou en tapant en arabe).',
      steps: [
        { bot: p('مَرْحَبًا!', 'marḥaban !', 'Bonjour !'), expected: ['مرحبا', 'اهلا', 'السلام عليكم'], hint: p('أَهْلًا!', 'ahlan !', 'Salut !') },
        { bot: p('صَبَاحُ الْخَيْرِ.', 'ṣabāḥu l-khayr.', 'Bonjour (le matin).'), expected: ['صباح النور', 'صباح الخير'], hint: p('صَبَاحُ النُّورِ.', 'ṣabāḥu n-nūr.', 'Bonjour (réponse).') },
        { bot: p('كَيْفَ حَالُكِ؟', 'kayfa ḥāluki ?', 'Comment vas-tu ?'), expected: ['بخير', 'انا بخير'], hint: p('أَنَا بِخَيْرٍ، شُكْرًا.', 'anā bi-khayr, shukran.', 'Je vais bien, merci.') },
        { bot: p('مَعَ السَّلَامَةِ!', 'maʿa s-salāma !', 'Au revoir !'), expected: ['مع السلامه', 'الى اللقاء'], hint: p('إِلَى اللِّقَاءِ!', 'ilā l-liqā’ !', 'À bientôt !') },
      ],
    },
    dialect: [
      { dialect: 'Levantin', ar: 'كِيفِك؟', tr: 'kīfik ?', fr: 'comment vas-tu ? (à une femme)', msa: 'كَيْفَ حَالُكِ؟' },
      { dialect: 'Levantin', ar: 'مْنِيحَة', tr: 'mnīḥa', fr: 'bien (au féminin)', msa: 'بِخَيْرٍ' },
      { dialect: 'Égyptien', ar: 'إِزَّيِّك؟', tr: 'izzayyik ?', fr: 'comment vas-tu ? (à une femme)', msa: 'كَيْفَ حَالُكِ؟' },
      { dialect: 'Égyptien', ar: 'كُوَيِّسَة', tr: 'kwayyisa', fr: 'bien (au féminin)', msa: 'بِخَيْرٍ' },
      { dialect: 'Marocain', ar: 'لَابَاس؟', tr: 'lābās ?', fr: 'ça va ?', msa: 'كَيْفَ حَالُكِ؟' },
      { dialect: 'Marocain', ar: 'بِسْلَامَة', tr: 'bslāma', fr: 'au revoir', msa: 'مَعَ السَّلَامَةِ' },
    ],
  },

  /* ------------------------------------------------------------------ A1.2 */
  {
    id: 'a1-2',
    level: 'A1',
    order: 2,
    title: 'Se présenter',
    arTitle: 'أُقَدِّمُ نَفْسِي',
    subtitle: 'Les pronoms, le duel et la phrase sans « être »',
    emoji: '🙋‍♀️',
    letters: ['jim', 'ha', 'kha', 'dal', 'dhal', 'ra', 'zay', 'waw'],
    grammar: {
      lessons: [
        {
          title: 'Les pronoms personnels… et le duel',
          paragraphs: [
            'L’arabe distingue le masculin et le féminin dès la deuxième personne : on ne dit pas « tu » de la même façon à un homme et à une femme.',
            'Surtout, il possède un troisième nombre, absent du français : le duel (اَلْمُثَنَّى), pour parler d’exactement deux personnes ou deux choses. « Vous deux » et « eux deux » ont leurs propres pronoms.',
          ],
          table: {
            headers: ['Pronom', 'Translittération', 'Sens'],
            rows: [
              ['ar:أَنَا', 'anā', 'je'],
              ['ar:أَنْتَ', 'anta', 'tu (homme)'],
              ['ar:أَنْتِ', 'anti', 'tu (femme)'],
              ['ar:هُوَ', 'huwa', 'il'],
              ['ar:هِيَ', 'hiya', 'elle'],
              ['ar:أَنْتُمَا', 'antumā', 'vous deux (duel)'],
              ['ar:هُمَا', 'humā', 'eux deux, elles deux (duel)'],
              ['ar:نَحْنُ', 'naḥnu', 'nous'],
              ['ar:أَنْتُمْ', 'antum', 'vous (hommes ou groupe mixte)'],
              ['ar:أَنْتُنَّ', 'antunna', 'vous (femmes)'],
              ['ar:هُمْ', 'hum', 'ils'],
              ['ar:هُنَّ', 'hunna', 'elles'],
            ],
          },
        },
        {
          title: 'La phrase nominale : pas de verbe « être » au présent',
          paragraphs: [
            'Au présent, l’arabe se passe du verbe « être » : on juxtapose simplement le sujet et ce qu’on en dit. « Moi étudiante » signifie « je suis étudiante ».',
          ],
          examples: [
            p('أَنَا طَبِيبَةٌ.', 'anā ṭabība.', 'Je suis médecin.'),
            p('هِيَ فَرَنْسِيَّةٌ.', 'hiya faransiyya.', 'Elle est française.'),
            p('اَلْبَيْتُ كَبِيرٌ.', 'al-baytu kabīr.', 'La maison est grande.'),
          ],
        },
        {
          title: 'Le féminin en ـة (tā’ marbūṭa)',
          paragraphs: ['La plupart des noms et adjectifs forment leur féminin en ajoutant ـة, prononcée « a » en fin de phrase.'],
          examples: [
            p('طَبِيبٌ ← طَبِيبَةٌ', 'ṭabīb → ṭabība', 'médecin (h) → médecin (f)'),
            p('طَالِبٌ ← طَالِبَةٌ', 'ṭālib → ṭāliba', 'étudiant → étudiante'),
            p('فَرَنْسِيٌّ ← فَرَنْسِيَّةٌ', 'faransī → faransiyya', 'français → française'),
            p('مُعَلِّمٌ ← مُعَلِّمَةٌ', 'muʿallim → muʿallima', 'professeur (h) → professeure'),
          ],
        },
      ],
      quiz: [
        { question: 'Comment dit-on « vous deux » ?', options: ['أَنْتُمْ', 'أَنْتُمَا', 'أَنْتِ'], answer: 1 },
        { question: 'Que signifie cette phrase ?', ar: 'أَنَا طَالِبَةٌ', options: ['J’étais étudiante', 'Je suis étudiante', 'Une étudiante'], answer: 1, explanation: 'Pas de verbe « être » au présent : il est sous-entendu.' },
        { question: 'Quel est le féminin de مُعَلِّم ?', options: ['مُعَلِّمَة', 'مُعَلِّمُون', 'مُعَلِّمَانِ'], answer: 0 },
        { question: 'À qui dit-on أَنْتِ ?', options: ['À un homme', 'À une femme', 'À un groupe'], answer: 1 },
      ],
    },
    pronunciation: [
      {
        title: 'Trois « h » : ه, ح et خ',
        paragraphs: [
          'ه est un souffle léger. ح vient du fond de la gorge, gorge serrée, sans racler. خ racle, comme la jota espagnole.',
        ],
        examples: [p('هُوَ', 'huwa', 'il'), p('حُبٌّ', 'ḥubb', 'l’amour'), p('خُبْزٌ', 'khubz', 'du pain')],
      },
      {
        title: 'د, ذ et ز',
        paragraphs: ['د est notre « d » ; ذ est le « th » anglais de « this » ; ز est notre « z ».'],
        examples: [p('دَارٌ', 'dār', 'une maison'), p('ذَهَبٌ', 'dhahab', 'de l’or'), p('زَيْتٌ', 'zayt', 'de l’huile')],
      },
      {
        title: 'Le ر roulé',
        paragraphs: ['Faites vibrer le bout de la langue contre le palais, comme un « r » espagnol ou bourguignon.'],
        examples: [p('رَجُلٌ', 'rajul', 'un homme'), p('جَمِيلٌ', 'jamīl', 'beau')],
      },
    ],
    writing: [
      {
        title: 'Trois familles de formes',
        paragraphs: [
          'ج ح خ ont le même corps : un point dessous pour ج, aucun pour ح, un dessus pour خ.',
          'د et ذ, puis ر et ز, ne diffèrent que par un point. Ces quatre lettres et و ne se lient jamais à la lettre suivante.',
        ],
        examples: [p('جـ حـ خـ', 'j- ḥ- kh-', 'formes initiales'), p('ـد ـذ ـر ـز ـو', '-d -dh -r -z -w', 'formes finales')],
      },
    ],
    vocabulary: w('a1-2', [
      ['اِسْمِي…', 'ismī…', 'je m’appelle… (« mon nom »)'],
      ['مَا اسْمُكِ؟', 'mā smuki ?', 'comment t’appelles-tu ? (à une femme)'],
      ['مَا اسْمُكَ؟', 'mā smuka ?', 'comment t’appelles-tu ? (à un homme)'],
      ['مِنْ أَيْنَ أَنْتِ؟', 'min ayna anti ?', 'd’où viens-tu ? (à une femme)'],
      ['أَنَا مِنْ فَرَنْسَا.', 'anā min faransā.', 'je viens de France'],
      ['فَرَنْسِيٌّ / فَرَنْسِيَّةٌ', 'faransī / faransiyya', 'français / française'],
      ['عَرَبِيٌّ / عَرَبِيَّةٌ', 'ʿarabī / ʿarabiyya', 'arabe (m / f)'],
      ['طَبِيبٌ / طَبِيبَةٌ', 'ṭabīb / ṭabība', 'médecin (h / f)'],
      ['مَاذَا تَعْمَلِينَ؟', 'mādhā taʿmalīn ?', 'que fais-tu dans la vie ? (à une femme)'],
      ['طَالِبٌ / طَالِبَةٌ', 'ṭālib / ṭāliba', 'étudiant / étudiante'],
      ['مُعَلِّمٌ / مُعَلِّمَةٌ', 'muʿallim / muʿallima', 'professeur (h / f)'],
      ['صَدِيقٌ / صَدِيقَةٌ', 'ṣadīq / ṣadīqa', 'ami / amie'],
      ['تَشَرَّفْنَا', 'tasharrafnā', 'enchanté(e)'],
      ['هَلْ…؟', 'hal… ?', 'est-ce que… ?'],
      ['اَللُّغَةُ الْعَرَبِيَّةُ', 'al-lughatu l-ʿarabiyya', 'la langue arabe'],
    ]),
    mindmap: {
      center: p('أَنَا', 'anā', 'moi'),
      branches: [
        { label: 'Mon nom', items: [p('اِسْمِي جُولْيِيت', 'ismī Jūliyet', 'je m’appelle Juliette')] },
        { label: 'Mon origine', items: [p('أَنَا مِنْ فَرَنْسَا', 'anā min faransā', 'je viens de France'), p('فَرَنْسِيَّةٌ', 'faransiyya', 'française')] },
        { label: 'Mon métier', items: [p('أَنَا طَبِيبَةٌ', 'anā ṭabība', 'je suis médecin'), p('فِي الْمُسْتَشْفَى', 'fī l-mustashfā', 'à l’hôpital')] },
        { label: 'Mes langues', items: [p('اَلْفَرَنْسِيَّةُ', 'al-faransiyya', 'le français'), p('اَلْعَرَبِيَّةُ', 'al-ʿarabiyya', 'l’arabe')] },
      ],
    },
    story: {
      title: 'Je m’appelle Juliette',
      lines: [
        p('اِسْمِي جُولْيِيت.', 'ismī Jūliyet.', 'Je m’appelle Juliette.'),
        p('أَنَا مِنْ فَرَنْسَا.', 'anā min faransā.', 'Je viens de France.'),
        p('أَنَا طَبِيبَةٌ.', 'anā ṭabība.', 'Je suis médecin.'),
        p('صَدِيقِي اسْمُهُ سَامِي.', 'ṣadīqī smuhu Sāmī.', 'Mon ami s’appelle Sami.'),
        p('هُوَ مِنْ لُبْنَانَ، وَهُوَ مُعَلِّمٌ.', 'huwa min lubnān, wa huwa muʿallim.', 'Il vient du Liban, et il est professeur.'),
        p('نَحْنُ صَدِيقَانِ.', 'naḥnu ṣadīqān.', 'Nous sommes deux amis. (duel !)'),
      ],
    },
    podcast: {
      title: 'Une nouvelle amie',
      intro: 'Juliette fait la connaissance de Layla.',
      lines: [
        { speaker: 'Layla', ar: 'مَرْحَبًا، أَنَا لَيْلَى. مَا اسْمُكِ؟', fr: 'Bonjour, je suis Layla. Comment t’appelles-tu ?' },
        { speaker: 'Juliette', ar: 'اِسْمِي جُولْيِيت.', fr: 'Je m’appelle Juliette.' },
        { speaker: 'Layla', ar: 'تَشَرَّفْنَا! مِنْ أَيْنَ أَنْتِ؟', fr: 'Enchantée ! D’où viens-tu ?' },
        { speaker: 'Juliette', ar: 'أَنَا مِنْ فَرَنْسَا. وَأَنْتِ؟', fr: 'Je viens de France. Et toi ?' },
        { speaker: 'Layla', ar: 'أَنَا مِنْ مِصْرَ. مَاذَا تَعْمَلِينَ؟', fr: 'Je viens d’Égypte. Que fais-tu dans la vie ?' },
        { speaker: 'Juliette', ar: 'أَنَا طَبِيبَةٌ.', fr: 'Je suis médecin.' },
        { speaker: 'Layla', ar: 'رَائِعٌ!', fr: 'Formidable !' },
      ],
    },
    conversation: {
      intro: 'Layla veut faire votre connaissance.',
      steps: [
        { bot: p('مَا اسْمُكِ؟', 'mā smuki ?', 'Comment t’appelles-tu ?'), expected: ['اسمي', 'انا'], hint: p('اِسْمِي جُولْيِيت.', 'ismī Jūliyet.', 'Je m’appelle Juliette.') },
        { bot: p('مِنْ أَيْنَ أَنْتِ؟', 'min ayna anti ?', 'D’où viens-tu ?'), expected: ['انا من', 'من فرنسا'], hint: p('أَنَا مِنْ فَرَنْسَا.', 'anā min faransā.', 'Je viens de France.') },
        { bot: p('مَاذَا تَعْمَلِينَ؟', 'mādhā taʿmalīn ?', 'Que fais-tu dans la vie ?'), expected: ['انا', 'طبيبه'], hint: p('أَنَا طَبِيبَةٌ.', 'anā ṭabība.', 'Je suis médecin.') },
        { bot: p('تَشَرَّفْنَا!', 'tasharrafnā !', 'Enchantée !'), expected: ['تشرفنا', 'شكرا'], hint: p('تَشَرَّفْنَا!', 'tasharrafnā !', 'Enchantée !') },
      ],
    },
    dialect: [
      { dialect: 'Levantin', ar: 'شُو اسْمِك؟', tr: 'shū ismik ?', fr: 'comment t’appelles-tu ? (f)', msa: 'مَا اسْمُكِ؟' },
      { dialect: 'Levantin', ar: 'مِن وَين إِنْتِ؟', tr: 'min wēn inti ?', fr: 'd’où viens-tu ? (f)', msa: 'مِنْ أَيْنَ أَنْتِ؟' },
      { dialect: 'Égyptien', ar: 'اِسْمِك إِيه؟', tr: 'ismik ēh ?', fr: 'comment t’appelles-tu ? (f)', msa: 'مَا اسْمُكِ؟' },
      { dialect: 'Égyptien', ar: 'إِنْتِ مِنِين؟', tr: 'inti minēn ?', fr: 'd’où viens-tu ? (f)', msa: 'مِنْ أَيْنَ أَنْتِ؟' },
      { dialect: 'Marocain', ar: 'شْنُو سْمِيتْك؟', tr: 'shnū smītek ?', fr: 'comment t’appelles-tu ?', msa: 'مَا اسْمُكِ؟' },
    ],
  },

  /* ------------------------------------------------------------------ A1.3 */
  {
    id: 'a1-3',
    level: 'A1',
    order: 3,
    title: 'La famille',
    arTitle: 'اَلْعَائِلَةُ',
    subtitle: 'L’article ال, lettres solaires et lunaires, les possessifs',
    emoji: '👨‍👩‍👧',
    letters: ['sin', 'shin', 'sad', 'dad', 'tta', 'zza', 'ayn', 'ghayn'],
    grammar: {
      lessons: [
        {
          title: 'L’article défini ال',
          paragraphs: [
            'L’arabe n’a qu’un article défini, ال (al-), invariable : il vaut pour le masculin, le féminin, le singulier comme le pluriel. Il s’attache directement au mot.',
            'Il n’existe pas d’article indéfini : c’est le tanwīn final (-un, -an, -in) qui marque l’indéfini. كِتَابٌ = « un livre », اَلْكِتَابُ = « le livre ».',
          ],
          examples: [p('كِتَابٌ ← اَلْكِتَابُ', 'kitābun → al-kitābu', 'un livre → le livre'), p('بِنْتٌ ← اَلْبِنْتُ', 'bintun → al-bintu', 'une fille → la fille')],
        },
        {
          title: 'Lettres solaires et lettres lunaires',
          paragraphs: [
            'Devant quatorze lettres dites « solaires », le l de l’article ne se prononce pas : il s’assimile à la consonne suivante, qui est doublée (chadda). On écrit ال mais on dit « ash-shams », pas « al-shams ».',
            'Devant les quatorze autres, dites « lunaires », le l se prononce normalement : « al-qamar ». Les noms viennent justement de شَمْس (soleil) et قَمَر (lune).',
            'Lettres solaires : ت ث د ذ ر ز س ش ص ض ط ظ ل ن.',
          ],
          examples: [
            p('اَلشَّمْسُ', 'ash-shams', 'le soleil — lettre solaire'),
            p('اَلْقَمَرُ', 'al-qamar', 'la lune — lettre lunaire'),
            p('اَلسَّمَكُ', 'as-samak', 'le poisson — solaire'),
            p('اَلْبَحْرُ', 'al-baḥr', 'la mer — lunaire'),
          ],
        },
        {
          title: 'Les possessifs sont des suffixes',
          paragraphs: ['« Mon », « ton », « son »… s’accrochent à la fin du nom. Le ـة du féminin redevient alors un ت prononcé.'],
          table: {
            headers: ['Forme', 'Translittération', 'Sens'],
            rows: [
              ['ar:أُمِّي', 'ummī', 'ma mère'],
              ['ar:أُمُّكَ', 'ummuka', 'ta mère (à un homme)'],
              ['ar:أُمُّكِ', 'ummuki', 'ta mère (à une femme)'],
              ['ar:أُمُّهُ', 'ummuhu', 'sa mère (à lui)'],
              ['ar:أُمُّهَا', 'ummuhā', 'sa mère (à elle)'],
              ['ar:عَائِلَتِي', 'ʿā’ilatī', 'ma famille (ـة → ت)'],
            ],
          },
        },
      ],
      quiz: [
        { question: 'Comment se prononce ce mot ?', ar: 'اَلشَّمْسُ', options: ['al-shams', 'ash-shams', 'a-shams'], answer: 1 },
        { question: 'ق est-elle une lettre solaire ou lunaire ?', options: ['Solaire', 'Lunaire'], answer: 1, explanation: 'D’ailleurs « la lune » se dit اَلْقَمَر, al-qamar.' },
        { question: 'Comment dit-on « ma sœur » ?', options: ['أُخْتِي', 'أُخْتُكِ', 'أُخْتُهَا'], answer: 0 },
        { question: 'Comment dit-on « un livre » ?', options: ['اَلْكِتَابُ', 'كِتَابٌ', 'كِتَابِي'], answer: 1, explanation: 'Pas d’article indéfini : le tanwīn suffit.' },
      ],
    },
    pronunciation: [
      {
        title: 'Les emphatiques : un son plus sombre',
        paragraphs: [
          'ص ض ط ظ sont les versions « emphatiques » de س د ت ذ : la langue s’élargit et recule, et les voyelles voisines s’assombrissent. La différence change le sens !',
        ],
        examples: [p('سَيْفٌ', 'sayf', 'une épée'), p('صَيْفٌ', 'ṣayf', 'l’été'), p('تِينٌ', 'tīn', 'des figues'), p('طِينٌ', 'ṭīn', 'de l’argile')],
      },
      {
        title: 'ع et غ',
        paragraphs: ['Pour ع, serrez le fond de la gorge comme pour retenir un « a » étranglé. غ est un « r » grasseyé.'],
        examples: [p('عَيْنٌ', 'ʿayn', 'un œil'), p('عَرَبِيٌّ', 'ʿarabī', 'arabe'), p('غُرْفَةٌ', 'ghurfa', 'une chambre')],
      },
    ],
    writing: [
      {
        title: 'Quatre paires jumelles',
        paragraphs: [
          'س et ش (trois dents, trois points pour ش), ص et ض, ط et ظ, ع et غ : à chaque fois, un point fait la différence.',
          'Attention à ع : sa forme change beaucoup selon sa place. Elle est ouverte au début (عـ), fermée au milieu (ـعـ).',
        ],
        examples: [p('عـ ـعـ ـع ع', 'ʿ- -ʿ- -ʿ ʿ', 'les quatre formes de ʿayn')],
      },
    ],
    vocabulary: w('a1-3', [
      ['عَائِلَةٌ', 'ʿā’ila', 'une famille'],
      ['أُمٌّ', 'umm', 'une mère'],
      ['أَبٌ', 'ab', 'un père'],
      ['أَخٌ', 'akh', 'un frère'],
      ['أُخْتٌ', 'ukht', 'une sœur'],
      ['اِبْنٌ', 'ibn', 'un fils'],
      ['بِنْتٌ', 'bint', 'une fille'],
      ['جَدٌّ', 'jadd', 'un grand-père'],
      ['جَدَّةٌ', 'jadda', 'une grand-mère'],
      ['عَمٌّ', 'ʿamm', 'un oncle (frère du père)'],
      ['خَالٌ', 'khāl', 'un oncle (frère de la mère)'],
      ['زَوْجٌ', 'zawj', 'un mari'],
      ['زَوْجَةٌ', 'zawja', 'une épouse'],
      ['طِفْلٌ', 'ṭifl', 'un enfant'],
      ['عِنْدِي…', 'ʿindī…', 'j’ai… (« chez moi »)'],
    ]),
    mindmap: {
      center: p('اَلْعَائِلَةُ', 'al-ʿā’ila', 'la famille'),
      branches: [
        { label: 'Les parents', items: [p('أَبٌ', 'ab', 'père'), p('أُمٌّ', 'umm', 'mère')] },
        { label: 'Frères et sœurs', items: [p('أَخٌ', 'akh', 'frère'), p('أُخْتٌ', 'ukht', 'sœur')] },
        { label: 'Les grands-parents', items: [p('جَدٌّ', 'jadd', 'grand-père'), p('جَدَّةٌ', 'jadda', 'grand-mère')] },
        { label: 'Les oncles', items: [p('عَمٌّ', 'ʿamm', 'côté père'), p('خَالٌ', 'khāl', 'côté mère')] },
      ],
    },
    story: {
      title: 'La famille de Sami',
      lines: [
        p('هَذِهِ عَائِلَةُ سَامِي.', 'hādhihi ʿā’ilatu Sāmī.', 'Voici la famille de Sami.'),
        p('أَبُوهُ اسْمُهُ عُمَرُ، وَأُمُّهُ اسْمُهَا سَلْمَى.', 'abūhu smuhu ʿUmar, wa ummuhu smuhā Salmā.', 'Son père s’appelle Omar et sa mère Salma.'),
        p('عِنْدَ سَامِي أُخْتٌ صَغِيرَةٌ اسْمُهَا نُورُ.', 'ʿinda Sāmī ukhtun ṣaghīra smuhā Nūr.', 'Sami a une petite sœur qui s’appelle Nour.'),
        p('جَدَّتُهُ تَسْكُنُ مَعَهُمْ فِي الْبَيْتِ.', 'jaddatuhu taskunu maʿahum fī l-bayt.', 'Sa grand-mère habite avec eux à la maison.'),
        p('فِي الصَّيْفِ، تَذْهَبُ الْعَائِلَةُ إِلَى الْبَحْرِ.', 'fī ṣ-ṣayf, tadhhabu l-ʿā’ilatu ilā l-baḥr.', 'En été, la famille va à la mer.'),
      ],
    },
    podcast: {
      title: 'Frères et sœurs',
      intro: 'Juliette et Sami parlent de leurs familles.',
      lines: [
        { speaker: 'Juliette', ar: 'هَلْ عِنْدَكَ إِخْوَةٌ؟', fr: 'As-tu des frères et sœurs ?' },
        { speaker: 'Sami', ar: 'نَعَمْ، عِنْدِي أُخْتٌ وَاحِدَةٌ.', fr: 'Oui, j’ai une sœur.' },
        { speaker: 'Juliette', ar: 'مَا اسْمُهَا؟', fr: 'Comment s’appelle-t-elle ?' },
        { speaker: 'Sami', ar: 'اِسْمُهَا نُورُ. وَأَنْتِ؟', fr: 'Elle s’appelle Nour. Et toi ?' },
        { speaker: 'Juliette', ar: 'عِنْدِي أَخَوَانِ.', fr: 'J’ai deux frères. (duel)' },
        { speaker: 'Sami', ar: 'جَمِيلٌ!', fr: 'C’est chouette !' },
      ],
    },
    conversation: {
      intro: 'Sami s’intéresse à votre famille.',
      steps: [
        { bot: p('هَلْ عِنْدَكِ إِخْوَةٌ؟', 'hal ʿindaki ikhwa ?', 'As-tu des frères et sœurs ?'), expected: ['نعم', 'لا', 'عندي'], hint: p('نَعَمْ، عِنْدِي أَخٌ.', 'naʿam, ʿindī akh.', 'Oui, j’ai un frère.') },
        { bot: p('مَا اسْمُ أُمِّكِ؟', 'mā smu ummiki ?', 'Comment s’appelle ta mère ?'), expected: ['اسمها', 'امي'], hint: p('اِسْمُهَا…', 'ismuhā…', 'Elle s’appelle…') },
        { bot: p('أَيْنَ تَسْكُنُ عَائِلَتُكِ؟', 'ayna taskunu ʿā’ilatuki ?', 'Où habite ta famille ?'), expected: ['في', 'تسكن'], hint: p('فِي فَرَنْسَا.', 'fī faransā.', 'En France.') },
      ],
    },
    dialect: [
      { dialect: 'Levantin', ar: 'إِمِّي', tr: 'immī', fr: 'ma mère', msa: 'أُمِّي' },
      { dialect: 'Levantin', ar: 'خَيِّي', tr: 'khayyī', fr: 'mon frère', msa: 'أَخِي' },
      { dialect: 'Égyptien', ar: 'أَخُويَا', tr: 'akhūya', fr: 'mon frère', msa: 'أَخِي' },
      { dialect: 'Égyptien', ar: 'عَنْدِي', tr: 'ʿandī', fr: 'j’ai', msa: 'عِنْدِي' },
      { dialect: 'Marocain', ar: 'خُويَا', tr: 'khūya', fr: 'mon frère', msa: 'أَخِي' },
      { dialect: 'Marocain', ar: 'عَنْدِي', tr: 'ʿandī', fr: 'j’ai', msa: 'عِنْدِي' },
    ],
  },

  /* ------------------------------------------------------------------ A1.4 */
  {
    id: 'a1-4',
    level: 'A1',
    order: 4,
    title: 'Chez moi',
    arTitle: 'فِي الْبَيْتِ',
    subtitle: 'Les dernières lettres, le duel des noms, les nombres',
    emoji: '🏠',
    letters: ['fa', 'qaf', 'kaf', 'lam', 'mim', 'hha'],
    grammar: {
      lessons: [
        {
          title: 'Le duel des noms',
          paragraphs: [
            'Pour dire « deux livres », on n’utilise pas le nombre deux : on met le nom au duel en ajoutant ـَانِ (-āni). Le ـة du féminin redevient ت.',
            'Après une préposition ou comme complément d’objet, la terminaison devient ـَيْنِ (-ayni) : c’est l’effet des cas grammaticaux, que nous verrons plus loin.',
          ],
          examples: [
            p('كِتَابٌ ← كِتَابَانِ', 'kitāb → kitābān', 'un livre → deux livres'),
            p('غُرْفَةٌ ← غُرْفَتَانِ', 'ghurfa → ghurfatān', 'une chambre → deux chambres'),
            p('فِي غُرْفَتَيْنِ', 'fī ghurfatayn', 'dans deux chambres (-ayni)'),
          ],
        },
        {
          title: 'Ceci, cela',
          paragraphs: ['Le démonstratif s’accorde en genre… et a lui aussi un duel !'],
          table: {
            headers: ['Forme', 'Translittération', 'Sens'],
            rows: [
              ['ar:هَذَا', 'hādhā', 'ceci, celui-ci (m)'],
              ['ar:هَذِهِ', 'hādhihi', 'ceci, celle-ci (f)'],
              ['ar:هَذَانِ', 'hādhāni', 'ces deux-ci (m)'],
              ['ar:هَاتَانِ', 'hātāni', 'ces deux-ci (f)'],
              ['ar:ذَلِكَ', 'dhālika', 'cela, celui-là (m)'],
              ['ar:تِلْكَ', 'tilka', 'cela, celle-là (f)'],
            ],
          },
        },
        {
          title: 'Les nombres et les chiffres',
          paragraphs: [
            'Les chiffres utilisés au Moyen-Orient sont ٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩ ; au Maghreb, on emploie nos chiffres, qui sont d’ailleurs eux-mêmes d’origine arabe.',
            'Curiosité : au milieu d’un texte écrit de droite à gauche, les nombres se lisent de gauche à droite. ٢٠٢٦ se lit « deux mille vingt-six ».',
          ],
          table: {
            headers: ['Chiffre', 'Nombre', 'Translittération'],
            rows: [
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
      ],
      quiz: [
        { question: 'Comment dit-on « deux livres » ?', options: ['اِثْنَانِ كِتَابٌ', 'كِتَابَانِ', 'كُتُبٌ'], answer: 1 },
        { question: 'Quel démonstratif pour غُرْفَة (féminin) ?', options: ['هَذَا', 'هَذِهِ', 'هَذَانِ'], answer: 1 },
        { question: 'Quel est ce chiffre ?', ar: '٧', options: ['six', 'sept', 'huit'], answer: 1 },
        { question: 'Que signifie كَلْبٌ ?', options: ['un cœur', 'un chien', 'un stylo'], answer: 1, explanation: 'Ne confondez pas ك (kalb, chien) et ق (qalb, cœur) !' },
      ],
    },
    pronunciation: [
      {
        title: 'ق ou ك ? Attention au cœur et au chien',
        paragraphs: ['ك est notre « k ». ق se prononce bien plus en arrière, au niveau de la luette. Les confondre peut être cocasse :'],
        examples: [p('قَلْبٌ', 'qalb', 'un cœur'), p('كَلْبٌ', 'kalb', 'un chien'), p('قَمَرٌ', 'qamar', 'la lune')],
      },
      {
        title: 'Le ه en fin de mot',
        paragraphs: ['Le ه final se prononce, contrairement au ـة du féminin (« a » en pause).'],
        examples: [p('وَجْهٌ', 'wajh', 'un visage'), p('غُرْفَةٌ', 'ghurfa', 'une chambre')],
      },
    ],
    writing: [
      {
        title: 'Les lettres complémentaires',
        paragraphs: [
          'Trois signes complètent l’alphabet. ة (tā’ marbūṭa), le « t noué », n’apparaît qu’en fin de mot et marque souvent le féminin. ى (alif maqṣūra) est un alif final en forme de yā’ sans points. ء (hamza) note un coup de glotte, seule ou posée sur أ إ ؤ ئ.',
          'Enfin, ل suivi de ا forme une ligature obligatoire : لا (lā), que vous avez déjà rencontrée dans « non ».',
        ],
        examples: [p('مَدْرَسَةٌ', 'madrasa', 'une école (ـة)'), p('لَيْلَى', 'Laylā', 'Layla (ـى)'), p('لَا', 'lā', 'non (ligature لا)')],
      },
    ],
    vocabulary: w('a1-4', [
      ['بَيْتٌ', 'bayt', 'une maison'],
      ['غُرْفَةٌ', 'ghurfa', 'une chambre, une pièce'],
      ['مَطْبَخٌ', 'maṭbakh', 'une cuisine'],
      ['حَمَّامٌ', 'ḥammām', 'une salle de bain'],
      ['بَابٌ', 'bāb', 'une porte'],
      ['نَافِذَةٌ', 'nāfidha', 'une fenêtre'],
      ['سَرِيرٌ', 'sarīr', 'un lit'],
      ['كُرْسِيٌّ', 'kursī', 'une chaise'],
      ['طَاوِلَةٌ', 'ṭāwila', 'une table'],
      ['مِفْتَاحٌ', 'miftāḥ', 'une clé'],
      ['هُنَا', 'hunā', 'ici'],
      ['هُنَاكَ', 'hunāka', 'là-bas'],
      ['عَلَى الْيَمِينِ', 'ʿalā l-yamīn', 'à droite'],
      ['عَلَى الْيَسَارِ', 'ʿalā l-yasār', 'à gauche'],
      ['كَمْ…؟', 'kam… ?', 'combien… ?'],
    ]),
    mindmap: {
      center: p('اَلْبَيْتُ', 'al-bayt', 'la maison'),
      branches: [
        { label: 'Les pièces', items: [p('غُرْفَةٌ', 'ghurfa', 'chambre'), p('مَطْبَخٌ', 'maṭbakh', 'cuisine'), p('حَمَّامٌ', 'ḥammām', 'salle de bain')] },
        { label: 'Les meubles', items: [p('سَرِيرٌ', 'sarīr', 'lit'), p('كُرْسِيٌّ', 'kursī', 'chaise'), p('طَاوِلَةٌ', 'ṭāwila', 'table')] },
        { label: 'Les ouvertures', items: [p('بَابٌ', 'bāb', 'porte'), p('نَافِذَةٌ', 'nāfidha', 'fenêtre')] },
        { label: 'Se repérer', items: [p('هُنَا', 'hunā', 'ici'), p('عَلَى الْيَمِينِ', 'ʿalā l-yamīn', 'à droite')] },
      ],
    },
    story: {
      title: 'La maison au bord de la mer',
      lines: [
        p('بَيْتُ جُولْيِيت صَغِيرٌ وَجَمِيلٌ.', 'baytu Jūliyet ṣaghīrun wa jamīl.', 'La maison de Juliette est petite et belle.'),
        p('فِيهِ غُرْفَتَانِ وَمَطْبَخٌ وَحَمَّامٌ.', 'fīhi ghurfatāni wa maṭbakhun wa ḥammām.', 'Il y a deux chambres, une cuisine et une salle de bain.'),
        p('فِي غُرْفَتِهَا سَرِيرٌ وَطَاوِلَةٌ وَكُرْسِيٌّ.', 'fī ghurfatihā sarīrun wa ṭāwilatun wa kursī.', 'Dans sa chambre, il y a un lit, une table et une chaise.'),
        p('عَلَى الطَّاوِلَةِ ثَلَاثَةُ كُتُبٍ.', 'ʿalā ṭ-ṭāwilati thalāthatu kutub.', 'Sur la table, il y a trois livres.'),
        p('مِنَ النَّافِذَةِ، تَرَى جُولْيِيت الْبَحْرَ.', 'mina n-nāfidhati, tarā Jūliyet al-baḥr.', 'De la fenêtre, Juliette voit la mer.'),
      ],
    },
    podcast: {
      title: 'La visite',
      intro: 'Sami rend visite à Juliette.',
      lines: [
        { speaker: 'Sami', ar: 'هَلْ هَذَا بَيْتُكِ؟', fr: 'C’est ta maison ?' },
        { speaker: 'Juliette', ar: 'نَعَمْ، تَفَضَّلْ!', fr: 'Oui, entre donc !' },
        { speaker: 'Sami', ar: 'كَمْ غُرْفَةً فِيهِ؟', fr: 'Combien de pièces y a-t-il ?' },
        { speaker: 'Juliette', ar: 'فِيهِ غُرْفَتَانِ.', fr: 'Il y a deux chambres.' },
        { speaker: 'Sami', ar: 'وَأَيْنَ الْمَطْبَخُ؟', fr: 'Et où est la cuisine ?' },
        { speaker: 'Juliette', ar: 'اَلْمَطْبَخُ هُنَا، عَلَى الْيَمِينِ.', fr: 'La cuisine est ici, à droite.' },
      ],
    },
    conversation: {
      intro: 'Sami visite votre maison.',
      steps: [
        { bot: p('هَلْ هَذَا بَيْتُكِ؟', 'hal hādhā baytuki ?', 'C’est ta maison ?'), expected: ['نعم', 'لا', 'تفضل'], hint: p('نَعَمْ، تَفَضَّلْ!', 'naʿam, tafaḍḍal !', 'Oui, entre !') },
        { bot: p('كَمْ غُرْفَةً فِي بَيْتِكِ؟', 'kam ghurfatan fī baytiki ?', 'Combien de pièces chez toi ?'), expected: ['غرفه', 'غرفتان', 'فيه', 'ثلاث', 'اربع'], hint: p('فِيهِ غُرْفَتَانِ.', 'fīhi ghurfatān.', 'Il y a deux chambres.') },
        { bot: p('أَيْنَ الْمَطْبَخُ؟', 'ayna l-maṭbakh ?', 'Où est la cuisine ?'), expected: ['هنا', 'هناك', 'على'], hint: p('اَلْمَطْبَخُ هُنَا.', 'al-maṭbakhu hunā.', 'La cuisine est ici.') },
      ],
    },
    dialect: [
      { dialect: 'Levantin', ar: 'شُو هَيْدَا؟', tr: 'shū hayda ?', fr: 'qu’est-ce que c’est ?', msa: 'مَا هَذَا؟' },
      { dialect: 'Levantin', ar: 'فُوت!', tr: 'fūt !', fr: 'entre !', msa: 'تَفَضَّلْ!' },
      { dialect: 'Égyptien', ar: 'إِيه دَه؟', tr: 'ēh da ?', fr: 'qu’est-ce que c’est ?', msa: 'مَا هَذَا؟' },
      { dialect: 'Égyptien', ar: 'هِنَا', tr: 'hina', fr: 'ici', msa: 'هُنَا' },
      { dialect: 'Marocain', ar: 'آشْ هَادَا؟', tr: 'āsh hāda ?', fr: 'qu’est-ce que c’est ?', msa: 'مَا هَذَا؟' },
      { dialect: 'Marocain', ar: 'هْنَا', tr: 'hna', fr: 'ici', msa: 'هُنَا' },
    ],
  },
  /* ------------------------------------------------------------------ A2.1 */
  {
    id: 'a2-1',
    level: 'A2',
    order: 1,
    title: 'Raconter sa journée',
    arTitle: 'يَوْمِي',
    subtitle: 'Le passé, sa négation et les repères de temps',
    emoji: '🌅',
    grammar: {
      lessons: [
        {
          title: 'L’accompli : conjuguer au passé',
          paragraphs: [
            'Le passé se forme en ajoutant des suffixes à la base du verbe (la forme « il »). Prenons ذَهَبَ, « aller » : il suffit d’apprendre la série des terminaisons, identique pour presque tous les verbes réguliers.',
            'N’oubliez pas le duel : ذَهَبَا, « ils sont allés, tous les deux ».',
          ],
          table: {
            headers: ['Personne', 'Passé', 'Translittération'],
            rows: [
              ['je', 'ar:ذَهَبْتُ', 'dhahabtu'],
              ['tu (h)', 'ar:ذَهَبْتَ', 'dhahabta'],
              ['tu (f)', 'ar:ذَهَبْتِ', 'dhahabti'],
              ['il', 'ar:ذَهَبَ', 'dhahaba'],
              ['elle', 'ar:ذَهَبَتْ', 'dhahabat'],
              ['eux deux', 'ar:ذَهَبَا', 'dhahabā'],
              ['nous', 'ar:ذَهَبْنَا', 'dhahabnā'],
              ['ils', 'ar:ذَهَبُوا', 'dhahabū'],
            ],
          },
        },
        {
          title: 'La négation du passé : لَمْ',
          paragraphs: [
            'En arabe standard, on nie le passé avec لَمْ suivi du verbe… au présent, sous une forme raccourcie (l’« apocopé ») : la dernière voyelle tombe et devient soukoun.',
            'À l’oral, on entend aussi مَا suivi du passé : مَا ذَهَبْتُ. C’est correct, mais plus familier.',
          ],
          examples: [
            p('لَمْ أَذْهَبْ', 'lam adhhab', 'je ne suis pas allé(e)'),
            p('لَمْ يَأْكُلْ', 'lam ya’kul', 'il n’a pas mangé'),
            p('لَمْ نَفْهَمْ', 'lam nafham', 'nous n’avons pas compris'),
            p('مَا ذَهَبْتُ', 'mā dhahabtu', 'je ne suis pas allé(e) (plus oral)'),
          ],
        },
        {
          title: 'Les repères de temps',
          paragraphs: ['Les adverbes de temps sont souvent des noms à l’accusatif indéfini, d’où leur terminaison en -an : صَبَاحًا, « le matin ».'],
          examples: [
            p('أَمْسِ', 'amsi', 'hier'),
            p('اَلْيَوْمَ', 'al-yawma', 'aujourd’hui'),
            p('صَبَاحًا / مَسَاءً', 'ṣabāḥan / masā’an', 'le matin / le soir'),
            p('فِي السَّاعَةِ السَّابِعَةِ', 'fī s-sāʿati s-sābiʿa', 'à sept heures'),
            p('ثُمَّ / بَعْدَ ذَلِكَ', 'thumma / baʿda dhālika', 'puis / ensuite'),
          ],
        },
      ],
      quiz: [
        { question: 'Comment dit-on « je suis allée » ?', options: ['ذَهَبَتْ', 'ذَهَبْتُ', 'ذَهَبْنَا'], answer: 1 },
        { question: 'Comment dit-on « elle a écrit » ?', options: ['كَتَبَتْ', 'كَتَبْتِ', 'كَتَبُوا'], answer: 0 },
        { question: 'Comment nie-t-on « il a mangé » en arabe standard ?', options: ['لَا أَكَلَ', 'لَمْ يَأْكُلْ', 'لَنْ يَأْكُلَ'], answer: 1, explanation: 'لَمْ + présent raccourci.' },
        { question: 'Que veut dire أَمْسِ ?', options: ['demain', 'hier', 'maintenant'], answer: 1 },
      ],
    },
    pronunciation: [
      {
        title: 'La chadda change le sens',
        paragraphs: ['Doubler une consonne n’est pas un détail : c’est souvent le signe de la forme II, qui donne un sens différent. Tenez la consonne doublée un instant de plus.'],
        examples: [p('دَرَسَ', 'darasa', 'il a étudié'), p('دَرَّسَ', 'darrasa', 'il a enseigné'), p('عَلِمَ', 'ʿalima', 'il a su'), p('عَلَّمَ', 'ʿallama', 'il a appris (à quelqu’un)')],
      },
      {
        title: 'La hamza : un petit coup de glotte',
        paragraphs: ['La hamza (ء) est l’arrêt bref qu’on entend dans « un‿hibou » prononcé avec soin. Ne l’avalez pas au milieu du mot.'],
        examples: [p('أَكَلَ', 'akala', 'il a mangé'), p('سَأَلَ', 'sa’ala', 'il a demandé'), p('قَرَأَ', 'qara’a', 'il a lu')],
      },
    ],
    writing: [
      {
        title: 'Premiers pas dans la lecture sans voyelles',
        paragraphs: [
          'Sans diacritiques, un même squelette de lettres peut se lire de plusieurs façons. C’est le contexte, et votre connaissance des schèmes, qui tranchent.',
          'Essayez dès maintenant : dans ce palier, basculez sur « Sans diacritiques » et relisez l’histoire.',
        ],
        examples: [p('كَتَبَ', 'kataba', 'il a écrit — كتب'), p('كُتُبٌ', 'kutub', 'des livres — كتب'), p('كُتِبَ', 'kutiba', 'il a été écrit — كتب')],
      },
    ],
    vocabulary: w('a2-1', [
      ['اِسْتَيْقَظَ', 'istayqaẓa', 'il s’est réveillé'],
      ['ذَهَبَ إِلَى…', 'dhahaba ilā…', 'il est allé à…'],
      ['رَجَعَ', 'rajaʿa', 'il est rentré, revenu'],
      ['أَكَلَ', 'akala', 'il a mangé'],
      ['شَرِبَ', 'shariba', 'il a bu'],
      ['عَمِلَ', 'ʿamila', 'il a travaillé'],
      ['دَرَسَ', 'darasa', 'il a étudié'],
      ['قَرَأَ', 'qara’a', 'il a lu'],
      ['شَاهَدَ', 'shāhada', 'il a regardé'],
      ['سَبَحَ', 'sabaḥa', 'il a nagé'],
      ['نَامَ', 'nāma', 'il a dormi, il s’est couché'],
      ['أَمْسِ', 'amsi', 'hier'],
      ['اَلْيَوْمَ', 'al-yawma', 'aujourd’hui'],
      ['غَدًا', 'ghadan', 'demain'],
      ['اَلسَّاعَةُ', 'as-sāʿa', 'l’heure ; la montre'],
      ['طُولَ الْيَوْمِ', 'ṭūla l-yawm', 'toute la journée'],
    ]),
    mindmap: {
      center: p('يَوْمِي', 'yawmī', 'ma journée'),
      branches: [
        { label: 'Le matin', items: [p('اِسْتَيْقَظْتُ', 'istayqaẓtu', 'je me suis réveillée'), p('شَرِبْتُ الْقَهْوَةَ', 'sharibtu l-qahwa', 'j’ai bu le café')] },
        { label: 'Le travail', items: [p('ذَهَبْتُ إِلَى الْمُسْتَشْفَى', 'dhahabtu ilā l-mustashfā', 'je suis allée à l’hôpital'), p('عَمِلْتُ', 'ʿamiltu', 'j’ai travaillé')] },
        { label: 'Le soir', items: [p('رَجَعْتُ إِلَى الْبَيْتِ', 'rajaʿtu ilā l-bayt', 'je suis rentrée'), p('أَكَلْتُ', 'akaltu', 'j’ai mangé')] },
        { label: 'La nuit', items: [p('قَرَأْتُ رِوَايَةً', 'qara’tu riwāya', 'j’ai lu un roman'), p('نِمْتُ', 'nimtu', 'je me suis endormie')] },
      ],
    },
    story: {
      title: 'Une journée à l’hôpital',
      lines: [
        p('اِسْتَيْقَظَتْ جُولْيِيت فِي السَّاعَةِ السَّادِسَةِ.', 'istayqaẓat Jūliyet fī s-sāʿati s-sādisa.', 'Juliette s’est réveillée à six heures.'),
        p('شَرِبَتِ الْقَهْوَةَ وَأَكَلَتْ خُبْزًا.', 'sharibati l-qahwata wa akalat khubzan.', 'Elle a bu un café et mangé du pain.'),
        p('ثُمَّ ذَهَبَتْ إِلَى الْمُسْتَشْفَى.', 'thumma dhahabat ilā l-mustashfā.', 'Puis elle est allée à l’hôpital.'),
        p('فَحَصَتْ مَرْضَى كَثِيرِينَ، فَهِيَ طَبِيبَةٌ.', 'faḥaṣat marḍā kathīrīn, fa-hiya ṭabība.', 'Elle a examiné de nombreux patients, car elle est médecin.'),
        p('فِي الْمَسَاءِ، رَجَعَتْ إِلَى الْبَيْتِ.', 'fī l-masā’, rajaʿat ilā l-bayt.', 'Le soir, elle est rentrée à la maison.'),
        p('قَرَأَتْ رِوَايَةً، ثُمَّ نَامَتْ.', 'qara’at riwāyatan, thumma nāmat.', 'Elle a lu un roman, puis elle s’est endormie.'),
      ],
    },
    podcast: {
      title: 'Qu’as-tu fait hier ?',
      intro: 'Sami demande à Juliette comment s’est passée sa journée.',
      lines: [
        { speaker: 'Sami', ar: 'مَاذَا فَعَلْتِ أَمْسِ؟', fr: 'Qu’as-tu fait hier ?' },
        { speaker: 'Juliette', ar: 'عَمِلْتُ فِي الْمُسْتَشْفَى طُولَ الْيَوْمِ.', fr: 'J’ai travaillé à l’hôpital toute la journée.' },
        { speaker: 'Sami', ar: 'وَفِي الْمَسَاءِ؟', fr: 'Et le soir ?' },
        { speaker: 'Juliette', ar: 'ذَهَبْتُ إِلَى الْبَحْرِ مَعَ صَدِيقَتِي.', fr: 'Je suis allée à la mer avec mon amie.' },
        { speaker: 'Sami', ar: 'هَلْ سَبَحْتُمَا؟', fr: 'Vous avez nagé, toutes les deux ?' },
        { speaker: 'Juliette', ar: 'لَا، لَمْ نَسْبَحْ. كَانَ الْمَاءُ بَارِدًا.', fr: 'Non, nous n’avons pas nagé. L’eau était froide.' },
      ],
    },
    conversation: {
      intro: 'Sami vous interroge sur votre journée : répondez au passé.',
      steps: [
        { bot: p('مَاذَا فَعَلْتِ أَمْسِ؟', 'mādhā faʿalti amsi ?', 'Qu’as-tu fait hier ?'), expected: ['ذهبت', 'عملت', 'قرات', 'اكلت', 'شربت', 'درست', 'نمت', 'رجعت', 'شاهدت', 'سبحت'], hint: p('ذَهَبْتُ إِلَى الْعَمَلِ.', 'dhahabtu ilā l-ʿamal.', 'Je suis allée au travail.') },
        { bot: p('مَتَى اسْتَيْقَظْتِ الْيَوْمَ؟', 'matā stayqaẓti l-yawm ?', 'Quand t’es-tu réveillée aujourd’hui ?'), expected: ['استيقظت', 'الساعه', 'في'], hint: p('اِسْتَيْقَظْتُ فِي السَّاعَةِ السَّابِعَةِ.', 'istayqaẓtu fī s-sāʿati s-sābiʿa.', 'Je me suis réveillée à sept heures.') },
        { bot: p('هَلْ أَكَلْتِ؟', 'hal akalti ?', 'As-tu mangé ?'), expected: ['نعم', 'لا', 'اكلت', 'لم'], hint: p('لَا، لَمْ آكُلْ بَعْدُ.', 'lā, lam ākul baʿdu.', 'Non, je n’ai pas encore mangé.') },
      ],
    },
    dialect: [
      { dialect: 'Levantin', ar: 'شُو عْمِلْتِي مْبَارِح؟', tr: 'shū ʿmilti mbāreḥ ?', fr: 'qu’as-tu fait hier ? (f)', msa: 'مَاذَا فَعَلْتِ أَمْسِ؟' },
      { dialect: 'Levantin', ar: 'مَا رُحْت', tr: 'ma ruḥt', fr: 'je ne suis pas allé(e)', msa: 'لَمْ أَذْهَبْ' },
      { dialect: 'Égyptien', ar: 'عَمَلْتِي إِيه إِمْبَارِح؟', tr: 'ʿamalti ēh imbāreḥ ?', fr: 'qu’as-tu fait hier ? (f)', msa: 'مَاذَا فَعَلْتِ أَمْسِ؟' },
      { dialect: 'Égyptien', ar: 'مَا رُحْتِش', tr: 'ma ruḥtish', fr: 'je ne suis pas allé(e)', msa: 'لَمْ أَذْهَبْ' },
      { dialect: 'Marocain', ar: 'آشْ دَرْتِي الْبَارَح؟', tr: 'āsh derti l-bāreḥ ?', fr: 'qu’as-tu fait hier ? (f)', msa: 'مَاذَا فَعَلْتِ أَمْسِ؟' },
      { dialect: 'Marocain', ar: 'مَا مْشِيتْش', tr: 'ma mshītsh', fr: 'je ne suis pas allé(e)', msa: 'لَمْ أَذْهَبْ' },
    ],
  },

  /* ------------------------------------------------------------------ A2.2 */
  {
    id: 'a2-2',
    level: 'A2',
    order: 2,
    title: 'En ville et au marché',
    arTitle: 'فِي الْمَدِينَةِ',
    subtitle: 'Le présent, le futur, acheter et s’orienter',
    emoji: '🏙️',
    grammar: {
      lessons: [
        {
          title: 'L’inaccompli : le présent',
          paragraphs: [
            'Au présent, la personne s’entend d’abord au début du verbe : أَ (je), تَ (tu, elle), يَ (il), نَ (nous). Des suffixes complètent pour le féminin, le duel et le pluriel.',
          ],
          table: {
            headers: ['Personne', 'Présent', 'Translittération'],
            rows: [
              ['je', 'ar:أَذْهَبُ', 'adhhabu'],
              ['tu (h)', 'ar:تَذْهَبُ', 'tadhhabu'],
              ['tu (f)', 'ar:تَذْهَبِينَ', 'tadhhabīna'],
              ['il', 'ar:يَذْهَبُ', 'yadhhabu'],
              ['elle', 'ar:تَذْهَبُ', 'tadhhabu'],
              ['eux deux', 'ar:يَذْهَبَانِ', 'yadhhabāni'],
              ['nous', 'ar:نَذْهَبُ', 'nadhhabu'],
              ['ils', 'ar:يَذْهَبُونَ', 'yadhhabūna'],
            ],
          },
        },
        {
          title: 'Le futur : سَـ ou سَوْفَ',
          paragraphs: [
            'Pour parler de l’avenir, on place سَـ (collé au verbe) ou سَوْفَ (séparé, un peu plus lointain ou plus solennel) devant le présent.',
            'Le futur se nie avec لَنْ, suivi du présent dont la voyelle finale devient -a (le « subjonctif »).',
          ],
          examples: [
            p('سَأَذْهَبُ غَدًا', 'sa-adhhabu ghadan', 'j’irai demain'),
            p('سَوْفَ نُسَافِرُ', 'sawfa nusāfiru', 'nous voyagerons'),
            p('لَنْ أَذْهَبَ', 'lan adhhaba', 'je n’irai pas'),
          ],
        },
        {
          title: 'Nier le présent : لَا',
          paragraphs: ['Le présent se nie très simplement avec لَا, placé devant le verbe.'],
          examples: [p('لَا أَفْهَمُ', 'lā afhamu', 'je ne comprends pas'), p('لَا يَعْمَلُ الْيَوْمَ', 'lā yaʿmalu l-yawm', 'il ne travaille pas aujourd’hui')],
        },
      ],
      quiz: [
        { question: 'Comment dit-on « nous allons » ?', options: ['نَذْهَبُ', 'ذَهَبْنَا', 'يَذْهَبُونَ'], answer: 0 },
        { question: 'Comment dit-on « tu vas » à une femme ?', options: ['تَذْهَبُ', 'تَذْهَبِينَ', 'تَذْهَبَانِ'], answer: 1 },
        { question: 'Comment dit-on « j’irai » ?', options: ['سَأَذْهَبُ', 'ذَهَبْتُ', 'لَنْ أَذْهَبَ'], answer: 0 },
        { question: 'Quelle particule nie le futur ?', options: ['لَمْ', 'لَا', 'لَنْ'], answer: 2, explanation: 'لَمْ nie le passé, لَا le présent, لَنْ le futur.' },
      ],
    },
    pronunciation: [
      {
        title: 'و et ي : consonnes ou voyelles ?',
        paragraphs: ['Ces deux lettres jouent un double rôle : consonnes (w, y) devant une voyelle, voyelles longues (ū, ī) après une voyelle brève de même timbre.'],
        examples: [p('وَلَدٌ', 'walad', 'un garçon (w consonne)'), p('نُورٌ', 'nūr', 'la lumière (ū long)'), p('يَوْمٌ', 'yawm', 'un jour (y consonne)'), p('بُيُوتٌ', 'buyūt', 'des maisons')],
      },
    ],
    writing: [
      {
        title: 'L’alif madda : آ',
        paragraphs: ['Quand une hamza est suivie d’un a long, on n’écrit pas deux alifs : on les fond en un seul alif coiffé d’une vague, la madda (آ), qui se lit « ’ā ».'],
        examples: [p('آسِفٌ / آسِفَةٌ', 'āsif / āsifa', 'désolé / désolée'), p('اَلْآنَ', 'al-āna', 'maintenant'), p('مِرْآةٌ', 'mir’āt', 'un miroir')],
      },
    ],
    vocabulary: w('a2-2', [
      ['مَدِينَةٌ', 'madīna', 'une ville'],
      ['شَارِعٌ', 'shāriʿ', 'une rue'],
      ['سُوقٌ', 'sūq', 'un marché'],
      ['مَتْجَرٌ', 'matjar', 'un magasin'],
      ['صَيْدَلِيَّةٌ', 'ṣaydaliyya', 'une pharmacie'],
      ['مَصْرِفٌ', 'maṣrif', 'une banque'],
      ['مَحَطَّةٌ', 'maḥaṭṭa', 'une gare, une station'],
      ['حَافِلَةٌ', 'ḥāfila', 'un bus'],
      ['أُرِيدُ…', 'urīdu…', 'je veux, je voudrais…'],
      ['أَشْتَرِي', 'ashtarī', 'j’achète'],
      ['كَمِ السِّعْرُ؟', 'kami s-siʿr ?', 'quel est le prix ?'],
      ['غَالٍ / رَخِيصٌ', 'ghālin / rakhīṣ', 'cher / bon marché'],
      ['نُقُودٌ', 'nuqūd', 'de l’argent'],
      ['قَرِيبٌ / بَعِيدٌ', 'qarīb / baʿīd', 'proche / loin'],
      ['اِذْهَبْ مُسْتَقِيمًا', 'idhhab mustaqīman', 'allez tout droit'],
      ['آسِفٌ / آسِفَةٌ', 'āsif / āsifa', 'désolé / désolée'],
    ]),
    mindmap: {
      center: p('اَلْمَدِينَةُ', 'al-madīna', 'la ville'),
      branches: [
        { label: 'Les lieux', items: [p('سُوقٌ', 'sūq', 'marché'), p('صَيْدَلِيَّةٌ', 'ṣaydaliyya', 'pharmacie'), p('مَحَطَّةٌ', 'maḥaṭṭa', 'gare')] },
        { label: 'Acheter', items: [p('أُرِيدُ…', 'urīdu…', 'je voudrais…'), p('كَمِ السِّعْرُ؟', 'kami s-siʿr ?', 'combien ?'), p('غَالٍ', 'ghālin', 'cher')] },
        { label: 'S’orienter', items: [p('مُسْتَقِيمًا', 'mustaqīman', 'tout droit'), p('عَلَى الْيَسَارِ', 'ʿalā l-yasār', 'à gauche'), p('قَرِيبٌ', 'qarīb', 'proche')] },
        { label: 'Se déplacer', items: [p('حَافِلَةٌ', 'ḥāfila', 'bus'), p('سَيْرًا عَلَى الْأَقْدَامِ', 'sayran ʿalā l-aqdām', 'à pied')] },
      ],
    },
    story: {
      title: 'Au marché de la ville',
      lines: [
        p('كُلَّ يَوْمِ سَبْتٍ، تَذْهَبُ جُولْيِيت إِلَى السُّوقِ.', 'kulla yawmi sabt, tadhhabu Jūliyet ilā s-sūq.', 'Chaque samedi, Juliette va au marché.'),
        p('تَشْتَرِي الْخُضَارَ وَالْفَوَاكِهَ.', 'tashtarī l-khuḍāra wa l-fawākih.', 'Elle achète des légumes et des fruits.'),
        p('يَقُولُ الْبَائِعُ: أَهْلًا! مَاذَا تُرِيدِينَ؟', 'yaqūlu l-bā’iʿ : ahlan ! mādhā turīdīn ?', 'Le vendeur dit : « Bonjour ! Que voulez-vous ? »'),
        p('تَقُولُ: أُرِيدُ كِيلُو تُفَّاحٍ، مِنْ فَضْلِكَ.', 'taqūlu : urīdu kīlū tuffāḥ, min faḍlik.', 'Elle dit : « Je voudrais un kilo de pommes, s’il vous plaît. »'),
        p('ثُمَّ تَسْأَلُ: كَمِ السِّعْرُ؟', 'thumma tas’alu : kami s-siʿr ?', 'Puis elle demande : « Combien ça coûte ? »'),
        p('غَدًا سَتَذْهَبُ إِلَى الصَّيْدَلِيَّةِ أَيْضًا.', 'ghadan sa-tadhhabu ilā ṣ-ṣaydaliyyati ayḍan.', 'Demain, elle ira aussi à la pharmacie.'),
      ],
    },
    podcast: {
      title: 'Où est la pharmacie ?',
      intro: 'Juliette demande son chemin à un passant.',
      lines: [
        { speaker: 'Juliette', ar: 'عَفْوًا، أَيْنَ الصَّيْدَلِيَّةُ؟', fr: 'Excusez-moi, où est la pharmacie ?' },
        { speaker: 'Passant', ar: 'اِذْهَبِي مُسْتَقِيمًا، ثُمَّ عَلَى الْيَسَارِ.', fr: 'Allez tout droit, puis à gauche.' },
        { speaker: 'Juliette', ar: 'هَلْ هِيَ بَعِيدَةٌ؟', fr: 'Est-ce loin ?' },
        { speaker: 'Passant', ar: 'لَا، هِيَ قَرِيبَةٌ جِدًّا: خَمْسُ دَقَائِقَ سَيْرًا.', fr: 'Non, c’est tout près : cinq minutes à pied.' },
        { speaker: 'Juliette', ar: 'شُكْرًا جَزِيلًا!', fr: 'Merci beaucoup !' },
        { speaker: 'Passant', ar: 'عَفْوًا، مَعَ السَّلَامَةِ.', fr: 'De rien, au revoir.' },
      ],
    },
    conversation: {
      intro: 'Vous êtes au marché ; le vendeur s’adresse à vous.',
      steps: [
        { bot: p('أَهْلًا! مَاذَا تُرِيدِينَ؟', 'ahlan ! mādhā turīdīn ?', 'Bonjour ! Que voulez-vous ?'), expected: ['اريد', 'من فضلك'], hint: p('أُرِيدُ تُفَّاحًا، مِنْ فَضْلِكَ.', 'urīdu tuffāḥan, min faḍlik.', 'Je voudrais des pommes, s’il vous plaît.') },
        { bot: p('كَمْ كِيلُو تُرِيدِينَ؟', 'kam kīlū turīdīn ?', 'Combien de kilos voulez-vous ?'), expected: ['كيلو', 'واحد', 'اثنين', 'ثلاثه'], hint: p('كِيلُو وَاحِدٌ.', 'kīlū wāḥid.', 'Un kilo.') },
        { bot: p('شَيْءٌ آخَرُ؟', 'shay’un ākhar ?', 'Autre chose ?'), expected: ['لا', 'شكرا', 'نعم', 'كم'], hint: p('لَا، شُكْرًا. كَمِ السِّعْرُ؟', 'lā, shukran. kami s-siʿr ?', 'Non, merci. Combien ça coûte ?') },
      ],
    },
    dialect: [
      { dialect: 'Levantin', ar: 'بَدِّي', tr: 'baddī', fr: 'je veux', msa: 'أُرِيدُ' },
      { dialect: 'Levantin', ar: 'قَدِّيش؟', tr: 'addēsh ?', fr: 'combien ?', msa: 'كَمِ السِّعْرُ؟' },
      { dialect: 'Égyptien', ar: 'عَايْزَة', tr: 'ʿāyza', fr: 'je veux (au féminin)', msa: 'أُرِيدُ' },
      { dialect: 'Égyptien', ar: 'بِكَام؟', tr: 'bikām ?', fr: 'combien ?', msa: 'كَمِ السِّعْرُ؟' },
      { dialect: 'Marocain', ar: 'بْغِيت', tr: 'bghīt', fr: 'je veux', msa: 'أُرِيدُ' },
      { dialect: 'Marocain', ar: 'بْشْحَال؟', tr: 'bshḥāl ?', fr: 'combien ?', msa: 'كَمِ السِّعْرُ؟' },
    ],
  },

  /* ------------------------------------------------------------------ A2.3 */
  {
    id: 'a2-3',
    level: 'A2',
    order: 3,
    title: 'Au restaurant',
    arTitle: 'فِي الْمَطْعَمِ',
    subtitle: 'L’annexion, les pluriels brisés, aimer et vouloir',
    emoji: '🍽️',
    grammar: {
      lessons: [
        {
          title: 'L’annexion (اَلْإِضَافَةُ)',
          paragraphs: [
            'Pour dire « le livre de l’étudiant » ou « une tasse de café », l’arabe juxtapose deux noms. Le premier perd article et tanwīn ; le second se met au génitif. C’est lui qui rend l’ensemble défini ou indéfini.',
            'Si le premier nom finit par ـة, celle-ci se prononce alors t : قَائِمَةُ الطَّعَامِ, « qā’imatu ṭ-ṭaʿām ».',
          ],
          examples: [
            p('كِتَابُ الطَّالِبِ', 'kitābu ṭ-ṭālibi', 'le livre de l’étudiant'),
            p('فِنْجَانُ قَهْوَةٍ', 'finjānu qahwatin', 'une tasse de café'),
            p('قَائِمَةُ الطَّعَامِ', 'qā’imatu ṭ-ṭaʿāmi', 'le menu (« la liste de la nourriture »)'),
            p('مَطْعَمُ الْفُنْدُقِ', 'maṭʿamu l-funduqi', 'le restaurant de l’hôtel'),
          ],
        },
        {
          title: 'Les pluriels brisés',
          paragraphs: [
            'La plupart des noms arabes forment leur pluriel en modifiant l’intérieur du mot, autour de la racine : c’est le « pluriel brisé ». Il faut l’apprendre avec le singulier, comme un genre en français.',
            'Règle d’or : un pluriel qui ne désigne pas des humains s’accorde au féminin singulier. « Les livres sont beaux » se dit اَلْكُتُبُ جَمِيلَةٌ.',
          ],
          table: {
            headers: ['Singulier', 'Pluriel', 'Sens'],
            rows: [
              ['ar:كِتَابٌ', 'ar:كُتُبٌ', 'livre'],
              ['ar:بَيْتٌ', 'ar:بُيُوتٌ', 'maison'],
              ['ar:وَلَدٌ', 'ar:أَوْلَادٌ', 'garçon, enfant'],
              ['ar:طَبَقٌ', 'ar:أَطْبَاقٌ', 'plat, assiette'],
              ['ar:مَطْعَمٌ', 'ar:مَطَاعِمُ', 'restaurant'],
              ['ar:كَأْسٌ', 'ar:كُؤُوسٌ', 'verre'],
            ],
          },
        },
        {
          title: 'Aimer et vouloir',
          paragraphs: ['أُحِبُّ (j’aime) et أُرِيدُ (je veux) se construisent avec un nom, ou avec أَنْ suivi d’un verbe au subjonctif (voyelle finale -a).'],
          examples: [
            p('أُحِبُّ السَّمَكَ', 'uḥibbu s-samak', 'j’aime le poisson'),
            p('لَا أُحِبُّ اللَّحْمَ', 'lā uḥibbu l-laḥm', 'je n’aime pas la viande'),
            p('أُرِيدُ أَنْ أَشْرَبَ', 'urīdu an ashraba', 'je veux boire'),
          ],
        },
      ],
      quiz: [
        { question: 'Comment dit-on « une tasse de café » ?', options: ['فِنْجَانُ قَهْوَةٍ', 'اَلْفِنْجَانُ الْقَهْوَةُ', 'فِنْجَانٌ قَهْوَةٌ'], answer: 0 },
        { question: 'Quel est le pluriel de كِتَابٌ ?', options: ['كِتَابَاتٌ', 'كُتُبٌ', 'كِتَابُونَ'], answer: 1 },
        { question: '« Les plats sont délicieux » : quel accord ?', options: ['اَلْأَطْبَاقُ لَذِيذَةٌ', 'اَلْأَطْبَاقُ لَذِيذُونَ', 'اَلْأَطْبَاقُ لَذِيذٌ'], answer: 0, explanation: 'Pluriel non humain → féminin singulier.' },
        { question: 'Comment dit-on « je veux boire » ?', options: ['أُرِيدُ شَرِبْتُ', 'أُرِيدُ أَنْ أَشْرَبَ', 'أُحِبُّ شَرِبَ'], answer: 1 },
      ],
    },
    pronunciation: [
      {
        title: 'Le ـة qui se réveille',
        paragraphs: ['Seule, la tā’ marbūṭa se prononce « a ». Dès que le mot est suivi d’un complément (annexion) ou d’un possessif, elle se réveille en « t ».'],
        examples: [p('قَائِمَةٌ', 'qā’ima', 'une liste'), p('قَائِمَةُ الطَّعَامِ', 'qā’imatu ṭ-ṭaʿām', 'le menu'), p('كُرَةُ الْقَدَمِ', 'kuratu l-qadam', 'le football')],
      },
    ],
    writing: [
      {
        title: 'Les sièges de la hamza',
        paragraphs: [
          'La hamza s’assoit sur un support qui dépend des voyelles voisines : sur un alif (أ, إ) avec a ou en début de mot, sur un wāw (ؤ) avec u, sur un yā’ sans points (ئ) avec i. Seule, elle reste sur la ligne (ء).',
        ],
        examples: [p('سُؤَالٌ', 'su’āl', 'une question (ؤ)'), p('كُؤُوسٌ', 'ku’ūs', 'des verres (ؤ)'), p('رِئَةٌ', 'ri’a', 'un poumon (ئ)'), p('مَاءٌ', 'mā’', 'de l’eau (ء)')],
      },
    ],
    vocabulary: w('a2-3', [
      ['مَطْعَمٌ', 'maṭʿam', 'un restaurant'],
      ['قَائِمَةُ الطَّعَامِ', 'qā’imatu ṭ-ṭaʿām', 'le menu'],
      ['نَادِلٌ / نَادِلَةٌ', 'nādil / nādila', 'un serveur / une serveuse'],
      ['طَاوِلَةٌ لِشَخْصَيْنِ', 'ṭāwila li-shakhṣayn', 'une table pour deux'],
      ['طَبَقٌ / أَطْبَاقٌ', 'ṭabaq / aṭbāq', 'un plat / des plats'],
      ['فُطُورٌ', 'fuṭūr', 'le petit-déjeuner'],
      ['غَدَاءٌ', 'ghadā’', 'le déjeuner'],
      ['عَشَاءٌ', 'ʿashā’', 'le dîner'],
      ['حِسَاءٌ', 'ḥisā’', 'une soupe'],
      ['سَلَطَةٌ', 'salaṭa', 'une salade'],
      ['لَذِيذٌ', 'ladhīdh', 'délicieux'],
      ['حَارٌّ', 'ḥārr', 'épicé ; chaud'],
      ['حُلْوٌ / مَالِحٌ', 'ḥulw / māliḥ', 'sucré / salé'],
      ['نَبَاتِيٌّ / نَبَاتِيَّةٌ', 'nabātī / nabātiyya', 'végétarien / végétarienne'],
      ['أُحِبُّ', 'uḥibbu', 'j’aime'],
      ['اَلْحِسَابُ مِنْ فَضْلِكَ', 'al-ḥisābu min faḍlik', 'l’addition, s’il vous plaît'],
    ]),
    mindmap: {
      center: p('اَلْمَطْعَمُ', 'al-maṭʿam', 'le restaurant'),
      branches: [
        { label: 'Les repas', items: [p('فُطُورٌ', 'fuṭūr', 'petit-déjeuner'), p('غَدَاءٌ', 'ghadā’', 'déjeuner'), p('عَشَاءٌ', 'ʿashā’', 'dîner')] },
        { label: 'Les goûts', items: [p('لَذِيذٌ', 'ladhīdh', 'délicieux'), p('حَارٌّ', 'ḥārr', 'épicé'), p('حُلْوٌ', 'ḥulw', 'sucré')] },
        { label: 'Commander', items: [p('قَائِمَةُ الطَّعَامِ', 'qā’imatu ṭ-ṭaʿām', 'le menu'), p('أُرِيدُ…', 'urīdu…', 'je voudrais…'), p('اَلْحِسَابُ', 'al-ḥisāb', 'l’addition')] },
        { label: 'Des pluriels', items: [p('طَبَقٌ ← أَطْبَاقٌ', 'ṭabaq → aṭbāq', 'plat → plats'), p('كَأْسٌ ← كُؤُوسٌ', 'ka’s → ku’ūs', 'verre → verres')] },
      ],
    },
    story: {
      title: 'Dîner sur la plage',
      lines: [
        p('ذَهَبَتْ جُولْيِيت وَلَيْلَى إِلَى مَطْعَمٍ عَلَى الشَّاطِئِ.', 'dhahabat Jūliyet wa Laylā ilā maṭʿamin ʿalā sh-shāṭi’.', 'Juliette et Layla sont allées dans un restaurant sur la plage.'),
        p('طَلَبَتَا طَاوِلَةً لِشَخْصَيْنِ قُرْبَ الْبَحْرِ.', 'ṭalabatā ṭāwilatan li-shakhṣayni qurba l-baḥr.', 'Elles ont demandé une table pour deux près de la mer. (duel)'),
        p('قَرَأَتْ جُولْيِيت قَائِمَةَ الطَّعَامِ.', 'qara’at Jūliyet qā’imata ṭ-ṭaʿām.', 'Juliette a lu le menu.'),
        p('أَطْبَاقُ السَّمَكِ لَذِيذَةٌ هُنَا.', 'aṭbāqu s-samaki ladhīdhatun hunā.', 'Les plats de poisson sont délicieux ici.'),
        p('شَرِبَتَا عَصِيرَ لَيْمُونٍ بِالنَّعْنَاعِ.', 'sharibatā ʿaṣīra laymūnin bi-n-naʿnāʿ.', 'Elles ont bu un jus de citron à la menthe.'),
        p('فِي النِّهَايَةِ، قَالَتْ لَيْلَى: اَلْحِسَابُ مِنْ فَضْلِكَ!', 'fī n-nihāya, qālat Laylā : al-ḥisābu min faḍlik !', 'À la fin, Layla a dit : « L’addition, s’il vous plaît ! »'),
      ],
    },
    podcast: {
      title: 'La commande',
      intro: 'Le serveur accueille Juliette.',
      lines: [
        { speaker: 'Serveur', ar: 'مَسَاءُ الْخَيْرِ! تَفَضَّلِي، هَذِهِ قَائِمَةُ الطَّعَامِ.', fr: 'Bonsoir ! Je vous en prie, voici le menu.' },
        { speaker: 'Juliette', ar: 'شُكْرًا. بِمَاذَا تَنْصَحُنِي؟', fr: 'Merci. Que me conseillez-vous ?' },
        { speaker: 'Serveur', ar: 'سَمَكُ الْيَوْمِ لَذِيذٌ جِدًّا.', fr: 'Le poisson du jour est excellent.' },
        { speaker: 'Juliette', ar: 'هَلْ هُوَ حَارٌّ؟', fr: 'Est-il épicé ?' },
        { speaker: 'Serveur', ar: 'قَلِيلًا فَقَطْ.', fr: 'Juste un peu.' },
        { speaker: 'Juliette', ar: 'طَيِّبٌ، أُرِيدُ سَمَكَ الْيَوْمِ وَسَلَطَةً.', fr: 'D’accord, je voudrais le poisson du jour et une salade.' },
        { speaker: 'Serveur', ar: 'وَمَاذَا تَشْرَبِينَ؟', fr: 'Et que buvez-vous ?' },
        { speaker: 'Juliette', ar: 'كَأْسَ نَبِيذٍ أَبْيَضَ، مِنْ فَضْلِكَ.', fr: 'Un verre de vin blanc, s’il vous plaît.' },
      ],
    },
    conversation: {
      intro: 'Vous entrez dans un restaurant ; le serveur vous accueille.',
      steps: [
        { bot: p('مَسَاءُ الْخَيْرِ! كَمْ شَخْصًا؟', 'masā’u l-khayr ! kam shakhṣan ?', 'Bonsoir ! Combien de personnes ?'), expected: ['شخص', 'واحد', 'اثنين', 'ثلاثه', 'نحن'], hint: p('شَخْصَانِ، مِنْ فَضْلِكَ.', 'shakhṣān, min faḍlik.', 'Deux personnes, s’il vous plaît.') },
        { bot: p('مَاذَا تُرِيدِينَ أَنْ تَأْكُلِي؟', 'mādhā turīdīna an ta’kulī ?', 'Que voulez-vous manger ?'), expected: ['اريد', 'سمك', 'سلطه', 'حساء', 'لحم'], hint: p('أُرِيدُ السَّمَكَ، مِنْ فَضْلِكَ.', 'urīdu s-samak, min faḍlik.', 'Je voudrais le poisson, s’il vous plaît.') },
        { bot: p('هَلْ كَانَ الطَّعَامُ لَذِيذًا؟', 'hal kāna ṭ-ṭaʿāmu ladhīdhan ?', 'Le repas était-il bon ?'), expected: ['نعم', 'لذيذ', 'شكرا'], hint: p('نَعَمْ، كَانَ لَذِيذًا جِدًّا!', 'naʿam, kāna ladhīdhan jiddan !', 'Oui, c’était délicieux !') },
      ],
    },
    dialect: [
      { dialect: 'Levantin', ar: 'كْتِير طَيِّب', tr: 'ktīr ṭayyeb', fr: 'très bon (délicieux)', msa: 'لَذِيذٌ جِدًّا' },
      { dialect: 'Levantin', ar: 'الْحْسَاب لَوْ سَمَحْت', tr: 'l-ḥsāb law samaḥt', fr: 'l’addition, s’il vous plaît', msa: 'اَلْحِسَابُ مِنْ فَضْلِكَ' },
      { dialect: 'Égyptien', ar: 'حِلْو أَوِي', tr: 'ḥilw awi', fr: 'très bon', msa: 'لَذِيذٌ جِدًّا' },
      { dialect: 'Égyptien', ar: 'عَايْزَة أَطْلُب', tr: 'ʿāyza aṭlub', fr: 'je voudrais commander (f)', msa: 'أُرِيدُ أَنْ أَطْلُبَ' },
      { dialect: 'Marocain', ar: 'بْنِين', tr: 'bnīn', fr: 'délicieux', msa: 'لَذِيذٌ' },
      { dialect: 'Marocain', ar: 'الْحْسَاب عَافَاك', tr: 'l-ḥsāb ʿafāk', fr: 'l’addition, s’il vous plaît', msa: 'اَلْحِسَابُ مِنْ فَضْلِكَ' },
    ],
  },

  /* ------------------------------------------------------------------ B1.1 */
  {
    id: 'b1-1',
    level: 'B1',
    order: 1,
    title: 'Les formes dérivées en action',
    arTitle: 'أَوْزَانُ الْفِعْلِ',
    subtitle: 'Formes II, V et X, le maṣdar, une journée à l’hôpital',
    emoji: '🌳',
    grammar: {
      lessons: [
        {
          title: 'Forme II : intensifier, faire faire',
          paragraphs: [
            'En doublant la deuxième consonne de la racine, on obtient la forme II. Elle rend une action plus intense, ou la fait faire à quelqu’un d’autre : savoir → faire savoir, c’est-à-dire enseigner.',
            'Au présent, les formes II, III et IV prennent le préfixe yu- (et non ya-) : يُدَرِّسُ, « il enseigne ».',
          ],
          examples: [
            p('دَرَسَ ← دَرَّسَ', 'darasa → darrasa', 'étudier → enseigner'),
            p('عَلِمَ ← عَلَّمَ', 'ʿalima → ʿallama', 'savoir → apprendre (à quelqu’un)'),
            p('نَظِيفٌ ← نَظَّفَ', 'naẓīf → naẓẓafa', 'propre → nettoyer'),
            p('يُدَرِّسُ', 'yudarrisu', 'il enseigne (présent en yu-)'),
          ],
        },
        {
          title: 'Forme V et forme X',
          paragraphs: [
            'La forme V ajoute un ت devant la forme II : elle exprime ce qu’on fait pour soi-même. « Faire savoir » devient « se faire savoir » : apprendre.',
            'La forme X ajoute اِسْتَـ devant la racine : elle exprime souvent la demande, ou le fait de trouver ou de rendre quelque chose tel. Elle est très fréquente dans la langue moderne.',
          ],
          examples: [
            p('تَعَلَّمَ', 'taʿallama', 'apprendre (forme V)'),
            p('تَكَلَّمَ', 'takallama', 'parler (forme V)'),
            p('تَذَكَّرَ', 'tadhakkara', 'se souvenir (forme V)'),
            p('اِسْتَعْمَلَ', 'istaʿmala', 'utiliser (forme X, de عَمِلَ « faire »)'),
            p('اِسْتَقْبَلَ', 'istaqbala', 'accueillir (forme X)'),
            p('اِسْتَشَارَ', 'istashāra', 'consulter, demander conseil (forme X)'),
          ],
        },
        {
          title: 'Le maṣdar : le nom d’action',
          paragraphs: [
            'Chaque forme a son nom d’action, le maṣdar, un peu comme nos noms en « -tion ». À partir de la forme II, il est parfaitement régulier : connaître le schème, c’est savoir former des centaines de mots.',
          ],
          table: {
            headers: ['Forme', 'Schème', 'Exemple', 'Sens'],
            rows: [
              ['II', 'ar:تَفْعِيلٌ', 'ar:تَعْلِيمٌ', 'l’enseignement'],
              ['III', 'ar:مُفَاعَلَةٌ', 'ar:مُسَاعَدَةٌ', 'l’aide'],
              ['IV', 'ar:إِفْعَالٌ', 'ar:إِسْعَافٌ', 'les premiers secours'],
              ['V', 'ar:تَفَعُّلٌ', 'ar:تَعَلُّمٌ', 'l’apprentissage'],
              ['VI', 'ar:تَفَاعُلٌ', 'ar:تَعَاوُنٌ', 'la coopération'],
              ['VIII', 'ar:اِفْتِعَالٌ', 'ar:اِجْتِمَاعٌ', 'la réunion'],
              ['X', 'ar:اِسْتِفْعَالٌ', 'ar:اِسْتِقْبَالٌ', 'l’accueil'],
            ],
          },
        },
      ],
      quiz: [
        { question: 'À quelle forme appartient تَكَلَّمَ ?', options: ['II', 'V', 'X'], answer: 1 },
        { question: 'Quel est le maṣdar de عَلَّمَ (forme II) ?', options: ['تَعَلُّمٌ', 'تَعْلِيمٌ', 'عِلْمٌ'], answer: 1 },
        { question: 'سَيَّارَةُ إِسْعَافٍ (une ambulance) : إِسْعَافٌ est le maṣdar de quelle forme ?', options: ['IV', 'VIII', 'X'], answer: 0 },
        { question: 'Que veut dire اِسْتَعْمَلَ ?', options: ['travailler', 'utiliser', 'collaborer'], answer: 1 },
      ],
    },
    pronunciation: [
      {
        title: 'yu- ou ya- ? Le préfixe du présent',
        paragraphs: ['Les formes II, III et IV prennent un préfixe en u (yu-, tu-, nu-, u-) ; toutes les autres un préfixe en a. Écoutez la différence :'],
        examples: [
          p('يُدَرِّسُ', 'yudarrisu', 'il enseigne (II)'),
          p('يُسَاعِدُ', 'yusāʿidu', 'il aide (III)'),
          p('يُسْعِفُ', 'yusʿifu', 'il porte secours (IV)'),
          p('يَتَعَلَّمُ', 'yataʿallamu', 'il apprend (V)'),
          p('يَسْتَعْمِلُ', 'yastaʿmilu', 'il utilise (X)'),
        ],
      },
    ],
    writing: [
      {
        title: 'Retrouver la racine : سَأَلْتُمُونِيهَا',
        paragraphs: [
          'Seules dix lettres peuvent s’ajouter à une racine. Les grammairiens les ont rassemblées dans un mot plaisant : سَأَلْتُمُونِيهَا, « vous me l’avez demandée ». Pour trouver la racine d’un mot inconnu, retirez ces lettres ajoutées.',
          'Exemple : dans مُسْتَشْفًى (hôpital), on retire م, س, ت : il reste ش ف ي, la racine de la guérison. L’hôpital est « le lieu où l’on cherche la guérison », un schème de forme X.',
        ],
        examples: [
          p('سَأَلْتُمُونِيهَا', 'sa’altumūnīhā', 'les dix lettres d’augmentation'),
          p('مُسْتَشْفًى', 'mustashfā', 'hôpital — racine ش ف ي'),
          p('اِسْتِقْبَالٌ', 'istiqbāl', 'accueil — racine ق ب ل'),
        ],
      },
    ],
    vocabulary: w('b1-1', [
      ['دَرَّسَ', 'darrasa', 'enseigner'],
      ['نَظَّفَ', 'naẓẓafa', 'nettoyer'],
      ['سَاعَدَ', 'sāʿada', 'aider'],
      ['أَسْعَفَ', 'asʿafa', 'porter secours'],
      ['تَكَلَّمَ', 'takallama', 'parler'],
      ['تَذَكَّرَ', 'tadhakkara', 'se souvenir'],
      ['اِجْتَمَعَ', 'ijtamaʿa', 'se réunir'],
      ['اِسْتَعْمَلَ', 'istaʿmala', 'utiliser'],
      ['اِسْتَقْبَلَ', 'istaqbala', 'accueillir'],
      ['اِسْتَشَارَ', 'istashāra', 'consulter'],
      ['تَعْلِيمٌ', 'taʿlīm', 'l’enseignement'],
      ['مُسَاعَدَةٌ', 'musāʿada', 'l’aide'],
      ['اِجْتِمَاعٌ', 'ijtimāʿ', 'une réunion'],
      ['اِسْتِقْبَالٌ', 'istiqbāl', 'l’accueil'],
      ['اِسْتِشَارَةٌ', 'istishāra', 'une consultation, un avis'],
      ['مُتَدَرِّبٌ', 'mutadarrib', 'un stagiaire, un interne'],
    ]),
    mindmap: {
      center: p('ش ف ي', 'sh-f-y', 'la racine de la guérison'),
      branches: [
        { label: 'Les verbes', items: [p('شَفَى', 'shafā', 'guérir (quelqu’un)'), p('اِسْتَشْفَى', 'istashfā', 'se faire soigner (X)')] },
        { label: 'Les noms', items: [p('شِفَاءٌ', 'shifā’', 'la guérison'), p('مُسْتَشْفًى', 'mustashfā', 'l’hôpital')] },
        { label: 'Un souhait', items: [p('شِفَاءً عَاجِلًا', 'shifā’an ʿājilan', 'prompt rétablissement')] },
        { label: 'Une autre racine : ع م ل', items: [p('عَمِلَ', 'ʿamila', 'travailler'), p('اِسْتَعْمَلَ', 'istaʿmala', 'utiliser'), p('عَامِلٌ', 'ʿāmil', 'un ouvrier')] },
      ],
    },
    story: {
      title: 'Le premier jour d’Adam',
      lines: [
        p('وَصَلَ آدَمُ، الطَّبِيبُ الْمُتَدَرِّبُ، إِلَى الْمُسْتَشْفَى فِي الصَّبَاحِ الْبَاكِرِ.', 'waṣala Ādamu, aṭ-ṭabību l-mutadarribu, ilā l-mustashfā fī ṣ-ṣabāḥi l-bākir.', 'Adam, le jeune interne, arriva à l’hôpital tôt le matin.'),
        p('اِسْتَقْبَلَتْهُ الدُّكْتُورَةُ جُولْيِيت بِابْتِسَامَةٍ.', 'istaqbalathu d-duktūratu Jūliyet bi-btisāma.', 'La docteure Juliette l’accueillit avec un sourire.'),
        p('قَالَتْ: سَأُعَلِّمُكَ كُلَّ شَيْءٍ، لَا تَقْلَقْ.', 'qālat : sa-uʿallimuka kulla shay’, lā taqlaq.', 'Elle dit : « Je vais tout t’apprendre, ne t’inquiète pas. »'),
        p('تَعَلَّمَ آدَمُ كَيْفَ يَسْتَعْمِلُ الْأَجْهِزَةَ، وَكَيْفَ يَتَكَلَّمُ مَعَ الْمَرْضَى.', 'taʿallama Ādamu kayfa yastaʿmilu l-ajhiza, wa-kayfa yatakallamu maʿa l-marḍā.', 'Adam apprit à utiliser les appareils et à parler aux patients.'),
        p('فِي الظُّهْرِ، اِجْتَمَعَ الْفَرِيقُ لِمُنَاقَشَةِ الْحَالَاتِ الصَّعْبَةِ.', 'fī ẓ-ẓuhr, ijtamaʿa l-farīqu li-munāqashati l-ḥālāti ṣ-ṣaʿba.', 'À midi, l’équipe se réunit pour discuter des cas difficiles.'),
        p('وَفِي الْمَسَاءِ، تَذَكَّرَ آدَمُ كَلِمَاتِ جُولْيِيت: اَلتَّعَلُّمُ رِحْلَةٌ طَوِيلَةٌ.', 'wa-fī l-masā’, tadhakkara Ādamu kalimāti Jūliyet : at-taʿallumu riḥlatun ṭawīla.', 'Le soir, Adam se souvint des mots de Juliette : « Apprendre est un long voyage. »'),
      ],
    },
    podcast: {
      title: 'Un avis médical',
      intro: 'Adam demande conseil à la docteure Juliette au sujet d’une patiente.',
      lines: [
        { speaker: 'Adam', ar: 'دُكْتُورَة، هَلْ يُمْكِنُ أَنْ أَسْتَشِيرَكِ فِي حَالَةٍ؟', fr: 'Docteure, puis-je vous demander votre avis sur un cas ?' },
        { speaker: 'Juliette', ar: 'طَبْعًا، تَفَضَّلْ.', fr: 'Bien sûr, je t’écoute.' },
        { speaker: 'Adam', ar: 'مَرِيضَةٌ عِنْدَهَا حُمَّى وَسُعَالٌ مُنْذُ أُسْبُوعٍ.', fr: 'Une patiente a de la fièvre et de la toux depuis une semaine.' },
        { speaker: 'Juliette', ar: 'هَلِ اسْتَعْمَلْتَ السَّمَّاعَةَ؟', fr: 'As-tu utilisé le stéthoscope ?' },
        { speaker: 'Adam', ar: 'نَعَمْ، وَسَمِعْتُ صَوْتًا غَرِيبًا فِي الرِّئَةِ الْيُمْنَى.', fr: 'Oui, et j’ai entendu un bruit étrange dans le poumon droit.' },
        { speaker: 'Juliette', ar: 'أَحْسَنْتَ. سَنَطْلُبُ صُورَةَ أَشِعَّةٍ لِلتَّأَكُّدِ.', fr: 'Bravo. Nous allons demander une radio pour confirmer.' },
      ],
    },
    conversation: {
      intro: 'Adam s’intéresse à votre apprentissage de l’arabe.',
      steps: [
        { bot: p('مُنْذُ مَتَى تَتَعَلَّمِينَ الْعَرَبِيَّةَ؟', 'mundhu matā tataʿallamīna l-ʿarabiyya ?', 'Depuis quand apprenez-vous l’arabe ?'), expected: ['منذ', 'اتعلم'], hint: p('أَتَعَلَّمُ الْعَرَبِيَّةَ مُنْذُ شَهْرٍ.', 'ataʿallamu l-ʿarabiyya mundhu shahr.', 'J’apprends l’arabe depuis un mois.') },
        { bot: p('هَلْ تَسْتَعْمِلِينَ الْعَرَبِيَّةَ فِي عَمَلِكِ؟', 'hal tastaʿmilīna l-ʿarabiyya fī ʿamaliki ?', 'Utilisez-vous l’arabe dans votre travail ?'), expected: ['نعم', 'لا', 'استعمل'], hint: p('نَعَمْ، أَسْتَعْمِلُهَا مَعَ الْمَرْضَى.', 'naʿam, astaʿmiluhā maʿa l-marḍā.', 'Oui, je l’utilise avec les patients.') },
        { bot: p('مَعَ مَنْ تَتَكَلَّمِينَ بِالْعَرَبِيَّةِ؟', 'maʿa man tatakallamīna bi-l-ʿarabiyya ?', 'Avec qui parlez-vous arabe ?'), expected: ['اتكلم', 'مع'], hint: p('أَتَكَلَّمُ مَعَ الْمَرْضَى وَالْأَصْدِقَاءِ.', 'atakallamu maʿa l-marḍā wa-l-aṣdiqā’.', 'Je parle avec les patients et les amis.') },
      ],
    },
    dialect: [
      { dialect: 'Levantin', ar: 'بِحْكِي', tr: 'baḥki', fr: 'je parle', msa: 'أَتَكَلَّمُ' },
      { dialect: 'Levantin', ar: 'عَمْ بِتْعَلَّم', tr: 'ʿam bitʿallam', fr: 'je suis en train d’apprendre', msa: 'أَتَعَلَّمُ' },
      { dialect: 'Égyptien', ar: 'بَتْكَلِّم', tr: 'batkallim', fr: 'je parle', msa: 'أَتَكَلَّمُ' },
      { dialect: 'Égyptien', ar: 'بَسْتَعْمِل', tr: 'bastaʿmil', fr: 'j’utilise', msa: 'أَسْتَعْمِلُ' },
      { dialect: 'Marocain', ar: 'كَنْهْضَر', tr: 'kanhḍer', fr: 'je parle', msa: 'أَتَكَلَّمُ' },
      { dialect: 'Marocain', ar: 'كَنْتْعَلَّم', tr: 'kantʿallem', fr: 'j’apprends', msa: 'أَتَعَلَّمُ' },
    ],
  },

  /* ------------------------------------------------------------------ B1.2 */
  {
    id: 'b1-2',
    level: 'B1',
    order: 2,
    title: 'Raconter et donner son avis',
    arTitle: 'ذِكْرَيَاتٌ وَآرَاءٌ',
    subtitle: 'كَانَ et l’imparfait, l’opinion, إِنَّ et ses sœurs',
    emoji: '💭',
    grammar: {
      lessons: [
        {
          title: 'كَانَ : l’imparfait et l’attribut',
          paragraphs: [
            'كَانَ (« être », au passé) sert d’auxiliaire. Suivi d’un verbe au présent, il exprime l’habitude ou la durée dans le passé, comme notre imparfait : كُنْتُ أَسْبَحُ, « je nageais ».',
            'Suivi d’un nom ou d’un adjectif, il met cet attribut à l’accusatif : كَانَ الْبَحْرُ هَادِئًا, « la mer était calme ». Ses « sœurs » font de même : أَصْبَحَ (devenir), مَا زَالَ (être encore), لَيْسَ (ne pas être).',
          ],
          table: {
            headers: ['Personne', 'Passé de كَانَ', 'Translittération'],
            rows: [
              ['je', 'ar:كُنْتُ', 'kuntu'],
              ['tu (h)', 'ar:كُنْتَ', 'kunta'],
              ['tu (f)', 'ar:كُنْتِ', 'kunti'],
              ['il', 'ar:كَانَ', 'kāna'],
              ['elle', 'ar:كَانَتْ', 'kānat'],
              ['nous', 'ar:كُنَّا', 'kunnā'],
              ['ils', 'ar:كَانُوا', 'kānū'],
            ],
          },
        },
        {
          title: 'Donner son avis',
          paragraphs: ['Quelques tournures indispensables pour exprimer une opinion et la nuancer :'],
          examples: [
            p('فِي رَأْيِي…', 'fī ra’yī…', 'à mon avis…'),
            p('أَعْتَقِدُ أَنَّ…', 'aʿtaqidu anna…', 'je crois que…'),
            p('أَظُنُّ أَنَّ…', 'aẓunnu anna…', 'je pense que…'),
            p('أُوَافِقُكَ / لَا أُوَافِقُكَ', 'uwāfiquka / lā uwāfiquka', 'je suis d’accord / pas d’accord avec toi'),
            p('مِنْ نَاحِيَةٍ… وَمِنْ نَاحِيَةٍ أُخْرَى…', 'min nāḥiya… wa-min nāḥiyatin ukhrā…', 'd’un côté… de l’autre…'),
          ],
        },
        {
          title: 'إِنَّ, أَنَّ et leurs sœurs : le sujet passe à l’accusatif',
          paragraphs: [
            'Après إِنَّ (« certes », et après le verbe « dire »), أَنَّ (« que »), لِأَنَّ (« parce que ») et لَكِنَّ (« mais »), le sujet de la phrase nominale se met à l’accusatif, tandis que son attribut reste au nominatif.',
            'Avec un pronom, on l’accroche directement : لِأَنَّهُ, « parce qu’il » ; لَكِنَّنِي, « mais moi ».',
          ],
          examples: [
            p('اَلْبَحْرُ جَمِيلٌ ← إِنَّ الْبَحْرَ جَمِيلٌ', 'al-baḥru jamīl → inna l-baḥra jamīl', 'la mer est belle → certes, la mer est belle'),
            p('أَعْتَقِدُ أَنَّ اللُّغَةَ مُهِمَّةٌ', 'aʿtaqidu anna l-lughata muhimma', 'je crois que la langue est importante'),
            p('لِأَنَّ الْمَاءَ بَارِدٌ', 'li-anna l-mā’a bārid', 'parce que l’eau est froide'),
          ],
        },
      ],
      quiz: [
        { question: 'Comment dit-on « je nageais chaque jour » ?', options: ['سَبَحْتُ كُلَّ يَوْمٍ', 'كُنْتُ أَسْبَحُ كُلَّ يَوْمٍ', 'سَأَسْبَحُ كُلَّ يَوْمٍ'], answer: 1 },
        { question: 'Après أَنَّ, à quel cas se met le sujet ?', options: ['Nominatif', 'Accusatif', 'Génitif'], answer: 1 },
        { question: 'Quelle phrase est correcte ?', options: ['لِأَنَّ الْمَاءُ بَارِدٌ', 'لِأَنَّ الْمَاءَ بَارِدٌ', 'لِأَنَّ الْمَاءِ بَارِدًا'], answer: 1 },
        { question: 'Que signifie فِي رَأْيِي ?', options: ['à mon avis', 'dans ma tête', 'selon lui'], answer: 0 },
      ],
    },
    pronunciation: [
      {
        title: 'La chadda des petites particules',
        paragraphs: ['إِنَّ, أَنَّ, لَكِنَّ, لِأَنَّ portent toutes une chadda sur le ن : appuyez-la nettement, c’est elle qui les distingue de إِنْ (« si ») ou أَنْ (« que » devant un verbe).'],
        examples: [p('إِنَّ', 'inna', 'certes'), p('إِنْ', 'in', 'si'), p('أَنَّ', 'anna', 'que (+ nom)'), p('أَنْ', 'an', 'que (+ verbe)')],
      },
    ],
    writing: [
      {
        title: 'La ponctuation arabe',
        paragraphs: [
          'La ponctuation arabe suit le sens de l’écriture : la virgule (،) et le point-virgule (؛) sont retournés, et le point d’interrogation (؟) regarde vers la gauche. Le point et le point d’exclamation ne changent pas.',
        ],
        examples: [
          p('نَعَمْ، أُوَافِقُكَ.', 'naʿam, uwāfiquka.', 'Oui, je suis d’accord avec toi. (virgule ،)'),
          p('مَا رَأْيُكَ؟', 'mā ra’yuka ?', 'Qu’en penses-tu ? (point d’interrogation ؟)'),
        ],
      },
    ],
    vocabulary: w('b1-2', [
      ['رَأْيٌ / آرَاءٌ', 'ra’y / ārā’', 'un avis / des avis'],
      ['فِي رَأْيِي', 'fī ra’yī', 'à mon avis'],
      ['أَعْتَقِدُ أَنَّ', 'aʿtaqidu anna', 'je crois que'],
      ['أُوَافِقُ', 'uwāfiqu', 'je suis d’accord'],
      ['لِأَنَّ', 'li-anna', 'parce que'],
      ['لَكِنَّ', 'lākinna', 'mais'],
      ['لِذَلِكَ', 'li-dhālika', 'c’est pourquoi'],
      ['بَيْنَمَا', 'baynamā', 'tandis que'],
      ['عَلَى الرَّغْمِ مِنْ', 'ʿalā r-raghmi min', 'malgré'],
      ['أَصْبَحَ', 'aṣbaḥa', 'devenir'],
      ['مَا زَالَ', 'mā zāla', 'être encore, toujours'],
      ['عِنْدَمَا', 'ʿindamā', 'quand, lorsque'],
      ['ذِكْرَيَاتٌ', 'dhikrayāt', 'des souvenirs'],
      ['طُفُولَةٌ', 'ṭufūla', 'l’enfance'],
      ['مُهِمٌّ', 'muhimm', 'important'],
      ['مُفِيدٌ', 'mufīd', 'utile'],
    ]),
    mindmap: {
      center: p('رَأْيِي', 'ra’yī', 'mon avis'),
      branches: [
        { label: 'Donner son avis', items: [p('فِي رَأْيِي', 'fī ra’yī', 'à mon avis'), p('أَعْتَقِدُ أَنَّ', 'aʿtaqidu anna', 'je crois que')] },
        { label: 'Être d’accord ou non', items: [p('أُوَافِقُ', 'uwāfiqu', 'je suis d’accord'), p('لَا أُوَافِقُ', 'lā uwāfiqu', 'je ne suis pas d’accord')] },
        { label: 'Justifier', items: [p('لِأَنَّ', 'li-anna', 'parce que'), p('لِذَلِكَ', 'li-dhālika', 'c’est pourquoi')] },
        { label: 'Nuancer', items: [p('لَكِنَّ', 'lākinna', 'mais'), p('عَلَى الرَّغْمِ مِنْ', 'ʿalā r-raghmi min', 'malgré')] },
      ],
    },
    story: {
      title: 'Souvenirs d’enfance au bord de la mer',
      lines: [
        p('عِنْدَمَا كُنْتُ صَغِيرَةً، كُنْتُ أَقْضِي الصَّيْفَ عِنْدَ جَدَّتِي قُرْبَ الْبَحْرِ.', 'ʿindamā kuntu ṣaghīra, kuntu aqḍī ṣ-ṣayfa ʿinda jaddatī qurba l-baḥr.', 'Quand j’étais petite, je passais l’été chez ma grand-mère, près de la mer.'),
        p('كُنَّا نَسْتَيْقِظُ بَاكِرًا وَنَذْهَبُ إِلَى الشَّاطِئِ.', 'kunnā nastayqiẓu bākiran wa-nadhhabu ilā sh-shāṭi’.', 'Nous nous levions tôt et allions à la plage.'),
        p('كَانَتْ جَدَّتِي تَقُولُ إِنَّ الْبَحْرَ أَفْضَلُ طَبِيبٍ.', 'kānat jaddatī taqūlu inna l-baḥra afḍalu ṭabīb.', 'Ma grand-mère disait que la mer est le meilleur des médecins.'),
        p('فِي رَأْيِي، كَانَتْ عَلَى حَقٍّ، لِأَنَّ تِلْكَ الْأَيَّامَ كَانَتْ أَجْمَلَ أَيَّامِ حَيَاتِي.', 'fī ra’yī, kānat ʿalā ḥaqq, li-anna tilka l-ayyāma kānat ajmala ayyāmi ḥayātī.', 'À mon avis, elle avait raison, car ces jours-là furent les plus beaux de ma vie.'),
        p('لَكِنَّنِي أَعْتَقِدُ أَنَّ الطِّبَّ يَحْتَاجُ إِلَى الْعِلْمِ أَيْضًا!', 'lākinnanī aʿtaqidu anna ṭ-ṭibba yaḥtāju ilā l-ʿilmi ayḍan !', 'Mais je crois que la médecine a aussi besoin de science !'),
        p('لِذَلِكَ أَصْبَحْتُ طَبِيبَةً… وَمَا زِلْتُ أُحِبُّ الْبَحْرَ.', 'li-dhālika aṣbaḥtu ṭabība… wa-mā ziltu uḥibbu l-baḥr.', 'C’est pourquoi je suis devenue médecin… et j’aime toujours la mer.'),
      ],
    },
    podcast: {
      title: 'Faut-il apprendre les dialectes ?',
      intro: 'Sami et Juliette ne sont pas tout à fait du même avis.',
      lines: [
        { speaker: 'Sami', ar: 'هَلْ تَعْتَقِدِينَ أَنَّ الْفُصْحَى تَكْفِي؟', fr: 'Crois-tu que l’arabe standard suffit ?' },
        { speaker: 'Juliette', ar: 'فِي رَأْيِي، هِيَ ضَرُورِيَّةٌ لِلْقِرَاءَةِ وَالْأَخْبَارِ.', fr: 'À mon avis, il est indispensable pour lire et suivre les informations.' },
        { speaker: 'Sami', ar: 'لَكِنَّ النَّاسَ يَتَكَلَّمُونَ اللَّهَجَاتِ فِي الشَّارِعِ!', fr: 'Mais dans la rue, les gens parlent les dialectes !' },
        { speaker: 'Juliette', ar: 'أُوَافِقُكَ، لِذَلِكَ أَتَعَلَّمُ بَعْضَ الْعِبَارَاتِ الْعَامِّيَّةِ أَيْضًا.', fr: 'Je suis d’accord, c’est pourquoi j’apprends aussi quelques expressions dialectales.' },
        { speaker: 'Sami', ar: 'فِكْرَةٌ مُمْتَازَةٌ، خُصُوصًا مَعَ مَرْضَاكِ.', fr: 'Excellente idée, surtout avec tes patients.' },
      ],
    },
    conversation: {
      intro: 'Sami vous interroge sur votre enfance et votre opinion.',
      steps: [
        { bot: p('مَاذَا كُنْتِ تُحِبِّينَ عِنْدَمَا كُنْتِ صَغِيرَةً؟', 'mādhā kunti tuḥibbīna ʿindamā kunti ṣaghīra ?', 'Qu’aimais-tu quand tu étais petite ?'), expected: ['كنت', 'احب'], hint: p('كُنْتُ أُحِبُّ الْبَحْرَ.', 'kuntu uḥibbu l-baḥr.', 'J’aimais la mer.') },
        { bot: p('مَا رَأْيُكِ فِي تَعَلُّمِ اللَّهَجَاتِ؟', 'mā ra’yuki fī taʿallumi l-lahajāt ?', 'Que penses-tu de l’apprentissage des dialectes ?'), expected: ['رايي', 'اعتقد', 'اظن', 'مهم', 'مفيد'], hint: p('فِي رَأْيِي، هُوَ مُفِيدٌ جِدًّا.', 'fī ra’yī, huwa mufīdun jiddan.', 'À mon avis, c’est très utile.') },
        { bot: p('لِمَاذَا؟', 'limādhā ?', 'Pourquoi ?'), expected: ['لان'], hint: p('لِأَنَّ الْمَرْضَى يَتَكَلَّمُونَ اللَّهَجَاتِ.', 'li-anna l-marḍā yatakallamūna l-lahajāt.', 'Parce que les patients parlent les dialectes.') },
      ],
    },
    dialect: [
      { dialect: 'Levantin', ar: 'بْرَأْيِي', tr: 'b-ra’yi', fr: 'à mon avis', msa: 'فِي رَأْيِي' },
      { dialect: 'Levantin', ar: 'لِأَنُّو', tr: 'la’annu', fr: 'parce que', msa: 'لِأَنَّ' },
      { dialect: 'Égyptien', ar: 'عَشَان', tr: 'ʿashān', fr: 'parce que ; pour', msa: 'لِأَنَّ' },
      { dialect: 'Égyptien', ar: 'أَنَا شَايْفَة إِنّ…', tr: 'ana shayfa inn…', fr: 'je trouve que… (f)', msa: 'أَعْتَقِدُ أَنَّ' },
      { dialect: 'Marocain', ar: 'حِيتْ', tr: 'ḥit', fr: 'parce que', msa: 'لِأَنَّ' },
      { dialect: 'Marocain', ar: 'كَنْظَنّ', tr: 'kanḍenn', fr: 'je pense', msa: 'أَظُنُّ' },
    ],
  },

]

export const tierById = (id: string) => TIERS.find((t) => t.id === id)

export const CEFR_LEVELS: { level: Cefr; title: string; description: string }[] = [
  { level: 'A1', title: 'Découverte', description: 'L’alphabet, se présenter, la famille, la maison.' },
  { level: 'A2', title: 'Survie', description: 'Le passé, le présent et le futur, la ville, le restaurant, l’annexion et les pluriels brisés.' },
  { level: 'B1', title: 'Seuil', description: 'Les formes dérivées en action, le maṣdar, raconter au passé, donner son avis.' },
  { level: 'B2', title: 'Avancé', description: 'La presse, l’argumentation, la lecture sans diacritiques.' },
  { level: 'C1', title: 'Autonome', description: 'Littérature, nuances de registre, débats.' },
]

export const TIER_TABS = [
  { id: 'alphabet', label: 'Alphabet', emoji: 'ب' },
  { id: 'grammaire', label: 'Grammaire', emoji: '📐' },
  { id: 'prononciation', label: 'Prononciation', emoji: '👄' },
  { id: 'ecriture', label: 'Écriture', emoji: '✍️' },
  { id: 'vocabulaire', label: 'Vocabulaire', emoji: '📚' },
  { id: 'carte', label: 'Carte mentale', emoji: '🧠' },
  { id: 'histoire', label: 'Histoire', emoji: '📖' },
  { id: 'podcast', label: 'Podcast', emoji: '🎧' },
  { id: 'conversation', label: 'Conversation', emoji: '💬' },
  { id: 'dialectes', label: 'Dialectes', emoji: '🗺️' },
] as const

export type TierTabId = (typeof TIER_TABS)[number]['id']

export const tabsForTier = (tier: Tier) => TIER_TABS.filter((t) => t.id !== 'alphabet' || (tier.letters?.length ?? 0) > 0)
