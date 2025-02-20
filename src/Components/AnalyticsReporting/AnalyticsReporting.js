import React from "react";
import { Link } from "react-router-dom";
import "./AnalyticsReporting.css"; // External CSS file

function AnalyticsReporting() {
  return (
    <div className="analytics-dashboard">
      <h1>Analytics & Reporting</h1>
      <nav>
        <ul>
          <li><Link to="/employee-reports"><button>Employee Reports</button></Link></li>
          <li><Link to="/performance-appraisal-reports"><button>Performance & Appraisal Reports</button></Link></li>
        </ul>
      </nav> 
    </div>
  );
}

export default AnalyticsReporting;
