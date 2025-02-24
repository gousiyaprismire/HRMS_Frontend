import React, { useState } from 'react';
import './SelfService.css';

const ExpenseReimbursement = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, title: "Travel to Client Meeting", amount: 5000, status: "Pending" },
    { id: 2, title: "Office Supplies", amount: 2000, status: "Approved" }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    receipt: null
  });

  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, receipt: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) {
      alert("Please fill all required fields.");
      return;
    }

    const newExpense = {
      id: expenses.length + 1,
      title: formData.title,
      amount: formData.amount,
      status: "Pending"
    };

    setExpenses([...expenses, newExpense]);
    setFormData({ title: '', amount: '', receipt: null });
    setShowForm(false);
    alert("Expense submitted successfully!");
  };

  return (
    <div className="expense-reimbursement-container">
      <h2 className="expense-reimbursement-title">Expense Reimbursement Request</h2>

      {!showForm && (
        <>
          <button className="expense-toggle-button" onClick={() => setShowForm(true)}>
            Submit New Expense
          </button>

          <h3 className="expense-history-title">Expense History</h3>
          <table className="expense-table">
            <thead>
              <tr>
                <th>Expense Title</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length > 0 ? (
                expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.title}</td>
                    <td>${expense.amount}</td>
                    <td className={`expense-status expense-${expense.status.toLowerCase()}`}>
                      {expense.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3" className="text-center">No Expenses Submitted</td></tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {showForm && (
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

          <div className="expense-button-container">
            <button type="submit" className="expense-reimbursement-button">
              Submit Expense
            </button>
            <div className="expense-button-container">
  <button className="expense-cancel-button" onClick={() => setShowForm(false)}>
    Back
  </button>
</div>


          </div>
        </form>
      )}
    </div>
  );
};

export default ExpenseReimbursement;
