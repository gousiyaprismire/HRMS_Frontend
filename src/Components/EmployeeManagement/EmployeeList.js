import React from "react";
import "./EmployeeList.css";

function EmployeeList({ searchQuery, employees, onEdit, onDelete }) {
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Department</th>
          <th>Contact</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.role}</td>
              <td>{employee.department}</td>
              <td>{employee.contact}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(employee)}>✏ Edit</button>
                <button className="delete-btn" onClick={() => onDelete(employee.id)}>🗑 Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No employees found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default EmployeeList;
