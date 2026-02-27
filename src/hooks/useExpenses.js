import { useState, useEffect } from 'react';

const STORAGE_KEY = 'brutalist-expenses';

const DEFAULT_EXPENSES = [
  {
    id: 1,
    time: 'FEB 27 • 8:30 AM',
    category: '💰 Income Received',
    description: 'Send Money',
    amount: 3500.00,
    isIncome: true,
    ref: 'REF: INCOMING TRANSFER'
  },
  {
    id: 2,
    time: 'FEB 27 • 9:25 AM',
    category: '👤 JR Asking',
    description: 'Sent GCash to USSC Money Services',
    amount: -515.00,
    ref: 'REF: 8038221885263 • ACCT ENDING 0722'
  },
  {
    id: 3,
    time: 'FEB 27 • 10:01 AM',
    category: '❓ Unknown Transfer',
    description: 'Transfer to 09563768725',
    amount: -525.00,
    ref: 'REF: 8038222962043'
  },
  {
    id: 4,
    time: 'FEB 27 • 10:11 AM',
    category: '🛒 Grocery',
    description: 'Coke, Tissue, Essentials • Bancnet P2M',
    amount: -863.50,
    ref: 'REF: 819783989 • QR PAYMENT'
  },
  {
    id: 5,
    time: 'FEB 27 • 9:43 PM',
    category: '⚡ Electricity',
    description: 'Meralco KLoad 200',
    amount: -220.00,
    ref: 'REF: 822059756'
  },
  {
    id: 6,
    time: 'FEB 28 • 12:07 AM',
    category: '🌳 Treetop',
    description: 'Online Payment - Link and Pay',
    amount: -96.00,
    ref: 'REF: ONLINE TRANSACTION'
  },
  {
    id: 7,
    time: 'FEB 28 • 1:24 AM',
    category: '🏢 Green Residences',
    description: 'Online Payment - Link and Pay',
    amount: -95.00,
    ref: 'REF: ONLINE TRANSACTION'
  }
];

export const useExpenses = () => {
  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_EXPENSES;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now(),
      isIncome: expense.amount > 0
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses(prev =>
      prev.map(exp =>
        exp.id === id
          ? { ...exp, ...updatedExpense, isIncome: updatedExpense.amount > 0 }
          : exp
      )
    );
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  const resetExpenses = () => {
    setExpenses(DEFAULT_EXPENSES);
  };

  const totalExpenses = expenses
    .filter(e => e.amount < 0)
    .reduce((sum, e) => sum + Math.abs(e.amount), 0);

  const totalIncome = expenses
    .filter(e => e.amount > 0)
    .reduce((sum, e) => sum + e.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    resetExpenses,
    totalExpenses,
    totalIncome,
    netBalance
  };
};
