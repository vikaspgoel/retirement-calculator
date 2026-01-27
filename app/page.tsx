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
        <div className="mt-4 sm:mt-6 text-center space-y-2 mb-12">
          <p className="text-gray-300 text-sm sm:text-base italic font-mono">
            "Doing nothing is very hard to do, you never know when you're finished."
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto space-y-16 px-4 pb-20">
            {/* OPTION 1: Command Line Style */}
            <div>
                <p className="text-xs text-gray-500 mb-4 text-center border-b border-gray-800 pb-2">OPTION 1: COMMAND LINE (Current Favorite)</p>
                <div className="font-mono text-sm sm:text-base max-w-md mx-auto">
                    <div className="flex flex-col gap-3 px-8">
                    <Link href="/retirement-calculator" className="group flex items-center text-gray-400 hover:text-green-400 transition-colors duration-300">
                        <span className="mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{'>'}</span>
                        <span className="border-b border-transparent group-hover:border-green-400/50 pb-0.5">retirement_calc.exe</span>
                    </Link>
                    <Link href="/gita-and-me" className="group flex items-center text-gray-400 hover:text-orange-300 transition-colors duration-300">
                        <span className="mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{'>'}</span>
                        <span className="border-b border-transparent group-hover:border-orange-300/50 pb-0.5">gita_wisdom.v1</span>
                    </Link>
                    <div className="flex items-center text-gray-600 mt-2 pl-6 italic text-xs">
                        <span>// more_tools_loading...</span>
                    </div>
                    </div>
                </div>
            </div>

            {/* OPTION 2: Minimalist Cards */}
            <div>
                <p className="text-xs text-gray-500 mb-4 text-center border-b border-gray-800 pb-2">OPTION 2: MINIMALIST CARDS</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                    <Link href="/retirement-calculator" className="block p-6 border border-gray-800 rounded hover:border-green-500/50 hover:bg-green-900/10 transition-all group text-center">
                        <div className="text-2xl mb-2">💰</div>
                        <h3 className="text-gray-200 font-mono text-sm group-hover:text-green-400">Retirement Calc</h3>
                        <p className="text-xs text-gray-500 mt-2">Calculate your freedom</p>
                    </Link>
                    <Link href="/gita-and-me" className="block p-6 border border-gray-800 rounded hover:border-orange-500/50 hover:bg-orange-900/10 transition-all group text-center">
                        <div className="text-2xl mb-2">🕉️</div>
                        <h3 className="text-gray-200 font-mono text-sm group-hover:text-orange-400">Gita & Me</h3>
                        <p className="text-xs text-gray-500 mt-2">Find your peace</p>
                    </Link>
                </div>
            </div>

            {/* OPTION 3: Floating Dock / Pills */}
            <div>
                <p className="text-xs text-gray-500 mb-4 text-center border-b border-gray-800 pb-2">OPTION 3: MODERN PILLS</p>
                <div className="flex flex-col items-center gap-4">
                    <span className="text-xs tracking-widest text-gray-500 uppercase">Tools for Life</span>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/retirement-calculator" className="px-6 py-2 bg-gray-900 text-gray-300 rounded-full text-sm hover:bg-gray-100 hover:text-black transition-all border border-gray-800">
                            Retirement Calculator
                        </Link>
                        <Link href="/gita-and-me" className="px-6 py-2 bg-gray-900 text-gray-300 rounded-full text-sm hover:bg-gray-100 hover:text-black transition-all border border-gray-800">
                            Gita & Me
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </main>
  )
}
