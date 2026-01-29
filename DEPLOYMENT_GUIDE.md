# Step-by-Step Deployment Guide

## Part 1: Upload Your Code to GitHub

### Step 1: Create a New Repository on GitHub

1. Go to **https://github.com** and log in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `retirement-calculator` (or any name you like)
   - **Description**: "Retirement Corpus Calculator for Indian Users" (optional)
   - **Visibility**: Choose **Public** (so Vercel can access it) or **Private** (you'll need to connect GitHub to Vercel)
   - **DO NOT** check "Add a README file" (we already have one)
   - **DO NOT** add .gitignore or license
5. Click **"Create repository"**

### Step 2: Upload Your Code Using GitHub Desktop (Easiest Method)

**Option A: Using GitHub Desktop (Recommended for Non-Technical Users)**

1. Download GitHub Desktop: https://desktop.github.com/
2. Install and open GitHub Desktop
3. Sign in with your GitHub account
4. Click **"File"** → **"Add Local Repository"**
5. Click **"Choose"** and navigate to: `C:\Users\shaur\Downloads\VG cursor`
6. Click **"Add Repository"**
7. You'll see all your files listed
8. At the bottom, type a message like: "Initial commit - Retirement Calculator"
9. Click **"Commit to main"**
10. Click **"Publish repository"** (top right)
11. Make sure it says "Publish to GitHub" and your repository name appears
12. Click **"Publish repository"**
13. Wait for it to upload (you'll see a progress bar)

**Option B: Using Command Line (If you're comfortable)**

Open PowerShell in your project folder and run:
```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/retirement-calculator.git
git push -u origin main
```
(Replace YOUR_USERNAME with your GitHub username)

---

## Part 2: Deploy to Vercel

### Step 1: Sign Up for Vercel

1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account
5. Complete the sign-up process

### Step 2: Deploy Your Project

1. Once logged in, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find **"retirement-calculator"** (or whatever you named it)
4. Click **"Import"** next to it
5. Vercel will detect it's a Next.js project automatically
6. You'll see configuration settings:
   - **Project Name**: Keep the default or change it
   - **Framework Preset**: Should say "Next.js" (auto-detected)
   - **Root Directory**: Leave as `./`
   - **Build Command**: Leave as default
   - **Output Directory**: Leave as default
7. Click **"Deploy"**
8. Wait 2-3 minutes while it builds and deploys
9. You'll see "Building..." then "Deploying..." then "Ready!"

### Step 3: Get Your Shareable Link

1. Once deployment is complete, you'll see a success message
2. Click on your project name
3. You'll see a link like: `https://retirement-calculator.vercel.app`
4. **This is your shareable link!** Copy it and share with friends/family

### Step 4: Set Up Environment Variables (Important!)

1. In your Vercel project dashboard, go to **"Settings"**
2. Click **"Environment Variables"** in the left menu
3. Click **"Add New"**
4. Add these two variables:

   **Variable 1:**
   - **Name**: `NEXTAUTH_SECRET`
   - **Value**: Generate a random string (you can use: `openssl rand -base64 32` or just use a long random string)
   - **Environment**: Select all (Production, Preview, Development)
   - Click **"Save"**

   **Variable 2:**
   - **Name**: `NEXTAUTH_URL`
   - **Value**: `https://your-project-name.vercel.app` (use your actual Vercel URL)
   - **Environment**: Select all
   - Click **"Save"**

5. Go back to **"Deployments"** tab
6. Click the **"..."** menu on the latest deployment
7. Click **"Redeploy"**
8. Wait for it to redeploy with the new environment variables

---

## That's It! 🎉

Your app is now live and you can share the link with anyone!

### Tips:
- Every time you update code on GitHub, Vercel will automatically redeploy
- You can customize the domain name in Vercel settings
- The free tier is perfect for sharing with friends and family

### How to confirm your changes are live

1. **Check locally first**  
   In the project folder, run: `npm run build` then `npm run start`.  
   Open http://localhost:3000/gita-for-busy-folks. You should see:
   - No "Too busy, no time for Gita?" button
   - Hindi in Sahitya font
   - The line "हिंदी व्याख्या उपलब्ध: अध्याय 1, 2, 4, 5, 6"

2. **Push does not always update the live site**  
   Pushing to GitHub only updates boredroom.in if Vercel is set to auto-deploy from that repo.  
   If you normally deploy with the batch file, you must run it after pushing:
   - Double-click **deploy_boredroom.bat** (or run `npx vercel deploy --prod` in the project folder).
   - Wait until it finishes. Only then is the new build live.

3. **After deploying, check the live URL**  
   Open https://boredroom.in/gita-for-busy-folks (or your live URL).  
   If you still see the old version:
   - Do a hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac).
   - Or try in a private/incognito window to avoid cache.

4. **If you use Vercel dashboard**  
   Log in at https://vercel.com → your project → **Deployments**.  
   The latest deployment should show the commit you just pushed. If the top deployment is old, trigger **Redeploy** from the "..." menu.

### Troubleshooting:
- If the app doesn't work, check that environment variables are set correctly
- Make sure you redeployed after adding environment variables
- Check the Vercel deployment logs if something goes wrong
