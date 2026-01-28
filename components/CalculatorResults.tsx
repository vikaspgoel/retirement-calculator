'use client'

import { CalculatorResult, CalculatorInputs, calculateRealisticScenario, calculateRetirementCorpus } from '@/lib/calculator'
import { TrendingUp, Target, AlertCircle, Lightbulb, Zap } from 'lucide-react'
import { AVG_BLENDED_RETURN, AVG_INFLATION, AVG_CONSERVATIVE_RETURN } from './CalculatorForm'

interface CalculatorResultsProps {
  results: CalculatorResult
  userName: string
  inputs: CalculatorInputs
}

export default function CalculatorResults({ results, userName, inputs }: CalculatorResultsProps) {
  const realisticResults = calculateRealisticScenario(inputs, AVG_INFLATION, AVG_BLENDED_RETURN, AVG_CONSERVATIVE_RETURN)

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)}Cr`
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)}L`
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(1)}K`
    }
    return `₹${value.toFixed(0)}`
  }

  return (
    <div className="space-y-12 mt-12 pt-10 border-t-2 border-[#F3EFE9]">
      {/* Your Plan Section */}
      <section className="bg-white/40 rounded-[2.5rem] p-8 sm:p-12 border border-[#F3EFE9]/60">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[#4A443F] mb-3">
            Here is Your Plan, {userName}!
          </h2>
          <p className="text-[#6D665E] font-light leading-relaxed">
            Let us see how much you need based on the values you put.
          </p>
        </div>

        {/* Main Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Gross Corpus Required */}
          <div className="bg-white p-8 rounded-[2rem] border border-[#F3EFE9] shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-[#A6998A]" />
              <h3 className="text-xl font-bold text-[#4A443F]">Gross Corpus Required at Retirement Age</h3>
            </div>
            <div className="text-4xl font-bold text-[#4A443F] mb-2">
              {formatCurrency(results.grossCorpusRequired)}
            </div>
            <p className="text-sm text-[#8B8178]">
              This is the total amount you will need at age {inputs.retirementAge} to sustain your retirement lifestyle
            </p>
          </div>

          {/* Current Corpus Growth */}
          <div className="bg-white p-8 rounded-[2rem] border border-[#F3EFE9] shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-[#A6998A]" />
              <h3 className="text-xl font-bold text-[#4A443F]">Your Current Savings at Retirement</h3>
            </div>
            <div className="text-4xl font-bold text-[#4A443F] mb-2">
              {formatCurrency(results.futureValueOfCurrentCorpus)}
            </div>
            <p className="text-sm text-[#8B8178]">
              Your current savings of {formatCurrency(inputs.currentCorpus)} will grow to this amount at {inputs.currentROI}% annual return
            </p>
          </div>

          {/* Additional Corpus Required */}
          <div className="bg-white p-8 rounded-[2rem] border border-[#F3EFE9] shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-[#A6998A]" />
              <h3 className="text-xl font-bold text-[#4A443F]">Additional Corpus Required</h3>
            </div>
            <div className="text-4xl font-bold text-[#4A443F] mb-2">
              {formatCurrency(results.additionalCorpusRequired)}
            </div>
            <p className="text-sm text-[#8B8178]">
              This is the additional amount you need to save beyond your current savings growth
            </p>
          </div>

          {/* Monthly Contribution Needed */}
          <div className="bg-white p-8 rounded-[2rem] border border-[#F3EFE9] shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-[#A6998A]" />
              <h3 className="text-xl font-bold text-[#4A443F]">Monthly Contribution Needed</h3>
            </div>
            <div className="text-4xl font-bold text-[#4A443F] mb-2">
              {formatCurrency(results.monthlyContributionNeeded)}
            </div>
            <p className="text-sm text-[#8B8178]">
              Start saving this amount monthly from now till retirement to reach your goal
            </p>
          </div>
        </div>

        {/* Thumb Rule */}
        <div className="bg-[#FDFBF7] border-l-4 border-[#D1C7BC] p-6 rounded-r-[2rem]">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#A6998A] mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-[#4A443F] mb-2">Quick Thumb Rule</h3>
              <p className="text-sm text-[#6D665E]">
                As a general rule, you should have around <span className="font-bold">25 times your annual expenses</span> saved up for retirement. 
                For you, that is roughly <span className="font-bold text-[#4A443F]">{formatCurrency(results.annualExpensesAtRetirement * 25)}</span>.
                Not too far from our calculation, eh?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Realistic Scenario */}
      <section className="bg-[#4A443F] rounded-[2.5rem] p-8 sm:p-12 border border-[#3D3834] shadow-xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3 text-center">
            Here is What We Think You Will Actually Need
          </h2>
          <p className="text-[#D1C7BC] mb-6 leading-relaxed font-light text-center">
            Based on realistic assumptions — Inflation (5.7%), Returns till retirement (9%), Returns after retirement (7.8%) and Life expectancy (85 years).
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-[2rem] border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-[#D1C7BC]" />
              <h3 className="text-xl font-bold text-white">Realistic Corpus Required</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {formatCurrency(realisticResults.grossCorpusRequired)}
            </div>
            <p className="text-sm text-[#D1C7BC]">
              The total amount you'll realistically need based on current trends.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-[2rem] border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-[#D1C7BC]" />
              <h3 className="text-xl font-bold text-white">Your Savings at Retirement (Realistic)</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {formatCurrency(realisticResults.futureValueOfCurrentCorpus)}
            </div>
            <p className="text-sm text-[#D1C7BC]">
              Projected growth of your current savings in this scenario.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-[2rem] border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-[#D1C7BC]" />
              <h3 className="text-xl font-bold text-white">Additional Corpus Needed (Realistic)</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {formatCurrency(realisticResults.additionalCorpusRequired)}
            </div>
            <p className="text-sm text-[#D1C7BC]">
              The real gap you may need to fill with new savings.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-[2rem] border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-[#D1C7BC]" />
              <h3 className="text-xl font-bold text-white">Monthly Contribution Needed (Realistic)</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              {formatCurrency(realisticResults.monthlyContributionNeeded)}
            </div>
            <p className="text-sm text-[#D1C7BC]">
              Recommended monthly saving to hit your realistic target.
            </p>
          </div>
        </div>
      </section>

      {/* Expense Reduction Tip */}
      <div className="bg-[#FDFBF7] border-l-4 border-[#D1C7BC] p-6 rounded-r-[2rem]">
        <div className="flex items-start">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-[#4A443F] mb-2">Money Saving Tip</h3>
            <p className="text-sm text-[#6D665E]">
              If you reduce your monthly expenses at retirement by 10%, you will need only{' '}
              <span className="font-bold text-[#4A443F]">
                {formatCurrency(
                  calculateRetirementCorpus({
                    ...inputs,
                    retirementMonthlyExpenses: inputs.retirementMonthlyExpenses * 0.9,
                  }).grossCorpusRequired
                )}
              </span>{' '}
              as corpus instead of{' '}
              <span className="font-bold text-[#4A443F]">{formatCurrency(results.grossCorpusRequired)}</span>.
            </p>
            <p className="text-xs text-[#8B8178] mt-2">
              That is a savings of{' '}
              <span className="font-semibold">
                {formatCurrency(results.grossCorpusRequired - calculateRetirementCorpus({
                  ...inputs,
                  retirementMonthlyExpenses: inputs.retirementMonthlyExpenses * 0.9,
                }).grossCorpusRequired)}
              </span>{' '}
              in your retirement corpus!
            </p>
          </div>
        </div>
      </div>

      {/* Power & Perils of Compounding */}
      <section className="bg-[#F6F1EE]/60 rounded-[2.5rem] p-8 sm:p-12 border border-[#EFE5DE]">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-[#A6998A]" />
          <h3 className="text-xl font-bold text-[#4A443F]">The Magic (and Horror) of Compounding</h3>
        </div>
        <p className="text-sm text-[#6D665E] mb-8 font-light leading-relaxed">
          Numbers do not lie. Here is what compounding does to your money (and expenses) over time:
        </p>
        
        <div className="space-y-4">
          {/* Inflation Reality Check */}
          <div className="bg-white/60 p-6 rounded-2xl border border-white shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">😱</span>
              <div>
                <h4 className="font-semibold text-[#4A443F] mb-1">Inflation Reality Check</h4>
                <p className="text-sm text-[#6D665E]">
                  Your <span className="font-bold text-[#4A443F]">{formatCurrency(inputs.retirementMonthlyExpenses)}</span> monthly expense today 
                  will become <span className="font-bold text-red-600">{formatCurrency(results.monthlyExpensesAtRetirement)}</span> when you retire. 
                  And you thought {inputs.inflationRate}% inflation is nothing!
                </p>
              </div>
            </div>
          </div>

          {/* Coffee Math */}
          <div className="bg-white/60 p-6 rounded-2xl border border-white shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">☕</span>
              <div>
                <h4 className="font-semibold text-[#4A443F] mb-1">The Daily Coffee Tax</h4>
                <p className="text-sm text-[#6D665E]">
                  That ₹200 daily coffee (or chai + samosa)? If invested instead at {inputs.currentROI}% for {results.yearsToRetirement} years, 
                  it would become <span className="font-bold text-[#4A443F]">
                    {formatCurrency(200 * 30 * 12 * ((Math.pow(1 + inputs.currentROI/100, results.yearsToRetirement) - 1) / (inputs.currentROI/100)) / 12)}
                  </span>. 
                  Your retirement is literally being sipped away!
                </p>
              </div>
            </div>
          </div>

          {/* Early Bird Advantage */}
          {results.yearsToRetirement > 5 && (
            <div className="bg-white/60 p-6 rounded-2xl border border-white shadow-sm">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🐦</span>
                <div>
                  <h4 className="font-semibold text-[#4A443F] mb-1">The Early Bird Advantage</h4>
                  <p className="text-sm text-[#6D665E]">
                    If you had started 5 years earlier, you would need only{' '}
                    <span className="font-bold text-[#4A443F]">
                      {formatCurrency(
                        results.additionalCorpusRequired / 
                        ((Math.pow(1 + inputs.currentROI/12/100, (results.yearsToRetirement + 5) * 12) - 1) / (inputs.currentROI/12/100))
                      )}
                    </span>/month instead of{' '}
                    <span className="font-bold text-[#4A443F]">{formatCurrency(results.monthlyContributionNeeded)}</span>/month. 
                    Time is literally money!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Delay Penalty */}
          <div className="bg-white/60 p-6 rounded-2xl border border-white shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⏰</span>
              <div>
                <h4 className="font-semibold text-[#4A443F] mb-1">The Procrastination Penalty</h4>
                <p className="text-sm text-[#6D665E]">
                  Waiting just 1 more year to start? You will need{' '}
                  <span className="font-bold text-red-600">
                    {formatCurrency(
                      results.additionalCorpusRequired / 
                      ((Math.pow(1 + inputs.currentROI/12/100, (results.yearsToRetirement - 1) * 12) - 1) / (inputs.currentROI/12/100))
                    )}
                  </span>/month - that is{' '}
                  <span className="font-bold text-red-600">
                    {formatCurrency(
                      (results.additionalCorpusRequired / 
                      ((Math.pow(1 + inputs.currentROI/12/100, (results.yearsToRetirement - 1) * 12) - 1) / (inputs.currentROI/12/100))) - 
                      results.monthlyContributionNeeded
                    )}
                  </span> extra every single month. Start today!
                </p>
              </div>
            </div>
          </div>

          {/* Small Savings Magic */}
          <div className="bg-white/60 p-6 rounded-2xl border border-white shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <h4 className="font-semibold text-[#4A443F] mb-1">Small Savings, Big Magic</h4>
                <p className="text-sm text-[#6D665E]">
                  Every <span className="font-bold text-[#4A443F]">₹1,000</span> you save today becomes{' '}
                  <span className="font-bold text-[#4A443F]">
                    {formatCurrency(1000 * Math.pow(1 + inputs.currentROI/100, results.yearsToRetirement))}
                  </span> at retirement. 
                  Every <span className="font-bold text-[#4A443F]">₹10,000</span> becomes{' '}
                  <span className="font-bold text-[#4A443F]">
                    {formatCurrency(10000 * Math.pow(1 + inputs.currentROI/100, results.yearsToRetirement))}
                  </span>. 
                  Small drops make an ocean!
                </p>
              </div>
            </div>
          </div>

          {/* The Real Cost of Lifestyle Inflation */}
          <div className="bg-white/60 p-6 rounded-2xl border border-white shadow-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📱</span>
              <div>
                <h4 className="font-semibold text-[#4A443F] mb-1">The Real Cost of That Upgrade</h4>
                <p className="text-sm text-[#6D665E]">
                  That extra ₹10,000/month lifestyle upgrade? It does not just cost ₹10,000. 
                  It adds <span className="font-bold text-red-600">
                    {formatCurrency(
                      calculateRetirementCorpus({
                        ...inputs,
                        retirementMonthlyExpenses: inputs.retirementMonthlyExpenses + 10000,
                      }).grossCorpusRequired - results.grossCorpusRequired
                    )}
                  </span> to your required retirement corpus. Think twice before upgrading!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
