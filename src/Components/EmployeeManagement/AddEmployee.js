import React, { useState } from "react";
import "./EmployeeManagement.css";

const AddEmployee = ({ onAdd }) => {
  const [employee, setEmployee] = useState({ 
    name: "", 
    role: "", 
    department: "", 
    email: "", 
    phone: "" 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employee.name && employee.role && employee.department && employee.email && employee.phone) {
      onAdd(employee);
      setEmployee({ name: "", role: "", department: "", email: "", phone: "" });
    }
  };

  return (
    <div className="add-employee">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={employee.name} onChange={handleChange} required />
        <input type="text" name="role" placeholder="Role" value={employee.role} onChange={handleChange} required />
        <input type="text" name="department" placeholder="Department" value={employee.department} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={employee.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone Number" value={employee.phone} onChange={handleChange} required />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
