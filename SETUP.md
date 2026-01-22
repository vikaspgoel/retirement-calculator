# Setup Instructions

## Quick Start

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/ (LTS version recommended)
   - Verify installation: `node --version` and `npm --version`

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   
   Option A - Using the setup script (recommended):
   ```bash
   npm run setup
   ```
   
   Option B - Manual creation:
   Create a `.env.local` file in the root directory with:
   ```
   NEXTAUTH_SECRET=your-random-secret-here
   NEXTAUTH_URL=http://localhost:3000
   ```
   
   To generate a secure secret, you can use:
   ```bash
   # On Linux/Mac:
   openssl rand -base64 32
   
   # On Windows (PowerShell):
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

5. **Open Your Browser**
   - Navigate to http://localhost:3000
   - You'll be redirected to the login page
   - Enter any email and password (6+ characters) to auto-register
   - Start using the calculator!

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes (NextAuth)
│   ├── login/             # Login page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home/Calculator page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── AuthProvider.tsx   # NextAuth session provider
│   ├── Calculator.tsx     # Main calculator component
│   ├── CalculatorForm.tsx # Input form
│   ├── CalculatorResults.tsx # Results display
│   └── LoginForm.tsx      # Login form
├── lib/                   # Utility libraries
│   ├── authOptions.ts     # NextAuth configuration
│   └── calculator.ts      # Calculator logic
├── types/                 # TypeScript type definitions
└── package.json           # Dependencies and scripts
```

## Features

- ✅ User authentication with auto-registration
- ✅ Mobile-responsive design
- ✅ Indian tax calculations (FY 2023-24)
- ✅ Real-time calculations
- ✅ Visual charts and projections
- ✅ Save/Load calculations (localStorage)

## Default Calculator Values

- Current Age: 30 years
- Retirement Age: 60 years
- Current Corpus: ₹5,00,000
- Monthly Contribution: ₹10,000
- Expected Return: 12% p.a.
- Inflation Rate: 6% p.a.
- Life Expectancy: 85 years
- Current Monthly Expenses: ₹50,000
- Retirement Expense Ratio: 80%

## Troubleshooting

### Port 3000 already in use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Module not found errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
# Restart TypeScript server in your IDE
# Or rebuild:
npm run build
```

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Set production environment variables:
   - `NEXTAUTH_SECRET`: Use a strong random secret
   - `NEXTAUTH_URL`: Your production domain URL

3. Start the production server:
   ```bash
   npm start
   ```

## Notes

- The current implementation uses in-memory user storage (for demo purposes)
- For production, replace with a database (PostgreSQL, MongoDB, etc.)
- Calculations use Indian tax rates and assumptions
- All financial calculations are for informational purposes only
