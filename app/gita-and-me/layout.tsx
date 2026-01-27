import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gita and Me | Gita Wisdom for Your Life Moments',
  description: 'Engage with Bhagavad Gita insights that mirror your inner state — find meaning, equanimity, and direction.',
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
    title: 'Gita and Me | Gita Wisdom for Your Life Moments',
    description: 'Engage with Bhagavad Gita insights that mirror your inner state — find meaning, equanimity, and direction.',
  },
}

export default function GitaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
