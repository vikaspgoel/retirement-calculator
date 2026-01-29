// Chapter names mapping
const CHAPTER_NAMES: Record<number, { name: string; nameHindi: string }> = {
  1: { name: 'Arjuna Vishada Yoga', nameHindi: 'अर्जुन विषाद योग' },
  2: { name: 'Sankhya Yoga', nameHindi: 'सांख्य योग' },
  3: { name: 'Karma Yoga', nameHindi: 'कर्म योग' },
  4: { name: 'Jnana Karma Sanyasa Yoga', nameHindi: 'ज्ञान कर्म सन्यास योग' },
  5: { name: 'Karma Sanyasa Yoga', nameHindi: 'कर्म सन्यास योग' },
  6: { name: 'Dhyana Yoga', nameHindi: 'ध्यान योग' },
  7: { name: 'Jnana Vijnana Yoga', nameHindi: 'ज्ञान विज्ञान योग' },
  8: { name: 'Aksara Brahma Yoga', nameHindi: 'अक्षर ब्रह्म योग' },
  9: { name: 'Raja Vidya Raja Guhya Yoga', nameHindi: 'राज विद्या राज गुह्य योग' },
  10: { name: 'Vibhuti Yoga', nameHindi: 'विभूति योग' },
  11: { name: 'Visvarupa Darsana Yoga', nameHindi: 'विश्वरूप दर्शन योग' },
  12: { name: 'Bhakti Yoga', nameHindi: 'भक्ति योग' },
  13: { name: 'Ksetra Ksetrajna Vibhaga Yoga', nameHindi: 'क्षेत्र क्षेत्रज्ञ विभाग योग' },
  14: { name: 'Gunatraya Vibhaga Yoga', nameHindi: 'गुणत्रय विभाग योग' },
  15: { name: 'Purusottama Yoga', nameHindi: 'पुरुषोत्तम योग' },
  16: { name: 'Daivasura Sampad Vibhaga Yoga', nameHindi: 'दैवासुर संपद् विभाग योग' },
  17: { name: 'Sraddhatraya Vibhaga Yoga', nameHindi: 'श्रद्धात्रय विभाग योग' },
  18: { name: 'Moksha Sanyasa Yoga', nameHindi: 'मोक्ष सन्यास योग' },
};

// Verse numbers to extract for each chapter
const SELECTED_VERSES: Record<number, number[]> = {
  1: [1, 21, 28, 47],
  2: [7, 11, 13, 14, 16, 18, 19, 20, 22, 25, 27, 31, 38, 41, 44, 47, 48, 49, 50, 55, 56, 57, 58, 64, 69, 70, 71, 72],
  3: [5, 7, 8, 9, 16, 19, 20, 25, 27, 30, 33, 35, 39, 41, 42, 43],
  4: [7, 8, 13, 18, 19, 20, 23, 33, 34, 36, 38, 39, 42],
  5: [2, 3, 7, 8, 9, 10, 12, 17, 18, 22, 24, 29],
  6: [5, 6, 10, 17, 18, 19, 26, 29, 30, 32, 35, 36, 46, 47],
  7: [2, 3, 7, 14, 16, 19, 27, 28],
  8: [5, 6, 7, 15, 20, 28],
  9: [2, 4, 22, 26, 29],
  10: [2, 8, 9, 10, 41],
  11: [32, 33, 54],
  12: [13, 14, 15, 16, 17, 19, 20],
  13: [1, 2, 7, 8, 9, 10, 11, 22, 34],
  14: [5, 6, 7, 8, 10, 19, 20, 26],
  15: [1, 3, 4, 7, 15, 16, 17],
  16: [1, 2, 3, 5, 21, 23, 24],
  17: [2, 15, 16, 17, 28],
  18: [2, 5, 6, 11, 14, 15, 20, 21, 22, 45, 46, 48, 54, 66],
};

