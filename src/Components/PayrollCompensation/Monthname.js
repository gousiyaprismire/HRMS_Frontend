import React, { useState } from "react";
import "./Monthname.css";

function MonthName({ onBack }) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [data, setData] = useState([]);

  const handleShow = () => {
    setData([
      { year: "2024", month: "January", fromDate: "01-01-2024", toDate: "31-01-2024", activity: "Processing", createdDate: "02-01-2024" },
      { year: "2024", month: "February", fromDate: "01-02-2024", toDate: "29-02-2024", activity: "Pending", createdDate: "03-02-2024" }
    ]);
  };

  return (
    <div className="month-container">
      <h2>Month Name</h2>

      <div className="filters">
        <div className="input-group">
          <label>Year:</label>
          <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Enter Year" />
        </div>

        <div className="input-group">
          <label>Month:</label>
          <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Enter Month" />
        </div>
      </div>

      <div className="button-group">
        <button onClick={handleShow}>Show</button>
        <button>Add New</button>
        <button className="settings-button">Settings</button>
      </div>

      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Month Name</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Activity</th>
              <th>Date Created</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.year}</td>
                <td>{row.month}</td>
                <td>{row.fromDate}</td>
                <td>{row.toDate}</td>
                <td>{row.activity}</td>
                <td>{row.createdDate}</td>
                <td><button>Edit</button></td>
                <td><button>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="back-button-container">
        <button className="back-button" onClick={onBack}>Back</button>
      </div>
    </div>
  );
}

export default MonthName;
