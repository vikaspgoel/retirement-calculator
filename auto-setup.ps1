# Automated Setup Script for Retirement Calculator
# This script will install dependencies and start the server

Write-Host "🚀 Starting automated setup..." -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/ and restart your computer" -ForegroundColor Yellow
    exit 1
}

# Check if .env.local exists
Write-Host "Checking environment configuration..." -ForegroundColor Yellow
if (-not (Test-Path ".env.local")) {
    Write-Host "Creating .env.local file..." -ForegroundColor Yellow
    
    # Generate a random secret
    $bytes = New-Object byte[] 32
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
    $rng.GetBytes($bytes)
    $secret = [Convert]::ToBase64String($bytes)
    
    $envContent = @"
# NextAuth Configuration
# Auto-generated secret
NEXTAUTH_SECRET=$secret
NEXTAUTH_URL=http://localhost:3000
"@
    
    $envContent | Out-File -FilePath ".env.local" -Encoding utf8
    Write-Host "✅ Created .env.local with secure secret" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "✅ .env.local already exists" -ForegroundColor Green
    Write-Host ""
}

# Install dependencies
Write-Host "Installing dependencies (this may take 2-3 minutes)..." -ForegroundColor Yellow
Write-Host ""
try {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host "❌ Error installing dependencies" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Error installing dependencies: $_" -ForegroundColor Red
    exit 1
}

# Start the development server
Write-Host ""
Write-Host "🎉 Setup complete! Starting development server..." -ForegroundColor Green
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  Retirement Calculator is starting..." -ForegroundColor Cyan
Write-Host "  Once you see 'Ready' below, open this link:" -ForegroundColor Cyan
Write-Host "  👉 http://localhost:3000" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Start the server
npm run dev
