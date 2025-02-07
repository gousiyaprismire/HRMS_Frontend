import React from "react";
import "./Salarystructure.css";

function SalaryStructure() {
  return (
    <div className="section-content">
      <h2>Salary Structure Management</h2>
      <form className="salary-form">
        <label>Base Salary:</label>
        <input type="text" placeholder="Enter base salary" />

        <label>HRA (House Rent Allowance):</label>
        <input type="text" placeholder="Enter HRA amount" />

        <label>Deductions:</label>
        <input type="text" placeholder="Enter deductions" />

        <button type="submit">Save Salary Structure</button>
      </form>
    </div>
  );
}

export default SalaryStructure;
