'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [showTools, setShowTools] = useState(false)
  const [layoutOption, setLayoutOption] = useState(1)

  // Layout Option 1: Button style - bordered, prominent
  const Layout1 = () => (
    <div className="h-screen flex flex-col justify-between items-center px-4 py-6 sm:py-8 overflow-hidden">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center mt-2">
        <span style={{ color: '#78716c' }}>bored</span>
        <span className="text-gray-500">room</span>
        <span className="text-white">.in</span>
      </h1>
      
      {/* Image - sized to fit */}
      <div className="flex-1 flex items-center justify-center py-4">
        <div className="w-56 sm:w-72 md:w-80 lg:w-96">
          <Image
            src="/reading-sketch-v2.png"
            alt="Relaxing with cat"
            width={500}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
      
      {/* Text */}
      <div className="text-center space-y-1 sm:space-y-2">
        <p className="text-gray-400 text-sm sm:text-base">
          Welcome to the bored room. We do nothing here.
        </p>
        <p className="text-gray-600 text-xs sm:text-sm italic">
          Let us take this offline — life is waiting.
        </p>
      </div>
      
      {/* Tools - Button style */}
      <div className="mt-4 sm:mt-6 mb-2">
        <button
          onClick={() => setShowTools(!showTools)}
          className="text-gray-300 hover:text-white text-sm sm:text-base font-medium transition-colors border-2 border-gray-600 hover:border-gray-400 px-6 py-2.5 rounded-lg"
        >
          {showTools ? '× Close' : 'Tools for Life'}
        </button>
        {showTools && (
          <div className="mt-4 text-center">
            <Link href="/retirement-calculator" className="text-gray-400 hover:text-white text-sm">
              → Retirement Calculator
            </Link>
          </div>
        )}
      </div>
    </div>
  )

  // Layout Option 2: Underlined style - elegant
  const Layout2 = () => (
    <div className="h-screen flex flex-col justify-between items-center px-4 py-6 sm:py-8 overflow-hidden">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center mt-2">
        <span style={{ color: '#78716c' }}>bored</span>
        <span className="text-gray-500">room</span>
        <span className="text-white">.in</span>
      </h1>
      
      {/* Image */}
      <div className="flex-1 flex items-center justify-center py-4">
        <div className="w-56 sm:w-72 md:w-80 lg:w-96">
          <Image
            src="/reading-sketch-v2.png"
            alt="Relaxing with cat"
            width={500}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
      
      {/* Text */}
      <div className="text-center space-y-1 sm:space-y-2">
        <p className="text-gray-400 text-sm sm:text-base">
          Welcome to the bored room. We do nothing here.
        </p>
        <p className="text-gray-600 text-xs sm:text-sm italic">
          Let us take this offline — life is waiting.
        </p>
      </div>
      
      {/* Tools - Underlined style */}
      <div className="mt-4 sm:mt-6 mb-2">
        <button
          onClick={() => setShowTools(!showTools)}
          className="text-gray-300 hover:text-white text-base sm:text-lg font-medium transition-colors border-b-2 border-gray-500 hover:border-white pb-1"
        >
          {showTools ? '× Close' : 'Tools for Life'}
        </button>
        {showTools && (
          <div className="mt-4 text-center">
            <Link href="/retirement-calculator" className="text-gray-400 hover:text-white text-sm">
              → Retirement Calculator
            </Link>
          </div>
        )}
      </div>
    </div>
  )

  // Layout Option 3: Pill/Capsule style - modern
  const Layout3 = () => (
    <div className="h-screen flex flex-col justify-between items-center px-4 py-6 sm:py-8 overflow-hidden">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center mt-2">
        <span style={{ color: '#78716c' }}>bored</span>
        <span className="text-gray-500">room</span>
        <span className="text-white">.in</span>
      </h1>
      
      {/* Image */}
      <div className="flex-1 flex items-center justify-center py-4">
        <div className="w-56 sm:w-72 md:w-80 lg:w-96">
          <Image
            src="/reading-sketch-v2.png"
            alt="Relaxing with cat"
            width={500}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
      
      {/* Text */}
      <div className="text-center space-y-1 sm:space-y-2">
        <p className="text-gray-400 text-sm sm:text-base">
          Welcome to the bored room. We do nothing here.
        </p>
        <p className="text-gray-600 text-xs sm:text-sm italic">
          Let us take this offline — life is waiting.
        </p>
      </div>
      
      {/* Tools - Pill style */}
      <div className="mt-4 sm:mt-6 mb-2 text-center">
        <button
          onClick={() => setShowTools(!showTools)}
          className="text-black bg-gray-300 hover:bg-white text-sm sm:text-base font-semibold transition-all px-8 py-3 rounded-full"
        >
          Tools for Life
        </button>
        {showTools && (
          <div className="mt-4 space-y-2">
            <Link href="/retirement-calculator" className="block text-gray-300 hover:text-white text-sm sm:text-base">
              → Retirement Calculator
            </Link>
            <p className="text-gray-600 text-xs sm:text-sm italic">
              More tools coming up
            </p>
          </div>
        )}
      </div>
    </div>
  )

  // Layout Option 4: Minimal text link - subtle but bigger
  const Layout4 = () => (
    <div className="h-screen flex flex-col justify-between items-center px-4 py-6 sm:py-8 overflow-hidden">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center mt-2">
        <span style={{ color: '#78716c' }}>bored</span>
        <span className="text-gray-500">room</span>
        <span className="text-white">.in</span>
      </h1>
      
      {/* Image */}
      <div className="flex-1 flex items-center justify-center py-4">
        <div className="w-56 sm:w-72 md:w-80 lg:w-96">
          <Image
            src="/reading-sketch-v2.png"
            alt="Relaxing with cat"
            width={500}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
      
      {/* Text */}
      <div className="text-center space-y-1 sm:space-y-2">
        <p className="text-gray-400 text-sm sm:text-base">
          Welcome to the bored room. We do nothing here.
        </p>
        <p className="text-gray-600 text-xs sm:text-sm italic">
          Let us take this offline — life is waiting.
        </p>
      </div>
      
      {/* Tools - Text link with arrow */}
      <div className="mt-4 sm:mt-6 mb-2">
        <button
          onClick={() => setShowTools(!showTools)}
          className="text-gray-400 hover:text-white text-base sm:text-lg font-medium transition-colors flex items-center gap-2"
        >
          {showTools ? '× Close' : (
            <>
              Tools for Life
              <span className="text-xl">↓</span>
            </>
          )}
        </button>
        {showTools && (
          <div className="mt-4 text-center">
            <Link href="/retirement-calculator" className="text-gray-400 hover:text-white text-sm">
              → Retirement Calculator
            </Link>
          </div>
        )}
      </div>
    </div>
  )

  const layouts = [Layout1, Layout2, Layout3, Layout4]
  const CurrentLayout = layouts[layoutOption - 1]

  return (
    <main className="h-screen bg-black overflow-hidden">
      {/* Layout Switcher */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        {[1, 2, 3, 4].map((num) => (
          <button
            key={num}
            onClick={() => setLayoutOption(num)}
            className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
              layoutOption === num
                ? 'bg-white text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      <CurrentLayout />
    </main>
  )
}