export interface ChapterInfo {
  chapter: number;
  name: string;
  nameHindi: string;
  summary: string; // ~300 words in Hindi - to be added
}

export interface Shloka {
  id: string;
  chapter: number;
  verse: number;
  sanskrit: string;
  transliteration: string;
  translation: string;
  hindiLiteral: string; // शब्दार्थ / भावार्थ (2-3 lines) - to be added
  hindiInterpretation: string; // व्याख्या / तात्पर्य (200-300 words) - to be added
}

export interface ChapterData {
  info: ChapterInfo;
  shlokas: Shloka[];
}

// Import all chapters
import { chapter01 } from '../gita/data/chapters/chapter01';
import { chapter02 } from '../gita/data/chapters/chapter02';
import { chapter03 } from '../gita/data/chapters/chapter03';
import { chapter04 } from '../gita/data/chapters/chapter04';
import { chapter05 } from '../gita/data/chapters/chapter05';
import { chapter06 } from '../gita/data/chapters/chapter06';
import { chapter07 } from '../gita/data/chapters/chapter07';
import { chapter08 } from '../gita/data/chapters/chapter08';
import { chapter09 } from '../gita/data/chapters/chapter09';
import { chapter10 } from '../gita/data/chapters/chapter10';
import { chapter11 } from '../gita/data/chapters/chapter11';
import { chapter12 } from '../gita/data/chapters/chapter12';
import { chapter13 } from '../gita/data/chapters/chapter13';
import { chapter14 } from '../gita/data/chapters/chapter14';
import { chapter15 } from '../gita/data/chapters/chapter15';
import { chapter16 } from '../gita/data/chapters/chapter16';
import { chapter17 } from '../gita/data/chapters/chapter17';
import { chapter18 } from '../gita/data/chapters/chapter18';

const ALL_CHAPTERS = [
  chapter01, chapter02, chapter03, chapter04, chapter05, chapter06,
  chapter07, chapter08, chapter09, chapter10, chapter11, chapter12,
  chapter13, chapter14, chapter15, chapter16, chapter17, chapter18,
];

// --- Hindi content (AI generated) ---
// We are filling this incrementally, chapter-by-chapter.
const HINDI_CONTENT: Record<
  number,
  {
    summary?: string
    shlokas?: Record<number, { hindiLiteral: string; hindiInterpretation: string }>
  }
