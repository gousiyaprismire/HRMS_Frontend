import React from "react";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Clear user session or token here if needed
      navigate("/logout");
    }
  };

  return (
    <div style={topBarStyles}>
      <div style={logoContainer}>
        <img src="/Logo.png" alt="HRMS Logo" style={logoStyles} />
        <h1 style={heading}>HRMS Portal</h1>
      </div>
      <div style={buttonContainer}>
        <button style={profileButtonStyles}>👤</button>
        <button style={lockButtonStyles} onClick={handleLogoutClick}>🔒</button>
      </div>
    </div>
  );
};

const topBarStyles = {
  height: "70px",
  background: "RGB(208,154,64)",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px",
  position: "fixed",
  width: "100%",
  zIndex: 1000,
};

const logoContainer = {
  display: "flex",
  alignItems: "center",
};

const buttonContainer = {
  display: "flex",
  gap: "15px",
};

const logoStyles = {
  height: "50px",
  width: "50px",
  marginRight: "10px",
  borderRadius: "50%",
};

const profileButtonStyles = {
  color: "black",
  border: "none",
  padding: "12px",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "bold",
  background: "#f0f0f0",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "40px",
  height: "40px",
  transition: "background 0.3s",
  marginTop: "10px",
};

const lockButtonStyles = {
  ...profileButtonStyles, // reuses same styles
};

const heading = {
  fontSize: "25px",
};

export default TopBar;
