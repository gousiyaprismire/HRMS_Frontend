import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SelfService.css";

const ExpenseReimbursement = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    expenseTitle: "",
    amount: "",
    receipt: "",
    employeeId: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData({ ...formData, receipt: reader.result });
    };
    reader.onerror = (error) => {
      console.error("Error converting file:", error);
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.expenseTitle || !formData.amount || !formData.employeeId) {
      alert("Please fill all required fields.");
      return;
    }

    const dataToSend = {
      expenseTitle: formData.expenseTitle,
      amount: parseFloat(formData.amount),
      receiptBase64: formData.receipt,
      employeeId: parseInt(formData.employeeId),
    };

    try {
      const response = await axios.post("http://localhost:8080/api/expenses", dataToSend, {
        headers: { "Content-Type": "application/json" },
      });

      setExpenses([...expenses, response.data]);
      setFormData({ expenseTitle: "", amount: "", receipt: "", employeeId: "" });
      setShowForm(false);
      alert("Expense submitted successfully!");
    } catch (error) {
      console.error("Error submitting expense:", error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/expenses");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const updateExpenseStatus = async (id, newStatus) => {
    console.log(`Updating expense with ID: ${id}, New Status: ${newStatus}`);

    try {
      await axios.put(
        `http://localhost:8080/api/expenses/${id}/status`,
        { status: newStatus },
        { headers: { "Content-Type": "application/json" } }
      );

      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === id ? { ...expense, status: newStatus } : expense
        )
      );

      alert("Expense status updated successfully!");
    } catch (error) {
      console.error("Error updating expense status:", error);
      alert("Error updating expense status");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="expense-reimbursement-container">
      <h2 className="expense-reimbursement-title">Expense Reimbursement Request</h2>

      {!showForm && (
        <>
          <button className="expense-toggle-button" onClick={() => setShowForm(true)}>
            Add New Expense
          </button>

          <h3 className="expense-history-title">Expense History</h3>
          <table className="expense-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Expense Title</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Receipt</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length > 0 ? (
                expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.employeeId}</td>
                    <td>{expense.expenseTitle}</td>
                    <td>${expense.amount}</td>
                    <td className={`expense-status expense-${expense.status.toLowerCase()}`}>
                      {expense.status}
                    </td>
                    <td>
                      {expense.receiptBase64 ? (
                        <img
                          src={expense.receiptBase64}
                          alt="Receipt"
                          style={{ width: "100px", height: "100px" }}
                        />
                      ) : (
                        "No Receipt"
                      )}
                    </td>
                    <td>
                      {/* Always show action buttons */}
                      <div className="expense-action-buttons">
                        <button
                          className="expense-approve-button"
                          onClick={() => updateExpenseStatus(expense.id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="expense-reject-button"
                          onClick={() => updateExpenseStatus(expense.id, "Rejected")}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Expenses Submitted
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="expense-reimbursement-form">
          <div className="expense-form-group">
            <label>Employee ID:</label>
            <input
              type="number"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleInputChange}
              placeholder="Enter Employee ID"
              className="expense-form-input"
              required
            />
          </div>

          <div className="expense-form-group">
            <label>Expense Title:</label>
            <select
              name="expenseTitle"
              value={formData.expenseTitle}
              onChange={handleInputChange}
              className="expense-form-input"
              required
            >
              <option value="">Select Expense Title</option>
              <option value="Travel">Travel</option>
              <option value="Accommodation">Accommodation</option>
              <option value="Meals">Meals</option>
              <option value="Office Supplies">Office Supplies</option>
              <option value="Training & Development">Training & Development</option>
              <option value="Other">Other</option>
            </select>
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
              required
            />
          </div>

          <div className="expense-form-group">
            <label>Receipt:</label>
            <input
              type="file"
              name="receipt"
              accept="image/*"
              onChange={handleFileChange}
              className="expense-form-input"
            />
          </div>

          <div className="expense-button-container">
            <button type="submit" className="expense-reimbursement-button">
              Submit Expense
            </button>
            <button className="expense-cancel-button" onClick={() => setShowForm(false)}>
              Back
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ExpenseReimbursement;
