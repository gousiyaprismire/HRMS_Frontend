import React from "react";
import "./EmployeeList.css";
 
function EmployeeList({ searchQuery, employees, onEdit, onDelete }) {
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
return (
<div className="emp-table-container">
<table className="emp-table">
<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Gender</th>
<th>DOB</th>
<th>Joining Date</th>
<th>Mobile</th>
<th>Aadhar</th>
<th>Account No</th>
<th>Department</th>
<th>Designation</th>
<th>Previous Company</th>
<th>PF Number</th>
<th>Salary</th>
<th>Current Address</th>
<th>Permanent Address</th>
<th>Status</th>
<th>Actions</th>
</tr>
</thead>
<tbody>
      {filteredEmployees.length > 0 ? (
      filteredEmployees.map((employee) => (
<tr key={employee.id}>
<td>{employee.id}</td>
<td>{employee.name}</td>
<td>{employee.email}</td>
<td>{employee.gender}</td>
<td>{employee.dob}</td>
<td>{employee.joiningDate}</td>
<td>{employee.mobile}</td>
<td>{employee.aadhar}</td>
<td>{employee.accountNumber}</td>
<td>{employee.department}</td>
<td>{employee.designation}</td>
<td>{employee.prevCompany}</td>
<td>{employee.pfNumber}</td>
<td>{employee.salary}</td>
<td>{employee.currentAddress}</td>
<td>{employee.permanentAddress}</td>
<td>{employee.status}</td>
<td className="emp-action-buttons">
<button className="emp-edit-btn" onClick={() => onEdit(employee)}>✏ Edit</button>
<button className="emp-delete-btn" onClick={() => onDelete(employee.id)}>🗑 Delete</button>
</td>
</tr>
 ))
 ) : (
<tr>
<td colSpan="18" className="emp-no-data">No employees found</td>
</tr>
 )}
</tbody>
</table>
</div>
  );
}
export default EmployeeList;
