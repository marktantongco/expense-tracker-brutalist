import { useState } from 'react';
import './ExpenseForm.css';

export const ExpenseForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    time: '',
    category: '',
    description: '',
    amount: '',
    ref: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.time || !formData.category || !formData.amount) {
      alert('Please fill in required fields: Time, Category, and Amount');
      return;
    }

    onAdd({
      ...formData,
      amount: parseFloat(formData.amount)
    });

    setFormData({
      time: '',
      category: '',
      description: '',
      amount: '',
      ref: ''
    });

    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="form-overlay">
      <div className="expense-form">
        <div className="form-header">
          <h2>ADD NEW TRANSACTION</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>TIME *</label>
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="FEB 27 • 9:00 AM"
              required
            />
          </div>

          <div className="form-group">
            <label>CATEGORY *</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="🛒 Grocery"
              required
            />
          </div>

          <div className="form-group">
            <label>DESCRIPTION</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Transaction details"
            />
          </div>

          <div className="form-group">
            <label>AMOUNT * (use - for expenses, + for income)</label>
            <input
              type="number"
              step="0.01"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="-100.00 or +1000.00"
              required
            />
          </div>

          <div className="form-group">
            <label>REFERENCE</label>
            <input
              type="text"
              name="ref"
              value={formData.ref}
              onChange={handleChange}
              placeholder="REF: TRANSACTION ID"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              CANCEL
            </button>
            <button type="submit" className="btn-submit">
              ADD TRANSACTION
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
