import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gita and Me | Wisdom for Your State of Mind',
  description: 'Discover contextual Bhagavad Gita wisdom based on your current state of mind.',
  keywords: [
    'bhagavad gita',
    'gita wisdom',
    'spiritual guidance',
    'mental health',
    'emotional wellness',
    'krishna wisdom',
    'daily inspiration'
  ],
  openGraph: {
    title: 'Gita and Me | Wisdom for Your State of Mind',
    description: 'Discover contextual Bhagavad Gita wisdom based on your current state of mind.',
  },
}

export default function GitaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
