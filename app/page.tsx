'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [showTools, setShowTools] = useState(false)

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight animate-fade-in">
        <span style={{ color: '#78716c' }}>bored</span>
        <span className="text-gray-500">room</span>
        <span className="text-white">.in</span>
      </h1>

      {/* Tagline */}
      <p className="mt-8 md:mt-10 text-gray-500 text-center text-sm sm:text-base max-w-sm leading-relaxed animate-fade-in-delay">
        Welcome to the bored room.
        <br />
        Let's take this offline — life's waiting.
      </p>

      {/* Tools Section */}
      <div className="mt-16 text-center animate-fade-in-delay">
        <button
          onClick={() => setShowTools(!showTools)}
          className="text-gray-400 hover:text-white text-sm transition-colors border border-gray-700 hover:border-gray-500 px-6 py-3 rounded-lg"
        >
          Tools for Life {showTools ? '−' : '+'}
        </button>

        {showTools && (
          <div className="mt-6 space-y-3">
            <Link
              href="/retirement-calculator"
              className="block text-gray-300 hover:text-white transition-colors text-sm"
            >
              → Retirement Calculator
            </Link>
            <p className="text-gray-600 text-sm italic">
              Other tools coming soon...
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
