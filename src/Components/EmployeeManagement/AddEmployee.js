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
    status: "Active", // Default to Active
  });
 
  // Load Employee Data When Editing
  useEffect(() => {
    if (editingEmployee) {
      setEmployee(editingEmployee);
    }
  }, [editingEmployee]);
 
  // Handle Input Changes
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };
 
  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(employee);
  };
 
  return (
    <div className="add-employee-container">
      <div className="add-employee-header">
        <h3>Employee Registration Form</h3>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>
 
      {/* ✅ Scrollable Form Wrapper */}
      <div className="add-employee-content">
        <form onSubmit={handleSubmit}>
          <label>Employee Name:</label>
          <input type="text" name="name" value={employee.name} onChange={handleChange} required />
 
          <label>Email:</label>
          <input type="email" name="email" value={employee.email} onChange={handleChange} required />
 
          <label>Gender:</label>
          <select name="gender" value={employee.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
 
          <label>Date of Birth:</label>
          <input type="date" name="dob" value={employee.dob} onChange={handleChange} required />
 
          <label>Joining Date:</label>
          <input type="date" name="joiningDate" value={employee.joiningDate} onChange={handleChange} required />
 
          <label>Mobile Number:</label>
          <input type="text" name="mobile" value={employee.mobile} onChange={handleChange} required />
 
          <label>Aadhar Number:</label>
          <input type="text" name="aadhar" value={employee.aadhar} onChange={handleChange} required />
 
          <label>Account Number:</label>
          <input type="text" name="accountNumber" value={employee.accountNumber} onChange={handleChange} required />
 
          <label>Department:</label>
          <select name="department" value={employee.department} onChange={handleChange} required>
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </select>
 
          <label>Designation:</label>
          <input type="text" name="designation" value={employee.designation} onChange={handleChange} required />
 
          <label>Previous Company Name:</label>
          <input type="text" name="prevCompany" value={employee.prevCompany} onChange={handleChange} />
 
          <label>PF Number:</label>
          <input type="text" name="pfNumber" value={employee.pfNumber} onChange={handleChange} />
 
          <label>Salary:</label>
          <input type="number" name="salary" value={employee.salary} onChange={handleChange} required />
 
          <label>Current Address:</label>
          <textarea name="currentAddress" value={employee.currentAddress} onChange={handleChange} required></textarea>
 
          <label>Permanent Address:</label>
          <textarea name="permanentAddress" value={employee.permanentAddress} onChange={handleChange} required></textarea>
 
          <label>Employee Status:</label>
          <select name="status" value={employee.status} onChange={handleChange} required>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
 
          <button type="submit" className="submit-btn">
            {employee.id ? "Update Employee" : "Register Employee"}
          </button>
        </form>
      </div>
    </div>
  );
}
 
export default AddEmployee;
 
 