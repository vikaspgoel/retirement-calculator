'use client'

import { useState, useEffect } from 'react'

const corporateQuotes = [
  { text: "Let's take this offline.", subtext: "— Every meeting that could've been an email" },
  { text: "We need to circle back on this.", subtext: "— Translation: I wasn't listening" },
  { text: "Let's leverage our synergies.", subtext: "— Nobody knows what this means" },
  { text: "I'll ping you.", subtext: "— You will never hear from me again" },
  { text: "Per my last email...", subtext: "— I already told you this, Karen" },
  { text: "Let's put a pin in that.", subtext: "— That pin will stay there forever" },
  { text: "We're all about work-life balance here.", subtext: "— Sent at 11:47 PM" },
  { text: "Quick question...", subtext: "— There's nothing quick about this" },
]

const meetingStats = [
  { number: "∞", label: "Meetings that could've been emails" },
  { number: "47%", label: "Time spent looking engaged on Zoom" },
  { number: "23", label: "Tabs open during 'quick sync'" },
  { number: "0", label: "People who read the pre-read" },
]

export default function Home() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % corporateQuotes.length)
        setIsVisible(true)
      }, 500)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-[#faf9f7] paper-texture">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo/Title */}
          <div className="mb-8">
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-[#1a1a2e] tracking-tight">
              Bored<span className="text-[#d4a574]">Room</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 mt-4 tracking-widest uppercase">
              .in
            </p>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 font-light italic">
            Where corporate dreams go to nap
          </p>

          {/* Rotating Quote */}
          <div className="h-32 flex items-center justify-center">
            <div 
              className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            >
              <blockquote className="text-2xl md:text-3xl font-serif text-[#1a1a2e]">
                &ldquo;{corporateQuotes[currentQuote].text}&rdquo;
              </blockquote>
              <p className="text-gray-500 mt-3 text-sm">
                {corporateQuotes[currentQuote].subtext}
              </p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-[#1a1a2e] text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-16">
            By the Numbers<span className="text-[#d4a574]">*</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {meetingStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#d4a574] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-xs mt-12">
            *Statistics are 100% made up, just like your quarterly projections
          </p>
        </div>
      </section>

      {/* Comic Strip Placeholder Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-4 text-[#1a1a2e]">
            Today&apos;s Mood
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Because sometimes only a comic strip understands
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Dilbert placeholder */}
            <div className="comic-panel p-6">
              <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center mb-4 rounded">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-gray-500 text-sm">
                    Visit <a href="https://dilbert.com" target="_blank" rel="noopener noreferrer" className="text-[#d4a574] underline hover:no-underline">dilbert.com</a> for your daily dose of Dilbert
                  </p>
                </div>
              </div>
              <p className="text-center font-serif text-lg text-[#1a1a2e]">Dilbert</p>
              <p className="text-center text-gray-500 text-sm">The OG of corporate satire</p>
            </div>

            {/* Calvin & Hobbes placeholder */}
            <div className="comic-panel p-6">
              <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center mb-4 rounded">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🐯</div>
                  <p className="text-gray-500 text-sm">
                    Visit <a href="https://www.gocomics.com/calvinandhobbes" target="_blank" rel="noopener noreferrer" className="text-[#d4a574] underline hover:no-underline">GoComics</a> for Calvin & Hobbes wisdom
                  </p>
                </div>
              </div>
              <p className="text-center font-serif text-lg text-[#1a1a2e]">Calvin & Hobbes</p>
              <p className="text-center text-gray-500 text-sm">Philosophical takes on adulting</p>
            </div>
          </div>
        </div>
      </section>

      {/* Survival Guide Section */}
      <section className="py-20 px-6 bg-[#f5f3f0]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-center mb-12 text-[#1a1a2e]">
            Meeting Survival Guide
          </h2>
          
          <div className="space-y-6">
            {[
              { emoji: "☕", tip: "Always bring coffee. It's your emotional support beverage." },
              { emoji: "💻", tip: "Position your laptop screen so no one can see your fantasy football draft." },
              { emoji: "🎭", tip: "Master the 'thoughtful nod' — works even when you've zoned out for 10 minutes." },
              { emoji: "📝", tip: "Write something. Anything. It looks like you're taking notes." },
              { emoji: "🔇", tip: "'Sorry, you're breaking up' works even in in-person meetings now." },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                <span className="text-2xl">{item.emoji}</span>
                <p className="text-gray-700">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-[#1a1a2e]">
            Coming Soon
          </h2>
          <p className="text-gray-600 mb-8">
            We&apos;re building something for all the corporate survivors out there. 
            Sign up to know when we launch (we promise not to &ldquo;circle back&rdquo; too often).
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="your.email@corporate.com"
              className="flex-1 px-4 py-3 border-2 border-[#1a1a2e] rounded-none focus:outline-none focus:ring-2 focus:ring-[#d4a574] bg-white"
            />
            <button className="px-6 py-3 bg-[#1a1a2e] text-white font-medium hover:bg-[#d4a574] transition-colors">
              Notify Me
            </button>
          </div>
          
          <p className="text-xs text-gray-400 mt-4">
            No spam. We respect your inbox more than your company respects your calendar.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="font-serif text-2xl text-[#1a1a2e]">
              Bored<span className="text-[#d4a574]">Room</span><span className="text-gray-400">.in</span>
            </div>
            
            <p className="text-gray-500 text-sm text-center">
              Made with 😴 during a conference call
            </p>
            
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-[#d4a574] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-[#d4a574] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <p className="text-center text-gray-400 text-xs mt-8">
            © 2026 BoredRoom.in — All meetings should be optional
          </p>
        </div>
      </footer>
    </main>
  )
}
