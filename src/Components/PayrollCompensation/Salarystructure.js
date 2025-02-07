import React from "react";
import "./Salarystructure.css";

function SalaryStructure({ onBack }) {
  return (
    <div className="salary-container">
      <h2>Salary Structure Management</h2>
      
      <form className="salary-form">
        <div className="form-group">
          <label>Base Salary:</label>
          <input type="number" placeholder="Enter base salary" />
        </div>

        <div className="form-group">
          <label>HRA:</label>
          <input type="number" placeholder="Enter HRA amount" />
        </div>

        <div className="form-group">
          <label>Deductions:</label>
          <input type="number" placeholder="Enter deduction amount" />
        </div>

        <div className="button-container">
          <button type="submit">Save</button>
          <button type="button" className="cancel-button" onClick={onBack}>Cancel</button>
        </div>
      </form>

      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
}

export default SalaryStructure;
