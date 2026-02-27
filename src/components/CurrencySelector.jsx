import { useState, useEffect } from 'react';
import './CurrencySelector.css';

const CURRENCIES = [
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' }
];

// Exchange rates (base: PHP)
const EXCHANGE_RATES = {
  PHP: 1.0,
  USD: 0.018,
  EUR: 0.017,
  GBP: 0.014,
  JPY: 2.65,
  CNY: 0.13,
  KRW: 24.5,
  INR: 1.52,
  AUD: 0.028,
  CAD: 0.025,
  SGD: 0.024,
  HKD: 0.14
};

export const CurrencySelector = ({ onCurrencyChange }) => {
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('selected-currency');
    return saved ? JSON.parse(saved) : CURRENCIES[0];
  });

  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    localStorage.setItem('selected-currency', JSON.stringify(currency));
    onCurrencyChange(currency);
  }, [currency, onCurrencyChange]);

  const handleSelect = (curr) => {
    setCurrency(curr);
    setShowSelector(false);
  };

  return (
    <div className="currency-selector">
      <button 
        className="currency-button"
        onClick={() => setShowSelector(!showSelector)}
        title="Change Currency"
      >
        {currency.symbol} {currency.code}
      </button>

      {showSelector && (
        <div className="currency-dropdown">
          <div className="currency-header">SELECT CURRENCY</div>
          <div className="currency-list">
            {CURRENCIES.map(curr => (
              <button
                key={curr.code}
                className={`currency-option ${curr.code === currency.code ? 'active' : ''}`}
                onClick={() => handleSelect(curr)}
              >
                <span className="currency-symbol">{curr.symbol}</span>
                <span className="currency-code">{curr.code}</span>
                <span className="currency-name">{curr.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const convertCurrency = (amount, fromCode, toCode) => {
  if (fromCode === toCode) return amount;
  
  // Convert to PHP first (base currency)
  const inPHP = amount / EXCHANGE_RATES[fromCode];
  
  // Convert to target currency
  return inPHP * EXCHANGE_RATES[toCode];
};

export const formatCurrency = (amount, currency) => {
  return `${currency.symbol}${Math.abs(amount).toFixed(2)}`;
};

export { CURRENCIES, EXCHANGE_RATES };
