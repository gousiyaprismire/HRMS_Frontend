import React from "react";
import "./ConfirmationModal.css"; // Ensure you have the styles

function ConfirmationModal({ message, onConfirm, onCancel }) {
  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal">
        <p>{message}</p> {/* This should display the correct message */}
        <div className="confirmation-modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>Yes</button>
          <button className="cancel-btn" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
