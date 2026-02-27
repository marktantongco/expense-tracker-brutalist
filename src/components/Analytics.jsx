import './Analytics.css';

export const Analytics = ({ expenses }) => {
  // Calculate statistics
  const totalTransactions = expenses.length;
  const incomeCount = expenses.filter(e => e.isIncome).length;
  const expenseCount = expenses.filter(e => !e.isIncome).length;
  
  const totalIncome = expenses
    .filter(e => e.isIncome)
    .reduce((sum, e) => sum + e.amount, 0);
  
  const totalExpenses = expenses
    .filter(e => !e.isIncome)
    .reduce((sum, e) => sum + Math.abs(e.amount), 0);
  
  const avgExpense = expenseCount > 0 ? totalExpenses / expenseCount : 0;
  const avgIncome = incomeCount > 0 ? totalIncome / incomeCount : 0;
  
  // Find highest and lowest
  const expenseAmounts = expenses.filter(e => !e.isIncome);
  const highestExpense = expenseAmounts.length > 0 
    ? expenseAmounts.reduce((max, e) => Math.abs(e.amount) > Math.abs(max.amount) ? e : max)
    : null;
  
  const lowestExpense = expenseAmounts.length > 0
    ? expenseAmounts.reduce((min, e) => Math.abs(e.amount) < Math.abs(min.amount) ? e : min)
    : null;

  // Category breakdown
  const categoryTotals = {};
  expenses.filter(e => !e.isIncome).forEach(expense => {
    const cat = expense.category;
    categoryTotals[cat] = (categoryTotals[cat] || 0) + Math.abs(expense.amount);
  });
  
  const topCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="analytics-section">
      <div className="analytics-header">
        <h2>📊 ANALYTICS DASHBOARD</h2>
      </div>

      <div className="analytics-grid">
        {/* Summary Stats */}
        <div className="stat-card red">
          <div className="stat-label">TOTAL TRANSACTIONS</div>
          <div className="stat-value">{totalTransactions}</div>
          <div className="stat-detail">
            {incomeCount} income • {expenseCount} expenses
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-label">AVERAGE INCOME</div>
          <div className="stat-value">₱{avgIncome.toFixed(2)}</div>
          <div className="stat-detail">{incomeCount} transactions</div>
        </div>

        <div className="stat-card yellow">
          <div className="stat-label">AVERAGE EXPENSE</div>
          <div className="stat-value">₱{avgExpense.toFixed(2)}</div>
          <div className="stat-detail">{expenseCount} transactions</div>
        </div>

        {/* Highest/Lowest */}
        {highestExpense && (
          <div className="stat-card white">
            <div className="stat-label">HIGHEST EXPENSE</div>
            <div className="stat-value">₱{Math.abs(highestExpense.amount).toFixed(2)}</div>
            <div className="stat-detail">{highestExpense.category}</div>
          </div>
        )}

        {lowestExpense && (
          <div className="stat-card white">
            <div className="stat-label">LOWEST EXPENSE</div>
            <div className="stat-value">₱{Math.abs(lowestExpense.amount).toFixed(2)}</div>
            <div className="stat-detail">{lowestExpense.category}</div>
          </div>
        )}

        {/* Top Categories */}
        {topCategories.length > 0 && (
          <div className="stat-card black full-width">
            <div className="stat-label">TOP SPENDING CATEGORIES</div>
            <div className="category-list">
              {topCategories.map(([category, amount], index) => (
                <div key={category} className="category-item">
                  <span className="category-rank">#{index + 1}</span>
                  <span className="category-name">{category}</span>
                  <span className="category-amount">₱{amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
