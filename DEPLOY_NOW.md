# 🚀 Deploy to GitHub Pages - Quick Guide

## ✅ Your Project is Ready!

All configuration is done. Just follow these steps on your local machine:

---

## 🎯 Deploy in 3 Commands (Recommended)

```bash
# 1. Clone the repository (if you haven't already)
git clone https://github.com/marktantongco/expense-tracker-brutalist.git
cd expense-tracker-brutalist

# 2. Install dependencies
npm install

# 3. Deploy to GitHub Pages
npm run deploy
```

**That's it!** Your site will be live at:
**https://marktantongco.github.io/expense-tracker-brutalist/**

---

## 🔧 What Happens When You Deploy

1. ✅ Builds your React app (`npm run build`)
2. ✅ Creates a `gh-pages` branch (if it doesn't exist)
3. ✅ Pushes the `dist` folder to `gh-pages` branch
4. ✅ GitHub automatically serves it

---

## ⚙️ Enable GitHub Pages (First Time Only)

After running `npm run deploy`, go to:

**https://github.com/marktantongco/expense-tracker-brutalist/settings/pages**

Ensure:
- **Source**: Deploy from a branch
- **Branch**: `gh-pages` → `/ (root)`
- Click **Save**

GitHub will automatically deploy within 1-2 minutes.

---

## 🌐 Your Live URL

**https://marktantongco.github.io/expense-tracker-brutalist/**

Share this URL anywhere!

---

## 🔄 Update Your Deployment

Every time you make changes:

```bash
git add .
git commit -m "Update expense tracker"
git push origin master

# Deploy the changes
npm run deploy
```

---

## 🎨 Alternative: Manual Workflow on GitHub

If you prefer automated deployments on every push:

1. Go to: https://github.com/marktantongco/expense-tracker-brutalist
2. Create file: `.github/workflows/deploy-pages.yml`
3. Use the workflow from `GITHUB_PAGES_SETUP.md`
4. Enable Pages with source: **GitHub Actions**

---

## ✅ Verification

Once deployed:
1. Check Pages status: https://github.com/marktantongco/expense-tracker-brutalist/deployments
2. Visit your site: https://marktantongco.github.io/expense-tracker-brutalist/
3. Share with the world! 🎉

---

## 📋 Current Configuration

✅ **vite.config.js** - Base path configured  
✅ **package.json** - Deploy scripts added  
✅ **gh-pages** - Package installed  
✅ **Repository** - All code pushed  

**Ready to deploy!** Just run `npm run deploy` on your local machine.

---

## 🆘 Troubleshooting

**404 Error after deployment?**
- Wait 2-3 minutes for GitHub to propagate changes
- Check Pages settings are correct
- Clear browser cache

**Build fails?**
- Ensure you have Node.js 18+ installed
- Delete `node_modules` and run `npm install` again

**Permission denied?**
- Make sure you're logged into GitHub CLI: `gh auth login`
- Or use HTTPS with your GitHub token

---

## 🎉 Next Steps

Once live:
- Share your URL on social media
- Add a custom domain (optional)
- Enable HTTPS (automatic with GitHub Pages)
- Monitor with GitHub Analytics

Happy deploying! 🚀
