import React, { useState } from "react";
import "./EmployeeReports.css";

function EmployeeReports() {
  const [reports, setReports] = useState([
    { id: 1, name: "Employee Count", value: "120" },
    { id: 2, name: "New Hires (Last Month)", value: "10" },
    { id: 3, name: "Resigned Employees", value: "5" },
    { id: 4, name: "Total Departments", value: "8" },
    { id: 5, name: "Average Tenure (Years)", value: "3.5" },
  ]);

  return (
    <div className="employee-reports-container">
      <h1>Employee Reports</h1>
      <p>Generate reports on workforce statistics.</p>

      <div className="report-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Report Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.name}</td>
                <td>{report.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeReports;
