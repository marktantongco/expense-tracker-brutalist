import { useState } from 'react';
import './ExpenseItem.css';

export const ExpenseItem = ({ expense, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(expense);

  const handleSave = () => {
    onUpdate(expense.id, formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(expense);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isEditing) {
    return (
      <div className={`expense-item editing ${expense.isIncome ? 'income' : ''}`}>
        <div className="edit-form">
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Time"
            className="edit-input"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="edit-input"
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="edit-input"
          />
          <input
            type="number"
            step="0.01"
            name="amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
            placeholder="Amount"
            className="edit-input edit-amount"
          />
          <input
            type="text"
            name="ref"
            value={formData.ref}
            onChange={handleChange}
            placeholder="Reference"
            className="edit-input"
          />
          <div className="edit-actions">
            <button className="btn-save" onClick={handleSave}>SAVE</button>
            <button className="btn-cancel-edit" onClick={handleCancel}>CANCEL</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`expense-item ${expense.isIncome ? 'income' : ''}`}>
      <div className="expense-time">{expense.time}</div>
      <div className="expense-category">{expense.category}</div>
      <div className="expense-desc">{expense.description}</div>
      <div className={`expense-amount ${expense.amount < 0 ? 'negative' : 'positive'}`}>
        {expense.amount > 0 ? '+' : ''}₱{Math.abs(expense.amount).toFixed(2)}
      </div>
      <div className="expense-ref">{expense.ref}</div>
      
      <div className="expense-actions">
        <button className="btn-edit" onClick={() => setIsEditing(true)}>
          EDIT
        </button>
        <button 
          className="btn-delete" 
          onClick={() => {
            if (window.confirm('Delete this transaction?')) {
              onDelete(expense.id);
            }
          }}
        >
          DELETE
        </button>
      </div>
    </div>
  );
};
