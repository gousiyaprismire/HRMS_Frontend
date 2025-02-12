import React, { useState } from "react";
import "./AddNewTaxDeduction.css";

const AddNewTaxDeduction = ({ onBack }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [tax, setTax] = useState("");
  const [pf, setPf] = useState("");
  const [insurance, setInsurance] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleSave = () => {
    console.log("Saved:", { employeeId, name, tax, pf, insurance, month, year });
    onBack();
  };

  return (
    <div className="add-new-tax">
      <h2>Add New Tax & Deduction</h2>
      <div className="form-group">
        <label>Employee ID:</label>
        <input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Tax:</label>
        <input type="text" value={tax} onChange={(e) => setTax(e.target.value)} />
      </div>
      <div className="form-group">
        <label>PF:</label>
        <input type="text" value={pf} onChange={(e) => setPf(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Insurance:</label>
        <input type="text" value={insurance} onChange={(e) => setInsurance(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Month:</label>
        <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Year:</label>
        <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
      </div>
      <div className="button-group">
        <button className="back-btn" onClick={onBack}>Back</button>
        <button className="save-btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AddNewTaxDeduction;
