import Calculator from '@/components/Calculator'
import Link from 'next/link'

export const metadata = {
  title: 'Retirement Calculator | Know Your Retirement Readiness',
  description: 'Retirement planning made simple — know your corpus needs and readiness based on your goals and inputs.',
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
    title: 'Retirement Calculator | Know Your Retirement Readiness',
    description: 'Retirement planning made simple — know your corpus needs and readiness based on your goals and inputs.',
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
