import { useState } from 'react';
import InlineVerse from './InlineVerse';

export default function QuoteDisplay({ arjunaVerses, krishnaData, onReset }) {
  const [showKrishna, setShowKrishna] = useState(false);
  const [showMore, setShowMore] = useState(false);
  
  const { primary: primaryKrishna, additional: additionalKrishna, hasMore } = krishnaData;

  // No results case
  if (arjunaVerses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-earth-600">No matching verses found for this state.</p>
        <button
          onClick={onReset}
          className="mt-4 text-saffron-600 hover:text-saffron-700"
        >
          Try different inputs
        </button>
      </div>
    );
  }

  // === KRISHNA'S RESPONSE PAGE (Full Screen) ===
  if (showKrishna) {
    return (
      <div className="space-y-6">
        {/* Back to Arjuna button */}
        <button
          onClick={() => setShowKrishna(false)}
          className="text-sm text-earth-600 hover:text-earth-800 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Arjuna's state
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8 bg-gradient-to-b from-saffron-50/50 to-white">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-saffron-100 text-saffron-700">
                <span className="text-lg font-sanskrit">कृ</span>
              </div>
              <h2 className="text-lg font-medium text-saffron-800">Krishna's Response</h2>
            </div>

            {/* Primary Krishna verses with commentary always visible */}
            <div className="space-y-10">
              {primaryKrishna.map((verse, index) => (
                <InlineVerse 
                  key={verse.id} 
                  verse={verse} 
                  showDivider={index < primaryKrishna.length - 1}
                  variant="krishna"
                  showCommentary={true}
                  alwaysShowCommentary={true}
                  showSimpleSummary={true}
                />
              ))}
            </div>

            {/* Curious for more Button */}
            {hasMore && !showMore && (
              <button
                onClick={() => setShowMore(true)}
                className="mt-8 w-full py-3 border-2 border-dashed border-saffron-300 text-saffron-700 rounded-lg hover:bg-saffron-50 hover:border-saffron-400 transition-colors flex items-center justify-center gap-2"
              >
                <span>Curious for more?</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}

            {/* Additional Krishna verses (expanded) */}
            {showMore && additionalKrishna.length > 0 && (
              <div className="mt-8 pt-8 border-t border-saffron-200">
                <p className="text-sm text-earth-500 mb-6">Deeper wisdom for further reflection</p>
                <div className="space-y-10">
                  {additionalKrishna.map((verse, index) => (
                    <InlineVerse 
                      key={verse.id} 
                      verse={verse} 
                      showDivider={index < additionalKrishna.length - 1}
                      variant="krishna"
                      showCommentary={true}
                      alwaysShowCommentary={true}
                      showSimpleSummary={true}
                    />
                  ))}
                </div>
                
                <button
                  onClick={() => setShowMore(false)}
                  className="mt-6 text-sm text-earth-500 hover:text-earth-700 flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  Show less
                </button>
              </div>
            )}

            {/* Back to beginning */}
            <div className="mt-10 pt-6 border-t border-earth-100">
              <button
                onClick={onReset}
                className="w-full py-3 bg-earth-100 hover:bg-earth-200 text-earth-700 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Explore a different state of mind
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === ARJUNA'S STATE PAGE ===
  return (
    <div className="space-y-6">
      {/* Back to input button */}
      <button
        onClick={onReset}
        className="text-sm text-earth-600 hover:text-earth-800 flex items-center gap-1"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Change my inputs
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          {/* Empathetic Message */}
          <div className="mb-8 p-4 bg-wisdom-50/50 rounded-lg border border-wisdom-100">
            <p className="text-sm text-wisdom-800 leading-relaxed">
              You are not alone in your state of mind. Even Arjuna, the mightiest warrior of his age, 
              stood paralyzed by the very feelings you may be experiencing now. The Gita begins not 
              with answers, but with a man overwhelmed—just as we all sometimes are.
            </p>
          </div>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-wisdom-100 text-wisdom-700">
              <span className="text-lg font-sanskrit">अ</span>
            </div>
            <h2 className="text-lg font-medium text-wisdom-800">Arjuna's State</h2>
          </div>

          {/* All Arjuna verses together */}
          <div className="space-y-6 mb-6">
            {arjunaVerses.map((verse, index) => (
              <InlineVerse 
                key={verse.id} 
                verse={verse} 
                showDivider={index < arjunaVerses.length - 1}
                variant="arjuna"
                showCommentary={false}
              />
            ))}
          </div>

          {/* Combined Commentary for Arjuna verses */}
          {arjunaVerses.length > 0 && arjunaVerses[0].commentary && (
            <div className="bg-earth-50 rounded-lg p-4 mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-earth-500 mb-3">
                Reflection
              </h4>
              <div className="text-sm text-earth-700 leading-relaxed space-y-3">
                {arjunaVerses[0].commentary.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}

          {/* Button to go to Krishna's response (next page) */}
          {primaryKrishna.length > 0 && (
            <button
              onClick={() => setShowKrishna(true)}
              className="mt-8 w-full py-4 bg-saffron-500 hover:bg-saffron-600 text-white font-medium rounded-xl transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span>See Krishna's Response</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
