'use client'

import { CalculatorInputs } from '@/lib/calculator'
import { TrendingUp, DollarSign, Calendar, Percent, Info } from 'lucide-react'

interface CalculatorFormProps {
  inputs: CalculatorInputs
  onChange: (field: keyof CalculatorInputs, value: number) => void
  userName: string
  showHelp: boolean
  onToggleHelp: () => void
}

// 5-Year Post-Tax Returns Data

// Large Cap Equity MF (post 12.5% LTCG tax on gains above 1.25L)
const LARGE_CAP_EQUITY = [
  { year: '2023', postTax: 14.2 },
  { year: '2022', postTax: 3.8 },
  { year: '2021', postTax: 21.5 },
  { year: '2020', postTax: 13.8 },
  { year: '2019', postTax: 10.5 },
]

// Long Term Debt MF (post 12.5% LTCG tax)
const LONG_TERM_DEBT = [
  { year: '2023', postTax: 6.8 },
  { year: '2022', postTax: 4.2 },
  { year: '2021', postTax: 5.5 },
  { year: '2020', postTax: 8.2 },
  { year: '2019', postTax: 7.8 },
]

// SBI 1 Year FD Rates (last 5 years) - Post tax (30% tax assumed)
const FD_RATES = [
  { year: '2023', postTax: 4.76 }, // 6.8% * 0.7
  { year: '2022', postTax: 3.85 }, // 5.5% * 0.7
  { year: '2021', postTax: 3.50 }, // 5.0% * 0.7
  { year: '2020', postTax: 3.78 }, // 5.4% * 0.7
  { year: '2019', postTax: 4.76 }, // 6.8% * 0.7
]

// Last 3 years inflation data
const INFLATION_DATA = [
  { year: '2023', rate: 5.4 },
  { year: '2022', rate: 6.7 },
  { year: '2021', rate: 5.1 },
]

// Calculate averages
const AVG_LARGE_CAP = LARGE_CAP_EQUITY.reduce((sum, item) => sum + item.postTax, 0) / LARGE_CAP_EQUITY.length
const AVG_LONG_TERM_DEBT = LONG_TERM_DEBT.reduce((sum, item) => sum + item.postTax, 0) / LONG_TERM_DEBT.length
const AVG_FD = FD_RATES.reduce((sum, item) => sum + item.postTax, 0) / FD_RATES.length
// Weighted allocation for pre-retirement: 60% Large Cap Equity, 30% Debt, 10% FD
export const AVG_BLENDED_RETURN = (AVG_LARGE_CAP * 0.60) + (AVG_LONG_TERM_DEBT * 0.30) + (AVG_FD * 0.10)
// Conservative allocation for during retirement: 33% each (more balanced)
export const AVG_CONSERVATIVE_RETURN = (AVG_LARGE_CAP + AVG_LONG_TERM_DEBT + AVG_FD) / 3
export const AVG_INFLATION = INFLATION_DATA.reduce((sum, item) => sum + item.rate, 0) / INFLATION_DATA.length

// Format number with Indian comma separators (lakhs, crores)
const formatIndianNumber = (num: number): string => {
  if (num === 0) return '0'
  const numStr = Math.floor(num).toString()
  let result = ''
  const len = numStr.length
  
  // Add last 3 digits
  if (len <= 3) {
    return numStr
  }
  
  result = numStr.slice(-3)
  let remaining = numStr.slice(0, -3)
  
  // Add pairs of 2 digits (for lakhs, crores, etc.)
  while (remaining.length > 0) {
    const chunk = remaining.slice(-2)
    result = chunk + ',' + result
    remaining = remaining.slice(0, -2)
  }
  
  // Remove leading comma if any
  return result.replace(/^,/, '')
}

// Format number in Indian words (thousands, lakhs, crores)
const formatIndianWords = (num: number): string => {
  if (num === 0) return '₹0'
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)} Crore`
  } else if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)} Lakh`
  } else if (num >= 1000) {
    return `₹${(num / 1000).toFixed(1)} Thousand`
  }
  return `₹${num}`
}

