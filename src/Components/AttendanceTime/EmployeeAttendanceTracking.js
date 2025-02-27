import React, { useState } from "react";
// import "./EmployeeAttendanceTracking.css";

function EmployeeAttendanceTracking() {
  const [records] = useState([
    { id: 1, name: "Manjunadh", clockIn: "9:00 AM", clockOut: "6:00 PM" },
    { id: 2, name: "Sowri", clockIn: "9:15 AM", clockOut: "5:45 PM" },
    { id: 3, name: "Eknath", clockIn: "9:45 AM", clockOut: "6:30 PM" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecords, setFilteredRecords] = useState(records);

  const handleSearch = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setFilteredRecords(records); // Show all records when input is empty
    } else {
      const filtered = records.filter(
        (record) =>
          record.id.toString() === query || record.name.toLowerCase().includes(query)
      );
      setFilteredRecords(filtered);
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
        <table className="attendance-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.name}</td>
                  <td>
                    <button className="attendance-button">
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="attendance-no-records">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeAttendanceTracking;