> = {
  1: {
    summary:
      'भगवद्गीता का प्रथम अध्याय “अर्जुन विषाद योग” कहलाता है। यह अध्याय युद्ध के आरम्भ का बाह्य दृश्य दिखाते हुए भीतर के संघर्ष को प्रकट करता है। धृतराष्ट्र का प्रश्न ही संकेत देता है कि मनुष्य जब आसक्ति में बँधता है, तब उसके भीतर भय और अनिश्चितता जन्म लेती है। “मामकाः” जैसे शब्द से स्वजन-पक्षपात का स्वरूप प्रकट होता है।\n\nइस अध्याय में अर्जुन युद्धभूमि में खड़ा होकर भी अपने मन में स्थिर नहीं रह पाता। वह दोनों सेनाओं के मध्य जाकर अपने ही संबंधियों, आचार्यों और मित्रों को देखता है। यही देखना उसके भीतर करुणा, मोह और कर्तव्य-विमूढ़ता को जगा देता है। शरीर के लक्षण—अंगों का शिथिल होना, मुख का सूखना, धनुष का गिर पड़ना—यह बताते हैं कि केवल विचार ही नहीं, पूरा व्यक्तित्व विचलित हो गया है।\n\nअध्याय का तात्पर्य यह नहीं कि अर्जुन “कमज़ोर” है; बल्कि यह कि जब अहं “मैं” और “मेरा” के बन्धन में पड़ता है, तब धर्म का निर्णय कठिन हो जाता है। यहाँ गीता का मंच तैयार होता है—शिष्य की वास्तविक अवस्था प्रकट होती है, और उसके भीतर यह अनुभव जन्म लेता है कि केवल अपनी बुद्धि के सहारे इस संकट का समाधान नहीं है। इसी विषाद से आगे ज्ञान-उपदेश का द्वार खुलता है।',
    shlokas: {
      1: {
        hindiLiteral:
          'धृतराष्ट्र बोले: धर्मभूमि कुरुक्षेत्र में युद्ध की इच्छा से एकत्र हुए मेरे पुत्र और पाण्डु-पुत्रों ने, हे संजय, क्या किया?',
        hindiInterpretation:
          'यह श्लोक गीता का प्रवेश-द्वार है। यहाँ पहली दृष्टि में प्रश्न साधारण लगता है—“क्या हुआ?” परन्तु शास्त्रीय दृष्टि से यह प्रश्न मन की गहरी स्थिति को प्रकट करता है। धृतराष्ट्र अंधे हैं; पर केवल नेत्रों से नहीं, अपने “मेरा” के आग्रह से भी। वे कहते हैं—“मामकाः” अर्थात “मेरे” पुत्र। इसी एक शब्द में आसक्ति की जड़ छिपी है। जहाँ “मेरा” प्रबल होता है, वहाँ निर्णय निष्पक्ष नहीं रह पाता; भय और शंका स्वतः उठते हैं।\n\nकुरुक्षेत्र को “धर्मक्षेत्र” कहा गया है—यह संकेत है कि धर्म का क्षेत्र केवल बाहरी भूमि नहीं, बल्कि वह स्थान भी है जहाँ मनुष्य के भीतर धर्म-अधर्म का निर्णय होता है। धृतराष्ट्र का मन पहले से आशंकित है; इसलिए वह परिणाम जानना चाहता है। शंकराचार्य की परम्परा में यह बताया गया है कि आसक्ति बुद्धि को ढँक देती है; तब मनुष्य धर्म को भी अपने पक्ष में मोड़ना चाहता है।\n\nइस श्लोक का तात्पर्य यह है कि संकट का मूल बाहरी युद्ध नहीं है; मूल है भीतर का पक्षपात। जब मन “मेरे” और “उनके” में बँधता है, तब सत्य का दर्शन कठिन हो जाता है। गीता की शिक्षा आगे इसी बन्धन को काटने के लिए है—ताकि कर्तव्य, विवेक और आत्म-स्वरूप का प्रकाश प्रकट हो सके।',
      },
      21: {
        hindiLiteral:
          'अर्जुन बोले: हे अच्युत! मेरे रथ को दोनों सेनाओं के बीच में स्थापित कीजिए।',
        hindiInterpretation:
          'अर्जुन का यह अनुरोध छोटा है, पर इसका अर्थ गहरा है। वह युद्ध से पहले “देखना” चाहता है—किसके साथ और किसके विरुद्ध यह कर्म होने जा रहा है। शास्त्रीय दृष्टि से यह देखना केवल नेत्रों का नहीं; यह मन का अपने ही संबंधों और आसक्तियों से सामना है। अर्जुन अभी तक अपने कर्तव्य के विचार में स्थिर है, परन्तु वह सत्य को आँखों से सामने लाकर परखना चाहता है।\n\n“अच्युत” शब्द—जो कभी गिरता नहीं—यह भी संकेत करता है कि मार्गदर्शक वह है जो स्वयं स्थिर है। जब शिष्य का मन डगमगाने वाला हो, तब उसे ऐसे सारथी की आवश्यकता होती है जो भीतर से अचल हो। अर्जुन का संकट इस अध्याय में आगे जिस रूप में फूटता है, उसका बीज इसी “बीच में ले चलो” में है: बीच में आकर ही वह दोनों पक्षों को देखेगा, और उसी दृष्टि से उसका मोह जागेगा।\n\nयहाँ गीता हमें यह भी दिखाती है कि निर्णय से पहले स्पष्ट देखना आवश्यक है। पर समस्या यह है कि स्पष्ट देखना केवल बाहरी जानकारी नहीं देता; वह भीतर छिपी आसक्ति को भी उजागर कर देता है। यही कारण है कि अर्जुन का “देखना” उसे आगे “विषाद” तक ले जाता है। पर यही विषाद आगे ज्ञान का आरम्भ बनता है, क्योंकि बिना भीतर की वास्तविक स्थिति प्रकट हुए उपदेश का प्रवेश नहीं हो सकता।',
      },
      28: {
        hindiLiteral:
          'अर्जुन बोले: हे कृष्ण! इस युद्ध के लिए उपस्थित अपने स्वजनों को देखकर मेरे अंग शिथिल हो रहे हैं और मुख सूख रहा है।',
        hindiInterpretation:
          'यह श्लोक अर्जुन के भीतर उठते विषाद का पहला स्पष्ट संकेत है। वह वीर है, परन्तु यहाँ भय “पराजय” का नहीं; यह भय अपने ही स्वजनों के विनाश का है। शास्त्रीय दृष्टि से यह करुणा मात्र नहीं, यह मोह से मिश्रित करुणा है—क्योंकि “स्वजन” कहकर अर्जुन अपने को संबंधों में बाँधकर देख रहा है।\n\nमहत्त्वपूर्ण बात यह है कि संकट पहले शरीर में प्रकट होता है। मन जब भीतर से असमंजस में पड़ता है, तो उसका भार शरीर उठाता है—अंगों का शिथिल होना, मुख का सूखना, यह सब उसी का लक्षण है। यहाँ गीता बताती है कि मनुष्य केवल विचारों का समूह नहीं है; उसका पूरा व्यक्तित्व—शरीर, इन्द्रियाँ, मन—एक साथ प्रतिक्रिया देता है।\n\nशंकराचार्य की परम्परा में आत्मा को साक्षी कहा गया है—वह न सूखती है, न काँपती है। परन्तु जब मन आत्मा के स्थान पर देह-सम्बन्धों से अपने को जोड़ लेता है, तब वही “मैं” काँपने लगता है। अर्जुन का यह अनुभव हमें यह समझाता है कि कर्तव्य-विमूढ़ता केवल तर्क का विषय नहीं; यह पहचान का विषय है—मैं कौन हूँ? देह और संबंधों से बँधा “मैं”, या वह आत्मा जो सबका साक्षी है?\n\nयह श्लोक इसलिए महत्त्वपूर्ण है कि यहाँ से गीता का उपदेश वास्तव में सम्भव होता है। अर्जुन अपनी दशा छिपाता नहीं; वह स्वीकार करता है कि वह भीतर से टूट रहा है। यही ईमानदारी आगे उसे शिष्य बनाती है और कृष्ण को उपदेश देने का अवसर देती है।',
      },
      47: {
        hindiLiteral:
          'संजय बोले: इस प्रकार कहकर अर्जुन रणभूमि में रथ के आसन पर बैठ गया, शोक से व्याकुल मन वाला होकर धनुष-बाण छोड़ दिए।',
        hindiInterpretation:
          'प्रथम अध्याय का अंत एक नाटकीय दृश्य से होता है—अर्जुन बैठ जाता है और धनुष-बाण त्याग देता है। यह केवल शारीरिक बैठना नहीं; यह उस “अहं” की असमर्थता का प्रकट होना है जो अब तक अपने बल और नीति पर भरोसा करता था। शोक से व्याकुल मन यह बताता है कि अर्जुन का भीतर का आधार हिल गया है।\n\nयहाँ “त्याग” बाहरी रूप में दिखाई देता है, परन्तु यह वास्तविक संन्यास नहीं है। शास्त्रीय दृष्टि से यह कर्तव्य से पलायन है, क्योंकि इसके मूल में विवेक-जनित वैराग्य नहीं, बल्कि मोहजनित विषाद है। यही अंतर आगे कृष्ण स्पष्ट करेंगे—सच्चा त्याग कर्म का नहीं, कर्मफल की आसक्ति का त्याग है।\n\nइस श्लोक में गीता का रहस्यात्मक संकेत भी है: जब मनुष्य अपनी ही बुद्धि, अपने ही तर्क और अपने ही बल के सहारे समाधान नहीं पा सकता, तब वह एक सीमा पर आकर “ठहर” जाता है। यह ठहराव यदि सत्य स्वीकार में बदल जाए, तो वही शिष्यत्व बनता है। अर्जुन अभी शिष्य-भाव में पूरी तरह प्रवेश नहीं करता, पर उसका पतन उसी दिशा में पहला कदम है।\n\nअतः यह अध्याय निराशा का प्रचार नहीं करता; यह बताता है कि मनुष्य की सीमा स्वीकार करना आवश्यक है। जब अहं टूटता है, तभी उच्च ज्ञान का द्वार खुलता है। अर्जुन के धनुष का गिरना इस अर्थ में “पराजय” नहीं, बल्कि उस यात्रा का आरम्भ है जिसमें कर्म, कर्तव्य और आत्म-स्वरूप का सत्य प्रकट होगा।',
      },
    },
  },
}

