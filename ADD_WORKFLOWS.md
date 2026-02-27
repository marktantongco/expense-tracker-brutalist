# 🔧 Add GitHub Actions Workflows

Due to GitHub OAuth permissions, workflows need to be added manually or via Personal Access Token.

## Option 1: Manual Setup (Easiest) ✅

### Step 1: Create Workflow Files on GitHub

1. Go to your repo: https://github.com/marktantongco/expense-tracker-brutalist
2. Click **Add file** → **Create new file**
3. Create these two files:

---

### File 1: `.github/workflows/ci.yml`

```yaml
name: CI - Build and Test

on:
  push:
    branches:
      - master
      - main
  pull_request:
    branches:
      - master
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint code
        run: npm run lint || echo "No lint script found, skipping..."

      - name: Build project
        run: npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
          retention-days: 7
```

---

### File 2: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - master
      - main
  pull_request:
    branches:
      - master
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: '**/package-lock.json'

      - name: Install dependencies
        run: npm ci

      - name: Build project
        run: npm run build

      - name: Deploy to Vercel (Production)
        if: github.event_name == 'push' && (github.ref == 'refs/heads/master' || github.ref == 'refs/heads/main')
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./

      - name: Deploy to Vercel (Preview)
        if: github.event_name == 'pull_request'
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./
```

---

### Step 2: Commit the Files

- Click **Commit changes** for each file
- Commit directly to `master` branch

---

## Option 2: Use Personal Access Token (Advanced) 🔐

If you want to push workflows via CLI:

### 1. Create GitHub PAT

1. Go to: https://github.com/settings/tokens
2. Click **Generate new token (classic)**
3. Name: `Workflow Management`
4. Select scopes:
   - ✅ `repo` (all)
   - ✅ `workflow`
5. Click **Generate token**
6. **Copy the token** (you'll only see it once!)

### 2. Update Git Remote

```bash
cd expense-tracker-brutalist

# Remove current remote
git remote remove origin

# Add new remote with token
git remote add origin https://YOUR_TOKEN@github.com/marktantongco/expense-tracker-brutalist.git

# Push workflows
git add .github/workflows/
git commit -m "Add CI/CD workflows"
git push origin master
```

---

## Option 3: Use SSH (Recommended) 🔑

```bash
cd expense-tracker-brutalist

# Remove HTTPS remote
git remote remove origin

# Add SSH remote
git remote add origin git@github.com:marktantongco/expense-tracker-brutalist.git

# Push workflows
git add .github/workflows/
git commit -m "Add CI/CD workflows"
git push origin master
```

---

## ✅ Verify Setup

After adding workflows:

1. Go to: https://github.com/marktantongco/expense-tracker-brutalist/actions
2. You should see **2 workflows**:
   - ✓ CI - Build and Test
   - ✓ Deploy to Vercel

3. Make a test commit to trigger them!

---

## 🎉 Next Steps

Once workflows are added:
1. Follow `SETUP_CICD.md` to configure Vercel secrets
2. Push a change to trigger automatic deployment
3. Watch your app deploy automatically! 🚀

---

## Need Help?

- **GitHub Actions Docs**: https://docs.github.com/en/actions
- **Vercel GitHub Integration**: https://vercel.com/docs/deployments/git
- **Issues**: Open an issue on this repo

Happy automating! ⚡
