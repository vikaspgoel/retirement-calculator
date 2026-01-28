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
    <main className="min-h-screen bg-[#FDFCFB] py-12 px-4">
      {/* Back to home */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link 
          href="/" 
          className="text-[#D1C7BC] hover:text-[#A6998A] text-sm transition-colors uppercase tracking-widest font-medium"
        >
          ← boredroom.in
        </Link>
      </div>

      {/* Calculator */}
      <div className="max-w-4xl mx-auto">
        <Calculator />
      </div>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto mt-16 text-center">
        <p className="text-[10px] text-[#D1C7BC] uppercase tracking-[0.2em]">
          A tool by <Link href="/" className="hover:text-[#A6998A] transition-colors">boredroom.in</Link>
        </p>
      </footer>
    </main>
  )
}
