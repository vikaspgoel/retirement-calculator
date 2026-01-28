'use client'

import { useState, useRef, useEffect } from 'react'
import { track } from '@vercel/analytics'
import { calculateRetirementCorpus, CalculatorInputs } from '@/lib/calculator'
import CalculatorForm, { AVG_BLENDED_RETURN, AVG_CONSERVATIVE_RETURN, AVG_INFLATION } from './CalculatorForm'
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
    inflationRate: AVG_INFLATION,
    lifeExpectancy: 85,
    retirementMonthlyExpenses: 0,
    oneOffAnnualExpenses: 0,
  })
  const [results, setResults] = useState<any>(null)
  const [showResults, setShowResults] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showPrivacyNotes, setShowPrivacyNotes] = useState(false)
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
      <div className="relative max-w-2xl mx-auto">
        <div className="bg-[#FCFAF8] rounded-[2.5rem] p-10 sm:p-16 text-center border border-[#F3EFE9]">
          <div className="max-w-md mx-auto animate-in fade-in zoom-in duration-700">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#4A443F] mb-12 tracking-tight">
              Plan your retirement.
            </h1>
            
            <form onSubmit={handleNameSubmit} className="space-y-12">
              <div className="text-xl sm:text-2xl text-[#6D665E] font-medium leading-relaxed">
                Hello, my name is{' '}
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className="inline-block w-24 sm:w-32 bg-transparent border-b-2 border-[#D1C7BC] focus:border-primary-400 outline-none text-[#4A443F] text-center transition-colors placeholder:text-[#D1C7BC]/50 font-bold"
                  placeholder="VG"
                  autoFocus
                />
                <br />
                and I’m ready to plan.
              </div>
              
              <button
                type="submit"
                className="mt-8 text-sm uppercase tracking-[0.2em] text-[#A6998A] hover:text-[#4A443F] transition-colors flex items-center gap-2 mx-auto group/btn"
              >
                Start the Journey
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </form>

            <div className="mt-16 pt-8 border-t border-[#F3EFE9]">
              <button 
                onClick={() => setShowPrivacyNotes(!showPrivacyNotes)}
                className="text-[10px] uppercase tracking-widest text-[#D1C7BC] hover:text-[#A6998A] transition-colors"
              >
                {showPrivacyNotes ? 'Close Details' : 'What is this?'}
              </button>
              
              {showPrivacyNotes && (
                <div className="mt-6 text-left space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <p className="text-xs text-[#8B8178] leading-relaxed">
                    This is a quiet space for you to figure out how much you need to retire comfortably. We do the math; you do the dreaming.
                  </p>
                  <p className="text-[10px] text-[#A6998A] italic leading-relaxed">
                    Your data stays yours—we store nothing. Take a screenshot when you're done.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FCFAF8] rounded-[2.5rem] shadow-sm border border-[#F3EFE9] p-6 sm:p-12 transition-all duration-700">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#4A443F] mb-3">
          Hey {userName}!
        </h1>
        <p className="text-[#6D665E] text-lg font-light leading-relaxed">
          Just input these numbers and we will do the rest for you. Retirement is not just about age, it is also about peace of mind.
        </p>
        <p className="text-sm text-[#A6998A] mt-4 italic">
          We have pre-filled certain data for your reference, feel free to edit though.
        </p>
      </div>

      <CalculatorForm 
        inputs={inputs} 
        onChange={handleInputChange}
        userName={userName}
        showHelp={showHelp}
        onToggleHelp={() => setShowHelp(!showHelp)}
      />

      <div className="mt-12 pt-8 border-t border-[#F3EFE9]">
        {inputs.currentAge > 0 && inputs.retirementAge > inputs.currentAge && (
          <div className="mb-8 p-6 bg-[#F3EFE9]/50 rounded-2xl border border-[#F3EFE9]">
            <p className="text-[#6D665E] text-center font-medium">
              Hey {userName}, so you plan to retire in <span className="text-[#4A443F] font-bold">{inputs.retirementAge - inputs.currentAge} years</span>. 
              Let us see how much you will need to finally say goodbye to your alarm clock!
            </p>
          </div>
        )}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#4A443F] hover:bg-[#3D3834] text-white font-bold py-5 px-8 rounded-2xl transition-all text-lg shadow-md hover:shadow-lg active:scale-[0.99] tracking-wide"
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
