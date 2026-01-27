import Calculator from '@/components/Calculator'
import Link from 'next/link'

export const metadata = {
  title: 'Retirement Calculator | Bored Room',
  description: 'Calculate how much you need to retire and finally escape the bored room.',
  keywords: [
    'retirement calculator',
    'financial independence',
    'FIRE movement',
    'early retirement',
    'investment calculator',
    'corpus calculator',
    'financial planning'
  ],
  openGraph: {
    title: 'Retirement Calculator | Bored Room',
    description: 'Calculate how much you need to retire and finally escape the bored room.',
  },
}

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      {/* Back to home */}
      <div className="max-w-4xl mx-auto mb-6">
        <Link 
          href="/" 
          className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
        >
          ← boredroom.in
        </Link>
      </div>

      {/* Calculator */}
      <div className="max-w-4xl mx-auto">
        <Calculator />
      </div>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto mt-12 text-center">
        <p className="text-xs text-gray-400">
          A tool by <Link href="/" className="hover:text-gray-600">boredroom.in</Link>
        </p>
      </footer>
    </main>
  )
}
