# ⚡ Quick CI/CD Setup (5 Minutes)

## Step 1: Deploy to Vercel (First Time)

```bash
cd expense-tracker-brutalist

# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel --prod
```

**Important:** When prompted:
- Select your account
- Create new project or link existing
- Use default settings (Vite will be auto-detected)

## Step 2: Get Your Credentials

After deploying, get your project info:

```bash
# This creates .vercel/project.json
cat .vercel/project.json
```

You'll see:
```json
{
  "orgId": "team_xxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxxx"
}
```

## Step 3: Get Vercel Token

1. Visit: https://vercel.com/account/tokens
2. Click **Create Token**
3. Name: `GitHub Actions`
4. Scope: `Full Account`
5. **Copy the token** (shown only once!)

## Step 4: Add to GitHub Secrets

1. Go to: https://github.com/marktantongco/expense-tracker-brutalist/settings/secrets/actions
2. Click **New repository secret** (3 times for each):

| Name | Value | From |
|------|-------|------|
| `VERCEL_TOKEN` | `vercel_xxxxxx` | Step 3 |
| `VERCEL_ORG_ID` | `team_xxxxx` | `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | `prj_xxxxx` | `.vercel/project.json` |

## Step 5: Test It! 🎉

Make any small change and push:

```bash
echo "# Test" >> README.md
git add README.md
git commit -m "Test CI/CD"
git push
```

Watch the magic happen:
- 🔗 Actions: https://github.com/marktantongco/expense-tracker-brutalist/actions
- 🚀 Vercel: https://vercel.com/dashboard

## ✅ Done!

Now every push automatically:
1. ✓ Builds your app
2. ✓ Runs checks
3. ✓ Deploys to Vercel
4. ✓ Gives you a live URL

Your app will be live at:
- **Production**: `https://expense-tracker-brutalist.vercel.app`
- **Custom domain**: Configure in Vercel dashboard

---

## 🆘 Troubleshooting

**Build fails?**
- Check GitHub Actions logs
- Ensure all dependencies are in `package.json`

**Deployment fails?**
- Verify all 3 secrets are correct
- Check token hasn't expired

**Need help?**
- Open an issue on GitHub
- Check Vercel docs: https://vercel.com/docs

Happy shipping! 🚀
