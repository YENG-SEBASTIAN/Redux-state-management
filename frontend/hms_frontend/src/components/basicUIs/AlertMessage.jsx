import React, { useEffect } from 'react';

const AlertMessage = ({ type, message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={`alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`} role="alert">
      <strong>{type === 'success' ? 'Success!' : 'Error!'}</strong> {message}
      <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
    </div>
  );
};

export default AlertMessage;
