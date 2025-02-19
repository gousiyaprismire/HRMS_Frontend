import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import "./PayrollProcessing.css";

const PayrollProcessing = () => {
  const [payrollData, setPayrollData] = useState([
    {
      id: 1,
      empId: "101",
      name: "Manjunath",
      salary: "50000",
      deductions: "5000",
      netPay: "45000",
      grossPay: "55000",
      hoursWorked: "160",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    empId: "",
    name: "",
    salary: "",
    deductions: "",
    netPay: "",
    grossPay: "",
    hoursWorked: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleAddNew = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!formData.name || !formData.empId) {
      setSnackbarMessage("Error: Name and Employee ID are required!");
      setOpenSnackbar(true);
      return;
    }
    setPayrollData([...payrollData, { id: payrollData.length + 1, ...formData }]);
    setSnackbarMessage("Saved successfully!");
    setOpenSnackbar(true);
    setShowForm(false);
    setFormData({ empId: "", name: "", salary: "", deductions: "", netPay: "", grossPay: "", hoursWorked: "" });
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    setPayrollData(payrollData.filter((item) => item.id !== deleteId));
    setDeleteConfirmation(false);
    setSnackbarMessage("Deleted successfully!");
    setOpenSnackbar(true);
  };

  return (
    <div className="payroll-container">
      <button className="payroll-add-new-btn" onClick={handleAddNew}>+ Add New</button>

      <div className="payroll-filters">
        <TextField label="Search" variant="outlined" size="small" className="payroll-search" />
        <select className="payroll-select">
          <option value="">Month</option>
          {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
        <select className="payroll-select">
          <option value="">Year</option>
          {[2022, 2023, 2024, 2025].map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <table className="payroll-table">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Gross Pay</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payrollData.map((item) => (
            <tr key={item.id}>
              <td>{item.empId}</td>
              <td>{item.name}</td>
              <td>{item.grossPay}</td>
              <td>
                <button className="payroll-action-btn payroll-edit-btn">Edit</button>
                <button className="payroll-action-btn payroll-delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                <button className="payroll-action-btn payroll-generate-btn">Generate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="payroll-popup">
          <button className="payroll-close-btn" onClick={handleCloseForm}>✖</button>
          <h2>Add Payroll</h2>
          {["empId", "name", "salary", "deductions", "netPay", "grossPay", "hoursWorked"].map((field) => (
            <TextField key={field} label={`${field.charAt(0).toUpperCase() + field.slice(1)}:`} name={field} value={formData[field]} onChange={handleInputChange} fullWidth margin="normal" size="small" />
          ))}
          <div className="payroll-popup-buttons">
            <button className="payroll-save-btn" onClick={handleSave}>Save</button>
            <button className="payroll-cancel-btn" onClick={handleCloseForm}>Cancel</button>
          </div>
        </div>
      )}

      {deleteConfirmation && (
        <div className="payroll-delete-confirm">
          <p>Are you sure you want to delete?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={() => setDeleteConfirmation(false)}>No</button>
        </div>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} message={snackbarMessage} />
    </div>
  );
};

export default PayrollProcessing;
