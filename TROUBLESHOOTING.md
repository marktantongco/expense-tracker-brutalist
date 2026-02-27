# 🔧 Troubleshooting - Blank White Page

## 🚨 Issue: Blank White Page

If you're seeing a blank white page, here are the steps to fix it:

---

## ✅ Quick Fix Checklist

### 1. Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for red error messages
4. Common errors and fixes below

### 2. Common Errors & Solutions

#### **Error: "Cannot find module"**
**Fix:** Missing import or component

```bash
# Reinstall dependencies
cd expense-tracker-brutalist
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### **Error: Component not found**
**Fix:** Check all imports exist

Verify these files exist:
```
src/components/DarkModeToggle.jsx
src/components/CurrencySelector.jsx
src/components/RecurringTransactions.jsx
src/components/ReceiptUpload.jsx
src/components/Charts.jsx
src/components/Analytics.jsx
src/components/BudgetTracker.jsx
src/components/FilterPanel.jsx
src/components/ImportExport.jsx
src/components/ExpenseForm.jsx
src/components/ExpenseItem.jsx
```

#### **Error: Hook errors**
**Fix:** Check hooks/useExpenses.js exists

```bash
ls -la src/hooks/useExpenses.js
```

#### **Error: CSS not loading**
**Fix:** Verify all CSS files exist

```bash
ls -la src/components/*.css
```

---

## 🛠️ Step-by-Step Debug

### Step 1: Test Basic App
Create a minimal test file:

```bash
# Backup current App.jsx
cp src/App.jsx src/App.jsx.backup

# Create minimal test
cat > src/App.jsx << 'EOF'
function App() {
  return (
    <div style={{ padding: '50px', fontFamily: 'Arial' }}>
      <h1>TEST - App is Working!</h1>
      <p>If you see this, React is loading correctly.</p>
    </div>
  )
}

export default App
EOF

# Test
npm run dev
```

If this works, the issue is in component imports.

### Step 2: Add Components Gradually

```jsx
// Test 1: Add hooks
import { useExpenses } from './hooks/useExpenses'

function App() {
  const { expenses } = useExpenses()
  return <div><h1>Expenses: {expenses.length}</h1></div>
}
```

```jsx
// Test 2: Add one component
import { ExpenseForm } from './components/ExpenseForm'

function App() {
  return (
    <div>
      <h1>Testing ExpenseForm</h1>
      <ExpenseForm onAdd={() => {}} onClose={() => {}} />
    </div>
  )
}
```

### Step 3: Identify Broken Component
Test each component one by one to find which causes the blank page.

---

## 🔍 Detailed Debugging

### Check File Structure
```bash
cd expense-tracker-brutalist

# Verify all files exist
find src -name "*.jsx" -o -name "*.js"

# Should show:
# src/App.jsx
# src/main.jsx
# src/hooks/useExpenses.js
# src/utils/exportUtils.js
# src/components/[all 11 components].jsx
```

### Check for Syntax Errors
```bash
# Install ESLint (if not already)
npm install --save-dev eslint

# Check for errors
npx eslint src/**/*.jsx
```

### Check Import Paths
```bash
# Verify all imports are correct
grep -r "import.*from" src/App.jsx
```

---

## 🚀 Nuclear Option - Fresh Start

If nothing works, rebuild from backup:

```bash
# Clone fresh copy
cd ..
git clone https://github.com/marktantongco/expense-tracker-brutalist.git expense-tracker-test
cd expense-tracker-test

# Install
npm install

# Run
npm run dev
```

---

## 📱 Test on Different Browser

Sometimes it's browser-specific:
- ✅ Try Chrome
- ✅ Try Firefox  
- ✅ Try Edge
- ✅ Clear cache (Ctrl+Shift+Delete)
- ✅ Try Incognito mode

---

## 🔧 Specific Fix: Missing Components

If components are missing, here's the order to create them:

### Priority 1 (Core)
1. `src/hooks/useExpenses.js`
2. `src/components/ExpenseItem.jsx`
3. `src/components/ExpenseForm.jsx`

### Priority 2 (Enhanced)
4. `src/components/ImportExport.jsx`
5. `src/components/FilterPanel.jsx`
6. `src/components/Analytics.jsx`
7. `src/components/BudgetTracker.jsx`

### Priority 3 (Premium)
8. `src/components/DarkModeToggle.jsx`
9. `src/components/Charts.jsx`
10. `src/components/RecurringTransactions.jsx`
11. `src/components/CurrencySelector.jsx`
12. `src/components/ReceiptUpload.jsx`

---

## 📝 Create Minimal Working Version

If you need a quick working version:

```jsx
// src/App.jsx - Minimal Version
import { useState } from 'react'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Test', amount: -100, description: 'Test expense' }
  ])

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <h1>EXPENSE TRACKER - TEST MODE</h1>
      
      {expenses.map(exp => (
        <div key={exp.id} style={{
          border: '4px solid black',
          padding: '20px',
          marginBottom: '10px',
          background: 'white'
        }}>
          <div>{exp.category}</div>
          <div>₱{Math.abs(exp.amount)}</div>
        </div>
      ))}
      
      <button onClick={() => setExpenses([...expenses, {
        id: Date.now(),
        category: 'New',
        amount: -50,
        description: 'New expense'
      }])} style={{
        padding: '15px 30px',
        fontSize: '18px',
        background: '#00ff00',
        border: '4px solid black',
        cursor: 'pointer'
      }}>
        ADD EXPENSE
      </button>
    </div>
  )
}

export default App
```

This gives you a working base to build from.

---

## 🆘 Get Help

If still stuck:

1. **Check Console Errors** - Copy exact error message
2. **Check Network Tab** - Look for failed resource loads
3. **Check File Paths** - Verify case sensitivity
4. **Check Node Version** - Should be 18+

```bash
node --version  # Should be v18 or higher
npm --version   # Should be 9 or higher
```

---

## ✅ Success Indicators

You should see:
- ✅ Page loads with content
- ✅ No errors in console
- ✅ Can click buttons
- ✅ Can add transactions
- ✅ localStorage saves data

---

## 🎯 Most Likely Causes

Based on common issues:

1. **Missing CSS imports** (40% of cases)
2. **Component not found** (30% of cases)
3. **Hook error** (20% of cases)
4. **Browser cache** (10% of cases)

**Quick test:** Hard refresh (Ctrl+Shift+R)

---

## 📞 Contact

If you've tried everything:
- Check GitHub Issues
- Review documentation
- Test in minimal environment
- Use browser DevTools

---

*Good luck! The app should work perfectly once dependencies are properly installed.* 🚀
