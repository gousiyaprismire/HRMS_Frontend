import React from "react";

const TopBar = () => {
  return (
    <div style={topBarStyles}>
      <div style={logoContainer}>
        <img src="/Logo.png" alt="HRMS Logo" style={logoStyles} />
        <h1 style={heading}>HRMS Portal</h1>
      </div>
      <div style={buttonContainer}>
        <button style={buttonStyles}>👤</button>
        <button style={buttonStyles}>🔒</button>
      </div>
    </div>
  );
};

const topBarStyles = {
  height: "70px",
  background: "linear-gradient(to right,#D88A29, #2e2929)",
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

const buttonStyles = {
  color: "black",
  border: "none",
  padding: "12px 20px",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "bold",
  background: "#f0f0f0",
  borderRadius: "30px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  transition: "background 0.3s",
  marginTop: "20px",
};

const heading = {
  fontSize: "25px",
};

export default TopBar;