// Extract and filter shlokas
function extractShlokas(): ChapterData[] {
  const result: ChapterData[] = [];

  try {
    for (let chapterNum = 1; chapterNum <= 18; chapterNum++) {
      const chapterData = ALL_CHAPTERS[chapterNum - 1];
      const selectedVerses = SELECTED_VERSES[chapterNum];
      const chapterInfo = CHAPTER_NAMES[chapterNum];

      if (!selectedVerses || !chapterInfo || !chapterData) {
        console.warn(`Skipping chapter ${chapterNum}: missing data`);
        continue;
      }

      const filteredShlokas: Shloka[] = chapterData
        .filter((verse: any) => verse && selectedVerses.includes(verse.verse))
        .map((verse: any) => ({
          id: verse.id || `bg-${chapterNum}-${verse.verse}`,
          chapter: verse.chapter || chapterNum,
          verse: verse.verse,
          sanskrit: verse.sanskrit || '',
          transliteration: verse.transliteration || '',
          translation: verse.translation || '',
          hindiLiteral:
            HINDI_CONTENT?.[chapterNum]?.shlokas?.[verse.verse]?.hindiLiteral ?? '',
          hindiInterpretation:
            HINDI_CONTENT?.[chapterNum]?.shlokas?.[verse.verse]?.hindiInterpretation ?? '',
        }))
        .sort((a, b) => a.verse - b.verse); // Sort by verse number

      result.push({
        info: {
          chapter: chapterNum,
          name: chapterInfo.name,
          nameHindi: chapterInfo.nameHindi,
          summary: HINDI_CONTENT?.[chapterNum]?.summary ?? '',
        },
        shlokas: filteredShlokas,
      });
    }
  } catch (error) {
    console.error('Error extracting shlokas:', error);
    throw error;
  }

  return result;
}

// Lazy load to avoid issues at module load time
let cachedChaptersData: ChapterData[] | null = null;

function getAllChaptersData(): ChapterData[] {
  if (!cachedChaptersData) {
    cachedChaptersData = extractShlokas();
  }
  return cachedChaptersData;
}

export const allChaptersData: ChapterData[] = getAllChaptersData();

// Helper function to get chapter data by number
export function getChapterData(chapterNum: number): ChapterData | undefined {
  return getAllChaptersData().find((ch) => ch.info.chapter === chapterNum);
}

// Helper function to get all chapter numbers
export function getAllChapterNumbers(): number[] {
  return getAllChaptersData().map((ch) => ch.info.chapter);
}
