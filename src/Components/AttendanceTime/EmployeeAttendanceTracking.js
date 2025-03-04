import React, { useState } from "react";
import "./EmployeeAttendanceTracking.css";

function EmployeeAttendanceTracking() {
  const [records] = useState([
    { id: 1, name: "Manjunadh", clockIn: "9:00 AM", clockOut: "6:00 PM" },
    { id: 2, name: "Sowri", clockIn: "9:15 AM", clockOut: "5:45 PM" },
    { id: 3, name: "Eknath", clockIn: "9:45 AM", clockOut: "6:30 PM" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecords, setFilteredRecords] = useState(records);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = records.filter(
      (record) =>
        record.id.toString().includes(query) ||
        record.name.toLowerCase().includes(query)
    );

    setFilteredRecords(filtered);
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleClosePopup = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setSelectedEmployee(null);
    }
  };

  return (
    <div className="attendance-container">
      <h2 className="attendance-header">Employee Attendance Tracking</h2>

      <div className="attendance-search-container">
        <input
          type="text"
          placeholder="Search by ID or Name"
          value={searchQuery}
          onChange={handleSearch}
          className="attendance-search-bar"
        />
      </div>

      <div className="attendance-table-container">
        {filteredRecords.length > 0 ? (
          <table className="attendance-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.name}</td>
                  <td>
                    <button
                      className="attendance-button"
                      onClick={() => handleViewDetails(record)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="attendance-no-records">No records found</p>
        )}
      </div>

      {selectedEmployee && (
        <div className="modal-overlay" onClick={handleClosePopup}>
          <div className="modal-content">
            <h3>Attendance Details</h3>
            <p><strong>ID:</strong> {selectedEmployee.id}</p>
            <p><strong>Name:</strong> {selectedEmployee.name}</p>
            <p><strong>Clock In:</strong> {selectedEmployee.clockIn}</p>
            <p><strong>Clock Out:</strong> {selectedEmployee.clockOut}</p>
            <button className="close-button" onClick={() => setSelectedEmployee(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeAttendanceTracking;
