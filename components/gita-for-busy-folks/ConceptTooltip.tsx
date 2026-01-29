'use client'

import { useEffect, useRef } from 'react'
import { Concept } from '@/lib/gita-for-busy-folks/concepts'

interface ConceptTooltipProps {
  concept: Concept
  position: { x: number; y: number }
  onClose: () => void
}

export default function ConceptTooltip({ concept, position, onClose }: ConceptTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  // Adjust position to keep tooltip in viewport
  const adjustedPosition = {
    x: Math.min(position.x, window.innerWidth - 320),
    y: Math.min(position.y + 20, window.innerHeight - 200),
  }

  return (
    <div
      ref={tooltipRef}
      className="fixed z-50 bg-white rounded-lg shadow-xl border border-saffron-200 p-4 max-w-xs"
      style={{
        left: `${adjustedPosition.x}px`,
        top: `${adjustedPosition.y}px`,
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-earth-400 hover:text-earth-600 transition-colors"
        aria-label="बंद करें"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Sanskrit term */}
      <div className="mb-2">
        <p className="font-sanskrit text-lg text-earth-900">{concept.term}</p>
      </div>

      {/* Meaning */}
      <div className="pt-2 border-t border-earth-100">
        <p className="text-sm text-earth-700 leading-relaxed">{concept.meaning}</p>
      </div>
    </div>
  )
}
