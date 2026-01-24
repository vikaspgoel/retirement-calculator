'use client'

import { CalculatorResult, CalculatorInputs, calculateRealisticScenario, calculateRetirementCorpus } from '@/lib/calculator'
import { TrendingUp, Target, AlertCircle, Lightbulb, Zap } from 'lucide-react'
import { AVG_BLENDED_RETURN, AVG_INFLATION } from './CalculatorForm'

interface CalculatorResultsProps {
  results: CalculatorResult
  userName: string
  inputs: CalculatorInputs
}

export default function CalculatorResults({ results, userName, inputs }: CalculatorResultsProps) {
  const realisticResults = calculateRealisticScenario(inputs, AVG_INFLATION, AVG_BLENDED_RETURN)

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
    <div className="space-y-6 mt-8 pt-6 border-t-2 border-gray-200">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Here is Your Plan, {userName}!
        </h2>
        <p className="text-gray-600">
          Let us see how much you need based on the values you put.
        </p>
      </div>

      {/* Gross Corpus Required */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
        <div className="flex items-center gap-3 mb-3">
          <Target className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-blue-900">Gross Corpus Required at Retirement Age</h3>
        </div>
        <div className="text-4xl font-bold text-blue-900 mb-2">
          {formatCurrency(results.grossCorpusRequired)}
        </div>
        <p className="text-sm text-blue-700">
          This is the total amount you will need at age {inputs.retirementAge} to sustain your retirement lifestyle
        </p>
      </div>

      {/* Current Corpus Growth */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-bold text-green-900">Your Current Savings at Retirement</h3>
        </div>
        <div className="text-4xl font-bold text-green-900 mb-2">
          {formatCurrency(results.futureValueOfCurrentCorpus)}
        </div>
        <p className="text-sm text-green-700">
          Your current savings of {formatCurrency(inputs.currentCorpus)} will grow to this amount at {inputs.currentROI}% annual return
        </p>
      </div>

      {/* Additional Corpus Required */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-2 border-orange-200">
        <div className="flex items-center gap-3 mb-3">
          <AlertCircle className="w-6 h-6 text-orange-600" />
          <h3 className="text-xl font-bold text-orange-900">Additional Corpus Required</h3>
        </div>
        <div className="text-4xl font-bold text-orange-900 mb-2">
          {formatCurrency(results.additionalCorpusRequired)}
        </div>
        <p className="text-sm text-orange-700">
          This is the additional amount you need to save beyond your current savings growth
        </p>
      </div>

      {/* Monthly Contribution */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-2 border-orange-200">
        <div className="flex items-center gap-3 mb-3">
          <AlertCircle className="w-6 h-6 text-orange-600" />
          <h3 className="text-xl font-bold text-orange-900">Monthly Contribution Needed</h3>
        </div>
        <div className="text-4xl font-bold text-orange-900 mb-2">
          {formatCurrency(results.monthlyContributionNeeded)}
        </div>
        <p className="text-sm text-orange-700">
          Start saving this amount monthly from now till retirement to reach your goal
        </p>
      </div>

      {/* Thumb Rule */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-lg">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-yellow-900 mb-2">Quick Thumb Rule</h3>
            <p className="text-sm text-yellow-800">
              As a general rule, you should have around <span className="font-bold">25 times your annual expenses</span> saved up for retirement. 
              For you, that is roughly <span className="font-bold text-yellow-900">{formatCurrency(results.annualExpensesAtRetirement * 25)}</span>.
              Not too far from our calculation, eh?
            </p>
          </div>
        </div>
      </div>

      {/* Realistic Scenario */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200">
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-bold text-purple-900">Here is What We Think You Will Actually Need</h3>
        </div>
        <p className="text-sm text-purple-700 mb-4">
          Based on some realistic assumptions - last 3 years average inflation (<span className="font-semibold">{AVG_INFLATION.toFixed(1)}%</span>) 
          and a weighted portfolio return (60% Large Cap Equity, 30% Debt, 10% FD = <span className="font-semibold">{AVG_BLENDED_RETURN.toFixed(1)}%</span>)
        </p>
        
        <div className="space-y-4">
          <div className="bg-white/50 p-4 rounded-lg">
            <div className="text-sm font-medium text-purple-900 mb-1">Realistic Corpus Required</div>
            <div className="text-2xl font-bold text-purple-900">
              {formatCurrency(realisticResults.grossCorpusRequired)}
            </div>
          </div>
          <div className="bg-white/50 p-4 rounded-lg">
            <div className="text-sm font-medium text-purple-900 mb-1">Your Savings at Retirement (Realistic)</div>
            <div className="text-2xl font-bold text-purple-900">
              {formatCurrency(realisticResults.futureValueOfCurrentCorpus)}
            </div>
          </div>
          <div className="bg-white/50 p-4 rounded-lg">
            <div className="text-sm font-medium text-purple-900 mb-1">Additional Corpus Needed (Realistic)</div>
            <div className="text-2xl font-bold text-purple-900">
              {formatCurrency(realisticResults.additionalCorpusRequired)}
            </div>
          </div>
          <div className="bg-white/50 p-4 rounded-lg">
            <div className="text-sm font-medium text-purple-900 mb-1">Monthly Contribution Needed (Realistic)</div>
            <div className="text-2xl font-bold text-purple-900">
              {formatCurrency(realisticResults.monthlyContributionNeeded)}
            </div>
          </div>
        </div>
      </div>

      {/* Expense Reduction Tip */}
      <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-lg">
        <div className="flex items-start">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-green-900 mb-2">Money Saving Tip</h3>
            <p className="text-sm text-green-800">
              If you reduce your monthly expenses at retirement by 10%, you will need only{' '}
              <span className="font-bold text-green-900">
                {formatCurrency(
                  calculateRetirementCorpus({
                    ...inputs,
                    retirementMonthlyExpenses: inputs.retirementMonthlyExpenses * 0.9,
                  }).grossCorpusRequired
                )}
              </span>{' '}
              as corpus instead of{' '}
              <span className="font-bold text-green-900">{formatCurrency(results.grossCorpusRequired)}</span>.
            </p>
            <p className="text-xs text-green-700 mt-2">
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
      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl border-2 border-indigo-200">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-indigo-600" />
          <h3 className="text-xl font-bold text-indigo-900">The Magic (and Horror) of Compounding</h3>
        </div>
        <p className="text-sm text-indigo-700 mb-5">
          Numbers do not lie. Here is what compounding does to your money (and expenses) over time:
        </p>
        
        <div className="space-y-4">
          {/* Inflation Reality Check */}
          <div className="bg-white/60 p-4 rounded-lg border border-indigo-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">😱</span>
              <div>
                <h4 className="font-semibold text-indigo-900 mb-1">Inflation Reality Check</h4>
                <p className="text-sm text-indigo-800">
                  Your <span className="font-bold">{formatCurrency(inputs.retirementMonthlyExpenses)}</span> monthly expense today 
                  will become <span className="font-bold text-red-600">{formatCurrency(results.monthlyExpensesAtRetirement)}</span> when you retire. 
                  And you thought {inputs.inflationRate}% inflation is nothing!
                </p>
              </div>
            </div>
          </div>

          {/* Coffee Math */}
          <div className="bg-white/60 p-4 rounded-lg border border-indigo-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">☕</span>
              <div>
                <h4 className="font-semibold text-indigo-900 mb-1">The Daily Coffee Tax</h4>
                <p className="text-sm text-indigo-800">
                  That ₹200 daily coffee (or chai + samosa)? If invested instead at {inputs.currentROI}% for {results.yearsToRetirement} years, 
                  it would become <span className="font-bold text-green-600">
                    {formatCurrency(200 * 30 * 12 * ((Math.pow(1 + inputs.currentROI/100, results.yearsToRetirement) - 1) / (inputs.currentROI/100)) / 12)}
                  </span>. 
                  Your retirement is literally being sipped away!
                </p>
              </div>
            </div>
          </div>

          {/* Early Bird Advantage */}
          {results.yearsToRetirement > 5 && (
            <div className="bg-white/60 p-4 rounded-lg border border-indigo-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🐦</span>
                <div>
                  <h4 className="font-semibold text-indigo-900 mb-1">The Early Bird Advantage</h4>
                  <p className="text-sm text-indigo-800">
                    If you had started 5 years earlier, you would need only{' '}
                    <span className="font-bold text-green-600">
                      {formatCurrency(
                        results.additionalCorpusRequired / 
                        ((Math.pow(1 + inputs.currentROI/12/100, (results.yearsToRetirement + 5) * 12) - 1) / (inputs.currentROI/12/100))
                      )}
                    </span>/month instead of{' '}
                    <span className="font-bold">{formatCurrency(results.monthlyContributionNeeded)}</span>/month. 
                    Time is literally money!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Delay Penalty */}
          <div className="bg-white/60 p-4 rounded-lg border border-indigo-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⏰</span>
              <div>
                <h4 className="font-semibold text-indigo-900 mb-1">The Procrastination Penalty</h4>
                <p className="text-sm text-indigo-800">
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
          <div className="bg-white/60 p-4 rounded-lg border border-indigo-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✨</span>
              <div>
                <h4 className="font-semibold text-indigo-900 mb-1">Small Savings, Big Magic</h4>
                <p className="text-sm text-indigo-800">
                  Every <span className="font-bold">₹1,000</span> you save today becomes{' '}
                  <span className="font-bold text-green-600">
                    {formatCurrency(1000 * Math.pow(1 + inputs.currentROI/100, results.yearsToRetirement))}
                  </span> at retirement. 
                  Every <span className="font-bold">₹10,000</span> becomes{' '}
                  <span className="font-bold text-green-600">
                    {formatCurrency(10000 * Math.pow(1 + inputs.currentROI/100, results.yearsToRetirement))}
                  </span>. 
                  Small drops make an ocean!
                </p>
              </div>
            </div>
          </div>

          {/* The Real Cost of Lifestyle Inflation */}
          <div className="bg-white/60 p-4 rounded-lg border border-indigo-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📱</span>
              <div>
                <h4 className="font-semibold text-indigo-900 mb-1">The Real Cost of That Upgrade</h4>
                <p className="text-sm text-indigo-800">
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
      </div>
    </div>
  )
}
