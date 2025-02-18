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
    status: "Active",
  });

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
    onSave(employee);
  };

  return (
    <div className="emp-popup">
      <div className="emp-header">
        <h3>Employee Registration Form</h3>
        <button className="emp-close-btn" onClick={onClose}>✖</button>
      </div>

      <div className="emp-content">
        <form onSubmit={handleSubmit}>
          <label className="emp-label">Employee Name:</label>
          <input className="emp-input" type="text" name="name" value={employee.name} onChange={handleChange} required />

          <label className="emp-label">Email:</label>
          <input className="emp-input" type="email" name="email" value={employee.email} onChange={handleChange} required />

          <label className="emp-label">Gender:</label>
          <select className="emp-select" name="gender" value={employee.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label className="emp-label">Date of Birth:</label>
          <input className="emp-input" type="date" name="dob" value={employee.dob} onChange={handleChange} required />

          <label className="emp-label">Joining Date:</label>
          <input className="emp-input" type="date" name="joiningDate" value={employee.joiningDate} onChange={handleChange} required />

          <label className="emp-label">Mobile Number:</label>
          <input className="emp-input" type="text" name="mobile" value={employee.mobile} onChange={handleChange} required />

          <label className="emp-label">Aadhar Number:</label>
          <input className="emp-input" type="text" name="aadhar" value={employee.aadhar} onChange={handleChange} required />

          <label className="emp-label">Account Number:</label>
          <input className="emp-input" type="text" name="accountNumber" value={employee.accountNumber} onChange={handleChange} required />

          <label className="emp-label">Department:</label>
          <select className="emp-select" name="department" value={employee.department} onChange={handleChange} required>
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </select>

          <label className="emp-label">Designation:</label>
          <input className="emp-input" type="text" name="designation" value={employee.designation} onChange={handleChange} required />

          <label className="emp-label">Previous Company Name:</label>
          <input className="emp-input" type="text" name="prevCompany" value={employee.prevCompany} onChange={handleChange} />

          <label className="emp-label">PF Number:</label>
          <input className="emp-input" type="text" name="pfNumber" value={employee.pfNumber} onChange={handleChange} />

          <label className="emp-label">Salary:</label>
          <input className="emp-input" type="number" name="salary" value={employee.salary} onChange={handleChange} required />

          <label className="emp-label">Current Address:</label>
          <textarea className="emp-textarea" name="currentAddress" value={employee.currentAddress} onChange={handleChange} required></textarea>

          <label className="emp-label">Permanent Address:</label>
          <textarea className="emp-textarea" name="permanentAddress" value={employee.permanentAddress} onChange={handleChange} required></textarea>

          <label className="emp-label">Employee Status:</label>
          <select className="emp-select" name="status" value={employee.status} onChange={handleChange} required>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button type="submit" className="emp-submit-btn">
            {employee.id ? "Update Employee" : "Register Employee"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
