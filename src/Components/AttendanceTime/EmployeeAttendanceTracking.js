import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./attendance.css";

function EmployeeAttendanceTracking() {
  const [records] = useState([
    { id: 1, name: "Manjunadh", clockIn: "9:00 AM", clockOut: "6:00 PM" },
    { id: 2, name: "Sowri", clockIn: "9:15 AM", clockOut: "5:45 PM" },
    { id: 3, name: "Eknath", clockIn: "9:45 AM", clockOut: "6:30 PM" },
  ]);
  const [searchId, setSearchId] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSearch = (e) => {
    setSearchId(e.target.value);
  };

  const handleViewDetails = (id) => {
    const employee = records.find((record) => record.id === id);
    setSelectedEmployee(employee);
  };

  return (
    <div className="attendance-container">
      <h2>Employee Attendance Tracking</h2>
      <button onClick={() => navigate(-1)}>Back</button> {/* Back button */}
      <input
        type="text"
        placeholder="Search by ID"
        value={searchId}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records
              .filter((record) =>
                searchId ? record.id.toString().includes(searchId) : true
              )
              .map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.name}</td>
                  <td>
                    <button onClick={() => handleViewDetails(record.id)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {selectedEmployee && (
        <div className="details-modal">
          <h3>Attendance Details</h3>
          <p><strong>ID:</strong> {selectedEmployee.id}</p>
          <p><strong>Name:</strong> {selectedEmployee.name}</p>
          <p><strong>Clock In:</strong> {selectedEmployee.clockIn}</p>
          <p><strong>Clock Out:</strong> {selectedEmployee.clockOut}</p>
          <button onClick={() => setSelectedEmployee(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default EmployeeAttendanceTracking;
