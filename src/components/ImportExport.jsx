import { useState } from 'react';
import { exportToCSV, exportToJSON, importFromCSV, importFromJSON } from '../utils/exportUtils';
import './ImportExport.css';

export const ImportExport = ({ expenses, onImport, onClose }) => {
  const [importMode, setImportMode] = useState('merge'); // 'merge' or 'replace'
  const [error, setError] = useState('');

  const handleExportCSV = () => {
    exportToCSV(expenses);
  };

  const handleExportJSON = () => {
    exportToJSON(expenses);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');

    try {
      const text = await file.text();
      let importedExpenses;

      if (file.name.endsWith('.csv')) {
        importedExpenses = importFromCSV(text);
      } else if (file.name.endsWith('.json')) {
        importedExpenses = importFromJSON(text);
      } else {
        throw new Error('Unsupported file type. Use CSV or JSON.');
      }

      onImport(importedExpenses, importMode);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-overlay">
      <div className="import-export-panel">
        <div className="form-header">
          <h2>EXPORT / IMPORT DATA</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="panel-content">
          {/* EXPORT SECTION */}
          <div className="section">
            <h3>⬇ EXPORT DATA</h3>
            <p className="section-desc">Download your expenses</p>
            
            <div className="button-group">
              <button className="btn-export-csv" onClick={handleExportCSV}>
                📊 EXPORT CSV
              </button>
              <button className="btn-export-json" onClick={handleExportJSON}>
                📄 EXPORT JSON
              </button>
            </div>
          </div>

          <div className="divider"></div>

          {/* IMPORT SECTION */}
          <div className="section">
            <h3>⬆ IMPORT DATA</h3>
            <p className="section-desc">Upload CSV or JSON file</p>

            {error && (
              <div className="error-box">
                ⚠️ ERROR: {error}
              </div>
            )}

            <div className="import-mode">
              <label className="radio-label">
                <input
                  type="radio"
                  name="importMode"
                  value="merge"
                  checked={importMode === 'merge'}
                  onChange={(e) => setImportMode(e.target.value)}
                />
                <span>MERGE (Add to existing)</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="importMode"
                  value="replace"
                  checked={importMode === 'replace'}
                  onChange={(e) => setImportMode(e.target.value)}
                />
                <span>REPLACE (Delete all current)</span>
              </label>
            </div>

            <label className="file-upload-btn">
              📁 CHOOSE FILE
              <input
                type="file"
                accept=".csv,.json"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </label>

            <div className="info-box">
              💡 Supported formats: CSV, JSON
            </div>
          </div>

          <div className="divider"></div>

          {/* STATS */}
          <div className="section stats">
            <h3>📊 CURRENT DATA</h3>
            <div className="stat-item">
              <span className="stat-label">TOTAL TRANSACTIONS:</span>
              <span className="stat-value">{expenses.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">INCOME ENTRIES:</span>
              <span className="stat-value">{expenses.filter(e => e.isIncome).length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">EXPENSE ENTRIES:</span>
              <span className="stat-value">{expenses.filter(e => !e.isIncome).length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
