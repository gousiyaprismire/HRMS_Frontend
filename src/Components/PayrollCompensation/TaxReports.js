import React, { useState } from "react";
import "./TaxDeductionReports.css";
import AddNewTaxDeduction from "./AddNewTaxDeduction";

const TaxDeductionReports = ({ onBack }) => {
  const [showAddNew, setShowAddNew] = useState(false);

  const reportsData = [
    {
      empId: "EMP001",
      name: "Manjunath",
      tax: "₹5,000",
      pf: "₹2,500",
      insurance: "₹1,000",
      totalDeductions: "₹8,500",
      month: "January",
      year: "2024",
    },
    {
      empId: "EMP002",
      name: "Eknath",
      tax: "₹4,000",
      pf: "₹2,000",
      insurance: "₹800",
      totalDeductions: "₹6,800",
      month: "February",
      year: "2024",
    },
  ];

  return (
    <div className="tax-deduction-container">
      {showAddNew ? (
        <AddNewTaxDeduction onBack={() => setShowAddNew(false)} />
      ) : (
        <>
          <h2>Tax & Deduction Reports</h2>

          <div className="button-container">
            <button className="add-btn" onClick={() => setShowAddNew(true)}>Add New</button>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Emp ID</th>
                  <th>Name</th>
                  <th>Tax</th>
                  <th>PF</th>
                  <th>Insurance</th>
                  <th>Total Deductions</th>
                  <th>Month</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {reportsData.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.empId}</td>
                    <td>{entry.name}</td>
                    <td>{entry.tax}</td>
                    <td>{entry.pf}</td>
                    <td>{entry.insurance}</td>
                    <td>{entry.totalDeductions}</td>
                    <td>{entry.month}</td>
                    <td>{entry.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="button-group">
            <button className="back-btn" onClick={onBack}>Back</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaxDeductionReports;
