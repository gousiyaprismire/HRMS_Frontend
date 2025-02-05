import React, { useState } from "react";
import "./EmployeeManagement.css";

const EmployeeList = ({ employees = [], onSelectEmployee }) => {
  const [search, setSearch] = useState("");

  // Filter employees based on search input
  const filteredEmployees = employees?.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search employees by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {/* Employee List with Profile Summary */}
      <ul>
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((emp) => (
            <li key={emp.id} onClick={() => onSelectEmployee(emp)} className="employee-item">
              <div className="employee-info">
                <strong>{emp.name}</strong> - {emp.role}
              </div>
              <div className="employee-summary">
                <p><strong>Department:</strong> {emp.department}</p>
                <p><strong>Email:</strong> {emp.email}</p>
                <p><strong>Phone:</strong> {emp.phone}</p>
              </div>
            </li>
          ))
        ) : (
          <p>No employees found</p>
        )}
      </ul>
    </div>
  );
};

export default EmployeeList;
