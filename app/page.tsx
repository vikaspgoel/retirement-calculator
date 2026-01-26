'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [showTools, setShowTools] = useState(false)

  return (
    <main className="h-screen bg-black overflow-hidden">
      <div className="h-full flex flex-col justify-center items-center px-4 py-6">
        {/* Title - brighter colors, larger font */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-center">
          <span style={{ color: '#a8a29e' }}>bored</span>
          <span className="text-gray-400">room</span>
          <span className="text-white">.in</span>
        </h1>
        
        {/* Image */}
        <div className="mt-4 sm:mt-6 w-56 sm:w-72 md:w-80 lg:w-96">
          <Image
            src="/reading-sketch-v2.png"
            alt="Relaxing with cat"
            width={500}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
        
        {/* Text - more visible */}
        <div className="mt-4 sm:mt-6 text-center space-y-2">
          <p className="text-gray-300 text-sm sm:text-base">
            Welcome to the bored room. We do nothing here.
          </p>
          <p className="text-gray-400 text-xs sm:text-sm italic">
            Let us take this offline — life is waiting.
          </p>
        </div>
        
        {/* Tools - Pill style */}
        <div className="mt-6 sm:mt-8 text-center">
          <button
            onClick={() => setShowTools(!showTools)}
            className="text-black bg-gray-300 hover:bg-white text-sm sm:text-base font-semibold transition-all px-8 py-3 rounded-full"
          >
            Tools for Life
          </button>
          {showTools && (
            <div className="mt-4 space-y-2">
              <Link href="/retirement-calculator" className="block text-gray-200 hover:text-white text-sm sm:text-base">
                → Retirement Calculator
              </Link>
              <p className="text-gray-400 text-xs sm:text-sm italic">
                More tools coming up
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
