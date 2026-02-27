import { useState } from 'react';
import './ReceiptUpload.css';

export const ReceiptUpload = ({ expenseId, onReceiptAdd }) => {
  const [showUploader, setShowUploader] = useState(false);
  const [receipts, setReceipts] = useState(() => {
    const saved = localStorage.getItem(`receipts-${expenseId}`);
    return saved ? JSON.parse(saved) : [];
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = (event) => {
          const newReceipt = {
            id: Date.now(),
            name: file.name,
            data: event.target.result,
            size: file.size,
            type: file.type,
            uploadDate: new Date().toISOString()
          };
          
          const updated = [...receipts, newReceipt];
          setReceipts(updated);
          localStorage.setItem(`receipts-${expenseId}`, JSON.stringify(updated));
          
          if (onReceiptAdd) {
            onReceiptAdd(newReceipt);
          }
        };
        
        reader.readAsDataURL(file);
      }
    });
  };

  const deleteReceipt = (receiptId) => {
    if (window.confirm('Delete this receipt?')) {
      const updated = receipts.filter(r => r.id !== receiptId);
      setReceipts(updated);
      localStorage.setItem(`receipts-${expenseId}`, JSON.stringify(updated));
    }
  };

  const downloadReceipt = (receipt) => {
    const link = document.createElement('a');
    link.href = receipt.data;
    link.download = receipt.name;
    link.click();
  };

  return (
    <div className="receipt-upload-section">
      <button 
        className="btn-toggle-receipts"
        onClick={() => setShowUploader(!showUploader)}
      >
        📎 RECEIPTS ({receipts.length})
      </button>

      {showUploader && (
        <div className="receipt-uploader">
          <div className="upload-area">
            <label className="upload-label">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <div className="upload-icon">📷</div>
              <div className="upload-text">CLICK TO UPLOAD RECEIPT</div>
              <div className="upload-hint">JPG, PNG, HEIC accepted</div>
            </label>
          </div>

          {receipts.length > 0 && (
            <div className="receipt-list">
              {receipts.map(receipt => (
                <div key={receipt.id} className="receipt-item">
                  <img 
                    src={receipt.data} 
                    alt={receipt.name}
                    className="receipt-thumbnail"
                    onClick={() => window.open(receipt.data, '_blank')}
                  />
                  <div className="receipt-info">
                    <div className="receipt-name">{receipt.name}</div>
                    <div className="receipt-meta">
                      {(receipt.size / 1024).toFixed(0)} KB • 
                      {new Date(receipt.uploadDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="receipt-actions">
                    <button
                      className="btn-download-receipt"
                      onClick={() => downloadReceipt(receipt)}
                      title="Download"
                    >
                      ⬇️
                    </button>
                    <button
                      className="btn-delete-receipt"
                      onClick={() => deleteReceipt(receipt.id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Component to add receipt upload to expense items
export const ReceiptButton = ({ expenseId }) => {
  const [receipts, setReceipts] = useState(() => {
    const saved = localStorage.getItem(`receipts-${expenseId}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="btn-receipt-inline"
        onClick={() => setShowModal(true)}
        title="View/Add Receipts"
      >
        📎 {receipts.length > 0 ? receipts.length : ''}
      </button>

      {showModal && (
        <div className="receipt-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="receipt-modal" onClick={(e) => e.stopPropagation()}>
            <div className="receipt-modal-header">
              <h3>RECEIPTS</h3>
              <button className="close-modal" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="receipt-modal-content">
              <ReceiptUpload 
                expenseId={expenseId}
                onReceiptAdd={() => {
                  const saved = localStorage.getItem(`receipts-${expenseId}`);
                  setReceipts(saved ? JSON.parse(saved) : []);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
