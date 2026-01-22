# Push Your Code to GitHub - Step by Step

Your repository is ready at: https://github.com/vikaspgoel/retirement-calculator.git

## Method 1: Using GitHub Desktop (EASIEST - Recommended)

### Step 1: Download GitHub Desktop
1. Go to: https://desktop.github.com/
2. Click **"Download for Windows"**
3. Install the downloaded file (double-click and follow prompts)
4. Open GitHub Desktop
5. Sign in with your GitHub account (vikaspgoel)

### Step 2: Add Your Project
1. In GitHub Desktop, click **"File"** → **"Add Local Repository"**
2. Click **"Choose"** button
3. Navigate to: `C:\Users\shaur\Downloads\VG cursor`
4. Click **"Select Folder"** or **"OK"**
5. Click **"Add Repository"**

### Step 3: Commit Your Files
1. You'll see all your project files listed
2. At the bottom left, in the "Summary" box, type:
   ```
   Initial commit - Retirement Corpus Calculator
   ```
3. Click **"Commit to main"** button (bottom left)

### Step 4: Publish to GitHub
1. After committing, you'll see a button at the top that says **"Publish repository"**
2. Click **"Publish repository"**
3. A popup will appear:
   - **Name**: `retirement-calculator` (should already be filled)
   - **Description**: Leave empty or add "Retirement Corpus Calculator"
   - **Keep this code private**: Uncheck this (make it public for easy deployment)
4. Click **"Publish repository"**
5. Wait for it to finish (you'll see a progress bar)

**Done!** Your code is now on GitHub!

---

## Method 2: Using Command Line (If Git is Installed)

If you have Git installed, run these commands in PowerShell:

```powershell
cd "c:\Users\shaur\Downloads\VG cursor"
git init
git add .
git commit -m "Initial commit - Retirement Corpus Calculator"
git branch -M main
git remote add origin https://github.com/vikaspgoel/retirement-calculator.git
git push -u origin main
```

When prompted for credentials:
- **Username**: vikaspgoel
- **Password**: Use a Personal Access Token (not your regular password)

### To Create Personal Access Token:
1. Go to GitHub.com → Your profile → **Settings**
2. **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. **Generate new token (classic)**
4. Check **"repo"** scope
5. Generate and copy the token
6. Use this token as your password

---

## After Pushing to GitHub:

Once your code is on GitHub, you can:
1. Go to **https://vercel.com**
2. Sign up with GitHub
3. Import your repository: `vikaspgoel/retirement-calculator`
4. Deploy!

---

**I recommend using Method 1 (GitHub Desktop) - it's much easier!**
