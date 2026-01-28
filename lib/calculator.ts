// Retirement Corpus Calculator with Indian Tax Considerations

export interface CalculatorInputs {
  currentAge: number
  retirementAge: number
  currentCorpus: number
  currentROI: number // ROI applied on existing corpus till retirement
  expectedReturn: number // Annual return percentage for future contributions
  inflationRate: number // Annual inflation percentage
  lifeExpectancy: number
  retirementMonthlyExpenses: number // Monthly expenses - target lifestyle but today's value
  oneOffAnnualExpenses: number // One-time annual expenses - target lifestyle but today's value
}

export interface CalculatorResult {
  yearsToRetirement: number
  corpusAtRetirement: number
  monthlyExpensesAtRetirement: number
  annualExpensesAtRetirement: number
  grossCorpusRequired: number // Total corpus needed
  futureValueOfCurrentCorpus: number // Current corpus grown till retirement
  additionalCorpusRequired: number // Additional corpus needed beyond current savings
  shortfallOrSurplus: number
  monthlyContributionNeeded: number
  projections: Array<{
    age: number
    year: number
    corpus: number
    contribution: number
    returns: number
  }>
  retirementProjections: Array<{
    age: number
    year: number
    corpus: number
    withdrawal: number
    returns: number
  }>
}

// Indian Tax Slabs (FY 2023-24)
const TAX_SLABS = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 5 },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: Infinity, rate: 30 },
]

// Calculate tax on income (simplified - assumes standard deduction and no other deductions)
function calculateTax(annualIncome: number): number {
  let tax = 0
  let remainingIncome = annualIncome

  // Standard deduction of ₹50,000
  remainingIncome = Math.max(0, remainingIncome - 50000)

  for (const slab of TAX_SLABS) {
    if (remainingIncome <= 0) break

    const taxableInThisSlab = Math.min(
      remainingIncome,
      slab.max === Infinity ? remainingIncome : slab.max - slab.min
    )

    tax += (taxableInThisSlab * slab.rate) / 100
    remainingIncome -= taxableInThisSlab
  }

  // Health and Education Cess (4%)
  tax = tax * 1.04

  return tax
}

// Calculate post-tax returns
function getPostTaxReturn(preTaxReturn: number, isTaxSaving: boolean = false): number {
  // For tax-saving investments (ELSS, PPF, etc.), returns are tax-free
  if (isTaxSaving) {
    return preTaxReturn
  }

  // For other investments, assume long-term capital gains tax of 10% (for equity) or 20% (for debt)
  // Simplified: using 15% average
  const taxOnGains = 0.15
  return preTaxReturn * (1 - taxOnGains)
}

// Calculate future value with monthly contributions
function calculateFutureValue(
  principal: number,
  monthlyContribution: number,
  annualReturn: number,
  years: number
): number {
  const monthlyReturn = annualReturn / 12 / 100
  const months = years * 12

  // Future value of principal
  const fvPrincipal = principal * Math.pow(1 + monthlyReturn, months)

  // Future value of annuity (monthly contributions)
  const fvAnnuity =
    monthlyContribution *
    ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn)

  return fvPrincipal + fvAnnuity
}

// Calculate present value needed for future expenses
function calculatePresentValue(
  futureValue: number,
  annualReturn: number,
  years: number
): number {
  const annualReturnRate = annualReturn / 100
  return futureValue / Math.pow(1 + annualReturnRate, years)
}

