import { useEffect, useRef } from 'react';
import './Charts.css';

export const Charts = ({ expenses }) => {
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  // Calculate category totals
  const categoryTotals = {};
  expenses.filter(e => !e.isIncome).forEach(expense => {
    const cat = expense.category;
    categoryTotals[cat] = (categoryTotals[cat] || 0) + Math.abs(expense.amount);
  });

  const categories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const totalExpenses = categories.reduce((sum, [, amount]) => sum + amount, 0);

  const incomeTotal = expenses
    .filter(e => e.isIncome)
    .reduce((sum, e) => sum + e.amount, 0);

  const expenseTotal = expenses
    .filter(e => !e.isIncome)
    .reduce((sum, e) => sum + Math.abs(e.amount), 0);

  // Draw Pie Chart
  useEffect(() => {
    if (!pieChartRef.current || categories.length === 0) return;

    const canvas = pieChartRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const colors = ['#ff0000', '#00ff00', '#ffff00', '#ff00ff', '#00ffff'];
    let startAngle = -Math.PI / 2;

    categories.forEach(([category, amount], index) => {
      const sliceAngle = (amount / totalExpenses) * 2 * Math.PI;
      
      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 4;
      ctx.stroke();

      startAngle += sliceAngle;
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw center text
    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('EXPENSES', centerX, centerY - 10);
    ctx.font = 'bold 20px Arial';
    ctx.fillText(`₱${totalExpenses.toFixed(0)}`, centerX, centerY + 15);
  }, [categories, totalExpenses]);

  // Draw Bar Chart
  useEffect(() => {
    if (!barChartRef.current) return;

    const canvas = barChartRef.current;
    const ctx = canvas.getContext('2d');
    const padding = 60;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw axes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw bars
    const barWidth = chartWidth / 3;
    const maxValue = Math.max(incomeTotal, expenseTotal);

    // Income bar
    const incomeHeight = (incomeTotal / maxValue) * chartHeight;
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(
      padding + barWidth * 0.2,
      canvas.height - padding - incomeHeight,
      barWidth * 0.6,
      incomeHeight
    );
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 4;
    ctx.strokeRect(
      padding + barWidth * 0.2,
      canvas.height - padding - incomeHeight,
      barWidth * 0.6,
      incomeHeight
    );

    // Expense bar
    const expenseHeight = (expenseTotal / maxValue) * chartHeight;
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(
      padding + barWidth * 1.2,
      canvas.height - padding - expenseHeight,
      barWidth * 0.6,
      expenseHeight
    );
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 4;
    ctx.strokeRect(
      padding + barWidth * 1.2,
      canvas.height - padding - expenseHeight,
      barWidth * 0.6,
      expenseHeight
    );

    // Labels
    ctx.fillStyle = '#000';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    
    ctx.fillText('INCOME', padding + barWidth * 0.5, canvas.height - padding + 25);
    ctx.fillText('EXPENSE', padding + barWidth * 1.5, canvas.height - padding + 25);

    // Values
    ctx.font = 'bold 16px Arial';
    ctx.fillText(`₱${incomeTotal.toFixed(0)}`, padding + barWidth * 0.5, canvas.height - padding - incomeHeight - 15);
    ctx.fillText(`₱${expenseTotal.toFixed(0)}`, padding + barWidth * 1.5, canvas.height - padding - expenseHeight - 15);
  }, [incomeTotal, expenseTotal]);

  return (
    <div className="charts-section">
      <div className="charts-header">
        <h2>📊 VISUAL CHARTS</h2>
      </div>

      <div className="charts-grid">
        {/* Pie Chart */}
        <div className="chart-container">
          <h3>CATEGORY BREAKDOWN</h3>
          <canvas ref={pieChartRef} width="400" height="400" />
          <div className="chart-legend">
            {categories.map(([category, amount], index) => (
              <div key={category} className="legend-item">
                <span 
                  className="legend-color" 
                  style={{ background: ['#ff0000', '#00ff00', '#ffff00', '#ff00ff', '#00ffff'][index % 5] }}
                />
                <span className="legend-label">{category}</span>
                <span className="legend-value">₱{amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="chart-container">
          <h3>INCOME VS EXPENSES</h3>
          <canvas ref={barChartRef} width="400" height="400" />
          <div className="chart-summary">
            <div className="summary-item green">
              <span>NET:</span>
              <span>₱{(incomeTotal - expenseTotal).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
