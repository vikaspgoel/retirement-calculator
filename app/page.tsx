import Link from 'next/link'

export default function Home() {
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

      {/* Tools link - subtle */}
      <div className="fixed bottom-8 left-0 right-0 text-center animate-fade-in-delay">
        <Link 
          href="/calculator" 
          className="text-gray-700 hover:text-gray-400 text-xs transition-colors"
        >
          retirement calculator →
        </Link>
      </div>
    </main>
  )
}
