import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PerformanceManagement.css";

const PerformanceManagement = () => {
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setShowSettings(false);
    navigate(path);
  };

  return (
    <div className="main-content">
      <div className="header">
        <div className="performance-heading">
          <h1>Performance Management Dashboard</h1>
          <p className="performance-para">View latest status of performance measurement at one place.</p>
        </div>
        <div className="settings-container">
          <button className="settings-btn" onClick={() => setShowSettings(!showSettings)}>
            ⚙️ Settings ▾
          </button>
          {showSettings && (
            <div className="settings-dropdown">
              <ul>
                <li onClick={() => handleNavigation("/goal-categories")}>
                  <span className="icon">📌</span> Goal Categories
                </li>
                <li onClick={() => handleNavigation("/performance-periods")}>
                  <span className="icon">📅</span> Performance Periods
                </li>
                <li onClick={() => handleNavigation("/feedback-questions")}>
                  <span className="icon">📝</span> 360° Feedback Questions
                </li>
                <li onClick={() => handleNavigation("/general-options")}>
                  <span className="icon">🔧</span> General Options
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="cards">
        {["Total Employees", "Forms Sent", "Forms Accepted", "Rated by Employees", "Rated by Managers", 
          "Rating Finalized"].map((title) => (
          <div key={title} className="card">
            <h2>{title}</h2>
            <p>-</p>
          </div>
        ))}
      </div>

      <div className="buttons">
        <button className="goal-btn">🎯 Organization Goals</button>
        <button className="appraisal-btn">📄 Appraisal Forms</button>
      </div>
    </div>
  );
};

export default PerformanceManagement;
