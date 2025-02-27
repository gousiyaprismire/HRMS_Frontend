import React, { useState } from "react";
import "./EmployeeManagement.css";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";

function EmployeeManagement() {
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [employees, setEmployees] = useState([
    {
      id: 2,
      name: "Manjnadh",
      email: "manjnadh@example.com",
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
    },
    {
      id: 1,
      name: "Sowri",
      email: "sowri@example.com",
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
    }
  ]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleToggleAddEmployee = () => {
    setShowAddEmployee((prev) => !prev);
    setEditingEmployee(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSaveEmployee = (employee) => {
    if (!employee.name.trim() || !employee.email.trim()) {
      alert("Name and Email are required!");
      return;
    }
  
    if (employee.id) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === employee.id ? employee : emp))
      );
    } else {
      const newId = employees.length ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
      setEmployees((prev) => [{ ...employee, id: newId }, ...prev]); 
    }
    setShowAddEmployee(false);
  };
  
  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowAddEmployee(true);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <div className="employee-management-container">
      <header className="employee-navbar-container">
        <h2 className="navbar-title">All Employees</h2>
        <input
          type="text"
          className="employee-search-input"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </header>

      <main className="employee-main-content">
        <button className="btn add-employee-btn" onClick={handleToggleAddEmployee}>
          ➕ ADD EMPLOYEE
        </button>

        <section className="employee-list-section">
          <EmployeeList
            searchQuery={searchQuery}
            employees={employees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
          />
        </section>
      </main>

      {showAddEmployee && (
        <div className="overlay-container">
          <div className="add-employee-popup-container">
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