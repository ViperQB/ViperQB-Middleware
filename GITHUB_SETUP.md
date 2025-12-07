# GitHub Setup Instructions

Your ViperQB repository is now ready to be pushed to GitHub!

## Step 1: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `ViperQB` or `viperqb-platform`)
5. **Do NOT** initialize with a README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Configure Git (If Not Already Done)

Before committing, configure your git identity (if you haven't already):

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Or configure only for this repository:

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

## Step 3: Make Initial Commit

```bash
# Make the initial commit
git commit -m "Initial commit: Add Front and Back folder structure"
```

## Step 4: Connect Your Local Repository to GitHub

After creating the repository on GitHub, you'll see instructions. Run these commands in your terminal (from the `ViperQB` directory):

```bash
# Add the remote repository (replace YOUR_USERNAME and REPO_NAME with your actual values)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Rename the branch to main (if it's currently master)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

## Step 5: Verify

1. Go to your GitHub repository page
2. You should see:
   - `Front/` folder with all frontend files
   - `Back/` folder with the README placeholder
   - Root `README.md` and `.gitignore`

## Important Notes

### Front Folder History

The Front folder previously had its own git repository connected to `https://github.com/ViperQB/Front.git`. That repository history has been removed to integrate Front into this monorepo.

If you need to preserve the Front repository separately, you have two options:

1. **Keep Front as a separate repository** - Don't remove Front/.git, and use git submodules instead
2. **Use this monorepo approach** - All code in one repository (current setup)

### Future Backend Integration

When you receive the backend files:
1. Place them in the `Back/` folder
2. Add and commit them:
   ```bash
   git add Back/
   git commit -m "Add backend files"
   git push
   ```

## Repository Structure

```
ViperQB/
├── Front/          # Next.js frontend (all files committed)
├── Back/           # Backend API (placeholder README, ready for files)
├── .gitignore      # Git ignore rules
├── README.md       # Main project documentation
└── GITHUB_SETUP.md # This file
```

## Troubleshooting

### If you get authentication errors:
- Use a Personal Access Token instead of password
- Or set up SSH keys for GitHub

### If you want to keep Front as a submodule:
```bash
# Remove Front from current staging
git rm --cached Front

# Add as submodule
git submodule add https://github.com/ViperQB/Front.git Front
```

## Next Steps

1. ✅ Repository structure is ready
2. ✅ Git initialized
3. ⏳ Create GitHub repository and push
4. ⏳ Add backend files when received
5. ⏳ Link Front and Back in development

