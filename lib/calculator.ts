// Retirement Corpus Calculator with Indian Tax Considerations

export interface CalculatorInputs {
  currentAge: number
  retirementAge: number
  currentCorpus: number
  expectedReturn: number // Annual return percentage
  inflationRate: number // Annual inflation percentage
  lifeExpectancy: number
  retirementMonthlyExpenses: number // Monthly expenses during retirement
  oneOffAnnualExpenses: number // One-off annual expenses during retirement
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

  // Using post-tax returns for accumulation
  const postTaxReturn = getPostTaxReturn(inputs.expectedReturn, false)

  // User enters expenses at retirement year, so we use them directly
  // Inflation will be applied during retirement years
  const monthlyExpensesAtRetirement = inputs.retirementMonthlyExpenses
  const annualExpensesAtRetirement = (monthlyExpensesAtRetirement * 12) + inputs.oneOffAnnualExpenses

  // Calculate required corpus using present value of annuity
  // Assuming expenses increase with inflation during retirement
  // Using a simplified approach: corpus should last for retirement years
  // With 4% withdrawal rule (adjusted for inflation)
  const withdrawalRate = 0.04 // 4% rule
  const corpusRequired = annualExpensesAtRetirement / withdrawalRate

  // More accurate calculation: present value of growing annuity
  const retirementReturn = postTaxReturn * 0.7 // Conservative return during retirement
  const realReturn = retirementReturn - inputs.inflationRate
  let corpusRequiredPV = 0

  if (realReturn > 0) {
    // Present value of growing annuity
    corpusRequiredPV =
      annualExpensesAtRetirement *
      ((1 - Math.pow(1 + inputs.inflationRate / 100, yearsInRetirement) / 
        Math.pow(1 + retirementReturn / 100, yearsInRetirement)) /
        ((retirementReturn / 100) - (inputs.inflationRate / 100)))
  } else {
    // If real return is negative or zero, use simple multiplication
    corpusRequiredPV = annualExpensesAtRetirement * yearsInRetirement
  }

  // Calculate future value of current corpus
  const futureValueOfCurrentCorpus =
    inputs.currentCorpus * Math.pow(1 + postTaxReturn / 100, yearsToRetirement)
  
  // Additional corpus needed beyond current savings
  const additionalCorpusRequired = Math.max(0, corpusRequiredPV - futureValueOfCurrentCorpus)

  // Calculate required monthly contribution based on additional corpus needed
  let monthlyContributionNeeded = 0
  if (additionalCorpusRequired > 0) {
    const monthlyReturn = postTaxReturn / 12 / 100
    const months = yearsToRetirement * 12
    monthlyContributionNeeded =
      additionalCorpusRequired /
      ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn)
  }

  // Calculate total corpus at retirement (current corpus growth + contributions)
  const corpusAtRetirement = calculateFutureValue(
    inputs.currentCorpus,
    monthlyContributionNeeded,
    postTaxReturn,
    yearsToRetirement
  )

  const shortfallOrSurplus = corpusAtRetirement - corpusRequiredPV

  // Generate projections for accumulation phase using required monthly contribution
  const projections: CalculatorResult['projections'] = []
  let corpusValue = inputs.currentCorpus
  const monthlyReturn = postTaxReturn / 12 / 100
  let previousCorpus = inputs.currentCorpus
  const monthlyContributionForProjection = monthlyContributionNeeded > 0 ? monthlyContributionNeeded : 0

  for (let year = 0; year <= yearsToRetirement; year++) {
    const age = inputs.currentAge + year
    let yearlyReturns = 0
    const yearlyContributions = monthlyContributionForProjection * 12
    
    if (year > 0) {
      // Calculate returns and contributions for the year
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
  const retirementMonthlyReturn = retirementReturn / 12 / 100
  let totalWithdrawals = 0

  for (let year = 0; year <= yearsInRetirement; year++) {
    const age = inputs.retirementAge + year
    let yearlyReturns = 0
    let yearlyWithdrawal = 0
    
    if (year > 0) {
      // Calculate returns and withdrawals for the year
      yearlyReturns = retirementCorpus * (Math.pow(1 + retirementMonthlyReturn, 12) - 1)
      // Monthly expenses adjusted for inflation + one-off expenses
      const monthlyExpenseThisYear = monthlyExpensesAtRetirement * Math.pow(1 + inputs.inflationRate / 100, year - 1)
      yearlyWithdrawal = (monthlyExpenseThisYear * 12) + inputs.oneOffAnnualExpenses
      totalWithdrawals += yearlyWithdrawal
      retirementCorpus = retirementCorpus + yearlyReturns - yearlyWithdrawal
      retirementCorpus = Math.max(0, retirementCorpus) // Don't go negative
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

// Calculate aggressive scenario with +1% return and -1% inflation
export function calculateAggressiveScenario(inputs: CalculatorInputs): CalculatorResult {
  // Create a new inputs object with adjusted rates
  const aggressiveInputs: CalculatorInputs = {
    currentAge: inputs.currentAge,
    retirementAge: inputs.retirementAge,
    currentCorpus: inputs.currentCorpus, // Include current corpus
    expectedReturn: inputs.expectedReturn + 1, // Add 1% to return
    inflationRate: Math.max(0.1, inputs.inflationRate - 1), // Subtract 1% from inflation (min 0.1%)
    lifeExpectancy: inputs.lifeExpectancy,
    retirementMonthlyExpenses: inputs.retirementMonthlyExpenses,
    oneOffAnnualExpenses: inputs.oneOffAnnualExpenses,
  }
  return calculateRetirementCorpus(aggressiveInputs)
}
