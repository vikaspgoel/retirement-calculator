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

export const metadata: Metadata = {
  title: 'Bored Room | Where Meetings Go to Die',
  description: 'Not your average board room. Welcome to the Bored Room - celebrating the art of surviving corporate meetings.',
  keywords: ['bored room', 'office humor', 'meetings', 'corporate satire'],
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
