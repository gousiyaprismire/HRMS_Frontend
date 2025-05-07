import React, { useState, useEffect } from "react";
import "./AddEmployee.css";
 
function EmployeeManagement() {
  const [employeeRecords, setEmployeeRecords] = useState([]);
  const [showAddEmployeePopup, setShowAddEmployeePopup] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [employeeSearchQuery, setEmployeeSearchQuery] = useState("");
 
  useEffect(() => {
    // Fetch existing employee records from the server
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
          setEmployeeRecords((prevRecords) => prevRecords.filter((emp) => emp.id !== id));
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
        headers: {
          "Content-Type": "application/json",
        },
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
          id="employee-search-input"
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
          <ul>
            {filteredEmployees.map((employee) => (
              <li key={employee.id}>
                <div>{employee.name}</div>
                <div>{employee.email}</div>
                <div>{employee.department}</div>
                <button onClick={() => handleEditEmployee(employee)}>Edit</button>
                <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
              </li>
            ))}
          </ul>
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
          <label htmlFor="employee-name">Name:</label>
          <input
            type="text"
            id="employee-name"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
 
          <label htmlFor="employee-email">Email:</label>
          <input
            type="email"
            id="employee-email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
 
          <label htmlFor="employee-gender">Gender:</label>
          <select
            id="employee-gender"
            name="gender"
            value={employee.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
 
          <label htmlFor="employee-dob">Date of Birth:</label>
          <input
            type="date"
            id="employee-dob"
            name="dob"
            value={employee.dob}
            onChange={handleChange}
            required
          />
 
          <label htmlFor="employee-joining-date">Joining Date:</label>
          <input
            type="date"
            id="employee-joining-date"
            name="joiningDate"
            value={employee.joiningDate}
            onChange={handleChange}
            required
          />
 
          <label htmlFor="employee-mobile">Mobile Number:</label>
          <input
            type="text"
            id="employee-mobile"
            name="mobile"
            value={employee.mobile}
            onChange={handleChange}
            required
          />
 
          <label htmlFor="employee-aadhar">Aadhar Number:</label>
          <input
            type="text"
            id="employee-aadhar"
            name="aadhar"
            value={employee.aadhar}
            onChange={handleChange}
            required
          />
 
          <label htmlFor="employee-account">Account Number:</label>
          <input
            type="text"
            id="employee-account"
            name="accountNumber"
            value={employee.accountNumber}
            onChange={handleChange}
            required
          />
 
          <label htmlFor="employee-department">Department:</label>
          <select
            id="employee-department"
            name="department"
            value={employee.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </select>
 
          <label htmlFor="employee-designation">Designation:</label>
          <input
            type="text"
            id="employee-designation"
            name="designation"
            value={employee.designation}
            onChange={handleChange}
            required
          />
 
          <label htmlFor="employee-prev-company">Previous Company Name:</label>
          <input
            type="text"
            id="employee-prev-company"
            name="prevCompany"
            value={employee.prevCompany}
            onChange={handleChange}
          />
 
          <label htmlFor="employee-pf-number">PF Number:</label>
          <input
            type="text"
            id="employee-pf-number"
            name="pfNumber"
            value={employee.pfNumber}
            onChange={handleChange}
          />
 
          <label htmlFor="employee-salary">Salary:</label>
          <input
            type="number"
            id="employee-salary"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            required
          />
 
          <label htmlFor="employee-current-address">Current Address:</label>
          <textarea
            id="employee-current-address"
            name="currentAddress"
            value={employee.currentAddress}
            onChange={handleChange}
            required
          ></textarea>
 
          <label htmlFor="employee-permanent-address">Permanent Address:</label>
          <textarea
            id="employee-permanent-address"
            name="permanentAddress"
            value={employee.permanentAddress}
            onChange={handleChange}
            required
          ></textarea>
 
          <label htmlFor="employee-status">Employee Status:</label>
          <select
            id="employee-status"
            name="status"
            value={employee.status}
            onChange={handleChange}
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
 
          <div className="add-employee-footer">
            <button type="add-employee-submit" className="add-employee-submit-btn">
              {editingEmployee ? "Update" : "Add"} Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
 
export default EmployeeManagement;
 