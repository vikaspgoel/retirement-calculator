// Test Retirement Calculator - CORRECTED VERSION

const inputs = {
  currentAge: 35,
  retirementAge: 55,
  currentCorpus: 5000000, // 50 Lakhs
  currentROI: 8, // 8% POST-TAX - used for existing corpus AND SIPs till retirement
  expectedReturn: 8, // 8% POST-TAX - return DURING retirement (withdrawal phase)
  inflationRate: 6,
  lifeExpectancy: 85,
  retirementMonthlyExpenses: 100000, // 1 Lakh today's value
  oneOffAnnualExpenses: 200000, // 2 Lakhs today's value
};

console.log("=== TEST INPUTS ===");
console.log("Current Age:", inputs.currentAge);
console.log("Retirement Age:", inputs.retirementAge);
console.log("Current Corpus:", "₹" + (inputs.currentCorpus / 100000).toFixed(2) + " Lakhs");
console.log("Return till Retirement (POST-TAX):", inputs.currentROI + "% (for corpus + SIPs)");
console.log("Return during Retirement (POST-TAX):", inputs.expectedReturn + "% (corpus earns this after retirement)");
console.log("Inflation Rate:", inputs.inflationRate + "%");
console.log("Life Expectancy:", inputs.lifeExpectancy);
console.log("Monthly Expenses (today's value):", "₹" + (inputs.retirementMonthlyExpenses / 100000).toFixed(2) + " Lakhs");
console.log("One-time Annual Expenses (today's value):", "₹" + (inputs.oneOffAnnualExpenses / 100000).toFixed(2) + " Lakhs");

console.log("\n=== STEP BY STEP CALCULATION ===\n");

// Step 1: Calculate years
const yearsToRetirement = inputs.retirementAge - inputs.currentAge;
const yearsInRetirement = inputs.lifeExpectancy - inputs.retirementAge;
console.log("Step 1: Years");
console.log("  Years to retirement:", yearsToRetirement);
console.log("  Years in retirement:", yearsInRetirement);

// Step 2: Returns
console.log("\nStep 2: Returns");
console.log("  Till retirement (corpus + SIPs):", inputs.currentROI + "%");
console.log("  During retirement (corpus earns):", inputs.expectedReturn + "%");

// Step 3: Inflate expenses to retirement year
const monthlyExpensesAtRetirement = inputs.retirementMonthlyExpenses * Math.pow(1 + inputs.inflationRate / 100, yearsToRetirement);
const oneOffExpensesAtRetirement = inputs.oneOffAnnualExpenses * Math.pow(1 + inputs.inflationRate / 100, yearsToRetirement);
const annualExpensesAtRetirement = (monthlyExpensesAtRetirement * 12) + oneOffExpensesAtRetirement;

console.log("\nStep 3: Expenses at retirement (inflated)");
console.log("  Inflation factor (1.06^20):", Math.pow(1.06, 20).toFixed(4));
console.log("  Monthly expenses at retirement:", "₹" + (monthlyExpensesAtRetirement / 100000).toFixed(2) + " Lakhs");
console.log("  One-time annual expenses at retirement:", "₹" + (oneOffExpensesAtRetirement / 100000).toFixed(2) + " Lakhs");
console.log("  Total annual expenses at retirement:", "₹" + (annualExpensesAtRetirement / 100000).toFixed(2) + " Lakhs");

// Step 4: Calculate real return using expectedReturn (return DURING retirement)
const returnDuringRetirement = inputs.expectedReturn;
const realReturn = ((1 + returnDuringRetirement / 100) / (1 + inputs.inflationRate / 100)) - 1;

console.log("\nStep 4: Corpus required at retirement");
console.log("  Return during retirement:", returnDuringRetirement + "%");
console.log("  Real return formula: (1.08/1.06) - 1 =", (realReturn * 100).toFixed(2) + "%");

// Calculate corpus using Annuity Due factor
let corpusRequired;
if (realReturn > 0.001) {
  const ordinaryAnnuityFactor = (1 - Math.pow(1 + realReturn, -yearsInRetirement)) / realReturn;
  const annuityDueFactor = ordinaryAnnuityFactor * (1 + realReturn);
  console.log("  Ordinary annuity factor:", ordinaryAnnuityFactor.toFixed(2));
  console.log("  Annuity Due factor:", annuityDueFactor.toFixed(2));
  corpusRequired = annualExpensesAtRetirement * annuityDueFactor;
} else {
  corpusRequired = annualExpensesAtRetirement * yearsInRetirement;
}
console.log("  Gross corpus required:", "₹" + (corpusRequired / 10000000).toFixed(2) + " Crores");

// Step 5: Future value of current corpus at currentROI
const futureValueOfCurrentCorpus = inputs.currentCorpus * Math.pow(1 + inputs.currentROI / 100, yearsToRetirement);
console.log("\nStep 5: Future value of current corpus (at " + inputs.currentROI + "%)");
console.log("  Growth factor ((1.08)^20):", Math.pow(1.08, 20).toFixed(4));
console.log("  Future value of ₹50L:", "₹" + (futureValueOfCurrentCorpus / 10000000).toFixed(2) + " Crores");

// Step 6: Additional corpus needed
const additionalCorpusRequired = Math.max(0, corpusRequired - futureValueOfCurrentCorpus);
console.log("\nStep 6: Additional corpus needed (shortfall)");
console.log("  Corpus required - Future value:", "₹" + (additionalCorpusRequired / 10000000).toFixed(2) + " Crores");

// Step 7: Monthly SIP needed at currentROI (same rate for SIPs)
let monthlyContributionNeeded = 0;
if (additionalCorpusRequired > 0) {
  const monthlyReturn = inputs.currentROI / 12 / 100;
  const months = yearsToRetirement * 12;
  monthlyContributionNeeded = additionalCorpusRequired / ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn);
}
console.log("\nStep 7: Monthly SIP needed (at " + inputs.currentROI + "% - same as corpus)");
console.log("  Monthly SIP:", "₹" + monthlyContributionNeeded.toFixed(0));

console.log("\n=== SUMMARY ===");
console.log("Gross Corpus Required at Retirement:", "₹" + (corpusRequired / 10000000).toFixed(2) + " Crores");
console.log("Future Value of Current Corpus:", "₹" + (futureValueOfCurrentCorpus / 10000000).toFixed(2) + " Crores");
console.log("Additional Corpus Required:", "₹" + (additionalCorpusRequired / 10000000).toFixed(2) + " Crores");
console.log("Monthly SIP Needed:", "₹" + monthlyContributionNeeded.toFixed(0));

console.log("\n=== EXPECTED (from external calc) ===");
console.log("Corpus Required: ₹10.41 Crores");
console.log("Future Value of ₹50L: ₹2.33 Crores");
console.log("Shortfall: ₹8.08 Crores");
console.log("Monthly SIP: ₹1,36,000 (approx, at 8%)");
