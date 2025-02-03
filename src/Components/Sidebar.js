import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div style={sidebarStyles}>
      <div style={itemStyles} onClick={() => navigate("/dashboard")}>📊 Dashboard</div>
      <div style={itemStyles} onClick={() => navigate("/employees")}>👥 Employees</div>
      <div style={itemStyles} onClick={() => navigate("/employee-management")}>👥 Employee Management</div>
      <div style={itemStyles} onClick={() => navigate("/create-post")}>✍️ Create Post</div>
      <div style={itemStyles} onClick={() => navigate("/payroll")}>💰 Payroll & Compensation</div>
      <div style={itemStyles} onClick={() => navigate("/attendance")}>⏳ Attendance & Time</div>
      <div style={itemStyles} onClick={() => navigate("/performance")}>📊 Performance Management</div>
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
  width: "250px",
  height: "calc(100vh - 60px)", // Adjusted for top bar height
  backgroundColor: "#2c3e50",
  color: "white",
  padding: "20px",
  position: "fixed",
  top: "60px",  // Start below the TopBar
  left: "0",
  overflowY: "auto",
  zIndex: 999,
  marginTop: '10px',
  paddingRight: '2px',
};

const itemStyles = {
  fontSize: "15px",
  cursor: "pointer",
  
  padding: "8px",
  borderRadius: "5px",
  transition: "background 0.3s",
};

export default Sidebar;
