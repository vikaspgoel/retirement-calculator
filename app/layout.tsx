import type { Metadata } from 'next'
import { Space_Mono, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono'
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

// Sahitya for Hindi/Devanagari (Gita pages) – loaded so font-sanskrit uses it
const sahitya = {
  variable: '--font-sanskrit-family',
  className: '', // not applied globally; Tailwind font-sanskrit uses the variable
}
// Load Sahitya via link in layout so it's available; Tailwind applies it via font-sanskrit
try {
  const SahityaFont = require('next/font/google').Sahitya
  if (SahityaFont) {
    const loaded = SahityaFont({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-sanskrit-family' })
    Object.assign(sahitya, loaded)
  }
} catch (_) {
  // Sahitya may not be in next/font; globals.css @import will provide it
}

export const metadata: Metadata = {
  title: 'bored room | we are busy, doing nothing',
  description: "where doing nothing isn't a bug, it's a feature.",
  keywords: [
    'bored room', 
    'office humor', 
    'retirement calculator', 
    'bhagavad gita', 
    'financial freedom', 
    'gita wisdom', 
    'tools for life'
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} ${inter.variable} font-sans`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
