import { useState } from 'react'
import './App.css'
import { useExpenses } from './hooks/useExpenses'
import { ExpenseForm } from './components/ExpenseForm'
import { ExpenseItem } from './components/ExpenseItem'

function App() {
  const [showForm, setShowForm] = useState(false);
  const {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    resetExpenses,
    totalExpenses,
    totalIncome,
    netBalance
  } = useExpenses();

  return (
    <div className="container">
      {showForm && (
        <ExpenseForm 
          onAdd={addExpense} 
          onClose={() => setShowForm(false)} 
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
          + ADD TRANSACTION
        </button>
        <button className="btn-reset" onClick={() => {
          if (window.confirm('Reset to default expenses? This will delete all your data!')) {
            resetExpenses();
          }
        }}>
          ⟲ RESET DATA
        </button>
      </div>

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
        ) : (
          expenses.map((expense) => (
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
