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
            p('أَنَا طَالِبَةٌ.', 'anā ṭāliba.', 'Je suis étudiante.'),
            p('هِيَ فَرَنْسِيَّةٌ.', 'hiya faransiyya.', 'Elle est française.'),
            p('اَلْبَيْتُ كَبِيرٌ.', 'al-baytu kabīr.', 'La maison est grande.'),
          ],
        },
        {
          title: 'Le féminin en ـة (tā’ marbūṭa)',
          paragraphs: ['La plupart des noms et adjectifs forment leur féminin en ajoutant ـة, prononcée « a » en fin de phrase.'],
          examples: [
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
        { label: 'Mon activité', items: [p('طَالِبَةٌ', 'ṭāliba', 'étudiante'), p('مُعَلِّمَةٌ', 'muʿallima', 'professeure')] },
        { label: 'Mes langues', items: [p('اَلْفَرَنْسِيَّةُ', 'al-faransiyya', 'le français'), p('اَلْعَرَبِيَّةُ', 'al-ʿarabiyya', 'l’arabe')] },
      ],
    },
    story: {
      title: 'Je m’appelle Juliette',
      lines: [
        p('اِسْمِي جُولْيِيت.', 'ismī Jūliyet.', 'Je m’appelle Juliette.'),
        p('أَنَا مِنْ فَرَنْسَا.', 'anā min faransā.', 'Je viens de France.'),
        p('أَنَا طَالِبَةٌ.', 'anā ṭāliba.', 'Je suis étudiante.'),
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
        { speaker: 'Layla', ar: 'أَنَا مِنْ مِصْرَ. هَلْ أَنْتِ طَالِبَةٌ؟', fr: 'Je viens d’Égypte. Es-tu étudiante ?' },
        { speaker: 'Juliette', ar: 'نَعَمْ، أَنَا طَالِبَةٌ.', fr: 'Oui, je suis étudiante.' },
      ],
    },
    conversation: {
      intro: 'Layla veut faire votre connaissance.',
      steps: [
        { bot: p('مَا اسْمُكِ؟', 'mā smuki ?', 'Comment t’appelles-tu ?'), expected: ['اسمي', 'انا'], hint: p('اِسْمِي جُولْيِيت.', 'ismī Jūliyet.', 'Je m’appelle Juliette.') },
        { bot: p('مِنْ أَيْنَ أَنْتِ؟', 'min ayna anti ?', 'D’où viens-tu ?'), expected: ['انا من', 'من فرنسا'], hint: p('أَنَا مِنْ فَرَنْسَا.', 'anā min faransā.', 'Je viens de France.') },
        { bot: p('هَلْ أَنْتِ طَالِبَةٌ؟', 'hal anti ṭāliba ?', 'Es-tu étudiante ?'), expected: ['نعم', 'لا'], hint: p('نَعَمْ، أَنَا طَالِبَةٌ.', 'naʿam, anā ṭāliba.', 'Oui, je suis étudiante.') },
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
]

export const tierById = (id: string) => TIERS.find((t) => t.id === id)

export const CEFR_LEVELS: { level: Cefr; title: string; description: string }[] = [
  { level: 'A1', title: 'Découverte', description: 'L’alphabet, se présenter, la famille, la maison.' },
  { level: 'A2', title: 'Survie', description: 'Le verbe au passé et au présent, les achats, la ville.' },
  { level: 'B1', title: 'Seuil', description: 'Les formes verbales II à X, raconter, donner son avis.' },
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
