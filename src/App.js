import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import TopBar from "./Components/Topbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import AnalyticsReporting from "./Components/AnalyticsReporting/AnalyticsReporting";
import AttendanceTime from "./Components/AttendanceTime/AttendanceTime";
import BenefitsCompliance from "./Components/BenefitsCompliance/BenefitsCompliance";
import EmployeeManagement from "./Components/EmployeeManagement/EmployeeManagement";



const App = () => {
  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
        <TopBar />
        <div style={{ display: "flex", marginTop: "60px" }}>
          <Sidebar />
          <div style={{ marginLeft: "260px", padding: "20px", width: "100%" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics-reporting" element={<AnalyticsReporting />}/>
              <Route path="/attendance" element={<AttendanceTime />} />
              <Route path="/benefits-compliance" element={<BenefitsCompliance />} />
              <Route path="/employee-management" element={<EmployeeManagement />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
