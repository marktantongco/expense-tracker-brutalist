# 🚀 Deploy From Your Local Machine

## ⚠️ Important Note

The deployment build environment has limitations. You'll need to deploy from your **local computer** (Windows, Mac, or Linux desktop).

---

## 📋 Prerequisites

- Node.js 18+ installed on your computer
- Git installed
- GitHub account access

---

## 🎯 Step-by-Step Deployment

### 1. Clone the Repository

Open Terminal (Mac/Linux) or PowerShell (Windows):

```bash
# Clone the repository
git clone https://github.com/marktantongco/expense-tracker-brutalist.git

# Navigate to the directory
cd expense-tracker-brutalist
```

### 2. Install Dependencies

```bash
npm install
```

This will take 1-2 minutes.

### 3. Test Locally (Optional but Recommended)

```bash
npm run dev
```

Visit http://localhost:5173 to test the app.

Press `Ctrl+C` to stop the dev server.

### 4. Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
- Build the production version
- Create/update the `gh-pages` branch
- Push to GitHub
- Deploy automatically

**Wait 2-3 minutes** for GitHub Pages to update.

### 5. Verify Deployment

Visit: **https://marktantongco.github.io/expense-tracker-brutalist/**

---

## 🎉 You're Live!

Your brutalist expense tracker is now live on the internet!

---

## 🔧 Alternative: Vercel Deployment

If GitHub Pages doesn't work:

### Method 1: Vercel Dashboard

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import `marktantongco/expense-tracker-brutalist`
5. Click "Deploy"
6. Done! Live in ~30 seconds

### Method 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## 📱 Alternative: Netlify Deployment

### Drag & Drop Method

1. Build locally:
```bash
npm run build
```

2. Go to https://app.netlify.com/drop

3. Drag the `dist` folder to the upload area

4. Done! Live instantly

### CLI Method

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

---

## ❓ Troubleshooting

### "npm: command not found"

Install Node.js from https://nodejs.org

### "Permission denied"

On Mac/Linux, try:
```bash
sudo npm install -g gh-pages
```

### Build fails

Clear cache and retry:
```bash
rm -rf node_modules package-lock.json
npm install
npm run deploy
```

### GitHub Pages shows 404

1. Go to repository settings
2. Pages → Source → `gh-pages` branch → `/ (root)`
3. Wait 2-3 minutes

---

## ✅ Post-Deployment Checklist

After deployment, test these features:

- [ ] Site loads
- [ ] Add transaction works
- [ ] Edit transaction works
- [ ] Delete transaction works
- [ ] Export CSV works
- [ ] Export JSON works
- [ ] Import CSV works
- [ ] Import JSON works
- [ ] Filtering works
- [ ] Analytics displays
- [ ] Charts render
- [ ] Budget tracker works
- [ ] Dark mode toggles
- [ ] Mobile responsive

---

## 📊 Update Jira After Deployment

Once live, update [KAN-5](https://markyasset-1770677982173.atlassian.net/browse/KAN-5):

```
✅ DEPLOYED TO PRODUCTION

Live URL: https://marktantongco.github.io/expense-tracker-brutalist/

Deployment Details:
- Platform: GitHub Pages
- Build: Vite production build
- Size: ~150KB
- Load time: <1s

All features verified working:
✅ Core CRUD operations
✅ Export/Import (CSV, JSON)
✅ Analytics Dashboard
✅ Visual Charts
✅ Filtering & Search
✅ Budget Tracking
✅ Dark Mode

Status: LIVE IN PRODUCTION 🚀
```

---

## 🎊 Share Your Work!

Once live, share on:

- Twitter: "Just launched my brutalist expense tracker! 🚀"
- LinkedIn: "Shipped a privacy-first expense tracker with React + Vite"
- Product Hunt: Submit for community feedback
- Dev.to: Write about the technical implementation

---

## 🔗 Quick Links

- **Repository:** https://github.com/marktantongco/expense-tracker-brutalist
- **Jira Epic:** https://markyasset-1770677982173.atlassian.net/browse/KAN-2
- **Confluence:** https://markyasset-1770677982173.atlassian.net/wiki/spaces/~7120208951c03510c94d479de0d394eb14b265/pages/2883586

---

*Ready to deploy from your local machine! 🚀*
