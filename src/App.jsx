import { useState, useMemo } from 'react'
import './App.css'
import { useExpenses } from './hooks/useExpenses'
import { ExpenseForm } from './components/ExpenseForm'
import { ExpenseItem } from './components/ExpenseItem'
import { ImportExport } from './components/ImportExport'
import { FilterPanel } from './components/FilterPanel'
import { Analytics } from './components/Analytics'
import { BudgetTracker } from './components/BudgetTracker'

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    type: 'all',
    search: '',
    minAmount: '',
    maxAmount: ''
  });

  const {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    resetExpenses,
    importExpenses,
    totalExpenses,
    totalIncome,
    netBalance
  } = useExpenses();

  // Filter expenses based on active filters
  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      // Type filter
      if (filters.type === 'income' && !expense.isIncome) return false;
      if (filters.type === 'expense' && expense.isIncome) return false;

      // Category filter
      if (filters.category && !expense.category.toLowerCase().includes(filters.category.toLowerCase())) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesDescription = expense.description.toLowerCase().includes(searchLower);
        const matchesRef = expense.ref.toLowerCase().includes(searchLower);
        if (!matchesDescription && !matchesRef) return false;
      }

      // Amount range filter
      const amount = Math.abs(expense.amount);
      if (filters.minAmount && amount < parseFloat(filters.minAmount)) return false;
      if (filters.maxAmount && amount > parseFloat(filters.maxAmount)) return false;

      return true;
    });
  }, [expenses, filters]);

  const hasActiveFilters = filters.category || filters.type !== 'all' || filters.search || 
                          filters.minAmount || filters.maxAmount;

  return (
    <div className="container">
      {showForm && (
        <ExpenseForm 
          onAdd={addExpense} 
          onClose={() => setShowForm(false)} 
        />
      )}

      {showImportExport && (
        <ImportExport
          expenses={expenses}
          onImport={importExpenses}
          onClose={() => setShowImportExport(false)}
        />
      )}

      {/* HEADER */}
      <div className="header">
        <h1>EXPENSE<br />REPORT</h1>
        <div className="subtitle">Transaction Analysis // February 2026</div>
        <div className="date-stamp">AS OF: FEB 28, 2026</div>
      </div>

      {/* CONTROL BUTTONS */}
      <div className="controls">
        <button className="btn-add" onClick={() => setShowForm(true)}>
          + ADD
        </button>
        <button className="btn-filter" onClick={() => setShowFilters(!showFilters)}>
          🔍 FILTER {hasActiveFilters ? '●' : ''}
        </button>
        <button className="btn-analytics" onClick={() => setShowAnalytics(!showAnalytics)}>
          📊 ANALYTICS
        </button>
        <button className="btn-import-export" onClick={() => setShowImportExport(true)}>
          📁 IMPORT/EXPORT
        </button>
        <button className="btn-reset" onClick={() => {
          if (window.confirm('Reset to default expenses? This will delete all your data!')) {
            resetExpenses();
          }
        }}>
          ⟲ RESET
        </button>
      </div>

      {/* FILTER PANEL */}
      {showFilters && (
        <FilterPanel
          onFilterChange={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      {/* ANALYTICS */}
      {showAnalytics && <Analytics expenses={expenses} />}

      {/* BUDGET TRACKER */}
      <BudgetTracker totalExpenses={totalExpenses} />

      {/* TOTAL EXPENSE */}
      <div className="total-section">
        <div className="total-label">Total Expenses</div>
        <div className="total-amount">
          <span className="total-pesos">₱</span>{totalExpenses.toFixed(2)}
        </div>
      </div>

      {/* TIMELINE */}
      <div className="timeline-header">
        ⚡ Transaction Timeline
      </div>

      <div className="timeline">
        {expenses.length === 0 ? (
          <div className="no-expenses">
            <h3>NO TRANSACTIONS YET</h3>
            <p>Click "ADD TRANSACTION" to get started!</p>
          </div>
        ) : filteredExpenses.length === 0 ? (
          <div className="no-expenses">
            <h3>NO MATCHES FOUND</h3>
            <p>Try adjusting your filters!</p>
          </div>
        ) : (
          filteredExpenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onUpdate={updateExpense}
              onDelete={deleteExpense}
            />
          ))
        )}
      </div>

      <div className="brutal-line"></div>

      {/* WARNING BOX */}
      <div className="warning-box">
        ⚠️ TOTAL OUTFLOW: ₱{totalExpenses.toFixed(2)}<br />
        <span style={{ fontSize: '16px', marginTop: '10px', display: 'block' }}>
          {expenses.filter(e => e.amount < 0).length} TRANSACTIONS RECORDED
        </span>
      </div>

      {/* FOOTER */}
      <div className="footer">
        NET BALANCE
        <div className="net-balance">₱{netBalance.toFixed(2)}</div>
        <div style={{ fontSize: '16px', marginTop: '20px', letterSpacing: '2px' }}>
          REMAINING AFTER EXPENSES
        </div>
      </div>
    </div>
  )
}

export default App
