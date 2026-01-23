'use client'

import { CalculatorResult, CalculatorInputs, calculateAggressiveScenario, calculateRetirementCorpus } from '@/lib/calculator'
import { TrendingUp, Target, AlertCircle } from 'lucide-react'

interface CalculatorResultsProps {
  results: CalculatorResult
  userName: string
  inputs: CalculatorInputs
}

export default function CalculatorResults({ results, userName, inputs }: CalculatorResultsProps) {
  const aggressiveResults = calculateAggressiveScenario(inputs)

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
          Here&apos;s Your Plan, {userName}!
        </h2>
        <p className="text-gray-600">
          Let&apos;s see what the numbers say...
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
          This is the total amount you&apos;ll need at age {inputs.retirementAge} to sustain your retirement lifestyle
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
          Your current savings of {formatCurrency(inputs.currentCorpus)} will grow to this amount at {inputs.expectedReturn}% return
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

      {/* Basic Math Example */}
      <div className="bg-gray-50 p-5 rounded-xl space-y-3">
        <h3 className="font-semibold text-gray-900 mb-3">Some Basic Math</h3>
        <div className="space-y-3 text-sm">
          <p className="text-gray-700">
            If you save <span className="font-semibold text-gray-900">₹{Math.round(results.monthlyContributionNeeded / 30)}</span> every day 
            and invest <span className="font-semibold text-gray-900">{formatCurrency(results.monthlyContributionNeeded)}</span> monthly right away 
            till retirement, you will end up with:
          </p>
          <div className="bg-white p-4 rounded-lg border-2 border-primary-200">
            <div className="text-2xl font-bold text-primary-700 text-center">
              {formatCurrency(results.corpusAtRetirement)}
            </div>
            <p className="text-xs text-gray-600 text-center mt-1">at your retirement age of {inputs.retirementAge} years</p>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-gray-50 p-5 rounded-xl space-y-3">
        <h3 className="font-semibold text-gray-900 mb-3">Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-gray-600">Years to Retirement:</span>
            <span className="ml-2 font-medium text-gray-900">
              {results.yearsToRetirement} years
            </span>
          </div>
          <div>
            <span className="text-gray-600">Monthly Expenses at Retirement:</span>
            <span className="ml-2 font-medium text-gray-900">
              {formatCurrency(inputs.retirementMonthlyExpenses)}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Annual Expenses After Retirement:</span>
            <span className="ml-2 font-medium text-gray-900">
              {formatCurrency(results.annualExpensesAtRetirement)}
            </span>
          </div>
          <div>
            <span className="text-gray-600">One-off Annual Expenses:</span>
            <span className="ml-2 font-medium text-gray-900">
              {formatCurrency(inputs.oneOffAnnualExpenses)}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Years in Retirement:</span>
            <span className="ml-2 font-medium text-gray-900">
              {inputs.lifeExpectancy - inputs.retirementAge} years
            </span>
          </div>
          <div>
            <span className="text-gray-600">Expected Return:</span>
            <span className="ml-2 font-medium text-gray-900">
              {inputs.expectedReturn}% (post-tax)
            </span>
          </div>
        </div>
      </div>

      {/* Aggressive Scenario */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200">
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-bold text-purple-900">Aggressive Retirement Scenario</h3>
        </div>
        <p className="text-sm text-purple-700 mb-4">
          This scenario assumes <span className="font-semibold">+1% higher returns</span> ({inputs.expectedReturn + 1}% instead of {inputs.expectedReturn}%) 
          and <span className="font-semibold">-1% lower inflation</span> ({Math.max(0.1, inputs.inflationRate - 1)}% instead of {inputs.inflationRate}%)
        </p>
        
        <div className="space-y-4">
          <div className="bg-white/50 p-4 rounded-lg">
            <div className="text-sm font-medium text-purple-900 mb-1">Gross Corpus Required (Aggressive)</div>
            <div className="text-2xl font-bold text-purple-900">
              {formatCurrency(aggressiveResults.grossCorpusRequired)}
            </div>
          </div>
          <div className="bg-white/50 p-4 rounded-lg">
            <div className="text-sm font-medium text-purple-900 mb-1">Current Savings at Retirement (Aggressive)</div>
            <div className="text-2xl font-bold text-purple-900">
              {formatCurrency(aggressiveResults.futureValueOfCurrentCorpus)}
            </div>
          </div>
          <div className="bg-white/50 p-4 rounded-lg">
            <div className="text-sm font-medium text-purple-900 mb-1">Additional Corpus Required (Aggressive)</div>
            <div className="text-2xl font-bold text-purple-900">
              {formatCurrency(aggressiveResults.additionalCorpusRequired)}
            </div>
          </div>
          <div className="bg-white/50 p-4 rounded-lg">
            <div className="text-sm font-medium text-purple-900 mb-1">Monthly Contribution Needed (Aggressive)</div>
            <div className="text-2xl font-bold text-purple-900">
              {formatCurrency(aggressiveResults.monthlyContributionNeeded)}
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
              That&apos;s a savings of{' '}
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
    </div>
  )
}
