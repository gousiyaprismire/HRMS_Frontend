import React from "react";
import { Navigate } from "react-router-dom";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import TopBar from "./Components/Topbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import AnalyticsReporting from "./Components/AnalyticsReporting/AnalyticsReporting";
import AttendanceTime from "./Components/AttendanceTime/AttendanceTime";
import BenefitsCompliance from "./Components/BenefitsCompliance/BenefitsCompliance";
import EmployeeManagement from "./Components/EmployeeManagement/EmployeeManagement";
import PayrollCompensation from "./Components/PayrollCompensation/PayrollCompensation";
import Recruitment from "./Components/Recruitment/Recruitment";
import SecurityDataPrivacy from "./Components/SecurityDataPrivacy/SecurityDataPrivacy";
import PerformanceManagement from "./Components/PerformanceManagement/PerformanceManagement";
import SelfService from "./Components/SelfService/SelfService";
import EmployeeAttendanceTracking from "./Components/AttendanceTime/EmployeeAttendanceTracking";
import LeaveApplication from "./Components/AttendanceTime/LeaveApplication";
import LeaveApprovalPanel from "./Components/AttendanceTime/LeaveApprovalPanel";
import TimesheetManagement from "./Components/AttendanceTime/TimesheetManagement";
import HolidayPolicies from "./Components/AttendanceTime/HolidayPolicies"
import GoalCategories from "./Components/PerformanceManagement/GoalCategories";



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
              <Route path="/" element={<Navigate to="/performance-management" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics-reporting" element={<AnalyticsReporting />}/>
              <Route path="/attendance" element={<AttendanceTime />} />
              <Route path="/attendance-tracking" element={<EmployeeAttendanceTracking />} />
              <Route path="/leave-application" element={<LeaveApplication />} />
              <Route path="/leave-approval" element={<LeaveApprovalPanel />} />
              <Route path="/holiday" element={<HolidayPolicies />} />
              <Route path="/timesheet" element={<TimesheetManagement />} />
              <Route path="/benefits-compliance" element={<BenefitsCompliance />} />
              <Route path="/employee-management" element={<EmployeeManagement />} />
              <Route path="/payroll" element={<PayrollCompensation />} />
              <Route path="/performance-management" element={<PerformanceManagement />} />
              <Route path="/goal-categories" element={<GoalCategories />} />
              <Route path="/recruitment" element={<Recruitment />} />
              <Route path="/security" element={<SecurityDataPrivacy />} />
              <Route path="/selfservice" element= {<SelfService />}/>
              
      </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
