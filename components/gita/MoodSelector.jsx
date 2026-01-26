import { useState } from 'react';
import { MOODS } from '../data/verses';

export default function MoodSelector({ selectedMood, onSelect }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-2 border-dashed border-earth-200 rounded-xl p-4 bg-earth-50/50 hover:border-saffron-300 transition-colors">
      {/* Toggle Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'bg-saffron-100 text-saffron-600' : 'bg-earth-200 text-earth-500'}`}>
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div>
            <span className="text-sm font-medium text-earth-700 group-hover:text-saffron-700 transition-colors block">
              Choose your state of mind
            </span>
            <span className="text-xs text-earth-500">
              Optional - helps find more relevant verses
            </span>
          </div>
        </div>
        {selectedMood && (
          <span className="text-xs font-medium text-saffron-700 bg-saffron-100 px-3 py-1.5 rounded-full">
            {MOODS.find(m => m.id === selectedMood)?.label}
          </span>
        )}
      </button>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-earth-200 space-y-3 animate-in slide-in-from-top-2 duration-200">
          {selectedMood && (
            <button
              onClick={() => onSelect(null)}
              className="text-xs text-saffron-600 hover:text-saffron-700 flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear selection
            </button>
          )}
          
          <div className="flex flex-wrap gap-2">
            {MOODS.map((mood) => (
              <button
                key={mood.id}
                onClick={() => onSelect(mood.id === selectedMood ? null : mood.id)}
                className={`mood-chip ${selectedMood === mood.id ? 'selected' : ''}`}
              >
                {mood.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
