// src/Modal.jsx
import React from 'react';

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 text-center max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">🔔 Notification</h2>
        <p className="mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
