import React from "react";
import "./PayrollProcessing.css";

const PayrollProcessing = ({ onBack }) => {
  const payrollData = [
    {
      empId: "EMP001",
      name: "Manjunath",
      month: "January",
      year: "2024",
      status: "Processed",
      processedDate: "2024-01-31",
    },
    {
      empId: "EMP002",
      name: "Eknath",
      month: "February",
      year: "2024",
      status: "Pending",
      processedDate: "-",
    },
  ];

  return (
    <div className="payroll-processing-container">
      <h2>Payroll Processing</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Month</th>
              <th>Year</th>
              <th>Status</th>
              <th>Processed Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.empId}</td>
                <td>{entry.name}</td>
                <td>{entry.month}</td>
                <td>{entry.year}</td>
                <td>{entry.status}</td>
                <td>{entry.processedDate}</td>
                <td>
                  {entry.status === "Pending" ? (
                    <button className="process-btn">Process</button>
                  ) : (
                    <button className="disabled-btn" disabled>Processed</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="button-group">
        <button className="back-btn" onClick={onBack}>Back</button>
      </div>
    </div>
  );
};

export default PayrollProcessing;
