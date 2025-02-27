import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PerformanceManagement.css";

const PerformanceManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="performance-management-main-content">
      <div className="performance-management-header">
        <div className="performance-management-heading">
          <h1>Performance Management</h1>
          <p className="performance-para">
            View the latest status of performance measurement in one place.
          </p>
        </div>
      </div>

      <div className="performance-management-cards">
        {[
          "Total Employees",
          "Forms Sent",
          "Forms Accepted",
          "Rated by Employees",
          "Rated by Managers",
          "Rating Finalized",
        ].map((title) => (
          <div key={title} className="performance-management-card">
            <h2>{title}</h2>
            <p>-</p>
          </div>
        ))}
      </div>

      <div className="performance-management-buttons">
        <button className="goal-btn" onClick={() => navigate("/organization-goals")}>
          🎯 Organization Goals
        </button>
        <button className="appraisal-btn" onClick={() => navigate("/appraisal-forms")}>
          📄 Appraisal Forms
        </button>
      </div>
    </div>
  );
};

export default PerformanceManagement;
