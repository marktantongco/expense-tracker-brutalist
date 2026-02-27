import './App.css'

function App() {
  const expenses = [
    {
      time: 'FEB 27 • 8:30 AM',
      category: '💰 Income Received',
      description: 'Send Money',
      amount: 3500.00,
      isIncome: true,
      ref: 'REF: INCOMING TRANSFER'
    },
    {
      time: 'FEB 27 • 9:25 AM',
      category: '👤 JR Asking',
      description: 'Sent GCash to USSC Money Services',
      amount: -515.00,
      ref: 'REF: 8038221885263 • ACCT ENDING 0722'
    },
    {
      time: 'FEB 27 • 10:01 AM',
      category: '❓ Unknown Transfer',
      description: 'Transfer to 09563768725',
      amount: -525.00,
      ref: 'REF: 8038222962043'
    },
    {
      time: 'FEB 27 • 10:11 AM',
      category: '🛒 Grocery',
      description: 'Coke, Tissue, Essentials • Bancnet P2M',
      amount: -863.50,
      ref: 'REF: 819783989 • QR PAYMENT'
    },
    {
      time: 'FEB 27 • 9:43 PM',
      category: '⚡ Electricity',
      description: 'Meralco KLoad 200',
      amount: -220.00,
      ref: 'REF: 822059756'
    },
    {
      time: 'FEB 28 • 12:07 AM',
      category: '🌳 Treetop',
      description: 'Online Payment - Link and Pay',
      amount: -96.00,
      ref: 'REF: ONLINE TRANSACTION'
    },
    {
      time: 'FEB 28 • 1:24 AM',
      category: '🏢 Green Residences',
      description: 'Online Payment - Link and Pay',
      amount: -95.00,
      ref: 'REF: ONLINE TRANSACTION'
    }
  ];

  const totalExpenses = expenses
    .filter(e => e.amount < 0)
    .reduce((sum, e) => sum + Math.abs(e.amount), 0);

  const totalIncome = expenses
    .filter(e => e.amount > 0)
    .reduce((sum, e) => sum + e.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="container">
      {/* HEADER */}
      <div className="header">
        <h1>EXPENSE<br />REPORT</h1>
        <div className="subtitle">Transaction Analysis // February 2026</div>
        <div className="date-stamp">AS OF: FEB 28, 2026</div>
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
        {expenses.map((expense, index) => (
          <div key={index} className={`expense-item ${expense.isIncome ? 'income' : ''}`}>
            <div className="expense-time">{expense.time}</div>
            <div className="expense-category">{expense.category}</div>
            <div className="expense-desc">{expense.description}</div>
            <div className={`expense-amount ${expense.amount < 0 ? 'negative' : 'positive'}`}>
              {expense.amount > 0 ? '+' : ''}₱{Math.abs(expense.amount).toFixed(2)}
            </div>
            <div className="expense-ref">{expense.ref}</div>
          </div>
        ))}
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
