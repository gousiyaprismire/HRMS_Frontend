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

import SecurityDataPrivacy from "./Components/SecurityDataPrivacy/SecurityDataPrivacy";
import PerformanceManagement from "./Components/PerformanceManagement/PerformanceManagement";
import SelfService from "./Components/SelfService/SelfService";
import EmployeeAttendanceTracking from "./Components/AttendanceTime/EmployeeAttendanceTracking";
import LeaveApplication from "./Components/AttendanceTime/LeaveApplication";
import LeaveApprovalPanel from "./Components/AttendanceTime/LeaveApprovalPanel";
import TimesheetManagement from "./Components/AttendanceTime/TimesheetManagement";
import HolidayPolicies from "./Components/AttendanceTime/HolidayPolicies"
import GoalCategories from "./Components/PerformanceManagement/GoalCategories";

import JobListings from "./Components/Recruitment/JobListings";
import InterviewSchedule from "./Components/Recruitment/InterviewSchedule";
import OfferLetters from "./Components/Recruitment/OfferLetters";
import Onboarding from "./Components/Recruitment/Onboarding";
import Applicant from "./Components/Recruitment/Applicants";
import ProfileUpdate from "./Components/SelfService/ProfileUpdate";
import LeaveAttendance from "./Components/SelfService/LeaveAttendance";
import PayrollTax from "./Components/SelfService/PayrollTax";
import ExpenseReimbursement from "./Components/SelfService/ExpenseReimbursement";
import HelpDesk from "./Components/SelfService/HelpDesk";
import SalaryStructure from "./Components/PayrollCompensation/SalaryStructure";
import Payslips from "./Components/PayrollCompensation/Payslips";
import Bonuses from "./Components/PayrollCompensation/Bonuses";
import PayrollProcessing from "./Components/PayrollCompensation/PayrollProcessing";
import TaxReports from "./Components/PayrollCompensation/TaxReports";


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
              <Route path="/security" element={<SecurityDataPrivacy />} />
              
              <Route path="/recruitment/job-listings" element={<JobListings />} />
              <Route path="/recruitment/job-listings/applicants" element={<Applicant />} />
              <Route path="/recruitment/applicant-management" element={<InterviewSchedule />} />
              <Route path="/recruitment/offer-letters" element={<OfferLetters />} />
              <Route path="/recruitment/onboarding" element={<Onboarding />} />
              <Route path="/security" element={<SecurityDataPrivacy />} />
              <Route path="/selfservice" element= {<SelfService />}/>
              <Route path="/selfservice/profile-update" element={<ProfileUpdate />} />
            <Route path="/selfservice/leave-attendance-history" element={<LeaveAttendance />} />
            <Route path="/selfservice/payroll-tax-documents" element={<PayrollTax />} />
            <Route path="/selfservice/expense-reimbursement" element={<ExpenseReimbursement />} />
            <Route path="/selfservice/help-desk" element={<HelpDesk />} />
            <Route path="/salary-structure" element={<SalaryStructure />} />
              <Route path="/payslips" element={<Payslips />} />
              <Route path="/bonuses" element={<Bonuses />} />
              <Route path="/payroll-processing" element={<PayrollProcessing />} />
              <Route path="/tax-reports" element={<TaxReports />} />
              
             
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
