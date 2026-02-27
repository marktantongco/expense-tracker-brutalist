// Export utilities for expense tracker

export const exportToCSV = (expenses) => {
  const headers = ['ID', 'Time', 'Category', 'Description', 'Amount', 'Type', 'Reference'];
  
  const rows = expenses.map(expense => [
    expense.id,
    expense.time,
    expense.category,
    expense.description || '',
    expense.amount,
    expense.isIncome ? 'Income' : 'Expense',
    expense.ref || ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  downloadFile(csvContent, 'expenses.csv', 'text/csv');
};

export const exportToJSON = (expenses) => {
  const jsonContent = JSON.stringify(expenses, null, 2);
  downloadFile(jsonContent, 'expenses.json', 'application/json');
};

const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importFromCSV = (csvText) => {
  const lines = csvText.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  
  const expenses = lines.slice(1).map(line => {
    const values = line.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g)
      .map(v => v.replace(/^"|"$/g, '').trim());
    
    return {
      id: parseInt(values[0]) || Date.now() + Math.random(),
      time: values[1],
      category: values[2],
      description: values[3],
      amount: parseFloat(values[4]),
      isIncome: values[5] === 'Income',
      ref: values[6]
    };
  });

  return expenses;
};

export const importFromJSON = (jsonText) => {
  try {
    const expenses = JSON.parse(jsonText);
    
    // Validate structure
    if (!Array.isArray(expenses)) {
      throw new Error('Invalid format: Expected an array');
    }

    // Ensure each expense has required fields
    return expenses.map(expense => ({
      id: expense.id || Date.now() + Math.random(),
      time: expense.time || '',
      category: expense.category || '',
      description: expense.description || '',
      amount: parseFloat(expense.amount) || 0,
      isIncome: expense.amount > 0,
      ref: expense.ref || ''
    }));
  } catch (error) {
    throw new Error(`JSON parse error: ${error.message}`);
  }
};
