import { useState, useEffect } from 'react';
import './DarkModeToggle.css';

export const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('dark-mode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('dark-mode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <button 
      className={`dark-mode-toggle ${darkMode ? 'active' : ''}`}
      onClick={() => setDarkMode(!darkMode)}
      title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};
