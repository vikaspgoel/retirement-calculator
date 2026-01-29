'use client'

import { ChapterInfo } from '@/lib/gita-for-busy-folks/shlokas'

interface ChapterHeaderProps {
  chapterInfo: ChapterInfo
  totalShlokas: number
}

export default function ChapterHeader({ chapterInfo, totalShlokas }: ChapterHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
      {/* Chapter name */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-earth-900 mb-2">
          अध्याय {chapterInfo.chapter}: {chapterInfo.nameHindi}
        </h2>
      </div>

      {/* Chapter summary */}
      {chapterInfo.summary ? (
        <div className="mt-6 pt-6 border-t border-earth-200">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-earth-500 mb-3">
            अध्याय का सार
          </h3>
          <div className="text-base text-earth-700 leading-relaxed space-y-3">
            {chapterInfo.summary.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 pt-6 border-t border-earth-200">
          <p className="text-sm text-earth-500 italic">
            अध्याय का सार जल्द ही उपलब्ध होगा।
          </p>
        </div>
      )}

      {/* Divider before shlokas */}
      <div className="mt-8 pt-6 border-t-2 border-saffron-200">
        <p className="text-sm font-medium text-saffron-700 text-center">
          चयनित श्लोक ({totalShlokas} श्लोक)
        </p>
      </div>
    </div>
  )
}
