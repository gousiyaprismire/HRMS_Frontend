import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payslips.css";



const Payslips = () => {
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const navigate = useNavigate();

  const payslips = [
    {
      empId: "EMP001",
      name: "Manjunath",
      pan: "ABCDE1234F",
      uan: "123456789012",
      bank: "HDFC Bank - XXXX1234",
      month: "January",
      year: "2025",
      payableDays: 26,
      lopDays: 4,
      doj: "2022-05-15",
      gender: "Male",
      location: "Bangalore",
      totalEarnings: 50000,
      hra: 10000,
      otherAllowances: 5000,
      bonuses: 2000,
      deductions: 3000,
    },
    {
      empId: "EMP002",
      name: "Eknath",
      pan: "XYZAB6789P",
      uan: "098765432109",
      bank: "ICICI Bank - XXXX5678",
      month: "February",
      year: "2025",
      payableDays: 28,
      lopDays: 2,
      doj: "2021-08-10",
      gender: "Female",
      location: "Mumbai",
      totalEarnings: 60000,
      hra: 12000,
      otherAllowances: 4000,
      bonuses: 5000,
      deductions: 3000,
    },
  ];

  return (
    <div className="payslip-container">
      <h2>Payslips</h2>

      
      <div className="filter-container">
        <input type="text" placeholder="Search by Name or Emp ID..." />
        <select>
          <option>All Months</option>
          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
          <option>July</option>
          <option>August</option>
          <option>September</option>
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>
        <select>
          <option>Select Year</option>
          <option>2023</option>
          <option>2024</option>
          <option>2025</option>
        </select>
        <button className="search-btn">🔍</button>
      </div>

      <table className="payslip-table">
        <thead>
          <tr>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payslips.map((payslip) => (
            <tr key={payslip.empId}>
              <td>{payslip.empId}</td>
              <td>{payslip.name}</td>
              <td>
                <button
                  className="view-btn"
                  onClick={() => setSelectedPayslip(payslip)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPayslip && (
        <div className="payslip-popup">
          <div className="payslip-details">
            <h3>Payslip Details</h3>
            <p><strong>PAN:</strong> {selectedPayslip.pan}</p>
            <p><strong>UAN:</strong> {selectedPayslip.uan}</p>
            <p><strong>Bank:</strong> {selectedPayslip.bank}</p>
            <p><strong>Month:</strong> {selectedPayslip.month}</p>
            <p><strong>Year:</strong> {selectedPayslip.year}</p>
            <p><strong>Payable Days:</strong> {selectedPayslip.payableDays}</p>
            <p><strong>LOP Days:</strong> {selectedPayslip.lopDays}</p>
            <p><strong>DOJ:</strong> {selectedPayslip.doj}</p>
            <p><strong>Gender:</strong> {selectedPayslip.gender}</p>
            <p><strong>Location:</strong> {selectedPayslip.location}</p>
            <p><strong>Total Earnings:</strong> {selectedPayslip.totalEarnings}</p>
            <p><strong>HRA:</strong> {selectedPayslip.hra}</p>
            <p><strong>Other Allowances:</strong> {selectedPayslip.otherAllowances}</p>
            <p><strong>Bonuses:</strong> {selectedPayslip.bonuses}</p>
            <p><strong>Deductions:</strong> {selectedPayslip.deductions}</p>

            <div className="payslip-buttons">
              <button className="close-btn" onClick={() => setSelectedPayslip(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

     
      <div className="button-container">
        <button className="back-btn" onClick={() => navigate("/payroll-compensation")}>Back</button>
        <button className="new-payslip-btn" onClick={() => navigate("/add-new-payslip")}>New Payslip</button>
      </div>
      </div>
  );
};

export default Payslips;
