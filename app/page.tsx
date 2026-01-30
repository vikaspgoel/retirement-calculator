'use client'

import Link from 'next/link'
import Image from 'next/image'

const TOOLS = [
  {
    href: '/retirement-calculator',
    label: 'Retirement Calculator',
    description:
      'Turn retirement dreams into numbers with this simple, practical corpus calculator.',
  },
  {
    href: '/gita-and-me',
    label: 'Gita and me',
    description:
      "Your emotions aren't new—discover how the Bhagwad Gita addressed them through Arjuna.",
  },
  {
    href: '/gita-for-busy-folks',
    label: 'Gita Gyan',
    description: 'कम शब्दों में गहन गीता ज्ञान, पूरी तरह हिंदी में',
  },
] as const

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <div className="min-h-full flex flex-col justify-center items-center px-4 py-6">
        {/* Title - unchanged size */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-center">
          <span style={{ color: '#a8a29e' }}>bored</span>
          <span className="text-gray-400">room</span>
          <span className="text-white">.in</span>
        </h1>

        {/* Image - reduced size */}
        <div className="mt-4 sm:mt-6 w-40 sm:w-48 md:w-56 lg:w-64">
          <Image
            src="/reading-sketch-v2.png"
            alt="Relaxing with cat"
            width={500}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Quote - same font as rest of page, subtle fade-in */}
        <div className="mt-4 sm:mt-6 text-center animate-quote">
          <p className="text-gray-300 text-sm sm:text-base italic">
            &quot;Doing nothing is very hard to do, you never know when you&apos;re finished.&quot;
          </p>
        </div>

        {/* Tools - Option C only */}
        <nav className="mt-6 sm:mt-8 w-full max-w-md text-center">
          <div className="space-y-0 border-t border-gray-800">
            {TOOLS.map((t) => (
              <div
                key={t.href}
                className="border-b border-gray-800 py-4 last:border-0"
              >
                <Link
                  href={t.href}
                  className="text-base sm:text-lg text-gray-200 hover:text-white font-medium transition-colors block"
                >
                  → {t.label}
                </Link>
                <p
                  className={`mt-1 text-sm text-gray-400 ${t.href === '/gita-for-busy-folks' ? 'font-sanskrit' : ''}`}
                  lang={t.href === '/gita-for-busy-folks' ? 'hi' : undefined}
                >
                  {t.description}
                </p>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </main>
  )
}
