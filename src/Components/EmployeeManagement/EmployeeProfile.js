import React, { useState, useEffect } from "react";
import "./EmployeeManagement.css";

const EmployeeProfile = ({ employee }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedEmployee, setUpdatedEmployee] = useState(employee || {});

  // ✅ Update the state when the selected employee changes
  useEffect(() => {
    if (employee) {
      setUpdatedEmployee(employee);
    }
  }, [employee]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee({ ...updatedEmployee, [name]: value });
  };

  if (!employee) {
    return <p className="no-employee">⚠️ No employee selected. Please choose an employee from the list.</p>;
  }

  return (
    <div className="employee-profile">
      <h2>Employee Profile</h2>

      {editMode ? (
        <>
          <input type="text" name="name" value={updatedEmployee.name} onChange={handleChange} placeholder="Name" />
          <input type="text" name="role" value={updatedEmployee.role} onChange={handleChange} placeholder="Role" />
          <input type="text" name="department" value={updatedEmployee.department} onChange={handleChange} placeholder="Department" />
          <input type="email" name="email" value={updatedEmployee.email} onChange={handleChange} placeholder="Email" />
          <input type="tel" name="phone" value={updatedEmployee.phone} onChange={handleChange} placeholder="Phone Number" />
          <button onClick={() => setEditMode(false)}>Save</button>
        </>
      ) : (
        <>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Role:</strong> {employee.role}</p>
          <p><strong>Department:</strong> {employee.department}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Phone:</strong> {employee.phone}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </>
      )}
    </div>
  );
};

export default EmployeeProfile;
