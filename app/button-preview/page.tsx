'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ButtonPreview() {
  const [showTools, setShowTools] = useState(false)

  return (
    <main className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Button Style Preview
          </h1>
          <p className="text-gray-400">
            Compare all 5 button design options
          </p>
          <Link href="/" className="text-gray-300 hover:text-white text-sm mt-4 inline-block">
            ← Back to Landing Page
          </Link>
        </div>

        <div className="space-y-16">
          {/* Option 1: Subtle Pulse Glow */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Option 1: Subtle Pulse Glow</h2>
            <p className="text-gray-400 text-sm mb-6">White text, transparent bg, pulsing glow animation</p>
            <button
              onClick={() => setShowTools(!showTools)}
              className="text-white bg-transparent border border-white/30 hover:border-white hover:scale-105 text-sm sm:text-base font-medium transition-all duration-300 px-8 py-3 rounded-full btn-pulse"
            >
              Tools for Life
            </button>
          </div>

          {/* Option 2: Animated Border */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Option 2: Animated Border</h2>
            <p className="text-gray-400 text-sm mb-6">Border pulses, fills white on hover</p>
            <button
              onClick={() => setShowTools(!showTools)}
              className="text-white bg-transparent border-2 border-white/40 hover:bg-white hover:text-black text-sm sm:text-base font-medium transition-all duration-300 px-8 py-3 rounded-full btn-border-animate"
            >
              Tools for Life
            </button>
          </div>

          {/* Option 3: Soft Shadow Float */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Option 3: Soft Shadow Float</h2>
            <p className="text-gray-400 text-sm mb-6">Soft shadow with floating animation</p>
            <button
              onClick={() => setShowTools(!showTools)}
              className="text-white bg-transparent border border-white/20 shadow-lg shadow-white/10 hover:shadow-white/30 hover:-translate-y-1 text-sm sm:text-base font-medium transition-all duration-300 px-8 py-3 rounded-full btn-float"
            >
              Tools for Life
            </button>
          </div>

          {/* Option 4: Minimal Outline Fill */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Option 4: Minimal Outline Fill</h2>
            <p className="text-gray-400 text-sm mb-6">Clean outline that fills on hover</p>
            <button
              onClick={() => setShowTools(!showTools)}
              className="text-white bg-transparent border-2 border-white/50 hover:bg-white hover:text-black text-sm sm:text-base font-medium transition-all duration-300 px-8 py-3 rounded-full"
            >
              Tools for Life
            </button>
          </div>

          {/* Option 5: Gradient Accent */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Option 5: Gradient Accent</h2>
            <p className="text-gray-400 text-sm mb-6">Subtle gradient border effect</p>
            <button
              onClick={() => setShowTools(!showTools)}
              className="text-white bg-transparent border border-transparent bg-gradient-to-r from-white/20 to-white/5 hover:from-white/40 hover:to-white/20 backdrop-blur-sm text-sm sm:text-base font-medium transition-all duration-300 px-8 py-3 rounded-full"
            >
              Tools for Life
            </button>
          </div>
        </div>

        {showTools && (
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Click any button above to see the hover effect
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