export function calculateRetirementCorpus(inputs: CalculatorInputs): CalculatorResult {
  const yearsToRetirement = inputs.retirementAge - inputs.currentAge
  const yearsInRetirement = inputs.lifeExpectancy - inputs.retirementAge

  // currentROI: Used for existing corpus AND SIPs till retirement
  // expectedReturn: Used for corpus returns DURING retirement (withdrawal phase)
  const returnTillRetirement = inputs.currentROI
  const returnDuringRetirement = inputs.expectedReturn

  // User enters expenses in today's value, so we need to inflate them to retirement year
  const monthlyExpensesAtRetirement = inputs.retirementMonthlyExpenses * Math.pow(1 + inputs.inflationRate / 100, yearsToRetirement)
  const oneOffExpensesAtRetirement = inputs.oneOffAnnualExpenses * Math.pow(1 + inputs.inflationRate / 100, yearsToRetirement)
  const annualExpensesAtRetirement = (monthlyExpensesAtRetirement * 12) + oneOffExpensesAtRetirement

  // Calculate real return using proper formula: (1+r)/(1+i) - 1
  // Use expectedReturn for retirement phase (return during withdrawal years)
  const realReturn = ((1 + returnDuringRetirement / 100) / (1 + inputs.inflationRate / 100)) - 1

  // Calculate corpus required using present value of growing annuity (Annuity Due)
  // Annuity Due = payments at beginning of period (more realistic for retirement withdrawals)
  let corpusRequiredPV = 0
  
  if (realReturn > 0.001) {
    // Ordinary Annuity Factor = (1 - (1+realReturn)^-n) / realReturn
    // Annuity Due Factor = Ordinary × (1 + realReturn)
    const ordinaryAnnuityFactor = (1 - Math.pow(1 + realReturn, -yearsInRetirement)) / realReturn
    const annuityDueFactor = ordinaryAnnuityFactor * (1 + realReturn)
    corpusRequiredPV = annualExpensesAtRetirement * annuityDueFactor
  } else {
    // If real return is very small or negative, use simple multiplication
    corpusRequiredPV = annualExpensesAtRetirement * yearsInRetirement
  }

  // Calculate future value of current corpus using currentROI
  const futureValueOfCurrentCorpus =
    inputs.currentCorpus * Math.pow(1 + returnTillRetirement / 100, yearsToRetirement)
  
  // Additional corpus needed beyond current savings
  const additionalCorpusRequired = Math.max(0, corpusRequiredPV - futureValueOfCurrentCorpus)

  // Calculate required monthly contribution based on additional corpus needed
  // SIPs also grow at currentROI (returnTillRetirement)
  let monthlyContributionNeeded = 0
  if (additionalCorpusRequired > 0) {
    const monthlyReturn = returnTillRetirement / 12 / 100
    const months = yearsToRetirement * 12
    monthlyContributionNeeded =
      additionalCorpusRequired /
      ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn)
  }

  // Calculate total corpus at retirement
  // Both existing corpus and SIPs grow at currentROI (returnTillRetirement)
  const futureValueOfContributions = monthlyContributionNeeded > 0 
    ? calculateFutureValue(0, monthlyContributionNeeded, returnTillRetirement, yearsToRetirement)
    : 0
  const corpusAtRetirement = futureValueOfCurrentCorpus + futureValueOfContributions

  const shortfallOrSurplus = corpusAtRetirement - corpusRequiredPV

  // Generate projections for accumulation phase
  const projections: CalculatorResult['projections'] = []
  let corpusValue = inputs.currentCorpus
  const monthlyReturn = returnTillRetirement / 12 / 100
  let previousCorpus = inputs.currentCorpus
  const monthlyContributionForProjection = monthlyContributionNeeded > 0 ? monthlyContributionNeeded : 0

  for (let year = 0; year <= yearsToRetirement; year++) {
    const age = inputs.currentAge + year
    let yearlyReturns = 0
    const yearlyContributions = monthlyContributionForProjection * 12
    
    if (year > 0) {
      yearlyReturns = previousCorpus * (Math.pow(1 + monthlyReturn, 12) - 1)
      corpusValue = previousCorpus + yearlyReturns + yearlyContributions
      previousCorpus = corpusValue
    }

    projections.push({
      age,
      year,
      corpus: corpusValue,
      contribution: yearlyContributions,
      returns: yearlyReturns,
    })
  }

  // Generate projections for retirement phase
  const retirementProjections: CalculatorResult['retirementProjections'] = []
  let retirementCorpus = corpusAtRetirement
  const retirementMonthlyReturn = returnDuringRetirement / 12 / 100

  for (let year = 0; year <= yearsInRetirement; year++) {
    const age = inputs.retirementAge + year
    let yearlyReturns = 0
    let yearlyWithdrawal = 0
    
    if (year > 0) {
      yearlyReturns = retirementCorpus * (Math.pow(1 + retirementMonthlyReturn, 12) - 1)
      // Expenses grow with inflation each year
      const monthlyExpenseThisYear = monthlyExpensesAtRetirement * Math.pow(1 + inputs.inflationRate / 100, year - 1)
      const oneOffExpenseThisYear = oneOffExpensesAtRetirement * Math.pow(1 + inputs.inflationRate / 100, year - 1)
      yearlyWithdrawal = (monthlyExpenseThisYear * 12) + oneOffExpenseThisYear
      retirementCorpus = retirementCorpus + yearlyReturns - yearlyWithdrawal
      retirementCorpus = Math.max(0, retirementCorpus)
    }

    retirementProjections.push({
      age,
      year,
      corpus: retirementCorpus,
      withdrawal: yearlyWithdrawal,
      returns: yearlyReturns,
    })
  }

  return {
    yearsToRetirement,
    corpusAtRetirement,
    monthlyExpensesAtRetirement,
    annualExpensesAtRetirement,
    grossCorpusRequired: corpusRequiredPV,
    futureValueOfCurrentCorpus,
    additionalCorpusRequired,
    shortfallOrSurplus,
    monthlyContributionNeeded,
    projections,
    retirementProjections,
  }
}

// Calculate realistic scenario based on historical averages
// Uses: 3-year avg inflation (5.7%), weighted return (60% Large Cap, 30% Debt, 10% FD)
export function calculateRealisticScenario(
  inputs: CalculatorInputs,
  avgInflation: number,
  avgBlendedReturn: number,
  avgConservativeReturn: number
): CalculatorResult {
  const realisticInputs: CalculatorInputs = {
    currentAge: inputs.currentAge,
    retirementAge: inputs.retirementAge,
    currentCorpus: inputs.currentCorpus,
    currentROI: avgBlendedReturn, // 9% till retirement
    expectedReturn: avgConservativeReturn, // 7.8% after retirement
    inflationRate: avgInflation,
    lifeExpectancy: 85, // Fixed at 85 as per user request
    retirementMonthlyExpenses: inputs.retirementMonthlyExpenses,
    oneOffAnnualExpenses: inputs.oneOffAnnualExpenses,
  }
  return calculateRetirementCorpus(realisticInputs)
}
