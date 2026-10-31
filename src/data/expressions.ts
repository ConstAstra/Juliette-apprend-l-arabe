/** Les expressions du jour : formules vivantes, images et proverbes, une par jour. */
export type Register = 'Standard' | 'Tous dialectes' | 'Levantin' | 'Égyptien' | 'Proverbe'

export interface Expression {
  id: string
  ar: string
  tr: string
  /** Traduction mot à mot. */
  literal: string
  /** Ce que l'expression veut vraiment dire. */
  meaning: string
  /** Quand l'employer. */
  usage: string
  register: Register
}

type Raw = [string, string, string, string, string, string, Register]

const RAW: Raw[] = [
  ['maison', 'اَلْبَيْتُ بَيْتُكِ', 'al-baytu baytuki', '« la maison est ta maison »', 'fais comme chez toi', 'Pour accueillir une invitée ; à un homme : بَيْتُكَ.', 'Standard'],
  ['nawwarti', 'نَوَّرْتِ', 'nawwarti', '« tu as illuminé »', 'merci d’être venue, ta visite nous fait honneur', 'À une invitée qui arrive ; à un homme : نَوَّرْتَ.', 'Tous dialectes'],
  ['ahlan', 'أَهْلًا وَسَهْلًا', 'ahlan wa-sahlan', '« (tu es parmi ta) famille et (sur un) terrain facile »', 'bienvenue', 'Pour accueillir quelqu’un, à toute heure.', 'Standard'],
  ['rasi', 'عَلَى رَأْسِي', 'ʿalā ra’sī', '« sur ma tête »', 'avec grand plaisir, c’est un honneur', 'Pour accepter de rendre un service.', 'Standard'],
  ['ayn-ras', 'عَلَى الْعَيْنِ وَالرَّاس', 'ʿala l-ʿayn wa-r-rās', '« sur l’œil et sur la tête »', 'avec le plus grand plaisir', 'Version encore plus chaleureuse de la précédente.', 'Tous dialectes'],
  ['min-ouyouni', 'مِنْ عُيُونِي', 'min ʿuyūnī', '« de mes yeux »', 'bien sûr, avec plaisir', 'Quand on vous demande quelque chose qu’on accorde de bon cœur.', 'Tous dialectes'],
  ['tikram', 'تِكْرَم عَيْنِك', 'tikram ʿaynik', '« que ton œil soit honoré »', 'avec plaisir, c’est accordé', 'Réponse aimable à une demande (à une femme).', 'Levantin'],
  ['sahtein', 'صَحْتَيْن', 'ṣaḥtēn', '« deux santés »', 'bon appétit ; à ta santé', 'Pendant le repas ou en trinquant.', 'Levantin'],
  ['bilhana', 'بِالْهَنَاءِ وَالشِّفَاءِ', 'bi-l-hanā’i wa-sh-shifā’', '« avec le bien-être et la guérison »', 'bon appétit', 'À table ; le souhait de guérison plaira à une médecin !', 'Standard'],
  ['salamtak', 'سَلَامْتِك', 'salāmtik', '« ta sécurité, ta santé »', 'prompt rétablissement', 'À une personne malade ou blessée (à une femme). Réponse : شُكْرًا.', 'Tous dialectes'],
  ['bishifa', 'بِالشِّفَاءِ الْعَاجِلِ', 'bi-sh-shifā’i l-ʿājil', '« avec la guérison rapide »', 'je vous souhaite un prompt rétablissement', 'Version soutenue, pour une carte ou un message écrit.', 'Standard'],
  ['maalesh', 'مَعْلِيش', 'maʿlēsh', '« il n’y a rien sur toi »', 'ce n’est pas grave ; désolé', 'Pour rassurer, ou pour s’excuser d’un petit rien.', 'Tous dialectes'],
  ['ma-alayki', 'مَا عَلَيْكِ', 'mā ʿalayki', '« rien sur toi »', 'ne t’en fais pas', 'Pour ôter un souci à quelqu’un (à une femme).', 'Standard'],
  ['yalla', 'يَلَّا', 'yallā', '« allez ! »', 'on y va ! dépêche-toi ! allez !', 'Le mot passe-partout pour lancer un mouvement.', 'Tous dialectes'],
  ['shway', 'شْوَيّ شْوَيّ', 'shwayy shwayy', '« un peu, un peu »', 'doucement, petit à petit', 'Pour calmer l’impatience, ou parler d’un progrès lent.', 'Tous dialectes'],
  ['mahlik', 'عَلَى مَهْلِك', 'ʿala mahlik', '« sur ta lenteur »', 'prends ton temps, doucement', 'À quelqu’un qui se presse (à une femme).', 'Tous dialectes'],
  ['miyya', 'مِيَّة مِيَّة', 'miyye miyye', '« cent cent »', 'parfait, impeccable', 'Pour dire que tout va très bien.', 'Levantin'],
  ['mabrouk', 'أَلْفُ مَبْرُوكٍ', 'alfu mabrūk', '« mille fois béni »', 'mille félicitations', 'Pour une naissance, un diplôme, un nouveau travail…', 'Standard'],
  ['oqbalik', 'عُقْبَالِك', 'ʿu’bālik', '« à ton tour »', 'que cela t’arrive aussi bientôt', 'En retour de félicitations : on souhaite le même bonheur à l’autre.', 'Tous dialectes'],
  ['kol-am', 'كُلُّ عَامٍ وَأَنْتِ بِخَيْرٍ', 'kullu ʿāmin wa-anti bi-khayr', '« chaque année, et toi en bonne santé »', 'bon anniversaire ; bonnes fêtes', 'Le vœu universel des anniversaires et des fêtes.', 'Standard'],
  ['damm-khafif', 'دَمُّهُ خَفِيفٌ', 'dammuhu khafīf', '« son sang est léger »', 'il est drôle, plein d’esprit', 'Compliment ; à l’inverse, دَمُّهُ ثَقِيلٌ, « sang lourd » : il est pénible.', 'Standard'],
  ['qalb-abyad', 'قَلْبُهُ أَبْيَضُ', 'qalbuhu abyaḍ', '« son cœur est blanc »', 'il est bon, sans rancune', 'Pour parler d’une personne généreuse et sincère.', 'Standard'],
  ['asal', 'زَيِّ الْعَسَل عَلَى قَلْبِي', 'zayy il-ʿasal ʿala ’albi', '« comme du miel sur mon cœur »', 'ça me fait tellement plaisir', 'Quand une nouvelle ou un compliment vous réjouit.', 'Égyptien'],
  ['nar-hadia', 'عَلَى نَارٍ هَادِئَةٍ', 'ʿalā nārin hādi’a', '« sur un feu doux »', 'lentement, avec patience', 'Pour un projet qu’on mûrit sans se presser.', 'Standard'],
  ['mishmish', 'فِي الْمِشْمِش', 'fi l-mishmish', '« à la saison des abricots »', 'quand les poules auront des dents', 'La saison des abricots est si courte que la promesse n’engage à rien.', 'Égyptien'],
  ['illi-fat', 'اِللِّي فَات مَات', 'illi fāt māt', '« ce qui est passé est mort »', 'tournons la page', 'Pour se réconcilier ou oublier une erreur.', 'Tous dialectes'],
  ['asal-basal', 'يَوْمٌ عَسَلٌ وَيَوْمٌ بَصَلٌ', 'yawmun ʿasal wa-yawmun baṣal', '« un jour miel, un jour oignon »', 'la vie a ses hauts et ses bas', 'Pour relativiser une mauvaise journée.', 'Proverbe'],
  ['asfour', 'عُصْفُورٌ فِي الْيَدِ خَيْرٌ مِنْ عَشَرَةٍ عَلَى الشَّجَرَةِ', 'ʿuṣfūrun fi l-yadi khayrun min ʿasharatin ʿalā sh-shajara', '« un oiseau dans la main vaut mieux que dix sur l’arbre »', 'un tiens vaut mieux que deux tu l’auras', 'Pour inviter à la prudence.', 'Proverbe'],
  ['qird', 'اَلْقِرْدُ فِي عَيْنِ أُمِّهِ غَزَالٌ', 'al-qirdu fī ʿayni ummihi ghazāl', '« le singe, aux yeux de sa mère, est une gazelle »', 'l’amour embellit tout', 'Avec tendresse, à propos des parents fiers de leurs enfants.', 'Proverbe'],
  ['tuyour', 'اَلطُّيُورُ عَلَى أَشْكَالِهَا تَقَعُ', 'aṭ-ṭuyūru ʿalā ashkālihā taqaʿ', '« les oiseaux se posent auprès de leurs semblables »', 'qui se ressemble s’assemble', 'Pour commenter une amitié ou un couple bien assortis.', 'Proverbe'],
  ['aql-salim', 'اَلْعَقْلُ السَّلِيمُ فِي الْجِسْمِ السَّلِيمِ', 'al-ʿaqlu s-salīmu fi l-jismi s-salīm', '« l’esprit sain dans le corps sain »', 'un esprit sain dans un corps sain', 'Une devise de médecin, ou de sportive.', 'Proverbe'],
  ['dirham', 'دِرْهَمُ وِقَايَةٍ خَيْرٌ مِنْ قِنْطَارِ عِلَاجٍ', 'dirhamu wiqāyatin khayrun min qinṭāri ʿilāj', '« un dirham de prévention vaut mieux qu’un quintal de traitement »', 'mieux vaut prévenir que guérir', 'À citer à ses patients !', 'Proverbe'],
  ['moujarrib', 'اِسْأَلْ مُجَرِّبًا وَلَا تَسْأَلْ حَكِيمًا', 'is’al mujarriban wa-lā tas’al ḥakīman', '« demande à qui a essayé, pas au sage »', 'l’expérience vaut mieux que la théorie', 'Pour recommander l’avis de quelqu’un qui est passé par là.', 'Proverbe'],
  ['bahr-ziyada', 'اِلْبَحْر بِيْحِبّ الزِّيَادَة', 'il-baḥr biyḥibb iz-ziyāda', '« la mer aime qu’on en rajoute »', 'on ne refuse jamais un petit supplément', 'En plaisantant, quand on offre un peu plus à quelqu’un qui a déjà beaucoup.', 'Égyptien'],
  ['ya-salam', 'يَا سَلَام!', 'yā salām !', '« ô paix ! »', 'waouh ! quelle merveille !', 'Pour exprimer l’admiration ou la surprise.', 'Tous dialectes'],
  ['habibti', 'يَا حَبِيبْتِي', 'yā ḥabībtī', '« ô ma bien-aimée »', 'ma chère, ma belle', 'Terme affectueux très courant entre amies, sans rien de romantique.', 'Tous dialectes'],
  ['khod-waqtak', 'خُذِي وَقْتَكِ', 'khudhī waqtaki', '« prends ton temps »', 'prends ton temps, rien ne presse', 'Pour rassurer quelqu’un qui cherche ses mots (à une femme).', 'Standard'],
  ['tamam', 'كُلُّهُ تَمَامٌ', 'kulluhu tamām', '« tout est complet »', 'tout va bien, tout est en ordre', 'Pour confirmer que tout est réglé.', 'Standard'],
]

export const EXPRESSIONS: Expression[] = RAW.map(([id, ar, tr, literal, meaning, usage, register]) => ({
  id: `expr-${id}`, ar, tr, literal, meaning, usage, register,
}))

/** La même expression toute la journée, en parcourant la liste sans répétition rapprochée. */
export function expressionOfTheDay(date = new Date()): Expression {
  const days = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000)
  return EXPRESSIONS[((days * 7) % EXPRESSIONS.length + EXPRESSIONS.length) % EXPRESSIONS.length]
}
