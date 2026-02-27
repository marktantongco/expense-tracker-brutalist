# 🧪 Testing Guide - Brutalist Expense Tracker

## Testing Setup

### Install Testing Dependencies

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### Configure Vitest

Create `vitest.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})
```

### Setup File

Create `src/test/setup.js`:

```javascript
import '@testing-library/jest-dom'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock
```

## Test Examples

### 1. Component Tests

**Test ExpenseForm Component:**

```javascript
// src/components/__tests__/ExpenseForm.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { ExpenseForm } from '../ExpenseForm'

describe('ExpenseForm', () => {
  it('renders form fields', () => {
    const onAdd = vi.fn()
    const onClose = vi.fn()
    
    render(<ExpenseForm onAdd={onAdd} onClose={onClose} />)
    
    expect(screen.getByPlaceholderText(/time/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/category/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/amount/i)).toBeInTheDocument()
  })

  it('calls onAdd with form data', () => {
    const onAdd = vi.fn()
    const onClose = vi.fn()
    
    render(<ExpenseForm onAdd={onAdd} onClose={onClose} />)
    
    fireEvent.change(screen.getByPlaceholderText(/time/i), {
      target: { value: 'FEB 27 • 9:00 AM' }
    })
    fireEvent.change(screen.getByPlaceholderText(/category/i), {
      target: { value: '🛒 Grocery' }
    })
    fireEvent.change(screen.getByPlaceholderText(/amount/i), {
      target: { value: '-100' }
    })
    
    fireEvent.click(screen.getByText(/add transaction/i))
    
    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        category: '🛒 Grocery',
        amount: -100
      })
    )
    expect(onClose).toHaveBeenCalled()
  })
})
```

### 2. Hook Tests

**Test useExpenses Hook:**

```javascript
// src/hooks/__tests__/useExpenses.test.js
import { renderHook, act } from '@testing-library/react'
import { useExpenses } from '../useExpenses'

describe('useExpenses', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('loads default expenses', () => {
    const { result } = renderHook(() => useExpenses())
    
    expect(result.current.expenses).toHaveLength(7)
  })

  it('adds new expense', () => {
    const { result } = renderHook(() => useExpenses())
    
    act(() => {
      result.current.addExpense({
        time: 'FEB 28 • 10:00 AM',
        category: '🍔 Food',
        description: 'Lunch',
        amount: -150,
        ref: 'REF: 123'
      })
    })
    
    expect(result.current.expenses).toHaveLength(8)
    expect(result.current.expenses[0].category).toBe('🍔 Food')
  })

  it('calculates totals correctly', () => {
    const { result } = renderHook(() => useExpenses())
    
    expect(result.current.totalExpenses).toBeGreaterThan(0)
    expect(result.current.totalIncome).toBeGreaterThan(0)
    expect(result.current.netBalance).toBe(
      result.current.totalIncome - result.current.totalExpenses
    )
  })

  it('deletes expense', () => {
    const { result } = renderHook(() => useExpenses())
    const initialLength = result.current.expenses.length
    const idToDelete = result.current.expenses[0].id
    
    act(() => {
      result.current.deleteExpense(idToDelete)
    })
    
    expect(result.current.expenses).toHaveLength(initialLength - 1)
    expect(result.current.expenses.find(e => e.id === idToDelete)).toBeUndefined()
  })
})
```

### 3. Utility Tests

**Test Export Utils:**

```javascript
// src/utils/__tests__/exportUtils.test.js
import { importFromCSV, importFromJSON } from '../exportUtils'

describe('exportUtils', () => {
  describe('importFromCSV', () => {
    it('parses CSV correctly', () => {
      const csv = `ID,Time,Category,Description,Amount,Type,Reference
1,"FEB 27 • 9:00 AM","🛒 Grocery","Test",-100,"Expense","REF: 123"`

      const result = importFromCSV(csv)
      
      expect(result).toHaveLength(1)
      expect(result[0].category).toBe('🛒 Grocery')
      expect(result[0].amount).toBe(-100)
    })
  })

  describe('importFromJSON', () => {
    it('parses JSON correctly', () => {
      const json = JSON.stringify([
        {
          id: 1,
          time: 'FEB 27 • 9:00 AM',
          category: '🛒 Grocery',
          amount: -100
        }
      ])

      const result = importFromJSON(json)
      
      expect(result).toHaveLength(1)
      expect(result[0].category).toBe('🛒 Grocery')
    })

    it('throws on invalid JSON', () => {
      expect(() => importFromJSON('invalid')).toThrow()
    })
  })
})
```

