import { useState, useEffect } from 'react';
import './BudgetTracker.css';

export const BudgetTracker = ({ totalExpenses }) => {
  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('monthly-budget');
    return saved ? parseFloat(saved) : 5000;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(budget);

  useEffect(() => {
    localStorage.setItem('monthly-budget', budget.toString());
  }, [budget]);

  const handleSave = () => {
    setBudget(parseFloat(inputValue) || 0);
    setIsEditing(false);
  };

  const percentage = budget > 0 ? (totalExpenses / budget) * 100 : 0;
  const remaining = budget - totalExpenses;
  const status = percentage >= 100 ? 'over' : percentage >= 80 ? 'warning' : 'good';

  return (
    <div className={`budget-tracker ${status}`}>
      <div className="budget-header">
        <h3>💰 MONTHLY BUDGET</h3>
        {!isEditing ? (
          <button className="btn-edit-budget" onClick={() => setIsEditing(true)}>
            EDIT
          </button>
        ) : null}
      </div>

      <div className="budget-content">
        {isEditing ? (
          <div className="budget-edit">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="budget-input"
              placeholder="Enter budget"
              autoFocus
            />
            <div className="budget-edit-buttons">
              <button className="btn-save-budget" onClick={handleSave}>
                SAVE
              </button>
              <button 
                className="btn-cancel-budget" 
                onClick={() => {
                  setInputValue(budget);
                  setIsEditing(false);
                }}
              >
                CANCEL
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="budget-amounts">
              <div className="budget-item">
                <span className="budget-label">BUDGET:</span>
                <span className="budget-value">₱{budget.toFixed(2)}</span>
              </div>
              <div className="budget-item">
                <span className="budget-label">SPENT:</span>
                <span className="budget-value spent">₱{totalExpenses.toFixed(2)}</span>
              </div>
              <div className="budget-item">
                <span className="budget-label">REMAINING:</span>
                <span className={`budget-value ${remaining < 0 ? 'negative' : 'positive'}`}>
                  ₱{remaining.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="budget-progress">
              <div className="progress-bar">
                <div 
                  className={`progress-fill ${status}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
              <div className="progress-label">
                {percentage.toFixed(1)}% USED
              </div>
            </div>

            {status === 'warning' && (
              <div className="budget-alert warning">
                ⚠️ WARNING: You've used {percentage.toFixed(0)}% of your budget!
              </div>
            )}

            {status === 'over' && (
              <div className="budget-alert danger">
                🚨 ALERT: Budget exceeded by ₱{Math.abs(remaining).toFixed(2)}!
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
