import React from "react";

const TopBar = () => {
  return (
    <div style={topBarStyles}>
      <div style={logoContainer}>
        <img src="/Logo.png" alt="HRMS Logo" style={logoStyles} />
        <h1 style={heading}>HRMS Portal</h1>
      </div>
      <div>
        <button style={buttonStyles}>LogOut</button>
        <button style={buttonStyles}>Profile</button>
      </div>
    </div>
  );
};

const topBarStyles = {
  height: "70px",
   //backgroundColor: "#34495e",
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

const logoStyles = {
  height: "50px",
  marginRight: "10px",
};

const buttonStyles = {
  // backgroundColor: "#2980b9",
  color: "black",
  border: "none",
  padding: "10px 15px",
  cursor: "pointer",
  marginLeft: "10px",
};

const heading = {
  fontSize: "25px",
};

export default TopBar;
