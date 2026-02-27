# 🌐 GitHub Pages Deployment Guide

## ✅ Project is Already Configured!

The `vite.config.js` has been updated with the correct base path for GitHub Pages.

## 🚀 Deploy to GitHub Pages (3 Methods)

### Method 1: Manual Deployment with gh-pages (Easiest)

```bash
cd expense-tracker-brutalist

# Install gh-pages
npm install --save-dev gh-pages

# Add deploy script to package.json (already done below)
# Build and deploy
npm run deploy
```

This will:
1. Build your app
2. Create a `gh-pages` branch
3. Push the build to GitHub Pages
4. Your site will be live at: **https://marktantongco.github.io/expense-tracker-brutalist/**

---

### Method 2: GitHub Actions Workflow (Automated)

**Note**: This requires adding the workflow file manually on GitHub.com due to OAuth permissions.

1. Go to your repo: https://github.com/marktantongco/expense-tracker-brutalist
2. Click **Add file** → **Create new file**
3. Name: `.github/workflows/github-pages.yml`
4. Paste this content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master, main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
  
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

5. Click **Commit changes**
6. Go to **Settings** → **Pages**
7. Source: **GitHub Actions**
8. Wait for deployment (check Actions tab)

---

### Method 3: Enable Pages with Build Artifact

1. Build locally:
   ```bash
   npm run build
   ```

2. Push `dist` folder to `gh-pages` branch:
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```

3. Enable Pages:
   - Go to: https://github.com/marktantongco/expense-tracker-brutalist/settings/pages
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** → **/ (root)**
   - Click **Save**

---

## 🎯 Recommended: Method 1 (gh-pages package)

### Step-by-Step:

```bash
cd expense-tracker-brutalist

# 1. Install gh-pages
npm install --save-dev gh-pages

# 2. Build and deploy
npm run deploy
```

That's it! Your site will be live at:
**https://marktantongco.github.io/expense-tracker-brutalist/**

---

## 🔧 What's Already Configured

✅ `vite.config.js` - Base path set to `/expense-tracker-brutalist/`
✅ Build command configured
✅ Ready for deployment

---

## ⚙️ Enable GitHub Pages

After deploying, ensure Pages is enabled:

1. Go to: https://github.com/marktantongco/expense-tracker-brutalist/settings/pages
2. If using **gh-pages** package:
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** → **/ (root)**
3. If using **GitHub Actions**:
   - Source: **GitHub Actions**

---

## 🎉 Verification

Once deployed, your site will be available at:
**https://marktantongco.github.io/expense-tracker-brutalist/**

Check deployment status:
- **Actions**: https://github.com/marktantongco/expense-tracker-brutalist/actions
- **Pages**: https://github.com/marktantongco/expense-tracker-brutalist/settings/pages

---

## 🆘 Troubleshooting

**404 Error?**
- Check the base path in `vite.config.js` matches your repo name
- Ensure Pages is enabled in repository settings

**Build fails?**
- Run `npm run build` locally first
- Check for errors in the build output

**Need Help?**
- Check GitHub Pages docs: https://docs.github.com/pages
- Review Actions logs if using workflows

---

Happy deploying! 🚀
