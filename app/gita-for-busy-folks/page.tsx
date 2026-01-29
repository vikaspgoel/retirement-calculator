'use client'

import { useState } from 'react'
import Link from 'next/link'
import { allChaptersData, getAllChapterNumbers, getChapterData } from '@/lib/gita-for-busy-folks/shlokas'
import ChapterNav from '@/components/gita-for-busy-folks/ChapterNav'
import ChapterHeader from '@/components/gita-for-busy-folks/ChapterHeader'
import ShlokaDisplay from '@/components/gita-for-busy-folks/ShlokaDisplay'

export default function GitaForBusyFolksPage() {
  const [selectedChapter, setSelectedChapter] = useState<number>(1)
  const [showBusyModal, setShowBusyModal] = useState(false)
  
  // Get chapter data with error handling
  let chapterData: ReturnType<typeof getChapterData> = undefined
  let chapterNumbers: number[] = []
  let error: string | null = null
  
  try {
    chapterNumbers = getAllChapterNumbers()
    chapterData = getChapterData(selectedChapter)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error('Error loading chapter data:', err)
    error = `Error loading data: ${errorMessage}`
  }

  return (
    <main className="min-h-screen bg-[#fbf7f0] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back to Gita and Me */}
        <div className="mb-6">
          <Link 
            href="/gita-and-me" 
            className="text-earth-600 hover:text-earth-800 text-sm transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            गीता और मैं पर वापस जाएँ
          </Link>
        </div>

        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-earth-900 mb-3">
            भगवद्गीता — हिंदी में एक संक्षिप्त पाठ्यक्रम
          </h1>
          <p className="text-earth-600 text-base mb-3">
            सबसे आवश्यक श्लोकों का चयनित पाठ्यक्रम
          </p>
          <div className="bg-saffron-50 border border-saffron-200 rounded-lg p-4 mt-4 max-w-2xl mx-auto">
            <p className="text-sm text-earth-700 leading-relaxed">
              <strong className="text-saffron-800">सुझाव:</strong> हम अनुशंसा करते हैं कि आप इस पाठ्यक्रम को क्रम से पढ़ें — अध्याय अनुसार, श्लोक अनुसार। यह आपको गीता की शिक्षाओं को बेहतर समझने में मदद करेगा।
            </p>
          </div>
          
          {/* "Too busy" button */}
          <div className="mt-6">
            <button
              onClick={() => setShowBusyModal(true)}
              className="px-5 py-3 bg-earth-500 hover:bg-earth-600 text-white rounded-lg shadow-lg transition-all text-sm font-medium font-sans hover:shadow-xl"
            >
              Too busy, no time for Gita?
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm">{error}</p>
            <p className="text-red-600 text-xs mt-2">
              कृपया पृष्ठ को पुनः लोड करें।
            </p>
          </div>
        )}

        {/* Chapter Navigation */}
        {chapterNumbers.length > 0 && (
          <ChapterNav
            chapters={chapterNumbers}
            selectedChapter={selectedChapter}
            onSelectChapter={setSelectedChapter}
          />
        )}

        {/* Chapter Content */}
        {chapterData && (
          <div className="mt-8 space-y-8">
            {/* Chapter Header with Name and Summary */}
            <ChapterHeader 
              chapterInfo={chapterData.info} 
              totalShlokas={chapterData.shlokas.length}
            />

            {/* Shlokas */}
            <div className="space-y-12">
              {chapterData.shlokas.map((shloka, index) => (
                <ShlokaDisplay 
                  key={shloka.id} 
                  shloka={shloka}
                  currentIndex={index + 1}
                  totalShlokas={chapterData.shlokas.length}
                />
              ))}
            </div>

            {/* End of Chapter */}
            <div className="mt-12 pt-8 border-t-2 border-saffron-200 text-center">
              <p className="text-sm font-medium text-saffron-700 mb-4">
                अध्याय {selectedChapter} का अंत
              </p>
              <Link
                href="/gita-for-busy-folks/about"
                className="text-xs text-earth-500 hover:text-earth-700 underline"
              >
                व्याख्या के स्रोत के बारे में जानें
              </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* Modal for "Too busy" content */}
      {showBusyModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowBusyModal(false)}
        >
          <div 
            className="bg-[#fbf7f0] rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6 pb-4 border-b border-earth-200">
              <h2 className="text-2xl font-bold text-earth-900 font-sans">We Are All 'Arjuna'</h2>
              <button
                onClick={() => setShowBusyModal(false)}
                className="text-earth-400 hover:text-earth-600 transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="max-w-none text-earth-700 leading-relaxed space-y-6 font-sans">
              <p className="text-xl font-semibold text-earth-900 mb-4 font-sans">
                We Are All 'Arjuna': Why the Gita Is Needed in the Battlefield of Life
              </p>
              
              <p className="text-base text-earth-700">
                The mental state described in the opening verses of Chapter 1 and the early verses of Chapter 2 of the Bhagavad Gita is an uncannily accurate reflection of the modern, working individual's state of mind today.
              </p>
              
              <p className="text-base text-earth-700">
                When Arjuna says—<em className="text-earth-800 font-medium">"My limbs are giving way, my mouth is drying up… My body trembles, my hair stands on end… My mind is reeling"</em>—this is not merely the lament of an ancient warrior. In today's language, these are the very symptoms we associate with acute stress, anxiety, or decision paralysis.
              </p>
              
              <p className="text-base text-earth-700">
                The only difference is this: this state does not belong to an ordinary person, but to the most capable, trained, and confident warrior of his time.
              </p>
              
              <div className="mt-8 pt-6 border-t border-earth-200">
                <h3 className="text-lg font-semibold text-earth-900 mb-4 font-sans">The Three Conditions of Being 'Arjuna'</h3>
                <p className="mb-4 text-base text-earth-700">
                  According to a deep reflection, being in the state of 'Arjuna' depends on three essential factors:
                </p>
                <ul className="list-disc list-inside space-y-3 ml-4 text-base text-earth-700">
                  <li>
                    <strong className="text-earth-900 font-semibold">Asmanjas (Inner Conflict):</strong> When duty, values, and emotions collide with one another.
                  </li>
                  <li>
                    <strong className="text-earth-900 font-semibold">Vikalp (Choices):</strong> When multiple paths are available, and every decision has a cost.
                  </li>
                  <li>
                    <strong className="text-earth-900 font-semibold">Kshamta (Capability):</strong> When a person has the full skill, competence, and strength to act.
                  </li>
                </ul>
                <p className="mt-4 text-base text-earth-700">
                  Arjuna was not incapable. The problem was that despite being capable, he lacked clarity. And if we look honestly, this is exactly our condition today. We have skills, opportunities, and choices—and precisely because of this, we often feel internally conflicted.
                </p>
                <p className="mt-4 font-medium text-earth-900">
                  In that sense, almost every day, all of us are Arjuna.
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-earth-200">
                <h3 className="text-lg font-semibold text-earth-900 mb-4 font-sans">Surrender: The True Beginning of the Solution</h3>
                <p className="text-base text-earth-700">
                  The decisive turning point of the Gita comes in Chapter 2, Verse 7, when Arjuna acknowledges his limitation and tells Krishna that his intellect is confused and that he needs clear guidance. This moment is crucial.
                </p>
                <p className="mt-4 text-base text-earth-700">
                  Here, Arjuna stops arguing—and becomes ready to listen. This surrender is not weakness; it is maturity. If someone as powerful and heroic as Arjuna could humbly ask for help, what prevents us from seeking guidance when faced with complex decisions in our own lives?
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-earth-200">
                <h3 className="text-lg font-semibold text-earth-900 mb-4 font-sans">Who Is Our 'Krishna' Today?</h3>
                <p className="text-base text-earth-700">
                  Today, we may not have Krishna physically present on our chariot. But we do have access to that timeless dialogue which has guided human beings across ages, roles, and pressures—the Bhagavad Gita.
                </p>
                <p className="mt-4 text-base text-earth-700">
                  This is neither a book of miracles nor a collection of moral sermons. It offers a practical understanding of wisdom, action, character, and inner balance. It is the search for that 'Krishna' who is not outside us, but seated within us as the charioteer of our intellect—who speaks when we, like Arjuna, accept that we need to listen.
                </p>
                <p className="mt-4 text-base text-earth-700">
                  If we are Arjuna—caught in inner conflict, surrounded by choices, and yet fully capable—then the Gita is not merely a religious scripture, but a living dialogue on how to live.
                </p>
              </div>
              
              <div className="mt-8 p-5 bg-saffron-50/80 border-l-4 border-saffron-400 rounded-lg">
                <p className="text-base text-earth-900 font-medium leading-relaxed">
                  And finally, it is important to remember this: The Gita was not spoken in a peaceful hermitage. It was spoken on a battlefield—in the busiest, most critical, and most stressful moment. Arjuna was at the peak of his life—at the height of his career and capability. So if the mind ever says, "I'm too busy right now," remember this: The Gita was spoken for those who were the busiest. And perhaps, that is exactly why it is just as necessary for us today.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