### 4. Integration Tests

**Test Full App Flow:**

```javascript
// src/__tests__/App.integration.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

describe('App Integration', () => {
  it('adds and displays new expense', () => {
    render(<App />)
    
    // Open form
    fireEvent.click(screen.getByText(/\+ add/i))
    
    // Fill form
    fireEvent.change(screen.getByPlaceholderText(/time/i), {
      target: { value: 'FEB 28 • 10:00 AM' }
    })
    fireEvent.change(screen.getByPlaceholderText(/category/i), {
      target: { value: '🍔 Food' }
    })
    fireEvent.change(screen.getByPlaceholderText(/amount/i), {
      target: { value: '-150' }
    })
    
    // Submit
    fireEvent.click(screen.getByText(/add transaction/i))
    
    // Verify
    expect(screen.getByText(/🍔 food/i)).toBeInTheDocument()
    expect(screen.getByText(/₱150.00/i)).toBeInTheDocument()
  })

  it('filters expenses by category', () => {
    render(<App />)
    
    // Open filters
    fireEvent.click(screen.getByText(/filter/i))
    
    // Set filter
    fireEvent.change(screen.getByPlaceholderText(/filter by category/i), {
      target: { value: 'Grocery' }
    })
    
    // Check filtered results
    const items = screen.getAllByText(/grocery/i)
    expect(items.length).toBeGreaterThan(0)
  })
})
```

## Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm test -- --watch

# Run specific file
npm test ExpenseForm.test
```

## Test Coverage Goals

- **Components:** 80%+ coverage
- **Hooks:** 90%+ coverage
- **Utilities:** 95%+ coverage
- **Overall:** 85%+ coverage

## E2E Testing (Optional)

### Using Playwright

```bash
npm install --save-dev @playwright/test
```

**Example E2E Test:**

```javascript
// e2e/expense-tracker.spec.js
import { test, expect } from '@playwright/test'

test('complete expense flow', async ({ page }) => {
  await page.goto('http://localhost:5173')
  
  // Add expense
  await page.click('text=+ ADD')
  await page.fill('input[name="time"]', 'FEB 28 • 10:00 AM')
  await page.fill('input[name="category"]', '🍔 Food')
  await page.fill('input[name="amount"]', '-150')
  await page.click('text=ADD TRANSACTION')
  
  // Verify
  await expect(page.locator('text=🍔 Food')).toBeVisible()
  
  // Export
  await page.click('text=IMPORT/EXPORT')
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('text=EXPORT CSV')
  ])
  
  expect(download.suggestedFilename()).toBe('expenses.csv')
})
```

## Manual Testing Checklist

### Core Features
- [ ] Add transaction
- [ ] Edit transaction
- [ ] Delete transaction
- [ ] Reset data

### Export/Import
- [ ] Export to CSV
- [ ] Export to JSON
- [ ] Import CSV (merge)
- [ ] Import CSV (replace)
- [ ] Import JSON (merge)
- [ ] Import JSON (replace)

### Filtering
- [ ] Filter by category
- [ ] Filter by type
- [ ] Search by description
- [ ] Amount range filter
- [ ] Clear all filters

### Analytics
- [ ] View statistics
- [ ] View charts
- [ ] Category breakdown

### Budget
- [ ] Set budget
- [ ] View progress
- [ ] Warning alert at 80%
- [ ] Danger alert at 100%

### UI/UX
- [ ] Dark mode toggle
- [ ] Responsive mobile
- [ ] Responsive tablet
- [ ] Responsive desktop
- [ ] Form validation
- [ ] Confirmation dialogs

### Performance
- [ ] Fast load time
- [ ] Smooth animations
- [ ] No memory leaks
- [ ] localStorage working

## CI/CD Integration

**GitHub Actions Workflow:**

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - run: npm ci
      - run: npm test -- --coverage
      - run: npm run build
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

## Best Practices

1. **Write tests first** - TDD approach
2. **Test user behavior** - Not implementation details
3. **Keep tests simple** - One assertion per test
4. **Use descriptive names** - Clear test descriptions
5. **Mock external dependencies** - localStorage, APIs
6. **Test edge cases** - Empty states, errors, limits
7. **Maintain coverage** - Don't let it drop below 80%

---

*Ready for robust testing! 🧪*
