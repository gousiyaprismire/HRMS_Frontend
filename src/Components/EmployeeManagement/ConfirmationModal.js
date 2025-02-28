import React from "react";
import "./ConfirmationModal.css"; // Ensure you have the styles

function ConfirmationModal({ message, onConfirm, onCancel }) {
  return (
    <div className="employee-confirmation-overlay">
      <div className="employee-confirmation-modal">
        <p className="employee-confirmation-message">{message}</p>
        <div className="employee-confirmation-buttons">
          <button className="employee-confirm-btn" onClick={onConfirm}>Yes</button>
          <button className="employee-cancel-btn" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
