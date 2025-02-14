import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [showPerformanceOptions, setShowPerformanceOptions] = useState(false);
  const navigate = useNavigate();
  
  const handlePerformanceClick = () => {
    setShowPerformanceOptions(!showPerformanceOptions); 
    navigate("/performance-management"); 
  };

  return (
    <div style={sidebarStyles}>
      <div style={itemStyles} onClick={() => navigate("/dashboard")}>📊 Dashboard</div>
      <div style={itemStyles} onClick={() => navigate("/employee-management")}>👥 Employee Management</div>
      <div style={itemStyles} onClick={() => navigate("/payroll")}>💰 Payroll & Compensation</div>
      <div style={itemStyles} onClick={() => navigate("/attendance")}>⏳ Attendance & Time</div>

      <div onClick={handlePerformanceClick} style={dropdownItemStyles}> 📊  Performance Management </div>
      {showPerformanceOptions && (
        <div style={dropdownStyles}>
          <div style={dropdownItemStyles} onClick={() => navigate("/goal-categories")}>📌 Goal Categories</div>
          <div style={dropdownItemStyles} onClick={() => navigate("/performance-periods")}>📅 Performance Periods</div>
          <div style={dropdownItemStyles} onClick={() => navigate("/feedback-questions")}>📝 360° Feedback Questions</div>
          <div style={dropdownItemStyles} onClick={() => navigate("/general-options")}>🔧 General Options</div>
        </div>
      )}  

      <div style={itemStyles} onClick={() => navigate("/recruitment")}>📝 Recruitment</div>
      <div style={itemStyles} onClick={() => navigate("/benefits-compliance")}>📜 Benefits & Compliance</div>
      <div style={itemStyles} onClick={() => navigate("/self-service")}>💻 Self-Service</div>
      <div style={itemStyles} onClick={() => navigate("/analytics-reporting")}>📈 Analytics & Reporting</div>
      <div style={itemStyles} onClick={() => navigate("/mobile-accessibility")}>📱 Mobile Accessibility</div>
      <div style={itemStyles} onClick={() => navigate("/security")}>🔒 Security & Data Privacy</div>
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
