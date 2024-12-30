import React from 'react';

const Alert = ({ type = "info", message, onClose }) => {
  const colors = {
    info: "blue",
    success: "green",
    warning: "yellow",
    error: "red",
  };

  return (
    <div
      className={`p-4 rounded border-l-4 bg-${colors[type]}-100 border-${colors[type]}-500 text-${colors[type]}-700 mb-4`}
      role="alert"
    >
      <p>{message}</p>
      {onClose && (
        <button
          className="ml-4 text-sm font-bold text-${colors[type]}-700"
          onClick={onClose}
        >
          ✖
        </button>
      )}
    </div>
  );
};

export default Alert;
