'use client'

import { useState, useRef, useEffect } from 'react'
import { track } from '@vercel/analytics'
import { calculateRetirementCorpus, CalculatorInputs } from '@/lib/calculator'
import CalculatorForm, { AVG_BLENDED_RETURN, AVG_CONSERVATIVE_RETURN } from './CalculatorForm'
import CalculatorResults from './CalculatorResults'

export default function Calculator() {
  const [userName, setUserName] = useState('')
  const [showCalculator, setShowCalculator] = useState(false)
  const [inputs, setInputs] = useState<CalculatorInputs>({
    currentAge: 0,
    retirementAge: 0,
    currentCorpus: 0,
    currentROI: parseFloat(AVG_BLENDED_RETURN.toFixed(1)),
    expectedReturn: parseFloat(AVG_CONSERVATIVE_RETURN.toFixed(1)),
    inflationRate: 5.7,
    lifeExpectancy: 85,
    retirementMonthlyExpenses: 0,
    oneOffAnnualExpenses: 0,
  })
  const [results, setResults] = useState<any>(null)
  const [showResults, setShowResults] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to results when they appear
  useEffect(() => {
    if (showResults && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [showResults])

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userName.trim()) {
      track('started_calculator')
      setShowCalculator(true)
    }
  }

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
    setShowResults(false) // Hide results when inputs change
  }

  const handleSubmit = () => {
    track('calculated_corpus', {
      currentAge: inputs.currentAge,
      retirementAge: inputs.retirementAge,
    })
    // Calculate results directly
    setResults(calculateRetirementCorpus(inputs))
    setShowResults(true)
  }


  if (!showCalculator) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Hey there, looking to retire early?
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            Didn't have a good day at office? Don't worry, shit happens.
          </p>
        </div>
        
        <form onSubmit={handleNameSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              What should we call you? (Name or initials work!)
            </label>
            <input
              id="name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-gray-900 bg-white text-lg"
              placeholder="Enter your name or initials"
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-lg"
          >
            Let's See How Much Corpus You Need To Quit Your Job
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
          <p className="text-sm text-gray-500 italic">
            Heads up: We don't store any of your data or information. Nope, not even in our dreams. So take screenshots if you want to remember your financial future!
          </p>
          <p className="text-sm text-gray-500 italic">
            Pro tip: Play around with the numbers! Try different inputs, see what happens. It's free to dream big (or small, we don't judge).
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Hey {userName}!
        </h1>
        <p className="text-gray-600">
          Just input these numbers and we will do the rest for you. Retirement is not just about age, it is also about peace of mind.
        </p>
        <p className="text-sm text-gray-400 mt-2 italic">
          We have pre-filled certain data for your reference, feel free to edit though.
        </p>
      </div>

      <CalculatorForm 
        inputs={inputs} 
        onChange={handleInputChange}
        userName={userName}
      />

      <div className="mt-8 pt-6 border-t border-gray-200">
        {inputs.currentAge > 0 && inputs.retirementAge > inputs.currentAge && (
          <div className="mb-4 p-4 bg-primary-50 rounded-lg border border-primary-200">
            <p className="text-primary-800 text-center">
              Hey {userName}, so you plan to retire in <span className="font-bold">{inputs.retirementAge - inputs.currentAge} years</span>. 
              Let's see how much moolah you'll need to finally say goodbye to your alarm clock!
            </p>
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 px-6 rounded-lg transition-all text-lg shadow-lg hover:shadow-xl"
        >
          Take a Deep Breath, and Press
        </button>
      </div>

      {showResults && results && (
        <div ref={resultsRef} className="mt-8">
          <CalculatorResults 
            results={results} 
            userName={userName}
            inputs={inputs}
          />
        </div>
      )}
    </div>
  )
}
