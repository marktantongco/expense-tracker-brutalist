import { useState, useEffect } from 'react';
import './RecurringTransactions.css';

export const RecurringTransactions = ({ onAddRecurring }) => {
  const [recurring, setRecurring] = useState(() => {
    const saved = localStorage.getItem('recurring-transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    amount: '',
    frequency: 'monthly', // daily, weekly, monthly, yearly
    dayOfMonth: '1',
    enabled: true
  });

  useEffect(() => {
    localStorage.setItem('recurring-transactions', JSON.stringify(recurring));
    
    // Check for due recurring transactions
    const checkRecurring = () => {
      const today = new Date();
      
      recurring.forEach(rec => {
        if (!rec.enabled) return;
        
        const lastRun = rec.lastRun ? new Date(rec.lastRun) : null;
        let shouldRun = false;
        
        if (rec.frequency === 'daily') {
          shouldRun = !lastRun || (today.getDate() !== lastRun.getDate());
        } else if (rec.frequency === 'weekly') {
          const daysDiff = lastRun ? Math.floor((today - lastRun) / (1000 * 60 * 60 * 24)) : 7;
          shouldRun = daysDiff >= 7;
        } else if (rec.frequency === 'monthly') {
          shouldRun = !lastRun || (today.getMonth() !== lastRun.getMonth() && today.getDate() >= parseInt(rec.dayOfMonth));
        } else if (rec.frequency === 'yearly') {
          shouldRun = !lastRun || today.getFullYear() !== lastRun.getFullYear();
        }
        
        if (shouldRun) {
          // Add transaction
          const now = new Date();
          const timeStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + 
                         ' • ' + now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
          
          onAddRecurring({
            time: timeStr.toUpperCase(),
            category: rec.category,
            description: `${rec.description} (Recurring)`,
            amount: parseFloat(rec.amount),
            ref: `REF: RECURRING-${rec.id}`
          });
          
          // Update last run
          rec.lastRun = today.toISOString();
          setRecurring([...recurring]);
        }
      });
    };
    
    checkRecurring();
    const interval = setInterval(checkRecurring, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [recurring, onAddRecurring]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newRecurring = {
      id: Date.now(),
      ...formData,
      amount: parseFloat(formData.amount),
      lastRun: null
    };
    
    setRecurring([...recurring, newRecurring]);
    setFormData({
      category: '',
      description: '',
      amount: '',
      frequency: 'monthly',
      dayOfMonth: '1',
      enabled: true
    });
    setShowForm(false);
  };

  const toggleRecurring = (id) => {
    setRecurring(recurring.map(rec => 
      rec.id === id ? { ...rec, enabled: !rec.enabled } : rec
    ));
  };

  const deleteRecurring = (id) => {
    if (window.confirm('Delete this recurring transaction?')) {
      setRecurring(recurring.filter(rec => rec.id !== id));
    }
  };

  return (
    <div className="recurring-section">
      <div className="recurring-header">
        <h2>🔁 RECURRING TRANSACTIONS</h2>
        <button className="btn-add-recurring" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ CANCEL' : '+ ADD RECURRING'}
        </button>
      </div>

      {showForm && (
        <form className="recurring-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              placeholder="Category (e.g., 💡 Electricity)"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          
          <div className="form-row">
            <input
              type="number"
              step="0.01"
              placeholder="Amount (- for expense, + for income)"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {formData.frequency === 'monthly' && (
            <div className="form-row">
              <label>Day of Month:</label>
              <input
                type="number"
                min="1"
                max="31"
                value={formData.dayOfMonth}
                onChange={(e) => setFormData({ ...formData, dayOfMonth: e.target.value })}
              />
            </div>
          )}

          <button type="submit" className="btn-save-recurring">
            SAVE RECURRING
          </button>
        </form>
      )}

      <div className="recurring-list">
        {recurring.length === 0 ? (
          <div className="no-recurring">
            <p>NO RECURRING TRANSACTIONS SET</p>
          </div>
        ) : (
          recurring.map(rec => (
            <div key={rec.id} className={`recurring-item ${!rec.enabled ? 'disabled' : ''}`}>
              <div className="recurring-info">
                <div className="recurring-category">{rec.category}</div>
                <div className="recurring-description">{rec.description}</div>
                <div className="recurring-details">
                  {rec.frequency.toUpperCase()}
                  {rec.frequency === 'monthly' && ` - Day ${rec.dayOfMonth}`}
                  {rec.lastRun && ` • Last: ${new Date(rec.lastRun).toLocaleDateString()}`}
                </div>
              </div>
              <div className="recurring-amount">
                {rec.amount > 0 ? '+' : ''}₱{Math.abs(rec.amount).toFixed(2)}
              </div>
              <div className="recurring-actions">
                <button
                  className={`btn-toggle ${rec.enabled ? 'active' : ''}`}
                  onClick={() => toggleRecurring(rec.id)}
                >
                  {rec.enabled ? 'ENABLED' : 'DISABLED'}
                </button>
                <button
                  className="btn-delete-recurring"
                  onClick={() => deleteRecurring(rec.id)}
                >
                  DELETE
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
