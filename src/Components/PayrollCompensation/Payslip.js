import React, { useState } from "react";
import "./Payslip.css";

function Payslips({ onBack }) {
  const [employeeId, setEmployeeId] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [payslipData, setPayslipData] = useState([]);

  const handleShow = () => {
    setPayslipData([
      {
        id: "EMP001",
        name: "Manjunadh",
        month: "January",
        year: "2024",
        netSalary: "5000/-",
        status: "Paid",
      },
      {
        id: "EMP002",
        name: "Eknath",
        month: "January",
        year: "2024",
        netSalary: "4800/-",
        status: "Pending",
      },
    ]);
  };

  return (
    <div className="payslips-container">
      <button className="back-button" onClick={onBack}>Back</button>
      <h2>Payslips & Salary Statements</h2>
      
      <div className="filters">
        <div className="input-group">
          <label>Employee ID:</label>
          <input 
            type="text" 
            value={employeeId} 
            onChange={(e) => setEmployeeId(e.target.value)} 
            placeholder="Enter Employee ID" 
          />
        </div>
        <div className="input-group">
          <label>Month:</label>
          <input 
            type="text" 
            value={month} 
            onChange={(e) => setMonth(e.target.value)} 
            placeholder="Enter Month" 
          />
        </div>
        <div className="input-group">
          <label>Year:</label>
          <input 
            type="text" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            placeholder="Enter Year" 
          />
        </div>
      </div>

      <div className="button-group">
        <button onClick={handleShow}>Show</button>
        <button>Add New Payslip</button>
        <button className="settings-button">Settings</button>
      </div>

      {payslipData.length > 0 && (
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
      )}
    </div>
  );
}

export default Payslips;
