import React from "react";

const TopBar = () => {
  return (
    <div style={topBarStyles}>
      <h1 style={heading}>HRMS Portal</h1>
      <div>
        <button style={buttonStyles}>LogOut</button>
        <button style={buttonStyles}>Profile</button>
      </div>
    </div>
  );
};

const topBarStyles = {
  height: '60px',
  backgroundColor: '#34495e',
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 20px',
  marginBotton: '15px',
  position: 'fixed',
  width: '97%',  
  zIndex: 1000,   
};


const buttonStyles = {
  backgroundColor: '#2980b9',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  cursor: 'pointer',
  marginLeft: '10px',
};

const heading = {
  fontSize: '25px',
  
}

export default TopBar;
