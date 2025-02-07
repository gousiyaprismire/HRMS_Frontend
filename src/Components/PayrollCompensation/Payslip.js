import React, { useState } from "react";
import "./Payslip.css";

function Payslips({ onBack }) {
  const [payslipData, setPayslipData] = useState([
    { id: "EMP001", name: "Manjunadh", month: "January", year: "2024", netSalary: "5000/-", status: "Paid" },
    { id: "EMP002", name: "Eknath", month: "January", year: "2024", netSalary: "4800/-", status: "Pending" },
  ]);

  return (
    <div className="payslips-container">
      <h2>Payslips & Salary Statements</h2>

      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Month</th>
            <th>Year</th>
            <th>Net Salary</th>
            <th>Status</th>
            <th>View</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {payslipData.map((payslip, index) => (
            <tr key={index}>
              <td>{payslip.id}</td>
              <td>{payslip.name}</td>
              <td>{payslip.month}</td>
              <td>{payslip.year}</td>
              <td>{payslip.netSalary}</td>
              <td>{payslip.status}</td>
              <td><button>View</button></td>
              <td><button>Download</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="back-button" onClick={onBack}>Back</button>
    </div>
  );
}

export default Payslips;
