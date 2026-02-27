# 🚀 CI/CD Deployment Guide

This project uses GitHub Actions for automated deployment to Vercel.

## 📋 Setup Instructions

### 1. Get Vercel Credentials

First, you need to get your Vercel credentials:

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
cd expense-tracker-brutalist
vercel link

# Get your credentials
vercel project ls
```

This will create a `.vercel` folder with:
- Project ID
- Organization ID

### 2. Get Vercel Token

1. Go to https://vercel.com/account/tokens
2. Click **Create Token**
3. Name it: `GitHub Actions Token`
4. Copy the token (you'll only see it once!)

### 3. Add GitHub Secrets

Go to your GitHub repository settings:

1. Navigate to: `Settings` → `Secrets and variables` → `Actions`
2. Click **New repository secret**
3. Add these three secrets:

| Secret Name | Description | Where to find it |
|-------------|-------------|------------------|
| `VERCEL_TOKEN` | Your Vercel API token | https://vercel.com/account/tokens |
| `VERCEL_ORG_ID` | Your Vercel organization ID | `.vercel/project.json` → `orgId` |
| `VERCEL_PROJECT_ID` | Your Vercel project ID | `.vercel/project.json` → `projectId` |

### 4. Alternative: Quick Setup Script

Run this in your terminal:

```bash
# Get the values from .vercel/project.json
cat .vercel/project.json

# You'll see something like:
# {
#   "orgId": "team_xxxxxxxxx",
#   "projectId": "prj_xxxxxxxxx"
# }
```

Then add these to GitHub:
- Go to: https://github.com/marktantongco/expense-tracker-brutalist/settings/secrets/actions
- Add the three secrets mentioned above

## 🔄 How It Works

### Automatic Deployments

Once configured, your workflow will:

1. **On Push to `master`/`main`:**
   - ✅ Run CI checks (lint, build)
   - 🚀 Deploy to Vercel Production
   - 📦 Create build artifacts

2. **On Pull Requests:**
   - ✅ Run CI checks
   - 🔍 Deploy preview to Vercel
   - 💬 Comment with preview URL

### Manual Deployment

You can also deploy manually:

```bash
# Production deployment
vercel --prod

# Preview deployment
vercel
```

## 📊 Workflow Status

Check your deployment status:
- **GitHub Actions**: https://github.com/marktantongco/expense-tracker-brutalist/actions
- **Vercel Dashboard**: https://vercel.com/dashboard

## 🛠️ Troubleshooting

### Build Fails?
- Check Node.js version (we use v20)
- Ensure `package-lock.json` is committed
- Review build logs in GitHub Actions

### Deployment Fails?
- Verify secrets are correctly set
- Check Vercel token hasn't expired
- Ensure Project ID and Org ID match

### Need Help?
- Check logs: https://github.com/marktantongco/expense-tracker-brutalist/actions
- Vercel docs: https://vercel.com/docs/deployments/git

## 🎉 You're All Set!

Now every push to `master` will automatically:
1. ✅ Build your project
2. ✅ Run checks
3. 🚀 Deploy to production
4. 📧 Notify you of success/failure

Happy deploying! 🚀
