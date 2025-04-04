import React, { useState } from "react";
import SalaryStructure from "./SalaryStructures";
import Payslips from "./Payslips";
import Bonuses from "./Bonuses";
import PayrollProcessing from "./PayrollProcessing";
import TaxReports from "./TaxReports";
import "./PayrollCompensation.css";   
const PayrollCompensation = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  
  const [salaryData, setSalaryData] = useState([
    { name: "Manjunath", basicPay: 50000, hra: 10000, pf: 5000, deductions: 2000, medical: 1500, travel: 2500, food: 2000, pfEmployee: 3000 },
    { name: "Eknath", basicPay: 60000, hra: 12000, pf: 6000, deductions: 2500, medical: 2000, travel: 3000, food: 2500, pfEmployee: 4000 },
  ]);

  const [payslipData, setPayslipData] = useState([
    { empId: "EMP001", name: "Manjunath", month: "January", year: "2025", salary: 70000 },
    { empId: "EMP002", name: "Eknath", month: "February", year: "2025", salary: 80000 },
  ]);

  return (
    <div className="payroll-container">
      {currentPage === "dashboard" && <Dashboard navigate={setCurrentPage} />}
      {currentPage === "salaryStructure" && (
        <SalaryStructure goBack={() => setCurrentPage("dashboard")} openAddNew={() => setCurrentPage("addNewSalary")} salaryData={salaryData} setSalaryData={setSalaryData} />
      )}
      
      {currentPage === "payslips" && (
        <Payslips goBack={() => setCurrentPage("dashboard")} openAddNew={() => setCurrentPage("addNewPayslip")} payslipData={payslipData} />
      )}
     
      {currentPage === "bonuses" && (
        <Bonuses goBack={() => setCurrentPage("dashboard")} openAddBonus={() => setCurrentPage("addBonus")} />
      )}
     
      {currentPage === "payrollProcessing" && <PayrollProcessing goBack={() => setCurrentPage("dashboard")} />}
      {currentPage === "taxReports" && <TaxReports goBack={() => setCurrentPage("dashboard")} />}
    </div>
  );
};

const Dashboard = ({ navigate }) => {
  return (
    <div className="dashboard">
      <h2>Payroll Compensation</h2>
      <div className="grid-container">
        <button onClick={() => navigate("salaryStructure")}>Salary Structure</button>
        <button onClick={() => navigate("payslips")}>Payslips</button>
        <button onClick={() => navigate("bonuses")}>Bonuses & Incentives</button>
        <button onClick={() => navigate("payrollProcessing")}>Payroll Processing</button>
        <button onClick={() => navigate("taxReports")}>Tax & Deductions</button>
      </div>
    </div>
  );
};

export default PayrollCompensation;