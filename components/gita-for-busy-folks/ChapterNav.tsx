'use client'

interface ChapterNavProps {
  chapters: number[]
  selectedChapter: number
  onSelectChapter: (chapter: number) => void
}

export default function ChapterNav({ chapters, selectedChapter, onSelectChapter }: ChapterNavProps) {
  const currentIndex = chapters.indexOf(selectedChapter)
  const hasPrevious = currentIndex > 0
  const hasNext = currentIndex < chapters.length - 1

  const goToPrevious = () => {
    if (hasPrevious) {
      onSelectChapter(chapters[currentIndex - 1])
    }
  }

  const goToNext = () => {
    if (hasNext) {
      onSelectChapter(chapters[currentIndex + 1])
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between gap-4">
        {/* Previous button */}
        <button
          onClick={goToPrevious}
          disabled={!hasPrevious}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            hasPrevious
              ? 'bg-saffron-100 text-saffron-700 hover:bg-saffron-200'
              : 'bg-earth-100 text-earth-400 cursor-not-allowed'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-sanskrit">पिछला अध्याय</span>
        </button>

        {/* Chapter selector */}
        <div className="flex-1 flex items-center justify-center gap-2">
          <label className="font-sanskrit text-sm text-earth-600 font-medium">अध्याय:</label>
          <select
            value={selectedChapter}
            onChange={(e) => onSelectChapter(Number(e.target.value))}
            className="font-sanskrit px-4 py-2 border border-earth-300 rounded-lg bg-white text-earth-900 focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500"
          >
            {chapters.map((chapter) => (
              <option key={chapter} value={chapter}>
                अध्याय {chapter}
              </option>
            ))}
          </select>
        </div>

        {/* Next button */}
        <button
          onClick={goToNext}
          disabled={!hasNext}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
            hasNext
              ? 'bg-saffron-100 text-saffron-700 hover:bg-saffron-200'
              : 'bg-earth-100 text-earth-400 cursor-not-allowed'
          }`}
        >
          अगला अध्याय
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Chapter indicator */}
      <div className="mt-3 text-center">
        <p className="font-sanskrit text-xs text-earth-500">
          अध्याय {selectedChapter} / {chapters.length}
        </p>
      </div>
    </div>
  )
}
