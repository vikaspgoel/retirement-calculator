'use client'

import { CalculatorInputs } from '@/lib/calculator'
import { TrendingUp, DollarSign, Calendar, Percent, Info } from 'lucide-react'

interface CalculatorFormProps {
  inputs: CalculatorInputs
  onChange: (field: keyof CalculatorInputs, value: number) => void
  userName: string
}

// Last 5 years leading Mutual Fund returns (after taxes, approximate)
const MF_RETURNS = [
  { year: '2023', return: 18.5 },
  { year: '2022', return: 4.2 },
  { year: '2021', return: 24.5 },
  { year: '2020', return: 16.2 },
  { year: '2019', return: 12.8 },
]

// SBI 1 Year FD Rates (last 5 years) - Post tax (30% tax assumed)
const FD_RATES = [
  { year: '2023', rate: 6.8, postTax: 4.76 }, // 6.8% * 0.7 = 4.76%
  { year: '2022', rate: 5.5, postTax: 3.85 }, // 5.5% * 0.7 = 3.85%
  { year: '2021', rate: 5.0, postTax: 3.50 }, // 5.0% * 0.7 = 3.50%
  { year: '2020', rate: 5.4, postTax: 3.78 }, // 5.4% * 0.7 = 3.78%
  { year: '2019', rate: 6.8, postTax: 4.76 }, // 6.8% * 0.7 = 4.76%
]

// Last 3 years inflation data
const INFLATION_DATA = [
  { year: '2023', rate: 5.4 },
  { year: '2022', rate: 6.7 },
  { year: '2021', rate: 5.1 },
]

export default function CalculatorForm({ inputs, onChange, userName }: CalculatorFormProps) {
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
      narration: "Remember, you are always young at heart",
    },
    {
      id: 'retirementAge' as keyof CalculatorInputs,
      label: 'When do you want to retire?',
      value: inputs.retirementAge,
      min: 50,
      max: 75,
      step: 1,
      icon: Calendar,
      suffix: 'years',
      narration: "Dream retirement age? Let&apos;s make it happen!",
      getDynamicNarration: (value: number) => {
        const standardRetirementAge = 58
        const yearsEarly = standardRetirementAge - value
        if (yearsEarly > 0) {
          return `Wow, you will get ${yearsEarly} year${yearsEarly > 1 ? 's' : ''} of fun time away from your boss!`
        } else if (yearsEarly < 0) {
          return `Standard retirement age in India is 58, but you&apos;re planning for ${Math.abs(yearsEarly)} year${Math.abs(yearsEarly) > 1 ? 's' : ''} later`
        } else {
          return "Standard retirement age in India is 58 - right on track!"
        }
      },
    },
    {
      id: 'currentCorpus' as keyof CalculatorInputs,
      label: 'Current Savings/Corpus',
      value: inputs.currentCorpus,
      min: 0,
      max: 100000000,
      step: 10000,
      icon: DollarSign,
      prefix: '₹',
      format: (val: number) => (val / 100000).toFixed(1) + 'L',
      narration: "Mention sum total of your liquid invested savings/funds",
    },
    {
      id: 'retirementMonthlyExpenses' as keyof CalculatorInputs,
      label: 'Estimated Monthly Expenses After Retirement',
      value: inputs.retirementMonthlyExpenses,
      min: 10000,
      max: 1000000,
      step: 5000,
      icon: DollarSign,
      prefix: '₹',
      format: (val: number) => (val / 1000).toFixed(0) + 'K',
      narration: "Enter your expected monthly expenses at retirement year (we&apos;ll account for inflation after that)",
    },
    {
      id: 'oneOffAnnualExpenses' as keyof CalculatorInputs,
      label: 'Estimated One-off Annual Expenses',
      value: inputs.oneOffAnnualExpenses,
      min: 0,
      max: 5000000,
      step: 10000,
      icon: DollarSign,
      prefix: '₹',
      format: (val: number) => (val / 100000).toFixed(1) + 'L',
      narration: "Vacations, medical emergencies, gifts - those unexpected expenses",
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
      narration: "Average Indian male life expectancy is around 70 years, but let&apos;s plan for longer just in case",
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
      narration: "Inflation - the silent wealth killer. Check recent data below",
      showInfo: true,
    },
    {
      id: 'expectedReturn' as keyof CalculatorInputs,
      label: 'Expected Annual Return Post Tax',
      value: inputs.expectedReturn,
      min: 5,
      max: 20,
      step: 0.5,
      icon: TrendingUp,
      suffix: '%',
      narration: "What return are you expecting? Check the MF and FD data below for reference",
      showInfo: true,
    },
  ]

  return (
    <div className="space-y-6">
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
                  className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-gray-900 bg-white ${
                    field.prefix ? 'pl-8' : ''
                  } ${field.suffix ? 'pr-16' : ''}`}
                />
                {field.suffix && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    {field.suffix}
                  </span>
                )}
                {field.format && (
                  <div className="mt-1 text-xs text-gray-500">
                    ≈ {field.format(field.value)}
                  </div>
                )}
              </div>
              
              <p className="text-xs text-gray-400 italic">
                {field.getDynamicNarration ? field.getDynamicNarration(field.value) : field.narration}
              </p>

              {field.showInfo && field.id === 'expectedReturn' && (
                <div className="mt-2 space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-2 mb-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                      <span className="text-xs font-medium text-blue-900">Last 5 Years MF Returns (After Tax):</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1 text-xs">
                      {MF_RETURNS.map((mf) => (
                        <div key={mf.year} className="text-center">
                          <div className="text-blue-700 font-semibold">{mf.return}%</div>
                          <div className="text-blue-600">{mf.year}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-blue-700 mt-2">
                      Average: {(MF_RETURNS.reduce((sum, mf) => sum + mf.return, 0) / MF_RETURNS.length).toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-start gap-2 mb-2">
                      <Info className="w-4 h-4 text-green-600 mt-0.5" />
                      <span className="text-xs font-medium text-green-900">SBI 1 Year FD Rates (Post Tax - 30%):</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1 text-xs">
                      {FD_RATES.map((fd) => (
                        <div key={fd.year} className="text-center">
                          <div className="text-green-700 font-semibold">{fd.postTax}%</div>
                          <div className="text-green-600">{fd.year}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-green-700 mt-2">
                      Average: {(FD_RATES.reduce((sum, fd) => sum + fd.postTax, 0) / FD_RATES.length).toFixed(1)}%
                    </p>
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
