'use client'

import { useState } from 'react'
import Link from 'next/link'
import { allChaptersData, getAllChapterNumbers, getChapterData } from '@/lib/gita-for-busy-folks/shlokas'
import ChapterNav from '@/components/gita-for-busy-folks/ChapterNav'
import ChapterHeader from '@/components/gita-for-busy-folks/ChapterHeader'
import ShlokaDisplay from '@/components/gita-for-busy-folks/ShlokaDisplay'

export default function GitaForBusyFolksPage() {
  const [selectedChapter, setSelectedChapter] = useState<number>(1)
  
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
            className="font-sanskrit text-earth-600 hover:text-earth-800 text-sm transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Gita and Me
          </Link>
        </div>

        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="font-sanskrit text-3xl font-bold text-earth-900 mb-3">
            भगवद्गीता — हिंदी में एक संक्षिप्त पाठ्यक्रम
          </h1>
          <p className="font-sanskrit text-earth-600 text-base mb-3">
            सबसे आवश्यक श्लोकों का चयनित पाठ्यक्रम
          </p>
          <div className="bg-saffron-50 border border-saffron-200 rounded-lg p-4 mt-4 max-w-2xl mx-auto">
            <p className="font-sanskrit text-sm text-earth-700 leading-relaxed">
              <strong className="text-saffron-800">सुझाव:</strong> हम अनुशंसा करते हैं कि आप इस पाठ्यक्रम को क्रम से पढ़ें — अध्याय अनुसार, श्लोक अनुसार। यह आपको गीता की शिक्षाओं को बेहतर समझने में मदद करेगा। रोज़ १५ मिनट, ५ श्लोक — एक महीने में पूरा। शुभ पाठ।
            </p>
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
              <p className="font-sanskrit text-sm font-medium text-saffron-700 mb-4">
                अध्याय {selectedChapter} का अंत
              </p>
              <Link
                href="/gita-for-busy-folks/about"
                className="font-sanskrit text-xs text-earth-500 hover:text-earth-700 underline"
              >
                व्याख्या के स्रोत के बारे में जानें
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
