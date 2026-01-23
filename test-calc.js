// Test Retirement Calculator - FIXED VERSION

const inputs = {
  currentAge: 35,
  retirementAge: 55,
  currentCorpus: 5000000, // 50 Lakhs
  currentROI: 8, // 8% POST-TAX on existing corpus
  expectedReturn: 10, // 10% POST-TAX on new contributions
  inflationRate: 6,
  lifeExpectancy: 85,
  retirementMonthlyExpenses: 100000, // 1 Lakh today's value
  oneOffAnnualExpenses: 200000, // 2 Lakhs today's value
};

console.log("=== TEST INPUTS ===");
console.log("Current Age:", inputs.currentAge);
console.log("Retirement Age:", inputs.retirementAge);
console.log("Current Corpus:", "₹" + (inputs.currentCorpus / 100000).toFixed(2) + " Lakhs");
console.log("Current ROI (POST-TAX):", inputs.currentROI + "%");
console.log("Expected Return for SIP (POST-TAX):", inputs.expectedReturn + "%");
console.log("Inflation Rate:", inputs.inflationRate + "%");
console.log("Life Expectancy:", inputs.lifeExpectancy);
console.log("Monthly Expenses (today's value):", "₹" + (inputs.retirementMonthlyExpenses / 100000).toFixed(2) + " Lakhs");
console.log("One-time Annual Expenses (today's value):", "₹" + (inputs.oneOffAnnualExpenses / 100000).toFixed(2) + " Lakhs");

console.log("\n=== STEP BY STEP CALCULATION (FIXED) ===\n");

// Step 1: Calculate years
const yearsToRetirement = inputs.retirementAge - inputs.currentAge;
const yearsInRetirement = inputs.lifeExpectancy - inputs.retirementAge;
console.log("Step 1: Years");
console.log("  Years to retirement:", yearsToRetirement);
console.log("  Years in retirement:", yearsInRetirement);

// Step 2: NO tax deduction - user enters post-tax returns
console.log("\nStep 2: Returns (user enters POST-TAX, no deduction)");
console.log("  Current ROI:", inputs.currentROI + "%");
console.log("  Expected Return for SIP:", inputs.expectedReturn + "%");

// Step 3: Inflate expenses to retirement year
const monthlyExpensesAtRetirement = inputs.retirementMonthlyExpenses * Math.pow(1 + inputs.inflationRate / 100, yearsToRetirement);
const oneOffExpensesAtRetirement = inputs.oneOffAnnualExpenses * Math.pow(1 + inputs.inflationRate / 100, yearsToRetirement);
const annualExpensesAtRetirement = (monthlyExpensesAtRetirement * 12) + oneOffExpensesAtRetirement;

console.log("\nStep 3: Expenses at retirement (inflated)");
console.log("  Inflation factor (1.06^20):", Math.pow(1.06, 20).toFixed(4));
console.log("  Monthly expenses at retirement:", "₹" + (monthlyExpensesAtRetirement / 100000).toFixed(2) + " Lakhs");
console.log("  One-time annual expenses at retirement:", "₹" + (oneOffExpensesAtRetirement / 100000).toFixed(2) + " Lakhs");
console.log("  Total annual expenses at retirement:", "₹" + (annualExpensesAtRetirement / 100000).toFixed(2) + " Lakhs");

// Step 4: Calculate real return using CORRECT formula
const retirementReturn = inputs.currentROI; // Use currentROI for retirement phase
const realReturn = ((1 + retirementReturn / 100) / (1 + inputs.inflationRate / 100)) - 1;

console.log("\nStep 4: Corpus required at retirement");
console.log("  Return during retirement:", retirementReturn + "%");
console.log("  Real return formula: (1.08/1.06) - 1 =", (realReturn * 100).toFixed(2) + "%");

// Calculate corpus using Annuity Due factor (withdrawals at start of year)
let corpusRequired;
if (realReturn > 0.001) {
  const ordinaryAnnuityFactor = (1 - Math.pow(1 + realReturn, -yearsInRetirement)) / realReturn;
  const annuityDueFactor = ordinaryAnnuityFactor * (1 + realReturn);
  console.log("  Ordinary annuity factor:", ordinaryAnnuityFactor.toFixed(2));
  console.log("  Annuity Due factor (× 1.0189):", annuityDueFactor.toFixed(2));
  corpusRequired = annualExpensesAtRetirement * annuityDueFactor;
} else {
  corpusRequired = annualExpensesAtRetirement * yearsInRetirement;
}
console.log("  Gross corpus required:", "₹" + (corpusRequired / 10000000).toFixed(2) + " Crores");

// Step 5: Future value of current corpus (NO tax deduction)
const futureValueOfCurrentCorpus = inputs.currentCorpus * Math.pow(1 + inputs.currentROI / 100, yearsToRetirement);
console.log("\nStep 5: Future value of current corpus");
console.log("  Growth factor ((1.08)^20):", Math.pow(1.08, 20).toFixed(4));
console.log("  Future value of ₹50L:", "₹" + (futureValueOfCurrentCorpus / 10000000).toFixed(2) + " Crores");

// Step 6: Additional corpus needed
const additionalCorpusRequired = Math.max(0, corpusRequired - futureValueOfCurrentCorpus);
console.log("\nStep 6: Additional corpus needed");
console.log("  Corpus required - Future value:", "₹" + (additionalCorpusRequired / 10000000).toFixed(2) + " Crores");

// Step 7: Monthly contribution needed at expectedReturn (10%)
let monthlyContributionNeeded = 0;
if (additionalCorpusRequired > 0) {
  const monthlyReturn = inputs.expectedReturn / 12 / 100;
  const months = yearsToRetirement * 12;
  monthlyContributionNeeded = additionalCorpusRequired / ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn);
}
console.log("\nStep 7: Monthly SIP needed (at " + inputs.expectedReturn + "% return)");
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
console.log("Monthly SIP: ₹1,06,350");
