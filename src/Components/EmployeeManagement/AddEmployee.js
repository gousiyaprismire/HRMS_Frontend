import React, { useState } from "react";
import "./EmployeeManagement.css";

const AddEmployee = ({ onAdd }) => {
  const [employee, setEmployee] = useState({ 
    name: "", 
    email: "", 
    gender: "",
    dob: "",
    joiningDate: "",
    phone: "",
    aadharNumber: "",
    accountNumber: "",
    department: "", 
    designation: "",
    previousCompany: "",
    pfNumber: "",
    salary: "",
    currentAddress: "",
    permanentAddress: "",
    isActive: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allFieldsFilled = Object.values(employee).every(value => value !== "");
    
    if (allFieldsFilled) {
      onAdd(employee);
      setEmployee({
        name: "", 
        email: "", 
        gender: "",
        dob: "",
        joiningDate: "",
        phone: "",
        aadharNumber: "",
        accountNumber: "",
        department: "", 
        designation: "",
        previousCompany: "",
        pfNumber: "",
        salary: "",
        currentAddress: "",
        permanentAddress: "",
        isActive: "active",
      });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="add-employee-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee Name:</label>
          <input type="text" name="name" value={employee.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={employee.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={employee.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input type="date" name="dob" value={employee.dob} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Joining Date:</label>
          <input type="date" name="joiningDate" value={employee.joiningDate} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Mobile Number:</label>
          <input type="tel" name="phone" value={employee.phone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Aadhar Number:</label>
          <input type="text" name="aadharNumber" value={employee.aadharNumber} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Account Number:</label>
          <input type="text" name="accountNumber" value={employee.accountNumber} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Department:</label>
          <input type="text" name="department" value={employee.department} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Designation:</label>
          <input type="text" name="designation" value={employee.designation} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Previous Company Name (if applicable):</label>
          <input type="text" name="previousCompany" value={employee.previousCompany} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>PF Number:</label>
          <input type="text" name="pfNumber" value={employee.pfNumber} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Salary:</label>
          <input type="number" name="salary" value={employee.salary} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Current Address:</label>
          <textarea name="currentAddress" value={employee.currentAddress} onChange={handleChange} required></textarea>
        </div>

        <div className="form-group">
          <label>Permanent Address:</label>
          <textarea name="permanentAddress" value={employee.permanentAddress} onChange={handleChange} required></textarea>
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select name="isActive" value={employee.isActive} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddEmployee;