export default function CalculatorForm({ inputs, onChange, userName, showHelp, onToggleHelp }: CalculatorFormProps) {
  // Reordered: expenses and life expectancy first, then inflation and return
  const inputFields = [
    {
      id: 'currentAge' as keyof CalculatorInputs,
      label: 'Your Current Age',
      value: inputs.currentAge,
      min: 18,
      max: 70,
      step: 1,
      icon: Calendar,
      suffix: 'years',
      narration: "Remember, you are always young at heart, yet, no harm in planning your retirement",
      helpText: "How old are you right now? No lying - this is between you and your calculator. The earlier you start planning, the chiller your future self will be.",
    },
    {
      id: 'retirementAge' as keyof CalculatorInputs,
      label: 'At what age you want to retire?',
      value: inputs.retirementAge,
      min: 50,
      max: 75,
      step: 1,
      icon: Calendar,
      suffix: 'years',
      narration: "Dream retirement age? Let us make it happen!",
      helpText: "When do you want to quit the 9-to-5 grind? Pick the age when you want to stop working for money and start living for yourself.",
      getDynamicNarration: (value: number) => {
        const standardRetirementAge = 58
        const yearsEarly = standardRetirementAge - value
        if (yearsEarly > 0) {
          return `Wow, you will get ${yearsEarly} year${yearsEarly > 1 ? 's' : ''} of fun time away from your boss!`
        } else if (yearsEarly < 0) {
          return `Standard retirement age in India is 58, but you are planning for ${Math.abs(yearsEarly)} year${Math.abs(yearsEarly) > 1 ? 's' : ''} later`
        } else {
          return "Standard retirement age in India is 58 - right on track!"
        }
      },
    },
    {
      id: 'currentCorpus' as keyof CalculatorInputs,
      label: 'Current Savings for Retirement',
      value: inputs.currentCorpus,
      min: 0,
      max: 10000000000,
      step: 10000,
      icon: DollarSign,
      prefix: '₹',
      isRupee: true,
      narration: "Total of your savings, FDs, mutual funds, stocks - anything you can convert to cash",
      helpText: "How much money have you saved so far? Add up your savings, FDs, mutual funds, stocks - anything you can convert to cash. Do not include your house or car.",
    },
    {
      id: 'currentROI' as keyof CalculatorInputs,
      label: 'Annual Return till Retirement (Post Tax)',
      value: inputs.currentROI,
      min: 5,
      max: 20,
      step: 0.5,
      icon: TrendingUp,
      suffix: '%',
      narration: "How much your money grows each year - we have pre-filled a realistic number",
      helpText: "This is how much your money grows each year (after tax). Think of it like interest, but better. We have pre-filled a realistic number based on a mix of investments.",
      showInfo: false,
      isPrefilled: true,
    },
    {
      id: 'retirementMonthlyExpenses' as keyof CalculatorInputs,
      label: "Monthly Expenses (in Today's Value)",
      value: inputs.retirementMonthlyExpenses,
      min: 10000,
      max: 1000000,
      step: 5000,
      icon: DollarSign,
      prefix: '₹',
      isRupee: true,
      narration: "Your target monthly spend in retirement - we will adjust for future prices",
      helpText: "How much do you spend per month right now? Rent, food, Netflix, chai - everything. Want a fancier retirement? Add more. We will adjust for future prices automatically.",
    },
    {
      id: 'oneOffAnnualExpenses' as keyof CalculatorInputs,
      label: "Yearly Big Expenses (in Today's Value)",
      value: inputs.oneOffAnnualExpenses,
      min: 0,
      max: 5000000,
      step: 10000,
      icon: DollarSign,
      prefix: '₹',
      isRupee: true,
      narration: "Vacations, medical stuff, gifts - those yearly expenses that pop up",
      helpText: "Big yearly spends that do not happen every month - like that Goa trip, new phone, family weddings, or random medical bills. Guess a yearly total.",
    },
    {
      id: 'lifeExpectancy' as keyof CalculatorInputs,
      label: 'Life Expectancy',
      value: inputs.lifeExpectancy,
      min: 70,
      max: 100,
      step: 1,
      icon: Calendar,
      suffix: 'years',
      narration: "Plan for at least 85 - better to have extra than run out. Keep doing yoga!",
      helpText: "How long do you think you will live? Nobody knows, but plan for at least 85. Better to have extra money than run out at 80. Eat your veggies.",
      isPrefilled: true,
    },
    {
      id: 'inflationRate' as keyof CalculatorInputs,
      label: 'Inflation Rate',
      value: inputs.inflationRate,
      min: 3,
      max: 10,
      step: 0.1,
      icon: Percent,
      suffix: '%',
      narration: "Prices go up every year - we have pre-filled based on recent data",
      helpText: "Inflation means things get pricier every year. That 100 rupee meal today might cost 200 in 10 years. We have pre-filled based on recent data.",
      showInfo: true,
      isPrefilled: true,
    },
    {
      id: 'expectedReturn' as keyof CalculatorInputs,
      label: 'Annual Return During Retirement (Post Tax)',
      value: inputs.expectedReturn,
      min: 5,
      max: 20,
      step: 0.5,
      icon: TrendingUp,
      suffix: '%',
      narration: "After retirement, your money grows slower (safer investments)",
      helpText: "After you retire, your money still grows - just slower because you invest more safely (less stocks, more FDs). We have pre-filled a conservative number.",
      showInfo: true,
      isPrefilled: true,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Help Toggle */}
      <div className="flex items-center justify-end gap-3 pb-2 border-b border-gray-100">
        <span className="text-sm text-gray-500">I am not good with numbers, translate please</span>
        <button
          type="button"
          onClick={onToggleHelp}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            showHelp ? 'bg-primary-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${
              showHelp ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {inputFields.map((field) => {
          const Icon = field.icon
          return (
            <div key={field.id} className="space-y-2">
              <label
                htmlFor={field.id}
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <Icon className="w-4 h-4 text-primary-600" />
                {field.label}
              </label>
              
              <div className="relative">
                {field.prefix && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {field.prefix}
                  </span>
                )}
                <input
                  id={field.id}
                  type="number"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={field.value === 0 ? '' : field.value}
                  onChange={(e) => {
                    const value = e.target.value
                    if (value === '' || value === null || value === undefined) {
                      onChange(field.id, 0)
                    } else {
                      const numValue = parseFloat(value)
                      onChange(field.id, isNaN(numValue) ? 0 : numValue)
                    }
                  }}
                  className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-400 focus:shadow-md outline-none transition-all ${
                    (field as any).isPrefilled 
                      ? 'text-gray-500 bg-gray-50/50 border-gray-200' 
                      : 'text-gray-900 bg-white border-gray-200 hover:border-gray-300'
                  } ${field.prefix ? 'pl-8' : ''} ${field.suffix ? 'pr-16' : ''}`}
                />
                {field.suffix && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    {field.suffix}
                  </span>
                )}
                {(field as any).isRupee && field.value > 0 && (
                  <div className="mt-1 text-xs text-gray-500">
                    ₹{formatIndianNumber(field.value)} = {formatIndianWords(field.value)}
                  </div>
                )}
              </div>
              
              {/* Help text - shown when toggle is ON */}
              {showHelp && (field as any).helpText && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-xs text-amber-800">
                    {(field as any).helpText}
                  </p>
                </div>
              )}
              
              {/* Dynamic narration - always shown */}
              <p className="text-xs text-gray-400 italic">
                {field.getDynamicNarration ? field.getDynamicNarration(field.value) : field.narration}
              </p>

              {field.showInfo && field.id === 'expectedReturn' && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-2 mb-3">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                    <span className="text-xs font-medium text-blue-900">5-Year Average Post-Tax Returns:</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center bg-white/50 p-2 rounded">
                      <span className="text-blue-800">Large Cap Equity MF</span>
                      <span className="font-bold text-blue-900">{AVG_LARGE_CAP.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/50 p-2 rounded">
                      <span className="text-blue-800">Long Term Debt MF</span>
                      <span className="font-bold text-blue-900">{AVG_LONG_TERM_DEBT.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/50 p-2 rounded">
                      <span className="text-blue-800">FD (30% tax bracket)</span>
                      <span className="font-bold text-blue-900">{AVG_FD.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              )}

              {field.showInfo && field.id === 'inflationRate' && (
                <div className="mt-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-start gap-2 mb-2">
                    <Info className="w-4 h-4 text-orange-600 mt-0.5" />
                    <span className="text-xs font-medium text-orange-900">Last 3 Years Inflation:</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {INFLATION_DATA.map((inf) => (
                      <div key={inf.year} className="text-center">
                        <div className="text-orange-700 font-semibold">{inf.rate}%</div>
                        <div className="text-orange-600">{inf.year}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-orange-700 mt-2">
                    Average: {(INFLATION_DATA.reduce((sum, inf) => sum + inf.rate, 0) / INFLATION_DATA.length).toFixed(1)}%
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
