import React, { useState } from "react";
import "./EmployeeManagement.css";

const EmployeeProfile = ({ employee, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({ ...employee });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });
  };

  // Handle save button click
  const handleSave = () => {
    onUpdate(editedEmployee); // Send updated data to the parent
    setIsEditing(false);
  };

  return (
    <div className="employee-profile">
      <h2>Employee Profile</h2>
      
      <div className="profile-details">
        <div className="profile-row">
          <strong>Name:</strong>
          {isEditing ? (
            <input type="text" name="name" value={editedEmployee.name} onChange={handleChange} />
          ) : (
            <span>{employee.name}</span>
          )}
        </div>

        <div className="profile-row">
          <strong>Email:</strong>
          {isEditing ? (
            <input type="email" name="email" value={editedEmployee.email} onChange={handleChange} />
          ) : (
            <span>{employee.email}</span>
          )}
        </div>

        <div className="profile-row">
          <strong>Phone:</strong>
          {isEditing ? (
            <input type="tel" name="phone" value={editedEmployee.phone} onChange={handleChange} />
          ) : (
            <span>{employee.phone}</span>
          )}
        </div>

        <div className="profile-row">
          <strong>Department:</strong>
          {isEditing ? (
            <input type="text" name="department" value={editedEmployee.department} onChange={handleChange} />
          ) : (
            <span>{employee.department}</span>
          )}
        </div>
      </div>

      {/* Toggle Button Between Edit & Save Mode */}
      {isEditing ? (
        <button onClick={handleSave} className="save-button">💾 Save Changes</button>
      ) : (
        <button onClick={() => setIsEditing(true)} className="edit-button">✏ Edit Profile</button>
      )}
    </div>
  );
};

export default EmployeeProfile;
