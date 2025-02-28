import React, { useState } from "react";
import "./BenefitsCompliance.css";

function ClaimsReimbursements() {
  const [formData, setFormData] = useState({
    expenseType: "medical",
    amount: "",
    date: "",
    description: "",
    receipts: [],
  });

  const [message, setMessage] = useState(""); 

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input for receipts
  const handleReceiptUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) {
      setMessage("⚠ Please upload at least one receipt.");
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      receipts: [...prevState.receipts, ...files], 
    }));
  };

  // Submit expense form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setMessage("⚠ Please enter a valid amount.");
      return;
    }

    if (!formData.date) {
      setMessage("⚠ Please select a valid date.");
      return;
    }

    if (formData.receipts.length === 0) {
      setMessage("⚠ Please upload at least one receipt.");
      return;
    }

    
    console.log("Expense Submitted:", formData);

    setMessage("✅ Your claim has been submitted for approval.");

    
    setFormData({
      expenseType: "medical",
      amount: "",
      date: "",
      description: "",
      receipts: [],
    });
  };

  return (
    <div className="claims-reimbursements-container">
      <h3>💰 Submit Claims & Reimbursements</h3>
      <form onSubmit={handleSubmit} className="claims-form">
        <div className="claims-reimbursements-form-group">
          <label htmlFor="expenseType">Expense Type</label>
          <select
            id="expenseType"
            name="expenseType"
            value={formData.expenseType}
            onChange={handleChange}
            aria-label="Select expense type"
          >
            <option value="medical">Medical</option>
            <option value="travel">Travel</option>
          </select>
        </div>

        <div className="claims-reimbursements-form-group">
          <label htmlFor="amount">Amount (₹)</label>
          <input
            id="amount"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="1"
            required
            aria-label="Enter claim amount"
          />
        </div>

        <div className="claims-reimbursements-form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            aria-label="Select date of expense"
          />
        </div>

        <div className="claims-reimbursements-form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            aria-label="Enter claim description"
          ></textarea>
        </div>

        <div className="claims-reimbursements-form-group">
          <label htmlFor="receipts">Upload Receipts</label>
          <input
            id="receipts"
            type="file"
            accept="application/pdf,image/*"
            multiple
            onChange={handleReceiptUpload}
            required
            aria-label="Upload receipt files"
          />
        </div>

        {/* Preview Uploaded Receipts */}
        {formData.receipts.length > 0 && (
          <div className="receipt-preview">
            <h4>📂 Uploaded Receipts:</h4>
            <ul>
              {formData.receipts.map((file, index) => (
                <li key={index}>📎 {file.name}</li>
              ))}
            </ul>
          </div>
        )}

        <button type="submit"> 🚀 Submit for Approval</button>
      </form>

      {message && <p className="message" aria-live="polite">{message}</p>}
    </div>
  );
}

export default ClaimsReimbursements;
