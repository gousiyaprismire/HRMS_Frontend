import React, { useState } from "react";
import "./SalaryStructure.css";

const SalaryStructure = ({ goBack, openAddNew, salaryData, setSalaryData }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = salaryData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="salary-structure">
      <h2>Salary Structure</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-btn">🔍</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Basic Pay</th>
            <th>HRA</th>
            <th>PF</th>
            <th>Deductions</th>
            <th>Medical Allowance</th>
            <th>Travel Allowance</th>
            <th>Food Allowance</th>
            <th>PF Employee</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.basicPay}</td>
              <td>{employee.hra}</td>
              <td>{employee.pf}</td>
              <td>{employee.deductions}</td>
              <td>{employee.medical}</td>
              <td>{employee.travel}</td>
              <td>{employee.food}</td>
              <td>{employee.pfEmployee}</td>
              <td>
                <button className="edit-btn">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button className="back-btn" onClick={goBack}>Back</button>
        <button className="add-btn" onClick={openAddNew}>Add New</button>
      </div>
    </div>
  );
};

export default SalaryStructure;

