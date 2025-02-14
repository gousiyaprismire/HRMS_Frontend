import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [showPerformanceOptions, setShowPerformanceOptions] = useState(false);
  const navigate = useNavigate();
  
  const handlePerformanceClick = () => {
    setShowPerformanceOptions(!showPerformanceOptions); 
    navigate("/performance-management"); 
  }
  const [recruitmentOpen, setRecruitmentOpen] = useState(false);
  const [selfServiceOpen, setSelfServiceOpen] = useState(false);

  const toggleRecruitment = () => {
    setRecruitmentOpen(!recruitmentOpen);
  };

  const toggleSelfService = () => {
    setSelfServiceOpen(!selfServiceOpen);
  };

  return (
    <div style={sidebarStyles}>
      <div style={itemStyles} onClick={() => navigate("/dashboard")}>
        📊 Dashboard
      </div>
      <div style={itemStyles} onClick={() => navigate("/employee-management")}>
        👥 Employee Management
      </div>
      <div style={itemStyles} onClick={() => navigate("/payroll")}>
        💰 Payroll & Compensation
      </div>
      <div style={itemStyles} onClick={() => navigate("/attendance")}>
        ⏳ Attendance & Time
      </div>
      <div style={itemStyles} onClick={() => navigate("/performance")}>
        📊 Performance Management
      </div>

      {/* Recruitment with Dropdown */}
      <div style={itemStyles} onClick={toggleRecruitment}>
        📝 Recruitment {recruitmentOpen ? "▲" : "▼"}
      </div>
      {recruitmentOpen && (
        <div style={dropdownStyles}>
          <div
            style={dropdownItemStyles}
            onClick={(event) => {
              event.stopPropagation();
              navigate("/recruitment/job-listings");
            }}
          >
            📋 Job Listings
          </div>
          <div
            style={dropdownItemStyles}
            onClick={(event) => {
              event.stopPropagation();
              navigate("/recruitment/applicant-management");
            }}
          >
          
            🗓 Interview Scheduling
          </div>
          <div
            style={dropdownItemStyles}
            onClick={(event) => {
              event.stopPropagation();
              navigate("/recruitment/offer-letters");
            }}
          >
            ✉️ Offer Letters
          </div>
          <div
            style={dropdownItemStyles}
            onClick={(event) => {
              event.stopPropagation();
              navigate("/recruitment/onboarding");
            }}
          >
            🚀 Onboarding
          </div>
        </div>
      )}

      <div style={itemStyles} onClick={() => navigate("/benefits-compliance")}>
        📜 Benefits & Compliance
      </div>

      {/* Self-Service with Dropdown */}
      <div style={itemStyles} onClick={toggleSelfService}>
        💻 Self-Service {selfServiceOpen ? "▲" : "▼"}
      </div>
      {selfServiceOpen && (
        <div style={dropdownStyles}>
          <div
            style={dropdownItemStyles}
            onClick={(event) => {
              event.stopPropagation();
              navigate("/selfservice/profile-update");
            }}
          >
            👤 Profile Update
          </div>
          <div
            style={dropdownItemStyles}
            onClick={(event) => {
              event.stopPropagation();
              navigate("/selfservice/leave-attendance-history");
            }}
          >
            📅 Leave & Attendance History
          </div>
          <div
            style={dropdownItemStyles}
            onClick={(event) => {
              event.stopPropagation();
              navigate("/selfservice/payroll-tax-documents");
            }}
          >
            💼 Payroll & Tax Documents
          </div>
          <div
            style={dropdownItemStyles}
            onClick={(event) => {
              event.stopPropagation();
              navigate("/selfservice/expense-reimbursement");
            }}
          >
            🧾 Expense Reimbursement
          </div>
          <div
            style={dropdownItemStyles}
            onClick={(event) => {
              event.stopPropagation();
              navigate("/selfservice/help-desk");
            }}
          >
            🆘 Help Desk & Support
          </div>
        </div>
      )}

      <div style={itemStyles} onClick={() => navigate("/analytics-reporting")}>
        📈 Analytics & Reporting
      </div>
      <div style={itemStyles} onClick={() => navigate("/mobile-accessibility")}>
        📱 Mobile Accessibility
      </div>
      <div style={itemStyles} onClick={() => navigate("/security")}>
        🔒 Security & Data Privacy
      </div>
    </div>
  );
};

const sidebarStyles = {
  width: "280px",
  height: "calc(100vh - 60px)", 
  // backgroundColor: "#2c3e50",
  color: "white",
  paddingTop: "50px",
  paddingLeft: '20px',
  position: "fixed",
  top: "60px",
  left: "0",
  overflowY: "auto",
  zIndex: 999,
  paddingRight: '2px',
  marginTop: '10px',
  scrollbarWidth: "none",
  msOverflowStyle: "none",
};

const dropdownItemStyles = {
  padding: "8px 12px",
  cursor: "pointer",
};


const dropdownStyles = {
  position: "relative", 
  // background: "#34495e", 
  color: "white",
  padding: "5px",
  borderRadius: "5px",
  marginLeft: "10px",
  display: "flex",
  flexDirection: "column",
  gap: "5px", 
};

const itemStyles = {
  fontSize: "15px",
  cursor: "pointer",
  padding: "8px",
  borderRadius: "5px",
  transition: "background 0.3s",
};

export default Sidebar;
