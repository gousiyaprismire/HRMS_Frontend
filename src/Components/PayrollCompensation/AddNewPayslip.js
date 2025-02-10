import React from "react";
import "./Payslips.css";

const AddNewPayslip = () => {
  return (
    <div className="add-payslip-container">
      <h2>Add New Payslip</h2>
      <form>
        <div className="input-group">
          <label>Emp ID</label>
          <input type="text" />
        </div>
        <div className="input-group">
          <label>Name</label>
          <input type="text" />
        </div>
        <div className="input-group">
          <label>PAN</label>
          <input type="text" />
        </div>
        <div className="input-group">
          <label>UAN</label>
          <input type="text" />
        </div>
        <div className="input-group">
          <label>Bank</label>
          <input type="text" />
        </div>
        <div className="input-group">
          <label>Month</label>
          <select>
            <option>January</option>
            <option>February</option>
            <option>March</option>
          </select>
        </div>
        <div className="input-group">
          <label>Year</label>
          <input type="text" value="2025" readOnly />
        </div>
        <div className="input-group">
          <label>Payable Days</label>
          <input type="text" />
        </div>
        <div className="input-group">
          <label>LOP Days</label>
          <input type="text" />
        </div>
        <div className="input-group">
          <label>Total Earnings</label>
          <input type="text" />
        </div>
        <div className="input-group">
          <label>HRA</label>
          <input type="text" />
        </div>
        <div className="input-group">
          <label>Bonuses</label>
          <input type="text" />
        </div>
        <div className="input-group">
          <label>Deductions</label>
          <input type="text" />
        </div>
        <button className="save-btn">Save</button>
        </form>
    </div>
  );
};

export default AddNewPayslip;

