import React, { useState } from "react";
import "./AddNewSalary.css";

const AddNewSalary = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: "",
    basicPay: "",
    hra: "",
    pf: "",
    deductions: "",
    medicalAllowance: "",
    travelAllowance: "",
    foodAllowance: "",
    pfEmployee: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onBack();
  };

  return (
    <div className="add-salary-container">
      <h2>Add New Salary</h2>

      <div className="form-container">
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Basic Pay:</label>
          <input type="text" name="basicPay" value={formData.basicPay} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>HRA:</label>
          <input type="text" name="hra" value={formData.hra} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>PF:</label>
          <input type="text" name="pf" value={formData.pf} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Deductions:</label>
          <input type="text" name="deductions" value={formData.deductions} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Medical Allowance:</label>
          <input type="text" name="medicalAllowance" value={formData.medicalAllowance} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Travel Allowance:</label>
          <input type="text" name="travelAllowance" value={formData.travelAllowance} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Food Allowance:</label>
          <input type="text" name="foodAllowance" value={formData.foodAllowance} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>PF Employee:</label>
          <input type="text" name="pfEmployee" value={formData.pfEmployee} onChange={handleChange} />
        </div>

        <div className="button-container">
          <button className="back-btn" onClick={onBack}>Back</button>
          <button className="cancel-btn" onClick={onBack}>Cancel</button>
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddNewSalary;
