/** Données des jeux : mots et leur racine, verbes et leur forme. */

export interface RootItem {
  ar: string
  tr: string
  fr: string
  /** Les trois consonnes, séparées par des espaces. */
  root: string
}

export const ROOT_ITEMS: RootItem[] = [
  { ar: 'مَكْتَبَةٌ', tr: 'maktaba', fr: 'une bibliothèque', root: 'ك ت ب' },
  { ar: 'كَاتِبٌ', tr: 'kātib', fr: 'un écrivain', root: 'ك ت ب' },
  { ar: 'مُسْتَشْفًى', tr: 'mustashfā', fr: 'un hôpital', root: 'ش ف ي' },
  { ar: 'مَطْبَخٌ', tr: 'maṭbakh', fr: 'une cuisine', root: 'ط ب خ' },
  { ar: 'مَدْرَسَةٌ', tr: 'madrasa', fr: 'une école', root: 'د ر س' },
  { ar: 'مُعَلِّمٌ', tr: 'muʿallim', fr: 'un professeur', root: 'ع ل م' },
  { ar: 'تَعَلُّمٌ', tr: 'taʿallum', fr: 'l’apprentissage', root: 'ع ل م' },
  { ar: 'اِسْتِقْبَالٌ', tr: 'istiqbāl', fr: 'l’accueil', root: 'ق ب ل' },
  { ar: 'مَلْعَبٌ', tr: 'malʿab', fr: 'un terrain de jeu', root: 'ل ع ب' },
  { ar: 'مَشْرُوبٌ', tr: 'mashrūb', fr: 'une boisson', root: 'ش ر ب' },
  { ar: 'مَسْبَحٌ', tr: 'masbaḥ', fr: 'une piscine', root: 'س ب ح' },
  { ar: 'مِفْتَاحٌ', tr: 'miftāḥ', fr: 'une clé', root: 'ف ت ح' },
  { ar: 'مَطْعَمٌ', tr: 'maṭʿam', fr: 'un restaurant', root: 'ط ع م' },
  { ar: 'اِجْتِمَاعٌ', tr: 'ijtimāʿ', fr: 'une réunion', root: 'ج م ع' },
  { ar: 'مُسَاعَدَةٌ', tr: 'musāʿada', fr: 'l’aide', root: 'س ع د' },
  { ar: 'مَعْرِفَةٌ', tr: 'maʿrifa', fr: 'la connaissance', root: 'ع ر ف' },
  { ar: 'مُسَافِرٌ', tr: 'musāfir', fr: 'un voyageur', root: 'س ف ر' },
  { ar: 'مَرِيضٌ', tr: 'marīḍ', fr: 'un malade', root: 'م ر ض' },
  { ar: 'مَوْعِدٌ', tr: 'mawʿid', fr: 'un rendez-vous', root: 'و ع د' },
  { ar: 'مَلَابِسُ', tr: 'malābis', fr: 'des vêtements', root: 'ل ب س' },
  { ar: 'بَحَّارٌ', tr: 'baḥḥār', fr: 'un marin', root: 'ب ح ر' },
  { ar: 'إِبْحَارٌ', tr: 'ibḥār', fr: 'la navigation', root: 'ب ح ر' },
]

export interface FormItem {
  ar: string
  tr: string
  fr: string
  form: string
}

export const FORM_ITEMS: FormItem[] = [
  { ar: 'كَتَبَ', tr: 'kataba', fr: 'écrire', form: 'I' },
  { ar: 'شَرِبَ', tr: 'shariba', fr: 'boire', form: 'I' },
  { ar: 'دَرَّسَ', tr: 'darrasa', fr: 'enseigner', form: 'II' },
  { ar: 'نَظَّفَ', tr: 'naẓẓafa', fr: 'nettoyer', form: 'II' },
  { ar: 'سَاعَدَ', tr: 'sāʿada', fr: 'aider', form: 'III' },
  { ar: 'شَاهَدَ', tr: 'shāhada', fr: 'regarder', form: 'III' },
  { ar: 'أَرْسَلَ', tr: 'arsala', fr: 'envoyer', form: 'IV' },
  { ar: 'أَسْعَفَ', tr: 'asʿafa', fr: 'porter secours', form: 'IV' },
  { ar: 'تَعَلَّمَ', tr: 'taʿallama', fr: 'apprendre', form: 'V' },
  { ar: 'تَكَلَّمَ', tr: 'takallama', fr: 'parler', form: 'V' },
  { ar: 'تَعَاوَنَ', tr: 'taʿāwana', fr: 'coopérer', form: 'VI' },
  { ar: 'تَكَاتَبَ', tr: 'takātaba', fr: 'correspondre', form: 'VI' },
  { ar: 'اِنْكَسَرَ', tr: 'inkasara', fr: 'se briser', form: 'VII' },
  { ar: 'اِنْطَلَقَ', tr: 'inṭalaqa', fr: 'partir, s’élancer', form: 'VII' },
  { ar: 'اِجْتَمَعَ', tr: 'ijtamaʿa', fr: 'se réunir', form: 'VIII' },
  { ar: 'اِبْتَسَمَ', tr: 'ibtasama', fr: 'sourire', form: 'VIII' },
  { ar: 'اِحْمَرَّ', tr: 'iḥmarra', fr: 'rougir', form: 'IX' },
  { ar: 'اِصْفَرَّ', tr: 'iṣfarra', fr: 'jaunir, pâlir', form: 'IX' },
  { ar: 'اِسْتَعْمَلَ', tr: 'istaʿmala', fr: 'utiliser', form: 'X' },
  { ar: 'اِسْتَقْبَلَ', tr: 'istaqbala', fr: 'accueillir', form: 'X' },
]

export const FORMS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']

/** Schème de chaque forme, affiché après la réponse. */
export const FORM_PATTERNS: Record<string, string> = {
  I: 'فَعَلَ', II: 'فَعَّلَ', III: 'فَاعَلَ', IV: 'أَفْعَلَ', V: 'تَفَعَّلَ',
  VI: 'تَفَاعَلَ', VII: 'اِنْفَعَلَ', VIII: 'اِفْتَعَلَ', IX: 'اِفْعَلَّ', X: 'اِسْتَفْعَلَ',
}
