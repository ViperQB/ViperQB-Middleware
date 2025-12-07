# 🚀 Quick Start Guide - How to Run the Project

## Prerequisites

Make sure you have installed:
- **Node.js 18+** (check with: `node --version`)
- **npm** or **pnpm** (this project uses pnpm based on `pnpm-lock.yaml`)

---

## Step-by-Step Instructions

### 0. Fix PowerShell Execution Policy (Windows Only)

If you get an error like "running scripts is disabled on this system", run this in PowerShell:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

This only affects your user account and allows npm/pnpm to run.

---

### 1. Install Dependencies

Since the project has `pnpm-lock.yaml`, use **pnpm** (recommended):

```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install project dependencies
pnpm install
```

**OR** if you prefer npm (use `--legacy-peer-deps` to handle React 19 compatibility):

```bash
npm install --legacy-peer-deps
```

---

### 2. Create Environment File (Optional for now)

Create a `.env.local` file in the root directory:

```bash
# Windows (PowerShell)
New-Item -Path .env.local -ItemType File

# Windows (CMD)
type nul > .env.local

# Mac/Linux
touch .env.local
```

Then add this content (you can update the URL later when backend is ready):

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

**Note:** The app will work without this file, but API calls will fail until you connect the backend.

---

### 3. Run the Development Server

```bash
# Using pnpm (recommended)
pnpm dev

# OR using npm
npm run dev
```

You should see output like:
```
▲ Next.js 15.2.4
- Local:        http://localhost:3000
- Ready in 2.5s
```

---

### 4. Open in Browser

Open your browser and go to:
```
http://localhost:3000
```

You should see the **ViperQB marketing website** with:
- ✅ Hero section with animations
- ✅ Features section
- ✅ Security section
- ✅ Pricing section
- ✅ CTA section
- ✅ Footer

---

## Available Commands

### Development
```bash
pnpm dev          # Start development server (http://localhost:3000)
```

### Production Build
```bash
pnpm build        # Build for production
pnpm start        # Start production server
```

### Code Quality
```bash
pnpm lint         # Run ESLint
```

---

## Troubleshooting

### ❌ Error: "PowerShell execution policy" (Windows)
**Solution:** Run this in PowerShell:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### ❌ Error: "ERESOLVE unable to resolve dependency tree"
**Solution:** Use `--legacy-peer-deps` flag:
```bash
npm install --legacy-peer-deps
```

### ❌ Error: "Cannot find module"
**Solution:** Run `pnpm install` or `npm install --legacy-peer-deps` again

### ❌ Error: "Port 3000 already in use"
**Solution:** 
- Kill the process using port 3000, OR
- Run on different port: `pnpm dev -- -p 3001` or `npm run dev -- -p 3001`

### ❌ Error: "Module not found" or build errors
**Solution:**
```bash
# Clear cache and reinstall
# Windows PowerShell:
Remove-Item -Recurse -Force node_modules, .next
npm install --legacy-peer-deps
npm run dev

# Mac/Linux:
rm -rf node_modules .next
npm install --legacy-peer-deps
npm run dev
```

### ❌ Buttons not working / Styling issues
**Solution:** Make sure you're running the latest code. All fixes have been applied.

---

## What You'll See

### Marketing Website (Homepage)
- **URL:** `http://localhost:3000`
- Beautiful landing page with animations
- All buttons working
- Smooth scroll animations
- Responsive design

### Login Page
- **URL:** `http://localhost:3000/login`
- Login form (needs backend connection)

### Dashboard
- **URL:** `http://localhost:3000/dashboard`
- Full dashboard with all modules
- (Will need authentication once backend is connected)

### Demo Page
- **URL:** `http://localhost:3000/demo`
- Demo request form

---

## Next Steps

Once the app is running:

1. ✅ **Test the marketing website** - Scroll through and see all animations
2. ✅ **Test all buttons** - They should all work now
3. ✅ **Check mobile view** - Resize browser to test responsive design
4. ⚠️ **Connect Backend** - Follow `API_INTEGRATION_GUIDE.md` to connect APIs

---

## Need Help?

- Check `API_INTEGRATION_GUIDE.md` for backend connection
- Check `FRONTEND_FIXES_SUMMARY.md` for what was fixed
- Check browser console (F12) for any errors

---

**Happy Coding! 🎉**

