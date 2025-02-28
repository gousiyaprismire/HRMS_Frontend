import React, { useState } from "react";
import "./EmployeeManagement.css";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";
import ConfirmationModal from "./ConfirmationModal"; // Import Modal Component

function EmployeeManagement() {
  const [showAddEmployeePopup, setShowAddEmployeePopup] = useState(false);
  const [employeeSearchQuery, setEmployeeSearchQuery] = useState("");  
  const [employeeRecords, setEmployeeRecords] = useState([
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
    },
  ]);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [showEmployeeConfirmation, setShowEmployeeConfirmation] = useState(false);
  const [confirmationEmployeeAction, setConfirmationEmployeeAction] = useState(null);
  const [confirmationEmployeeMessage, setConfirmationEmployeeMessage] = useState(""); // Added for dynamic message

  const toggleAddEmployeePopup = () => {
    setShowAddEmployeePopup((prev) => !prev);
    setEmployeeToEdit(null);
  };

  const handleEmployeeSearchChange = (e) => {
    setEmployeeSearchQuery(e.target.value);
  };

  const handleSaveEmployee = (employee) => {
    if (showEmployeeConfirmation) return; // Prevent opening multiple modals

    const message = employee.id
      ? "Are you sure you want to update this employee?"
      : "Are you sure you want to add this employee?";

    setConfirmationEmployeeMessage(message);
    setShowEmployeeConfirmation(true);

    setConfirmationEmployeeAction(() => () => {
      setEmployeeRecords((prev) =>
        employee.id
          ? prev.map((emp) => (emp.id === employee.id ? employee : emp))
          : [{ ...employee, id: prev.length ? Math.max(...prev.map((e) => e.id)) + 1 : 1 }, ...prev]
      );

      setShowAddEmployeePopup(false);
      setShowEmployeeConfirmation(false);
    });
  };

  const handleEditEmployee = (employee) => {
    setEmployeeToEdit(employee);
    setShowAddEmployeePopup(true);
  };

  const handleDeleteEmployee = (id) => {
    if (showEmployeeConfirmation) return; // Prevent duplicate modals

    setConfirmationEmployeeMessage("Are you sure you want to delete this employee?");
    setShowEmployeeConfirmation(true);

    setConfirmationEmployeeAction(() => () => {
      setEmployeeRecords((prev) => prev.filter((emp) => emp.id !== id));
      setShowEmployeeConfirmation(false);
    });
  };

  const handleConfirmEmployeeAction = () => {
    if (confirmationEmployeeAction) {
      confirmationEmployeeAction();
    }
  };

  return (
    <div className="employee-management-wrapper">
      <header className="employee-management-header">
        <h2 className="employee-header-title">All Employees</h2>
        <input
          type="text"
          id="employee-search-input"
          className="employee-search-box"
          placeholder="Search"
          value={employeeSearchQuery}
          onChange={handleEmployeeSearchChange}
        />
      </header>

      <main className="employee-management-main">
        <button className="btn employee-add-button" onClick={toggleAddEmployeePopup}>
          ➕ ADD EMPLOYEE
        </button>

        <section className="employee-list-container">
          <EmployeeList
            searchQuery={employeeSearchQuery}
            employees={employeeRecords}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
          />
        </section>
      </main>

      {showAddEmployeePopup && (
        <div className="employee-overlay">
          <div className="employee-popup">
            <AddEmployee
              onClose={toggleAddEmployeePopup}
              onSave={handleSaveEmployee}
              editingEmployee={employeeToEdit}
            />
          </div>
        </div>
      )}

      {showEmployeeConfirmation && (
        <ConfirmationModal
          message={confirmationEmployeeMessage} // Dynamic message
          onConfirm={handleConfirmEmployeeAction}
          onCancel={() => setShowEmployeeConfirmation(false)}
        />
      )}
    </div>
  );
}

export default EmployeeManagement;
