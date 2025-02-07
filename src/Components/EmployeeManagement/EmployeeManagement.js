import React, { useState } from "react";
import "./EmployeeManagement.css";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";
import EmployeeProfile from "./EmployeeProfile";
import EmployeeDocuments from "./EmployeeDocuments";
import { employees as initialEmployees } from "./data"; 

function EmployeeManagement() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [activeTab, setActiveTab] = useState("employee-list");

  return (
    <div className="employee-management-container">
      <h2 className="employee-management-header">Employee Management</h2>

      {/* Navigation Tabs */}
      <div className="tabs">
        <button onClick={() => setActiveTab("employee-list")} className={activeTab === "employee-list" ? "active" : ""}>📋 Employee List</button>
        <button 
          onClick={() => selectedEmployee && setActiveTab("employee-profile")} 
          className={activeTab === "employee-profile" ? "active" : ""}
          disabled={!selectedEmployee}
        >
          👤 Employee Profile
        </button>
        <button onClick={() => setActiveTab("add-employee")} className={activeTab === "add-employee" ? "active" : ""}>➕ Add Employee</button>
        <button 
          onClick={() => selectedEmployee && setActiveTab("employee-documents")} 
          className={activeTab === "employee-documents" ? "active" : ""}
          disabled={!selectedEmployee}
        >
          📂 Employee Documents
        </button>
      </div>

      {/* Content Area - Displays Based on Active Tab */}
      <div className="tab-content">
        {activeTab === "employee-list" && <EmployeeList employees={employees} onSelectEmployee={setSelectedEmployee} />}
        {activeTab === "add-employee" && <AddEmployee onAdd={(newEmp) => setEmployees([...employees, { ...newEmp, id: employees.length + 1 }])} />}
        {activeTab === "employee-profile" && selectedEmployee && <EmployeeProfile employee={selectedEmployee} />}
        {activeTab === "employee-documents" && selectedEmployee && <EmployeeDocuments employee={selectedEmployee} />}
      </div>
    </div>
  );
}

export default EmployeeManagement;
