import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gita for Busy Folks | गीता कोर्स - व्यस्त लोगों के लिए',
  description: 'A curated course of 150 essential Bhagavad Gita shlokas with Hindi explanations, perfect for busy readers seeking wisdom.',
  keywords: [
    'bhagavad gita',
    'gita course',
    'gita hindi',
    'gita for busy people',
    'गीता',
    'spiritual wisdom',
    'advaita',
    'hindi gita'
  ],
  openGraph: {
    title: 'Gita for Busy Folks | गीता कोर्स - व्यस्त लोगों के लिए',
    description: 'A curated course of 150 essential Bhagavad Gita shlokas with Hindi explanations.',
  },
}

export default function GitaForBusyFolksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="font-sanskrit">{children}</div>
}
