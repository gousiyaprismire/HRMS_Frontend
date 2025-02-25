import React, { useState } from "react";
import "./EmployeeManagement.css";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";
 

function EmployeeManagement() {
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      gender: "Male",
      dob: "1990-01-01",
      joiningDate: "2022-05-10",
      mobile: "123-456-7890",
      aadhar: "1234-5678-9012",
      accountNumber: "9876543210",
      department: "Engineering",
      designation: "Developer",
      prevCompany: "Tech Corp",
      pfNumber: "PF123456",
      salary: "60000",
      currentAddress: "123 Street, City",
      permanentAddress: "456 Avenue, City",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      gender: "Female",
      dob: "1992-07-15",
      joiningDate: "2021-03-25",
      mobile: "987-654-3210",
      aadhar: "4321-8765-2109",
      accountNumber: "1234567890",
      department: "HR",
      designation: "Manager",
      prevCompany: "Biz Solutions",
      pfNumber: "PF654321",
      salary: "75000",
      currentAddress: "789 Road, City",
      permanentAddress: "101 Street, City",
      status: "Inactive",
    }
  ]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Toggle Add Employee Popup
  const handleToggleAddEmployee = () => {
    setShowAddEmployee((prev) => !prev);
    setEditingEmployee(null);
  };

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Add or Update Employee
  const handleSaveEmployee = (employee) => {
    if (employee.id) {
      // Update existing employee
      setEmployees((prev) => prev.map((emp) => (emp.id === employee.id ? employee : emp)));
    } else {
      // Add new employee with unique ID
      setEmployees((prev) => [...prev, { ...employee, id: prev.length + 1 }]);
    }
    setShowAddEmployee(false);
  };

  // Handle Edit Employee
  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowAddEmployee(true);
  };

  // Handle Delete Employee
  const handleDeleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <div className="employee-management">
      {/* Navbar */}
      <header className="employee-navbar">
        <h2 className="navbar-title">All Employees</h2>
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </header>

      {/* Main Content Area */}
      <main className="employee-content">
        {/* Add Employee Button */}
        <button className="btn add-employee-btn" onClick={handleToggleAddEmployee}>
          ➕ ADD EMPLOYEE
        </button>

        {/* Employee List */}
        <section className="employee-list-section">
          <EmployeeList
            searchQuery={searchQuery}
            employees={employees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
          />
        </section>
      </main>

      {/* Add/Edit Employee Popup */}
      {showAddEmployee && (
        <div className="overlay">
          <div className="add-employee-popup right-popup">
            <AddEmployee
              onClose={handleToggleAddEmployee}
              onSave={handleSaveEmployee}
              editingEmployee={editingEmployee}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeManagement;
