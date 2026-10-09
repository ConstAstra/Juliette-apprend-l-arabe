import type { Letter } from './types'

type Raw = [string, string, string, string, string, string, boolean, boolean, string, string, string]

// [id, lettre, nom, nom arabe, son, prononciation, se lie à la suivante, solaire, mot, translittération, sens]
const RAW: Raw[] = [
  ['alif', 'ا', 'alif', 'أَلِف', 'ā / a', 'Support de la hamza ou allongement du son « a ».', false, false, 'أَسَد', 'asad', 'lion'],
  ['ba', 'ب', 'bā’', 'بَاء', 'b', 'Comme le « b » français.', true, false, 'بَاب', 'bāb', 'porte'],
  ['ta', 'ت', 'tā’', 'تَاء', 't', 'Comme le « t » français.', true, true, 'تُفَّاحَة', 'tuffāḥa', 'pomme'],
  ['tha', 'ث', 'thā’', 'ثَاء', 'th', 'Comme le « th » anglais de « think » : la langue entre les dents.', true, true, 'ثَلْج', 'thalj', 'neige'],
  ['jim', 'ج', 'jīm', 'جِيم', 'j', 'Comme « dj » dans « djinn » (« g » dur en Égypte).', true, false, 'جَمَل', 'jamal', 'chameau'],
  ['ha', 'ح', 'ḥā’', 'حَاء', 'ḥ', 'Un « h » soufflé du fond de la gorge, comme pour embuer une vitre.', true, false, 'حَلِيب', 'ḥalīb', 'lait'],
  ['kha', 'خ', 'khā’', 'خَاء', 'kh', 'Comme la jota espagnole ou le « ch » allemand de « Bach ».', true, false, 'خُبْز', 'khubz', 'pain'],
  ['dal', 'د', 'dāl', 'دَال', 'd', 'Comme le « d » français.', false, true, 'دَار', 'dār', 'maison'],
  ['dhal', 'ذ', 'dhāl', 'ذَال', 'dh', 'Comme le « th » anglais de « this ».', false, true, 'ذَهَب', 'dhahab', 'or'],
  ['ra', 'ر', 'rā’', 'رَاء', 'r', 'Un « r » roulé, du bout de la langue, comme en espagnol.', false, true, 'رَجُل', 'rajul', 'homme'],
  ['zay', 'ز', 'zāy', 'زَاي', 'z', 'Comme le « z » français.', false, true, 'زَيْت', 'zayt', 'huile'],
  ['sin', 'س', 'sīn', 'سِين', 's', 'Comme le « s » de « sol ».', true, true, 'سَمَك', 'samak', 'poisson'],
  ['shin', 'ش', 'shīn', 'شِين', 'sh', 'Comme le « ch » de « chat ».', true, true, 'شَمْس', 'shams', 'soleil'],
  ['sad', 'ص', 'ṣād', 'صَاد', 'ṣ', 'Un « s » emphatique : la langue s’élargit, le son s’assombrit.', true, true, 'صَدِيق', 'ṣadīq', 'ami'],
  ['dad', 'ض', 'ḍād', 'ضَاد', 'ḍ', 'Un « d » emphatique ; l’arabe est surnommé « la langue du ḍād ».', true, true, 'ضَوْء', 'ḍaw’', 'lumière'],
  ['tta', 'ط', 'ṭā’', 'طَاء', 'ṭ', 'Un « t » emphatique, profond et sourd.', true, true, 'طَاوِلَة', 'ṭāwila', 'table'],
  ['zza', 'ظ', 'ẓā’', 'ظَاء', 'ẓ', 'Un « dh » emphatique.', true, true, 'ظِلّ', 'ẓill', 'ombre'],
  ['ayn', 'ع', 'ʿayn', 'عَيْن', 'ʿ', 'Une contraction du fond de la gorge, sans équivalent en français.', true, false, 'عَيْن', 'ʿayn', 'œil'],
  ['ghayn', 'غ', 'ghayn', 'غَيْن', 'gh', 'Comme le « r » grasseyé parisien.', true, false, 'غُرْفَة', 'ghurfa', 'chambre'],
  ['fa', 'ف', 'fā’', 'فَاء', 'f', 'Comme le « f » français.', true, false, 'فَم', 'fam', 'bouche'],
  ['qaf', 'ق', 'qāf', 'قَاف', 'q', 'Un « k » prononcé tout au fond de la gorge.', true, false, 'قَلَم', 'qalam', 'stylo'],
  ['kaf', 'ك', 'kāf', 'كَاف', 'k', 'Comme le « k » français.', true, false, 'كِتَاب', 'kitāb', 'livre'],
  ['lam', 'ل', 'lām', 'لَام', 'l', 'Comme le « l » français.', true, true, 'لَيْمُون', 'laymūn', 'citron'],
  ['mim', 'م', 'mīm', 'مِيم', 'm', 'Comme le « m » français.', true, false, 'مَاء', 'mā’', 'eau'],
  ['nun', 'ن', 'nūn', 'نُون', 'n', 'Comme le « n » français.', true, true, 'نَجْمَة', 'najma', 'étoile'],
  ['hha', 'ه', 'hā’', 'هَاء', 'h', 'Un « h » aspiré et léger, comme dans l’anglais « hello ».', true, false, 'هِلَال', 'hilāl', 'croissant de lune'],
  ['waw', 'و', 'wāw', 'وَاو', 'w / ū', 'Comme « ou » dans « oui » ; allonge aussi le son « ou ».', false, false, 'وَرْدَة', 'warda', 'rose'],
  ['ya', 'ي', 'yā’', 'يَاء', 'y / ī', 'Comme « y » dans « yaourt » ; allonge aussi le son « i ».', true, false, 'يَد', 'yad', 'main'],
]

export const LETTERS: Letter[] = RAW.map(([id, char, name, arName, translit, sound, joins, sun, ar, tr, fr]) => ({
  id, char, name, arName, translit, sound, joins, sun,
  example: { ar, tr, fr },
}))

export const letterById = (id: string) => LETTERS.find((l) => l.id === id)

export const VOWELS = [
  { id: 'fatha', mark: 'بَ', name: 'fatḥa', tr: 'ba', desc: 'Petit trait au-dessus de la lettre : son « a » bref.' },
  { id: 'kasra', mark: 'بِ', name: 'kasra', tr: 'bi', desc: 'Petit trait au-dessous de la lettre : son « i » bref.' },
  { id: 'damma', mark: 'بُ', name: 'ḍamma', tr: 'bu', desc: 'Petit wāw au-dessus : son « ou » bref.' },
  { id: 'sukun', mark: 'بْ', name: 'soukoun', tr: 'b', desc: 'Petit cercle : la consonne n’est suivie d’aucune voyelle.' },
  { id: 'shadda', mark: 'بّ', name: 'chadda', tr: 'bb', desc: 'Petit « w » : la consonne est doublée.' },
  { id: 'tanwin-a', mark: 'بًا', name: 'tanwīn fatḥ', tr: 'ban', desc: 'Double fatḥa : « -an » en fin de mot indéfini.' },
  { id: 'tanwin-i', mark: 'بٍ', name: 'tanwīn kasr', tr: 'bin', desc: 'Double kasra : « -in » en fin de mot indéfini.' },
  { id: 'tanwin-u', mark: 'بٌ', name: 'tanwīn ḍamm', tr: 'bun', desc: 'Double ḍamma : « -oun » en fin de mot indéfini.' },
]
