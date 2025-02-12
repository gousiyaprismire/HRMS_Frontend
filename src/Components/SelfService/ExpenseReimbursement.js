import React, { useState } from 'react';
import './SelfService.css'; 
const ExpenseReimbursement = () => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    receipt: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      receipt: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Expense submitted successfully!');
  };

  return (
    <div className="expense-reimbursement-container">
      <h2 className="expense-reimbursement-title">Expense Reimbursement Request</h2>
      
      <form onSubmit={handleSubmit} className="expense-reimbursement-form">
        <div className="expense-form-group">
          <label>Expense Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter expense title"
            className="expense-form-input"
          />
        </div>

        <div className="expense-form-group">
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="Enter amount"
            className="expense-form-input"
          />
        </div>

        <div className="expense-form-group">
          <label>Receipt:</label>
          <input
            type="file"
            name="receipt"
            onChange={handleFileChange}
            className="expense-form-input"
          />
        </div>

        <button type="submit" className="expense-reimbursement-button">
          Submit Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseReimbursement;
