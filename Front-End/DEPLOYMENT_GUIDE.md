# 🚀 Deployment Guide - GitHub & Vercel

This guide will help you push your code to GitHub and deploy it to Vercel.

---

## 📋 Prerequisites

- Git installed on your computer
- GitHub account
- Vercel account (free tier works)

---

## Step 1: Initialize Git Repository

If you haven't already initialized git:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: ViperQB frontend with all fixes"
```

---

## Step 2: Connect to GitHub Repository

### Option A: If the repository is empty (recommended)

```bash
# Add the remote repository
git remote add origin https://github.com/ViperQB/Front.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Option B: If the repository already has content

```bash
# Add the remote repository
git remote add origin https://github.com/ViperQB/Front.git

# Fetch existing content
git fetch origin

# Merge or rebase (choose one):
# Option 1: Merge
git merge origin/main --allow-unrelated-histories

# Option 2: Force push (⚠️ only if you want to overwrite)
# git push -u origin main --force
```

---

## Step 3: Create .gitignore (if not exists)

Make sure you have a `.gitignore` file with:

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# Production
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db
```

---

## Step 4: Deploy to Vercel

### Method 1: Via Vercel Dashboard (Easiest)

1. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub

2. **Click "Add New Project"**

3. **Import your GitHub repository:**
   - Select `ViperQB/Front` from the list
   - Click "Import"

4. **Configure Project:**
   - **Framework Preset:** Next.js (should auto-detect)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` (or `pnpm build`)
   - **Output Directory:** `.next` (auto-detected)
   - **Install Command:** `npm install --legacy-peer-deps` (or `pnpm install`)

5. **Environment Variables:**
   - Add `NEXT_PUBLIC_API_BASE_URL` if you have a backend URL
   - For now, you can leave it empty or set to `http://localhost:3001`

6. **Click "Deploy"**

7. **Wait for deployment** (usually 2-3 minutes)

8. **Your site will be live!** You'll get a URL like `https://front-xxx.vercel.app`

---

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? viperqb-front (or your choice)
# - Directory? ./
# - Override settings? No

# For production deployment:
vercel --prod
```

---

## Step 5: Configure Custom Domain (Optional)

1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

---

## Step 6: Set Up Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main

# Vercel will automatically:
# 1. Detect the push
# 2. Build your project
# 3. Deploy to production
```

---

## 🔧 Environment Variables in Vercel

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add variables:
   - `NEXT_PUBLIC_API_BASE_URL` = `https://your-backend-api.com`
3. Redeploy for changes to take effect

---

## 📝 GitHub Repository Setup

### Make Repository Public (if needed)

1. Go to `https://github.com/ViperQB/Front`
2. Click **Settings** → **General**
3. Scroll to **Danger Zone**
4. Change visibility to **Public** (if needed)

### Add README (Optional)

The repository already has a README.md, but you can enhance it.

---

## 🐛 Troubleshooting

### Build Fails on Vercel

**Error: "Module not found"**
- Make sure all dependencies are in `package.json`
- Check that `node_modules` is in `.gitignore`

**Error: "Command failed"**
- Check build command in Vercel settings
- Use `npm run build` or `pnpm build`

**Error: "Port already in use"**
- This shouldn't happen on Vercel, but if it does, check your `next.config.ts`

### Deployment is Slow

- Vercel free tier has build time limits
- Consider upgrading to Pro for faster builds

### Environment Variables Not Working

- Make sure variable names start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)

---

## ✅ Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All pages are accessible
- [ ] Login redirects to dashboard
- [ ] File upload works
- [ ] Search/filters work
- [ ] Add buttons work
- [ ] Responsive design works on mobile
- [ ] Environment variables are set
- [ ] Custom domain configured (if applicable)

---

## 🔄 Updating Your Deployment

Every time you push to GitHub:

```bash
git add .
git commit -m "Description of changes"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Run build
3. Deploy new version
4. Update your live site

---

## 📊 Monitoring

- **Vercel Dashboard:** View deployments, analytics, logs
- **GitHub Actions:** (if you set up CI/CD)
- **Vercel Analytics:** Enable in project settings

---

## 🆘 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **GitHub Docs:** https://docs.github.com

---

## 🎉 You're Done!

Your ViperQB frontend is now:
- ✅ On GitHub: `https://github.com/ViperQB/Front`
- ✅ Deployed on Vercel: `https://your-project.vercel.app`
- ✅ Auto-deploying on every push

**Next Steps:**
1. Connect your backend API URL in Vercel environment variables
2. Test all functionality
3. Share the live URL with your team!

---

**Last Updated:** 2025-01-XX

