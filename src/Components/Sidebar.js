import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [payrollDropdown, setPayrollDropdown] = useState(false);

  return (
    <div style={sidebarStyles}>
      <div style={itemStyles} onClick={() => navigate("/dashboard")}>📊 Dashboard</div>
      <div style={itemStyles} onClick={() => navigate("/employee-management")}>👥 Employee Management</div>

      <div style={itemStyles} onClick={() => setPayrollDropdown(!payrollDropdown)}>
        💰 Payroll & Compensation {payrollDropdown ? "▼" : "▶"}
      </div>
      {payrollDropdown && (
        <div style={dropdownStyles}>
          <div style={subItemStyles} onClick={() => navigate("/payroll/salary-structure")}>📑 Salary Structure</div>
          <div style={subItemStyles} onClick={() => navigate("/payroll/payslips")}>📄 Payslips</div>
          <div style={subItemStyles} onClick={() => navigate("/payroll/bonuses")}>🎁 Bonuses & Incentives</div>
          <div style={subItemStyles} onClick={() => navigate("/payroll/payroll-processing")}>📜 Payroll Processing</div>
          <div style={subItemStyles} onClick={() => navigate("/payroll/tax-reports")}>💰 Tax & Deductions</div>
        </div>
      )}

      <div style={itemStyles} onClick={() => navigate("/attendance")}>⏳ Attendance & Time</div>
      <div style={itemStyles} onClick={() => navigate("/performance")}>📊 Performance Management</div>
      <div style={itemStyles} onClick={() => navigate("/recruitment")}>📝 Recruitment</div>
      <div style={itemStyles} onClick={() => navigate("/benefits-compliance")}>📜 Benefits & Compliance</div>
      <div style={itemStyles} onClick={() => navigate("/selfservice")}>💻 SelfService</div>
      <div style={itemStyles} onClick={() => navigate("/analytics-reporting")}>📈 Analytics & Reporting</div>
      <div style={itemStyles} onClick={() => navigate("/mobile-accessibility")}>📱 Mobile Accessibility</div>
      <div style={itemStyles} onClick={() => navigate("/security")}>🔒 Security & Data Privacy</div>
    </div>
  );
};

const sidebarStyles = {
  width: "250px",
  height: "calc(100vh - 60px)",
  color: "white",
  paddingTop: "50px",
  paddingLeft: "10px",
  position: "fixed",
  top: "60px",
  left: "0",
  overflowY: "auto",
  zIndex: 999,
  paddingRight: "2px",
};

const itemStyles = {
  fontSize: "16px",
  cursor: "pointer",
  padding: "8px",
  borderRadius: "5px",
  transition: "background 0.3s",
};

const dropdownStyles = {
  paddingLeft: "20px",
};

const subItemStyles = {
  fontSize: "14px",
  cursor: "pointer",
  padding: "6px",
  borderRadius: "5px",
  transition: "background 0.3s",
};

export default Sidebar;
