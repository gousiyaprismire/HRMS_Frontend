import React, { useState, useEffect } from "react";
import "./AddEmployee.css";

function AddEmployee({ onClose, onSave, editingEmployee }) {
  const [employee, setEmployee] = useState({
    id: null,
    name: "",
    email: "",
    gender: "",
    dob: "",
    joiningDate: "",
    mobile: "",
    aadhar: "",
    accountNumber: "",
    department: "",
    designation: "",
    prevCompany: "",
    pfNumber: "",
    salary: "",
    currentAddress: "",
    permanentAddress: "",
    status: "Active", // Default status
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tempEmployee, setTempEmployee] = useState(null);

  useEffect(() => {
    if (editingEmployee) {
      setEmployee(editingEmployee);
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTempEmployee(employee);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    onSave(tempEmployee);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="add-employee-popup">
      {/* Header */}
      <div className="add-employee-header">
        <h3>Employee Registration Form</h3>
        <button className="add-employee-close-btn" onClick={onClose}>✖</button>
      </div>

      {/* Scrollable Form */}
      <div className="add-employee-content">
        <form onSubmit={handleSubmit}>
          <label htmlFor="employee-name">Employee Name:</label>
          <input type="text" id="employee-name" name="name" value={employee.name} onChange={handleChange} required />

          <label htmlFor="employee-email">Email:</label>
          <input type="email" id="employee-email" name="email" value={employee.email} onChange={handleChange} required />

          <label htmlFor="employee-gender">Gender:</label>
          <select id="employee-gender" name="gender" value={employee.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="employee-dob">Date of Birth:</label>
          <input type="date" id="employee-dob" name="dob" value={employee.dob} onChange={handleChange} required />

          <label htmlFor="employee-joining-date">Joining Date:</label>
          <input type="date" id="employee-joining-date" name="joiningDate" value={employee.joiningDate} onChange={handleChange} required />

          <label htmlFor="employee-mobile">Mobile Number:</label>
          <input type="text" id="employee-mobile" name="mobile" value={employee.mobile} onChange={handleChange} required />

          <label htmlFor="employee-aadhar">Aadhar Number:</label>
          <input type="text" id="employee-aadhar" name="aadhar" value={employee.aadhar} onChange={handleChange} required />

          <label htmlFor="employee-account">Account Number:</label>
          <input type="text" id="employee-account" name="accountNumber" value={employee.accountNumber} onChange={handleChange} required />

          <label htmlFor="employee-department">Department:</label>
          <select id="employee-department" name="department" value={employee.department} onChange={handleChange} required>
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </select>

          <label htmlFor="employee-designation">Designation:</label>
          <input type="text" id="employee-designation" name="designation" value={employee.designation} onChange={handleChange} required />

          <label htmlFor="employee-prev-company">Previous Company Name:</label>
          <input type="text" id="employee-prev-company" name="prevCompany" value={employee.prevCompany} onChange={handleChange} />

          <label htmlFor="employee-pf-number">PF Number:</label>
          <input type="text" id="employee-pf-number" name="pfNumber" value={employee.pfNumber} onChange={handleChange} />

          <label htmlFor="employee-salary">Salary:</label>
          <input type="number" id="employee-salary" name="salary" value={employee.salary} onChange={handleChange} required />

          <label htmlFor="employee-current-address">Current Address:</label>
          <textarea id="employee-current-address" name="currentAddress" value={employee.currentAddress} onChange={handleChange} required></textarea>

          <label htmlFor="employee-permanent-address">Permanent Address:</label>
          <textarea id="employee-permanent-address" name="permanentAddress" value={employee.permanentAddress} onChange={handleChange} required></textarea>

          <label htmlFor="employee-status">Employee Status:</label>
          <select id="employee-status" name="status" value={employee.status} onChange={handleChange} required>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Footer with Submit Button */}
          <div className="add-employee-footer">
            <button type="submit" className="submit-btn">Submit</button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal">
            <p>Are you sure you want to proceed with this action?</p>
            <div className="confirmation-modal-buttons">
              <button className="confirm-btn" onClick={handleConfirm}>Confirm</button>
              <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddEmployee;
