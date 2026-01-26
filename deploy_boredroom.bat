@echo off
echo ==========================================
echo      Boredroom.in Deployment Script
echo ==========================================
echo.
echo Step 1: Logging in to Vercel...
call npx vercel login
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [!] Login failed. Please try again.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ==========================================
echo Step 2: Deploying to 'retirement-calculator'...
echo.
echo IMPORTANT:
echo 1. If asked "Link to existing project?", type 'Y' and press Enter.
echo 2. If asked for project name, ensure it says 'retirement-calculator'.
echo 3. If asked "Want to modify settings?", type 'N' and press Enter.
echo ==========================================
echo.
call npx vercel deploy --prod
echo.
echo ==========================================
echo      Deployment Complete!
echo ==========================================
pause
