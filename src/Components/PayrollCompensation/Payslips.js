import React, { useState } from "react";
import "./Payslips.css";
import AddNewPayslip from "./AddNewPayslip";

const Payslips = ({ goBack, payslipData }) => {
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [selectedYear, setSelectedYear] = useState("Select Year");
  const [showAddPayslip, setShowAddPayslip] = useState(false);

  const filteredPayslips = payslipData.filter((payslip) => {
    return (
      (payslip.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payslip.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedMonth === "All Months" || payslip.month === selectedMonth) &&
      (selectedYear === "Select Year" || payslip.year === selectedYear)
    );
  });

  if (showAddPayslip) {
    return <AddNewPayslip goBack={() => setShowAddPayslip(false)} />;
  }

  return (
    <div className="payslip-container">
      <h2>Payslips</h2>
      
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by Name or Emp ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
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
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
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
          {filteredPayslips.map((payslip) => (
            <tr key={payslip.empId}>
              <td>{payslip.empId}</td>
              <td>{payslip.name}</td>
              <td>
                <button className="view-btn" onClick={() => setSelectedPayslip(payslip)}>
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
        <button className="back-btn" onClick={goBack}>Back</button>
        <button className="new-payslip-btn" onClick={() => setShowAddPayslip(true)}>New Payslip</button>
      </div>
    </div>
  );
};

export default Payslips;
