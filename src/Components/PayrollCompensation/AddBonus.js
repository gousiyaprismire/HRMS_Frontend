import React, { useState } from "react";
import "./AddBonus.css";

const AddBonus = ({ goBack }) => {
  const [formData, setFormData] = useState({
    empId: "",
    name: "",
    bonus: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Bonus Data Saved:", formData);
    goBack(); 
  };

  return (
    <div className="add-bonus-container">
      <h2>Add Bonus</h2>
      <div className="form-group">
        <label>Employee ID:</label>
        <input
          type="text"
          name="empId"
          value={formData.empId}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Bonus Amount:</label>
        <input
          type="number"
          name="bonus"
          value={formData.bonus}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Reason:</label>
        <input
          type="text"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
        />
      </div>
      <div className="button-group">
        <button className="back-btn" onClick={goBack}>Back</button>
        <button className="cancel-btn" onClick={goBack}>Cancel</button>
        <button className="save-btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AddBonus;