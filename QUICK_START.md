# Quick Start Guide

## 🚀 Get Running in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Environment File
Create `.env.local` in the root directory:
```
NEXTAUTH_SECRET=your-random-secret-here
NEXTAUTH_URL=http://localhost:3000
```

**Or run the setup script:**
```bash
npm run setup
```

### Step 3: Start Development Server
```bash
npm run dev
```

Then open **http://localhost:3000** in your browser!

---

## 📱 First Time Usage

1. You'll see the login page
2. Enter any email (e.g., `user@example.com`)
3. Enter any password (minimum 6 characters)
4. Click "Sign In / Register"
5. You'll be automatically registered and logged in
6. Start using the calculator!

---

## 💡 Calculator Features

- **Real-time calculations** - See results update as you type
- **Indian tax calculations** - Built-in tax slabs and deductions
- **Visual charts** - See your corpus growth over time
- **Save/Load** - Save your calculations for later
- **Mobile-friendly** - Works great on phones and tablets

---

## 🛠️ Troubleshooting

**Port 3000 in use?**
```bash
npm run dev -- -p 3001
```

**Module errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Need help?** Check [SETUP.md](./SETUP.md) for detailed instructions.
