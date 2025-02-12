import React, { useState } from "react";
import "./AddNewPayslip.css";

function AddNewPayslip({ goBack }) {
  const [payslipData, setPayslipData] = useState({
    employeeId: "",
    employeeName: "",
    basicPay: "",
    hra: "",
    deductions: "",
    medicalAllowance: "",
    travelAllowance: "",
    foodAllowance: "",
    netSalary: "",
    month: "",
    year: "",
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayslipData({ ...payslipData, [name]: value });
  };

  
  const handleSave = () => {
    console.log("Payslip Saved:", payslipData);
    alert("Payslip saved successfully!");
    setPayslipData({
      employeeId: "",
      employeeName: "",
      basicPay: "",
      hra: "",
      deductions: "",
      medicalAllowance: "",
      travelAllowance: "",
      foodAllowance: "",
      netSalary: "",
      month: "",
      year: "",
    });
  };

  return (
    <div className="add-payslip-container">
      <h2>Add New Payslip</h2>

      <div className="form-group">
        <label>Employee ID:</label>
        <input type="text" name="employeeId" value={payslipData.employeeId} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Employee Name:</label>
        <input type="text" name="employeeName" value={payslipData.employeeName} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Basic Pay:</label>
        <input type="number" name="basicPay" value={payslipData.basicPay} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>HRA:</label>
        <input type="number" name="hra" value={payslipData.hra} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Deductions:</label>
        <input type="number" name="deductions" value={payslipData.deductions} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Medical Allowance:</label>
        <input type="number" name="medicalAllowance" value={payslipData.medicalAllowance} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Travel Allowance:</label>
        <input type="number" name="travelAllowance" value={payslipData.travelAllowance} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Food Allowance:</label>
        <input type="number" name="foodAllowance" value={payslipData.foodAllowance} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Net Salary:</label>
        <input type="number" name="netSalary" value={payslipData.netSalary} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Month:</label>
        <input type="text" name="month" value={payslipData.month} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Year:</label>
        <input type="text" name="year" value={payslipData.year} onChange={handleChange} />
      </div>

      <div className="button-group">
        <button className="back-button" onClick={goBack}>Back</button>
        <button className="cancel-button" onClick={() => setPayslipData({})}>Cancel</button>
        <button className="save-button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default AddNewPayslip;