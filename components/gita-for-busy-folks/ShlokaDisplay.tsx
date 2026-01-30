'use client'

import { useState, useCallback } from 'react'
import type { MouseEvent } from 'react'
import { Shloka } from '@/lib/gita-for-busy-folks/shlokas'
import { getAllConceptTerms, getConcept } from '@/lib/gita-for-busy-folks/concepts'
import ConceptTooltip from './ConceptTooltip'

interface ShlokaDisplayProps {
  shloka: Shloka
  currentIndex: number
  totalShlokas: number
}

type TooltipState =
  | {
      concept: NonNullable<ReturnType<typeof getConcept>>
      position: { x: number; y: number }
    }
  | null

export default function ShlokaDisplay({ shloka, currentIndex, totalShlokas }: ShlokaDisplayProps) {
  const [tooltip, setTooltip] = useState<TooltipState>(null)

  // Function to highlight concepts in text
  const highlightConcepts = useCallback((text: string) => {
    if (!text) return null

    const conceptTerms = getAllConceptTerms()
    const parts: Array<{ text: string; isConcept: boolean; concept?: string }> = []
    let lastIndex = 0
    let currentIndex = 0

    // Find all concept occurrences
    const matches: Array<{ start: number; end: number; term: string }> = []

    conceptTerms.forEach((term) => {
      const regex = new RegExp(term, 'g')
      let match
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + term.length,
          term,
        })
      }
    })

    // Sort matches by position
    matches.sort((a, b) => a.start - b.start)

    // Remove overlapping matches (keep the longer one)
    const filteredMatches: typeof matches = []
    for (let i = 0; i < matches.length; i++) {
      const current = matches[i]
      const prev = filteredMatches[filteredMatches.length - 1]

      if (!prev || current.start >= prev.end) {
        filteredMatches.push(current)
      } else if (current.end - current.start > prev.end - prev.start) {
        // Current is longer, replace previous
        filteredMatches[filteredMatches.length - 1] = current
      }
    }

    // Build parts array
    filteredMatches.forEach((match) => {
      // Add text before match
      if (match.start > lastIndex) {
        parts.push({
          text: text.substring(lastIndex, match.start),
          isConcept: false,
        })
      }

      // Add highlighted concept
      parts.push({
        text: text.substring(match.start, match.end),
        isConcept: true,
        concept: match.term,
      })

      lastIndex = match.end
    })

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        text: text.substring(lastIndex),
        isConcept: false,
      })
    }

    // If no matches, return original text as single part
    if (parts.length === 0) {
      return [{ text, isConcept: false }]
    }

    return parts
  }, [])

  const handleConceptClick = (e: MouseEvent<HTMLSpanElement>, term: string) => {
    const concept = getConcept(term)
    if (concept) {
      setTooltip({
        concept,
        position: { x: e.clientX, y: e.clientY },
      })
    }
  }

  const handleCloseTooltip = () => {
    setTooltip(null)
  }

  // Strip Markdown asterisks (** bold, * italic) so they don't show as raw characters
  const stripMarkdownAsterisks = (text: string) =>
    text.replace(/\*\*/g, '').replace(/\*/g, '')

  const renderHighlightedText = (text: string) => {
    const parts = highlightConcepts(stripMarkdownAsterisks(text))
    if (!parts) return <span>{stripMarkdownAsterisks(text)}</span>

    return (
      <>
        {parts.map((part, index) => {
          if (part.isConcept && part.concept) {
            return (
              <span
                key={index}
                onClick={(e) => handleConceptClick(e, part.concept!)}
                className="underline decoration-saffron-500 decoration-2 cursor-pointer hover:bg-saffron-50 transition-colors px-1 rounded"
                title={`${part.concept} का अर्थ देखने के लिए क्लिक करें`}
              >
                {part.text}
              </span>
            )
          }
          return <span key={index}>{part.text}</span>
        })}
      </>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
      {/* Chapter/Verse reference with progress */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-medium text-saffron-600">
          अध्याय {shloka.chapter}, श्लोक {shloka.verse}
        </p>
        <p className="text-xs font-medium text-earth-500">
          {currentIndex} / {totalShlokas}
        </p>
      </div>

      {/* 1. Original Shloka (Sanskrit) */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold uppercase text-earth-500 mb-3 font-sanskrit">
          मूल श्लोक
        </h3>
        <div className="p-4 bg-earth-50 rounded-lg border-l-4 border-saffron-400">
          <p className="font-sanskrit text-lg md:text-xl leading-relaxed text-earth-900 whitespace-pre-line">
            {typeof shloka.sanskrit === 'string' ? shloka.sanskrit.normalize('NFC') : shloka.sanskrit}
          </p>
        </div>
      </div>

      {/* 2. शब्दार्थ / भावार्थ (Hindi Literal Meaning) */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold uppercase text-earth-500 mb-3 font-sanskrit">
          शब्दार्थ / भावार्थ
        </h3>
        <div className="p-4 bg-wisdom-50/50 rounded-lg border-l-4 border-wisdom-400">
          {shloka.hindiLiteral ? (
            <p className="font-sanskrit text-lg text-earth-800 leading-relaxed">
              {renderHighlightedText(typeof shloka.hindiLiteral === 'string' ? shloka.hindiLiteral.normalize('NFC') : shloka.hindiLiteral)}
            </p>
          ) : (
            <p className="text-sm text-earth-500 italic font-sanskrit">
              शब्दार्थ जल्द ही उपलब्ध होगा।
            </p>
          )}
        </div>
      </div>

      {/* 3. व्याख्या / तात्पर्य (Hindi Interpretation) */}
      <div>
        <h3 className="text-xs font-semibold uppercase text-earth-500 mb-3 font-sanskrit">
          व्याख्या / तात्पर्य
        </h3>
        <div className="p-4 bg-saffron-50/50 rounded-lg border-l-4 border-saffron-400">
          {shloka.hindiInterpretation ? (
            <div className="font-sanskrit text-lg text-earth-800 leading-relaxed space-y-3">
              {(typeof shloka.hindiInterpretation === 'string' ? shloka.hindiInterpretation.normalize('NFC') : shloka.hindiInterpretation)
                .split('\n\n')
                .map((paragraph: string, i: number) => (
                  <p key={i}>{renderHighlightedText(paragraph)}</p>
                ))}
            </div>
          ) : (
            <p className="text-sm text-earth-500 italic font-sanskrit">
              व्याख्या जल्द ही उपलब्ध होगी।
            </p>
          )}
        </div>
      </div>

      {/* Concept Tooltip */}
      {tooltip && tooltip.concept && (
        <ConceptTooltip
          concept={tooltip.concept}
          position={tooltip.position}
          onClose={handleCloseTooltip}
        />
      )}
    </div>
  )
}
