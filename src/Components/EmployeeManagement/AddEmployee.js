import React, { useState, useEffect } from "react";
import "./AddEmployee.css";
 
function EmployeeManagement() {
  const [employeeRecords, setEmployeeRecords] = useState([]);
  const [showAddEmployeePopup, setShowAddEmployeePopup] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [employeeViewPopup, setEmployeeViewPopup] = useState(null);
  const [employeeSearchQuery, setEmployeeSearchQuery] = useState("");
 
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employees");
        if (response.ok) {
          const data = await response.json();
          setEmployeeRecords(data);
        } else {
          alert("Failed to fetch employee records");
        }
      } catch (error) {
        console.error("Error fetching employee records:", error);
        alert("Error fetching employee records");
      }
    };
 
    fetchEmployees();
  }, []);
 
  const handleAddEmployee = () => {
    setEmployeeToEdit(null);
    setShowAddEmployeePopup(true);
  };
 
  const handleEditEmployee = (employee) => {
    setEmployeeToEdit(employee);
    setShowAddEmployeePopup(true);
  };
 
  const handleDeleteEmployee = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8080/api/employees/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setEmployeeRecords((prev) => prev.filter((emp) => emp.id !== id));
          alert("Employee deleted successfully");
        } else {
          alert("Failed to delete employee");
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Error deleting employee");
      }
    }
  };
 
  const handleSaveEmployee = async (employee) => {
    try {
      const method = employee.id ? "PUT" : "POST";
      const url = employee.id
        ? `http://localhost:8080/api/employees/${employee.id}`
        : "http://localhost:8080/api/employees";
 
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });
 
      if (response.ok) {
        const updatedEmployee = await response.json();
        setEmployeeRecords((prevRecords) => {
          if (employee.id) {
            return prevRecords.map((emp) =>
              emp.id === updatedEmployee.id ? updatedEmployee : emp
            );
          } else {
            return [updatedEmployee, ...prevRecords];
          }
        });
        setShowAddEmployeePopup(false);
        alert("Employee saved successfully");
      } else {
        alert("Failed to save employee");
      }
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("Error saving employee");
    }
  };
 
  const handleSearchChange = (e) => {
    setEmployeeSearchQuery(e.target.value);
  };
 
  const filteredEmployees = employeeRecords.filter((employee) =>
    employee.name.toLowerCase().includes(employeeSearchQuery.toLowerCase())
  );
 
  return (
    <div className="employee-management-wrapper">
      <header className="employee-management-header">
        <h2 className="employee-header-title">Employee Management</h2>
        <input
          type="text"
          className="employee-search-box"
          placeholder="Search by name"
          value={employeeSearchQuery}
          onChange={handleSearchChange}
        />
      </header>
 
      <main className="employee-management-main">
        <button className="btn employee-add-button" onClick={handleAddEmployee}>
          ➕ Add Employee
        </button>
 
        <section className="employee-list-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.mobile}</td>
                  <td>
                    <button onClick={() => setEmployeeViewPopup(employee)}>View</button>
                    <button onClick={() => handleEditEmployee(employee)}>Edit</button>
                    <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
 
      {showAddEmployeePopup && (
        <div className="employee-overlay">
          <div className="employee-popup">
            <AddEmployee
              onClose={() => setShowAddEmployeePopup(false)}
              onSave={handleSaveEmployee}
              editingEmployee={employeeToEdit}
            />
          </div>
        </div>
      )}
 
      {employeeViewPopup && (
        <div className="employee-overlay">
          <div className="employee-popup">
            <div className="add-employee-header">
              <h3>Employee Details</h3>
              <button className="add-employee-close-btn" onClick={() => setEmployeeViewPopup(null)}>
                ✖
              </button>
            </div>
            <div className="employee-details-content">
              {Object.entries(employeeViewPopup).map(([key, value]) => (
                <p key={key}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 
function AddEmployee({ onClose, onSave, editingEmployee }) {
  const [employee, setEmployee] = useState({
    id: null,
    name: "",
    email: "",
    gender: "",
    dob: "",
    joiningDate: "",
    mobile: "",
    aadhar: "",
    accountNumber: "",
    department: "",
    designation: "",
    prevCompany: "",
    pfNumber: "",
    salary: "",
    currentAddress: "",
    permanentAddress: "",
    status: "Active",
  });
 
  useEffect(() => {
    if (editingEmployee) {
      setEmployee(editingEmployee);
    }
  }, [editingEmployee]);
 
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(employee);
  };
 
  return (
    <div className="add-employee-popup">
      <div className="add-employee-header">
        <h3>{editingEmployee ? "Edit Employee" : "Add Employee"}</h3>
        <button className="add-employee-close-btn" onClick={onClose}>
          ✖
        </button>
      </div>
      <div className="add-employee-content">
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={employee.name} onChange={handleChange} required />
 
          <label>Email:</label>
          <input type="email" name="email" value={employee.email} onChange={handleChange} required />
 
          <label>Gender:</label>
          <select name="gender" value={employee.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
 
          <label>Date of Birth:</label>
          <input type="date" name="dob" value={employee.dob} onChange={handleChange} required />
 
          <label>Joining Date:</label>
          <input type="date" name="joiningDate" value={employee.joiningDate} onChange={handleChange} required />
 
          <label>Mobile:</label>
          <input type="text" name="mobile" value={employee.mobile} onChange={handleChange} required />
 
          <label>Aadhar Number:</label>
          <input type="text" name="aadhar" value={employee.aadhar} onChange={handleChange} required />
 
          <label>Account Number:</label>
          <input type="text" name="accountNumber" value={employee.accountNumber} onChange={handleChange} required />
 
          <label>Department:</label>
          <select name="department" value={employee.department} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </select>
 
          <label>Designation:</label>
          <input type="text" name="designation" value={employee.designation} onChange={handleChange} required />
 
          <label>Previous Company:</label>
          <input type="text" name="prevCompany" value={employee.prevCompany} onChange={handleChange} />
 
          <label>PF Number:</label>
          <input type="text" name="pfNumber" value={employee.pfNumber} onChange={handleChange} />
 
          <label>Salary:</label>
          <input type="number" name="salary" value={employee.salary} onChange={handleChange} required />
 
          <label>Current Address:</label>
          <textarea name="currentAddress" value={employee.currentAddress} onChange={handleChange} required />
 
          <label>Permanent Address:</label>
          <textarea name="permanentAddress" value={employee.permanentAddress} onChange={handleChange} required />
 
          <label>Status:</label>
          <select name="status" value={employee.status} onChange={handleChange} required>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
 
          <button type="submit" className="submit-btn">
            {editingEmployee ? "Update" : "Add"} Employee
          </button>
        </form>
      </div>
    </div>
  );
}
 
export default EmployeeManagement;