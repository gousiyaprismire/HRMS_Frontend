import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
   
const Sidebar = () => {
  const [showPerformanceOptions, setShowPerformanceOptions] = useState(false);
  const [attendanceDropdown, setAttendanceDropdown] = useState(false);
  const [benefitsOpen, setBenefitsOpen] = useState(false);
  const navigate = useNavigate();
  

  const handleNavigate = (path) => {
    navigate(path);
  };
  
  const handlePerformanceClick = () => {
    setShowPerformanceOptions(!showPerformanceOptions); 
    navigate("/performance-management"); 
  }
  const [payrollOpen, setPayrollOpen] = useState(false);
  const [recruitmentOpen, setRecruitmentOpen] = useState(false);
  const [selfServiceOpen, setSelfServiceOpen] = useState(false);

  const toggleRecruitment = () => {
    setRecruitmentOpen(!recruitmentOpen);
  };

  const toggleSelfService = () => {
    setSelfServiceOpen(!selfServiceOpen);
  };
  
  const toggleBenefits = () => {
    setBenefitsOpen((prev) => !prev);
  };
  const togglePayroll = () => setPayrollOpen(!payrollOpen);

  return (
    <div style={sidebarStyles}>
      <div style={itemStyles} onClick={() => navigate("/dashboard")}>
        📊 Dashboard
      </div>
      <div style={itemStyles} onClick={() => navigate("/employee-management")}>
        👥 Employee Management
      </div>
      <div style={itemStyles} onClick={togglePayroll}>
                💰 Payroll & Compensation {payrollOpen ? "▲" : "▼"}
            </div>
            {payrollOpen && (
                <div style={dropdownStyles}>
                    <div style={dropdownItemStyles} onClick={() => navigate("/salary-structure")}>
                        💼 Salary Structure
                    </div>
                    <div style={dropdownItemStyles} onClick={() => navigate("/payslips")}>
                        📜 Payslips & Salary Statements
                    </div>
                    <div style={dropdownItemStyles} onClick={() => navigate("/bonuses")}>
                        🎉 Bonuses & Incentives
                    </div>
                    <div style={dropdownItemStyles} onClick={() => navigate("/payroll-processing")}>
                        🧾 Payroll Processing
                    </div>
                    <div style={dropdownItemStyles} onClick={() => navigate("/tax-reports")}>
                        🧮 Tax & Deduction Reports
                    </div>
                </div>
            )}
      <div style={itemStyles} onClick={() => setAttendanceDropdown(!attendanceDropdown)}>
        ⏳ Attendance & Time {attendanceDropdown ? "▼" : "▶"}
      </div>
      {attendanceDropdown && (
        <div style={dropdownStyles}>
          <div style={dropdownItemStyles} onClick={() => handleNavigate("/attendance-tracking")}>📌 Employee Attendance Tracking</div>
          <div style={dropdownItemStyles} onClick={() => handleNavigate("/leave-application")}>📝 Leave Application</div>
          <div style={dropdownItemStyles} onClick={() => handleNavigate("/leave-approval")}>✅ Leave Approval Panel</div>
          <div style={dropdownItemStyles} onClick={() => handleNavigate("/timesheet")}>📅 Timesheet Management</div>
          <div style={dropdownItemStyles} onClick={() => handleNavigate("/holiday")}>📜 Holiday & Leave Policies</div>
        </div>
      )}
      <div onClick={handlePerformanceClick} style={dropdownItemStyles}> 📊  Performance Management </div>
      {showPerformanceOptions && (
        <div style={dropdownStyles}>
          <div style={dropdownItemStyles} onClick={() => navigate("/goal-categories")}>📌 Goal Categories</div>
          <div style={dropdownItemStyles} onClick={() => navigate("/performance-periods")}>📅 Performance Periods</div>
          <div style={dropdownItemStyles} onClick={() => navigate("/feedback-questions")}>📝 360° Feedback Questions</div>
          <div style={dropdownItemStyles} onClick={() => navigate("/general-options")}>🔧 General Options</div>
        </div>
      )}  

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

<div style={itemStyles} onClick={toggleBenefits}>
  🏢 Benefits & Compliance {benefitsOpen ? "▲" : "▼"}
</div>
{benefitsOpen && (
  <div style={dropdownStyles}>
    <div
      style={dropdownItemStyles}
      onClick={(event) => {
        event.stopPropagation();
        navigate("/benefits/benefits-enrollment");
      }}
    >
      📑 Benefits Enrollment
    </div>
    <div
      style={dropdownItemStyles}
      onClick={(event) => {
        event.stopPropagation();
        navigate("/benefits/claims-reimbursements");
      }}
    >
      💰 Claims & Reimbursements
    </div>
    <div
      style={dropdownItemStyles}
      onClick={(event) => {
        event.stopPropagation();
        navigate("/benefits/company-policy-compliance");
      }}
    >
      📜 Company Policy & Compliance
    </div>
    <div
      style={dropdownItemStyles}
      onClick={(event) => {
        event.stopPropagation();
        navigate("/benefits/audit-reports");
      }}
    >
      📝 Audit & Compliance Reports
    </div>
  </div>
)}


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
     
    </div>
  );
};

const sidebarStyles = {
  width: "280px",
  height: "calc(100vh - 60px)", 
 background: "#aa853e",
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