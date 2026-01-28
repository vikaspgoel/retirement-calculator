'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [showTools, setShowTools] = useState(false)

  return (
    <main className="h-screen bg-[#FDFCFB] overflow-hidden">
      <div className="h-full flex flex-col justify-center items-center px-4 py-6">
        {/* Title - using calm colors */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center">
          <span className="text-[#A6998A]">bored</span>
          <span className="text-[#D1C7BC]">room</span>
          <span className="text-[#4A443F]">.in</span>
        </h1>
        
        {/* Image */}
        <div className="mt-4 sm:mt-6 w-56 sm:w-72 md:w-80 lg:w-96">
          <Image
            src="/reading-sketch-v2.png"
            alt="Relaxing with cat"
            width={500}
            height={400}
            className="w-full h-auto opacity-90"
            priority
          />
        </div>
        
        {/* Text - calm palette */}
        <div className="mt-4 sm:mt-6 text-center space-y-2">
          <p className="text-[#6D665E] text-sm sm:text-base font-light">
            Welcome to the bored room. We do nothing here.
          </p>
          <p className="text-[#A6998A] text-xs sm:text-sm italic font-light">
            Let us take this offline — life is waiting.
          </p>
        </div>
        
        {/* Tools - Calm button style */}
        <div className="mt-6 sm:mt-8 text-center">
          <button
            onClick={() => setShowTools(!showTools)}
            className="text-white bg-[#4A443F] hover:bg-[#3D3834] text-sm sm:text-base font-medium transition-all px-10 py-3.5 rounded-full shadow-sm"
          >
            Tools for Life
          </button>
          {showTools && (
            <div className="mt-6 space-y-3 animate-fade-in">
              <Link href="/retirement-calculator" className="block text-[#6D665E] hover:text-[#4A443F] text-sm sm:text-base transition-colors">
                → Retirement Calculator
              </Link>
              <Link href="/gita-and-me" className="block text-[#6D665E] hover:text-[#4A443F] text-sm sm:text-base transition-colors">
                → Gita and me
              </Link>
              <p className="text-[#D1C7BC] text-[10px] uppercase tracking-widest mt-4">
                More tools coming up
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
