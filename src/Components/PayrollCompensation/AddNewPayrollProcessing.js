import React, { useState } from "react";
import "./AddNewPayrollProcessing.css";

function AddNewPayrollProcessing({ onBack }) {
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSave = () => {
    console.log("Saved:", { employeeId, name, salary, status });
    onBack();
  };

  return (
    <div className="add-new-payroll">
      <h2>Add New Payroll</h2>
      <div className="form-group">
        <label>Employee ID:</label>
        <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Salary:</label>
        <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Processed">Processed</option>
        </select>
      </div>
      <div className="button-group">
        <button className="back-btn" onClick={onBack}>Back</button>
        <button className="save-btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default AddNewPayrollProcessing;
