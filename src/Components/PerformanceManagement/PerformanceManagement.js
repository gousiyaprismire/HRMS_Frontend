import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PerformanceManagement.css";

const PerformanceManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="main-content">
      <div className="header">
        <div className="performance-heading">
          <h1>Performance Management</h1>
          <p className="performance-para">
            View the latest status of performance measurement in one place.
          </p>
        </div>
      </div>

      <div className="cards">
        {[
          "Total Employees",
          "Forms Sent",
          "Forms Accepted",
          "Rated by Employees",
          "Rated by Managers",
          "Rating Finalized",
        ].map((title) => (
          <div key={title} className="card">
            <h2>{title}</h2>
            <p>-</p>
          </div>
        ))}
      </div>

      <div className="buttons">
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
