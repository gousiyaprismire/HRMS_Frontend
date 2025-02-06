import React, { useState } from "react";
import "./PayrollCompensation.css"; 
import SalaryStructure from "./Salarystructure"; 
import MonthName from "./Monthname"; 
import Payslips from "./Payslip"; 

function PayrollCompensation() {
  const [selectedSection, setSelectedSection] = useState(null);

  const renderSection = () => {
    switch (selectedSection) {
      case "Salarystructure":
        return <SalaryStructure onBack={() => setSelectedSection(null)} />;
      case "MonthName": 
        return <MonthName onBack={() => setSelectedSection(null)} />;
      case "Payslips": 
        return <Payslips onBack={() => setSelectedSection(null)} />;
      default:
        return (
          <>
            <h1>Payroll & Compensation</h1>
            <div className="button-container">
              <button onClick={() => setSelectedSection("Salarystructure")}>
                Salary Structure Management
              </button>
              <button onClick={() => setSelectedSection("Payslips")}> 
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
              <button onClick={() => setSelectedSection("MonthName")}>
                Month Name
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="container">
      <div className="section-content">{renderSection()}</div>
    </div>
  );
}

export default PayrollCompensation;
