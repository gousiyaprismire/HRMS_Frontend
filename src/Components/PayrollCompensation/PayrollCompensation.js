import React, { useState } from "react";
import "./PayrollCompensation.css"; 
import SalaryStructure from "./Salarystructure"; 

function PayrollCompensation() {
  const [selectedSection, setSelectedSection] = useState(null);

  const renderSection = () => {
    switch (selectedSection) {
      case "Salarystructure":
        return <SalaryStructure />;
      case "payslips":
        return <h2>Payslips & Salary Statements</h2>;
      case "bonuses":
        return <h2>Bonuses & Incentives</h2>;
      case "payrollProcessing":
        return <h2>Payroll Processing</h2>;
      case "taxReports":
        return <h2>Tax & Deduction Reports</h2>;
      default:
        return <p>Select an option to view details.</p>;
    }
  };

  return (
    <div className="container">
      <h1>Payroll & Compensation</h1>
      <div className="button-container">
        <button onClick={() => setSelectedSection("Salarystructure")}>
          Salary Structure Management
        </button>
        <button onClick={() => setSelectedSection("payslips")}>
          Payslips & Salary Statements
        </button>
        <button onClick={() => setSelectedSection("bonuses")}>
          Bonuses & Incentives
        </button>
        <button onClick={() => setSelectedSection("payrollProcessing")}>
          Payroll Processing
        </button>
        <button onClick={() => setSelectedSection("taxReports")}>
          Tax & Deduction Reports
        </button>
      </div>
      <div className="section-content">{renderSection()}</div>
    </div>
  );
}

export default PayrollCompensation;
